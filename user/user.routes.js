const Router = require("express")
const router = new Router()
const userController = require("./user.controller")

router.post('/user', userController.createUser)
router.get('/users', userController.getUsers)
router.get('/user/:id', userController.getUser)
router.put('/user/:id', userController.updateUser)
router.delete('/user/:id', userController.deleteUser)

module.exports = router
