const { PrismaClient, Prisma } = require('@prisma/client');
const generateToken = require("../../helpers/generateToken")
const prisma = new PrismaClient()
var bcrypt = require('bcryptjs');
const sendVerificationEmail = require("../../helpers/sendEmail")
const crypto = require('crypto');
const { isValid } = require('zod');

const ownerSignUp = async function (req,res) {
    try{
        const {name, email, password} = req.body;
        var hashPassword = bcrypt.hashSync(password, 10);
        const existingUser = await prisma.owner.findUnique({
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
            // await sendVerificationEmail(email, otp);

            const user = await prisma.owner.create({
                data:{
                    email:email,
                    name:name,
                    password:hashPassword
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

const userCreateByOwner = async function (req, res) {
    try{
        const ownerId = req.user.userId
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

            // await prisma.OTP.create({
            //     data: {
            //         email: email,
            //         otp: otp.toString(),
            //         expiresAt: otpExpiration
            //     }
            // });
            
            // await sendVerificationEmail(email, otp);

            const user = await prisma.user.create({
                data:{
                    email:email,
                    name:username,
                    password:hashPassword,
                    owner_id: ownerId
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
         console.log("error")
    }
}

module.exports = {userCreateByOwner,ownerSignUp }