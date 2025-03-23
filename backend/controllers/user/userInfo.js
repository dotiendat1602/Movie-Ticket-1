import dotenv from 'dotenv';
import { isTokenExpired, verifyToken } from '../../middlewares/JWT.js';
import connection from '../../models/SQLConnection.js';
dotenv.config();
export const userInfo = async (req, res) => {
    try {
        const token = req.body.jwt;

        if (!token) {
            return res.json({
                message: "Người dùng chưa đăng nhập",
                success: false
            })
        }

        if (isTokenExpired(token)) {
            return res.json({
                message: "Người dùng hết phiên đăng nhập",
                success: false
            })
        }

        const decoded = verifyToken(token);
        
        const [userInfo] = await connection.promise().query(
            `SELECT user_img,email,phone_number,full_name,sex,date_of_birth from users where user_id="${decoded.id}"`
        );

        if (userInfo.length === 0) {
            return res.status(500).json({
                message: "user không tồn tại",
                success: false
            });
        }

        return res.json({
            userInfo: userInfo,
            success: true
        })

    } catch (error) {
        return res.status(401).json({ message: "Invalid token", error: error.message });
    }
}

export const userInfoUpdate = async (req, res) => {
    try {
        const token = req.body.jwt;
        if (!token) {
            return res.json({
                message: "Người dùng chưa đăng nhập",
                success: false
            })
        }

        const decoded = verifyToken(token);

        if (isTokenExpired(token)) {
            return res.json({
                message: "Người dùng hết phiên đăng nhập",
                success: false
            })
        }
        const [userInfo] = await connection.promise().query(
            `UPDATE users
            SET full_name = '${req.body.name}', phone_number = '${req.body.phone__number}', email = '${req.body.gmail}'
            WHERE user_id="${decoded.id}"`
        );

        return res.json({
            message: "cập nhật thành công",
            success: true
        })

    } catch (error) {
        return res.status(401).json({ message: "Invalid token", error: error.message });
    }
}


export const userFilmLiked = async (req, res) => {
    try {
        const token = req.body.jwt;
        if (!token) {
            return res.json({
                message: "Người dùng chưa đăng nhập",
                success: false
            })
        }

        const decoded = verifyToken(token);

        if (isTokenExpired(token)) {
            return res.json({
                message: "Người dùng hết phiên đăng nhập",
                success: false
            })
        }
        const user_id = decoded.id
        const query =
            `SELECT 
                f.film_id,
                f.film_name,
                f.film_img,
                f.Release_date,
                fe.film_rate
            FROM 
                user_like_film ulf
            JOIN 
                films f ON ulf.film_id = f.film_id
            LEFT JOIN 
                film_evaluate fe ON f.film_id = fe.film_id
            WHERE 
                ulf.user_id = ?`

        connection.query(query, [user_id], (err, results) => {
            if (err) {
                return res.status(500).json({ error: 'Database query failed' });
            }
    
            return res.json(results);
        });

    } catch (error) {
        return res.status(401).json({ message: "Invalid token", error: error.message });
    }
}

export const userNew = async (req, res) => {
    try {
        const token = req.body.jwt;
        if (!token) {
            return res.json({
                message: "Người dùng chưa đăng nhập",
                success: false
            })
        }

        const decoded = verifyToken(token);

        if (isTokenExpired(token)) {
            return res.json({
                message: "Người dùng hết phiên đăng nhập",
                success: false
            })
        }
        const user_id = decoded.id
        const query =
            `select * from news
            where user_ID =  ?`

        connection.query(query, [user_id], (err, results) => {
            if (err) {
                return res.status(500).json({ error: 'Database query failed' });
            }
    
            return res.json(results);
        });

    } catch (error) {
        return res.status(401).json({ message: "Invalid token", error: error.message });
    }
}
