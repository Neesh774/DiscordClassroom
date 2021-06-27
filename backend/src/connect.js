const mongoose = require('mongoose');
const connectDB = async () => {
    mongoose
  .connect('mongodb+srv://Neesh:fljnyI5WBOyvnyvH@cluster0.99zcx.mongodb.net/DisClassroom?retryWrites=true&w=majority', { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })
  .then(() => {
    console.log('Connected to database!');
  })
  .catch(error => {
    console.log('Connection failed!');
    console.log(error);
  });
}
module.exports = connectDB;