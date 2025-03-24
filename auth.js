const jwt = require('jsonwebtoken');

const ensureAuthorization = (req, res) => {
    try {
        let receiverJwt = req.headers["authorization"];
        console.log("receiverJwt : ",receiverJwt);

        if (receiverJwt) {
            let decodedJwt = jwt.verify(receiverJwt, process.env.PRIVATE_KEY);
            console.log("decodedJwt : ",decodedJwt);
            return decodedJwt;
        } else {
            throw new ReferenceError("jwt must be provided");
        };
        
    } catch (err) {
        console.log(err.name);
        console.log(err.message);

        return err;
    }
};


module.exports = ensureAuthorization;