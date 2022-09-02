const startGameButton    = document.getElementById("start_btn")
const leaderboardsButton = document.getElementById("leaderboards_btn")
const leaderboardsCloseButton = document.getElementById("leaderboards_close_btn")

const mainMenu = document.getElementById("main_menu_wrapper")
const leaderboardsTableWrapper = document.getElementById("leaderboards_wrapper")
const leaderboardsTable = document.getElementById("leaderboards_table_body")

const leaderboardsDatabasePath = "./../../database/dumb_leaderboards.json";

// Game start
startGameButton.addEventListener("click", () => {
    leaderboardsTable.style.display = "none";
    mainMenu.style.display = "none";
});

// Leaderboard opening
leaderboardsButton.addEventListener("click", async () => {

    // Data loading
    let database = await(await fetch(leaderboardsDatabasePath,
        {
            headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }
    )).json();

    let scoresList = database.leaderboards

    // Score array sorting
    scoresList.sort((a, b) => {
        return (a.score > b.score) ? -1 : (a.score < b.score) ? 1 : 0
    })

    // Creating DOM-elements for each player 
    // Appending them to .html file
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

    // Enable leaderboards table for interaction
    leaderboardsTableWrapper.style.display = "flex";
});

leaderboardsCloseButton.addEventListener("click", () => {
    // Memory Cleaning:
    // If nothing refers to DOM-object, JS' GC will delete required elements permanently
    while (leaderboardsTable.firstChild) {
        leaderboardsTable.removeChild(leaderboardsTable.firstChild);
    }

    // Unable leaderboards table for interaction
    leaderboardsTableWrapper.style.display = "none";
});