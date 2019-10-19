var jwt = require('jsonwebtoken');

class TokenGenerator {

    generateToken(payload) {
        let token = jwt.sign(payload, "privateKey", {
            expiresIn: '24h' // (in sec) expires in 6 hours
        });

        let object = {
            success: true,
            message: "token generated",
            token: token
        }
        return object;
    }


    verifyToken(req, res, next) {

        let token = req.body.token;
        console.log("token  is : ", req.body.token);


        if (token) {
            jwt.verify(token, "privateKey", (err, decodedToken) => {
                if (err) {
                    res.status(400).send(err + " Token has expired")
                } else {
                    console.log("token " + JSON.stringify(decodedToken));
                    req.token = decodedToken;
                    next();
                }

            })

        } else {
            console.log("token not receive");
            res.status(400).send(" Token not received")

        }

    }


}

module.exports = new TokenGenerator();