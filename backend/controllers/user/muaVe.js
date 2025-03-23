import calculateTicketPrice from "../../middlewares/user/seatPrice.js";
import connection from "../../models/SQLConnection.js";

export const showSeat = async (req, res) => {
    try {
        const showtime_id = req.params.showtime_id
        // Thực hiện join các bảng cần thiết để lấy thông tin
        const result = await connection.promise().query(`
            SELECT 
            films.film_name,
            cinemas.cinema_name,
            showtimes.show_time,
            showtimes.show_date,
            rooms.room_name,
            seats.seat_id,
            seats.seat_row,
            seats.seat_number,
            seats.seat_type,
            seat_status.seat_status,
            seat_status.reserved_until
            FROM showtimes
            JOIN films ON showtimes.film_id = films.film_id
            JOIN cinemas ON showtimes.cinema_id = cinemas.cinema_id
            JOIN rooms ON showtimes.room_id = rooms.room_id
            JOIN seats ON rooms.room_id = seats.room_id
            LEFT JOIN seat_status ON showtimes.showtime_id = seat_status.showtime_id 
                                AND seats.seat_id = seat_status.seat_id
            WHERE showtimes.showtime_id = ?
            ORDER BY seats.seat_row, seats.seat_number;
        `, [showtime_id]);

        // Xử lý dữ liệu kết quả để trả về đúng định dạng mong muốn
        const date = new Date(result[0][0].show_date)
        const weekday = date.toLocaleDateString('en', { weekday: 'long' }); // Lấy thứ bằng tiếng Việt
        const day = date.getDate(); // Lấy ngày
        const month = date.getMonth() + 1; // Lấy tháng (thêm 1 vì getMonth() trả về từ 0-11)
        const year = date.getFullYear();

        const postOut = {
            film_name: result[0][0]?.film_name,
            cinema_name: result[0][0]?.cinema_name,
            show_time: result[0][0]?.show_time.slice(0, 5),
            show_date: day + "/" + month + "/" + year,
            room_name: result[0][0]?.room_name,
            seats: result[0].map(row => ({
                seat_id: row.seat_id,
                seat_location: row.seat_row + row.seat_number,
                seat_status: row.seat_status,
                reserved_until: row.reserved_until,
                seat_type: row.seat_type,
                price: calculateTicketPrice(row.seat_type.toString(), weekday, result[0][0]?.show_time.slice(0, 2).toString())
            }))
        };

        return res.json(postOut);
    } catch (error) {
        console.error("Error fetching seat data:", error);
        res.status(500).json({ error: "Failed to retrieve seat information" });
    }
};

export const popcornInfo = async (req, res) => {
    const result = await connection.promise().query(`
        SELECT * from popcorn_combos
    `,);
    return res.json(result[0]);
}
