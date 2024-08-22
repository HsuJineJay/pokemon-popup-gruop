// const express = require('express');
// const router = express.Router();
// const { Pool } = require('pg');

// //連線prorgresSQL 使用.env的資料
// const pool = new Pool({
//   user: process.env.DB_USER,
//   host: process.env.DB_HOST,
//   database: process.env.DB_NAME,
//   password: process.env.DB_PASSWORD,
//   port: process.env.DB_PORT, // PostgreSQL 默認端口是 5432
//   ssl: { rejectUnauthorized: false }, // 启用 SSL 模式 (根据需要调整 rejectUnauthorized)
// });

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
// router.get('/', async (req, res) => {
//     try {
//         let itemID = req.query.itemID !== undefined ? req.query.itemID : null;
//         let menuExist = req.query.menuExist !== undefined ? req.query.menuExist : null;
//         let itemName = req.query.itemName !== undefined ? req.query.itemName : null;
//         let itemType = req.query.itemType !== undefined ? req.query.itemType : null;
//         let itemDescribe = req.query.itemDescribe !== undefined ? req.query.itemDescribe : null;
//         let itemMain = req.query.itemMain !== undefined ? req.query.itemMain : null;
//         let itemPrice = req.query.itemPrice !== undefined ? req.query.itemPrice : null;
//         let itemImg = req.query.itemImg !== undefined ? req.query.itemImg : null;

//         // const itemMain = req.query.itemMain;
//         // const menuExist = req.query.menuExist;

//         // SQL查詢資料語法 
//         let sql = 'SELECT * FROM menuItem WHERE 1 = 1';

//         let conditions = [];
//         let params = [];

//         // 添加篩選條件
//         if (itemID!==null) {
//             conditions.push("itemID = $");
//             params.push(itemID);
//         }
//         if (menuExist!==null) {
//             conditions.push("menuExist = $");
//             params.push(menuExist);
//         }
//         if (itemName!==null) {
//             conditions.push("itemName Like $");
//             params.push("%" +itemName + "%");
//         }
//         if (itemType!==null) {
//             conditions.push("itemType Like $");
//             params.push("%" + itemType + "%" );
//         }
//         if (itemDescribe!==null) {
//             conditions.push("itemDescribe Like $");
//             params.push("%" + itemDescribe + "%" );
//         }
//         if (itemMain!==null) {
//             conditions.push("itemMain = $");
//             params.push(itemMain);
//         }
//         if (itemPrice!==null) {
//             conditions.push("itemPrice = $");
//             params.push(itemPrice);
//         }
//         if(conditions !== 0){
//             for(i of conditions){
//                 sql += 'And';
//                 sql += conditions[i];
//                 sql += i;
//             }
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

// module.exports = router;


const express = require('express');
const router = express.Router();
const { Pool } = require('pg');
require('dotenv').config();

// 連線 PostgreSQL，使用 .env 的資料
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT, // PostgreSQL 默認端口是 5432
  ssl: { rejectUnauthorized: false }, // 啟用 SSL 模式
});

// GET 請求處理
router.get('/', async (req, res) => {
    try {
        const { itemID, menuExist, itemName, itemType, itemDescribe, itemMain, itemPrice, itemImg } = req.query;

        let sql = 'SELECT * FROM menuItem WHERE 1 = 1';
        const params = [];

        if (itemID) {
            sql += ' AND itemID = $' + (params.length + 1);
            params.push(itemID);
        }
        if (menuExist) {
            sql += ' AND menuExist = $' + (params.length + 1);
            params.push(menuExist);
        }
        if (itemName) {
            sql += ' AND itemName LIKE $' + (params.length + 1);
            params.push(`%${itemName}%`);
        }
        if (itemType) {
            sql += ' AND itemType LIKE $' + (params.length + 1);
            params.push(`%${itemType}%`);
        }
        if (itemDescribe) {
            sql += ' AND itemDescribe LIKE $' + (params.length + 1);
            params.push(`%${itemDescribe}%`);
        }
        if (itemMain) {
            sql += ' AND itemMain = $' + (params.length + 1);
            params.push(itemMain);
        }
        if (itemPrice) {
            sql += ' AND itemPrice = $' + (params.length + 1);
            params.push(itemPrice);
        }
        if (itemImg) {
            sql += ' AND itemImg LIKE $' + (params.length + 1);
            params.push(`%${itemImg}%`);
        }

        const result = await pool.query(sql, params);
        res.json(result.rows);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'menuItem資料庫查詢錯誤' });
    }
});

// POST 請求處理
router.post('/', async (req, res) => {
    try {
        const { menuExist, itemName, itemType, itemDescribe, itemMain, itemPrice, itemImg } = req.body;

        const sql = `
            INSERT INTO menuItem (menuExist, itemName, itemType, itemDescribe, itemMain, itemPrice, itemImg)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING itemID
        `;
        const params = [menuExist, itemName, itemType, itemDescribe, itemMain, itemPrice, itemImg];
        const result = await pool.query(sql, params);

        res.json({ message: `insert: ${result.rows[0].itemid} --- OK` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'menuItem資料庫插入錯誤' });
    }
});

// DELETE 請求處理
router.delete('/', async (req, res) => {
    try {
        const { itemID } = req.body;

        const sql = 'DELETE FROM menuItem WHERE itemID = $1';
        const params = [itemID];
        await pool.query(sql, params);

        res.json({ message: `delete: ${itemID} --- OK` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'menuItem資料庫刪除錯誤' });
    }
});

// PUT 請求處理
router.put('/', async (req, res) => {
    try {
        const { itemID, menuExist, itemName, itemType, itemDescribe, itemMain, itemPrice, itemImg } = req.body;

        const sql = `
            UPDATE menuItem
            SET menuExist = $1, itemName = $2, itemType = $3, itemDescribe = $4, itemMain = $5, itemPrice = $6, itemImg = $7
            WHERE itemID = $8
        `;
        const params = [menuExist, itemName, itemType, itemDescribe, itemMain, itemPrice, itemImg, itemID];
        await pool.query(sql, params);

        res.json({ message: `update: ${itemID} --- OK` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'menuItem資料庫更新錯誤' });
    }
});

// PATCH 請求處理
router.patch('/', async (req, res) => {
    try {
        const { itemID, menuExist } = req.body;

        const sql = 'UPDATE menuItem SET menuExist = $1 WHERE itemID = $2';
        const params = [menuExist, itemID];
        await pool.query(sql, params);

        res.json({ message: `更改菜單狀態 ${itemID} --- OK` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'menuItem資料庫更新錯誤' });
    }
});

module.exports = router;


