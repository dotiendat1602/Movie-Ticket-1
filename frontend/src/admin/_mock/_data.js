export const _myAccount = {
    displayName: 'Jaydon Frankie',
    email: 'jaydonfr@gmail.com',
    photoURL: '/assets/images/avatar/avatar-25.webp',
};

export const _id = (index) => `e99f09a7-dd88-49d5-b1c8-1daf80c2d7b${index}`;

export const _fullNames = (index) => [
    'Billy Stoltenberg', 'Eloise Ebert', 'Teresa Luettgen', 'Salvador Mayert',
    'Dr. Guadalupe Rath', 'Kelvin Pouros', 'Thelma Langworth', 'Kristen Wunsch',
    'Steve Welch', 'Brian Jacobs', 'Lillie Schultz', 'Mr. Conrad Spinka',
    'Charlene Krajcik', 'Kerry Kuhlman', 'Betty Hammes', 'Tony Paucek PhD',
    'Sherri Davis', 'Angel Rolfson-Kulas', 'Dr. Lee Doyle-Grant', 'Cheryl Romaguera',
    'Billy Braun', 'Adam Trantow', 'Brandon Von', 'Willis Ankunding'
][index];

export const _emails = (index) => [
    'billy.stoltenberg@example.com', 'eloise.ebert@example.com', 'teresa.luettgen@example.com', 'salvador.mayert@example.com',
    'guadalupe.rath@example.com', 'kelvin.pouros@example.com', 'thelma.langworth@example.com', 'kristen.wunsch@example.com',
    'steve.welch@example.com', 'brian.jacobs@example.com', 'lillie.schultz@example.com', 'conrad.spinka@example.com',
    'charlene.krajcik@example.com', 'kerry.kuhlman@example.com', 'betty.hammes@example.com', 'tony.paucek@example.com',
    'sherri.davis@example.com', 'angel.rolfson@example.com', 'lee.doyle@example.com', 'cheryl.romaguera@example.com',
    'billy.braun@example.com', 'adam.trantow@example.com', 'brandon.von@example.com', 'willis.ankunding@example.com'
][index];

export const _phoneNumbers = (index) => [
    '123-456-7890', '234-567-8901', '345-678-9012', '456-789-0123',
    '567-890-1234', '678-901-2345', '789-012-3456', '890-123-4567',
    '901-234-5678', '012-345-6789', '123-456-7800', '234-567-8900',
    '345-678-9000', '456-789-0101', '567-890-1202', '678-901-2303',
    '789-012-3404', '890-123-4505', '901-234-5606', '012-345-6707',
    '123-456-7808', '234-567-8909', '345-678-9010', '456-789-0111'
][index];

export const _users = [...Array(24)].map((_, index) => ({
    id: _id(index),
    avatarUrl: `/assets/images/avatar/avatar-${index + 1}.webp`,
    name: _fullNames(index),
    email: _emails(index),
    phonenumber: _phoneNumbers(index),
    status: index % 4 ? 'active' : 'inactive',
    role: index % 24 ? 'user' : 'admin'
}));

