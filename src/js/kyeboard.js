import {display} from './country_panel';

    let curPos = display.selectionStart;
    let buttons;
    let language = "eng";
    let langKeys;
    let casheLayout = [];
    let casheLang;
    let keycodes = [192, 49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 189, 187, 8, 9, 81, 87, 69,
    82, 84, 89, 85, 73, 79, 80, 219, 221, 20, 65, 83, 68, 70, 71, 72, 74, 75, 76, 186, 222,
    220, 13, 16, 90, 88, 67, 86, 66, 78, 77, 188, 190, 191, 37, 39, 555, 777, 32, 999, 998];
    let speech = false;
    let sound = true;
    let  myAudio1 = new Audio;
    let  myAudio2 = new Audio;
    let  myAudio3 = new Audio;
    let  myAudio4 = new Audio;
    let  myAudio5 = new Audio;
    let  myAudio6 = new Audio;
    let  myAudio7 = new Audio;
    let  myAudio8 = new Audio;
    let  myAudio9 = new Audio;
      myAudio1.src = './../media/1.mp3';
      myAudio2.src = './../media/2.mp3';
      myAudio3.src = './../media/3.mp3';
      myAudio4.src = './../media/4.mp3';
      myAudio5.src = './../media/5.mp3';
      myAudio6.src = './../media/6.mp3';
      myAudio7.src = './../media/7.mp3';
      myAudio8.src = './../media/8.mp3';
      myAudio9.src = './../media/9.mp3';

      //myAudio.play()

