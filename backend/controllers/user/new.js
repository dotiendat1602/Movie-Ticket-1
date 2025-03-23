import dotenv from "dotenv";
import connection from "../../models/SQLConnection.js";
dotenv.config();
export const filmNew = async (req, res) => {  
    let query = `
    select news.new_time, news.new_id, news.new_content, news.new_img, news.new_time, news.new_header, news.new_footer, users.username
from news
left join users on news.user_id = users.user_id
    `;
    
    connection.query(query, (error, results) => {
        if (error) {
            console.error('Error in SELECT query:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
        
        if (results.length === 0) {
            return res.status(404).json({ error: 'Actor not found' });
        }
        
        return res.json(results);
    });
};


export const newVietnam = async (req, res) => {  
    let query = `
    select news.new_id, news.new_header,news.new_img, news.new_time, news.new_footer , films.country, films.film_id, users.username
    from news
    left join films on films.film_id = news.film_id
    left join users on news.user_id = users.user_id
    where films.country =1
    `;
    
    connection.query(query, (error, results) => {
        if (error) {
            console.error('Error in SELECT query:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
        
        if (results.length === 0) {
            return res.status(404).json({ error: 'Actor not found' });
        }
        
        return res.json(results);
    });
};

export const newAboard = async (req, res) => {  
    let query = `
    select news.new_id, news.new_header,news.new_img, news.new_time, news.new_footer , films.country, films.film_id, users.username
    from news
    left join films on films.film_id = news.film_id
    left join users on news.user_id = users.user_id
    where films.country =0
    `;
    
    connection.query(query, (error, results) => {
        if (error) {
            console.error('Error in SELECT query:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
        
        if (results.length === 0) {
            return res.status(404).json({ error: 'Actor not found' });
        }
        
        return res.json(results);
    });
};

export const NewDetail = async (req, res) => {  
    const new_id = req.params.new_id
    let query = `
    SELECT news.new_id, news.film_id, news.new_content, news.new_img, news.new_time, users.username
 from news
 inner join users on users.user_id = news.user_id
 where new_id = ?
    `;
    
    connection.query(query, [new_id],(error, results) => {
        if (error) {
            console.error('Error in SELECT query:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
        
        if (results.length === 0) {
            return res.status(404).json({ error: 'Actor not found' });
        }
        
        return res.json(results);
    });
};

export const NewRelate = async (req, res) => {  
    const film_id = req.params.film_id
    let query = `
    SELECT news.new_id, news.new_header,news.new_footer, news.film_id, news.new_content, news.new_img, news.new_time, users.username
    from news
    inner join users on users.user_id = news.user_id
    where film_id = ?
    `;
    
    connection.query(query, [film_id],(error, results) => {
        if (error) {
            console.error('Error in SELECT query:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
        
        return res.json(results);
    });
};