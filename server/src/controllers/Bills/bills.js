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


const calculateBillAmount = async function(req, res) {
    try {
        const id = Number(req.params.id);

        // Fetch the bill by ID
        const bill = await prisma.bill.findUnique({
            where: { id: id }
        });
        if(bill.totalAmount = 0){
            const previousMonthElectricityUnit = async function() {
                const month = [
                    'JANURARY', 'FEBURARY', 'MARCH', 'APRIL', 'MAY', 'JUN', 
                    'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'
                ];
                
                const currentMonthIndex = month.indexOf(bill.month);
                let previousBill;
    
                // Handle year transition for JANURARY
                if (bill.month === 'JANURARY') {
                    previousBill = await prisma.bill.findFirst({
                        where: {
                            month: month[11],  // December of the previous year
                            year: new Date().getFullYear() - 1
                        }
                    });
                } else {
                    previousBill = await prisma.bill.findFirst({
                        where: {
                            month: month[currentMonthIndex - 1],
                            year: new Date().getFullYear()
                        }
                    });
                }
    
                if (previousBill) {
                    return bill.electricity_unit - previousBill.electricity_unit;
                }
                return 0;  // Default value if no previous bill found
            };
    
            // Get the electricity units consumed compared to the previous month
            const consumedUnits = await previousMonthElectricityUnit();
            console.log(consumedUnits);
    
            // Calculate total price
            const totalAmount = bill.rent + consumedUnits * 12;
    
            // Respond with the bill details and total amount
            res.json({
                bill: bill,
                total_amount: totalAmount
            });
            await prisma.bill.update({
                where: { id: id },
                data: { total_amount: totalAmount }
            });    
        }
        else{
            res.json({
                // bill: bill,
                total_amount: bill.total_amount
            })
        }
       
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred');
    }
};

const viewBillAll = async function (req,res) {
            try{
                  id = 1
                  const bill = await prisma.bill.findMany({
                    where: { user_id: id }
                });
                res.json({
                     bill
                })
            }
            catch(e){
                  console.log(e)
            }
}
module.exports = {createBill,calculateBillAmount,viewBillAll}