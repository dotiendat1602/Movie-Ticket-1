import React, { useState } from 'react';
import Footer from '../Footer/Footer';
import Shared from "../Shared";
import Bap_nuoc from './Bap_nuoc';
import { BookingProvider } from './BookingContext';
import './BookingProcess.css';
import Mua_ve from './Mua_ve';
import Thanh_toan from './Thanh_toan';
const BookingTicket = () => {
    
    // const {showtime_id} = useBooking()
    const [step, setStep] = useState(0); // 0: Chọn ghế, 1: Bắp nước, 2: Thanh toán, 3: Thông tin vé

    const nextStep = () => {
        setStep(prevStep => Math.min(prevStep + 1, 3)); // Giới hạn không vượt quá số bước
    };

    const prevStep = () => {
        setStep(prevStep => Math.max(prevStep - 1, 0)); // Giới hạn không thấp hơn 0
    };

    return (
        <BookingProvider>
            <div>
                <div className="step-content">
                    {step === 0 && (
                        <Mua_ve
                            nextStep={nextStep}
                        />
                    )}
                    {step === 1 && (
                        <Bap_nuoc
                            nextStep={nextStep}
                            prevStep={prevStep}
                        />
                    )}
                    {step === 2 && <Thanh_toan/>}
                </div>
            </div>
            <div className="progress-bars" style={{paddingTop: "20px"}}>
                    <div className={`step ${step === 0 ? 'active' : ''}`}> <i className = "fe fe-grid"></i><span>Chọn Ghế</span></div>
                    <div className='step-between'>»</div>
                    <div className={`step ${step === 1 ? 'active' : ''}`}> <i className = "fe fe-shopping-bag" ></i><span>Bắp Nước</span></div>
                    <div className='step-between'>»</div>
                    <div className={`step ${step === 2 ? 'active' : ''}`}> <i className = "fe fe-credit-card" ></i><span>Thanh Toán</span></div>
                    <div className='step-between'>»</div>
                    <div className={`step ${step === 3 ? 'active' : ''}`}> <i className = "fe fe-inbox" ></i><span>Thông Tin Vé</span></div>
                </div>
            <Shared></Shared>
            <Footer></Footer>
        </BookingProvider>
    );
};

export default BookingTicket;
