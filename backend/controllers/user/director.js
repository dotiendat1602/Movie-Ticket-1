import dotenv from "dotenv";
import connection from "../../models/SQLConnection.js";
dotenv.config();
export const director = async (req, res) => {
    const director_id = req.params.director_id;
    
    let query = `
    SELECT 
        directors.director_id, 
        directors.director_name, 
        directors.director_img, 
        directors.director_describe, 
        GROUP_CONCAT(director_film.film_id) AS film_ids,
        GROUP_CONCAT(films.film_name) AS film_names, 
        GROUP_CONCAT(films.film_img) AS film_images,
        GROUP_CONCAT(films.Release_date) AS film_release_dates,
        GROUP_CONCAT(film_evaluate.film_rate) AS film_ratings
    FROM 
        directors
    INNER JOIN 
        director_film ON director_film.director_id = directors.director_id
    INNER JOIN
        films ON films.film_id = director_film.film_id
    LEFT JOIN
        film_evaluate ON film_evaluate.film_id = films.film_id
    WHERE 
        directors.director_id = ?
    GROUP BY 
        directors.director_id
    `;
    
    connection.query(query, [director_id], (error, results) => {
        if (error) {
            console.error('Error in SELECT query:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
        
        if (results.length === 0) {
            return res.status(404).json({ error: 'Actor not found' });
        }
        
        const directorData = results[0];
        directorData.film_ids = directorData.film_ids ? directorData.film_ids.split(',') : [];
        directorData.film_names = directorData.film_names ? directorData.film_names.split(',') : [];
        directorData.film_images = directorData.film_images ? directorData.film_images.split(',') : [];
        directorData.film_release_dates = directorData.film_release_dates ? directorData.film_release_dates.split(',') : [];
        directorData.film_ratings = directorData.film_ratings ? directorData.film_ratings.split(',') : [];
        
        return res.json(directorData);
    });
};