import { Request, Response, NextFunction } from "express";
import passport from "passport";
import { BasicStrategy } from "passport-http";
import { User, UserInstance } from "../models/User";
import dotenv from "dotenv";
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";
import jwt from 'jsonwebtoken'


dotenv.config();

const notAuthorizedJson = { status: 401, message: "Não autorizado" };

const options = {
 jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
 secretOrKey: process.env.JWT_SECRET as string,
};

passport.use(
 new JWTStrategy(options, async (payload, done) => {
  const user = await User.findByPk(payload.id);
  return user ? done(null, user) : done(notAuthorizedJson, false);
 })
);

export const privateRoute = (
 req: Request,
 res: Response,
 next: NextFunction
) => {
 const authFunction = passport.authenticate(
  "jwt",
  (err: Error, user: UserInstance) => {
   req.user = user;
   return user ? next() : next(notAuthorizedJson);
  }
 );
 authFunction(req, res, next);
};


export const generateToken= (data:object) => {
  return jwt.sign(data, process.env.JWT_SECRET as string)
}
/*
const notAuthorizedJson = {status:401, message: 'Não autorizado'}
passport.use( new BasicStrategy(async (email, password, done)=>{
  if(email && password){
    const user = await User.findOne({
      where:{ email, password }
    })
    if(user){
      return done(null, user)
    }
  }else{
    return done(notAuthorizedJson, false);
  }  
}))

export const privateRoute = (req:Request, res:Response, next:NextFunction) =>{
  const authFunction = passport.authenticate('basic', (error : Error, user:UserInstance)=>{
   return user ? next() : next(notAuthorizedJson)
  })
  authFunction(req, res, next)
}

*/
export default passport;
