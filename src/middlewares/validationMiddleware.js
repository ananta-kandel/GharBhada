const { ZodError } = require('zod');

function validateData(schema) {
  return (req, res, next) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map((issue) => ({
          message: `${issue.path.join('.')} is ${issue.message}`,
        }));
        return res.status(400).json({ errors: errorMessages });
      }
      return res.status(500).json({ error: 'Internal server error' });
    }
  };
}

const validateBill = function(schema){
  try {
    schema.parse(req.body);
    next();
  } catch (e) {
    console.error("Validation failed", e.errors);
  }
}


module.exports = validateData ,validateBill
