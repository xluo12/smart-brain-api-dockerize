const fetch = require('node-fetch');


const requireAuth = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json('Unauthorized');
    }
    console.log("fetch!!!!!!!!!!!!!!!\n\n");
    console.log("authorization: ", authorization);
    fetch(process.env.AUTHORIZATION_URI, {
        method: 'post',
        headers: {'Content-Type': 'application/json',
                  'Authorization': authorization
        }
    })
    .then(res => {
        console.log('res: \n\n', res);
        res.json();
        console.log('res after json: \n\n', res);
    })
    .then(res => {
        if (res.status === 401) {
            return res.status(401).json('Unauthorized');
        }
        return next();
    })
}

module.exports = {
    requireAuth: requireAuth
}