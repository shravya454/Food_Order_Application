// Script to find referenced restaurant IDs in other collections that are missing from Restaurant collection
const dotenv = require('dotenv');
const connectDatabase = require('../config/database');

dotenv.config({ path: './config/config.env' });
connectDatabase();

const Restaurant = require('../models/restaurant');
const Menu = require('../models/menu');
const FoodItem = require('../models/foodItem');
const Order = require('../models/order');
const Cart = require('../models/cartModel');

(async function findMissing() {
  try {
    const restaurants = await Restaurant.find({}, '_id name').lean();
    const existingIds = new Set(restaurants.map(r => r._id.toString()));

    const referencedIds = new Set();

    const menus = await Menu.find({}, 'restaurant').lean();
    menus.forEach(m => { if (m.restaurant) referencedIds.add(m.restaurant.toString()); });

    const foods = await FoodItem.find({}, 'restaurant name').lean();
    foods.forEach(f => { if (f.restaurant) referencedIds.add(f.restaurant.toString()); });

    const orders = await Order.find({}, 'restaurant').lean();
    orders.forEach(o => { if (o.restaurant) referencedIds.add(o.restaurant.toString()); });

    const carts = await Cart.find({}, 'restaurant').lean();
    carts.forEach(c => { if (c.restaurant) referencedIds.add(c.restaurant.toString()); });

    const missing = [];
    for (const id of referencedIds) {
      if (!existingIds.has(id)) missing.push(id);
    }

    console.log('Existing restaurants count:', restaurants.length);
    console.log('Referenced restaurant ids count:', referencedIds.size);
    if (missing.length === 0) {
      console.log('No missing referenced restaurant IDs found.');
      process.exit(0);
    }

    console.log('Missing restaurant IDs referenced elsewhere:');
    for (const id of missing) {
      console.log('---', id);
      const sampleFoods = await FoodItem.find({ restaurant: id }, 'name price images').limit(5).lean();
      console.log('  sample food items:', sampleFoods.map(f => ({ name: f.name, price: f.price })));
      const sampleMenus = await Menu.find({ restaurant: id }, 'menu').limit(5).lean();
      console.log('  menus count:', sampleMenus.length);
    }

    process.exit(0);
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
})();
