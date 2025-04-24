"use strict";
var Sleeper = /** @class */ (function () {
    function Sleeper() {
    }
    Sleeper.prototype.sleep = function (seconds) {
        return new Promise(function (resolve) { return setTimeout(resolve, seconds * 1000); });
    };
    return Sleeper;
}());
module.exports = Sleeper;
//# sourceMappingURL=Sleeper.js.map