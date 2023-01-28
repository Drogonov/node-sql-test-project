const db = require('../db/db')

class UserService {
    async create(params) {        
        await db.User.create(params)
    }

    async getAll() {
        return await db.User.findAll()
    }

    async getById(id) {
        return await getUser(id)
    }

    async update(id, params) {
        const user = await getUser(id)
    
        // validate
        const usernameChanged = params.username && user.username !== params.username;
        if (usernameChanged && await db.User.findOne({ where: { username: params.username } })) {
            throw 'Username "' + params.username + '" is already taken'
        }
    
        // copy params to user and save
        Object.assign(user, params)
        await user.save()
    
        return omitHash(user.get())
    }

    async delete(id) {
        const user = await getUser(id)
        await user.destroy()
    }
}

module.exports = new UserService()

// helper functions

async function getUser(id) {
    const user = await db.User.findByPk(id)
    if (!user) throw 'User not found'
    return user
}

function omitHash(user) {
    const { hash, ...userWithoutHash } = user
    return userWithoutHash
}
