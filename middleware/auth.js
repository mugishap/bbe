const jwt=require('jsonwebtoken');
exports.protect=async (req, res,next) => {
const jsonwebtoken=req.headers.token;
if(!jsonwebtoken){
    return res.status(401).json({
        success:false,
        message:"Access Denied"
    })
}
if(!jsonwebtoken.startsWith("Bearer ")){
    return res.status(401).json({
        success:false,
        message:"Access Denied"
    })
}
const token=jsonwebtoken.split("Bearer ")[1];
try {
    const decoded=await jwt.verify(token,"dsdsds@$%trtdsdsdsd");
    //geting logged in user
    req.user=decoded;
    next();
}
catch(err){
    return res.status(401).json({
        success:false,
        message:"Access Denied"
    })
}
}

//Granting access to certain roles
exports.role = (...roles) => {
    try {
      return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
          return res.status(403).json({
            success: false,
            message: `user role "${req.user.role}" is unauthorized to access this route`,
          });
        }
        next();
      };
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  };