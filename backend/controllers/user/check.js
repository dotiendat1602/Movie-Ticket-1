// import dotenv from "dotenv";
// import connection from "../models/SQLConnection.js";
// dotenv.config()
// const SECRET_CODE = process.env.SECRET_CODE

// export const login = async(req,res) => {
//     if(req.body.submit === "log_out"){
//         try {
//             res.clearCookie("jwt");
//             res.clearCookie("user_name");
//             res.clearCookie("name");
//             res.clearCookie("phoneNumber");
//             res.clearCookie("address");
//             res.clearCookie("birthday");
//             req.session.destroy();
//             res.render("index.html");
//         } catch(error){
//             console.log(error);
//         }
//     }
//     else if(req.body.submit === "Cập nhật"){
//         try {
//             // sửa dữ liệu trong database
//             connection.query(`UPDATE customers set name = "${req.body.fullname}", birthday = "${req.body.birthday}", phone = "${req.body.phoneNumber}", address = "${req.body.address}"
//               where customer_id="${req.session.user.customer_id}"`, async (error, results, fields) =>{
//                 res.clearCookie("name");
//                 res.clearCookie("phoneNumber");
//                 res.clearCookie("address");
//                 res.clearCookie("birthday");
//                 res.cookie("name",req.body.fullname).cookie("birthday",req.body.birthday).cookie("phoneNumber",req.body.phoneNumber).cookie("address",req.body.address);
//                 res.render("index.html")
//             }) 

//             evaluate.updateMany( { customer_id: 3 },
//             { $set : { customer_name: req.body.fullname } }).then(updatedProduct => {
//                 if (!updatedProduct) {
//                     console.log("Không tìm thấy sản phẩm để cập nhật");
//                     // Xử lý trường hợp không tìm thấy sản phẩm
//                 } else {
//                     console.log("Sản phẩm đã được cập nhật:", updatedProduct);
//                     // Xử lý kết quả sau khi cập nhật thành công
//                 }
//             });
            
//         } catch(error){
//             console.log(error);
//         }
//     }
// }