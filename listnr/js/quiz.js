let shuffledQuestions = []; // Array to hold the fetched and shuffled questions
let questionNumber = 1; // Current question number
let playerScore = 0; // Player's score
let wrongAttempt = 0; // Count of wrong answers
let indexNumber = 0; // Index for accessing the shuffled questions array

// Function to fetch questions from getQuestions.php based on selected difficulty
function fetchQuestions(difficulty) {
    fetch(`getQuestions.php?difficulty=${difficulty}`)
        .then(response => {
            console.log('Response:', response);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Fetched Data:', data);
            if (Array.isArray(data) && data.length > 0) {
                shuffledQuestions = shuffleArray(data); // Shuffle questions for randomness
                displayNextQuestion(); // Display the first question
            } else {
                console.error('No questions found for the selected difficulty:', data);
                alert('No questions available for the selected difficulty. Please try another level.');
            }
        })
        //.catch(error => console.error('Error fetching questions:', error));
}

// Function to shuffle an array (Fisher-Yates Shuffle)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Function to display the next question
function displayNextQuestion() {

    const currentQuestion = shuffledQuestions[indexNumber];
    console.log("Current Question", currentQuestion);

    if (currentQuestion) {
        document.getElementById("question-number").innerHTML = questionNumber;
        document.getElementById("player-score").innerHTML = playerScore;
        document.getElementById("display-question").innerHTML = currentQuestion.question_text;
        document.getElementById("option-one-label").innerHTML = currentQuestion.option_a;
        document.getElementById("option-two-label").innerHTML = currentQuestion.option_b;
        document.getElementById("option-three-label").innerHTML = currentQuestion.option_c;
        document.getElementById("option-four-label").innerHTML = currentQuestion.option_d;
        //questionNumber++;
        //readText(currentQuestion.question_text);
        if(indexNumber > 0){
            //questionNumber++;
        }
        //indexNumber++;

        const readButton = document.getElementById("read-question-btn");
        readButton.onclick = function() {
            readText(currentQuestion.question_text); // Read the question aloud
        };
        const nextQuestionButton = document.getElementById("nextQuestionButton");
        nextQuestionButton.onclick = function() {
            checkForAnswer(currentQuestion.correct_Option);
        };
    } else {
        handleEndGame(); // End game if there are no more questions
    }
    
}
// Function to read text using the SpeechSynthesis API
function readText(text) {
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text); // Create a new utterance for the text
        utterance.lang = 'en-US'; // Set language (you can change this to another language if needed)
        speechSynthesis.speak(utterance); // Speak the text
    } else {
        alert("Sorry, your browser does not support text-to-speech.");
    }
}

// Function to start the quiz
function startQuiz() {
    const difficultySelect = document.getElementById("quiz-select");
    const selectedDifficulty = difficultySelect.value; // Get the selected difficulty
    displayLessonRecommendation(selectedDifficulty);
    fetchQuestions(selectedDifficulty); // Fetch questions for the selected difficulty
}

function displayLessonRecommendation(difficulty) {
    const lessonLabel = document.getElementById("lesson-label"); // Get the element to display the lesson label
    
    switch(difficulty) {
        case "q1":  // Beginner level
            lessonLabel.innerHTML = "Introductory Lesson: Focus on basic concepts.";
            break;
        case "q2":  // Intermediate level
            lessonLabel.innerHTML = "Intermediate Lesson: Explore more challenging concepts.";
            break;
        case "q3":  // Advanced level
            lessonLabel.innerHTML = "Advanced Lesson: Master complex and advanced topics.";
            break;
        default:
            lessonLabel.innerHTML = "Select a difficulty level to see the lesson recommendation.";
    }
}

