// routes/medicalRecord.js

const express = require('express');
const MedicalRecord = require('../models/MedicalRecord');
const User = require('../models/User');  // Modèle utilisateur (patient)
const Appointment = require('../models/Appointment');  // Modèle rendez-vous
const router = express.Router();

// Route POST pour réserver un rendez-vous et l'ajouter au dossier médical
router.post('/book-appointment', async (req, res) => {
  try {
    const { patientId, doctorId, appointmentTime, disease } = req.body;

    // Chercher le patient avec son patientId
    const user = await User.findById(patientId);
    if (!user) {
      return res.status(404).send({ error: 'Patient non trouvé' });
    }

    // Créer un nouveau rendez-vous pour le patient
    const newAppointment = new Appointment({
      patientId,
      doctorId,
      appointmentTime,
      disease,
    });

    // Sauvegarder le rendez-vous dans la base de données
    await newAppointment.save();

    // Chercher le dossier médical du patient
    const medicalRecord = await MedicalRecord.findOne({ patientId });
    if (!medicalRecord) {
      return res.status(404).send({ error: 'Dossier médical non trouvé' });
    }

    // Ajouter le rendez-vous au dossier médical
    medicalRecord.appointments.push(newAppointment._id);
    await medicalRecord.save();

    res.status(201).send({ message: 'Rendez-vous réservé et ajouté au dossier médical avec succès' });
  } catch (error) {
    res.status(500).send({ error: 'Erreur serveur' });
  }
});

module.exports = router;
