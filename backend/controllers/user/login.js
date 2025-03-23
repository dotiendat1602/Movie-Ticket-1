import bcryptjs from "bcryptjs";
import dotenv from "dotenv";
import { createJWT } from "../../middlewares/JWT.js";
import connection from "../../models/SQLConnection.js";
import signInValidator from "../../validation/signIn.js";

dotenv.config();
const SECRET_CODE = process.env.SECRET_CODE;

const login = async (req, res) => {
    try {
        // Bước 1: validate dữ liệu từ phía client
        const { error } = signInValidator.validate(req.body, { abortEarly: false });
        if (error) {
            const errors = error.details.map(err => err.message);
            return res.json({
                message: error.details[0].message,
                success: false
            });
        }

        // Bước 2: Kiểm tra username đã tồn tại chưa
        const [userResults] = await connection.promise().query(
            `SELECT * from users where username="${req.body.user__name}"`
        );
        
        if (userResults.length === 0) {
            return res.json({
                message: "username không tồn tại",
                success: false
            });
        }
        
        const user = userResults[0];

        // Bước 3: Kiểm tra mật khẩu
        const isMatch = await bcryptjs.compare(req.body.password, user.password);
        if (!isMatch) {
            return res.json({
                message: "Mật khẩu không đúng",
                success: false
            });
        }

        // Bước 4: Tạo JWT
        let payload = {
            id: user.user_id,
        };
        const token = createJWT(payload);

        // Bước 5: Đặt cookie JWT và phản hồi thành công
        // res.cookie("jwt", token, {
        //     httpOnly: true,        // Cookie chỉ truy cập qua HTTP, không qua JavaScript
        //     secure: true,          // Bật chế độ bảo mật (chỉ hoạt động với HTTPS)
        //     sameSite: "none",      // Đảm bảo cookies được gửi qua domain khác nhau
        //     maxAge: 1000 * 60 * 30 });
        //.cookie("name", user.full_name, { maxAge: 1000 * 60 * 30 }).cookie("birthday", user.date_of_birth, { maxAge: 1000 * 60 * 30 }).cookie("phoneNumber", user.phone_number, { maxAge: 1000 * 60 * 30 }).cookie("address", user.address, { maxAge: 1000 * 60 * 30 });

        if (user.role === 0) {
            return res.json({
                message: "user",
                success: true,
                jwt: token
            });
        } else {
            return res.json({
                message: "admin",
                success: true,
                jwt: token
            });
        }
        
    } catch (error) {
        return res.status(500).json({
            name: error.name,
            message: error.message
        });
    }
};

export default login;