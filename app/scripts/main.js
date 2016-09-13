var dummyTimeStart = [0,0,0,0];
var howManyBeatsOut = 300;
var timeSignature = 4;
var isMeasure;

var BpmTimestamp = function(inputObj) {
  this.inputObj = inputObj;
}

BpmTimestamp.prototype = {
  stringTimestampToArray: function(str) {
    // 00:01:03:29 to [0,1,3,29]
    return(str.split(':').map(number => +number));
  },

  timestampArrayToText: function(timestamp) {
    return(timestamp.map(number => ('0' + number).slice(-2)).join(':'));
  },

  timeArrayToFrames: function(arr) {
    // [0,1,3,29] to 3809
    var frames = arr[3];
    var seconds = arr[2];
    var minutes = arr[1];
    var hours = arr[0];
    return(frames + seconds * 60 + minutes * 60 * 60 + hours * 60 * 60 * 60);
  },

  beatToTimestamp: function(bpm, beat, timeStartArr = [0,0,0,0]) {
    // convert timeStart to frames
    var timeStart = this.timeArrayToFrames(timeStartArr);
    var frames = Math.floor(30 * 60 * beat / bpm) + timeStart;
    var seconds = Math.floor(frames / 30);
    var minutes = Math.floor(seconds / 60);
    var hours = Math.floor(minutes / 60);
    frames = frames % 30;
    seconds = seconds % 60;
    minutes = minutes % 60;
    hours = hours;
    return([hours,minutes,seconds,frames]);
  },

  makeTimestampsObj: function(bpm, howManyBeatsOut, timeSignature) {
    var timestampsOutputObj = {measures: {}};
    for(var i = 0; i < howManyBeatsOut; i++) {
      isMeasure = !(i % timeSignature);
      if(isMeasure) {
        var measure = i / timeSignature;
        timestampsOutputObj.measures[measure] = {timestamp: this.beatToTimestamp(bpm, i)};
      }
    }
    return(timestampsOutputObj);
  },

  outputListToHTML: function(timestampsOutputObj, lineBreaksArr) {
    var output = '';
    var lineBreaksIndex = 0;
    var nLinesBeforeBreak = lineBreaksArr[0];
    var breakCounter = 0;
    for(var measure in timestampsOutputObj.measures) {
      if(breakCounter == nLinesBeforeBreak) {
        output += '<br/>';
        lineBreaksIndex = lineBreaksArr[lineBreaksIndex + 1] !== undefined ? lineBreaksIndex + 1 : 0;
        breakCounter = 0;
        nLinesBeforeBreak = lineBreaksArr[lineBreaksIndex];
      }
      breakCounter++;
      output += '<div class="measure-no">' + (+measure+1) + '</div>' + 
        '<div class="timestamp">' + this.timestampArrayToText(timestampsOutputObj.measures[measure].timestamp) + '</div><br/>';
    }
    return(output);
  }
}

document.getElementById('submit').addEventListener('click', function(){
  var instance = new BpmTimestamp();
  var bpm = document.getElementById('bpm').value;
  //var beatsPerMeasure = document.getElementById('beats-per-measure').value;
  var lineBreaks = document.getElementById('separate-measures-array').value.split(',');
  var timeSignature = document.getElementById('beats-per-measure').value;
  var timestampsHTML = instance.outputListToHTML(instance.makeTimestampsObj(bpm, howManyBeatsOut, timeSignature), lineBreaks);
  document.getElementById('output').innerHTML = timestampsHTML;
});

    $("#menu-toggle").click(function(e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
    });