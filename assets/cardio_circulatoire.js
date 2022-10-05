let score = 0;
let totQuestions = QuestionsCardio_circulatoire.length;
let currentQuestion = 0;
let container = document.getElementById('quizContainer');
let questionEl = document.getElementById('question');
let opt1 = document.getElementById('opt1');
let opt2 = document.getElementById('opt2');
let opt3 = document.getElementById('opt3');
let opt4 = document.getElementById('opt4');
// let opt5 = document.getElementById('opt5');
// let opt6 = document.getElementById('opt6');
let nextButton = document.getElementById('nextButton');
let validBtn = document.getElementById('valid-btn');
let resultCont = document.getElementById('result');
let scoreAffiche = document.getElementById('score');
let message = document.getElementById('message');
let messageIcon = document.getElementById('messageIcon')
let selectQuest = document.querySelectorAll('.selectQuest');
let selectedOption = document.getElementsByName('option');
let nbClick=0;
let nbClickMax=1;
let titre = document.getElementById('titre');

// Limite le nombre de click à 1 par question sur le btn valider
function compter(){
    nbClick++;
    if(nbClick>=nbClickMax)
    {
        validBtn.disabled=true;
    }
}

//Chargement du questionnaire
function loadQuestion (questionIndex) {
    let q = QuestionsCardio_circulatoire[questionIndex];
    titre.innerHTML = q.titre;
    scoreAffiche.innerHTML = "Score: " + score;
    questionEl.textContent = (questionIndex + 1) + '. ' + q.question;
    opt1.textContent = q.option1;
    opt2.textContent = q.option2;
    opt3.textContent = q.option3;
    opt4.textContent = q.option4;
    opt5.textContent = q.option5;
    opt6.textContent = q.option6;
}

// Ecoute sur le bouton valider avec en parametre la function de vérification réponse
validBtn.addEventListener('click', checkAnswer,)

// Vérification des réponses
    function checkAnswer() {

        //Pour la longueur des checkbox selectionnés je met dans resultat la valeur suivi d'une virgule
        let answer_tab = "";
        let resultat = "";
        for (let i = 0; i < selectedOption.length; i++) {
        if (selectedOption[i].checked) {
            resultat += selectedOption[i].value  + ", ";
        }
        }

    // Si aucunne réponse n'est séléctionné
    if(resultat == '' ){
        validBtn.disabled=false
        message.innerHTML = 'Selectionnez au moins une réponse';
        message.style.background ="gray";
        message.style.color ="white";
        return;
    }
    
    //Recupération des reponses dans le fichier questionnaire et comparaison avec resultat des checkbox
    answer_tab = "";
    for (let index = 0; index < QuestionsCardio_circulatoire[currentQuestion].answer.length; index++) {
        answer_tab += QuestionsCardio_circulatoire[currentQuestion].answer[index] + ", ";
    }

    // Si le resultat des reponses séléctionné est égale aux réponse du questionnaire
    if (answer_tab == resultat) {
        score ++;
        scoreAffiche.innerHTML = "Score: " + score;
        messageIcon.innerHTML = '<i class="fas fa-check" style= "color: green;" aria-hidden="true"></i> ';
        message.innerHTML = 'Bonne réponse';
        message.style.background ="green";
        message.style.color ="white";
    }
    // Sinon
    else{
        messageIcon.innerHTML = '<i class="fas fa-x" style= "color: red;" aria-hidden="true"></i> '
        message.innerHTML = 'Les réponses attendues étaient: ' + answer_tab  
        message.style.background ="red";
        message.style.color ="white";
    }
}

//Fonction question suivante
function loadNextQuestion () {
    validBtn.disabled=false
    messageIcon.innerHTML = "";
    message.innerHTML = "";
    message.style.background ="";

    //Remise a zero des checkbox avant le chargement de la question suivante
for (let i = 0; i < selectedOption.length; i++) {
    selectedOption[i].checked = false
}

// itération sur currentQuestion
currentQuestion++;

//Si question courante est égale a totQuestion moins la question courante, affichage bouton 'finir'
if (currentQuestion == totQuestions - 1) {
    nextButton.textContent = "Finir";
}

//Si currentQuestion == totalQuestions alors questionnaire fini, on affiche le score seulement
if (currentQuestion == totQuestions) {
    container.style.display = 'none';
    resultCont.style.display = '';
    if (score > totQuestions/2) {
        resultCont.style.backgroundColor ="green"
        resultCont.textContent = 'Bravo, votre Score est: ' + score+'/'+ totQuestions;
    }else{
        resultCont.style.backgroundColor ="orange"
        resultCont.textContent = 'Insuffisant, votre Score est: ' + score+'/'+ totQuestions;
    }
}

//Chargement question en cours
loadQuestion(currentQuestion);
}

//Chargement question en cours pour la premiere question
loadQuestion(currentQuestion);