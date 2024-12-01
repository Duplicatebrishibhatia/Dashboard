import mongoose from 'mongoose';
import Item from '../models/Item';
import dotenv from 'dotenv';

dotenv.config();

const testItems = [
  {
    title: "Test Item 1",
    description: "Description for test item 1",
    status: "active",
    tags: ["test", "item1"]
  },
  {
    title: "Test Item 2",
    description: "Description for test item 2",
    status: "inactive",
    tags: ["test", "item2"]
  },
  {
    title: "Test Item 3",
    description: "Description for test item 3",
    status: "active",
    tags: ["test", "item3"]
  }
];

async function seedData() {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    await Item.deleteMany({});
    await Item.insertMany(testItems);
    console.log('Test data seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
}

seedData(); 