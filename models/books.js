
module.exports = (sequelize , DataTypes) => {
    const Books = sequelize.define('books' , {
        id : {
            type : DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        name : {
            type : DataTypes.STRING(100),
            required : true
        },
        author : DataTypes.STRING(100),
        description : DataTypes.STRING(255),
        issued : {
            type : DataTypes.BOOLEAN(),
            defaultValue : false
        },
        studentName : DataTypes.STRING(100)
    })

    return Books;
}