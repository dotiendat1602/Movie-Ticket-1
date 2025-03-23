import React, { useEffect, useState } from 'react';
import Footer from '../Footer/Footer';
import Shared from "../Shared";
import "./Thong_tin_ve.css";
function Thong_tin_ve() {
    const jwt = localStorage.getItem('jwt');
    const [orderInfo, setOrderInfo] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [step, setStep] = useState(3); // 0: Chọn ghế, 1: Bắp nước, 2: Thanh toán, 3: Thông tin vé

    const formatVND = (number) => {
        const price = parseFloat(number);
        return price.toLocaleString('vi-VN');
    };

    useEffect(() => {
        // Fetch seat data
        const fetchOrderInfo = () => {
            try {
                fetch(`${import.meta.env.VITE_API_URL}/api/orders/getLastestOrder`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({jwt : jwt})
                }).then(response => response.json())
                .then(responseData => {
                    if (responseData.success) {
                        setOrderInfo(responseData.order); // Lưu thông tin đơn hàng vào state
                        setLoading(false); // Đánh dấu việc load dữ liệu xong
                    }
                    else {
                        alert('Bạn chưa đăng nhập hoặc đã hết phiên đăng nhập. Vui lòng thử lại.');
                        window.location.href = `/auth`; // Chuyển về trang chủ
                    }
    
                })
                .catch(error => console.error('Error:', error));
            } catch (error) {
                setError("Đã xảy ra lỗi khi tải thông tin.");
                setLoading(false); // Đánh dấu việc load dữ liệu xong
            }
        };

        fetchOrderInfo();
    }, [jwt]);

    let content;

    if (loading) {
        content = <div className="ticket-booking">Đang tải thông tin...</div>;
    } else if (error) {
        content = <div className="ticket-booking">{error}</div>;
    } else if (!orderInfo) {
        content = <div className="ticket-booking">Bạn chưa đặt bất cứ vé nào.</div>;
    } else {
        content = (
            <div className="ticket-booking">
                <div className='orderInfoContainerRoot'>
                    <div className='orderInfo-container'>
                        <div className='orderInfo-container-grid1'>
                            <img src={orderInfo.film_img} className='img1' alt="Film Poster" />
                        </div>
                        <div className='orderInfo-container-grid2'>
                            <div>
                                <h1>{orderInfo.film_name}</h1>
                                <p>{orderInfo.cinema_name}</p>
                                <p>Suất chiếu : {orderInfo.show_date.split("T")[0]} , {orderInfo.show_time}</p>
                                <p style={{ display: 'flex' }}>Ghế: {orderInfo.seats.map((seat) => (
                                    <span style={{ marginLeft: '3px' }} key={seat.seat_name}>{seat.seat_name},</span>
                                ))}&nbsp;{orderInfo.room_name}</p>
                                {orderInfo.popcorns.length > 0 ? (
                                    orderInfo.popcorns.map((pop) => (
                                        <p key={pop.combo_name}>
                                            Combo {pop.combo_name} x{pop.combo_quantity}
                                        </p>
                                    ))
                                ) : (
                                    <p>Combo bỏng+nước: không</p>
                                )}
                            </div>
                        </div>
                        <div className='orderInfo-container-grid3'>
                            <img src="http://res.cloudinary.com/dh3qus4yk/image/upload/v1732765979/qtncugo3qk1ehyqfs0oo.jpg" className='img2' alt="QR Code" />
                            <h2>Tổng tiền: {formatVND(orderInfo.total_price)}</h2>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
            {content}
            <div style={{ height: '100px' }}></div>
            <div className="progress-bars" style={{ paddingTop: "20px" }}>
                <div className={`step ${step === 0 ? 'active' : ''}`}>
                    <i className="fe fe-grid"></i><span>Chọn Ghế</span>
                </div>
                <div className='step-between'>»</div>
                <div className={`step ${step === 1 ? 'active' : ''}`}>
                    <i className="fe fe-shopping-bag"></i><span>Bắp Nước</span>
                </div>
                <div className='step-between'>»</div>
                <div className={`step ${step === 2 ? 'active' : ''}`}>
                    <i className="fe fe-credit-card"></i><span>Thanh Toán</span>
                </div>
                <div className='step-between'>»</div>
                <div className={`step ${step === 3 ? 'active' : ''}`}>
                    <i className="fe fe-inbox"></i><span>Thông Tin Vé</span>
                </div>
            </div>
            <Shared />
            <Footer />
        </>
    );
}

export default Thong_tin_ve;
