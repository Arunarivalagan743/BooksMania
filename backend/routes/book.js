import express from "express";
import { Book } from "../models/Book.js";
import { verifyAdmin } from "./auth.js";

const router = express.Router();
router.post("/add", verifyAdmin, async (req, res) => {
  try {
    const { name, author, imageUrl } = req.body;

    const newbook = new Book({
      name,
      author,
      imageUrl,
    });
    await newbook.save();
    return res.json({ message: "Book added successfully", added: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error in adding the  Book" });
  }
});


router.get("/books", async (req, res) => {
  try {
    const books = await Book.find();
    return res.json({ books });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error in getting the Books" });
  }
});



router.get("/book/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const book =  await Book.findById({_id: id})
    return res.json(book);
  } catch (err) {
  
    return res.json(err);
  }
});


router.put("/book/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const book =  await Book.findByIdAndUpdate({_id: id}, req.body)
      return res.json({updated: true,book});
    } catch (err) {
    
      return res.json(err);
    }
  });
export { router as BookRouter };
