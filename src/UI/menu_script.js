const startGameButton    = document.getElementById("start_btn")
const leaderboardsButton = document.getElementById("leaderboards_btn")
const leaderboardsCloseButton = document.getElementById("leaderboards_close_btn")

const mainMenu = document.getElementById("main_menu_wrapper")
const leaderboardsTable = document.getElementById("leaderboards_wrapper")

startGameButton.addEventListener("click", () => {
    leaderboardsTable.style.display = "none";
    mainMenu.style.display = "none";
});

leaderboardsButton.addEventListener("click", () => {
    leaderboardsTable.style.display = "flex";
});

leaderboardsCloseButton.addEventListener("click", () => {
    leaderboardsTable.style.display = "none";
});