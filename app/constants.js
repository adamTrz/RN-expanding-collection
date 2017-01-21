
const icons = {
    locationIcon: 'https://image.flaticon.com/icons/png/512/67/67347.png',
    pinIcon: 'http://icons.iconarchive.com/icons/icons8/ios7/512/Messaging-Pin-icon.png',
    userIcon: 'http://icons.iconarchive.com/icons/iconsmind/outline/512/Administrator-icon.png',
    magifyIcon: 'https://d30y9cdsu7xlg0.cloudfront.net/png/95-200.png',
    crosshairIcon: 'https://cdn2.iconfinder.com/data/icons/lightly-icons/30/crosshairs-480.png',
    locationIconFull: 'https://cdn3.iconfinder.com/data/icons/pyconic-icons-1-2/512/location-pin-512.png',
    starIconFull: 'https://icons.iconarchive.com/icons/custom-icon-design/mini/48/Star-full-icon.png',
    starIconOutline: 'https://icons.iconarchive.com/icons/custom-icon-design/mini/48/Star-empty-icon.png',
    thumbUpIcon: 'https://image.flaticon.com/icons/png/128/20/20664.png'
}
const cities = [
    {
        id: '654831654',
        name: 'New York',
        img: 'https://media-cdn.tripadvisor.com/media/photo-s/03/9b/2d/f2/new-york-city.jpg',
        blob: 'New York is a sucked orange',
        rating: 4,
        reviews: [
            {
                userName: 'Ebbe Ugwu',
                userAvatar: 'https://randomuser.me/api/portraits/men/83.jpg',
                review: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis...',
                date: 'FEB 14th',
            } , {
                userName: 'Jakob Merquier',
                userAvatar: 'https://randomuser.me/api/portraits/men/46.jpg',
                review: ' aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                date: 'JUL 8th'
            } , {
                userName: 'Helena Waldenz',
                userAvatar: 'https://randomuser.me/api/portraits/women/9.jpg',
                review: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
                date: 'DEC 1st',
            }, {
                userName: 'Mark Philips',
                userAvatar: 'https://randomuser.me/api/portraits/men/45.jpg',
                review: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
                date: 'MAR 23rd'
            }
        ],
        coordinates: ['40° North', '74° West']
    },
    {
        id: '32164893',
        name: 'London',
        img: 'https://i.ytimg.com/vi/7BymziTFM2E/maxresdefault.jpg',
        blob: 'The buzzing, bustling, beautifully-bonkers heart of Great Britain',
        rating: 5,
        reviews: [
            {
                userName: 'Monique Shultz',
                userAvatar: 'https://randomuser.me/api/portraits/women/6.jpg',
                review: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis...',
                date: 'APR 15th'
            } , {
                userName: 'Sasha Abrasowich',
                userAvatar: 'https://randomuser.me/api/portraits/women/18.jpg',
                review: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis...',
                date: 'MAR 12ve'
            } , {
                userName: 'Michel Cors',
                userAvatar: 'https://randomuser.me/api/portraits/men/25.jpg',
                review: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis...',
                date: 'JUN 5th'
            } , {
                userName: 'Michelle Redriguez',
                userAvatar: 'https://randomuser.me/api/portraits/women/88.jpg',
                review: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis...',
                date: 'NOV 19th'
            } , {
                userName: 'Paul Stenton',
                userAvatar: 'https://randomuser.me/api/portraits/women/88.jpg',
                review: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis...',
                date: 'JUL 30th'
            }
        ],
        coordinates: ['51° North', '0° West']
    },
    {
        id: '65465654',
        name: 'Sydney',
        img: 'https://media-cdn.tripadvisor.com/media/photo-s/03/9b/2e/15/sydney.jpg',
        blob: 'If Paris is a city of lights, Sydney is the city of fireworks',
        rating: 4,
        reviews: [
            {
                userName: 'Patrice Allent',
                userAvatar: 'https://randomuser.me/api/portraits/men/6.jpg',
                review: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis...',
                date: 'MAR 16th'
            }, {
                userName: 'Adam Balzack',
                userAvatar: 'https://randomuser.me/api/portraits/men/18.jpg',
                review: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis...',
                date: 'SEP 1st'
            }, {
                userName: 'Kate Novak',
                userAvatar: 'https://randomuser.me/api/portraits/women/15.jpg',
                review: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis...',
                date: 'MAY 8th'
            }, {
                userName: 'Catherine Podolski',
                userAvatar: 'https://randomuser.me/api/portraits/women/66.jpg',
                review: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis...',
                date: 'MAR 22nd'
            }, {
                userName: 'John Smith',
                userAvatar: 'https://randomuser.me/api/portraits/men/22.jpg',
                review: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis...',
                date: 'SEP 16th'
            }
        ],
        coordinates: ['33° South', '151° East']
    },
    {
        id: '564541131',
        name: 'Paris',
        img: 'https://images8.alphacoders.com/376/thumb-1920-376369.jpg',
        blob: 'The only city in the world where starving to death is still considered an art',
        rating: 5,
        reviews: [
            {
                userName: 'Pete Jim',
                userAvatar: 'https://randomuser.me/api/portraits/men/8.jpg',
                review: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis...',
                date: 'MAR 14th'
            }, {
                userName: 'Scott Douglas',
                userAvatar: 'https://randomuser.me/api/portraits/men/16.jpg',
                review: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis...',
                date: 'APR 1st'
            }, {
                userName: 'Micheal Linkvist',
                userAvatar: 'https://randomuser.me/api/portraits/men/25.jpg',
                review: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis...',
                date: 'JUN 23rd'
            }, {
                userName: 'Eve Garcia',
                userAvatar: 'https://randomuser.me/api/portraits/women/1.jpg',
                review: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis...',
                date: 'JAN 1st',
            }
        ],
        coordinates: ['48° North', '2° East']
    },
    {
        id: '5645645643',
        name: 'Moscow',
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Moscow-City2015.jpg/440px-Moscow-City2015.jpg',
        blob: 'The power of Moscow pride should never be underestimated',
        rating: 4,
        reviews: [
            {
                userName: 'Abdul Amman',
                userAvatar: 'https://randomuser.me/api/portraits/men/75.jpg',
                review: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis...',
                date: 'DEC 31st'
            } , {
                userName: 'Jaques Paull',
                userAvatar: 'https://randomuser.me/api/portraits/men/71.jpg',
                review: ' aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                date: 'OCT 8th'
            } , {
                userName: 'Maria Hohenzollern',
                userAvatar: 'https://randomuser.me/api/portraits/women/81.jpg',
                review: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
                date: 'JUL 10th'
            }, {
                userName: 'Marie Vasquez',
                userAvatar: 'https://randomuser.me/api/portraits/women/46.jpg',
                review: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
                date: 'MAY 20th'
            }
        ],
        coordinates: ['55° North', '37° East']
    },
]

module.exports = {
    icons,  cities
}
