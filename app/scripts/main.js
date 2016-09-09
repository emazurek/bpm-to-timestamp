var stringTimestampToArray = function(str) {
  // 00:01:03:29 to [0,1,3,29]
  return(str.split(":").map(number => +number));
}

var timeArrayToFrames = function(arr) {
  // [0,1,3,29] to 3809
  var frames = arr[3];
  var seconds = arr[2];
  var minutes = arr[1];
  var hours = arr[0];
  return(frames + seconds * 60 + minutes * 60 * 60 + hours * 60 * 60 * 60);
}

var beatToTimestamp = function(bpm, beat, timeStart = [0,0,0,0]) {
  // convert timeStart to frames
  timeStart = timeArrayToFrames(timeStart);
  var frames = Math.floor(30 * 60 * beat / bpm) + timeStart;
  var seconds = Math.floor(frames / 30);
  var minutes = Math.floor(seconds / 60);
  var hours = Math.floor(minutes / 60);
  frames = frames % 30;
  seconds = seconds % 60;
  minutes = minutes % 60;
  hours = hours;
  return([hours,minutes,seconds,frames]);
}

var timestampArrayToText = function(timestamp) {
  return(timestamp.map(number => ("0" + number).slice(-2)).join(":"));
}

var dummyBPM = 70;
var dummyTimeStart = [0,0,0,0];
var howManyBeatsOut = 300;
var timeSignature = 4;
var isMeasure;

var outputList = function() {
  var textToOutput = "";
  for(var i = 0; i < howManyBeatsOut; i++) {
    isMeasure = !(i % timeSignature);
    if(isMeasure) {
      var measure = i / timeSignature;
      textToOutput += "Measure " + measure + " begins at " + 
        timestampArrayToText(beatToTimestamp(dummyBPM, i)) + "\n";
    }
  }
  return(textToOutput);
}

document.getElementById("submit").addEventListener("click", function(){
    document.getElementById("output").innerHTML = outputList().replace(/\n/gi, '<br/>');
});