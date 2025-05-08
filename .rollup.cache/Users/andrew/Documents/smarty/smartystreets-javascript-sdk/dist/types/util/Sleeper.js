var Sleeper = /** @class */ (function () {
    function Sleeper() {
    }
    Sleeper.prototype.sleep = function (seconds) {
        return new Promise(function (resolve) { return setTimeout(resolve, seconds * 1000); });
    };
    return Sleeper;
}());
export default Sleeper;
//# sourceMappingURL=Sleeper.js.map