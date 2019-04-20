const fetch = require('node-fetch');


const requireAuth = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json('Unauthorized');
    }
    fetch(process.env.AUTHORIZATION_URI, {
        method: 'post',
        headers: {'Content-Type': 'application/json',
                  'Authorization': authorization
        }
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