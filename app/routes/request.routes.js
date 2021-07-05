const { authJwt } = require("../middleware");
const controller = require("../controllers/request.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/test/request",
    [authJwt.verifyToken],
    controller.addRequest
  );
  app.get(
    "/api/test/request/user/:id",
    [authJwt.verifyToken],
    controller.getRequestByUserId
  );
  app.get(
    "/api/test/request/",
    [authJwt.verifyToken],
    controller.getAllRequest
  );
  app.put("/api/test/request/:id", 
  [authJwt.verifyToken],
  controller.updateRequest);

  
};