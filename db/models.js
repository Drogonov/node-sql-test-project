module.exports = {
    modelBuilder
}

function modelBuilder(sequelize, tableName, attributes) {
    const options = {
        defaultScope: {
            // exclude hash by default
            attributes: { exclude: ['hash'] }
        },
        scopes: {
            // include hash with this scope
            withHash: { attributes: {}, }
        }
    };

    return sequelize.define(tableName, attributes, options)
}