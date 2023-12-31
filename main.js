let btnRandom, btnPlay, btnRec, btnReset, lblSentence, txtResult, output, lstTongueTwisters;
let speechRec, speechSynth;

const animationClass = "fa-beat-fade";

function preload() {
    btnRandom = document.getElementById("btnRandom");
    btnPlay = document.getElementById("btnPlay");
    btnRec = document.getElementById("btnRec");
    btnReset = document.getElementById("btnReset");
    lblSentence = document.getElementById("lblSentence");
    txtResult = document.getElementById("txtResult");
    output = document.getElementById("output");
    lstTongueTwisters = loadStrings("tongueTwisters.txt");
    speechRec = new p5.SpeechRec("en-US");
    // speechSynth = new p5.Speech("Google US English");
    speechSynth = new p5.Speech();
}

function setup() {
    noCanvas();
    noLoop();
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
    }
    
    speechSynth.setLang("en-US");
    speechSynth.onStart = () => {
        activeOn(btnPlay);
    };
    speechSynth.onEnd = () => {
        activeOff(btnPlay);
    };
}

function generate() {
    const i = floor(random(lstTongueTwisters.length));
    let sentence = lstTongueTwisters[i];
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
    const sentence = lblSentence.textContent;
    speechSynth.speak(sentence);
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