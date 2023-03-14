export default (sequelize, Sequelize) => {
   const teacher = sequelize.define("teacher", {
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true
        },
        status: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: true
        }
    },{
        tableName: "teacher",
    });
    
    return teacher;
}