const VirtialKbd = {
  elements: {
    keyboard: null,
    btnWrapper: null,
    buttons: []
  },

  properties: {
    capsLock: false,
    shift: false
  },

  init(lang) {
    //adds containers
    this.elements.keyboard = document.createElement("div");
    this.elements.btnWrapper = document.createElement("div");
    //add classes
    this.elements.keyboard.classList.add("keyboard", "inactive"); // тут добавить inactive
    this.elements.btnWrapper.classList.add("btnWrapper");
    //create buttons
    this.elements.btnWrapper.appendChild(this.createKeys(lang));
    this.elements.buttons = this.elements.btnWrapper.querySelectorAll(".button");
    //add buttons container 
    this.elements.keyboard.appendChild(this.elements.btnWrapper);
    document.body.appendChild(this.elements.keyboard);
    buttons = Array.from(this.elements.buttons);
  },

  createKeys(lang) {
    let layouts;
    const fragment = document.createDocumentFragment();
    const buttonsEng = [
      "`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "backspace",
      "tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]",
      "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "\\", "enter",
      "shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", "left", "right",
      "speech", "space", "done", "sound",
    ];

    const buttonsRu = [
      "ё", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "backspace",
      "tab", "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ",
      "caps", "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", "\\", "enter",
      "shift", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", ".", "left", "right",
      "speech", "space", "done", "sound", 
    ];

      const shiftEng = [
      "~", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+", "backspace",
      "tab", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "{", "}",
      "caps", "A", "S", "D", "F", "G", "H", "J", "K", "L", ":", "\"", "|", "enter",
      "shift", "Z", "X", "C", "V", "B", "N", "M", "<", ">", "?", "left", "right",
      "speech", "space", "done", "sound",
    ];
      const shiftRu = [
      "Ё", "!", "\"", "№", ";", "%", ":", "?", "*", "(", ")", "_", "+", "backspace",
      "tab", "Й", "Ц", "У", "К", "Е", "Н", "Г", "Ш", "Щ", "З", "Х", "Ъ",
      "caps", "Ф", "Ы", "В", "Ф", "П", "Р", "О", "Л", "Д", "Ж", "Э", "/", "enter",
      "shift", "Я", "Ч", "С", "М", "И", "Т", "Ь", "Б", "Ю", ",", "left", "right", 
      "speech", "space", "done", "sound",
    ];

    if (lang === "eng") {layouts = buttonsEng}
      else if (lang === "ru") {layouts = buttonsRu}
      else if (lang === "shiftEng") {layouts = shiftEng}
      else if (lang === "shiftRu") {layouts = shiftRu}

    layouts.forEach(key => {
      const keyElement = document.createElement("button");
      const insertLineBreak = ["backspace", "]", "enter", "ъ", "up", "Ъ", "}", "right"].indexOf(key) !== -1;

      keyElement.setAttribute("type", "button");
      keyElement.classList.add("button");

      switch (key) {
        
        case "backspace":
          keyElement.classList.add("button_wide", "backspace");
          keyElement.addEventListener("click", () => {
           if (sound) {
              myAudio3.currentTime = 0;
              myAudio3.play()
            }
            curPos = display.selectionStart;
            if (curPos === 0) {}
            else if (curPos === display.value.length && curPos !==0) {
              display.value = display.value.substring(0, display.value.length - 1)
              setCaretToPos(display, curPos - 1)
            }
            else {
              let cache = display.value.slice(curPos)
              display.value = display.value.slice(0, curPos).substring(0, display.value.slice(0, curPos).length - 1) + cache;
              setCaretToPos(display, curPos - 1)
          }           
            display.focus()
            let virtualEvent = new Event('input', {
              bubbles: true,
              cancelable: true,
          });
            display.dispatchEvent(virtualEvent);
          });
          break;

        case "caps":
          if (this.properties.capsLock) {
            keyElement.classList.add("button_wide", "button_switch")
          } else {keyElement.classList.add("button_wide")}
          keyElement.innerHTML = "Caps Lock";
          keyElement.addEventListener("click", () => {
             if (sound) {
              myAudio9.currentTime = 0;
              myAudio9.play()
            }
            this.toggleCapsLock()
            keyElement.classList.toggle("button_switch", this.properties.capsLock);
            // keyElement.textContent.toUpperCase();
            display.focus()
          });

          break;

          case "tab":
            keyElement.classList.add("button_wide", "tab")
            keyElement.addEventListener("click", () => {
             if (sound) {
              myAudio7.currentTime = 0;
              myAudio7.play()
            }
            curPos = display.selectionStart;
            if (curPos === display.value.length) {
              display.value = display.value + "\t";
            } else { 
              let cache = display.value.slice(curPos)
                display.value = display.value.slice(0, curPos) + "\t" + cache;}
                  setCaretToPos(display, curPos + 1)
            display.focus()
            let virtualEvent = new Event('input', {
              bubbles: true,
              cancelable: true,
          });
            display.dispatchEvent(virtualEvent);
          });

          break;

        case "enter":
          keyElement.classList.add("button_wide", "enter");
          keyElement.addEventListener("click", () => {
             if (sound) {
              myAudio4.currentTime = 0;
              myAudio4.play()
            }
            curPos = display.selectionStart;
            if (curPos === display.value.length) {
              display.value = display.value + "\n";
            } else { 
              let cache = display.value.slice(curPos)
                display.value = display.value.slice(0, curPos) + "\n" + cache;}
                  setCaretToPos(display, curPos + 1)
            display.focus()
          });

          break;

        case "space":
          keyElement.classList.add("button_widest");
          keyElement.addEventListener("click", () => {
           if (sound) {
              myAudio7.currentTime = 0;
              myAudio7.play()
            }
            curPos = display.selectionStart;
            if (curPos === display.value.length) {
              display.value = display.value + " ";
            } else { 
                 let cache = display.value.slice(curPos)
                display.value = display.value.slice(0, curPos) + " " + cache;}
             setCaretToPos(display, curPos + 1)
            display.focus()
            let virtualEvent = new Event('input', {
              bubbles: true,
              cancelable: true,
          });
            display.dispatchEvent(virtualEvent);
          });

          break;

        case "shift":
        if (this.properties.shift) {
          keyElement.classList.add("button_wide", "shift", "button_switch")
        }
          else {keyElement.classList.add("button_wide", "shift")
        }
          keyElement.addEventListener("click", () => {
           if (sound) {
              myAudio8.currentTime = 0;
              myAudio8.play()
            }
              if (!this.properties.shift) {
                this.properties.shift = !this.properties.shift;
                this.elements.btnWrapper.innerHTML = "";
                if (language === "eng") {
                    this.elements.btnWrapper.appendChild(this.createKeys("shiftEng"));
                    this.elements.buttons = this.elements.btnWrapper.querySelectorAll(".button");
                  } else {
                    this.elements.btnWrapper.appendChild(this.createKeys("shiftRu"));
                    this.elements.buttons = this.elements.btnWrapper.querySelectorAll(".button");
                  }
                } else {
                  this.properties.shift = !this.properties.shift;
                  if (language === "eng") {
                    this.elements.btnWrapper.innerHTML = "";
                    this.elements.btnWrapper.appendChild(this.createKeys("eng"));
                    this.elements.buttons = this.elements.btnWrapper.querySelectorAll(".button");
                  } else {
                     this.elements.btnWrapper.innerHTML = "";
                    this.elements.btnWrapper.appendChild(this.createKeys("ru"));
                    this.elements.buttons = this.elements.btnWrapper.querySelectorAll(".button");
                  }
                }
                if (sound) {document.querySelector(".sound").classList.remove("active")}
                else {document.querySelector(".sound").classList.add("active")} 
                if (speech) {document.querySelector(".button_speech").classList.add("active")}
                else {document.querySelector(".button_speech").classList.remove("active")} 
                display.focus()
          });

          break;

        case "done":
          keyElement.classList.add("button_wide", "button_accept");
          keyElement.addEventListener("click", () => {
                       if (sound) {
              myAudio7.currentTime = 0;
              myAudio7.play()
            }
            this.elements.keyboard.classList.add("inactive");
            display.blur()
          });

          break;

          case "sound":
          keyElement.classList.add("sound")
          keyElement.addEventListener("click", () => {
              keyElement.classList.toggle("active")
              sound = !sound
              display.focus()
          });

          break;

        case "speech":
          keyElement.classList.add("button_wide", "button_speech");
                keyElement.addEventListener('click', () => {
                             if (sound) {
              myAudio7.currentTime = 0;
              myAudio7.play()
            }
                  keyElement.classList.toggle("active")
                  if (!speech) {
                    speech = !speech
                    recognition.interimResults = true;
                    if (language === 'eng') {
                      recognition.lang = 'en-US'
                      console.log(recognition.lang)
                    } else if (language === 'ru') {
                      recognition.lang = 'ru'
                      console.log(recognition.lang)
                    }
                    recognition.interimResults = true
                    recognition.start();
                    recognition.addEventListener('end', recognition.start)
                    recognition.addEventListener('result', tryRec);

                  } else {
                    stopVoice()
                  }
                  display.focus();
                  let virtualEvent = new Event('input', {
                    bubbles: true,
                    cancelable: true,
                });
                  display.dispatchEvent(virtualEvent);
                })
          break;


        case "left":
          keyElement.innerHTML = "◄";
          keyElement.addEventListener("click", () => {
                       if (sound) {
              myAudio7.currentTime = 0;
              myAudio7.play()
            }
            curPos = display.selectionStart;
            if (curPos !== 0) {
            setCaretToPos(display, curPos - 1)
            display.focus()
            } else {display.focus()}
        });
          break;

        case "right":
          keyElement.innerHTML = "►";
          keyElement.addEventListener("click", () => {
                       if (sound) {
              myAudio7.currentTime = 0;
              myAudio7.play()
            }
            curPos = display.selectionStart;
            if (curPos !== display.value.length) {
            setCaretToPos(display, curPos + 1)
            display.focus()
            } else {display.focus()}
        });
          break;

        // case "lang":
        //   keyElement.classList.add("button", "button_lang", "button_wide");
        //   keyElement.addEventListener("click", () => {
        //     if (sound) {
        //       myAudio1.currentTime = 0;
        //       myAudio1.play()
        //     }
        //       this.elements.btnWrapper.innerHTML = "";
        //       if (language === "eng") {
        //         this.elements.btnWrapper.appendChild(this.createKeys("ru"));
        //         this.elements.buttons = this.elements.btnWrapper.querySelectorAll(".button");
        //         language = "ru";
        //         document.querySelector(".button_lang").style.background = "#C1E3FB url('assets/images/ru2.png') no-repeat 50%/contain"
        //         if (sound) {document.querySelector(".sound").classList.remove("active")}
        //         else {document.querySelector(".sound").classList.add("active")}             
        //       } else {
        //         this.elements.btnWrapper.appendChild(this.createKeys("eng"));
        //          this.elements.buttons = this.elements.btnWrapper.querySelectorAll(".button");
        //         language = "eng";
        //         document.querySelector(".button_lang").style.background = "#C1E3FB url('assets/images/en.png') no-repeat 50%/contain"
        //         if (sound) {document.querySelector(".sound").classList.remove("active")}
        //         else {document.querySelector(".sound").classList.add("active")} 
        //       }
        //       buttons = Array.from(this.elements.buttons)
        //       display.focus()
        //        if (speech) {document.querySelector(".button_speech").classList.add("active")}
        //         else {document.querySelector(".button_speech").classList.remove("active")} 
        //   });

        //   break;

        default:
          keyElement.textContent = this.properties.capsLock || this.properties.shift ? key.toUpperCase() : key.toLowerCase();
          keyElement.addEventListener("click", () => {
            if (sound) {
              if (language === "eng") {
            myAudio2.currentTime = 0;
            myAudio2.play()
          } else {
            myAudio6.currentTime = 0;
            myAudio6.play()}}

          curPos = display.selectionStart;
          if (curPos === display.value.length) {
              display.value += (this.properties.capsLock || this.properties.shift ? key.toUpperCase() : key.toLowerCase());}
          else {
              let cache = display.value.slice(curPos)
              display.value = display.value.slice(0, curPos) + (this.properties.capsLock || this.properties.shift ? key.toUpperCase() : key.toLowerCase()) + cache;
          }
          setCaretToPos(display, curPos + 1)
          display.focus()
          let virtualEvent = new Event('input', {
            bubbles: true,
            cancelable: true,
        });
          display.dispatchEvent(virtualEvent);

          });
          break;
      }

      fragment.appendChild(keyElement);
      if (insertLineBreak) {
        fragment.appendChild(document.createElement("br"));
      }
    });

    return fragment;
  },

  toggleCapsLock() {
    this.properties.capsLock = !this.properties.capsLock;
    for (const key of this.elements.buttons) {
        key.textContent = this.properties.capsLock || this.properties.shift ?
        key.textContent.toUpperCase(): key.textContent.toLowerCase();
    }
  },

};


