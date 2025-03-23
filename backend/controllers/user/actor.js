import dotenv from "dotenv";
import connection from "../../models/SQLConnection.js";
dotenv.config();
export const actor = async (req, res) => {
    const actor_id = req.params.actor_id;
    
    let query = `
    SELECT 
        actors.actor_id, 
        actors.actor_name, 
        actors.actor_img, 
        actors.actor_describe, 
        GROUP_CONCAT(actor_film.film_id) AS film_ids,
        GROUP_CONCAT(films.film_name) AS film_names, 
        GROUP_CONCAT(films.film_img) AS film_images,
        GROUP_CONCAT(films.Release_date) AS film_release_dates,
        GROUP_CONCAT(film_evaluate.film_rate) AS film_ratings
    FROM 
        actors
    INNER JOIN 
        actor_film ON actor_film.actor_id = actors.actor_id
    INNER JOIN
        films ON films.film_id = actor_film.film_id
    LEFT JOIN
        film_evaluate ON film_evaluate.film_id = films.film_id
    WHERE 
        actors.actor_id = ?
    GROUP BY 
        actors.actor_id
    `;
    
    connection.query(query, [actor_id], (error, results) => {
        if (error) {
            console.error('Error in SELECT query:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
        
        if (results.length === 0) {
            return res.status(404).json({ error: 'Actor not found' });
        }
        
        const actorData = results[0];
        actorData.film_ids = actorData.film_ids ? actorData.film_ids.split(',') : [];
        actorData.film_names = actorData.film_names ? actorData.film_names.split(',') : [];
        actorData.film_images = actorData.film_images ? actorData.film_images.split(',') : [];
        actorData.film_release_dates = actorData.film_release_dates ? actorData.film_release_dates.split(',') : [];
        actorData.film_ratings = actorData.film_ratings ? actorData.film_ratings.split(',') : [];
        
        return res.json(actorData);
    });
};
