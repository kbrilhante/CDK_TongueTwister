let btnLanguage, language;
let btnRandom, btnPlay, btnRec, btnReset;
let speechRec, speech;

const animationClass = "fa-beat-fade";

const languages = [
    {
        'language': 'English',
        'url': './tongueTwisters.txt',
        'lang': 'en-US',
        'pageTitle': 'Tongue Twisters',
        'lstTongueTwisters': [],
    },
    {
        'language': 'Português',
        'url': './mafagafos.txt',
        'lang': 'pt-BR',
        'pageTitle': 'Trava Línguas',
        'lstTongueTwisters': [],
    }
]

function preload() {
    language = 0;
    btnLanguage = document.getElementById("btnLanguage");
    btnRandom = document.getElementById("btnRandom");
    btnPlay = document.getElementById("btnPlay");
    btnRec = document.getElementById("btnRec");
    btnReset = document.getElementById("btnReset");
    speech = new p5.Speech();
    for (let i = 0; i < languages.length; i++) {
        languages[i].lstTongueTwisters = loadStrings(languages[i].url);
    }
}

function setup() {
    noCanvas();
    noLoop();
    setLanguage();

    btnLanguage.addEventListener("click", changeLanguage);
    btnRandom.addEventListener("click", generate);
    btnPlay.addEventListener("click", speakSentence);
    btnRec.addEventListener("click", speechListen);
    btnReset.addEventListener("click", reset);

    speechRec.onResult = speechResult;
    speechRec.onStart = () => {
        activeOn(btnRec);
    };
    speechRec.onEnd = () => {
        activeOff(btnRec);
    };
    
    speech.onStart = () => {
        activeOn(btnPlay);
    };
    speech.onEnd = () => {
        activeOff(btnPlay);
    };
}

function generate() {
    let sentence = random(languages[language].lstTongueTwisters);
    const lblSentence = document.getElementById('lblSentence');
    if (sentence.includes("(x3)")) {
        sentence = sentence.replace(" (x3)", "");
        sentence += ";" + sentence + ";" + sentence;
    }
    if (sentence.includes(";")) {
        sentence = sentence.replaceAll(";", "<br>");
    }
    console.log(sentence);
    lblSentence.innerHTML = sentence;
    
    lblSentence.style.display = "block";
    btnRandom.style.display = "none";
    btnRec.style.display = "inline-block";
    btnPlay.style.display = "inline-block";
}

function speechListen() {
    speechRec.start();
}

function speechResult() {
    const result = speechRec.resultString;
    console.log(result);
    txtResult.textContent = result;
    output.style.display = "block";
    btnReset.style.display = "inline-block";
}

function speakSentence() {
    const sentence = document.getElementById('lblSentence').textContent;
    console.log(sentence);
    speech.speak(sentence);
}

function reset() {
    lblSentence.style.display = "none";
    output.style.display = "none";
    document.getElementsByClassName("controls").forEach(element => {
        element.style.display = "none";
    });
    btnRandom.style.display = "inline-block";
    lblSentence.innerHTML = "";
}

function activeOn(btn) {
    document.getElementsByClassName("controls").forEach(element => {
        element.disabled = true;
    });
    btn.classList.add(animationClass);
}

function activeOff(btn) {
    document.getElementsByClassName("controls").forEach(element => {
        element.disabled = false;
    });
    btn.classList.remove(animationClass);
}

function changeLanguage() {
    language == languages.length - 1 ? language = 0 : language++;
    setLanguage();
}

function setLanguage() {
    const lang = languages[language]
    document.getElementById('title').textContent = lang.pageTitle;
    btnLanguage.textContent = lang.language;
    speechRec = new p5.SpeechRec(lang.lang);
    speech.setLang(lang.lang);
}