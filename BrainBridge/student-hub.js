document.addEventListener('DOMContentLoaded', function() {
    // Goal Setting Functionality
    const goalModal = new bootstrap.Modal(document.getElementById('goalModal'));
    const setGoalBtn = document.getElementById('setGoalBtn');
    const saveGoalBtn = document.getElementById('saveGoalBtn');
    const goalInput = document.getElementById('goalInput');
    const dailyGoalText = document.getElementById('dailyGoalText');
    const goalProgress = document.getElementById('goalProgress');
    const markCompleteBtn = document.getElementById('markCompleteBtn');
    
    let goalProgressValue = 25;
    
    setGoalBtn.addEventListener('click', function() {
        goalModal.show();
    });
    
    saveGoalBtn.addEventListener('click', function() {
        if (goalInput.value.trim() !== '') {
            dailyGoalText.textContent = goalInput.value;
            goalProgressValue = 0;
            updateProgressBar();
            goalModal.hide();
            goalInput.value = '';
            
            // Show success message
            showAlert('Goal set successfully!', 'success');
        }
    });
    
    markCompleteBtn.addEventListener('click', function() {
        goalProgressValue = 100;
        updateProgressBar();
        showAlert('Goal completed! Streak extended.', 'success');
        
        // In a real app, you would update the streak counter here
    });
    
    function updateProgressBar() {
        goalProgress.style.width = `${goalProgressValue}%`;
        goalProgress.setAttribute('aria-valuenow', goalProgressValue);
        goalProgress.textContent = `${goalProgressValue}%`;
        
        // Change color based on progress
        if (goalProgressValue < 30) {
            goalProgress.classList.remove('bg-success', 'bg-warning');
            goalProgress.classList.add('bg-danger');
        } else if (goalProgressValue < 70) {
            goalProgress.classList.remove('bg-danger', 'bg-success');
            goalProgress.classList.add('bg-warning');
        } else {
            goalProgress.classList.remove('bg-danger', 'bg-warning');
            goalProgress.classList.add('bg-success');
        }
    }
    
    // Skill Assessment Functionality
    const quizModal = new bootstrap.Modal(document.getElementById('quizModal'));
    const startAssessmentBtn = document.getElementById('startAssessmentBtn');
    const subjectCards = document.querySelectorAll('.subject-card');
    const quizSubjectTitle = document.getElementById('quizSubjectTitle');
    const startQuizBtn = document.getElementById('startQuizBtn');
    const quizIntro = document.querySelector('.quiz-intro');
    const quizQuestions = document.querySelector('.quiz-questions');
    const quizResults = document.querySelector('.quiz-results');
    const nextQuestionBtn = document.getElementById('nextQuestionBtn');
    const prevQuestionBtn = document.getElementById('prevQuestionBtn');
    const quizProgress = document.getElementById('quizProgress');
    
    let currentSubject = '';
    let currentQuestion = 0;
    
    // Sample questions for each subject
    const questions = {
        math: [
            {
                question: "What is the value of π (pi) rounded to two decimal places?",
                options: ["3.14", "3.16", "3.18", "3.12"],
                answer: 0
            },
            {
                question: "What is 5² + 12?",
                options: ["27", "37", "17", "47"],
                answer: 1
            }
        ],
        science: [
            {
                question: "What is the chemical symbol for gold?",
                options: ["Go", "Gd", "Au", "Ag"],
                answer: 2
            }
        ],
        english: [
            {
                question: "Which of these is a preposition?",
                options: ["Run", "Beautiful", "Under", "Quickly"],
                answer: 2
            }
        ],
        history: [
            {
                question: "In which year did World War II end?",
                options: ["1943", "1945", "1947", "1950"],
                answer: 1
            }
        ]
    };
    
    // Subject card click handler
    subjectCards.forEach(card => {
        card.addEventListener('click', function() {
            currentSubject = this.dataset.subject;
            const subjectName = this.querySelector('span').textContent;
            quizSubjectTitle.textContent = `${subjectName} Assessment`;
            quizModal.show();
        });
    });
    
    // Start quiz button
    startQuizBtn.addEventListener('click', function() {
        quizIntro.classList.add('d-none');
        quizQuestions.classList.remove('d-none');
        loadQuestion();
    });
    
    // Next question button
    nextQuestionBtn.addEventListener('click', function() {
        // Validate answer (in a real app, you would track answers)
        currentQuestion++;
        
        if (currentQuestion < questions[currentSubject].length) {
            loadQuestion();
        } else {
            // Quiz complete
            quizQuestions.classList.add('d-none');
            quizResults.classList.remove('d-none');
        }
    });
    
    // Previous question button
    prevQuestionBtn.addEventListener('click', function() {
        currentQuestion--;
        loadQuestion();
    });
    
    function loadQuestion() {
        const question = questions[currentSubject][currentQuestion];
        document.querySelector('.question-text').textContent = question.question;
        
        const optionsContainer = document.querySelector('.options-container');
        optionsContainer.innerHTML = '';
        
        question.options.forEach((option, index) => {
            const optionId = `option${currentQuestion}${index}`;
            const optionElement = document.createElement('div');
            optionElement.className = 'form-check mb-2';
            optionElement.innerHTML = `
                <input class="form-check-input" type="radio" name="quizOption" id="${optionId}">
                <label class="form-check-label" for="${optionId}">${option}</label>
            `;
            optionsContainer.appendChild(optionElement);
        });
        
        // Update progress
        const progress = ((currentQuestion + 1) / questions[currentSubject].length) * 100;
        quizProgress.style.width = `${progress}%`;
        
        // Update button states
        prevQuestionBtn.disabled = currentQuestion === 0;
        nextQuestionBtn.textContent = currentQuestion === questions[currentSubject].length - 1 ? 'Finish' : 'Next';
    }
    
    // Helper function to show alerts
    function showAlert(message, type) {
        const alert = document.createElement('div');
        alert.className = `alert alert-${type} alert-dismissible fade show`;
        alert.role = 'alert';
        alert.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        `;
        
        const container = document.querySelector('.dashboard-section');
        container.prepend(alert);
        
        setTimeout(() => {
            alert.classList.remove('show');
            setTimeout(() => alert.remove(), 150);
        }, 3000);
    }
});