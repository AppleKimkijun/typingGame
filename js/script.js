//사용변수
const GAME_TIME = 9;
let score = 0;
let time = GAME_TIME;
let isPlaying = false;
let timeInterval;
let words = [];
let checkInterval;

const wordInput = document.querySelector(".word-input");
const wordDisplay = document.querySelector(".word-display");
const scoreDisplay = document.querySelector(".score");
const timeDisplay = document.querySelector(".time");
const button = document.querySelector(".button");

init();

function init() {
    buttonChange("게임로딩중...");
    getWords();
    wordInput.addEventListener("input", checkMatch);
}

//게임 실행
function run() {
    if (isPlaying) {
        return;
    }
    isPlaying = true;
    time = GAME_TIME;
    scoreDisplay.innerText = 0;
    timeInterval = setInterval(countDown, 1000);
    checkInterval = setInterval(checkStatus, 50);
    buttonChange("게임중");
}

function checkStatus() {
    if (!isPlaying && time === 0) {
        buttonChange("게임시작");
        clearInterval(checkInterval)
        score = 0;
        scoreDisplay.innerText = 0;
        wordInput.classList.remove("active");
    }else {
        wordInput.classList.add("active"), wordInput.focus()
    }
}


// 단어 불러오기
function getWords() {
    axios.get('https://random-word-api.herokuapp.com/word?number=100')
        .then(function (response) {
            response.data.forEach((word) => {
                if (word.length < 10) {
                    words.push(word);
                }
            });
            buttonChange("게임시작");
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        });

}





// 단어가 같은지 체크
function checkMatch() {
    if (wordInput.value.toLowerCase() === wordDisplay.innerText.toLowerCase()) { //인풋에 글씨를 썻을때 인풋과 화면에 글씨가 같은지
        wordInput.value = ""; //초기화
        console.log(wordInput.value);
        if (!isPlaying) {
            return;
        }
        score++; // 같으면 스코어에 점수를 1점 증가
        scoreDisplay.innerText = score; // 1점증가를 화면에 보여주기
        time = GAME_TIME;
        const randomIndex = Math.floor(Math.random() * words.length);
        wordDisplay.innerText = words[randomIndex];
    }
}





function countDown() {
    time > 0 ? time-- : isPlaying = false;
    timeDisplay.innerText = time;

}


function buttonChange(text) {
    button.innerText = text;
    if (!isPlaying) {
        clearInterval(timeInterval);
    }
    text === "게임시작" ? button.classList.remove("loading") : button.classList.add("loading");
    // text === "게임시작" ? wordInput.classList.remove("active") : wordInput.classList.add("active"), wordInput.focus();
}