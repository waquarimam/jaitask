const jwt = require('jsonwebtoken');
const conn = require('../Database Connection/dbConnection').promise();
const {validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');

exports.update = async (req,res,next) => {

    try{

        if(
            !req.headers.authorization ||
            !req.headers.authorization.startsWith('Bearer') ||
            !req.headers.authorization.split(' ')[1]
        ){
            return res.status(422).json({
                message: "Please provide the token",
            });
        }

        const theToken = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(theToken, 'the-super-strong-secrect');

        const hashPass = await bcrypt.hash(req.body.password, 12);
      console.log(req.body);
        const [rows] = await conn.execute('UPDATE users SET name=?,email=?,password=? WHERE id = ?',[
            req.body.name,
            req.body.email,
            hashPass,
            decoded.id ]);

        if (rows.affectedRows === 1) {
            return res.status(201).json({
                message: "The user has been successfully updated.",
            });
        }
        
    }catch(err){
        next(err);
    }
}