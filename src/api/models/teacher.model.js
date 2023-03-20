export default (sequelize, Sequelize) => {
   const teacher = sequelize.define("teacher", {
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true
        },
        is_suspended: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: true
        }
    },{
        tableName: "teacher",
    });
    
    return teacher;
}