export const _movies = [...Array(12)].map((_, index) => ({
    id: `movie-${index + 1}`,
    name: [
        'The Silent Horizon',
        'Eternal Shadows',
        'Chasing Infinity',
        'Forgotten Realm',
        'The Last Symphony',
        'Starlight Echoes',
        'Winds of Tomorrow',
        'Echoes of the Past',
        'The Crimson Pact',
        'Whispers in the Dark',
        'Boundless Journey',
        'Fragments of Time'
    ][index],
    description: [
        'A thrilling story of survival in the unknown reaches of space.',
        'A gripping tale of courage amidst an eternal war between light and darkness.',
        'A quest to uncover the mysteries of the universe with stunning visuals.',
        'An epic fantasy about a hero’s journey to save a forgotten kingdom.',
        'A heartwarming drama centered around the power of music and love.',
        'An inspiring sci-fi adventure of hope and redemption among the stars.',
        'A captivating story of resilience in a post-apocalyptic world.',
        'A drama exploring the unbreakable ties of family and memory.',
        'A dark fantasy tale of forbidden alliances and ancient magic.',
        'A spine-chilling mystery that blurs the line between dreams and reality.',
        'An exhilarating adventure of discovery and uncharted lands.',
        'A touching narrative about the passage of time and human connections.'
    ][index],
    film_type: ['Action', 'Drama', 'Sci-Fi', 'Fantasy', 'Romance', 'Adventure', 'Thriller', 'Drama', 'Fantasy', 'Horror', 'Adventure', 'Romance'][index],
    age_limit: [13, 16, 18, 7, 13, 13, 16, 18, 13, 16, 18, 7][index],
    duration: [
        120, 110, 100, 91,
        90, 108, 89, 70,
        120, 111, 94, 90
    ][index],
    release_date: [
        '2024-01-12', '2023-09-18', '2022-06-25', '2023-11-08',
        '2022-03-19', '2023-07-14', '2024-02-05', '2023-10-10',
        '2022-08-30', '2023-12-22', '2024-04-15', '2023-05-20'
    ][index]
}));

export const _cinemas = [...Array(10)].map((_, index) => ({
    id: `cinema-${index + 1}`,
    name: [
        'Starlight Multiplex',
        'Galaxy Cinema',
        'Nova Film Center',
        'Eclipse Theatres',
        'Cosmos Cineplex',
        'Lunar Screens',
        'Aurora Movieplex',
        'Infinity Cinemas',
        'Vivid Cinehall',
        'Dreamscape Theatres'
    ][index],
    address: [
        '123 Main Street, Downtown City',
        '45 Star Lane, Uptown District',
        '678 Broad Avenue, Midtown Central',
        '901 Sunset Boulevard, West End',
        '23 Moonrise Drive, Eastside Area',
        '87 Nova Plaza, Outer Ring',
        '19 Stellar Way, Skyline Heights',
        '303 Infinity Road, New City Zone',
        '56 Bright Street, City Core',
        '412 Horizon Parkway, Suburban Belt'
    ][index]
    , cluster_name: [
        'Cluster A',
        'Cluster A',
        'Cluster B',
        'Cluster B',
        'Cluster C',
        'Cluster C',
        'Cluster D',
        'Cluster D',
        'Cluster E',
        'Cluster E'
    ][index]
    // ,region: [
    //     'North',
    //     'North',
    //     'Central',
    //     'Central',
    //     'East',
    //     'East',
    //     'South',
    //     'South',
    //     'West',
    //     'West'
    // ][index]
}));

export const _showtimes = [...Array(15)].map((_, index) => ({
    id: `showtime-${index + 1}`,
    movie_name: [
        'The Silent Horizon',
        'Eternal Shadows',
        'Chasing Infinity',
        'Forgotten Realm',
        'The Last Symphony',
        'Starlight Echoes',
        'Winds of Tomorrow',
        'Echoes of the Past',
        'The Crimson Pact',
        'Whispers in the Dark',
        'Boundless Journey',
        'Fragments of Time',
        'The Silent Horizon',
        'Eternal Shadows',
        'Chasing Infinity'
    ][index % 12],
    cinema_name: [
        'Starlight Multiplex',
        'Galaxy Cinema',
        'Nova Film Center',
        'Eclipse Theatres',
        'Cosmos Cineplex',
        'Lunar Screens',
        'Aurora Movieplex',
        'Infinity Cinemas',
        'Vivid Cinehall',
        'Dreamscape Theatres',
        'Galaxy Cinema',
        'Starlight Multiplex',
        'Infinity Cinemas',
        'Cosmos Cineplex',
        'Dreamscape Theatres'
    ][index % 10],
    room_name: [
        'Room A', 'Room B', 'Room C',
        'Room D', 'Room E', 'Room F',
        'Room G', 'Room H', 'Room I',
        'Room J', 'Room K', 'Room L'
    ][index % 12],
    date: [
        '2024-01-12', '2023-09-18', '2022-06-25',
        '2023-11-08', '2022-03-19', '2023-07-14',
        '2024-02-05', '2023-10-10', '2022-08-30',
        '2023-12-22', '2024-04-15', '2023-05-20',
        '2024-01-12', '2023-09-18', '2022-06-25'
    ][index % 12],
    showtime: [
        '10:00', '12:30', '15:00',
        '17:30', '20:00', '09:45',
        '13:15', '16:45', '19:15',
        '21:00', '11:30', '14:00',
        '18:00', '19:45', '21:30'
    ][index % 15]
}));

