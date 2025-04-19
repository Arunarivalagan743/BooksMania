import express from 'express';
import {Book} from '../models/Book.js';
import { verifyAdmin } from './auth.js';


const router = express.Router();
router.post('/add', verifyAdmin, async (req, res) => {
    try {
        const {name, author, imageUrl} = req.body;
    

        const newbook = new Book({
            name,
            author,
            imageUrl,
    
        });
        await newbook.save();
        return res.json({message: "Book added successfully", added: true});
    }
    catch(err)
    {
        console.error(err);
        return res.status(500).json({message: "Error in adding the  Book"});
    }
});


export {router as BookRouter};