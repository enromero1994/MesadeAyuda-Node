const db = require("../models");
const Resolution = db.resolution;


const Op = db.Sequelize.Op;


exports.addResolutor = (req, res) => {
  // Save User to Database
  Resolution.create({
    requestId: req.body.requestId,
    userId: req.body.userId,
    description: req.body.description,
   
  })
    .then(() => {
        res.send({ message: "Resolutor registrado Exitosamente!" });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

