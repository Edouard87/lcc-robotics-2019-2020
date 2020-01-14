function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomVert() {
    var topBound = parseInt($(".app-spawn-area").css("top"), 10);
    var bottomBound = parseInt($(".app-spawn-area").css("top"), 10) + parseInt($(".app-spawn-area").css("height"), 10);
    return getRandomInt(topBound, bottomBound) + "px"
}

function getRandomHoriz() {
    var leftBound = parseInt($(".app-spawn-area").css("left"), 10);
    var rightBound = parseInt($(".app-spawn-area").css("left"), 10) + parseInt($(".app-spawn-area").css("width"), 10);
    return getRandomInt(leftBound, rightBound) + "px"
}