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

module.exports = {userRegistrationSchema , userLoginSchema}
