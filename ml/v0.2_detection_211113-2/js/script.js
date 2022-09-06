// 시간
var real_now = new Date();	// 현재 날짜 및 시간
var real_hours = real_now.getHours();	// 시간
var real_minutes = real_now.getMinutes();	// 분
var real_seconds = real_now.getSeconds();	// 초
console.log(real_hours, ":", real_minutes, ":", real_seconds);




function clock() {
  var time = new Date();

  var month = time.getMonth();
  var date = time.getDate();
  var day = time.getDay();
  var week = ['일', '월', '화', '수', '목', '금', '토'];

  var hhours = time.getHours();
  var mminutes = time.getMinutes();
  var sseconds = time.getSeconds();


  console.log(hhours+":"+mminutes+":",sseconds);
  // `${month + 1}월 ${date}일 ${week[day]}요일 ` +
  // `${hhours < 10 ? `0${hhours}` : hhours}:${mminutes < 10 ? `0${mminutes}` : mminutes}:${sseconds < 10 ? `0${sseconds}` : sseconds}`;
      
}
// clock();
// setInterval(clock, 1000); // 1초마다 실행









// ### 1번

// 변수선언
let minutes = 0;    // let : 변수 재선언 불가능, 재할당 가능
let seconds = 0;
let tenMillis = 0;

const appendTens = document.getElementById("tenMillis");    // element의 ID를 이용해 요소를 찾는다   // const : 변수 재선언, 재할당 불가능
const appendSeconds = document.getElementById("seconds");
const appendMinutes = document.getElementById("minutes");
const buttonStart = document.getElementById("bt__start");
const buttonStop = document.getElementById("bt__stop");
const buttonReset = document.getElementById("bt__reset");
let intervalId;
 
buttonStart.onclick = function(){   // 요소를 클릭할 때 발생
  clearInterval(intervalId)     // setInterval로 반복하는 걸 멈춘다
  intervalId = setInterval(operateTimer, 10)
  console.log("기록시작")
  clock();
}
 
buttonStop.onclick = function(){
  clearInterval(intervalId)
  console.log("기록끝")
  clock();
}
 
buttonReset.onclick = function(){
  clearInterval(intervalId)
  tenMillis = 0; seconds = 0; minutes = 0;
  appendTens.textContent = "00"
  appendSeconds.textContent = "00"
  appendMinutes.textContent = "00"
}
 
// 10ms 마다 시간에 대한 숫자가 증가한다!
function operateTimer(){
  tenMillis++;
  appendTens.textContent = tenMillis > 9 ? tenMillis : '0' + tenMillis
  if(tenMillis > 99){
    seconds++;
    appendSeconds.textContent = seconds > 9 ? seconds : '0' + seconds
    tenMillis = 0
    appendTens.textContent = "00"
  }
  if(seconds > 59){
    minutes++;
    appendMinutes.textContent = minutes > 9 ? minutes : '0' + minutes
    seconds = 0
    appendSeconds.textContent = "00"    
  }
}












// // ### 2번
// var ms = 0, s = 0, m = 0;
// var timer;

// var stopwatchEl = document.querySelector('.stopwatch');
// var lapsContainer = document.querySelector('.laps');

// function start() {
//     if (!timer) {
//     timer = setInterval(run, 10);
//     }
// }

// function run() {
//     stopwatchEl.textContent = getTimer();
//     ms ++;

//     if (ms == 100) {
//         ms = 0;
//         s++;
//     }
//     if (s == 60) {
//         s = 0;
//         m++;
//     }
// }


// function pause() {
//     stopTimer();
// }

// function stop() {
//     stopTimer();


//     // console 에 저장..
//     var memo = document.createElement('memo');
//     memo.innerText = getTimer();
//     lapsContainer.appendChild(memo);

//     console.log(memo)

//     // 초기화
//     ms = 0;
//     s = 0;
//     m = 0;


// }

// function stopTimer() {
//     clearInterval(timer);
//     timer = false;
// }

// function getTimer() {
//     return (m < 10 ? "0" + m : m) + ":" + (s < 10 ? "0" + s : s) + ":" + (ms < 10 ? "0" + ms : ms);
// }

// function restart() {
//     stop();
//     start();
// }

// function lap() {
//     if(timer)  {
//         var li = document.createElement('li');
//         li.innerText = getTimer();
//         lapsContainer.appendChild(li);
//     }
// }

// function resetLaps() {
//     lapsContainer.innerHTML = ' ';
// }