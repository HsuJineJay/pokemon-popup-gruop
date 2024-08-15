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

//nodemailer
const nodemailer = require('nodemailer')
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'pokemonpopupstore@gmail.com',
        pass: 'dzglimofmytoyqaz'
    },
    socketTimeout: 60000
})

function mailSomeone(mailAddress, mailSubject, mailText) {
    const mailOptions = {
        from: 'pokemonPopUpStore@gmail.com',
        to: mailAddress,
        subject: mailSubject,
        text: mailText
    }
    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, function (err, info) {
            if (err) {
                return reject(err)
            } else {
                return resolve(info)
            }
        })
    })
        .then(info => {
            // req.flash('success_message', '寄信成功!')
            // res.redirect('back')
            res.send(mailAddress)

        })
        .catch((err) => console.log(err))
}



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

function hashPasswordSync(password) {
    try {
        // 生成鹽值並哈希密碼,一步完成
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);
        return hashedPassword;
    } catch (error) {
        console.error('Error hashing password:', error);
        throw error;
    }
}




app.use(express.static('./public'))


app.post('/loginApi', function (req, res) {
    let account = req.body.account
    let password = req.body.password

    conn.query(`select * from userInfo where userExist = 1 AND userAccount = '${account}'`,
        [],
        function (err, result) {
            // console.log(result);
            // console.log(password);
            // console.log(result[0].userPassword);
            if(!err){
                // console.log('good');
                if(result[0]!==undefined){
                    verifyPassword(password, result[0].userPassword)
                        .then(function (check) {
                            if (check) {
                                //存入session
                                req.session.account = req.body.account;
                                res.send(true);
        
                            } else {
                                res.send(false);
                            }
                        })
                }else{
                    res.send(false);
                }
            }else{
                console.log(err);
                // res.send(err)
            }
        })
})

app.post('/loginForgetApi', function (req, res) {
    let account = req.body.account
    req.session.accountForget = account

    conn.query(`select * from userInfo where userAccount = '${account}'`,
        [],
        function (err, result) {
            // console.log(result);
            let code = '';
            for (let i = 0; i < 6; i++) {
                code += Math.floor(Math.random() * 10)
            }
            req.session.code = code;
            // console.log(password);
            // console.log(result[0].userPassword);
            if (result[0] !== undefined) {
                let data = [{
                    userEmail: result[0].userEmail,
                    code: code
                }]
                res.send(JSON.stringify(data));
            } else {
                res.send(false);
            }
        })
})
app.post('/loginForgetCheckApi', function (req, res) {
    let code = req.body.code
    if (code === req.session.code) {
        console.log('good');
        res.send(true)
    } else {
        console.log('notPass');
        res.send(false)
    }

})
app.post('/changePWApi', function (req, res) {
    let account = req.session.accountForget;
    res.send(account)
})
app.post('/updatePWApi', function (req, res) {
    let account = req.session.accountForget
    let password = req.body.userPassword

    let hashedPassword = hashPasswordSync(password);
    // console.log('Hashed password:', hashedPassword);

    conn.query(`UPDATE userInfo SET userPassword = '${hashedPassword}' WHERE userAccount = '${account}'`,
        [],
        function (err, result) {
            if (err) {
                res.send(false)
                console.log(err);
            } else {
                res.send(true)
                console.log(result);
            }
    })
})

app.get('/checkUserAuthority', function(req, res){
    let account = req.session.account

    conn.query(`SELECT * FROM userInfo INNER JOIN userAuthority INNER JOIN page on userInfo.userID = userAuthority.authorityUserID AND userAuthority.authorityPageID = page.pageID WHERE userAccount = '${account}'`,
        [],
        function (err, result) {
            if (err) {
                res.send(false)
                console.log(err);
            } else {
                res.send(result)
            }
    })
})


app.post('/mailSomeone', function (req, res) {
    let mail = req.body.mail
    let subject = req.body.subject
    let text = req.body.text
    mailSomeone(mail, subject, text)

})
app.get('/check', function (req, res) {
    if (req.session.account !== undefined) {
        // res.send(true);
        res.send(req.session.account);
    } else {
        res.send(false);

    }
})
app.get('/logout', function (req, res) {
    delete req.session.account;
    res.send('out')
})

