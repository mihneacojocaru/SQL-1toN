const express = require('express');

const{User,Post} = require('../models');
const user = require('../models/user');

const appRoute = express.Router();

//--- USERS

appRoute.get('/users', async(req,res)=>{
    try {  
        const user = await User.findAll();
        return res.status(200).json(user);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
});

appRoute.post('/users', async(req,res)=>{
    try {
        const {name,birthday,email} = req.body;
        const item = await User.create({name,birthday,email});
        return res.status(200).json(item);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
});

appRoute.delete('/users/:id', async(req,res)=>{
    const {id} = req.params;
    try {
        const item = await User.findByPk(id);
        await item.destroy(item);
        return res.json({msg:'User deleted!'});
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
});

appRoute.put('/users/:id', async(req,res)=>{
    const {id} = req.params;
    const {name,birthday,email} =req.body;
    try {
        const item = await User.findByPk(id);
        if(name) item.name = name;
        if(birthday) item.birthday = birthday;
        if(email) item.email = email;
        
        await item.save();
        return res.status(200).json(item);

    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
});

//--- POSTS

appRoute.post('/posts', async(req,res)=>{
    try {
        const{userId,body} = req.body;
        const myPost = await Post.create({body,userId});
        return res.status(200).json(myPost);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
});

module.exports = appRoute;