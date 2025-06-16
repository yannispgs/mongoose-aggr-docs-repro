const mongoose = require('mongoose');
require('dotenv').config();

const testSchema = new mongoose.Schema({ name: String });
const TestModel = mongoose.model('Test', testSchema);

(async () => {
  await mongoose.connect('mongodb://localhost:27017/test');
  console.log('Connected to MongoDB');

  const admin = mongoose.connection.db.admin();
  const info = await admin.serverStatus();
  console.log('MongoDB version:', info.version); // 8.0.10

  // Example usage of User model
  console.log(await TestModel.aggregate([
    {
    $documents: [
      { hello: 'world' },
    ]
  },
  {
    $match: {
      hello: 'world',
    }
  }
  ]));
})();
