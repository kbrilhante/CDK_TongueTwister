let btnRandom, btnRec, btnReset, lblSentence, txtResult, output, lstTongueTwisters;
let speechRec;

function preload() {
    btnRandom = document.getElementById("btnRandom");
    btnRec = document.getElementById("btnRec");
    btnReset = document.getElementById("btnReset");
    lblSentence = document.getElementById("lblSentence");
    txtResult = document.getElementById("txtResult");
    output = document.getElementById("output");
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