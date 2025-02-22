import express, { Response } from 'express';
import fs from 'fs';
import  { promises as fsPromises } from 'fs';
import {UserRequest, User} from './types';
import path from 'path';
import {dataFile} from './server4'

// /write 
const router = express.Router()

// a route that receives a user object and saves it to the user data file
router.post('/adduser', async (req: UserRequest, res: Response) => {
  try {
    let newuser = req.body as User;
    req.users?.push(newuser);
    
    await fsPromises.writeFile(
      path.resolve(__dirname, dataFile), 
      JSON.stringify(req.users)
    );
    
    console.log('User Saved');
    res.send('done');
  } catch (err) {
    console.log('Failed to write:', err);
    res.status(500).send('Error saving user');
  }
});

export default router;