const mongoose = require('mongoose');

// Création du schéma pour le rendez-vous
const appointmentSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  // Lier le rendez-vous au patient
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },  // Lier le rendez-vous au médecin
  date: { type: Date, required: true },  // Date du rendez-vous
  time: { type: String, required: true },  // Heure du rendez-vous
  reason: { type: String, required: true },  // Motif du rendez-vous
  status: { 
    type: String, 
    enum: ['scheduled', 'completed', 'cancelled'],  // États possibles du rendez-vous
    default: 'scheduled' 
  }
}, { timestamps: true });  // Permet d'ajouter des champs `createdAt` et `updatedAt`

// Création du modèle de rendez-vous
const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
