const mongoose = require('mongoose');

module.exports = async () => {
  try {
    await mongoose.connect(process.env.MONGO, {
      useNewUrlParser: true,
      useCreateIndex: true
    });

    console.log('Connected to MongoDB');
  } catch (err) {
    console.error(err.message);
    process.exit(1);   
  }
}