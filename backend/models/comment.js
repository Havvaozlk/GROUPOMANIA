
module.exports = (sequelize, Sequelize) => {
    const Comment = sequelize.define("comment", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      content: {
        type: Sequelize.STRING
      },
      userId: {
        type: Sequelize.STRING
      }
    },
    {
        sequelize,
        modelName: 'User',
    });
    return Comment;
  };