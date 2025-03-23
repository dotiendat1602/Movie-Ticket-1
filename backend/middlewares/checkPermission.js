import { verifyToken, isTokenExpired } from "./JWT.js";
import { systemConfig } from "../config/system.js";
import dotenv from "dotenv";
import connection from "../models/SQLConnection.js";
dotenv.config();

const SECRET_CODE = process.env.SECRET_CODE

export const checkPermissonAdmin = async (req, res, next) => {
    try {
//         // // buoc 1: nguoi dung dang nhap hay chua
//         // // let token = null;
//         // // if(req.session.user){
//         // //     token = req.cookies.jwt;
//         // // }
//         // // // buoc 2: kiem tra token
//         // // if(!token || isTokenExpired(token)){
//         // //     res.redirect("/auth/")
//         // // }
//         // if(!req.session||!req.session.user){
//         //     res.redirect("/auth/")
//         // }
//         // else{


//         // // // buoc 3: kiem tra quyen nguoi dung
//         // //     const token = req.cookies.jwt
//         // //     if(!token || isTokenExpired(token)){
//         // //             return res.status(404).json({
//         // //                 message: "loi token"
//         // //             })
//         // //         }
//         // //     const decoded = verifyToken(token);
//         // //     connection.query(`SELECT * from customers where id = ${decoded}`, (error, results, fields) => {
//         // //         if (results) {
//         // //             return res.status(404).json({
//         // //                 message: "loi user"
//         // //             })
//         // //         }
//         // //     })
//         // }
//         // if(!req.session||!req.session.user){
//         //     res.clearCookie("jwt");
//         //     res.clearCookie("user_name");
//         //     res.clearCookie("name");
//         //     res.clearCookie("phoneNumber");
//         //     res.clearCookie("address");
//         //     res.clearCookie("birthday");
//         //     res.clearCookie("sessionId")
//         //     res.render("index.html")
//         // }

        // Lấy token từ header Authorization
        const authHeader = req.headers['authorization'];
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                messages: "Chưa xác thực. Vui lòng đăng nhập trước!",
                success: false
            });
        }
        

        const token = authHeader.split(' ')[1]; // Tách 'Bearer' khỏi token
        const userId = verifyToken(token).id;

        // Nếu token expired hoặc không hợp lệ thì userId sẽ null
        if(!userId) {
            return res.status(401).json({
                messages: "Token không hợp lệ.Vui lòng đăng nhập trước!",
                success: false
            });
        }
        if(isTokenExpired(token)){
            return res.status(401).json({
                messages: "Token đã hết hạn.Vui lòng đăng nhập lại!",
                success: false
            });
        }

        const [user] = await connection.promise().query(`SELECT * FROM users WHERE user_id = ?`, [userId])

        if (user.length == 0) {
            return res.status(401).json({
                messages: "Token đã hết hạn hoặc không hợp lệ.Vui lòng đăng nhập trước!",
                success: false
            });
        }

        if(user[0].role != 1) {
            return res.status(401).json({
                messages: "Chỉ có admin mới có thể truy cập vào trang web này!",
                success: false
            });
        }

        res.locals.user = user;

        next();
    } catch (error) {
        console.log(error);
        if (error.message === "TokenExpiredError") {
            return res.status(401).json({
                messages: "Token đã hết hạn. Vui lòng đăng nhập lại!",
                success: false
            });
        }
        return res.status(401).json({
            messages: "Token đã hết hạn. Vui lòng đăng nhập lại!",
            success: false
        });
    }
}

export const checkPermissonUser = async (req, res, next) => {
    try {
        // Lấy token từ header Authorization
        const authHeader = req.headers['authorization'];
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                messages: "Chưa xác thực. Vui lòng đăng nhập trước!",
                success: false
            });
        }
        

        const token = authHeader.split(' ')[1]; // Tách 'Bearer' khỏi token
        const userId = verifyToken(token).id;

        // Nếu token expired hoặc không hợp lệ thì userId sẽ null
        if(!userId) {
            return res.status(401).json({
                messages: "Token không hợp lệ.Vui lòng đăng nhập trước!",
                success: false
            });
        }
        if(isTokenExpired(token)){
            return res.status(401).json({
                messages: "Token đã hết hạn.Vui lòng đăng nhập lại!",
                success: false
            });
        }

        const [user] = await connection.promise().query(`SELECT * FROM users WHERE user_id = ?`, [userId])

        if (user.length == 0) {
            return res.status(401).json({
                messages: "Token đã hết hạn hoặc không hợp lệ.Vui lòng đăng nhập trước!",
                success: false
            });
        }

        res.locals.user = user;

        next();
    } catch (error) {
        console.log(error);
        if (error.message === "TokenExpiredError") {
            return res.status(401).json({
                messages: "Token đã hết hạn. Vui lòng đăng nhập lại!",
                success: false
            });
        }
        return res.status(401).json({
            messages: "Token đã hết hạn. Vui lòng đăng nhập lại!",
            success: false
        });
    }
}