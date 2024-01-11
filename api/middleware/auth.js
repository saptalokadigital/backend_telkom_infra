const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
    try {
        const token = req.cookies.access_token;
        if (!token){
             return res.json({message:"Access denied."});
        }
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).send("Invalid token");
    }
};
