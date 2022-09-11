var jwt = require('jsonwebtoken');
const { UserData, PostData } = require("../models/User");

const reqAuth = (req, res, next) => {
    //console.log("middleware")
    if (req.headers.authorization) {
        const token = req.headers.authorization.split("test ")[1];
        //console.log(token)
        jwt.verify(token, 'mykey', async function (err, decoded) {
            if (err) {
                res.status(500).json({
                    status: "failed",
                    message: "Not Authenticated"
                })
            }
            //console.log(decoded.id)
            const user = await UserData.findOne({ _id: decoded.id });
            req.body.user = user._id;
            next();
        });
    }
    else {
        return res.status(500).json({
            status: "failed",
            message: "Invalid token"
        })
    }
}
module.exports = reqAuth;