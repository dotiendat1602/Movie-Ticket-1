import React, { useState, useEffect } from 'react';
import Shared from '../Shared';
import Footer from '../Footer/Footer';
import Acc_banner from '/tix-banner.png'
import '../Account/acc.css'
import Film_card from '../film/Film_card';
import { useNavigate } from 'react-router-dom';
import BasicPagination from '../film/BasicPagination';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@emotion/react';
import NewCard from '../new/NewCard';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const MyAccount = () => {
    const theme = useTheme()
    const [isOrders, setIsOrders] = useState(true);
    const [isFilmLike, setIsFilmLike] = useState(false);
    const [userInfor, setUserInfor] = useState([]);
    const [userOrders, setUserOrders] = useState([]);
    const [listOrders, setListOrders] = useState([]);
    const [loadedCount, setLoadedCount] = useState(3);
    const [userFilmLiked, setUserFilmLiked] = useState([]);
    const [login, setLogin] = useState('');
    const defaultImage = 'data:image/jpeg;base64,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';
    const navigate = useNavigate();
    const [isNew, setIsNew] = useState(false)
    const [userNew, setUserNew] = useState([]);
    const ClickOrders = () => {
        setIsFilmLike(false);
        setIsOrders(true);
        setIsNew(false)
    }

    const ClickFilmLike = () => {
        setIsFilmLike(true);
        setIsOrders(false);
        setIsNew(false)
    }

    const ClickNew = () => {
        setIsFilmLike(false);
        setIsOrders(false);
        setIsNew(true)
    }

    const formatVND = (number) => {
        const price = parseFloat(number)
        return price.toLocaleString('vi-VN');
    };

    const handleClickimg = (film_name, film_id) => {
        localStorage.setItem('film_id', film_id)
        navigate(`/phim/${film_name}`);
    };
    
    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/api/userInfo`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ jwt: localStorage.getItem('jwt') })
        })
          .then(response => response.json())
          .then(responseData => {
            if (!responseData.success) {
              
              navigate('/auth');
            }
          })
          .catch(error => console.error('Error:', error));
      }, []);
    
    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/api/userInfo`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ jwt: localStorage.getItem('jwt') })
        })
            .then(response => response.json())
            .then(responseData => {
                if (responseData.success) {
                    setLogin(true)
                    setUserInfor(responseData.userInfo[0])
                }
                else {
                    setLogin(false)
                }

            })
            .catch(error => console.error('Error:', error));
    }, []);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/api/userInfo/filmLiked`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ jwt: localStorage.getItem('jwt') })
        })
            .then(response => response.json())
            .then(responseData => {
                if (responseData) {
                    console.log(responseData)
                    setUserFilmLiked(responseData)
                }
                else {
                    console.error('Failed to fetch filmlike');
                }

            })
            .catch(error => console.error('Error:', error));
    }, []);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/api/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ jwt: localStorage.getItem('jwt') })
        })
            .then(response => response.json())
            .then(responseData => {
                if (responseData) {
                    console.log(responseData)
                    setUserOrders(responseData)
                }
                else {
                    console.error('Failed to fetch filmlike');
                }

            })
            .catch(error => console.error('Error:', error));
    }, []);

    useEffect(() => {
        setListOrders(userOrders.slice(0, 3));
    }, [userOrders]);

    const loadMore = () => {
        const nextCount = loadedCount + 3;
        setListOrders(userOrders.slice(0, nextCount));
        setLoadedCount(nextCount);
    };

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/api/userInfo/filmNew`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ jwt: localStorage.getItem('jwt') })
        })
            .then(response => response.json())
            .then(responseData => {
                if (responseData) {
                    console.log(responseData)
                    setUserNew(responseData)
                }
                else {
                    console.error('Failed to fetch filmlike');
                }

            })
            .catch(error => console.error('Error:', error));
    }, []);


    return (
        <>
            <Shared />
            <div className='acc_banner'>
                <img src={Acc_banner} style={{ height: 'auto', width: '100%' }} />
            </div>
            <div className='acc_container'>
                <div className='acc_content' style={{ marginLeft: '22%' }}>
                    <img src={userInfor.user_img ? userInfor.user_img : defaultImage} />
                    <p>{userInfor.full_name}</p>
                </div>
                <div className='acc_navbar' style={{ marginLeft: '24%' }}>
                    <p className={`acc_navbar-option`} style={{ color: isOrders ? '#6e96cd' : 'inherit', cursor: 'pointer' }} onClick={ClickOrders}>Vé Đã Đặt</p>
                    <p className={`acc_navbar-option`}  style={{ color: isFilmLike ? '#6e96cd' : 'inherit', cursor: 'pointer' }} onClick={ClickFilmLike}>Phim Đã thích</p>
                    <p className={`acc_navbar-option`} style={{ color: isNew ? '#6e96cd' : 'inherit', cursor: 'pointer' }} onClick={ClickNew}>Bài báo đã viết</p>

                </div>
                <hr className='line' />
                {isFilmLike && (
                    <div className='acc_filmLiked' style={{marginTop: '20px'}}>
                        {userFilmLiked.length > 0 ? (
                            userFilmLiked.map((items) => {
                                const datee = items.Release_date.substring(0, 10);
                                const month = datee.substring(5, 7);
                                const day = datee.substring(8, 10);
                                const exactlyDate = `${day}/${month}`;
                                return (
                                    <Film_card
                                        key={items.film_id}
                                        index={items.film_id}
                                        image={items.film_img}
                                        name={items.film_name}
                                        date={exactlyDate}
                                        rate={JSON.parse(items.film_rate).toFixed(1)}
                                    />
                                )
                            })) : (
                            <div style={{ width: '100%', textAlign: 'center' }}>
                                <p style={{ marginTop: '68px', fontFamily: 'Roboto', fontSize: '16px' }}>Bạn chưa có bộ sưu tập phim</p>
                            </div>
                        )}
                    </div>
                )}

                {isOrders && (
                    <div className="acc_orders">
                        {listOrders.length > 0 ? (
                            listOrders.map((items) => {
                                const datee = items.show_date.substring(0, 10); // Lấy ngày đúng
                                const time = items.show_time.substring(0, 5);
                                return (
                                    <div className='orders_card-container' style={{marginTop: '15px'}}>
                                        <div className='orders_card'>

                                            <img src={items.film_img} onClick={() => handleClickimg(items.film_name, items.film_id)} />

                                            <div className='orders_card-content'>
                                                <h1>{items.film_name}</h1>
                                                <div>
                                                    <p>{items.cinema_name}</p>
                                                    <p>Suất chiếu : {time} , {datee}</p>
                                                    <p style={{ display: 'flex' }}>Ghế: {items.tickets.map((seats) => (
                                                        <span style={{ marginLeft: '3px' }}>{seats.seat}</span>
                                                    ))} , {items.room_name}</p>
                                                    {items.popcorn.length > 0 ? (
                                                        <>
                                                            {items.popcorn.map((pop) => (
                                                                <p>
                                                                    Combo {pop.name} x{pop.quantity}
                                                                </p>
                                                            ))}
                                                        </>
                                                    ) : (
                                                        <p>Combo bỏng+nước: không</p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }} >
                                            <img src="http://res.cloudinary.com/dh3qus4yk/image/upload/v1732765979/qtncugo3qk1ehyqfs0oo.jpg" style={{ width: '82%', height: '128px', marginBottom: '6px' }} alt="QR Code" />
                                            <h2>Tổng tiền: {formatVND(items.total_price)}</h2>
                                        </div>
                                    </div>
                                )
                            })
                        ) : (
                            <p style={{ marginTop: '68px', textAlign: 'center' }}>Bạn chưa có đơn hàng nào cả</p> // Thêm thông báo khi không có đơn hàng
                        )}
                        {loadedCount < userOrders.length && (
                            <div onClick={loadMore} style={{ display: 'flex', justifyContent: 'center', marginTop: '26px' }}>
                                <ExpandMoreIcon style={{ cursor: 'pointer', color: 'rgb(138, 138, 138)' }} />
                            </div>
                        )}
                    </div>
                )}
                {userNew && isNew && (
                    <Box sx={{ marginTop: '68px', width: '100vw' }}>
                        {userNew.length === 0 ? (
                            <Typography textAlign="center">
                                Bạn chưa có bài viết nào
                            </Typography>
                        ) : (
                            <div style={{ width: '80%', marginLeft: '10%' }}>
                                <Neww data={userNew}></Neww>
                            </div>
                        )}
                    </Box>
                )}

            </div>
            <Footer />
        </>
    );
};

