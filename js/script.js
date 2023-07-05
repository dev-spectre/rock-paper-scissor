let score = {
    "player": 0,
    "computer": 0,
};

let isRoundPlaying = false;

const options = document.querySelectorAll("#options > div[id]");
options.forEach(option => {

    option.addEventListener("click", () => {
        if (isRoundPlaying) return;
        isRoundPlaying = true;

        const matchResults = document.querySelectorAll(".match-result");
        const playerScore = 
            document.querySelector("#player-score .gradient-border > div");
        const computerScore = 
            document.querySelector("#computer-score .gradient-border > div");

        if (score["player"] >= 5 || score["computer"] >= 5) {
            matchResults.forEach(matchResult => 
                matchResult.setAttribute("data-match-result", "none"));
            score["player"] = 0;
            score["computer"] = 0;
            playerScore.innerHTML = "";
            computerScore.innerHTML = "";
        }

        const playerSelection = option.id;
        const computerSelection = getComputerChoice();
        
        const roundWinner = playRound(playerSelection, computerSelection);
        
        if (roundWinner) score[roundWinner]++;
        
        updateGui(playerSelection, computerSelection, score);
        
    });

});

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function updateGui(playerSelection, computerSelection, score) {
    const playerHexQuery = "#player-hex .inner-hex + img";
    const computerHexQuery = "#computer-hex .inner-hex + img";

    const playerHex = document.querySelector("#player-hex .outer-hex");
    const computerHex = document.querySelector("#computer-hex .outer-hex");
    const matchResults = document.querySelectorAll(".match-result div");

    const playerSelectionImg = document.querySelector(playerHexQuery);
    const computerSelectionImg = document.querySelector(computerHexQuery);

    playerSelectionImg.classList.remove("scale-zero");
    playerSelectionImg.src = `./assets/${playerSelection}.svg`;
    
    playerSelectionImg.addEventListener("transitionend", async () => {       
        //* computer's turn
        matchResults.forEach(matchResult => matchResult.innerText = "...");
    
        playerHex.classList.add("hidden");
        computerHex.classList.remove("hidden");

        //* display computer's choice
        await delay(300);
        computerSelectionImg.classList.remove("scale-zero");
        computerSelectionImg.src = `./assets/${computerSelection}.svg`;
    }, { once: true });
        

    computerSelectionImg.addEventListener("transitionend", async () => {
        await delay(800);

        //* add points
        const playerScore = 
            document.querySelector("#player-score .gradient-border > div");
        const computerScore = 
            document.querySelector("#computer-score .gradient-border > div");

        const point = "<div class=point></div>";
        let totalPoints = ""
        for (let i=0; i<score["player"]; i++) {
            totalPoints += point;
        }
        playerScore.innerHTML = totalPoints;

        totalPoints = "";
        for (let i=0; i<score["computer"]; i++) {
            totalPoints += point;
        }
        computerScore.innerHTML = totalPoints;

        await delay(400);
        //* shrink images
        playerSelectionImg.classList.add("scale-zero");
        computerSelectionImg.classList.add("scale-zero");

        //* player's turn
        matchResults.forEach(matchResult => matchResult.innerText = "YOUR TURN");
        
        computerHex.classList.add("hidden");
        playerHex.classList.remove("hidden");

        //* at match end
        matchResults.forEach(matchResult => {
            if (score["player"] === 5) {
                matchResult.innerText = "YOU WON";
                matchResult.parentElement.setAttribute("data-match-result","won");
            } else if (score["computer"] === 5) {
                matchResult.innerText = "YOU LOST";
                matchResult.parentElement.setAttribute("data-match-result", "lost");
            }
        });

         isRoundPlaying = false;
    }, { once: true });
}

function getComputerChoice() {
    const choices = ["rock", "paper", "scissor"];
    const computerChoice = choices[Math.floor(Math.random() * 3)];
    return computerChoice;
}

function playRound(playerSelection, computerSelection) {
    const selectionWinChart = {
        "rock": "paper",
        "paper": "scissor",
        "scissor": "rock",
    }
    
    const winningChoice = selectionWinChart[computerSelection];
    if (playerSelection === winningChoice) {
        return "player";
        
    } else if (playerSelection === computerSelection) {
        return null;

    } else {
        return "computer";
    }
}