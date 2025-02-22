import express, { Request, Response, NextFunction } from 'express';
import {UserRequest} from './types';
import { error } from 'console';


// THIS IS FOR READING USERS /read
const router = express.Router();

router.get('/usernames', (req: UserRequest, res: Response) => {
    let usernames = req.users?.map((user) => {
        return { id: user.id, username: user.username };
    });
    res.send(usernames);
});

router.get('/username/:name', (req:UserRequest, res:Response) => {
    // input parameters are in the params property
    let name = req.params.name;
    let usrs = req.users?.filter(u => u.username == name);
  
    // if length 0 send error
    if (usrs?.length === 0) {
      res.send(
        error({message: name + " not found", status: 404})
      )
    }
  
    // send the objects that matched
    res.send(usrs);
  })

export default router;