import React, { useEffect, useState } from 'react';
import { useBooking } from './BookingContext';
import "./Thanh_toan.css";

const Thanh_toan = ({ nextStep }) => {
    const jwt = localStorage.getItem('jwt')
    const { showtime_id, seatTotalAmount, popcornTotalAmount, selectedSeats, selectedCombos } = useBooking();
    const [loading, setLoading] = useState(false); // Thêm trạng thái loading
    const [timeLeft, setTimeLeft] = useState(300); // 5 phút = 300 giây

    const totalAmount = seatTotalAmount + popcornTotalAmount;

    useEffect(() => {
        // Đồng hồ đếm ngược 5 phút
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    handleTimeOut();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    // Giữ ghế khi vào trang
    useEffect(() => {
        if (selectedSeats.length > 0) {
            handleGiuGhe(); // Giữ ghế nếu có ghế đã chọn
        }
    }, [selectedSeats]);

    // Hàm giữ ghế
    const handleGiuGhe = async () => {
        setLoading(true); // Bắt đầu loading khi giữ ghế

        try {
            // Gửi thông tin giữ ghế tới server
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/payment/giu_ghe`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwt}`,  // Thêm token nếu cần
                },
                body: JSON.stringify({
                    showtime_id: showtime_id,
                    bookedSeat: selectedSeats,  // Ghế đã được chọn
                }),
            });

            const data = await response.json();

            if (data.success) {
            } else {
                alert('Có vẻ ghế đã có người đặt. Vui lòng thử lại.');
                window.location.reload();
            }
        } catch (error) {
            console.error('Error during reserving seats:', error);
            alert('Đã có lỗi xảy ra khi giữ ghế. Vui lòng thử lại.');
        } finally {
            setLoading(false); // Dừng loading sau khi xử lý xong
        }
    };

    // Xử lý khi hết giờ
    const handleTimeOut = async () => {
        alert('Đã hết giờ giữ ghế! Bạn sẽ được chuyển về trang chủ.');
        window.location.href = `/auth`; // Chuyển về trang chủ
    };


    const handlePayment = async () => {
        setLoading(true); // Bắt đầu loading khi nhấn nút Thanh Toán

        try {
            
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/payment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    jwt : jwt,
                    showtime_id: showtime_id,
                    amount: totalAmount,
                    selectedSeats: selectedSeats, 
                    selectedCombos: selectedCombos
                })
            }).then(response => response.json())
            .then(responseData => {
                if (responseData && responseData.paymentUrl) {
                    window.location.href = responseData.paymentUrl;
                }
                else {
                    alert('Bạn chưa đăng nhập hoặc đã hết phiên đăng nhập. Vui lòng thử lại.');
                }

            })
            .catch(error => console.error('Error:', error));
        } catch (error) {
            console.error('Payment error:', error);
            alert('Đã có lỗi xảy ra khi xử lý thanh toán. Vui lòng thử lại.');
        } finally {
            setLoading(false); // Dừng loading sau khi xử lý xong
        }
    };

    const getSeatName = (seatType) => {
        if (seatType === 0) return "Ghế thường";
        if (seatType === 1) return "Ghế VIP";
        if (seatType === 2) return "Ghế đôi";
        return "Ghế không xác định";
    };

    // Nhóm ghế theo loại và tính tổng số lượng và giá
    const groupedSeats = selectedSeats.reduce((acc, seat) => {
        const seatTypeName = getSeatName(seat.seat_type);
        if (!acc[seatTypeName]) {
            acc[seatTypeName] = { quantity: 0, price: 0 };
        }
        acc[seatTypeName].quantity += 1;
        acc[seatTypeName].price += seat.price;
        return acc;
    }, {});

    return (
        <div className='ticket-booking '>
            <div className='thong_tin_thang_toan' style={{ position: 'absolute' }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '450px 180px 180px', // Đặt kích thước tương tự Bap_nuoc
                    margin: '50px',
                    marginLeft: '100px',
                    border: '1px solid #ccc',
                    padding: '0px',
                }}>
                    <div className='grid-items grid-item-first first-row'><div className='display-flex-row'>Tên sản phẩm</div></div>
                    <div className='grid-items grid-item-second display-flex-column first-row' ><div className='display-flex-row'>Số lượng</div></div>
                    <div className='grid-items grid-item-third display-flex-column first-row' ><div className='display-flex-row'>Thành tiền</div></div>

                    {/* Danh sách ghế */}
                    {Object.entries(groupedSeats).map(([seatTypeName, details], index) => (
                        <React.Fragment key={`seat-${index}`}>
                            <div className='grid-items grid-item-first background-color-white '><div className='display-flex-row'>{seatTypeName}</div></div>
                            <div className='grid-items grid-item-second background-color-white display-flex-column'><div className='display-flex-row'>{details.quantity}</div></div>
                            <div className='grid-items grid-item-third background-color-white display-flex-column'><div className='display-flex-row'>{details.price.toLocaleString()}đ</div></div>
                        </React.Fragment>
                    ))}

                    {/* Danh sách combo */}
                    {Object.values(selectedCombos).map((combo, index) => (
                        <React.Fragment key={`combo-${index}`}>
                            <div className='grid-items grid-item-first background-color-white'><div className='display-flex-row'>{combo.combo_name}</div></div>
                            <div className='grid-items grid-item-second background-color-white display-flex-column'><div className='display-flex-row'>{combo.quantity}</div></div>
                            <div className='grid-items grid-item-third background-color-white display-flex-column'><div className='display-flex-row'>{(combo.price * combo.quantity).toLocaleString()}đ</div></div>
                        </React.Fragment>
                    ))}
                </div>
            </div>
                <div className='thanh-toan-info'>
                    <p style={{ fontSize: '15px', fontWeight: '400' }}>Tổng tiền:</p>
                    <p style={{ fontSize: '15px', fontWeight: '800' }}>{totalAmount.toLocaleString()}đ</p>
                    <p style={{ fontSize: '15px', fontWeight: '400' }}>Thời gian giữ ghế:</p>
                    <p style={{ fontSize: '15px', fontWeight: '800' }}>{Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? '0' : ''}{timeLeft % 60}</p>
                </div>
                <div className='thanh-toan-canh-bao'>
                <p style={{ fontSize: '15px', fontWeight: '400' }}>Vé đã mua không thể đổi hoặc hoàn tiền.<br>
                </br>Mã vé sẽ được gửi 01 lần qua email đã nhập. Vui lòng kiểm tra lại thông tin trước khi tiếp tục.</p>
                </div>
                <button id='thanh-toan' style={{

                }} onClick={handlePayment}>Thanh Toán</button>
        </div>
    );
};

export default Thanh_toan;
