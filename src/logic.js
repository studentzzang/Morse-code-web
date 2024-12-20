const KOR = { // 자음
  'ㄱ': '.-..', 'ㄴ': '..-.','ㄷ': '-...', 'ㄹ': '...-',
  'ㅁ': '--', 'ㅂ': '.--','ㅅ': '--.','ㅇ': '-.-','ㅈ': '.--.','ㅊ': '-.-.',
  'ㅋ': '-..-','ㅌ': '--..','ㅍ': '---', 'ㅎ': '.---',
  'ㅏ': '.', 'ㅑ': '..', 'ㅓ': '-',
  'ㅕ': '...', 'ㅗ': '.-', 'ㅛ': '-.',
  'ㅜ': '....', 'ㅠ': '.-.','ㅡ': '-..',
  'ㅣ': '..-', 'ㅐ' : '--.-', 'ㅔ': '-.--',
  '1':'.----', '2' : '..---', '3':'...--', '4':'....-',
  '5':'......', '6':'-....','7':'--...', '8':'---..', '9':'----.',
}

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

let langauge = true; //true = kor, false = eng
let CURRENT_LANG = KOR;

//html
const codeText = document.querySelector('#code');
const stringText = document.querySelector('#text');

var interval = 0;
var currentCode = '';
var currentMorse = "";

const dashSec = 0.19; // . or - 나누는 초 기준

const pressedKey = new Set();

window.onkeydown = (e) => {
  pressedKey.add(e.key);
}

window.onkeyup = (e) => {
  pressedKey.delete(e.key);
  getCode();
}

setInterval((e)=> {
  if (pressedKey.size > 0){

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

  convert();
}

const convert = () => { // 모스부호를 텍스트로

  var reverseMorseCodeMap = Object.fromEntries( // 키-밸류를 밸류-키 로
    Object.entries(CURRENT_LANG).map(([key, value]) => [value, key])
  );

  var resChar = ''; 

  

  console.log(reverseMorseCodeMap);
}

const changeLanguage = () => {

}