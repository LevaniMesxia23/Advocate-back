import jwt from "jsonwebtoken"

export const generateToken = (id:string) => {
  return jwt.sign({id}, process.env.JWT_SECRET!, {expiresIn: "1h"})
}

export const generateRefreshToken = (id:string) => {
  return jwt.sign({id}, process.env.REFRESH_SECRET!, {expiresIn: "7d"})
}