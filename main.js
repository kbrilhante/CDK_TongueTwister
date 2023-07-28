let btnRandom, btnRec, lblSentence, txtResult, lstTongueTwisters;
let speechRec;

function preload() {
    btnRandom = document.getElementById("btnRandom");
    btnRec = document.getElementById("btnRec");
    lblSentence = document.getElementById("lblSentence");
    txtResult = document.getElementById("txtResult");
    lstTongueTwisters = loadStrings("tongueTwisters.txt");
    speechRec = new p5.SpeechRec("en-US");
}

function setup() {
    noCanvas();
    noLoop();
    btnRandom.addEventListener("click", generate);
    btnRec.addEventListener("click", speechListen);
    speechRec.onResult = speechResult;
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

    btnRandom.style.display = "none";
    btnRec.style.display = "inline-block";
}

function speechListen(a) {
    console.log(e);
}

function speechResult(e) {
    console.log(e);
}