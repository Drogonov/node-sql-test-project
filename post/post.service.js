const db = require('../db/db');

class PostService {

    async create(params) {
        await db.Post.create(params)
    }

    async getAll() {
        return await db.Post.findAll()
    }

    async getById(id) {
        return await getPost(id)
    }

    async getByUserId(id) {
        return await getUserPosts(id)
    }

    async update(id, params) {
        const post = await getPost(id)
        
        // copy params to user and save
        Object.assign(post, params)
        await post.save()
    
        return omitHash(post.get())
    }

    async delete(id) {
        const post = await getPost(id)
        await post.destroy()
    }
}

module.exports = new PostService()

// helper functions

async function getPost(id) {
    const post = await db.Post.findByPk(id)
    if (!post) throw 'Post not found'
    return post
}

async function getUserPosts(id) {
    const posts = await db.Post.findAll({
        where: {
            userId: id
        }
    })

    if (!posts) throw 'Posts not found'
    return posts;
}

function omitHash(post) {
    const { hash, ...postWithoutHash } = post
    return postWithoutHash
}
