

import { useBooking } from './BookingContext';
import "./Mua_ve.css";

import { default as React } from 'react';

const Mua_ve = ({ nextStep }) => {

    const jwt = localStorage.getItem('jwt')
    const { seatTotalAmount, setSeatTotalAmount, popcornTotalAmount, selectedSeats, setSelectedSeats, seatData } = useBooking();
    const handleSeatClick = (seat) => {
        if (seat.seat_status === 1 || (seat.reserved_until && new Date(seat.reserved_until) > new Date())) return;

        const pairSeat = findPairSeat(seat);
        const isSelected = selectedSeats.some(selectedSeat => selectedSeat.seat_id === seat.seat_id);

        let updatedSeats;
        if (isSelected) {
            updatedSeats = selectedSeats.filter(
                selectedSeat => selectedSeat.seat_id !== seat.seat_id && (!pairSeat || selectedSeat.seat_id !== pairSeat.seat_id)
            );
        } else {
            const seatWithSeatName = {
                ...seat,
                seat_name: seat.seat_type === 0 ? "ghe_thuong" : seat.seat_type === 1 ? "ghe_vip" : "ghe_doi"
            };
            updatedSeats = pairSeat
                ? [...selectedSeats, seatWithSeatName, { ...pairSeat, seat_name: "ghe_doi" }]
                : [...selectedSeats, seatWithSeatName];
        }

        setSelectedSeats(updatedSeats);

        const newTotalPrice = updatedSeats.reduce((total, seat) => total + seat.price, 0);
        setSeatTotalAmount(newTotalPrice);
    };


    // Hàm để tìm ghế đôi (ghế liền kề) trong hàng 'K' có seat_type = 2
    const findPairSeat = (seat) => {
        if (seat.seat_type === 2) {
            const seatRow = seat.seat_location.charAt(0); // Lấy hàng (ký tự đầu tiên)
            const seatNumber = parseInt(seat.seat_location.slice(1)); // Lấy số ghế

            // Tìm ghế cặp dựa vào số ghế là lẻ hay chẵn
            const pairSeatLocation = seatNumber % 2 === 0
                ? `${seatRow}${seatNumber - 1}`
                : `${seatRow}${seatNumber + 1}`;

            return seatData.seats.find(s => s.seat_location === pairSeatLocation && s.seat_type === 2);
        }
        return null;
    };

    return (
        <div className="ticket-booking">
            <div className="book-info">
                <p style={{ fontSize: '18px' }}>{seatData.film_name}</p>
                <p style={{ fontSize: '15px' }}><strong>{seatData.cinema_name}</strong></p>
                <p style={{ fontSize: '15px' }}>Suất chiếu: {seatData.show_time} {seatData.show_date}</p>
                <p style={{ fontSize: '15px' }}><strong>Phòng chiếu:</strong> {`P${seatData.room_name.substring(5)}`}</p>
            </div>

            <div className="sum-price" style={{ marginBottom: '15px' }}>
                <p style={{ fontSize: '15px', fontWeight: '800', fontFamily: 'Montserrat' }}>TỔNG ĐƠN HÀNG:</p>
                <p style={{ fontSize: '15px' }}>{(seatTotalAmount + popcornTotalAmount).toLocaleString()}đ</p>
            </div>
            <button id="back">
                ←
            </button>
            <button
                id="tiep-tuc"
                onClick={async () => {
                    if (selectedSeats.length > 0) {
                        try {
                            // Gửi request POST đến endpoint "/api/userInfo"
                            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/userInfo`, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({ jwt: jwt })
                            }).then(response => response.json())
                                .then(responseData => {
                                    if (responseData.success) {
                                        nextStep();
                                    }
                                    else {
                                        alert('Hãy đăng nhập để thực hiện thao tác này');
                                    }

                                })
                                .catch(error => console.error('Error:', error));
                        } catch (error) {
                            console.error('Lỗi khi gửi request:', error);
                            alert('Đã xảy ra lỗi, vui lòng thử lại sau!');
                        }
                    }
                }}
            >
                Tiếp tục
            </button>
            <div className="ghe-info">
                <div id="ghe-ban-chon" style={{
                    backgroundColor: '#00b300',
                    boxShadow: '0 0 11px #00b300', color: '#fff', width: '25px', height: '25px', padding: '10px', margin: '10px'
                }}></div>
                <div>Ghế bạn chọn</div>
                <div id='đang được giữ' style={{ background: 'repeating-linear-gradient(45deg, hsla(0, 0%, 60%, .4), hsla(0, 0%, 60%, .4) 10px, hsla(0, 0%, 60%, .6) 0, hsla(0, 0%, 60%, .6) 20px)', width: '25px', height: '25px', margin: '10px' }}></div>
                <div>Đang được giữ</div>
                <div id="da-ban" style={{ background: 'repeating-linear-gradient(0deg, hsla(0, 0%, 0%, .4), hsla(0, 0%, 0%, .1) 10px, hsla(0, 0%, 0%, .1) 0, hsla(0, 0%, 60%, .6) 1px)', width: '25px', height: '25px', margin: '10px' }}></div>
                <div>Đã bán</div>
            </div>
            <div className="man-hinh">MÀN HÌNH</div>
            <div className="seat-row">
                <div className="seat-row-child">A</div>
                <div className="seat-row-child">B</div>
                <div className="seat-row-child">C</div>
                <div className="seat-row-child">D</div>
                <div className="seat-row-child">E</div>
                <div className="seat-row-child">F</div>
                <div className="seat-row-child">G</div>
                <div className="seat-row-child">H</div>
                <div className="seat-row-child">I</div>
                <div className="seat-row-child">J</div>
            </div>
            <div className="seats">
                {seatData && seatData.seats ? seatData.seats.map((seat, index) => {
                    const isSelected = selectedSeats.some(selectedSeat => selectedSeat.seat_id === seat.seat_id);
                    const isReserved = seat.reserved_until && new Date(seat.reserved_until) > new Date();
                    const isDoubleSeat = seat.seat_type === 2;

                    // Kiểm tra xem `seat_location` là số lẻ hay chẵn
                    const doubleSeatClass = isDoubleSeat
                        ? parseInt(seat.seat_location.slice(1)) % 2 === 1
                            ? 'double_seat1'
                            : 'double_seat2'
                        : '';

                    return (
                        <div
                            key={seat.seat_id}
                            className={`seat ${seat.seat_status === 0 ? 'available' : 'occupied'} ${isSelected ? 'selected' : ''} ${doubleSeatClass}`}
                            style={{
                                boxShadow: isSelected ? '0 0 11px #00b300' : 'none',
                                background: isReserved
                                    ? 'repeating-linear-gradient(45deg, hsla(0, 0%, 60%, .4), hsla(0, 0%, 60%, .4) 10px, hsla(0, 0%, 60%, .6) 0, hsla(0, 0%, 60%, .6) 20px)'
                                    : seat.seat_status === 1 ? 'repeating-linear-gradient(0deg, hsla(0, 0%, 0%, .4), hsla(0, 0%, 0%, .1) 10px, hsla(0, 0%, 0%, .1) 0, hsla(0, 0%, 60%, .6) 1px)'
                                        : 'none',
                                backgroundColor: isSelected
                                    ? '#00b300'
                                    : seat.seat_type === 0
                                        ? '#dfdfdf'
                                        : seat.seat_type === 1
                                            ? '#d4b15f'
                                            : '#3b5998',
                                filter: seat.seat_status === 1 ? 0.7 : 1,
                                cursor: seat.seat_status === 1 ? 'not-allowed' : 'pointer'
                            }}
                            onClick={() => handleSeatClick(seat)}
                            onMouseOver={(e) => {
                                if (seat.seat_status !== 1) {
                                    if (!isSelected) {
                                        e.currentTarget.innerText = seat.seat_location;
                                    }
                                    e.currentTarget.style.filter = 'brightness(0.8)';
                                    e.currentTarget.style.opacity = 0.8;
                                }
                            }}
                            onMouseOut={(e) => {
                                if (seat.seat_status !== 1) {
                                    if (!isSelected) {
                                        e.currentTarget.innerText = "";
                                    }
                                    e.currentTarget.style.filter = 'none';
                                    e.currentTarget.style.opacity = 1;
                                }
                            }}
                        >
                            {isSelected && seat.seat_location}
                        </div>
                    );
                }) : <p>Loading seats...</p>}
            </div>
            <div className='loai-ghe'>
                <div></div>
                <div style={{backgroundColor: '#dfdfdf', width: '25px', height: '25px', margin: '10px'}}></div>
                <div style={{display: 'flex',justifyContent: 'center',flexDirection : 'column',marginRight: '20px'}}>Ghế thường</div>
                <div style={{backgroundColor: '#d4b15f', width: '25px', height: '25px', margin: '10px'}}></div>
                <div style={{display: 'flex',justifyContent: 'center',flexDirection : 'column', marginRight: '20px'}}>Ghế VIP</div>
                <div style = {{backgroundColor: '#3b5998', width: '25px', height: '25px', margin: '10px'}}></div>
                <div style={{display: 'flex',justifyContent: 'center',flexDirection : 'column'}}>Ghế đôi</div>
            </div>
        </div >
    );
};

export default Mua_ve;
