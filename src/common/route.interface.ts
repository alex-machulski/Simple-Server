import {NextFunction, Request, Response} from "express";

export interface IControllerRoute {
    path: string;
    func: (req: Request, res: Response, next: NextFunction) => void;
    method: 'get' | 'post' | 'put' | 'delete' | 'patch';
    //method2: keyof Pick<Router, 'get' | 'post' | 'put' | 'delete' | 'patch'>
}