// Function to check the selected answer
function checkForAnswer(correct_answer) {
    //const currentQuestion = shuffledQuestions[indexNumber];
    //const currentQuestionAnswer = currentQuestion.correct_option; // Correct answer (A, B, C, D)
    //const options = document.getElementsByName("option");
    var entered_Value = null;
    if (document.getElementById('option-one').checked) {
        entered_Value = document.getElementById('option-one-label').textContent;
      }
    else if (document.getElementById('answer2').checked) {
        entered_Value = document.getElementById('option-two-label').textContent;
      }
    else if (document.getElementById('answer3').checked) {
        entered_Value = document.getElementById('option-three-label').textContent;
      }
    else if (document.getElementById('answer4').checked) {
        entered_Value = document.getElementById('option-four-label').textContent;
      }
    console.log("currentQuesetionAnswer", correct_answer);
    console.log("entered_Value",entered_Value);
    if(correct_answer == entered_Value){
        playerScore++;
    }
    else{
        wrongAttempt++;
    }

    indexNumber++; // Move to the next question
    setTimeout(() => {
        questionNumber++;  // Increment the question number
        resetOptionBackground();  // Reset the background of options
        displayNextQuestion();  // Display the next question
    }, 1000);
}

// Function to reset option backgrounds
function resetOptionBackground() {
    const options = document.querySelectorAll('.option');
    options.forEach(option => {
        option.style.backgroundColor = '';
    });
}

// Function to handle the end of the game
function handleEndGame() {
    let remark = null;
    let remarkColor = null;

    if (playerScore <= 2) {
        remark = "Keep on studying!";
        remarkColor = "red";
    } else if (playerScore >= 3 && playerScore < 5) {
        remark = "Not bad but you can do better!";
        remarkColor = "orange";
    } else if (playerScore == 5) {
        remark = "Excellent, You are ready to move on to the next lesson.";
        remarkColor = "green";
    }

    const playerGrade = (playerScore / shuffledQuestions.length) * 100;

    document.getElementById('remarks').innerHTML = remark;
    document.getElementById('remarks').style.color = remarkColor;
    document.getElementById('grade-percentage').innerHTML = playerGrade.toFixed(2);
    document.getElementById('wrong-answers').innerHTML = wrongAttempt;
    document.getElementById('right-answers').innerHTML = playerScore;
    document.getElementById('score-modal').style.display = "flex";
    
    // Save the current attempt data
    saveAttempt(playerScore, playerGrade, remark, remarkColor);
}

// Function to save the current attempt
function saveAttempt(score, grade, remark, remarkColor) {
    // Create an attempt object
    const attempt = {
        score: score,
        grade: grade,
        remark: remark,
        remarkColor: remarkColor,
        date: new Date().toLocaleString()  // Store the date of the attempt
    };
     // Get the past attempts from local storage
     let pastAttempts = JSON.parse(localStorage.getItem('pastAttempts')) || [];

     // Add the new attempt to the beginning of the array
     pastAttempts.unshift(attempt);
 
     // Store the updated array back into local storage
     localStorage.setItem('pastAttempts', JSON.stringify(pastAttempts));
 
     // Display the past attempts
     displayPastAttempts();
 }
// Function to display the past attempts from local storage
function displayPastAttempts() {
    const attemptsList = document.getElementById('attempts-list');
    
    // Clear previous attempts in the list
    attemptsList.innerHTML = '';

    // Get the past attempts from local storage
    const pastAttempts = JSON.parse(localStorage.getItem('pastAttempts')) || [];

    // Loop through the past attempts and add them to the list
    pastAttempts.forEach((attempt, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <strong>Attempt #${index + 1} (Date: ${attempt.date})</strong><br>
            Score: ${attempt.score} / ${shuffledQuestions.length} | Grade: ${attempt.grade}%<br>
            Remark: <span style="color: ${attempt.remarkColor}">${attempt.remark}</span>
        `;
        attemptsList.appendChild(listItem);
    });
}
// Function to close the score modal and restart the quiz
function closeScoreModal() {
    questionNumber = 1;
    playerScore = 0;
    wrongAttempt = 0;
    indexNumber = 0;
    shuffledQuestions = [];
    document.getElementById('score-modal').style.display = "none";
}

// Function to close the warning modal
function closeOptionModal() {
    document.getElementById('option-modal').style.display = "none";
}

// Event listener for the Start Quiz button
document.querySelector('.start-quiz button').addEventListener('click', startQuiz);
