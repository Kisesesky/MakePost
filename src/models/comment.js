import express from 'express'
import { Schema } from 'mongoose'
import { mongoose } from 'mongoose';

const CommentSchema =new Schema(
    {
        content : {
            type : String,
            required : true
        },
        likes: {
            type: Number,
            default: 0
        },
        post: {type: mongoose.Schema.Types.ObjectId, ref:"Post"},
        author: {type: mongoose.Schema.Types.ObjectId, ref:"User", required: true}
    },
    {
        timestamps : true
    }
)
CommentSchema.pre('remove', async (next)=>{ //cascading
    const user = await this.model("User").findById(this.author._id)
    user.posts.pull(this._id)
    await user.save()
    
    const post = await this.model("Post").findById(this.post._id)
    user.posts.pull(this._id)
    await user.save()
    next();
})

const Comment = mongoose.model('Comment', CommentSchema);

export default Comment