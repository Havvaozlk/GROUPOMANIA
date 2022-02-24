

module.exports = (sequelize, Sequelize) => {
    const Post = sequelize.define("post", {
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
        modelName: 'Post',
    });
    return Post;
  };