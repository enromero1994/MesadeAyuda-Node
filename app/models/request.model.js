module.exports = (sequelize, Sequelize) => {
    const Request = sequelize.define("requests", {
      summary: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      status : {
        type: Sequelize.STRING
      },
      assignee: {
        type: Sequelize.STRING
      }
    });
  
    return Request;
  };