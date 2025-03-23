// development

import mysql from 'mysql2';
// Tạo một kết nối đơn lẻ
const connection = mysql.createConnection({
    host: 'localhost', // Địa chỉ của máy chủ cơ sở dữ liệu
    port: 3307,
    user: 'root', // Tên người dùng của cơ sở dữ liệu
    password: 'Toiladat@1', // Mật khẩu của cơ sở dữ liệu
    database: 'web_phim' // Tên của cơ sở dữ liệu
});
// Kết nối đến cơ sở dữ liệu
connection.connect((err) => {
    if (err) {
        console.error('Error connecting: ' + err.stack);
        return;
    }
    console.log('Connected as id ' + connection.threadId);
});
export default connection;

// import mysql from 'mysql2';

// // Tạo một kết nối đơn lẻ
// const connection = await mysql.createConnection({
//     host: '10.96.210.203', // Địa chỉ của máy chủ cơ sở dữ liệu
//     port: 3306, // Cổng của MySQL
//     user: 'fall2024c8g13', // Tên người dùng của cơ sở dữ liệu
//     password: 'nhtt2024', // Mật khẩu của cơ sở dữ liệu
//     database: 'fall2024c8g13_nhtt' // Tên của cơ sở dữ liệu
// });

// // Kết nối đến cơ sở dữ liệu
// connection.connect((err) => {
//     if (err) {
//         console.error('Error connecting: ' + err.stack);
//         return;
//     }
//     console.log('Connected as id ' + connection.threadId);
// });

// export default connection;
