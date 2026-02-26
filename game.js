// Game Logic - Save answers and guess character

// Initialize game data structure
const gameQuestions = {
    'game.html': 'Is your character calm and intelligent?',
    'game2.html': 'Does your character kill enemies without touch?',
    'game3.html': 'Does your character cover their eyes?',
    'game4.html': 'Does your character have a strong sense of smell?',
    'game5.html': 'Is your character always bored during fights?',
    'game6.html': 'Is your character a food addict?',
    'game7.html': 'Is your character obsessed with training?',
    'game8.html': 'Is your character cheerful at the beginning but becomes dark?'
};

// Character database with decision paths
const characters = {
    // Saitama - calm, doesn't kill without touch, no special traits, BORED in fights
    'calm-nokill-noeyes-nosmell-bored-nofood-notraining-nodark': 'Saitama',
    
    // Gojo - calm, kills without touch, EYES COVERED (unique), intelligent
    'calm-kill-eyes-nosmell-nobored-nofood-notraining-nodark': 'Gojo',
    
    // Tanjiro - calm, intelligent, STRONG SENSE OF SMELL (unique), training
    'calm-nokill-noeyes-smell-nobored-nofood-training-nodark': 'Tanjiro',
    
    // Goku - calm, intelligent, no special eye traits, food addict, training
    'calm-nokill-noeyes-nosmell-nobored-food-training-nodark': 'Goku',
    
    // Naruto - calm, kill without touch (tailed beast), food addict, training, becomes dark
    'calm-nokill-noeyes-nosmell-nobored-food-training-dark': 'Naruto',
    
    // Light - calm, intelligent, kills without touch (notebook), becomes dark
    'calm-kill-noeyes-nosmell-nobored-nofood-notraining-dark': 'Light',
    
    // Eren - not calm, kills without touch (titan), dark, training
    'notcalm-nokill-noeyes-nosmell-nobored-nofood-training-dark': 'Eren',
    
    // Luffy - not calm, food addict, training, cheerful, no dark
    'notcalm-nokill-noeyes-nosmell-nobored-food-training-nodark': 'Luffy',
    
    // Ichigo - calm, intelligent, training, no special traits
    'calm-nokill-noeyes-nosmell-nobored-nofood-training-nodark': 'Ichigo'
};

// Save answer to local storage
function saveAnswer(question, answer) {
    let answers = JSON.parse(localStorage.getItem('gameAnswers')) || {};
    answers[question] = answer;
    localStorage.setItem('gameAnswers', JSON.stringify(answers));
}

// Get all answers
function getAnswers() {
    return JSON.parse(localStorage.getItem('gameAnswers')) || {};
}

// Clear all answers (for starting a new game)
function clearAnswers() {
    localStorage.removeItem('gameAnswers');
}

// Generate character guess based on answers
function guessCharacter() {
    const answers = getAnswers();
    
    // Questions in order
    const questions = [
        'Is your character calm and intelligent?',
        'Does your character kill enemies without touch?',
        'Does your character cover their eyes?',
        'Does your character have a strong sense of smell?',
        'Is your character always bored during fights?',
        'Is your character a food addict?',
        'Is your character obsessed with training?',
        'Is your character cheerful at the beginning but becomes dark?'
    ];
    
    // Build answer key from responses
    let answerKey = '';
    
    answerKey += answers[questions[0]] === 'YES' ? 'calm-' : 'notcalm-';
    answerKey += answers[questions[1]] === 'YES' ? 'kill-' : 'nokill-';
    answerKey += answers[questions[2]] === 'YES' ? 'eyes-' : 'noeyes-';
    answerKey += answers[questions[3]] === 'YES' ? 'smell-' : 'nosmell-';
    answerKey += answers[questions[4]] === 'YES' ? 'bored-' : 'nobored-';
    answerKey += answers[questions[5]] === 'YES' ? 'food-' : 'nofood-';
    answerKey += answers[questions[6]] === 'YES' ? 'training-' : 'notraining-';
    answerKey += answers[questions[7]] === 'YES' ? 'dark' : 'nodark';
    
    // Return guessed character or default message
    return characters[answerKey] || 'Mysterious Character';
}

// Display answers summary
function displayAnswersSummary() {
    const answers = getAnswers();
    let summary = '<h2>Your Answers:</h2><ul>';
    
    for (const [question, answer] of Object.entries(answers)) {
        summary += `<li><strong>${question}</strong><br>Answer: ${answer}</li>`;
    }
    
    summary += '</ul>';
    return summary;
}

// Add click handlers to YES/NO buttons
document.addEventListener('DOMContentLoaded', function() {
    const yesButtons = document.querySelectorAll('.answer-btn.yes');
    const noButtons = document.querySelectorAll('.answer-btn.no');
    
    yesButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            const questionText = document.querySelector('h1').textContent;
            saveAnswer(questionText, 'YES');
        });
    });
    
    noButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            const questionText = document.querySelector('h1').textContent;
            saveAnswer(questionText, 'NO');
        });
    });
});
