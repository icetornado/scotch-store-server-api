// ./controllers/manufacturer
const Model = require('../model');
const Product = Model.Product;
const Manufacturer = Model.Manufacturer;

// TO DOs: add exception handlers
const manufacturerController = {
  all (req, res) {
    // Returns all manufacturers
    Manufacturer.find({})
      .exec((err, manufacturers) => res.json(manufacturers))
  },
  byID (req, res){
    try {
      const idParam = req.params.id;
      Manufacturer
        .findOne({_id: idParam})
        .exec((err, product) => res.json(product));
    }
    catch(error){
      res.render('error');
    }
  },
  create (req, res) {
    try{
      const requestBody = req.body;
      // Creates a new record from a submitted form
      const newManu = new Manufacturer(requestBody);
      // and saves the record to
      // the data base
      newManu.save( (err, saved) => {
        // Returns the saved product
        // after a successful save
        Manufacturer
          .findOne({_id: saved._id})
          .exec((err, product) => res.json(product));
        });
    }
    catch(error){
      res.render('error');
    }
  },
  update (req, res) {
    try{
      const idParam = req.params.id;
      const manu = req.body;
      // Finds a product to be updated
      Manufacturer.findOne({_id: idParam}, (err, data) => {
        // Updates the product payload
        data.name = manu.name;
        // Saves the product
        data.save((err, updated) => res.json(updated));
      });
    }
    catch(error){
      res.render('error');
    }

  },
  delete (req, res) {
    try{
      const idParam = req.params.id;
      // Removes a product
      Manufacturer.findOne({_id: idParam}).remove( (err, removed) => res.json(idParam));
    }
    catch(error){
      res.render('error');
    }

  }
};

module.exports = manufacturerController;
