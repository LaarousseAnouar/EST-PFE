// routes/appointments.js

const express = require('express');
const Appointment = require('../models/Appointment');  // Modèle des rendez-vous
const router = express.Router();

// Route pour récupérer tous les rendez-vous d'un patient
router.get('/:patientId', async (req, res) => {
  try {
    const patientId = req.params.patientId;
    // Récupérer les rendez-vous associés au patient
    const appointments = await Appointment.find({ patientId });

    if (appointments.length === 0) {
      return res.status(404).send({ message: 'Aucun rendez-vous trouvé pour ce patient' });
    }

    // Retourner la liste des rendez-vous
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).send({ error: 'Erreur lors de la récupération des rendez-vous' });
  }
});

module.exports = router;
