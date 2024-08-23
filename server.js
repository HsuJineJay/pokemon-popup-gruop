require('dotenv').config();
var express = require('express');
var app = express();
// app.listen(3000);

//導入body-parser 以處理post
var bp = require('body-parser');
app.use(bp.urlencoded({ extended: true }));
app.use(bp.json());

const { Pool } = require('pg');

const path = require('path'); // 引入 path 模組

const port = process.env.DB_PORT || 5432; //port號

const cors = require("cors"); //導入cors解決跨域存取問題

const productRoutes = require('./backEnd/routes/productRoutes'); //導入productRoutes.js處理產品有關路由

const menuItemRoutes = require('./backEnd/routes/menuItemRoutes'); //導入productRoutes.js處理產品有關路由

//cors解決跨域存取問題，目前是設定開放所有的來源
// app.use(cors());

app.use(cors({
    origin: ['http://localhost:5432', 'http://0.0.0.0:5432'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));


//連線prorgresSQL 使用.env的資料
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT, // PostgreSQL 默認端口是 5432
    ssl: { rejectUnauthorized: false }, // 启用 SSL 模式 (根据需要调整 rejectUnauthorized)
    // ssl: false,
});

// 連接postrgeSQL資料庫
pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('連線postrgeSQL失敗', err);
    } else {
        console.log('成功連線postrgeSQL');
    }
});

// 確認一下port號是多少
app.listen(port, () => {
    console.log(`伺服器port號是 ${port}`);
});


//導入express-session 以儲存各網頁互傳時的資料
var session = require('express-session');
app.use(session({
    // secret: "password",
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
}))


// 連接MySQL資料庫
/* 
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
}) */


//nodemailer
const nodemailer = require('nodemailer')
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        // user: 'pokemonpopupstore@gmail.com',
        // pass: 'dzglimofmytoyqaz'
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
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
const { log } = require('console');

// async function verifyPassword(plainTextPassword, hashedPassword) {
//     try {
//         const match = await bcrypt.compare(plainTextPassword, hashedPassword);
//         return match;
//     } catch (error) {
//         console.error('Error verifying password:', error);
//         return false;
//     }
// }
async function verifyPassword(plainPassword, hashedPassword) {
    // return bcrypt.compare(plainPassword, hashedPassword);
    try {
        const match = await bcrypt.compare(plainPassword, hashedPassword);
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




app.use(express.static('./public'));


app.post('/loginApi', async (req, res) => {
    // const { account, password } = req.body;
    let account = req.body.account
    let password = req.body.password
    // console.log('inAPI');
    try {
        // 使用参数化查询以避免 SQL 注入
        const sql = 'SELECT * FROM userInfo WHERE userExist = 1 AND userAccount = $1';
        const result = await pool.query(sql, [account]);
        // console.log(account);
        // console.log(password);
        if (result.rows.length > 0) {
            const user = result.rows[0];
            // console.log(user);
            const passwordMatch = await verifyPassword(password, user.userpassword);
            // console.log(passwordMatch);
            if (passwordMatch) {
                // 存入 session
                req.session.account = account;
                res.send(true);
                // console.error('k');
            } else {
                res.send(false);
                console.error('error1');
            }
        } else {
            res.send(false);
            console.error('error2');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/getITAccount', function (req, res) {
    
    pool.query(
        `SELECT * FROM userInfo WHERE userTitle = 'IT'`,
        // `SELECT * FROM userInfo`,
        [],
        function (err, result) {
            if (err) {
                console.error('Database query error:', err);
                res.status(500).send('Database error');
                return;
            }
            // console.log(result);
            // let user = result.rows[0];
            // console.log(result.rows);
            // console.log(typeof(result.row));
            if (result.rows !== undefined) {
                let data = [{
                    userAccount: result.rows[0].useraccount,
                    userName: result.rows[0].username,
                    userEmail: result.rows[0].useremail,
                }];
                res.send(JSON.stringify(data));
            } else {
                res.send(false);
            }
        }
    );
})

app.post('/loginForgetApi', function (req, res) {
    let account = req.body.account
    req.session.accountForget = account

    pool.query(`select * from userInfo where userAccount = $1`,
        [account],
        function (err, result) {
            // console.log(result);
            let code = '';
            for (let i = 0; i < 6; i++) {
                code += Math.floor(Math.random() * 10)
            }
            req.session.code = code;
            // console.log(password);
            // console.log(result[0].userPassword);
            if (result.rows !== undefined) {
                let data = [{
                    userAccount: result.rows[0].useraccount,
                    userEmail: result.rows[0].useremail,
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

    pool.query(`UPDATE userInfo SET userPassword = $1 WHERE userAccount = $2`,
        [hashedPassword,account],
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

app.get('/checkUserAuthority', function (req, res) {
    let account = req.session.account

    pool.query(
        `
        SELECT * 
        FROM userInfo 
        INNER JOIN userAuthority ON userInfo.userID = userAuthority.authorityUserID 
        INNER JOIN page ON userAuthority.authorityPageID = page.pageID 
        WHERE userInfo.userAccount = $1;
        `,
        [account],
        function (err, result) {
            if (err) {
                res.send(false)
                console.log(err);
            } else {
                res.send(result)
            }
    })
    // conn.query(`SELECT * FROM userInfo INNER JOIN userAuthority INNER JOIN page on userInfo.userID = userAuthority.authorityUserID AND userAuthority.authorityPageID = page.pageID WHERE userAccount = '${account}'`,
    //     [],
    //     function (err, result) {
    //         if (err) {
    //             res.send(false)
    //             console.log(err);
    //         } else {
    //             res.send(result)
    //         }
    // })
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






// product的路由
app.use('/api/product', productRoutes);

// menuitem的路由
app.use('/api/menuItem', menuItemRoutes);

// 處理找不到的路由404錯誤
app.use((req, res, next) => {
    console.log(`404 Error: ${req.originalUrl}`);
    res.status(404).sendFile(path.join(__dirname, 'public', 'error.html'));
});