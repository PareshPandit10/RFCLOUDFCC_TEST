const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const { client } = require('../config/config.database');

const SECRET_KEY = process.env.SECRET_KEY;

// User Authentication using Bcrypt 
const signin = async (request, response) => {
    const { username, password } = request.body;

    let adminQuery = {
        text: `SELECT
                    id,
                    username,
                    password,
                    role
                FROM
                    usercredentials
                WHERE
                    username = $1;`,
        values: [username]
    }

    let query = {
        text: `SELECT
                    userdetails.firstname,
                    userdetails.lastname,
                    userdetails.phone,
                    userdetails.email, 
                    usercredentials.username,
                    usercredentials.password,
                    usercredentials.role,
                    usercredentials.id
                FROM 
                    usercredentials 
                JOIN
                    userdetails ON usercredentials.userautoid = userdetails.id
                WHERE 
                    usercredentials.username = $1
                AND 
                    usercredentials.isenable = 1 
                AND 
                    userdetails.isenable = 1;`,
        values: [username]
    };

    try {
        var role = username.substring(username.indexOf('@') + 1, username.indexOf('.'));
        var result;

        if (role === 'admin') {
            try {
                result = await client.query(adminQuery);
            }
            catch (error) {
                console.log(' DATABASE ERROR WHILE GETTING RO DETAILS ');
                response.status(200).json({ message: ' Error while getting Retail Outlet Information ' })
            }
        }
        else {
            try {
                result = await client.query(query);
            }
            catch (error) {
                console.log(' DATABASE ERROR WHILE GETTING USER DETAILS ');
                response.status(200).json({ message: ' Error while getting User Details ' });
            }
        }

        if (result.rows.length === 0) {
            console.log(' USER NOT FOUND : ' + username);
            response.status(200).json({ message: ' User Not found ' });
        }
        else {
            const userInfo = result.rows[0];

            bcrypt.compare(password, userInfo.password, async (error, result) => {
                if (result == true) {

                    //Sign the token
                    const token = jwt.sign({ username: username }, SECRET_KEY);

                    //Delete Password Before user info send
                    delete userInfo.password;

                    //Set token and user information in response
                    response.status(200).json({ userInfo: userInfo, token: token });

                    console.log(' USER LOGGED IN ' + username);
                }
                else if (error) {
                    console.log(' ERROR WHILE VALIDATING PASSWORD FOR USER ' + username + ' ' + error.message);
                    response.status(200).json({ message: ' Error While Validating the Password ' })
                }
                else {
                    console.log(' INCORRECT PASSWORD FOR USER ' + username);
                    response.status(200).json({ message: ' Incorrect Password ' });
                }
            });
        }
    }
    catch (error) {
        console.log(' ERROR WHILE SIGNIN FOR USERNAME :  ' + username + ' ' + error.message);
        response.status(200).json({ message: 'Something Went Wrong while signin ' });
    }
};

//New User Registration 
const signup = (request, response) => {
    const { username, name, password } = request.body;

    //Check if rocode and username is already exist or not
    pool.query('SELECT * FROM userdetails WHERE username = $2', [username], async (error, result) => {
        if (error) {
            response.status(200).send(' Something went wrong ');
        }
        else if (result.rows.length > 0 && result.rows[0].rocode === rocode) {
            response.status(200).send(' User already exists');
        }
        else {
            let HashPassword = await bcrypt.hash(password, 10);
            //if rocode and username is not already exist then registerd
            pool.query('INSERT INTO userlist (rocode,username,name,password) VALUES ($1,$2,$3,$4)', [rocode, username, name, HashPassword], (err, res) => {
                if (error) {
                    response.status(200).json({ message: 'Something went wrong' });
                }
                else {
                    response.status(200).json({ message: 'User Registered Successfully!' });
                }
            });
        }
    })
}

module.exports = { signin, signup }
