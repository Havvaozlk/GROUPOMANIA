
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
      },
      postId : {
        type:Sequelize.INTEGER
      }
    },
    {
        sequelize,
        modelName: 'User',
    });

    Comment.associate = function (models) {
      Comment.belongsTo(models.User, {
        foreignKey: 'userId',
       
      });
      Comment.belongsTo(models.Post, {
        foreignKey: 'postId',
        onDelete: 'CASCADE', // Si on supprime un message, on supprime ses réponses //
      });
    }
    return Comment;
  };