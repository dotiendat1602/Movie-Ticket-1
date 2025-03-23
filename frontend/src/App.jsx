import React from "react";
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import BookingTicket from "./components/Mua_ve/index";
import Thong_tin_ve from "./components/Mua_ve/Thong_tin_ve";
import Auth from "./components/page/Auth";
import Cinema from "./components/page/Cinema";
import FilmDetail from "./components/page/FilmDetail";
import FilmComment from "./components/page/FilmComment";
import FilmTime from "./components/page/FilmTime";
import FilmBuy from "./components/page/FilmBuy";
import Lich_chieu from "./components/page/Lich_chieu";
import CinemaTime from "./components/page/CinemaTime";
import Films from "./components/page/Films";
import MyAccount from "./components/page/MyAccount";
import Actor from "./components/page/Actor";
import Director from "./components/page/Director";
import Category from "./components/page/Category";
import BuyTicket from "./components/page/BuyTicket";
import New from "./components/page/New";
import NewDetail from "./components/page/NewDetail";
import Search from "./components/page/Search";
import FirstScreen from "./components/page/FirstScreen";
import NewCreate from "./components/page/NewCreate";
function App() {
  return (
<Router>
      <Routes>
        <Route path="/" element={<Navigate to="/welcome" />} />
        <Route path="/welcome" element={<FirstScreen />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/phim/:film_name" element={<FilmDetail />}/>
        <Route path="/lich_chieu/:film_name" element={<FilmTime />}/>
        <Route path="/lich_chieu" element={<Lich_chieu />}/>
        <Route path="/dat_ve/:film_name" element = {<BookingTicket/>}/>
        <Route path="/thong_tin_ve/" element = {<Thong_tin_ve/>}/>
        <Route path="/danh_gia/:film_name" element={<FilmComment/>}/>
        <Route path="/mua_ve/:film_name" element={<FilmBuy/>}/>
        <Route path="/rap" element={<Cinema/>}/>
        <Route path="/rap/:cinema_name" element={<CinemaTime/>}/>
        <Route path="/phim" element={<Films/>}/>
        <Route path="/account/:user_name" element={<MyAccount/>}/>
        <Route path="/dien_vien/:actor_name" element={<Actor/>}/>
        <Route path="/dao_dien/:diretor_name" element={<Director/>}/>
        <Route path="/the_loai/:category_name" element={<Category/>}/>
        <Route path="/mua_ve" element={<BuyTicket/>}/>
        <Route path="/tin_tuc" element={<New/>}/>
        <Route path="/tin_tuc/:new_header" element={<NewDetail/>}/>
        <Route path="/tim_kiem/:searchQuery" element={<Search/>}/>
        <Route path="/tin_tuc/viet_bai" element={<NewCreate/>}/>
        
      </Routes>
   </Router>);

}

export default App;

