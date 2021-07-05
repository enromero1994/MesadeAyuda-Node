const db = require("../models");
const Category = db.category;


const Op = db.Sequelize.Op;


exports.addCategory = (req, res) => {
  // Save User to Database
  Category.create({
    name: req.body.name,
    description: req.body.description,
   
  })
    .then(() => {
        res.send({ message: "Categoria registrada Exitosamente!" });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};


exports.deleteCategory = (req, res) => {
    const id = req.params.id;
  
    Category.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Categoria eliminada exitosamente!"
          });
        } else {
          res.send({
            message: `Imposible eliminar categoria con el id=${id}. Es posible que no exista!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error al eliminar categoria con el id =" + id
        });
      });
  };

  exports.getAllCategories = (req, res) => {
  
    Category.findAll({})
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Error al obtener categorias"
        });
      });
  };
  exports.getCategoryById = (req, res) => {
    const id = req.params.id;
  
    Category.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error al obtener categoria con el id=" + id
        });
      });
  };
  exports.updateCategory = (req, res) => {
    const id = req.params.id;
  
    Category.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Categoria actualizada correctamente!"
          });
        } else {
          res.send({
            message: `Imposible actualizar categoria con el id=${id}. Es posible que la categoria no exista!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error al actualizar categoria con el id=" + id
        });
      });
  };