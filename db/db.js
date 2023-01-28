const config = require('./config.json')
const mysql = require('mysql2/promise')
const { Sequelize } = require('sequelize')
const { DataTypes } = require('sequelize')

module.exports = db = {}

initialize()

async function initialize() {
    // create db if it doesn't already exist
    const { host, port, user, password, database } = config.database;
    const connection = await mysql.createConnection({ host, port, user, password })
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`)

    // connect to db
    const sequelize = new Sequelize(database, user, password, { dialect: 'mysql' })

    initUserTable(sequelize, db)
    initPostTable(sequelize, db)

    // sync all models with database
    await sequelize.sync()
}

async function initUserTable(sequelize, db) {
    // init models and add them to the exported db object
    const attributes = {
        name: { type: DataTypes.STRING, allowNull: false },
        surname: { type: DataTypes.STRING, allowNull: false }
    }

    db.User = require('./models').modelBuilder(sequelize, 'User', attributes)
}

async function initPostTable(sequelize, db) {
    // init models and add them to the exported db object
    const attributes = {
        title: { type: DataTypes.STRING, allowNull: false },
        content: { type: DataTypes.STRING, allowNull: false }
    };

    db.Post = require('./models').modelBuilder(sequelize, 'Post', attributes)
    db.Post.belongsTo(db.User, {
        foreignKey: 'userId'
      })
}