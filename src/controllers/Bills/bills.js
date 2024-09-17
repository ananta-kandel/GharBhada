const { PrismaClient, Prisma } = require('@prisma/client');
const { use } = require('../../routes/ownerRoutes/ownerBasic');
const { date } = require('zod');
const prisma = new PrismaClient()
// d Int @id @default(autoincrement())
// rent Int
// electricity_unit Int
// month Month 
// internet_money Int?
// waste_money Int?
// otheri   String
// user User @relation(fields: [user_id], references: [id])
// user_id Int
const createBill = async function (req,res){
    try{
         const {rent, electricity_unit, month, internet_money, waste_money,other} = req.body
         console.log(req.body)
         const user_id = req.params.id
        console.log(user_id)
        // const current_year = 2022
        const year =new  Date()
         const current_year = year.getFullYear();
         const bill = await prisma.bill.findFirst({
            where:{
                month:month,
                year:current_year
            }
         })
         
        
         if(bill){
            res.json({
                message:"bill for that month is already created"
            })
         }
         
        else{
            await prisma.bill.create({
                data:{
                    rent:rent,
                    electricity_unit: electricity_unit,
                    internet_money:internet_money,
                    month:month,
                    waste_money:waste_money,
                    other:"for now nothing",
                    user_id: Number(user_id),
                    year:current_year
                }
            }).then(
                res.json({
                    message:"bill created sucesfylly"
                })
            )
        }
     
        }
    catch(e){
        console.log(e)
    }
}

module.exports = createBill