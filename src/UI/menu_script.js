const startGameButton    = document.getElementById("start_btn")
const leaderboardsButton = document.getElementById("leaderboards_btn")
const leaderboardsCloseButton = document.getElementById("leaderboards_close_btn")

const mainMenu = document.getElementById("main_menu_wrapper")
const leaderboardsTableWrapper = document.getElementById("leaderboards_wrapper")
const leaderboardsTable = document.getElementById("leaderboards_table_body")

const leaderboardsDatabasePath = "./../../database/dumb_leaderboards.json";

startGameButton.addEventListener("click", () => {
    leaderboardsTable.style.display = "none";
    mainMenu.style.display = "none";
});

leaderboardsButton.addEventListener("click", async () => {
    let database = await(await fetch(leaderboardsDatabasePath,
        {
            headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }
    )).json();

    let scoresList = database.leaderboards
    
    console.log(scoresList)

    scoresList.sort((a, b) => {
        return (a.score > b.score) ? -1 : (a.score < b.score) ? 1 : 0
    })


    scoresList.forEach(element => {
        let newRow = document.createElement("tr")
        let nicknameCell = document.createElement("td")
        let scoreCell = document.createElement("td")

        nicknameCell.innerHTML = element["name"]
        scoreCell.innerHTML = element["score"]

        newRow.append(nicknameCell)
        newRow.append(scoreCell)
        leaderboardsTable.append(newRow);
    });

    leaderboardsTableWrapper.style.display = "flex";
});

leaderboardsCloseButton.addEventListener("click", () => {
    // Memory Cleaning:
    // If nothing refers to DOM-object, JS' GC will delete required elements permanently
    while (leaderboardsTable.firstChild) {
        leaderboardsTable.removeChild(leaderboardsTable.firstChild);
    }

    leaderboardsTableWrapper.style.display = "none";
});