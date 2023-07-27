let btnRandom, btnRec, lblSentence, txtResult, lstTongueTwisters;

function preload() {
    btnRandom = document.getElementById("btnRandom");
    btnRec = document.getElementById("btnRec");
    lblSentence = document.getElementById("lblSentence");
    txtResult = document.getElementById("txtResult");
    lstTongueTwisters = loadStrings("tongueTwisters.txt");
}

function setup() {
    noCanvas();
    noLoop();
    btnRandom.addEventListener("click", generate);
    btnRec.addEventListener("click", speechListen);
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
    
}