const { PrismaClient, Prisma } = require('@prisma/client');
const generateToken = require("../../helpers/generateToken")
const prisma = new PrismaClient()
var bcrypt = require('bcryptjs');
const sendVerificationEmail = require("../../helpers/sendEmail")
const crypto = require('crypto');
const { isValid } = require('zod');
const homeRoute = function(req,res,next){
      res.send("This time no tutorial")
}
const signUp = async function(req,res,next){
    try{
        const {username, email, password} = req.body;
        var hashPassword = bcrypt.hashSync(password, 10);
        const existingUser = await prisma.user.findUnique({
            where:{
                email :email
            }
        })
        if(existingUser){
            res.json({
                message:"User with email already exist"
            })
            
        }
        else{
            const otp = crypto.randomInt(100000, 999999); // 6-digit OTP
            const otpExpiration = new Date();
            otpExpiration.setMinutes(otpExpiration.getMinutes()+10);

            await prisma.OTP.create({
                data: {
                    email: email,
                    otp: otp.toString(),
                    expiresAt: otpExpiration
                }
            });
            await sendVerificationEmail(email, otp);

            const user = await prisma.user.create({
                data:{
                    email:email,
                    name:username,
                    password:hashPassword,
                    owner_id:1
                }
             })
             let data = {
                time:Date(),
                email : user.email,
                role: user.role,
                userId : user.id
             } 
             const token =  generateToken(data)
             res.json({
                message:"user created sucessfully",
                access_token : token
             })
        }
    }
    catch(e){
        console.log(e)
    }
     
}

const signIn = async function(req,res){
    try{
        const {email, password} = req.body;
        const user = await prisma.user.findUnique({
            where:{
                email:email
            }
        })
        if(user){
            const checkPassword = bcrypt.compareSync(password, user.password)
            if(checkPassword){
                let data = {
                    time:Date(),
                    email : user.email,
                    role: user.role,
                    isValid: user.isValid,
                    userId : user.id
                 } 
                 const token =  generateToken(data)
                 res.json({
                    message:"user login sucessfully",
                    access_token : token
                 })
            }
            else{
                res.json({
                    message:"user credential wrong"
                })
            }
        }
        else{
            res.json({
                message:"no user exists"
            })
        }
        
    }catch(e){
        console.log(e)
    }
}

const verifyOtp = async function(req,res){
    try{
      const {email , otp} = req.body
      console.log(req.body)
      const otpEntry = await prisma.OTP.findFirst({
        where: {
            email: email,
            otp: otp
        }
    })
    if (!otpEntry) {
        return res.status(400).json({ message: "Invalid OTP" });
    }
    // if (new Date() > otpEntry.expiresAt) {
    //     return res.status(400).json({ message: "OTP expired" });
    // }
    const user = await prisma.user.findUnique({
        where:{
            email: email
        }
    })
    if(user.isValid == true){
        res.json({
            message:"user already validated"
        })
    }
    else{
        await prisma.user.update({
            where :{
                email:email
            },
            data:{
                isValid : true
            }
        }).then(res.json({
            message:"user email verified sucessfully"
        }))
        }
    }
    catch(e){
       console.log(e)
    }
}

const getAllUsers = async function(req,res){
    try{
        const userFromToken = req.user
        const user = await prisma.user.findUnique({
          where:{
              email:userFromToken.email
          }
        })
    }
    catch(e){
        console.log(e)
    }
}


module.exports = { homeRoute,signUp,signIn,verifyOtp,getAllUsers }