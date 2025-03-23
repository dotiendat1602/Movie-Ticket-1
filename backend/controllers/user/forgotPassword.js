import bcryptjs from "bcryptjs";
import dotenv from "dotenv";
import nodemailer from 'nodemailer';
import connection from '../../models/SQLConnection.js';
dotenv.config();

export const forgotPassword = async (req, res) => {
    try {
        const userEmail = req.body.gmail
        // Tạo mã xác thực ngẫu nhiên
        const token = Math.floor(10000 + Math.random() * 90000).toString();
        const expireToken = new Date(Date.now() + 600000);
        const hashedToken = await bcryptjs.hash(token, 11);


        // Truy vấn lấy email của người dùng
        const query = `SELECT email FROM users WHERE email = ?`;
        connection.query(query, [userEmail], (err, results) => {
            if (err) return res.json({
                message: err.message,
                success: false
            });
            if (results.length === 0) return res.status(404).json({
                message: 'Không tìm thấy người dùng',
                success: false
            });


            // Cập nhật mã xác thực trong DB
            const updateQuery = `UPDATE users SET reset_token = ?, reset_token_expire = ? WHERE email = ?`;
            connection.query(updateQuery, [hashedToken, expireToken, userEmail], (err) => {
                if (err) return res.json({
                    message: err.message,
                    success: false
                });

                // Sau khi cập nhật thành công, gửi email
                const transporter = nodemailer.createTransport({
                    host: process.env.MAIL_HOST,
                    port: process.env.MAIL_PORT,
                    secure: true,
                    service: 'gmail',
                    auth: {
                        user: process.env.MY_EMAIL,
                        pass: process.env.MY_EMAIL_PASSWORD
                    }
                });

                const mailOptions = {
                    from: process.env.MY_EMAIL,
                    to: userEmail,
                    subject: 'Mã xác thực đặt lại mật khẩu',
                    text: `Mã xác thực của bạn là: ${token}. Mã này sẽ hết hạn trong 10 phút.`
                };

                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) return res.json({
                        message: error.message,
                        success: false
                    });
                    return res.json({
                        message: 'Mã xác thực đã được gửi đến email của bạn!',
                        success: true
                    });
                });
            });
        });
    } catch (error) {
        return res.json({ message: error.message, success: false });
    }

}

export const forgotPasswordCheck = async (req, res) => {
    try {
        const userEmail = req.body.gmail;  // Lấy email từ session
        const query = `SELECT reset_token, reset_token_expire FROM users WHERE email = ?`;
        connection.query(query, [userEmail], async (err, results) => {
            if (err) {
                return res.json({
                    message: err.message,
                    success: false
                });
            }
            
            // Kiểm tra nếu không có kết quả
            if (results.length === 0) {
                return res.json({
                    message: "Không tìm thấy người dùng",
                    success: false
                });
            }

            const expireToken = new Date(results[0].reset_token_expire);
            const currentTime = new Date();

            // Kiểm tra thời gian hết hạn của token
            if (currentTime > expireToken) {
                return res.json({ message: "Mã xác thực đã hết hạn", success: false });
            }

            const hashedToken = results[0].reset_token;
            const isMatch = await bcryptjs.compare(req.body.token, hashedToken);
            if (!isMatch) {
                return res.json({
                    message: "Mã xác thực không đúng",
                    success: false
                });
            }

            // Nếu tất cả điều kiện đúng
            return res.json({
                message: "Mã xác thực chính xác",
                success: true
            });
        });
    } catch (error) {
        return res.json({ message: error.message, success: false });
    }
};

export const forgotPasswordChangePassword = async (req, res) => {
    try {
        const newPassword = req.body.password;
        const reNewPassword = req.body.rePassword;
        if(newPassword != reNewPassword){
            return res.json({
                message: "nhập lại mật khẩu sai",
                success: false
            })
        }
        const userEmail = req.body.gmail;  // Lấy email từ session
        const hashedPassword = await bcryptjs.hash(newPassword, 11);
        const query = "UPDATE users SET password = ? where email = ?";
        connection.query(query, [hashedPassword, userEmail],(err, results) => {
            if (err) return res.json({
                message: err.message,
                success: false
            });
            return res.json({
                message: "Đổi mật khẩu thành công",
                success: true
            })
        })
    } catch (error) {
        return res.json({ message: error.message, success: false });
    }

}