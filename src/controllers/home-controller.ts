import { Request, Response } from "express";
import {StatusCodes} from "http-status-codes"
const HomeController = {
  async home(req: Request, res: Response) {
    res.status(StatusCodes.OK).json({ 
        success:true,
        message: "Welcome to Home API" ,
        error:{},
        data:{}
    });
  },
};

export default HomeController;
