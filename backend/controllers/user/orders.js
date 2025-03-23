import connection from "../../models/SQLConnection.js";

import { isTokenExpired, verifyToken } from '../../middlewares/JWT.js';
export const getOrders = async (req, res) => {
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
    const user_id = decoded.id
    
    try {
        // Truy vấn thông tin đơn hàng từ bảng orders
        const [orderData] = await connection.promise().query(
            `SELECT 
                o.order_id,
                o.order_date,
                o.total_price,
                st.show_date,
                st.show_time,
                c.cinema_name,
                r.room_name,
                f.film_id,
                f.film_name,
                f.film_img
            FROM 
                orders o
            JOIN 
                showtimes st ON o.showtime_id = st.showtime_id
            JOIN 
                cinemas c ON st.cinema_id = c.cinema_id
            JOIN 
                rooms r ON st.room_id = r.room_id
            JOIN 
                films f ON st.film_id = f.film_id
            WHERE 
                o.user_id = ?;`,
            [user_id]
        );

        if (orderData.length === 0) {
            return res.json(orderData);
        }

        // Lấy thông tin chi tiết cho từng order
        const ordersInfo = await Promise.all(
            orderData.map(async (order) => {
                // Truy vấn thông tin vé
                const [tickets] = await connection.promise().query(
                    `SELECT 
                        CONCAT(s.seat_row, s.seat_number) AS seat,
                        t.ticket_price AS price
                    FROM 
                        tickets t
                    JOIN orders o ON t.order_id = o.order_id
                    JOIN seats s ON t.seat_id = s.seat_id
                    WHERE 
                        t.order_id = ?`,
                    [order.order_id]
                );

                // Truy vấn thông tin bắp nước
                const [popcorn] = await connection.promise().query(
                    `SELECT 
                        pc.combo_name AS name,
                        po.combo_quantity AS quantity,
                        pc.combo_price * po.combo_quantity AS price
                    FROM 
                        popcorn_orders po
                    JOIN popcorn_combos pc ON po.combo_id = pc.combo_id
                    WHERE 
                        po.order_id = ?`,
                    [order.order_id]
                );

                // Cấu trúc dữ liệu trả về
                return {
                    film_id: order.film_id,
                    film_name: order.film_name,
                    film_img: order.film_img,
                    order_id: order.order_id,
                    order_date: order.order_date,
                    total_price: order.total_price,
                    show_date: order.show_date,
                    show_time: order.show_time,
                    cinema_name: order.cinema_name,
                    room_name: order.room_name,
                    tickets: tickets,
                    popcorn: popcorn
                };
            })
        );

        return res.json(ordersInfo);
    } catch (error) {
        console.error('Error fetching order data:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const getLastestOrder = async (req, res) => {
    try {
        const token = req.body.jwt;

        // Kiểm tra token
        if (!token) {
            return res.json({
                message: "Người dùng chưa đăng nhập",
                success: false
            });
        }

        if (isTokenExpired(token)) {
            return res.json({
                message: "Người dùng hết phiên đăng nhập",
                success: false
            });
        }

        const decoded = verifyToken(token);
        const user_id = decoded.id;
        // Truy vấn thông tin đơn hàng mới nhất trong vòng 1 ngày trước hôm nay
        const query1 = `
            SELECT 
                order_id, order_date, total_price, 
                show_date, show_time, 
                film_name, film_img, 
                room_name, cinema_name, address 
            FROM orders
            INNER JOIN showtimes ON orders.showtime_id = showtimes.showtime_id
            INNER JOIN films ON showtimes.film_id = films.film_id
            INNER JOIN rooms ON showtimes.room_id = rooms.room_id
            INNER JOIN cinemas ON showtimes.cinema_id = cinemas.cinema_id
            WHERE user_id = ? 
            ORDER BY order_id DESC
            LIMIT 1;
        `;
        // const query1 = `
        //     SELECT 
        //         order_id, order_date, total_price, 
        //         show_date, show_time, 
        //         film_name, film_img, 
        //         room_name, cinema_name, address 
        //     FROM orders
        //     INNER JOIN showtimes ON orders.showtime_id = showtimes.showtime_id
        //     INNER JOIN films ON showtimes.film_id = films.film_id
        //     INNER JOIN rooms ON showtimes.room_id = rooms.room_id
        //     INNER JOIN cinemas ON showtimes.cinema_id = cinemas.cinema_id
        //     WHERE user_id = ?
        //     ORDER BY order_id DESC
        //     LIMIT 1;
        // `;
        const [orderResult] = await connection.promise().query(query1, [user_id]);

        if (orderResult.length === 0) {
            return res.json({
                message: "Không tìm thấy đơn hàng nào trong 1 ngày trước hôm nay",
                success: false
            });
        }

        const order = orderResult[0];

        // Truy vấn danh sách ghế đã đặt
        const query2 = `
            SELECT ticket_price, concat(seat_row,seat_number) as seat_name
            FROM tickets
            INNER JOIN seats ON tickets.seat_id = seats.seat_id
            WHERE tickets.order_id = ?;
        `;
        const [seats] = await connection.promise().query(query2, [order.order_id]);

        // Truy vấn danh sách popcorn đã đặt
        const query3 = `
            SELECT combo_name, combo_price, combo_quantity 
            FROM popcorn_orders
            INNER JOIN popcorn_combos ON popcorn_orders.combo_id = popcorn_combos.combo_id
            WHERE popcorn_orders.order_id = ?;
        `;
        const [popcorns] = await connection.promise().query(query3, [order.order_id]);

        // Kết hợp dữ liệu và trả về
        return res.json({
            success: true,
            order: {
                order_date: order.order_date,
                total_price: order.total_price,
                show_date: order.show_date,
                show_time: order.show_time,
                film_name: order.film_name,
                film_img: order.film_img,
                room_name: order.room_name,
                cinema_name: order.cinema_name,
                address: order.address,
                seats,
                popcorns
            }
        });
    } catch (error) {
        console.error("Error fetching latest order:", error);
        return res.status(500).json({
            message: "Lỗi server, không thể lấy thông tin đơn hàng",
            success: false
        });
    }
};
