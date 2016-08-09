const FG_YELLOW_COLOR = '\x1b[33m';
const FG_BLUE_COLOR = '\x1b[34m';
const FG_CYAN_COLOR = '\x1b[36m';
const BG_BLACK_COLOR = '\x1b[40m';
const RESET_COLOR = '\x1b[0m';

module.exports = function(actionType) {
    console.log(
        ' ',
        FG_BLUE_COLOR + '--> @' +
        BG_BLACK_COLOR + FG_YELLOW_COLOR + ' ' + printCurrentDate() +
        BG_BLACK_COLOR + FG_CYAN_COLOR + ' ' + actionType +
        RESET_COLOR
    );
};

const repeat = function(str, times) {
    return new Array(times + 1).join(str);
};

const pad = function(num, maxLength) {
    return repeat('0', maxLength - num.toString().length) + num;
}

const printCurrentDate = function() {
    var now = new Date();
    var hours = now.getHours();
    var minutes = now.getMinutes();
    var seconds = now.getSeconds();
    var millis = now.getMilliseconds();

    return pad(hours, 2) + ':' + pad(minutes, 2) + ':' + pad(seconds, 2)
            + '.' + pad(millis, 3);
};
