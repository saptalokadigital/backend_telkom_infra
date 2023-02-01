const jwt = required("jsonwebtoken");

function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, "Snippet_Key", (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}
function generateAccessToken(isername) {
    return jwt.sign({ data: username }, "Snippet_Key", {
        expireIn: "1h",
    });
}

module.exports = {
    authenticateToken,
    generateAccessToken,
};
