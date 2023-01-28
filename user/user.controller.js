const userService = require("./user.service")

class UserController {
    async createUser(req, res, next) {
        userService.create(req.body)
            .then(() => res.json({ message: 'Creating user successful', userName: req.body.userName }))
            .catch(next)
    }

    async getUsers(req, res, next) {
        userService.getAll()
            .then(users => res.json(users))
            .catch(next)
    }

    async getUser(req, res, next) {
        userService.getById(req.params.id)
            .then(user => res.json(user))
            .catch(next)
    }

    async updateUser(req, res, next) {
        userService.update(req.params.id, req.body)
            .then(user => res.json(user))
            .catch(next)
    }

    async deleteUser(req, res, next) {
        userService.delete(req.params.id)
            .then(() => res.json({ message: 'User deleted successfully' }))
            .catch(next)
    }
}

module.exports = new UserController()