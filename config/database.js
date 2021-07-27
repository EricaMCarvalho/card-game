const mongoose = require('mongoose');

try {
  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
  console.log('MongoDB is connected');
} catch (error) {
  console.log(error);
  process.exit(1);
}
