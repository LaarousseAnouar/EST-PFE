require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User'); // Assure-toi que le chemin est correct

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch((err) => console.error('❌ Could not connect to MongoDB', err));

async function createAdmin() {
  const email = "abc@gmail.com"; // ✅ Email de l'admin
  const password = "xyz123"; // ✅ Mot de passe temporaire

  try {
    // 🔥 Vérifier si l'admin existe déjà
    const existingAdmin = await User.findOne({ email });
    if (existingAdmin) {
      console.log("⚠ Admin already exists!");
      mongoose.connection.close();
      return;
    }

    // 🔥 Créer un nouvel admin sans re-hacher le mot de passe
    const admin = new User({
      firstName: "abc",
      lastName: "xyz",
      email,
      password, // ✅ NE PAS hasher le mot de passe ici
      role: "admin"
    });

    await admin.save();
    console.log('✅ Admin created successfully');
  } catch (error) {
    console.error('❌ Error creating admin:', error);
  } finally {
    mongoose.connection.close();
  }
}

createAdmin();
