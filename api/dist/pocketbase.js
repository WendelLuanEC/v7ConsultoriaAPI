"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestPocketbase = void 0;
const PocketBase = require('pocketbase');
const url = 'https://demodatabase.pockethost.io/';
const client = new PocketBase(url);
const requestPocketbase = async () => {
    const records = await client.collection('users').getFullList({
        sort: '-created',
    });
    console.log(records);
};
exports.requestPocketbase = requestPocketbase;
