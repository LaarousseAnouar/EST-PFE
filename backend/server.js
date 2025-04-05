const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connexion à MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connecté à MongoDB'))
  .catch((err) => console.error('Échec de la connexion à MongoDB', err));

// Routes
app.use('/api/signup', require('./routes/signup'));  // Inscription
app.use('/api/login', require('./routes/login'));  // Connexion
app.use('/api/admin', require('./routes/admin'));  // Administration
app.use('/api/doctor', require('./routes/doctor'));  // Médecin
app.use('/api/patient', require('./routes/patient'));  // Patient

// Ajouter les routes pour les dossiers médicaux
const medicalRecordRoutes = require('./routes/medicalRecord');
app.use('/api/patient', medicalRecordRoutes);  // Routes pour gérer les dossiers médicaux

// Ajouter les routes pour les rendez-vous
const appointmentRoutes = require('./routes/appointments');  // Routes pour les rendez-vous
app.use('/api/appointments', appointmentRoutes);  // Routes pour réserver et récupérer les rendez-vous

// Route principale
app.get('/', (req, res) => {
  res.send('Bienvenue dans le système de gestion des hôpitaux (API)');
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Le serveur fonctionne sur le port ${PORT}`);
});
