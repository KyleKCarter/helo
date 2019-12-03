const bcrypt = require('bcryptjs');

const checkForUser = (req, res, next) => {
    if(!req.session.user) {
        req.session.user = {
            loggedIn: false
        }
    }
    next();
}

const register = async (req, res, next) => {
    const db = req.app.get('db');
    const {username, password, image} = req.body;

    const checkedUser = await db.get_user([username]);
    if(checkedUser.length === 0) {
        const salt = bcrypt.genSaltSync(12);
        const hashedPassword = bcrypt.hashSync(password, salt);
        const user = await db.register_user([username, hashedPassword, image]);
        req.session.user = {
            id: user[0].user_id,
            username
        }
        return res.json(req.session.user)
    } else {
        res.status(409).json({error: "Username taken, please try another."});
    }
}

const login = async (req, res, next) => {
    const db = req.app.get('db');
    const {username, password} = req.body;
    const checkedUser = await db.get_user([username]);
    if(checkedUser.length === 0) {
        res.status(401).json({ error: "Wrong username or password" })
    }
    const isMatching = await bcrypt.compare(password, checkedUser[0].password)
    if(isMatching) {
        req.session.user = {
            id: checkedUser[0].user_id,
            username: checkedUser[0].username
        }
        res.status(200).json(req.session.user)
    } else {
        return res.status(403).json({error: "Wrong username or password"})
    }
}

const logout = async (req, res, next) => {
    req.session.destroy();
    res.sendStatus(200);
}

module.exports = {
    checkForUser,
    register,
    login,
    logout
}