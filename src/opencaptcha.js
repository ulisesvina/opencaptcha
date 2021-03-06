// OpenCaptcha v1.0
/* =================================
License: MIT
Language: JavaScript & CSS
Author: Ulises Viña A. (ulisesvina)
Based On/Inspiration: reCaptcha 
================================= */

let captchaTag = document.getElementsByTagName("opencaptcha")[0]

function Catpcha(formid) {
    // Variables
    let form;
    let captchaStyle;
    let div;
    let canvas;
    let ctx;
    let textInput;
    let str = Math.random().toString(36).substring(2,7);

    // Setting Up Dependencies

    form = document.getElementById(formid);
    captchaStyle = document.createElement("link");
    captchaStyle.setAttribute("rel", "stylesheet");
    captchaStyle.setAttribute("href", "https://rawcdn.githack.com/ulisesvina/opencaptcha/b6a46ef2ba8f3154d8a405c3ce2f2aa9d409da07/src/style.css");
    document.head.appendChild(captchaStyle);

    // Setting Up Captcha

    div = document.createElement("div")
    div.setAttribute("id", "captchaChallenge")
    captchaTag.appendChild(div)

    canvas = document.createElement("canvas")
    ctx = canvas.getContext("2d");
    canvas.setAttribute("class", "canvas-captcha")
    canvas.setAttribute("style", "display: inline-block;")
    div.appendChild(canvas)

    div.appendChild(document.createElement("br"))

    textInput = document.createElement("input")
    textInput.setAttribute("type", "text")
    textInput.setAttribute("id", "challengeText")
    textInput.setAttribute("placeholder", "Captcha Text")
    div.appendChild(textInput)

    ctx.font = '30px serif';
    ctx.fillText(str, canvas.height/2, canvas.width/3);
    let i = 0
    while(i < 10) {
        ctx.moveTo(Math.random()*150, Math.random()*150);
        ctx.lineTo(Math.random()*200, Math.random()*100);
        ctx.stroke()
        i++
    }

    form.addEventListener('submit', (e) => {
        let chalElem = document.getElementById("challengeText")

        if(chalElem == null || chalElem == undefined || chalElem.value.length == 0 || document.getElementById(captchaTag.getAttribute("formid"))) {
            e.preventDefault()
            return false;
        }

        if(chalElem.value === str) {
            return true;
        } else {
            e.preventDefault()
            return false;
        }
    });
}

window.onload = new Catpcha(captchaTag.getAttribute("formid"));
