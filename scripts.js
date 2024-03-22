    // Define variables for score tracking
    let cafeAScore = 0;
    let cafeBScore = 0;
    let monthsLeft = parseInt(document.getElementById("months").value);
    let userChoiceList = [];


// Select the strategy buttons
const titForTatButton = document.getElementById("tit-for-tat");
const alwaysAdvertiseButton = document.getElementById("always-advertise");
const neverAdvertiseButton = document.getElementById("never-advertise");
const randomButton = document.getElementById("random");

// Define functions for different computer choice generators
function generateRandomChoice() {
    const choices = ["advertise", "noAdvertise"];
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

function generateTitForTatChoice() {
    // Implement Tit-for-Tat strategy logic here
    if (userChoiceList.length===0){
        return generateRandomChoice()
    }
    return userChoiceList[userChoiceList.length-1];
}

function generateAlwaysAdvertiseChoice() {
    return "advertise";
    // Implement Always Advertise strategy logic here
}

function generateNeverAdvertiseChoice() {
    return "noAdvertise";
    // Implement Never Advertise strategy logic here
}

// Set the default generator to random
let computerChoiceGenerator = generateRandomChoice;
let strategy_name = 'random';

// Function to handle user's strategy selection
function handleStrategySelection(strategy) {
    // Remove box-shadow from all strategy buttons
    titForTatButton.style.boxShadow = "none";
    alwaysAdvertiseButton.style.boxShadow = "none";
    neverAdvertiseButton.style.boxShadow = "none";
    randomButton.style.boxShadow = "none";

    // Apply box-shadow to the clicked strategy button
    strategy.style.boxShadow = "-1px -2px 2px lightyellow"; // Example: green box-shadow
    
    strategy_name = strategy.id
    // Set the computer's choice generator based on the selected strategy
    switch (strategy.id) {
        case "tit-for-tat":
            computerChoiceGenerator = generateTitForTatChoice;
            break;
        case "always-advertise":
            computerChoiceGenerator = generateAlwaysAdvertiseChoice;
            break;
        case "never-advertise":
            computerChoiceGenerator = generateNeverAdvertiseChoice;
            break;
        case "random":
        default:
            computerChoiceGenerator = generateRandomChoice;
            break;
    }
    cafeAScore = 0;
        cafeBScore = 0;
        monthsLeft = parseInt(document.getElementById("months").value);
        userChoiceList = [];
}




// Add event listeners to strategy buttons
titForTatButton.addEventListener("click", function() {
    handleStrategySelection(titForTatButton);
});

alwaysAdvertiseButton.addEventListener("click", function() {
    handleStrategySelection(alwaysAdvertiseButton);
});

neverAdvertiseButton.addEventListener("click", function() {
    handleStrategySelection(neverAdvertiseButton);
});

randomButton.addEventListener("click", function() {
    handleStrategySelection(randomButton);
});

    
    
    
    // Select elements
    const computerAdvertiseButton = document.getElementById("computerAdvertise");
    const computerNoAdvertiseButton = document.getElementById("computerNoAdvertise");
    const userAdvertiseButton = document.getElementById("userAdvertise");
    const userNoAdvertiseButton = document.getElementById("userNoAdvertise");
    const monthsForm = document.querySelector(".month-form");
    const cafeAScoreElement = document.getElementById("cafeAScore");
    const cafeBScoreElement = document.getElementById("cafeBScore");
    const strategyTable = document.querySelector(".score-table");
    const barA = document.querySelector(".scoreBarA");
    const barB = document.querySelector(".scoreBarB");
    

    // Function to update score
    function updateScore() {
        cafeAScoreElement.textContent = cafeAScore;
        cafeBScoreElement.textContent = cafeBScore;
    }

    function updateBar(){
        barA.style.height = cafeAScore/10 + 'px';
        barB.style.height = cafeBScore/10 + 'px';
    }

    // Function to calculate scores based on user and computer choices
    function calculateScore(userChoice, computerChoice) {
        if (userChoice === "advertise" && computerChoice === "advertise") {
            cafeAScore += 70;
            cafeBScore += 70;
        } else if (userChoice === "advertise" && computerChoice === "noAdvertise") {
            cafeAScore += 150;
            cafeBScore += 50;
        } else if (userChoice === "noAdvertise" && computerChoice === "advertise") {
            cafeAScore += 50;
            cafeBScore += 150;
        } else if (userChoice === "noAdvertise" && computerChoice === "noAdvertise") {
            cafeAScore += 100;
            cafeBScore += 100;
        }
        updateScore();
        updateBar();
    }



    // Function to handle user's choice
function handleUserChoice(choice) {
    const computerChoice = computerChoiceGenerator();
    calculateScore(choice, computerChoice);
    monthsLeft--;

    userChoiceList.push(choice);
    
    
    // Add visual feedback for user's choice
    if (choice === "advertise") {
        userAdvertiseButton.classList.add("chosen");
        userNoAdvertiseButton.classList.remove("chosen");
    } else {
        userNoAdvertiseButton.classList.add("chosen");
        userAdvertiseButton.classList.remove("chosen");
    }

    // Add visual feedback for computer's choice
    if (computerChoice === "advertise") {
        computerAdvertiseButton.classList.add("chosen");
        computerNoAdvertiseButton.classList.remove("chosen");
    } else {
        computerNoAdvertiseButton.classList.add("chosen");
        computerAdvertiseButton.classList.remove("chosen");
    }

    if (monthsLeft === 0) {
        // Update the score table
        const strategyRow = document.createElement("tr");
    
        // Create a new table heading element for the current computer strategy
        const strategyHeading = document.createElement("th");
        // Set the text content of the heading to the current computer strategy
        strategyHeading.textContent = strategy_name;
    
        // Append the strategy heading to the first row of the score table
        strategyRow.appendChild(strategyHeading);
    
        // Create table data elements for Cafe A and Cafe B scores
        const cafeAScoreCell = document.createElement("td");
        const cafeBScoreCell = document.createElement("td");
    
        // Set text content for Cafe A and Cafe B scores
        cafeAScoreCell.textContent = cafeAScore;
        cafeBScoreCell.textContent = cafeBScore;
    
        // Append table data elements to the strategy row
        strategyRow.appendChild(cafeAScoreCell);
        strategyRow.appendChild(cafeBScoreCell);
    
        // Append the strategy row to the score table
        strategyTable.appendChild(strategyRow);
    
        // Reset scores and monthsLeft for the next round
        cafeAScore = 0;
        cafeBScore = 0;
        monthsLeft = parseInt(document.getElementById("months").value);
        userChoiceList = [];
    }
    
}
    // Add event listeners

    userAdvertiseButton.addEventListener("click", function() {
        handleUserChoice("advertise");
    });
    
    userNoAdvertiseButton.addEventListener("click", function() {
        handleUserChoice("noAdvertise");
    });


    
    monthsForm.addEventListener("submit", function(event) {
        event.preventDefault();
        monthsLeft = parseInt(document.getElementById("months").value);
        cafeAScore = 0;
        cafeBScore = 0;
        userChoiceList = [];
      
    });