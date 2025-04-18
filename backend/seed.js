

import bcrypt from 'bcrypt';
import Admin from './models/Admin.js';
import connectDB from './db.js';

async function AdminAccount() {
  try {
    const adminCount = await Admin.countDocuments();
    if (adminCount === 0) {
      const hashPassword = await bcrypt.hash('1', 10);
      const newAdmin = new Admin({
       username:'Admin',
        password: hashPassword,
      });
      await newAdmin.save();
      console.log(" Admin user created.");
    } else {
      console.log(" Admin user already exists.");
    }
  } catch (error) {
    console.error("Error creating admin user:", error);
  }
}

connectDB()
  .then(() => AdminAccount())
  .catch((err) => console.error("DB connection failed:", err));

