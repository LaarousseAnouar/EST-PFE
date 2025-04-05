// models/MedicalRecord.js

const mongoose = require('mongoose');

// Création du schéma pour le dossier médical
const medicalRecordSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  // Lier le dossier médical au patient
  date: { type: Date, required: true },
  diagnosis: { type: String, required: true },  // Le diagnostic du patient
  notes: { type: String, required: true },  // Notes supplémentaires sur le patient
  attachment: { type: String },  // Lien vers un fichier joint (si applicable)
  appointments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' }],  // Tableau des rendez-vous du patient
});

// Création du modèle Mongoose pour le dossier médical
const MedicalRecord = mongoose.model('MedicalRecord', medicalRecordSchema);
module.exports = MedicalRecord;
