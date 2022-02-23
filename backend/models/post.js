

module.exports = (sequelize, Sequelize) => {
    const post = sequelize.define("post", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      content: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      image: {
          type: Sequelize.STRING
      },
    },
    {
        sequelize,
        modelName: 'post',
    });
    return post;
  };