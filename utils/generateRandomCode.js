"use strict";
exports.__esModule = true;
var generateRoomCode = function () {
    var string = 'abcdefghijklmnopqrstuvwxyz';
    var room = '';
    // Find the length of string
    var len = string.length;
    for (var i = 1; i <= 9; i++) {
        room += string[Math.floor(Math.random() * len)];
        if (i % 3 === 0 && i < 9)
            room += '-';
    }
    return room;
};
exports["default"] = generateRoomCode;
