import express from 'express';
import Admin from '../models/Admin.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const router = express.Router();

router.post('/login', async (req, res) => {
    const {username, password, role} = req.body;
    if(role === 'admin'){
        
            const admin = await Admin.findOne({  username });
            if(!admin){
              return res.json({message : "Admin not found"});
            }
            const validPassword = await bcrypt.compare(password, admin.password);
            if(!validPassword){
            return res.json({message : "Invalid Password"});
            }
            const token = jwt.sign({username: admin.username, role: 'admin'}, process.env.JWT_SECRET, {expiresIn: '1h'});
            res.cookie('token', token, { httpOnly: true, secure: true });
          
            return res.json({login:true,role: 'admin', token: token});
        }
        }
)
export {router as AdminRouter}
