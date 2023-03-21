export default (sequelize, Sequelize) => {
   const teacher = sequelize.define("teacher", {
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true
        }
    },{
        tableName: "teacher",
    });
    
    return teacher;
}