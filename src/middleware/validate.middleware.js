const { ValidationError } = require('../utils/errors');

const validateRequest = (schema) => {
  return (req, res, next) => {
    try {
      const { error } = schema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true
      });

      if (error) {
        const messages = error.details.map(detail => detail.message);
        throw new ValidationError(messages.join(', '));
      }

      next();
    } catch (err) {
      next(err);
    }
  };
};

module.exports = validateRequest; 