const express = require('express');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const router = express.Router();

// Configuration de Gemini
const iaGemini = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post('/recommander-specialite', async (req, res) => {
  const { reason } = req.body;

  // Vérification basique
  if (!reason) {
    return res.status(400).json({ erreur: 'Veuillez décrire vos symptômes' });
  }

  // Question simple pour Gemini
  const question = `Recommande une spécialité médicale non composée pour : "${reason}"
  Réponds avec un seul mot (exemple : "Cardiologue")`;

  try {
    // Initialisation du modèle
    const modele = iaGemini.getGenerativeModel({ 
      model: "gemini-1.5-flash" // Modèle rapide et gratuit
    });
    
    // Obtention de la réponse
    const resultat = await modele.generateContent(question);
    const reponse = await resultat.response;
    
    // Nettoyage de la réponse
    const specialty = reponse.text().trim();

    // Renvoi de la recommandation
    res.json({ specialty });

  } catch (erreur) {
    console.error("Erreur IA :", erreur);
    res.status(500).json({ erreur: 'Échec de la recommandation' });
  }
});

module.exports = router;