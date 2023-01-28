const express = require("express")

const userRouter = require("./user/user.routes")
const postRouter = require("./post/post.routes")

const errorHandler = require('./_middleware/error.handler');
const PORT = process.env.PORT || 8080

const app = express()

app.use(express.json())
app.use(errorHandler);
app.use('/api', userRouter)
app.use('/api', postRouter)

app.listen(PORT, () => console.log('Server listening on port ' + PORT))