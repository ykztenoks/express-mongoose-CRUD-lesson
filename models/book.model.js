// ./models/Book.model.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// CREATE SCHEMA
// Schema - describes and enforces the structure of the documents
const bookSchema = new Schema({
  title: { type: String, required: true, trim: true, maxlength: 48 },
  year: { type: Number, min: 0, max: 2024 },
  cover: { type: String, required: true, trim: true },
  codeISBN: { type: String, maxlength: 13, unique: true },
  quantity: { type: Number, min: 0, default: 0 },
  lastPublished: { type: Date, default: Date.now },
  genre: {
    type: String,
    //enum is saying that only the values in the array are valid
    //otherwise upon creation gives error ex: genre: "action" does not work, value is not in enum
    enum: ["romance", "fiction", "biography", "poetry", "drama"],
  },
  //author property in the book will be a reference to Author model
  //in this project, we are sending the author ID in the request body for the POST /books/create
  //in DB once book is created, author property will look like:
  //   author: ObjectId('6669d5e5860ac57c0b8b13fc')
  author: { type: Schema.Types.ObjectId, ref: "Author" },
});

// CREATE MODEL
// The model() method defines a model (Book) and creates a collection (books) in MongoDB
// The collection name will default to the lowercased, plural form of the model name:
//                          "Book" --> "books"
const Book = mongoose.model("Book", bookSchema);

// EXPORT THE MODEL
module.exports = Book;
