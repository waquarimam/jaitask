const jwt = require('jsonwebtoken');
const requireAuth = async (req,res,next)=>{

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
if(theToken)
{
jwt.verify(theToken, 'the-super-strong-secrect',(err,decodedToken)=>{
if(err)
{
    console.log(err.msg);
}
else
next();
}
);

}
else{
    res.redirect('/login');
}
}
module.exports= requireAuth;