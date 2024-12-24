
const ENG = {
  'A' : '.-', 'B' : '-...', 'C' : '-.-.', 'D' : '-..',
  'E' : '.', 'F': '..-.', 'G':'--.', 'H': '....',
  'I' : '..', 'J' : '.---', 'K' : '-.-', 'L' : '.-..',
  'M' : '--', 'N' : '-.', 'O' : '--.-', 'P':'.--.',
  'Q': '--.-', 'R' : '.-.', 'S' : '...', 'T' : '-',
  'U' : '..-', 'V' : '...-', 'W' : '.--', 'X':'.--',
  'Y' : '-.--', 'Z' : '--..',
  '1':'.----', '2' : '..---', '3':'...--', '4':'....-',
  '5':'......', '6':'-....','7':'--...', '8':'---..', '9':'----.',
}

const KOR = {
  'ㄱ' : '.-..', 'ㄴ' : '..-.', 'ㄷ' : '-...', 'ㄹ' : '...-',
  'ㅁ' : '--', 'ㅂ' : '.--', 'ㅅ' : '--.', 'ㅇ':'-.-',
  'ㅈ':'.--.', 'ㅊ' :'-.-.', 'ㅋ':'-..-', 'ㅌ':'--..', 'ㅍ':'---', 'ㅎ':'.---',
  'ㅏ':'.','ㅑ':'..','ㅓ':'-','ㅕ':'...','ㅗ':'.-','ㅛ':'-.',
  'ㅜ':'....','ㅠ':'.-.','ㅡ':'-..','ㅣ':'..-','ㅐ':'--.-','ㅔ':'-.--',
  '1':'.----', '2' : '..---', '3':'...--', '4':'....-',
  '5':'......', '6':'-....','7':'--...', '8':'---..', '9':'----.',
}

const CHO = ["ㄱ", "ㄲ", "ㄴ", "ㄷ", "ㄸ", "ㄹ", "ㅁ", "ㅂ", "ㅃ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅉ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"];
const JUNG = ["ㅏ", "ㅐ", "ㅑ", "ㅒ", "ㅓ", "ㅔ", "ㅕ", "ㅖ", "ㅗ", "ㅘ", "ㅙ", "ㅚ", "ㅛ", "ㅜ", "ㅝ", "ㅞ", "ㅟ", "ㅠ", "ㅡ", "ㅢ", "ㅣ"];
const JONG = ["", "ㄱ", "ㄲ", "ㄳ", "ㄴ", "ㄵ", "ㄶ", "ㄷ", "ㄹ", "ㄺ", "ㄻ", "ㄼ", "ㄽ", "ㄾ", "ㄿ", "ㅀ", "ㅁ", "ㅂ", "ㅄ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"];


let CURRENT_LANG = KOR;
let isEng = false;

//html
const codeText = document.querySelector('#code');
const stringText = document.querySelector('#text');
const changeLangButton = document.querySelector("#lang_input");

var interval = 0;
var currentCode = '';
var currentMorse = "";

//res
var currentString = '';

const dashSec = 0.03; // . or - 나누는 초 기준

let isPressed = false;

window.onkeydown = (e) => {

  if (e.key === "Control") {
    isPressed = true;
  }

  if (e.key === ' ') {
    convert();
  }
}

window.onkeyup = (e) => {
  if (e.key === "Control") {
    isPressed = false;
    getCode();
  }
}

changeLangButton.addEventListener("change",function(){
  changeLang();
});

setInterval((e)=> {
  if (isPressed){

    interval += 1/60;
  } 
  else {
    interval = 0;
  }
}, 16); // 60fps

const getCode = () => { //모스부호로 변환

  if(interval >= dashSec) {
    currentCode = '-';
  }
  else {
    currentCode = '.'
  }

  currentMorse = currentMorse.concat(currentCode);
  
  codeText.innerHTML = currentMorse;
}

const convert = () => { // 모스부호를 텍스트로

  for (const [key, value] of Object.entries(CURRENT_LANG)) {
    if (currentMorse === value) {

      currentString += key;

      currentMorse = '';

      console.log(currentString);

      break;
    }
  }

  if(isEng) { //english
    changeText(currentString);   
  }
  else { //korean
    var koreanString = Hangul.assemble(currentString);

    changeText(koreanString);
  }
}

const changeText = (str) =>{
  
  stringText.innerHTML = str;
}

//토글버튼에서 호출
const changeLang = () => {
  isEng = !isEng;

  currentMorse = "";
  currentString = "";

  if(isEng){
    CURRENT_LANG = ENG;
  }
  else {
    CURRENT_LANG = KOR;
  }
}