// import our Book model
const db = require("../models");

// export a set of methods to edit and manipulate the recipes controller

module.exports = {
  // find all books ("/api/book" => GET)
  findAll: function(req, res) {
    // /api/book?title=harry+potter
    // req.query => {title: "harry potter"}
    console.log('db.findall');
    console.log(req.query.username);
    db.Recipe
      .find({ username: req.query.username})
      .sort({date: -1})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
     
  },
  
  // find a book by id ("/api/book/:id")
  findById: function (req, res) {
    db.Recipe
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => 
        // console.log(err);
        res.status(422).json(err)
      );
  },

  // create / insert new book ("/api/book" => POST)
  create: function (req, res) {
    // console.log("---in favs Controller---");
    // console.log(req.body, "Save this Recipe");
    db.Recipe
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => 
        // console.log(err);
        res.status(422).json(err)
      );
  },

  // update book information ("/api/book/:id" => PUT)
  update: function (req, res) {
    db.Recipe
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => 
        // console.log(err);
        res.status(422).json(err)
      );
  },

  // to delete a book from the reading list ("/api/book/:id" => DELETE)
  remove: function (req, res) {
    db.Recipe
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => 
        // console.log(err);
        res.status(422).json(err)
      );
  }
};