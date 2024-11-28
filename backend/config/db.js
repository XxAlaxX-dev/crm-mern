const mongoose = require("mongoose");

const db = async () => {
  try {
    const con = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Connected Succefully to : ${con.connection.host}`);
  } catch (error) {
    console.error(`❌ Database connection Failed: ${error.message}`);
    process.exit(1); // Arrêter le processus en cas d'échec critique
  }
};
module.exports = db;//ss
