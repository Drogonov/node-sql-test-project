const postService = require("./post.service")

class PostController {
    async createPost(req, res, next) {
        postService.create(req.body)
            .then(() => res.json({ message: 'Creating post successful', title: req.body.title }))
            .catch(next)
    }

    async getPosts(req, res, next) {
        postService.getAll()
            .then(posts => res.json(posts))
            .catch(next)
    }

    async getPost(req, res, next) {
        postService.getById(req.params.id)
            .then(post => res.json(post))
            .catch(next)
    }

    async getUserPosts(req, res, next) {
        postService.getByUserId(req.query.id)
            .then(post => res.json(post))
            .catch(next)
    }

    async updatePost(req, res, next) {
        postService.update(req.params.id, req.body)
            .then(post => res.json(post))
            .catch(next)
    }

    async deletePost(req, res, next) {
        postService.delete(req.params.id)
            .then(() => res.json({ message: 'Post deleted successfully' }))
            .catch(next)
    }
}

module.exports = new PostController()