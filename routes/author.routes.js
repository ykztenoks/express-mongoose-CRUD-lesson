//MAKE SURE TO IMPORT THE MODEL TO USE MONGOOSE METHODS!
const Author = require("../models/author.model.js");

const router = require("express").Router();

//POST to http://localhost:8080/authors
router.post("/", async (req, res) => {
  try {
    const createdAuthor = await Author.create(req.body);

    res
      .status(201)
      .json({ message: "here's the created author", createdAuthor });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = router;
