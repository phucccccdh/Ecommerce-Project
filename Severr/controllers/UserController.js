import {UserModel} from '../models/UserModel.js'
import {generateToken} from '../untils/until.js'
import expressAsyncHandler from 'express-async-handler'

import Joi from 'Joi';
import bcrypt from 'bcrypt';

//Client-User
export const registerUser = expressAsyncHandler(async (req, res) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(30).required().label("Your error message in name"),
        email: Joi.string().min(3).max(200).required().email().label("Your error message in email"),
        password: Joi.string().min(6).max(200).required().label("Your error message in password"),
        
    })
    let user = await UserModel.findOne({email: req.body.email});
    if (user) return res.status(401).send({message: 'Email already in use'});

    const {name, email, password} = req.body;
    const {error} = schema.validate({name, email, password});
    if (error) return res.status(401).send(error.details[0].message);

    user = new UserModel({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        address: '',
        phone: '',
        isAdmin: false,
    })
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();
    res.send({
        _id: user._id,
        name: user.name,
        email: user.email,
        password: user.password,
        address: user.address ,
        phone: user.phone,
        token: generateToken(user),
    });
})

export const login = expressAsyncHandler(async (req, res) => {
    let user = await  UserModel.findOne({email: req.body.email})
    if(!user) res.status(401).send({ message: "invalid email "})

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword)
        return res.status(400).send({message:"Invalid password..."});
        
        // const token= generateToken(user);
        // console.log(token);
        res.send({
            _id: user._id,
            name: user.name,
            email: user.email,
        password: user.password,
        address: user.address ,
        phone: user.phone,
        isAdmin: user.isAdmin,
        token: generateToken(user),
    });
})


//Admin
export const getAllUser = (req, res) => {
    UserModel.find({})
        .then(user => res.send(user))
        .catch(err => console.log(err))
}

export const DeleteUser = expressAsyncHandler(async (req, res) => {
    const user = await UserModel.findById({_id: req.params.id})
    
    if(user){
        await user.remove()
        res.send({message: 'user deleted'})
    }else{
        res.send({message: 'user not exists'})
    }
})