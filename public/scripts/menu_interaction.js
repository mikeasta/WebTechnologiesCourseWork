// Button imports
const startGameButton         = document.getElementById("start_btn")
const leaderboardsButton      = document.getElementById("leaderboards_btn")
const leaderboardsCloseButton = document.getElementById("leaderboards_close_btn")
const toHome                  = document.getElementById("to_home")


// Section imports
const mainMenu                 = document.getElementById("main_menu_wrapper")
const leaderboardsTable        = document.getElementById("leaderboards_table_body")
const leaderboardsTableWrapper = document.getElementById("leaderboards_wrapper")
const gameplayMenu             = document.getElementById("gameplay_screen")


// Input imports
const nicknameInput = document.getElementById("nickname_input")


// Stats fields
const playerNickname = document.getElementById("playerNickname")
const playerLevel    = document.getElementById("playerLevel")
const playerScore    = document.getElementById("playerScore")


localStorage["leaderboards"] = JSON.stringify({leaderboards: [
    {
        name: "Mike",
        score: "10"
    },
    {
        name: "John",
        score: "1"
    },
    {
        name: "Dan",
        score: "256"
    },
]})


// Game start click
startGameButton.addEventListener("click", async () => {

    // Reading Nickname input contents and than define
    // what will we do next
    const nickname = nicknameInput.value
    const processedNickname = nickname.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()!?]/g,"")

    // Check if nickname is empty or incorrect
    if (!nickname || processedNickname != nickname ) {
        alert("Please enter correct name!")
        return
    }

    // Save nickname into localStorage
    localStorage["player.nickname"] = JSON.stringify({nickname})

    // If nickname is exists
    // Open gameplay window
    leaderboardsTable.style.display = "none";
    mainMenu.style.display          = "none";

    // Fill elements
    playerNickname.innerHTML = nickname;
    playerLevel.innerHTML    = "Level: 1";
    playerScore.innerHTML    = "Score: 00:00:00";

    // Memory Cleaning:
    // If nothing refers to DOM-object, JS' GC will delete required elements permanently
    while (leaderboardsTable.firstChild) 
        leaderboardsTable.removeChild(leaderboardsTable.firstChild);

    // Activate gameplay menu
    gameplayMenu.style.display = "flex";
});


// Leaderboard opening
leaderboardsButton.addEventListener("click", async () => {
    // Check if there no any children
    if (!leaderboardsTable.childNodes.length) {
        // Data loading
        let database = JSON.parse(localStorage["leaderboards"])

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
    while (leaderboardsTable.firstChild) 
        leaderboardsTable.removeChild(leaderboardsTable.firstChild);
});


// Return home button
toHome.addEventListener("click", () => {
    // Close gameplay screen, open main menu
    mainMenu.style.display     = "flex";
    gameplayMenu.style.display = "none";
    
    // Save data
    // ...
})