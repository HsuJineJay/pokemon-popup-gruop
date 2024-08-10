var express = require('express');
var app = express();
app.listen(3000);
//導入body-parser 以處理post
var bp = require('body-parser');
app.use(bp.urlencoded({ extended: true }));
app.use(bp.json());

//導入express-session 以儲存各網頁互傳時的資料
var session = require('express-session');
app.use(session({
    secret: "password",
    resave: false,
    saveUninitialized: true,
}))

//sql
var myspl = require('mysql');
var conn = myspl.createConnection({
    user: "root",
    password: '',
    host: 'localhost',
    // host : '127.0.0.1', //也可以這樣 localhost = 127.0.0.1
    port: 3306,
    database: 'mfeeDB'
})
conn.connect(function (err) {
    if (!err) {
        console.log('連線成功');
    } else {
        console.log(err);
    }
})



// const bcrypt = require('bcrypt');
// async function verifyPassword(plainTextPassword, hashedPassword) {
//     try {
//         const match = await bcrypt.compareSync(plainTextPassword, hashedPassword);
//         //   console.log(match);
//         console.log('right');
//         return match;
//     } catch (error) {
//         console.log('wrong');
//         console.error('Error verifying password:', error);
//         return false;
//     }
// }
const bcrypt = require('bcryptjs');

async function verifyPassword(plainTextPassword, hashedPassword) {
  try {
    const match = await bcrypt.compare(plainTextPassword, hashedPassword);
    return match;
  } catch (error) {
    console.error('Error verifying password:', error);
    return false;
  }
}


app.use(express.static('./public'))


app.post('/loginApi', function (req, res) {
    let account = req.body.account
    let password = req.body.password

    conn.query(`select * from userInfo where userAccount = '${account}'`,
        [],
        function (err, result) {
            // console.log(result);
            // console.log(password);
            // console.log(result[0].userPassword);
            verifyPassword(password, result[0].userPassword)
                .then(function (check) {
                    if (check) {
                        //存入session
                        req.session.account = req.body.account;
                        res.send(true);
                        // res.redirect('/login'); //重新導向

                    } else {
                        res.send(false);
                    }
                })
        })
})
app.post('/loginForgetApi', function (req, res) {
    let account = req.body.account

    conn.query(`select * from userInfo where userAccount = '${account}'`,
        [],
        function (err, result) {
            console.log(result[0]);
            // console.log(password);
            // console.log(result[0].userPassword);
            if(result[0] !== undefined){
                res.send(true);
            }else{
                res.send(false);
            }
        })
})
app.get('/check', function (req, res) {
    if(req.session.account !== undefined){
        res.send(true);
    }else{
        res.send(false);
        
    }
})
app.get('/logout', function (req, res) {
    delete req.session.account;
    res.send('out')
})