export default MyAccount;

function Neww({ data }) {

    const theme = useTheme();
    const [currentPage, setCurrentPage] = useState(1);
    const filmsPerPage = 4;
    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };
    const currentData = data

    const indexOfLastFilm = currentPage * filmsPerPage;
    const indexOfFirstFilm = indexOfLastFilm - filmsPerPage;
    const currentFilms = currentData.slice(indexOfFirstFilm, indexOfLastFilm);

    const totalPages = Math.max(Math.ceil(currentData.length / filmsPerPage), 1);

    return (
        <Box>
            <Box sx={{ width: '100%', height: 'auto', display: 'flex', gap: '3%' }}>
                {currentFilms.map(item => {
                    const datee = item.new_time.substring(0, 10);
                    const year = datee.substring(0, 4);
                    const month = datee.substring(5, 7);
                    const day = datee.substring(8, 10);
                    const exactlyDate = `${day}/${month}`;
                    return (
                        <Box sx={{ width: '23%', height: 'auto' }}>
                            <NewCard
                                img={item.new_img} header={item.new_header} footer={item.new_footer} date={exactlyDate} new_id={item.new_id}
                            />
                        </Box>
                    );
                })}

            </Box>
            {data && <Box sx={{ width: '80vw', display: 'flex', justifyContent: 'center', marginTop: '20px' }}><BasicPagination count={totalPages} page={currentPage} changee={handlePageChange}></BasicPagination></Box>}

        </Box>
    );
}