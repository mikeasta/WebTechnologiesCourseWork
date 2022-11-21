// Button imports
const startGameButton         = document.getElementById("start_btn")
const leaderboardsButton      = document.getElementById("leaderboards_btn")
const leaderboardsCloseButton = document.getElementById("leaderboards_close_btn")

// Section imports
const mainMenu                 = document.getElementById("main_menu_wrapper")
const leaderboardsTable        = document.getElementById("leaderboards_table_body")
const leaderboardsTableWrapper = document.getElementById("leaderboards_wrapper")

// Input imports
const nicknameInput = document.getElementById("nickname_input")

// Database relative path
const leaderboardsDatabasePath = "./../../database/dumb_leaderboards.json";


// Game start click
startGameButton.addEventListener("click", async () => {

    // Reading Nickname input contents and than define
    // what will we do next
    const nickname = nicknameInput.value

    if (!nickname) {
        window.alert("You have entered no nickname. Please name yourself.");
        return;
    }

    // Save nickname into localStorage
    localStorage["player"] = JSON.stringify({nickname})

    // If nickname is exists
    leaderboardsTable.style.display = "none";
    mainMenu.style.display          = "none";

    // Memory Cleaning:
    // If nothing refers to DOM-object, JS' GC will delete required elements permanently
    while (leaderboardsTable.firstChild) {
        leaderboardsTable.removeChild(leaderboardsTable.firstChild);
    }
});


// Leaderboard opening
leaderboardsButton.addEventListener("click", async () => {

    console.log(leaderboardsTable.childNodes.length)

    // Check if there no any children
    if (!leaderboardsTable.childNodes.length) {
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
            let newRow       = document.createElement("tr")
            let nicknameCell = document.createElement("td")
            let scoreCell    = document.createElement("td")

            nicknameCell.innerHTML = element["name"]
            scoreCell.innerHTML    = element["score"]

            newRow.append(nicknameCell)
            newRow.append(scoreCell)
            leaderboardsTable.append(newRow);
        });
    }
    
    // Enable leaderboards table for interaction
    leaderboardsTableWrapper.style.display = "flex";
});

// Leaderboard close
leaderboardsCloseButton.addEventListener("click", () => {
    // Unable leaderboards table for interaction
    leaderboardsTableWrapper.style.display = "none";

    // Memory Cleaning:
    // If nothing refers to DOM-object, JS' GC will delete required elements permanently
    while (leaderboardsTable.firstChild) {
        leaderboardsTable.removeChild(leaderboardsTable.firstChild);
    }
});