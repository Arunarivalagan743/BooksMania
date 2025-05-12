import express from 'express';
import {Student} from '../models/Student.js';
import { verifyAdmin } from './auth.js';

import bcrypt from 'bcryptjs';

const router = express.Router();
router.post('/register', verifyAdmin, async (req, res) => {
    try {
        const {username, password, roll, grade} = req.body;
        console.log(roll, username, password, grade);
        
        const student = await Student.findOne({username});
        if(student){
            return res.json({message: "Student already exists"});
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const newstudent = new Student({
            username,
            password: hashPassword,
            roll,
            grade
        });
        await newstudent.save();
        return res.json({message: "Student registered successfully", registered: true});
    }
    catch(err)
    {
        console.error(err);
        return res.status(500).json({message: "Error in registering student"});
    }
});


export {router as StudentRouter};