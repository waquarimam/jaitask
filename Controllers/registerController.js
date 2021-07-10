const {validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const conn = require('../Database Connection/dbConnection').promise();
const response =require('./response');
exports.register = async(req,res,next) => {
   try
{
    
        const [row] = await conn.execute(
            "SELECT `email` FROM `users` WHERE `email`=?",
            [req.body.email]
          );
        if (row.length > 0) {
            return res.status(201).json({
                message: "The E-mail already in use",
            });
        }

        const hashPass = await bcrypt.hash(req.body.password, 12);

        const [rows] = await conn.execute('INSERT INTO `users`(`name`,`email`,`password`) VALUES(?,?,?)',[
            req.body.name,
            req.body.email,
            hashPass
        ]);

        if (rows.affectedRows === 1) {
            return res.status(201).json({
                message: "The user has been successfully inserted.",
            });
        }
        
    }catch(err){
        next(err);
    }
}