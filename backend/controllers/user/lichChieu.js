import connection from "../../models/SQLConnection.js";

export const khuVuc = async(req,res)=>{
    const query = `SELECT region_name,regions.region_id, count(*) from regions
inner join cinemas on regions.region_id = cinemas.region_id
group by region_name, regions.region_id`;
        const results = await new Promise((resolve, reject) => {
            connection.query(query, (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
        return res.json(results)
}

export const rap = async(req,res)=>{
    const regionId = req.params.khuVuc_id;

    // Truy vấn MySQL
    const query = `
        SELECT cluster_name, cinema_name, cinema_id 
        FROM cinemas inner join cinema_clusters on cinemas.cluster_id = cinema_clusters.cluster_id
        WHERE region_id = ?
    `;

    connection.query(query, [regionId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database query failed' });
        }

        // Xử lý kết quả
        const clusters = {};

        results.forEach(row => {
            const { cluster_name, cinema_name, cinema_id } = row;
            if (!clusters[cluster_name]) {
                clusters[cluster_name] = [];
            }
            clusters[cluster_name].push({cinema_name,cinema_id});
        });

        return res.json(clusters);
    });
}

export const lichChieu = async(req,res)=>{

}