export const _rooms = [...Array(15)].map((_, index) => ({
    id: `room-${index + 1}`,
    room_name: [
        'Room A', 'Room B', 'Room C',
        'Room D', 'Room E', 'Room F',
        'Room G', 'Room H', 'Room I',
        'Room J', 'Room K', 'Room L',
        'Room M', 'Room N', 'Room O'
    ][index % 15],
    cinema_id: `cinema-${index + 1}`,
    cinema_name: [
        'Starlight Multiplex',
        'Galaxy Cinema',
        'Nova Film Center',
        'Eclipse Theatres',
        'Cosmos Cineplex',
        'Lunar Screens',
        'Aurora Movieplex',
        'Infinity Cinemas',
        'Vivid Cinehall',
        'Dreamscape Theatres',
        'Starlight Multiplex',
        'Infinity Cinemas',
        'Galaxy Cinema',
        'Cosmos Cineplex',
        'Dreamscape Theatres'
    ][index % 10]
}));

export const _orders = [...Array(15)].map((_, index) => ({
    order_id: `order_id-${index + 1}`,
    movie_name: [
        'The Silent Horizon',
        'Eternal Shadows',
        'Chasing Infinity',
        'Forgotten Realm',
        'The Last Symphony',
        'Starlight Echoes',
        'Winds of Tomorrow',
        'Echoes of the Past',
        'The Crimson Pact',
        'Whispers in the Dark',
        'Boundless Journey',
        'Fragments of Time',
        'The Silent Horizon',
        'Eternal Shadows',
        'Chasing Infinity'
    ][index % 12],
    cinema_name: [
        'Starlight Multiplex',
        'Galaxy Cinema',
        'Nova Film Center',
        'Eclipse Theatres',
        'Cosmos Cineplex',
        'Lunar Screens',
        'Aurora Movieplex',
        'Infinity Cinemas',
        'Vivid Cinehall',
        'Dreamscape Theatres',
        'Galaxy Cinema',
        'Starlight Multiplex',
        'Infinity Cinemas',
        'Cosmos Cineplex',
        'Dreamscape Theatres'
    ][index % 10],
    room_name: [
        'Room A', 'Room B', 'Room C',
        'Room D', 'Room E', 'Room F',
        'Room G', 'Room H', 'Room I',
        'Room J', 'Room K', 'Room L'
    ][index % 12],
    show_date: [
        '2024-01-12',
        '2023-09-18',
        '2022-06-25',
        '2023-11-08',
        '2022-03-19',
        '2023-07-14',
        '2024-02-05',
        '2023-10-10',
        '2022-08-30',
        '2023-12-22',
        '2024-04-15',
        '2023-05-20',
        '2024-01-12',
        '2023-09-18',
        '2022-06-25'
    ][index % 15],
    total_price: [
        150000, 120000, 200000, 180000,
        100000, 130000, 170000, 220000,
        140000, 160000, 190000, 250000,
        180000, 200000, 110000
    ][index % 15],
    order_date: [
        '2023-12-01',
        '2023-12-02',
        '2023-12-03',
        '2023-12-04',
        '2023-12-05',
        '2023-12-06',
        '2023-12-07',
        '2023-12-08',
        '2023-12-09',
        '2023-12-10',
        '2023-12-11',
        '2023-12-12',
        '2023-12-13',
        '2023-12-14',
        '2023-12-15'
    ][index % 15]
}));






