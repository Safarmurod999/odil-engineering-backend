import jwt from "jsonwebtoken";
export const jwtHelper = {
  sign: (payload, secretKey, options) => {
    return jwt.sign(payload, secretKey, options);
  },
  verify: (token, secretKey) => {
    try {
      return jwt.verify(token, secretKey);
    } catch (error) {
      return error.message;
    }
  },
};
