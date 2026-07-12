// Script to remove a restaurant with name "new" from the database
const dotenv = require('dotenv');
const connectDatabase = require('../config/database');
const Restaurant = require('../models/restaurant');

// Load env and connect
dotenv.config({ path: './config/config.env' });
connectDatabase();

async function remove() {
  try {
    const doc = await Restaurant.findOneAndDelete({ name: 'new' });
    if (!doc) {
      console.log('No restaurant named "new" found.');
    } else {
      console.log('Deleted restaurant:', doc._id.toString(), doc.name);
    }
    process.exit(0);
  } catch (err) {
    console.error('Error deleting restaurant:', err.message || err);
    process.exit(1);
  }
}

remove();
