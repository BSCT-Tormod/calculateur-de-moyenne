class Note {
    constructor(note, scale, coef, subject){
        this.note = note;
        this.scale = scale;
        this.coef = coef;
        this.subject = subject;
        this.noteScaled = this.scaleNote();
    }

    scaleNote(){
        var scaleCoef = this.scale/20;
        return this.note / scaleCoef;
    }

    getNote() {
        return this.note;
    }

    setNote(note) {
        this.note = note;
        this.noteScaled = this.scaleNote();
    }

    getScale() {
        return this.scale;
    }

    setScale(scale) {
        this.scale = scale;
        this.noteScaled = this.scaleNote();
    }

    getCoef() {
        return this.coef;
    }

    setCoef(coef) {
        this.coef = coef;
    }

    getSubject() {
        return this.subject;
    }

    setSubject(subject) {
        this.subject = subject;
    }
}

class Average {
    constructor(notes){
        this.notes = notes;
    }

    getNotes() {
        return this.notes;
    }

    setNotes(notes) {
        this.notes = notes;
    }

    addNote (note){
        console.log(this.notes)
        this.notes.push(note);
    }

    getAverage(){
        console.log("Calcul de la moyenne :");
        var sum = 0;
        var coefSum = 0;
        for (var i = 0; i < this.notes.length; i++) {
            sum += this.notes[i].noteScaled * this.notes[i].coef;
            coefSum += this.notes[i].coef;
            console.log(i+" - Note " + this.notes[i].getNote() + " / " + this.notes[i].getScale() + " coef " + this.notes[i].getCoef() + " matière " + this.notes[i].getSubject());
        }
        return sum/coefSum;
    }

}

var notes = [];
var average = new Average(notes);

if (getCookie("notes") != null) {
    var storedNotes = JSON.parse(getCookie("notes"));
    for (var i = 0; i < storedNotes.length; i++) {
        var note = new Note(storedNotes[i].note, storedNotes[i].scale, storedNotes[i].coef, storedNotes[i].subject);
        console.log(note);
        average.addNote(note);
        notes.push(note); // Ajoutez la nouvelle note à la liste principale si nécessaire
    }
    displayAverage();
}


function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(name + '=')) {
            return cookie.substring(name.length + 1);
        }
    }
    return null;
}


function newNote(){
    if(!verifyForm()){
        return false;
    }
    var pNote = parseFloat(document.getElementById("note-value").value);
    var pScale = parseFloat(document.getElementById("note-scale").value);
    var pCoef = parseFloat(document.getElementById("note-coef").value);
    var pSubject = document.getElementById("note-subject").value;

    var note = new Note (pNote, pScale, pCoef, pSubject);
    notes.push(note);
    displayAverage();
    document.cookie = "notes="+JSON.stringify(notes);
}

function verifyForm(){
    var pNote = document.getElementById("note-value").value;
    var pScale = document.getElementById("note-scale").value;
    var pCoef = document.getElementById("note-coef").value;

    if(pNote == "" || pScale == "" || pCoef == ""){
        alert("Remplissez tous les champs");
        return false;
    }

    pNote = parseFloat(pNote);
    pScale = parseFloat(pScale);
    pCoef = parseFloat(pCoef);

    if(pNote > pScale){
        alert("La note "+pNote+" ne peut pas être supérieure au barème "+pScale);
        return false;
    }

    if(pNote < 0 || pScale < 0 || pCoef <= 0){
        alert("Les valeurs ne peuvent pas être négatives");
        return false;
    }

    return true;
}

function displayAverage(){
    let result = average.getAverage().toFixed(2);
    document.getElementById("average-value").innerHTML =  result.split(".")[0];
    document.getElementById("average-decimal").innerHTML =  "."+result.split(".")[1];
}

function reset(){
    notes = [];
    average.setNotes(notes);
    document.cookie = "notes=, expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.getElementById("average-value").innerHTML =  "0";
    document.getElementById("average-decimal").innerHTML = ".00";
}