const jwt = require('jsonwebtoken');
const conn = require('../Database Connection/dbConnection').promise();

exports.deleteUser = async (req,res,next) => {

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
        console.log(decoded.id);
        const [rows] = await conn.execute(
           
            "DELETE  FROM `users` WHERE `id`=?",
            [decoded.id]
        );

        res.clearCookie("jwt");
        if (rows.affectedRows === 1) {
            return res.status(201).json({
                message: "The user has been successfully deleted.",
            });
        }
        
       
    }
    catch(err){
        next(err);
    }
}