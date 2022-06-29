import Joi from "@hapi/joi";

export const registerAuthenticate = (data) => {
  const Schema = Joi.object({
    username: Joi.string().required().trim().min(4).max(100),
    email: Joi.string().required().email().trim().min(4).max(100),
    password: Joi.string().required().trim().min(6).max(500),
  });

  return Schema.validate(data);
};
export const loginAuthenticate = (data) => {
  const Schema = Joi.object({
    email: Joi.string().required().email().trim().min(4).max(100),
    password: Joi.string().required().trim().min(6).max(500),
  });

  return Schema.validate(data);
};
