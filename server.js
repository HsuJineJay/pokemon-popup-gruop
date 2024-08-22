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
    return bcrypt.compare(plainPassword, hashedPassword);
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


// app.post('/loginApi', function (req, res) {
//     let account = req.body.account
//     let password = req.body.password

//     conn.query(`select * from userInfo where userExist = 1 AND userAccount = '${account}'`,
//         [],
//         function (err, result) {
//             // console.log(result);
//             // console.log(password);
//             // console.log(result[0].userPassword);
//             if (!err) {
//                 // console.log('good');
//                 if (result[0] !== undefined) {
//                     verifyPassword(password, result[0].userPassword)
//                         .then(function (check) {
//                             if (check) {
//                                 //存入session
//                                 req.session.account = req.body.account;
//                                 res.send(true);

//                             } else {
//                                 res.send(false);
//                             }
//                         })
//                 } else {
//                     res.send(false);
//                 }
//             } else {
//                 console.log(err);
//                 // res.send(err)
//             }
//         })
// })
app.post('/loginApi', async (req, res) => {
    const { account, password } = req.body;
  
    try {
      // 使用参数化查询以避免 SQL 注入
      const sql = 'SELECT * FROM userInfo WHERE userExist = 1 AND userAccount = $1';
      const result = await pool.query(sql, [account]);
  
      if (result.rows.length > 0) {
        const user = result.rows[0];
        const passwordMatch = await verifyPassword(password, user.userPassword);
  
        if (passwordMatch) {
          // 存入 session
          req.session.account = account;
          res.send(true);
        } else {
          res.send(false);
        }
      } else {
        res.send(false);
      }
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  });

app.get('/getITAccount', function (req, res) {
    conn.query(`select * from userInfo where userTitle = 'IT'`,
        [],
        function (err, result) {
            // console.log(result);

            if (result[0] !== undefined) {
                let data = [{
                    userAccount: result[0].userAccount,
                    userName: result[0].userName,
                    userEmail: result[0].userEmail,
                }]
                res.send(JSON.stringify(data));
            } else {
                res.send(false);
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
                    userAccount: result[0].userAccount,
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

app.get('/checkUserAuthority', function (req, res) {
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






// menuItem的路由
/* app.get('/api/menuItem', async (req, res) => {
    try {
        const itemMain = req.query.itemMain;
        const menuExist = req.query.menuExist;

        // SQL查詢資料語法 
        let sql = 'SELECT * FROM menuItem WHERE 1 = 1';
        let params = [];

        if (itemMain !== undefined) {
            sql += ' AND itemMain = $1';
            params.push(itemMain);
        }

        if (menuExist !== undefined) {
            sql += ' AND menuExist = $2';
            params.push(menuExist);
        }

        // 查詢資料執行
        const result = await pool.query(sql, params);

        // 接收資料(JSON格式)
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'menuItem資料庫查詢錯誤' });
    }
});
 */
// product的路由
app.use('/api/product', productRoutes);

// menuitem的路由
app.use('/api/menuItem', menuItemRoutes);

/* 
app.get('/api/product', async (req, res) => {
    try {
        const productExist = req.query.productExist;
        const storeOnly = req.query.storeOnly;

        // 構建 SQL 查詢
        // let sql = 'SELECT * FROM product LEFT JOIN productImg ON product.productID = productImg.imgProductID WHERE 1 = 1';
        let sql = 'SELECT * FROM product WHERE 1 = 1';
        const params = [];

        // 添加篩選條件
        if (productID !== undefined) {
            sql += ' AND productID = $1';
            params.push(productID);
        }
        if (productExist !== undefined) {
            sql += ' AND productExist = $2';
            params.push(productExist);
        }
        if (productName !== undefined) {
            sql += ' AND productName ILIKE $3';
            params.push(`%${productName}%`);
        }
        if (productType !== undefined) {
            sql += ' AND productType ILIKE $4';
            params.push(`%${productType}%`);
        }
        if (productDescribe !== undefined) {
            sql += ' AND productDescribe ILIKE $5';
            params.push(`%${productDescribe}%`);
        }
        if (productPrice !== undefined) {
            sql += ' AND productPrice = $6';
            params.push(productPrice);
        }
        if (productInStock !== undefined) {
            sql += ' AND productInStock = $7';
            params.push(productInStock);
        }
        if (storeOnly !== undefined) {
            sql += ' AND storeOnly = $8';
            params.push(storeOnly);
        }
        if (productMain !== undefined) {
            sql += ' AND productMain = $9';
            params.push(productMain);
        }


        // 執行查詢
        const result = await pool.query(sql, params);

        // 格式化資料
        // const formattedData = result.rows.reduce((acc, row) => {
        //     const productId = row.productID;
        //     if (!acc[productId]) {
        //         acc[productId] = {
        //             ...row,
        //             productImg: []
        //         };
        //     }
        //     acc[productId].productImg.push({
        //         imgId: row.imgId,
        //         productImg: row.productImg
        //     });
        //     return acc;
        // }, {});

        // res.json(formattedData);

                // 接收資料(JSON格式)
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: '資料庫查詢錯誤' });
    }
});
 */

// 處理找不到的路由404錯誤
app.use((req, res, next) => {
    console.log(`404 Error: ${req.originalUrl}`);
    res.status(404).sendFile(path.join(__dirname, 'public', 'error.html'));
});