import {Request, Response} from 'express'
import { User } from '../models/User'

export const ping = (req: Request, res: Response) => {
  res.json{pong: true}
}

export const mainInfo = async (req: Request, res: Response) => {
  let allData = await User.findAll()
  res.json({allData: allData})
}