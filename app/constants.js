
const icons = {
    locationIcon: 'https://image.flaticon.com/icons/png/512/67/67347.png',
    pinIcon: 'http://icons.iconarchive.com/icons/icons8/ios7/512/Messaging-Pin-icon.png',
    userIcon: 'http://icons.iconarchive.com/icons/iconsmind/outline/512/Administrator-icon.png',
    magifyIcon: 'https://d30y9cdsu7xlg0.cloudfront.net/png/95-200.png',
    crosshairIcon: 'https://cdn2.iconfinder.com/data/icons/lightly-icons/30/crosshairs-480.png',
}
const cities = [
    {
        id: '654831654',
        name: 'New York',
        img: 'https://media-cdn.tripadvisor.com/media/photo-s/03/9b/2d/f2/new-york-city.jpg',
        blob: 'New York is a sucked orange',
        rating: 4,
        users: [
            {avatar: 'https://randomuser.me/api/portraits/men/83.jpg'},
            {avatar: 'https://randomuser.me/api/portraits/men/46.jpg'},
            {avatar: 'https://randomuser.me/api/portraits/women/9.jpg'},
            {avatar: 'https://randomuser.me/api/portraits/men/45.jpg'}
        ],
        coordinates: ['40.7128° N', '74.0059° W']
    },
    {
        id: '32164893',
        name: 'London',
        img: 'https://i.ytimg.com/vi/7BymziTFM2E/maxresdefault.jpg',
        blob: 'The buzzing, bustling, beautifully-bonkers heart of Great Britain',
        rating: 5,
        users: [
            {avatar: 'https://randomuser.me/api/portraits/women/6.jpg'},
            {avatar: 'https://randomuser.me/api/portraits/women/18.jpg'},
            {avatar: 'https://randomuser.me/api/portraits/men/25.jpg'},
            {avatar: 'https://randomuser.me/api/portraits/women/88.jpg'},
            {avatar: 'https://randomuser.me/api/portraits/men/1.jpg'}
        ],
        coordinates: ['51.5074 N', '0.1278 W']
    },
    {
        id: '65465654',
        name: 'Sydney',
        img: 'https://media-cdn.tripadvisor.com/media/photo-s/03/9b/2e/15/sydney.jpg',
        blob: 'If Paris is a city of lights, Sydney is the city of fireworks',
        rating: 4,
        users: [
            {avatar: 'https://randomuser.me/api/portraits/men/6.jpg'},
            {avatar: 'https://randomuser.me/api/portraits/men/18.jpg'},
            {avatar: 'https://randomuser.me/api/portraits/women/15.jpg'},
            {avatar: 'https://randomuser.me/api/portraits/women/66.jpg'},
            {avatar: 'https://randomuser.me/api/portraits/men/22.jpg'}
        ],
        coordinates: ['33.8688° S', '151.2093° E']
    },
    {
        id: '564541131',
        name: 'Paris',
        img: 'https://dncache-mauganscorp.netdna-ssl.com/thumbseg/1209/1209252-bigthumbnail.jpg',
        blob: 'The only city in the world where starving to death is still considered an art',
        rating: 5,
        users: [
            {avatar: 'https://randomuser.me/api/portraits/men/8.jpg'},
            {avatar: 'https://randomuser.me/api/portraits/men/16.jpg'},
            {avatar: 'https://randomuser.me/api/portraits/men/25.jpg'},
            {avatar: 'https://randomuser.me/api/portraits/women/1.jpg'}
        ],
        coordinates: ['48.8566° N', '2.3522° E']
    },
    {
        id: '5645645643',
        name: 'Moscow',
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Moscow-City2015.jpg/440px-Moscow-City2015.jpg',
        blob: 'The power of Moscow pride should never be underestimated',
        rating: 4,
        users: [
            {avatar: 'https://randomuser.me/api/portraits/men/75.jpg'},
            {avatar: 'https://randomuser.me/api/portraits/men/71.jpg'},
            {avatar: 'https://randomuser.me/api/portraits/women/81.jpg'},
            {avatar: 'https://randomuser.me/api/portraits/women/46.jpg'}
        ],
        coordinates: ['55.7558° N', '37.6173° E']
    },

]

module.exports = {
    icons,  cities
}
