const { authJwt } = require("../middleware");
const controller = require("../controllers/category.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/test/category",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.addCategory
  );

  app.get("/api/test/category", 
  //[authJwt.verifyToken, authJwt.isAdmin],
  controller.getAllCategories
  );
  app.get("/api/test/category/:id", 
  [authJwt.verifyToken, authJwt.isAdmin],
  controller.getCategoryById
  );

  app.put("/api/test/category/:id", 
  [authJwt.verifyToken, authJwt.isAdmin],
  controller.updateCategory);


  app.delete("/api/test/category/:id", 
  [authJwt.verifyToken, authJwt.isAdmin],
  controller.deleteCategory
  );
};