
module.exports = (sequelize, Sequelize) => {
    const Comment = sequelize.define("comment", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement :true
      },
      content: {
        type: Sequelize.STRING
      },
      creatorFirstName: {
        type: Sequelize.STRING
      },
      creatorLastName: {
        type: Sequelize.STRING
      },
    },
    );
    return Comment;
  };