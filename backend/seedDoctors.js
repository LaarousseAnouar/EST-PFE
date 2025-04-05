require('dotenv').config();   
const mongoose = require('mongoose');
const Doctor = require('./models/Doctor'); 

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Could not connect to MongoDB', err));

const doctors = [
  { firstName: 'Anouar', lastName: 'Laarousse', email: 'anouar.laarousse@example.com', specialty: 'Généraliste', licenseNumber: 'A123456', phoneNumber: '1234567890', password: 'password123' },
  { firstName: 'Nissrine', lastName: 'Eltalbi', email: 'nissrine.eltalbi@example.com', specialty: 'Gynécologue', licenseNumber: 'B123456', phoneNumber: '0987654321', password: 'password123' },
  { firstName: 'Abdelfatahe', lastName: 'El Alami', email: 'abdelfatahe.elalami@example.com', specialty: 'Dermatologue', licenseNumber: 'C123456', phoneNumber: '1122334455', password: 'password123' },
  { firstName: 'Mohamed', lastName: 'Barada', email: 'mohamed.barada@example.com', specialty: 'Pédiatre', licenseNumber: 'D123456', phoneNumber: '2233445566', password: 'password123' },
  { firstName: 'Sara', lastName: 'Motaouakile', email: 'sara.motaouakile@example.com', specialty: 'Neurologue', licenseNumber: 'E123456', phoneNumber: '3344556677', password: 'password123' },
  { firstName: 'Hamza', lastName: 'Laarousse', email: 'hamza.laarousse@example.com', specialty: 'Neurologue', licenseNumber: 'F123456', phoneNumber: '4455667788', password: 'password123' },
  { firstName: 'Youssef', lastName: 'Bouchkara', email: 'youssef.bouchkara@example.com', specialty: 'Généraliste', licenseNumber: 'G123456', phoneNumber: '5566778899', password: 'password123' },
  { firstName: 'Nabil', lastName: 'Ben Chakroune', email: 'nabil.benchakroune@example.com', specialty: 'Gynécologue', licenseNumber: 'H123456', phoneNumber: '6677889900', password: 'password123' },
  { firstName: 'Aya', lastName: 'Kawi', email: 'aya.kawi@example.com', specialty: 'Dermatologue', licenseNumber: 'I123456', phoneNumber: '7788990011', password: 'password123' },
  { firstName: 'Anouar', lastName: 'Laarousse', email: 'anouar.laarousse.pediatre@example.com', specialty: 'Pédiatre', licenseNumber: 'J123456', phoneNumber: '8899001122', password: 'password123' },
  { firstName: 'Ilhame', lastName: 'Elfaqyr', email: 'ilhame.elfaqyr@example.com', specialty: 'Neurologue', licenseNumber: 'K123456', phoneNumber: '9900112233', password: 'password123' },
  { firstName: 'Patrick', lastName: 'Harris', email: 'patrick.harris@example.com', specialty: 'Neurologue', licenseNumber: 'L123456', phoneNumber: '1011121314', password: 'password123' },
  { firstName: 'Chloe', lastName: 'Evans', email: 'chloe.evans@example.com', specialty: 'Généraliste', licenseNumber: 'M123456', phoneNumber: '1213141516', password: 'password123' },
  { firstName: 'Rayan', lastName: 'Martinez', email: 'rayan.martinez@example.com', specialty: 'Gynécologue', licenseNumber: 'N123456', phoneNumber: '1314151617', password: 'password123' },
  { firstName: 'Amina', lastName: 'Fathi', email: 'amina.fathi@example.com', specialty: 'Dermatologue', licenseNumber: 'O123456', phoneNumber: '1416171819', password: 'password123' }
];

const seedDoctors = async () => {
  try {
    for (let doctorData of doctors) {
      const doctor = new Doctor(doctorData);
      await doctor.save();
      console.log(`Doctor ${doctor.firstName} ${doctor.lastName} added successfully!`);
    }
    mongoose.connection.close();
  } catch (error) {
    console.error('Error adding doctors:', error);
  }
};

seedDoctors();
