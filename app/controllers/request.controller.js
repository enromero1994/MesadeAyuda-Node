const db = require("../models");
const config = require("../config/auth.config");
const { user } = require("../models");
const Request = db.request;
const Category = db.category
const User = db.user
const Resolution = db.resolution

const Op = db.Sequelize.Op;


//funciona a medias, revisar
exports.addRequest = (req, res) => {
  // Save User to Database
  Request.create({
    summary: req.body.summary,
    description: req.body.description,
    userId: req.body.userId,
    assignee: req.body.assignee,
    status: req.body.status,
    categoryId : req.body.categoryId
  })
  .then( () => {
        
        
        if(req.body.userId){

              res.send({ message: "Solicitud registrada Exitosamente!" });
       
        }else{

          res.status(500).send({ message: err.message });

        }
        
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};
//
exports.getRequestByUserId = (req, res) => {
  
  Request.findAll({
    //Traemos ademas las categorias que existe en el registro como clave foranea
    include:'categories',
    where: 
    { userId: req.params.id }
    })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Error al obtener solicitudes"
      });
    });
};
exports.getAllRequest = (req, res) => {
  
  Request.findAll({
    include: [{
      model: User,
      as: 'user'
    },
    {
      model: Category,
      as: 'categories'
    }
  ]
    

  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Error al obtener solicitudes"
      });
    });
};
exports.updateRequest = (req, res) => {
  const id = req.params.id;

  Request.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Solicitud actualizada correctamente!"
        });
      } else {
        res.send({
          message: `Imposible actualizar solicitud con el id=${id}. Es posible que la categoria no exista!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error al actualizar solicitud con el id=" + id
      });
    });
};
