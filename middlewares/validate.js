import HttpError from "../helpers/HttpError.js";

export default (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) return next(HttpError(400, error.details[0].message));
  next();
};
