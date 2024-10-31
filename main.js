const languages = [
    {
        language: "English US",
        lang: "en-US",
        wordsList: "./tongueTwisters.txt",
        pageTitle: "Tongue Twisters",
        btnStart: "Begin!",
    },
    {
        language: "English UK",
        lang: "en-UK",
        wordsList: "./tongueTwisters.txt",
        pageTitle: "Tongue Twisters",
        btnStart: "Begin!",
    },
    {
        language: "Português BR",
        lang: "pt-BR",
        wordsList: "./mafagafos.txt",
        pageTitle: "Trava Línguas",
        btnStart: "Começar!",
    },
];

const info = {
    index: 0,
    sentences: [],
    lang: "",
}

let speech, speechRec;

function preload() {
    speech = new p5.Speech();
}

function setup() {
    noCanvas();
    noLoop();
    
    setLanguage();
    setSpeech();

    document.getElementById("btnLanguage").onclick = changeLanguage;
    document.getElementById("btnRandom").onclick = newSentence;
    document.getElementById("btnPlay").onclick = playSentence;
    document.getElementById("btnRec").onclick = recSentence;
    document.getElementById("btnReset").onclick = resetSentence;
}

function setLanguage() {
    info.lang = languages[info.index].lang;
    document.getElementById("divControl").hidden = true;
    document.getElementById("divSentence").hidden = true;
    document.getElementById("divSpeech").hidden = true;
    document.getElementById("lblLanguage").innerText = "Language: " + languages[info.index].language;
    document.getElementById("btnLanguage").innerText = languages[(info.index + 1) % languages.length].language;
    document.getElementById("title").innerText = languages[info.index].pageTitle;
    document.getElementById("btnRandom").title = languages[info.index].btnStart;
        
    getData(languages[info.index].wordsList).then((frases) => {
        info.sentences = frases;
        document.getElementById("divControl").hidden = false;
    });
}

function setSpeech() {
    speech.setLang(info.lang);
    speechRec = new p5.SpeechRec(info.lang);
    speechRec.onResult = showSpeech;
}

async function getData(url) {
    const response = await fetch(url);
    const txt = await response.text();
    const data = txt.split("\n");
    for (let i = 0; i < data.length; i++) {
        data[i] = data[i].replace("\r", "");
        if (data[i].includes("(x3)")) {
            let sentence = data[i].replace("(x3)", "").trim();
            data[i] = sentence + "\n" + sentence + "\n" + sentence
        }
    }
    return data;
}

function changeLanguage() {
    if (++info.index == languages.length) info.index = info.index % languages.length;
    setLanguage();
    setSpeech();
}

function newSentence() {
    const sentence = getRandomSentence();
    console.log(sentence);
    document.getElementById("lblSentence").innerText = sentence;
    document.getElementById("divSentence").hidden = false;
}

function getRandomSentence() {
    const dice = Math.floor(Math.random() * info.sentences.length);
    return info.sentences[dice];
}

function playSentence() {
    const sentence = document.getElementById("lblSentence").innerText;
    console.log(sentence);
    speech.speak(sentence);
}

function recSentence() {
    speechRec.start();
}

function showSpeech() {
    const sentence = speechRec.resultString;
    document.getElementById("divSpeech").hidden = false;
    document.getElementById("txtResult").innerText = sentence;
    console.log(sentence);
}

function resetSentence() {
    setLanguage();
}