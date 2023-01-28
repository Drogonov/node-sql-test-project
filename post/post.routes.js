const Router = require("express")
const router = new Router()
const postController = require("./post.controller")

router.post('/post', postController.createPost)
router.get('/posts', postController.getPosts)
router.get('/post/:id', postController.getPost)
router.get('/post', postController.getUserPosts)
router.put('/post/:id', postController.updatePost)
router.delete('/post/:id', postController.deletePost)

module.exports = router