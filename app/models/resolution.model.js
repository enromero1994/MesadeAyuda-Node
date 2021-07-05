module.exports = (sequelize, Sequelize) => {
    const Resolution = sequelize.define("resolutions", {
 
      description: {
        type: Sequelize.STRING
      }
    });
  
    return Resolution;
  };