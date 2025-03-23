import DashboardTwoToneIcon from '@mui/icons-material/DashboardTwoTone';
import MovieTwoToneIcon from '@mui/icons-material/MovieTwoTone';
import EventNoteTwoToneIcon from '@mui/icons-material/EventNoteTwoTone';
import EditCalendarTwoToneIcon from '@mui/icons-material/EditCalendarTwoTone';
import EventSeatTwoToneIcon from '@mui/icons-material/EventSeatTwoTone';
import BookOnlineTwoToneIcon from '@mui/icons-material/BookOnlineTwoTone';
import PersonTwoToneIcon from '@mui/icons-material/PersonTwoTone';
import ExitToAppTwoToneIcon from '@mui/icons-material/ExitToAppTwoTone';
import TheatersTwoToneIcon from '@mui/icons-material/TheatersTwoTone';
import ArticleTwoToneIcon from '@mui/icons-material/ArticleTwoTone';

const DashboardIcon = DashboardTwoToneIcon;
const MovieIcon = MovieTwoToneIcon;
const ScheduleIcon = EventNoteTwoToneIcon;
const ShowtimeIcon = EditCalendarTwoToneIcon;
const RoomIcon = EventSeatTwoToneIcon;
const OrderIcon = BookOnlineTwoToneIcon;
const UserIcon = PersonTwoToneIcon;
const ExitIcon = ExitToAppTwoToneIcon;
const CinemaIcon = TheatersTwoToneIcon;
const ArticleIcon = ArticleTwoToneIcon;

export const navData = [
    {
        title: 'Tổng quan',
        path: '/admin/dashboard',
        icon: <DashboardIcon />,
    },
    {
        title: 'Quản lý phim',
        path: '/admin/movie',
        icon: <MovieIcon />,
    },
    {
        title: 'Quản lý rạp chiếu',
        path: '/admin/cinema',
        icon: <CinemaIcon />,
    },
    // {
    //     title: 'Schedule',
    //     path: '/admin/schedule',
    //     icon: <ScheduleIcon />,
    // },
    {
        title: 'Quản lý suất chiếu',
        path: '/admin/showtime',
        icon: <ShowtimeIcon />,
    },
    {
        title: 'Quản lý phòng chiếu',
        path: '/admin/room',
        icon: <RoomIcon />,
    },
    {
        title: 'Quản lý đơn hàng',
        path: '/admin/order',
        icon: <OrderIcon />,
    },
    {
        title: 'Quản lý người dùng',
        path: '/admin/user',
        icon: <UserIcon />,
    },
    // {
    //     title: 'Quản lý bài viết',
    //     path: '/admin/news',
    //     icon: <ArticleIcon />,
    // },
    {
        title: 'Quay về trang chủ',
        path: '/auth',
        icon: <ExitIcon />,
    }
];
