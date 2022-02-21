
module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
      firstName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
          type: Sequelize.STRING
      },
      admin: {
          type: Sequelize.BOOLEAN
      }
    },
    {
        sequelize,
        modelName: 'User',
    });
    return User;
  };