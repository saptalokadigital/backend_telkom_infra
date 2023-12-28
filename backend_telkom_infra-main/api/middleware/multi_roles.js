const jwt = require("jsonwebtoken");
// Define roles
const ROLES = {
    USER: "user",
    ADMIN: "admin",
    SUPER_ADMIN: "super-admin",
};

// Define authorization rules
const AUTHORIZATION_RULES = {
    [ROLES.USER]: {
        user: true,
    },
    [ROLES.ADMIN]: {
        user: true,
        admin: true,
    },
    [ROLES.SUPER_ADMIN]: {
        user: true,
        admin: true,
        superAdmin: true,
    },
};

// Middleware function for role-based authorization check
function checkRole(role) {
    return (req, res, next) => {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];
        jwt.verify(token, process.env.JWT_KEY, function (err, decoded) {
            if (err)
                return res.status(500).send({
                    message: "Failed to authenticate token.",
                });
            req.user = decoded;
        });
        if (
            req.user &&
            req.user.role &&
            AUTHORIZATION_RULES[req.user.role][role]
        ) {
            next();
        } else {
            res.status(403).json({ message: `${req.user} Forbidden` });
        }
    };
}
/**
 * app.get('/profile', checkRole('user'), (req, res) => {
 *  Your code here
 * })
 *
 */

module.exports = checkRole;
