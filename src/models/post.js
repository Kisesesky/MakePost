import mongoose, { Schema } from "mongoose";



const PostSchema = new Schema(
    {
        title : {
            type : String,
            required : true
        },
        content : String,
        likes : {
            type: Number,
            defalut: 0
        },
        view: {
            type: Number,
            defalut: 0
        },
        comments: [{type: mongoose.Schema.Types.ObjectId, ref:"Comment"}],
        author: {type: mongoose.Schema.Types.ObjectId, ref:"User"},
    },
    {
        timestamps :true
    }
)
PostSchema.pre('remove', async (next)=>{ //cascading
    const user = await this.model("User").findByIdAndUpdate(this.author, {
        $pull: {post: this._id}
    })
    // user.posts.pull(this._id)
    // await user.save()
    
    await this.model("Comment").deleteMany({author: this._id}) // 1 : n의 관계라서
    next()
})

const Post = mongoose.model('Post', PostSchema);

export default Post