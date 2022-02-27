const express = require('express');
const {sequelize} = require('../models');
const { QueryTypes } = require('sequelize');

const{User,Post} = require('../models');
const user = require('../models/user');

const appRoute = express.Router();

function asyncHandler(callBack){
    return async (req,res,next) => {
        try {
            await callBack(req,res,next);
        } catch (error) {
            next(error);
        }
    }
}

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

//Get all posts
appRoute.get('/posts', async(req,res)=>{
    
    try {
        const posts = await Post.findAll();
        return res.status(200).json(posts);
        
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
});

//Cate postari are fiecare user

appRoute.get('/posts/howMany/:id', async(req,res)=>{
    const user = req.params.id;
    try {
        const results = await sequelize.query(`SELECT COUNT(userId) AS "howMany" FROM Posts WHERE userId=${user}`,
        {
           nest: true,
           type: QueryTypes.SELECT
        });     
        return res.status(200).json(results);
        
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
});

//Postarile unui user

appRoute.get('/posts/myPosts/:id', async(req,res,next)=>{
    const user = req.params.id;
    try {
        const results = await sequelize.query(`select * from Posts where userId = ${user}`,
        {
           nest: true,
           type: QueryTypes.SELECT
        });
        if(results.length == 0) throw new Error(`User id doesn't exist.`);
        return res.status(200).json(results);
        
    } catch (error) {
        next(error);
    }
});     

