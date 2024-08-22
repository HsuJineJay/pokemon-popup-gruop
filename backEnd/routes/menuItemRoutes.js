const express = require('express');
const router = express.Router();
const { Pool } = require('pg');

//連線prorgresSQL 使用.env的資料
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT, // PostgreSQL 默認端口是 5432
  ssl: { rejectUnauthorized: false }, // 启用 SSL 模式 (根据需要调整 rejectUnauthorized)
});

// GET 路由
// router.get('/', async (req, res) => {
//     try {
//         const itemMain = req.query.itemMain;
//         const menuExist = req.query.menuExist;

//         // SQL查詢資料語法 
//         let sql = 'SELECT * FROM menuItem WHERE 1 = 1';
//         let params = [];

//         if (itemMain !== undefined) {
//             sql += ' AND itemMain = $1';
//             params.push(itemMain);
//         }

//         if (menuExist !== undefined) {
//             sql += ' AND menuExist = $2';
//             params.push(menuExist);
//         }

//         // 查詢資料執行
//         const result = await pool.query(sql, params);

//         // 接收資料(JSON格式)
//         res.json(result.rows);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'menuItem資料庫查詢錯誤' });
//     }
// });
router.get('/', async (req, res) => {
    try {
        let itemID = req.query.itemID !== undefined ? req.query.itemID : null;
        let menuExist = req.query.menuExist !== undefined ? req.query.menuExist : null;
        let itemName = req.query.itemName !== undefined ? req.query.itemName : null;
        let itemType = req.query.itemType !== undefined ? req.query.itemType : null;
        let itemDescribe = req.query.itemDescribe !== undefined ? req.query.itemDescribe : null;
        let itemMain = req.query.itemMain !== undefined ? req.query.itemMain : null;
        let itemPrice = req.query.itemPrice !== undefined ? req.query.itemPrice : null;
        let itemImg = req.query.itemImg !== undefined ? req.query.itemImg : null;

        // const itemMain = req.query.itemMain;
        // const menuExist = req.query.menuExist;

        // SQL查詢資料語法 
        let sql = 'SELECT * FROM menuItem WHERE 1 = 1';

        let conditions = [];
        let params = [];

        // 添加篩選條件
        if (itemID!==null) {
            conditions.push("itemID = $");
            params.push(itemID);
        }
        if (menuExist!==null) {
            conditions.push("menuExist = $");
            params.push(menuExist);
        }
        if (itemName!==null) {
            conditions.push("itemName Like $");
            params.push("%" +itemName + "%");
        }
        if (itemType!==null) {
            conditions.push("itemType Like $");
            params.push("%" + itemType + "%" );
        }
        if (itemDescribe!==null) {
            conditions.push("itemDescribe Like $");
            params.push("%" + itemDescribe + "%" );
        }
        if (itemMain!==null) {
            conditions.push("itemMain = $");
            params.push(itemMain);
        }
        if (itemPrice!==null) {
            conditions.push("itemPrice = $");
            params.push(itemPrice);
        }
        if(conditions !== 0){
            for(i of conditions){
                sql += 'And';
                sql += conditions[i];
                sql += i;
            }
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

module.exports = router;

