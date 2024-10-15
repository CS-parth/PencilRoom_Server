"use strict";
exports.__esModule = true;
exports.stablishConnection = void 0;
var mongoose_1 = require("mongoose");
var stablishConnection = function () {
    var mongodUri = process.env.MONGODB_URI;
    mongoose_1["default"].connect(mongodUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
        .then(function () {
        process.stdout.write('MongoDB connected successfully\n');
    })["catch"](function (err) {
        console.error('MongoDB connection failed:', err);
        process.exit(1);
    });
};
exports.stablishConnection = stablishConnection;
