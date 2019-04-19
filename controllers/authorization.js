
const requireAuth = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json('Unauthorized');
    }
    fetch('http://localhost:23456/', {
        method: req.method,
        headers: req.headers,
        authorization: req.authorization
    })
    .then(res => res.json())
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