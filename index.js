var express = require('express');
var app = express();
var session = require('express-session');



var cookieParser = require('cookie-parser');

var bodyParser = require('body-parser');
var path = require('path');

app.use(bodyParser.json());

var port = 8080;

// Пользователи

var users = [
    {user: 'admin', password: '12345'},
    {user: 'user', password: '54321'},
    {user: 'guest', password: '00000'}
];
//создание хранилища для сессии

var createStore = () => {
    var MSSQLStore = require('connect-mssql')(session);
    var mssql = require('mssql');
    var config = {
        user: 'test',
        password: '12345',
        server: 'localhost',
        database: 'testdb',
        pool: {
            max: 10,
            min: 0,
            idleTimeoutMillis: 30000
        },
        port: 1433
    };
    return new MSSQLStore(config);
};
var store = createStore();

//регистрация обработчика кукисов
app.use(cookieParser());

//создание сессии
app.use(session({
    store: store,
    resave: false,
    saveUninitialized: true,
    secret: 'supersecret'
}));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/login', function (req, res) {
    var foundUser;
    //поиск пользователя
    for (var i = 0; i < users.length; ++i) {
        var u = users[i];
        if (u.username === req.body.username && u.password === req.body.password){
            foundUser = u.username;
            break;
        }
    }
    if (foundUser !== undefined) {
        req.session.username = foundUser;
        console.log('Login succeeded: ', req.session.username);
        req.send('Login successful: ' + 'Session ID: ' + req.session.id + '; user: ' + req.session.username);
    } else {
        console.log('Login failed: ', req.session.username);
        res.status(401).send('Login error');
    }
});

app.get('/check', function (req, res) {
    if (req.session.username) {
        req.set('Content-Type', 'text/html');
        res.send('<h2>User ' + req.session.username + ' is logged in! </h2>');
    } else {
        res.send('not logged in');
    }
});

app.listen(port, function () {
    console.log('app running port ' + port)
});