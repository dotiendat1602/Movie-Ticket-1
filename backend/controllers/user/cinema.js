import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import dotenv from "dotenv";
import connection from "../../models/SQLConnection.js";

dotenv.config();
export const cinema = async(req,res)=>{
    const regionId = req.params.region_id;
    const query = `
    select cinemas.cinema_id, cinemas.cinema_name, cinemas.address, regions.region_name, cinema_clusters.cluster_name,regions.region_id
    from cinemas
    inner join regions on cinemas.region_id = regions.region_id
    inner join cinema_clusters on cinemas.cluster_id = cinema_clusters.cluster_id
    where cinemas.region_id = ?
    `;
    connection.query(query, [regionId], (err, results) => {
        if (err) {
            console.error('Lỗi khi thực hiện truy vấn:', err);
            res.status(500).json({ error: 'Lỗi server' });
            return;
        }
        return res.json(results); // Trả về kết quả dưới dạng JSON
    });
}

function formatDate(dateString) {
    const date = new Date(dateString);

    // Array of weekday names
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // Format the date to "Sun 17/11/2024"
    const dayName = days[date.getUTCDay()];
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const year = date.getUTCFullYear();

    return `${dayName} ${day}/${month}/${year}`;
}


export const cinemaID = async (req, res) => {
    const cinemaId = req.params.cinema_id;
    const query = `
    SELECT 
        films.film_name, 
        films.film_img,
        films.film_id,
        films.age_limit,
        films.duration,
        cinemas.cinema_id, 
        cinemas.cinema_name, 
        cinemas.address, 
        showtimes.showtime_id, 
        showtimes.show_date, 
        showtimes.show_time
    FROM 
        films
    INNER JOIN 
        showtimes ON films.film_id = showtimes.film_id
    INNER JOIN 
        cinemas ON cinemas.cinema_id = showtimes.cinema_id
    WHERE 
        ((showtimes.show_time >= CURTIME() AND showtimes.show_date = CURDATE()) 
        OR 
        (showtimes.show_date > CURDATE() AND DATEDIFF(showtimes.show_date, NOW()) <= 5)) 
        AND cinemas.cinema_id = ?;
    `;
    
    connection.query(query, [cinemaId], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).json({ error: 'Server error' });
            return;
        }
        
        const time = {};

        // Initialize the next 5 days in `time` object
        for (let i = 0; i <= 5; i++) {
            const date = new Date();
            date.setDate(date.getDate() + i);
            
            const formattedDate = format(date, 'EEEE, dd/MM', { locale: vi });
            time[formattedDate] = "chưa có dữ liệu";
        }

        // Process query results
        results.forEach(row => {
            const { show_date, show_time, film_name, film_img, film_id, showtime_id, duration, age_limit } = row;
            const formattedDate = format(new Date(show_date), 'EEEE, dd/MM', { locale: vi });
            
            if (time[formattedDate] === "chưa có dữ liệu") {
                time[formattedDate] = {};
            }
            
            if (!time[formattedDate][film_id]) {
                time[formattedDate][film_id] = {
                    film_id,
                    film_name,
                    film_img,
                    duration,
                    age_limit,
                    showtimes: []
                };
            }

            // Add showtime to the film's showtimes list
            time[formattedDate][film_id].showtimes.push({
                showtime_id,
                show_time
            });
        });

        return res.json(time);
    });
};

