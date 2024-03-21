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
    
    // Define variables for score tracking
    let cafeAScore = 0;
    let cafeBScore = 0;
    let monthsLeft = parseInt(document.getElementById("months").value);

    

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

    // Function to generate random computer choice
    function generateComputerChoice() {
        const choices = ["advertise", "noAdvertise"];
        const randomIndex = Math.floor(Math.random() * choices.length);

        return choices[randomIndex];
    }

    // Function to handle user's choice
function handleUserChoice(choice) {
    const computerChoice = generateComputerChoice();
    calculateScore(choice, computerChoice);
    monthsLeft--;
    
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
        strategyRow.innerHTML = `
            <td>${cafeAScore}</td>
            <td>${cafeBScore}</td>
        `;
        strategyTable.appendChild(strategyRow);
        
        cafeAScore = 0;
        cafeBScore = 0;
        monthsLeft = parseInt(document.getElementById("months").value);
    
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
      
    });