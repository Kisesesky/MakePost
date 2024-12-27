import User from '../models/user.js'
import express, {Router} from 'express';

const router = express.Router();

router.post('/signup', async (req,res)=>{
    const createUser = await User.create(req.body)
    res.status(201).json(createUser)
})


export default router