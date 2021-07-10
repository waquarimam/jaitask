
var uniqid = require('uniqid');



exports.platform = async (req,res,next) =>{
   
    try{
        row=uniqid(req.params.platform + req.params.id +'-')

        return res.json({
            row
        });

    }
    catch(err){
        next(err);
    }
}