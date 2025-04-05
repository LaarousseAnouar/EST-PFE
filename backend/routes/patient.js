const express = require('express');
const Patient = require('../models/User');
const jwt = require('jsonwebtoken');
const Appointment = require('../models/Appointment');
const Doctor = require('../models/Doctor');
const Prescription = require('../models/Prescription');
const MedicalRecord = require('../models/MedicalRecord'); // Ajouter le modèle des dossiers médicaux

const router = express.Router();

// Vérification de l'authentification via token
const auth = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).send({ error: 'Token non fourni' });
  }

  try {
    const decoded = jwt.verify(token, 'your_jwt_secret');
    req.user = decoded;  // Stocker les informations de l'utilisateur dans req.user
    next();  // Permet d'accéder à la route
  } catch (error) {
    res.status(401).send({ error: 'Token invalide' });
  }
};

// Route pour obtenir `patientId` à partir de l'email
router.get('/get-patient-id', auth, async (req, res) => {
  const email = req.query.email;  // Récupérer l'email depuis les paramètres de la requête

  try {
    const patient = await Patient.findOne({ email });
    if (!patient) {
      return res.status(404).json({ error: 'Patient non trouvé' });
    }

    // Retourner `patientId`
    res.json({ patientId: patient._id });
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Route pour afficher le profil du patient
router.get('/profile', auth, async (req, res) => {
  try {
    const patient = await Patient.findById(req.user.id).select('-password');
    if (!patient) {
      return res.status(404).send({ error: 'Patient non trouvé' });
    }
    res.json(patient);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Erreur serveur' });
  }
});

// Route pour mettre à jour le profil du patient
router.put('/profile', auth, async (req, res) => {
  try {
    const { firstName, lastName, email } = req.body;
    const patient = await Patient.findById(req.user.id);
    if (!patient) {
      return res.status(404).send({ error: 'Patient non trouvé' });
    }
    patient.firstName = firstName;
    patient.lastName = lastName;
    patient.email = email;
    await patient.save();
    const patientWithoutPassword = patient.toObject();
    delete patientWithoutPassword.password;
    res.json(patientWithoutPassword);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Erreur serveur' });
  }
});

// Route pour réserver un rendez-vous pour le patient
router.post('/book-appointment', auth, async (req, res) => {
  try {
    const { doctorId, date, time, reason } = req.body;
    const appointment = new Appointment({
      patientId: req.user.id,
      doctorId,
      date,
      time,
      reason
    });
    await appointment.save();
    res.status(201).json({ message: 'Rendez-vous réservé avec succès', appointment });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Erreur serveur' });
  }
});

// Route pour obtenir les créneaux horaires disponibles pour un médecin à une date donnée
router.get('/available-slots', auth, async (req, res) => {
  try {
    const { doctorId, date } = req.query;
    const bookedAppointments = await Appointment.find({ doctorId, date });
    const bookedTimes = bookedAppointments.map(app => app.time);
    const allTimeSlots = ['10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'];
    const availableSlots = allTimeSlots.filter(slot => !bookedTimes.includes(slot));
    res.json(availableSlots);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Erreur serveur' });
  }
});

// Route pour afficher les rendez-vous du patient
router.get('/appointments', auth, async (req, res) => {
  try {
    const patientId = req.user.id;  // Récupérer `patientId` depuis le token
    const today = new Date();
    today.setHours(0, 0, 0, 0);  // Définir au début de la journée
    
    const appointments = await Appointment.find({
      patientId,
      date: {
        $gte: today,
        $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000) // Fin de la journée
      }
    })
      .populate('doctorId', 'firstName lastName')  // Remplir les informations du médecin
      .sort({ time: 1 });
    
    res.json(appointments);
  } catch (error) {
    console.error('Erreur lors de la récupération des rendez-vous:', error);
    res.status(500).send({ error: 'Erreur serveur' });
  }
});

// Route pour afficher l'équipe soignante du patient
router.get('/care-team', auth, async (req, res) => {
  try {
    const patientId = req.user.id;
    const appointments = await Appointment.find({ patientId }).distinct('doctorId');
    const careTeam = await Doctor.find({ _id: { $in: appointments } }).select('firstName lastName specialty');
    res.json(careTeam);
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'équipe soignante:', error);
    res.status(500).send({ error: 'Erreur serveur' });
  }
});

// Route pour afficher les prescriptions du patient
router.get('/prescriptions', auth, async (req, res) => {
  try {
    const patientId = req.user.id;
    const prescriptions = await Prescription.find({ patientId }).populate('doctorId', 'firstName lastName');
    res.json(prescriptions);
  } catch (error) {
    console.error('Erreur lors de la récupération des prescriptions:', error);
    res.status(500).send({ error: 'Erreur serveur' });
  }
});

// Route pour afficher les dossiers médicaux du patient
router.get('/medical-records', auth, async (req, res) => {
  try {
    const patientId = req.user.id;

    // Recherche des dossiers médicaux du patient
    const medicalRecords = await MedicalRecord.find({ patientId });

    if (!medicalRecords || medicalRecords.length === 0) {
      return res.status(404).send({ error: 'Aucun dossier médical trouvé' });
    }

    // Retourner les dossiers médicaux sous forme de JSON
    res.json(medicalRecords);
  } catch (error) {
    console.error('Erreur lors de la récupération des dossiers médicaux:', error);
    res.status(500).send({ error: 'Erreur serveur' });
  }
});

module.exports = router;