window.addEventListener("DOMContentLoaded", function () {
  VirtialKbd.init("eng");
});

display.addEventListener('click', function(){
  document.querySelector('.keyboard').classList.remove("inactive")
})

function setSelectionRange(input, selectionStart, selectionEnd) {
  if (input.setSelectionRange) {
    input.focus();
    input.setSelectionRange(selectionStart, selectionEnd);
  }
  else if (input.createTextRange) {
    var range = input.createTextRange();
    range.collapse(true);
    range.moveEnd('character', selectionEnd);
    range.moveStart('character', selectionStart);
    range.select();
  }
}

function setCaretToPos (input, pos) {
   setSelectionRange(input, pos, pos);
}

let ctr = false;
document.addEventListener('keydown', function(event) {
  if (event.keyCode == 17) ctr = true;

  if (VirtialKbd.elements.buttons[keycodes.indexOf(event.keyCode)] && !ctr){
    event.preventDefault()
    VirtialKbd.elements.buttons[keycodes.indexOf(event.keyCode)].style.cssText = "transform: translate(2px, 2px); background-color: #5183B2;"
   VirtialKbd.elements.buttons[keycodes.indexOf(event.keyCode)].click()
  }
  
});

document.addEventListener('keyup', function(event) {
  if (event.keyCode == 17) ctr = false;
  if (VirtialKbd.elements.buttons[keycodes.indexOf(event.keyCode)]){
  VirtialKbd.elements.buttons[keycodes.indexOf(event.keyCode)].style.cssText = "transform: translate(0px, 0px);"}
});



// speech recognition ----------------------------------------------

 window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  const stopVoice = () => {
    speech = !speech;
    setCaretToPos(display, curPos + 1)
    recognition.abort()
    recognition.removeEventListener('end', recognition.start)
    recognition.removeEventListener('result', tryRec)
  }

  const tryRec = (e) => {
    let transcript
    transcript = Array.from(e.results)
      .map(result => result[0])
      .map(result => result.transcript)
      .join('');
    if (e.results[0].isFinal) {
      curPos = display.selectionStart;
      if (curPos === display.value.length) {
              display.value += `${transcript}`;
              setCaretToPos(display, display.value.length)
            }
          else {
              let cache = display.value.slice(curPos)
              display.value = display.value.slice(0, curPos) + transcript + cache;
              setCaretToPos(display, display.value.length - cache.length)
          }
    }
  }



  


