import axios from 'axios';
import { createContext, default as React, useContext, useEffect, useState } from 'react';

const BookingContext = createContext();
export const BookingProvider = ({ children }) => {
    const showtime_id = localStorage.getItem('showtime_id')
    if(!showtime_id) {
        return (
            <h1>hi</h1>
        )
    }
    const [seatTotalAmount, setSeatTotalAmount] = useState(0);
    const [popcornTotalAmount, setPopcornTotalAmount] = useState(0);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [selectedCombos, setSelectedCombos] = useState([]);
    const [popcornData, setPopcornData] = useState(null);
    const [seatData, setSeatData] = useState(null);
    const [seatLoading, setSeatLoading] = useState(true);
    const [popcornLoading, setPopcornLoading] = useState(true);

    useEffect(() => {
        // Fetch seat data
        axios.get(`${import.meta.env.VITE_API_URL}/api/muaVe/showtime_id=${showtime_id}`)
            .then(response => {
                setSeatData(response.data);
                setSeatLoading(false);
            })
            .catch(error => {
                console.error("Error fetching seat data:", error);
                setSeatLoading(false);
            });
    }, [showtime_id]);

    useEffect(() => {
        // Fetch popcorn data
        axios.get(`${import.meta.env.VITE_API_URL}/api/muaVe/popcornInfo`)
            .then(response => {
                setPopcornData(response.data);
                setPopcornLoading(false);
            })
            .catch(error => {
                console.error("Error fetching popcorn data:", error);
                setPopcornLoading(false);
            });
    }, []);

    if (seatLoading || popcornLoading) return <p>Loading...</p>;
    if (!seatData) return <p>Seat data not found.</p>;
    if (!popcornData) return <p>Popcorn data not found.</p>;

    return (
        <BookingContext.Provider value={{
            showtime_id,
            seatTotalAmount,
            setSeatTotalAmount,
            popcornTotalAmount,
            setPopcornTotalAmount,
            selectedSeats,
            setSelectedSeats,
            selectedCombos,
            setSelectedCombos,
            seatData,
            setSeatData,
            popcornData,
            setPopcornData,
        }}>
            {children}
        </BookingContext.Provider>
    );
};

export const useBooking = () => useContext(BookingContext);