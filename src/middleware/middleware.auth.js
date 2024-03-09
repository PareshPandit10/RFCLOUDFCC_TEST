jwt = require('jsonwebtoken');
const SECRET_KEY = 'RFB2024'

const auth = (req, res, next) => {
    try {
        let token = req.headers.authorization;
        if (token) {
            token = token.split(" ")[1];
            let user = jwt.verify(token, SECRET_KEY);
            req.user = user;
            next();
        }
        else{
            res.status(200).send('UNAUTHORIZED USER')
        }
    } catch (error) {
        res.status(200).send('USER AUTHENTICATION FAILED')
        console.log('USER AUTHENTICATION FAILED ' + error.message);
    }
}

module.exports.auth = auth; 