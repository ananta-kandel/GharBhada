const { z } = require('zod');

const userRegistrationSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
});

const userLoginSchema = z.object({
   email:z.string().email(),
   password: z.string().min(8)
})
const MonthEnum = z.enum([
  "JANURARY",
  "FEBURARY",
  "MARCH",
  "APRIL",
  "MAY",
  "JUN",
  "JULY",
  "AUGUST",
  "SEPTEMBER",
  "OCTOBER",
  "NOVEMBER",
  "DECEMBER"
]);

// Define the schema for the Bill object
const BillSchema = z.object({
  rent: z.number(),
  electricity_unit: z.number(),
  month: MonthEnum, // Use the enum schema for validation
  internet_money: z.number().optional(),
  waste_money: z.number().optional(),
});
module.exports = {userRegistrationSchema , userLoginSchema,BillSchema}
