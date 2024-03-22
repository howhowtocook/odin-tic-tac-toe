class ScoreTracker {
    constructor() {
        // Define variables for score tracking
        this.cafeAScore = 0;
        this.cafeBScore = 0;
        this.monthsLeft = 0;
        this.userChoiceList = [];
        
        // Select elements
        this.userAdvertiseButton = document.getElementById("userAdvertise");
        this.userNoAdvertiseButton = document.getElementById("userNoAdvertise");
        this.cafeAScoreElement = document.getElementById("cafeAScore");
        this.cafeBScoreElement = document.getElementById("cafeBScore");
        this.barA = document.querySelector(".scoreBarA");
        this.barB = document.querySelector(".scoreBarB");

        // Update initial score
        this.updateScore();
        this.updateBar();

        // Add event listeners for user's choice
        this.userAdvertiseButton.addEventListener("click", () => this.handleUserChoice("advertise"));
        this.userNoAdvertiseButton.addEventListener("click", () => this.handleUserChoice("noAdvertise"));
    }

    updateScore() {
        // Update score display
        this.cafeAScoreElement.textContent = this.cafeAScore;
        this.cafeBScoreElement.textContent = this.cafeBScore;
    }

    updateBar() {
        // Update score bars
        this.barA.style.height = this.cafeAScore / 10 + 'px';
        this.barB.style.height = this.cafeBScore / 10 + 'px';
    }

    calculateScore(userChoice, computerChoice) {
        if (userChoice === "advertise" && computerChoice === "advertise") {
            this.cafeAScore += 70;
            this.cafeBScore += 70;
        } else if (userChoice === "advertise" && computerChoice === "noAdvertise") {
            this.cafeAScore += 150;
            this.cafeBScore += 50;
        } else if (userChoice === "noAdvertise" && computerChoice === "advertise") {
            this.cafeAScore += 50;
            this.cafeBScore += 150;
        } else if (userChoice === "noAdvertise" && computerChoice === "noAdvertise") {
            this.cafeAScore += 100;
            this.cafeBScore += 100;
        }
        this.updateScore();
        this.updateBar();
    }

    handleUserChoice(choice) {
        const computerChoice = strategySelector.getComputerChoice();
        this.calculateScore(choice, computerChoice);
        this.monthsLeft--;

        this.userChoiceList.push(choice);

        // Add visual feedback for user's choice
        if (choice === "advertise") {
            this.userAdvertiseButton.classList.add("chosen");
            this.userNoAdvertiseButton.classList.remove("chosen");
        } else {
            this.userNoAdvertiseButton.classList.add("chosen");
            this.userAdvertiseButton.classList.remove("chosen");
        }

        // Add visual feedback for computer's choice
        if (computerChoice === "advertise") {
            computerAdvertiseButton.classList.add("chosen");
            computerNoAdvertiseButton.classList.remove("chosen");
        } else {
            computerNoAdvertiseButton.classList.add("chosen");
            computerAdvertiseButton.classList.remove("chosen");
        }

        if (this.monthsLeft === 0) {
            // Update the score table
            const strategyRow = document.createElement("tr");
            const strategyHeading = document.createElement("th");
            strategyHeading.textContent = strategySelector.strategy_name;
            strategyRow.appendChild(strategyHeading);

            const cafeAScoreCell = document.createElement("td");
            const cafeBScoreCell = document.createElement("td");
            cafeAScoreCell.textContent = this.cafeAScore;
            cafeBScoreCell.textContent = this.cafeBScore;
            strategyRow.appendChild(cafeAScoreCell);
            strategyRow.appendChild(cafeBScoreCell);

            strategyTable.appendChild(strategyRow);

            // Reset scores and monthsLeft for the next round
            this.cafeAScore = 0;
            this.cafeBScore = 0;
            this.monthsLeft = parseInt(document.getElementById("months").value);
            this.userChoiceList = [];
        }
    }
}



class StrategySelector {
    constructor() {
        this.strategyButtons = {
            "tit-for-tat": this.generateTitForTatChoice,
            "always-advertise": this.generateAlwaysAdvertiseChoice,
            "never-advertise": this.generateNeverAdvertiseChoice,
            "random": this.generateRandomChoice
        };
        this.setDefaultStrategy();
        this.addEventListeners();
    }

    setDefaultStrategy() {
        this.strategy_name = 'random';
        this.strategyButton = randomButton;
        this.strategyButton.style.boxShadow = "-1px -2px 2px lightyellow";
        this.computerChoiceGenerator = this.strategyButtons.random;
    }

    addEventListeners() {
        titForTatButton.addEventListener("click", () => this.handleStrategySelection(titForTatButton));
        alwaysAdvertiseButton.addEventListener("click", () => this.handleStrategySelection(alwaysAdvertiseButton));
        neverAdvertiseButton.addEventListener("click", () => this.handleStrategySelection(neverAdvertiseButton));
        randomButton.addEventListener("click", () => this.handleStrategySelection(randomButton));
    }

    handleStrategySelection(strategyButton) {
        this.removeBoxShadowFromAllButtons();
        strategyButton.style.boxShadow = "-1px -2px 2px lightyellow";
        this.strategy_name = strategyButton.id;
        this.strategyButton = strategyButton;
        this.computerChoiceGenerator = this.strategyButtons[strategyButton.id];
    }

    removeBoxShadowFromAllButtons() {
        titForTatButton.style.boxShadow = "none";
        alwaysAdvertiseButton.style.boxShadow = "none";
        neverAdvertiseButton.style.boxShadow = "none";
        randomButton.style.boxShadow = "none";
    }

    generateRandomChoice() {
        const choices = ["advertise", "noAdvertise"];
        const randomIndex = Math.floor(Math.random() * choices.length);
        return choices[randomIndex];
    }

    generateTitForTatChoice() {
        if (this.scoreTracker.userChoiceList.length === 0) {
            return this.generateRandomChoice();
        }
        return this.scoreTracker.userChoiceList[this.scoreTracker.userChoiceList.length - 1];
    }

    generateAlwaysAdvertiseChoice() {
        return "advertise";
    }

    generateNeverAdvertiseChoice() {
        return "noAdvertise";
    }
}

// Initialize strategy selector
const strategySelector = new StrategySelector();

// Initialize score tracker
const scoreTracker = new ScoreTracker();



// Add event listeners for user's choice
userAdvertiseButton.addEventListener("click", () => scoreTracker.handleUserChoice("advertise"));
userNoAdvertiseButton.addEventListener("click", () => scoreTracker.handleUserChoice("noAdvertise"));

// Add event listener for months form submission
monthsForm.addEventListener("submit", function(event) {
    event.preventDefault();
    scoreTracker.resetScores();
});
