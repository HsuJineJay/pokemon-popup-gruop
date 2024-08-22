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
router.get('/', async (req, res) => {
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

module.exports = router;
