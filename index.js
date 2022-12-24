//const http = require('http');
//const fs = require('fs');
//
//let server = http.createServer((req, res) => {
//    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
//
//    if (req.url == '/')
//        fs.createReadStream('./templates/index.html').pipe(res);
//    else if (req.url == '/about')
//        fs.createReadStream('./templates/about.html').pipe(res);
//    else 
//        fs.createReadStream('./templates/error.html').pipe(res);
//});
//
//const PORT = 3000;
//const HOST = 'localhost';
//
//server.listen(PORT, HOST, () => {
//    console.log(`Server works: http://${HOST}:${PORT}`);
//});
const fs = require('fs');
const express = require('express');


const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/signin', (req, res) => {
    res.render('signin')
})

app.get('/login', (req, res) => {
    res.render('login');
});


const showOthers = (namee) => {
    let file = JSON.parse(fs.readFileSync('./names.json', 'utf-8'));
    let userss = file.users;
    let others = [];

    for (i of userss){
        if (i.name !== namee){
            others.push(i.name);
        } 
    }
    return others;
}


app.get('/user/:username/', (req, res) => {
    let data = {username: req.params.username, others: showOthers(req.params.username)};
    res.render('user', data);
});

app.get('/user/:username/chat/:friend', (req, res) => {
    let data = {username: req.params.username, friend: req.params.friend ,others: showOthers(req.params.username)};
    res.render('chat', data);
})

app.post('/check-user', (req, res) => {
    let username = req.body.username;
    let word = req.body.password;

    let file = JSON.parse(fs.readFileSync('./names.json', 'utf-8'));
    file.users.push({name: username, password: word});
    fs.writeFileSync('./names.json', JSON.stringify(file, null, 2));

    if (username == "")
        return res.redirect('/');
    else 
        return res.redirect('/user/' + username);

});

app.post('/send', (req, res) => {
    let message = req.body.message;

    let obj = {name: message, password: word};

    let file = JSON.parse(fs.readFileSync('./names.json', 'utf-8'));
    let userss = file.users;
    let arr = [];
})



app.post('/verify', (req, res) => {
    let username = req.body.usernamev;
    let word = req.body.passwordv;

    let obj = {name: username, password: word};

    let file = JSON.parse(fs.readFileSync('./names.json', 'utf-8'));
    let userss = file.users
    let arr = [];

    for (i of userss){
        if (i.name == obj.name && i.password == obj.password){
            arr.push(obj.name);
        } 
    }

    if (arr.length === 0){
        return res.redirect('/');
    } else if (arr.length === 1){
        return res.redirect('/user/' + username);
    }
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server started: http://localhost:${PORT}`);
});