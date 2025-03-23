import { useTheme } from '@emotion/react'
import Box from '@mui/material/Box'
import React, { useEffect, useState } from 'react'
import Film_card from '../film/Film_card'
import FilmList from '../film/FilmList'
import Footer from '../Footer/Footer'
import Shared from '../Shared'
export default function Search() {
  const theme = useTheme()
  const [data, setData] = useState(null)
  const searchQuery = localStorage.getItem('searchQuery')
  const fetchData = async (e) => {

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/film/searchFilm/${searchQuery}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await response.json(); 
      setData(data); // Cập nhật state với dữ liệu
    } catch (error) {
      console.error('Lỗi mạng:', error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <Box>
      <Shared />
      <Box sx={{ marginTop: '19vh' }}>
        <div style={{
          marginTop: '20px', fontSize: '30px', textAlign: 'center',
          fontFamily: 'Montserrat', fontWeight: '600',
          color: theme.palette.mode === 'dark' ? '#c0c2c4' : '#EF4444',
          marginBottom: '15px'
        }}>
          {`DANH SÁCH TÌM KIẾM: ${searchQuery}`}
        </div>
        {data && Object.keys(data).length > 0 ? (
          Object.keys(data)
            .slice(1)
            .map((key) => {
              const films = data[key];
              console.log(key)

              return (<>
                {key === '1' && (
                  <div style={{
                    marginTop: '20px', fontSize: '20px', marginLeft: '10%',
                    fontFamily: 'Montserrat', fontWeight: '600',
                    color: theme.palette.mode === 'dark' ? '#c0c2c4' : '#EF4444',
                    marginBottom: '15px'
                  }}>
                    PHIM ĐANG CHIẾU
                  </div>
                )}

                {key === '2' && (
                  <div style={{
                    marginTop: '20px', fontSize: '20px', marginLeft: '10%',
                    fontFamily: 'Montserrat', fontWeight: '600',
                    color: theme.palette.mode === 'dark' ? '#c0c2c4' : '#EF4444',
                    marginBottom: '15px'
                  }}>
                    PHIM SẮP CHIẾU
                  </div>
                )}
                <FilmList key={key}> {/* Mỗi key sẽ tạo ra một FilmList riêng biệt */}
                  {films.map(item => {
                    const datee = item.Release_date.substring(0, 10); // Giả sử item.Release_date luôn đúng định dạng
                    const [year, month, day] = datee.split('-'); // Tách năm, tháng, ngày
                    const exactlyDate = `${day}/${month}`;

                    return (
                      <Film_card
                        key={item.film_id}
                        index={item.film_id}
                        image={item.film_img}
                        name={item.film_name}
                        date={exactlyDate}
                        rate={item.film_rate ? Number(JSON.parse(item.film_rate)).toFixed(1) : "N/A"}
                      />
                    );
                  })}
                </FilmList>
              </>);
            })
        ) : (
          <p style={{textAlign: 'center', fontSize: '20px', marginTop: '20px'}}>Không có kết quả phù hợp! Vui lòng thử từ khoá khác</p>
        )}
      </Box>


      <Footer />
    </Box>
  )
}
