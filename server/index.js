require('dotenv').config();
const express = require('express');
const massive = require('massive');
const session = require('express-session');

const app = express();

const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env;

//controllers
const { checkForUser, register, login, logout} = require('./auth');
const { searchPost, getPosts, addPost } = require('./controller');

//massive
massive(CONNECTION_STRING)
    .then(db => {
        app.set('db', db);
        dbInstance = db;
        console.log("Database Connected");
    })
    .catch(error => console.log(error));

app.use(
    session({
        secret: SESSION_SECRET,
        resave: false,
        saveUninitialized: true
    })
)

//middleware
app.use(express.json());
app.use(checkForUser);

//Auth
app.post('/auth/user/register', register);
app.post('/auth/user/login', login);
app.post('/auth/user/logout', logout);
app.get('auth/user', function(req, res) {
    if(req.session.user) {
        res.status(200).json({user: req.session.user, isLoggedIn: true});
    } else {
        res.status(410).json({isLoggedIn: false})
    }
})

// posts http request
app.get('/api/posts/title', searchPost);
app.get('/api/posts', getPosts);
app.post('/api/posts', addPost);

app.listen(SERVER_PORT, () => console.log(`Running on PORT ${SERVER_PORT}.`));