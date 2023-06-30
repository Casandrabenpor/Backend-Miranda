"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInfo = void 0;
const getInfo = () => {
    return {
        hotelName: 'Miranda',
        bookings: { methods: ['POST', 'GET', 'PUT', 'DELETE'], route: '/bookings' },
        contacts: { methods: ['POST', 'GET', 'PUT', 'DELETE'], route: '/contacts' },
        users: { methods: ['POST', 'GET', 'PUT', 'DELETE'], route: '/users' },
        rooms: { methods: ['POST', 'GET', 'PUT', 'DELETE'], route: '/rooms' },
    };
};
exports.getInfo = getInfo;
