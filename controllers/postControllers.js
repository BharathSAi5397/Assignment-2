const { UserData, PostData } = require("../models/User");
var jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");


//token generation
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {

    return jwt.sign({ id }, "mykey", { expiresIn: maxAge });
}

//get users
module.exports.getusers=async(req,res)=>{
    const data= await UserData.find();
    res.json(data)
}

//register controller
module.exports.register = async (req, res) => {
    try {
        const {password}=req.body;
        bcrypt.hash(password, 10, async function(err, hash) {
            if(err)
            {
                res.status(500).json({
                    status:"failed",
                    message:err.message
                })
            }
            try{
                req.body.password=hash;
                const data = await UserData.create(req.body);
                res.status(200).json({
                    "status": "success",
                    "data": data
                })
            }catch(e){
                res.status(500).json({
                    status:"failed",
                    message:e.message
                })}
        } )   
    } catch (e) {
        res.status(400).json({
            "message": e.message
        })
    }
}

//login controller
module.exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserData.findOne({ email: email });
        //console.log(user)
        if(!user)
        {
            return res.status(400).json({
                status:"Failure",
                message:"Invalid user"
            })
        }
        bcrypt.compare(password, user.password, function(err, result) {
            // result == true
            //console.log("bcrypt",result)
            if (err) {
                return res.status(500).json({
                    status: "failed",
                    message: err.message
                })
            }
            if(result)
            {
                const token = createToken(user._id);
                res.json({
                    "status": "success",
                    token
                })
            }
            else{
                res.status(400).json({
                    "message":"incorrect password"
                })
            }
        });
       
    } catch (e) {
        res.status(400).json({
            "message": e.message
        })
    }
}

//createposts
module.exports.posts = async (req, res) => {
    console.log(req.body);
    try {
        const data = await PostData.create(req.body);
        res.json(data)
    } catch (e) {
        res.status(400).json({
            "message": e.message
        })
    }
}

//updatingpost
module.exports.putposts=async (req,res)=>{
    try{
        const id= req.params.id;
        const datatoUpdate=req.body;
        const posttoupdate= await PostData.findById(id);
        //console.log(req.body.user,posttoupdate)
        //console.log(posttoupdate.user.equals(req.body.user))
        if(!(posttoupdate.user.equals(req.body.user)))
        {
           return res.status(400).json({
                "message":"unauthorized User"
            })
        }
        const postupdate= await PostData.findByIdAndUpdate(id,datatoUpdate,{
            runValidators:true,
            new:true
        })
        res.json({
            "message":"Success"
        })
    }catch(e){
        res.status(400).json({
            "message":e.message
        })
    }
}

//deleting post
module.exports.deleteposts=async (req,res)=>{
    try{
        const id= req.params.id;
        const posttoupdate= await PostData.findById(id);
        if(posttoupdate==null)
        {
            return res.status(400).json({
                "message":"no post with the id"
            })
        }
        //console.log(req.body.user,posttoupdate)
        //console.log(posttoupdate.user.equals(req.body.user))
        if(!(posttoupdate.user.equals(req.body.user)))
        {
           return res.status(400).json({
                "message":"unauthorized User"
            })
        }
        const postupdate= await PostData.findByIdAndDelete(id)
        res.json({
            "message":"Success"
        })
    }catch(e){
        res.status(400).json({
            "message":e.message
        })
    }

}

//fetching posts
module.exports.fetchposts=async (req,res)=>{
    try{
        const data= await PostData.find();
        res.status(400).json(data)
    }catch(e){
        res.status(400).json({
            "message":e.message
        })
    }
}