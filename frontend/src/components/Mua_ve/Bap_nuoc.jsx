import React, { useEffect } from 'react';
import { useBooking } from './BookingContext';
function Bap_nuoc({ nextStep, prevStep }) {
    const { showtime_id, seatTotalAmount, popcornTotalAmount, setPopcornTotalAmount, selectedSeats, selectedCombos, setSelectedCombos, seatData, popcornData } = useBooking();

    // Hàm để cập nhật số lượng combo và tính tổng tiền
    const updateComboQuantity = (comboId, change) => {
        setSelectedCombos(prev => {
            const newQuantity = (prev[comboId]?.quantity || 0) + change;
            if (newQuantity < 0) return prev;

            // Tìm thông tin combo dựa trên comboId
            const comboInfo = popcornData.find(c => c.combo_id === comboId);

            const updatedCombos = {
                ...prev,
                [comboId]: {
                    ...prev[comboId],
                    quantity: newQuantity,
                    price: comboInfo?.combo_price,
                    combo_name: comboInfo?.combo_name  // Thêm combo_name vào đối tượng combo
                }
            };

            // Nếu số lượng combo là 0, xóa combo khỏi danh sách
            if (newQuantity === 0) delete updatedCombos[comboId];
            return updatedCombos;
        });
    };

    // Tính tổng tiền (giá ghế + giá combo)
    useEffect(() => {
        const comboTotal = Object.values(selectedCombos).reduce(
            (acc, combo) => acc + (combo.quantity * combo.price),
            0
        );
        setPopcornTotalAmount(comboTotal); // cập nhật lại thay vì cộng dồn
    }, [selectedCombos]);
    return (
        <div className='ticket-booking '>
            <div className='popcorn-select' style={{ position: 'absolute' }}>
                <ul style={{
                    width: 'fit-content',
                    margin: '50px',
                    marginLeft: '100px',
                    border: '1px solid #ccc',
                    padding: '0px',
                }}>
                    {/* Hàng tiêu đề */}
                    <li style={{
                        display: 'grid',
                        gridTemplateColumns: '450px 180px 180px',
                        backgroundColor: 'rgb(211 208 208 / 16%)',
                        height: '100px',
                        alignItems: 'center',
                        borderBottom: '1px solid #ccc' // Đường viền dưới cho hàng đầu tiên
                    }}>
                        <span style={{ padding: '10px' }}>  Tên Combo</span>
                        <span style={{ padding: '10px' }}> Thành tiền</span>
                        <span style={{ padding: '10px', textAlign: 'center'}}>Số lượng</span>
                    </li>

                    {/* Các hàng combo */}
                    {popcornData.map((combo) => (
                        <li key={combo.combo_id} style={{
                            display: 'grid',
                            gridTemplateColumns: '450px 180px 180px',
                            backgroundColor: 'white',
                            height: '100px',
                            alignItems: 'center',
                            borderBottom: '1px solid #ccc' ,// Đường viền dưới cho các hàng còn lại
                            color: 'black',
                        }}>
                            <span style={{ padding: '10px',color: 'black' }}>{combo.combo_name}</span>
                            <span style={{ padding: '10px',color: 'black' }}>{Number(combo.combo_price).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-around',
                                padding: '10px',
                                color: 'black'
                            }}>
                                <button onClick={() => updateComboQuantity(combo.combo_id, -1)} style={{width: '24px', height: '24px', backgroundColor: 'red', borderRadius: '100%', fontSize: '20px', textAlign: 'center',display: 'flex', paddingTop: '0px'}}>-</button>
                                <span>{selectedCombos[combo.combo_id]?.quantity || 0}</span>
                                <button onClick={() => updateComboQuantity(combo.combo_id, 1)} style={{width: '24px', height: '24px', backgroundColor: '#00B300', borderRadius: '100%', fontSize: '20px', textAlign: 'center',display: 'flex', alignItems: 'center'}}>+</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="book-info">
                {seatData ? (
                    <>
                        <p style={{ fontSize: '18px' }}>{seatData.film_name}</p>
                        <p style={{ fontSize: '15px' }}><strong>{seatData.cinema_name}</strong></p>
                        <p style={{ fontSize: '15px' }}>Suất chiếu: {seatData.show_time} {seatData.show_date}</p>
                        <p style={{ fontSize: '15px' }}><strong>Phòng chiếu:</strong> {`P${seatData.room_name.substring(5)}`}</p>
                    </>
                ) : (
                    <p>Đang tải thông tin suất chiếu...</p>
                )}
            </div>

            <div className="sum-price" style={{ marginBottom: '15px' }}>
                <p style={{ fontSize: '15px', fontWeight: '800',fontFamily: 'Montserrat' }}>TỔNG ĐƠN HÀNG:</p>
                <p style={{ fontSize: '15px' }}>{(seatTotalAmount + popcornTotalAmount).toLocaleString()}đ</p>
            </div>
            <button id="tiep-tuc" onClick={async () => {
                try {
                    nextStep();
                } catch (error) {
                    console.error('Error when posting to /api/payment/giu_ghe:', error);
                }
            }}>
                Tiếp tục
            </button>
            <button id='back' onClick={prevStep}>
                ←
            </button>
        </div>
    );
}

export default Bap_nuoc;
