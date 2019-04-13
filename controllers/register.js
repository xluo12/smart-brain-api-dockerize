const createSessions = require('./signin').createSessions;

const handleRegister = (req, res, db, bcrypt) => {
  const { email, name, password } = req.body;
  if (!email || !name || !password) {
    return res.status(400).json('incorrect form submission');
  }
  const hash = bcrypt.hashSync(password);
    db.transaction(trx => {
      trx.insert({
        hash: hash,
        email: email
      })
      .into('login')
      .returning('email')
      .then(loginEmail => {
        return trx('users')
          .returning('*')
          .insert({
            email: loginEmail[0],
            name: name,
            joined: new Date()
          })
          .then(user => {
            const usr = user[0];
            console.log('User: ', usr);
            console.log("before createSessions!!!!!");
            createSessions(usr)
            .then(session => {
              const reply = { session: session, user: usr};
              console.log("reply: ", reply);
              res.json(reply);
            })
            .catch(err => res.status(400).json(err))            
          })
      })
      .then(trx.commit)
      .catch(trx.rollback)
    })
    .catch(err => res.status(400).json('unable to register'))
}

module.exports = {
  handleRegister: handleRegister
};


