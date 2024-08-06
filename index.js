"use strict";
const timer = document.getElementById('timer');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');
startBtn.addEventListener('click', handleStart);
pauseBtn.addEventListener('click', handlePause);
resetBtn.addEventListener('click', handleReset);
const timerState = {
    lastCalledTime: 0,
    lastPausedTime: 0,
    timerId: null
};
function handleStart() {
    startBtn.disabled = true;
    pauseBtn.disabled = false;
    resetBtn.disabled = true;
    timerState.lastCalledTime = Date.now();
    timerState.timerId = requestAnimationFrame(updateTime);
}
function handlePause() {
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    resetBtn.disabled = false;
    cancelAnimationFrame(timerState.timerId);
    timerState.lastPausedTime += Date.now() - timerState.lastCalledTime;
}
function handleReset() {
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    resetBtn.disabled = true;
    timerState.lastPausedTime = 0;
    cancelAnimationFrame(timerState.timerId);
    timer.innerText = `00:00:000`;
}
function updateTime() {
    const milli = Date.now() - timerState['lastCalledTime'] + timerState['lastPausedTime'];
    const seconds = milli / 1000;
    const mins = seconds / 60;
    timer.innerText = `${addPadding(Math.floor(mins), 2)}:${addPadding(Math.floor(seconds % 60), 2)}:${addPadding(Math.floor(milli % 1000), 3)}`;
    timerState.timerId = requestAnimationFrame(updateTime);
}
function addPadding(txt, paddingLength = 0) {
    if (paddingLength <= 0)
        return txt;
    const toPaddTxt = String(txt);
    return toPaddTxt.padStart(paddingLength, '0');
}
