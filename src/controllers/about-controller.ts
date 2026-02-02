import { Request, Response } from "express";

const AboutController = {
  async about(req: Request, res: Response) {
    res.status(200).json({ 
        success:true,
        message: "Welcome to About API" ,
        error:{},
        data:{}
    });
  },
};

export default AboutController;
