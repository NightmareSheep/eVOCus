if (getCookie("nickname") === null)
    setCookie("nickname", prompt("Please enter a nickname for yourself"), 0);
if (getCookie("playerId") === null) {
    var playerId = guid();
    setCookie("playerId", playerId);
} else {
    var playerId = getCookie("playerId");
}
