const router = require("express").Router();
//MAKE SURE TO IMPORT THE MODEL TO USE MONGOOSE METHODS!

const Book = require("../models/book.model");

//NOTE: We are not doing any error handling, every route just console.logs the error if it exists
//and also sending the error as a JSON response so the server doesn't get stuck

//POST to http://localhost:8080/books/create CREATES A BOOK AND RESPONDS WITH JSON OF CREATEDBOOK
router.post("/create", async (req, res) => {
  try {
    //in this project we are receiving the author id for the author property in the book
    //in the request body we say:
    //   "author" : "6669d5e5860ac57c0b8b13fc"
    const createdBook = await Book.create(req.body);
    res.json(createdBook);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

//GET to http://localhost:8080/books FINDS ALL BOOKS AND RESPONDS IN JSON WITH ALL BOOKS

router.get("/", async (req, res) => {
  try {
    //requests ALL BOOKS in the database
    //.populate("author") is populating the author in the book
    //meaning we won't see just the author ID, but the entire object
    //populate("nameOfProperty") populates, if there's a relationship in the model, the referred field
    const allBooks = await Book.find().populate("author");

    //note: Model.find() method could take parameters to search, like the queries we saw for mongoDB

    res.json(allBooks);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

//GET to http://localhost:8080/books/:bookId    remember that when testing the route, pass a real ID

router.get("/:bookId", async (req, res) => {
  try {
    //destructure bookId from params
    const { bookId } = req.params;
    //to use it in the Model.findById(id) method
    const singleBook = await Book.findById(bookId).populate("author");

    res.json(singleBook);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

//DELETE to http://localhost:8080/books/:bookId  remember that when testing the route, pass a real ID
router.delete("/:bookId", async (req, res) => {
  try {
    const { bookId } = req.params;
    await Book.findByIdAndDelete(bookId);

    res.json({ message: "Book was deleted succesfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

//PUT to http://localhost:8080/books/:bookId remember that when testing the route, pass a real ID
router.put("/:bookId", async (req, res) => {
  try {
    const { bookId } = req.params;
    //findByIdAndUpdate() takes more arguments/parameters
    //findByIdAndUpdate(id, objectWithChanges, configuration)
    const updatedBook = await Book.findByIdAndUpdate(bookId, req.body, {
      //new:true makes sure that we send the updated version of the book in the response
      //without new:true the variable updatedBook will have the book before the updates
      new: true,
      //explicitly tell mongoose to run the validations that are in the model before updating
      //like required:true, min: , max: , etc...
      runValidators: true,
    });

    res.json({
      message: "Book was updated succesfully! -> ",
      book: updatedBook,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = router;
