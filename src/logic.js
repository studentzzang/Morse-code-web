const consonant = { // 자음
  'ㄱ': '.-..', 'ㄴ': '..-.','ㄷ': '-...', 'ㄹ': '...-',
  'ㅁ': '--', 'ㅂ': '.--','ㅅ': '--.','ㅇ': '-.-','ㅈ': '.--.','ㅊ': '-.-.',
  'ㅋ': '-..-','ㅌ': '--..','ㅍ': '---', 'ㅎ': '.---',
}

const vowel = { // 모음
  'ㅏ': '.', 'ㅑ': '..', 'ㅓ': '-',
  'ㅕ': '...', 'ㅗ': '.-', 'ㅛ': '-.',
  'ㅜ': '....', 'ㅠ': '.-.','ㅡ': '-..',
  'ㅣ': '..-', 'ㅐ' : '--.-', 'ㅔ': '-.--'
}

//html
const codeText = document.querySelector('#code');
const stringText = document.querySelector('#text');

var interval = 0;
var currentCode = '';
var currentMorse = "";

const dashSec = 0.03; // . or - 나누는 초 기준

window.onkeydown = (e) => {
  setCode(true);
}

window.onkeyup = (e) => {
  setCode(false);
}

const setCode = (isPress) => {

  if (isPress) {
    interval += 1/60;
  }
  else {
    getCode();
    interval = 0;
  }

  
}

const getCode = () => { //모스부호로 변환

  if(interval >= dashSec) {
    currentCode = '-';
  }
  else {
    currentCode = '.'
  }

  currentMorse = currentMorse.concat(currentCode);
  console.log(currentMorse);
  codeText.innerHTML = currentMorse;

  convert();
}

const convert = () => { // 모스부호를 텍스트로

}