let score = {
    "player": 0,
    "computer": 4,
};

const options = document.querySelectorAll("#options > div[id]");
options.forEach(option => {

    option.addEventListener("click", () => { 
        const matchResults = document.querySelectorAll(".match-result");

        if (score["player"] >= 5 || score["computer"] >= 5) {
            matchResults.forEach(matchResult => 
                matchResult.setAttribute("data-match-result", "none"));
            score["player"] = 0;
            score["computer"] = 0;
        }

        const playerSelection = option.id;
        const computerSelection = getComputerChoice();
        
        const roundWinner = playRound(playerSelection, computerSelection);
        
        if (roundWinner) score[roundWinner]++;
        
        updateGui(playerSelection, computerSelection, score);

        
        setTimeout(() => {
            if (score["player"] === 5) {
                matchResults.forEach(matchResult => {
                    matchResult.setAttribute("data-match-result","won");
                    const resultText = document.querySelector(".match-result div");
                    resultText.innerText = "YOU WON"
                });
            } else if (score["computer"] === 5) {
                matchResults.forEach(matchResult => {
                    matchResult.setAttribute("data-match-result", "lost");
                    const resultText = document.querySelector(".match-result div");
                    resultText.innerText = "YOU LOST"
                });
            }
            matchResults.addEventListener("change", () => {
                if (score["player"] === 5) {
                    matchResults.forEach(() => {
                        const resultText = document.querySelector(".match-result div");
                        resultText.innerText = "YOU WON"
                    });
                } else if (score["computer"] === 5) {
                    matchResults.forEach(() => {
                        const resultText = document.querySelector(".match-result div");
                        resultText.innerText = "YOU LOST"
                    });
                }
            })
        }, 4700);
    });


});

function updateGui(playerSelection, computerSelection, score) {
    const timeout = 100;

    const playerHexQuery = "#player-hex .inner-hex + img";
    const computerHexQuery = "#computer-hex .inner-hex + img";

    const playerSelectionImg = document.querySelector(playerHexQuery);
    playerSelectionImg.classList.remove("scale-zero");
    playerSelectionImg.src = `./assets/${playerSelection}.svg`;
    
    playerSelectionImg.addEventListener("transitionend", () => {       
        const playerHex = document.querySelector("#player-hex .outer-hex");
        const computerHex = document.querySelector("#computer-hex .outer-hex");
        const matchResults = document.querySelectorAll(".match-result div");
        setTimeout(() => {
            
            matchResults.forEach(matchResult => matchResult.innerText = "...");
        
            playerHex.classList.add("hidden");
            computerHex.classList.remove("hidden");

        }, timeout);

        setTimeout(() => {
            const computerSelectionImg = document.querySelector(computerHexQuery);
    
            computerSelectionImg.classList.remove("scale-zero");
            computerSelectionImg.src = `./assets/${computerSelection}.svg`;
        }, timeout + 500);

        const playerSelectionImg = document.querySelector(playerHexQuery);
        const computerSelectionImg = document.querySelector(computerHexQuery);
        
        setTimeout(() => {
            const playerScore = 
                document.querySelector("#player-score .gradient-border > div");
            const computerScore = 
                document.querySelector("#computer-score .gradient-border > div");
    
            const point = "<div class=point></div>"
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
            
        }, timeout + 800);
    
        setTimeout(() => {
            //* shrink
            playerSelectionImg.classList.add("scale-zero");
            computerSelectionImg.classList.add("scale-zero");
    
        }, timeout + 1800);
        
        setTimeout(() => {
            matchResults.forEach(matchResult => matchResult.innerText = "YOUR TURN");
            
            computerHex.classList.add("hidden");
            playerHex.classList.remove("hidden");
        }, timeout + 2100)
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

function game() {

    while (score["player"] !== 5 && score["computer"] !== 5) {
        const computerSelection = getComputerChoice();
        const playerSelection = getPlayerChoice();

        if (playerSelection === null) {
            return;
        }

        const roundWinner = playRound(playerSelection, computerSelection);
        if (roundWinner) score[roundWinner]++;

        console.log("Score");
        console.table(score);
    }

    if (score["player"] === 5) {
        console.log("%c YOU WON!!!",
        "color: green; font-size: 25px;");

    } else {
        console.log("%c YOU LOSE!!",
        "color: red; font-size: 25px;");
    }
}