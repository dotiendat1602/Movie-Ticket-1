import bcryptjs from "bcryptjs";
import dotenv from "dotenv";
import connection from "../../models/SQLConnection.js";
import singUpValidator from "../../validation/signUp.js";

dotenv.config();
const SECRET_CODE = process.env.SECRET_CODE;

const signUp = async (req, res) => {
    try {
        // Bước 1: validate dữ liệu
        const { error } = singUpValidator.validate(req.body, { abortEarly: false });
        if (error) {
            return res.json({
                message: error.details[0].message,
                success: false
            });
        }

        // Kiểm tra username đã tồn tại chưa
        const [userResults] = await connection.promise().query(`SELECT * from users where username="${req.body.user__name}"`);
        if (userResults.length > 0) {
            return res.json({
                message: "username đã tồn tại",
                success: false
            });
        }

        // Kiểm tra số điện thoại đã tồn tại chưa
        const [phoneResults] = await connection.promise().query(`SELECT phone_number from users where phone_number="${req.body.phone__number}"`);
        if (phoneResults.length > 0) {
            return res.json({
                message: "số điện thoại đã tồn tại",
                success: false
            });
        }

        // Kiểm tra email đã tồn tại chưa
        const [emailResults] = await connection.promise().query(`SELECT email from users where email="${req.body.gmail}"`);
        if (emailResults.length > 0) {
            return res.json({
                message: "gmail đã tồn tại",
                success: false
            });
        }

        // Mã hóa mật khẩu
        const hashedPassword = await bcryptjs.hash(req.body.password, 11);
        var sex = null;
        if(req.body.sex == 'male') sex = 1
        else sex = 2
        // Thêm người dùng vào database
        await connection.promise().query(
            `Insert into users(full_name,phone_number,email,date_of_birth,sex,password,username) 
            value("${req.body.name}","${req.body.phone__number}","${req.body.gmail}","${req.body.birthday}","${sex}","${hashedPassword}","${req.body.user__name}")`
        );

        // Bước 5: thông báo đăng kí thành công
        // Xóa mật khẩu trước khi gửi phản hồi
        req.body.password = undefined;
        return res.json({
            message: "!",
            success: true
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            message: "Đã xảy ra lỗi",
            success: false
        });
    }
};

export default signUp;