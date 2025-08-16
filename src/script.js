const timeButtons = document.querySelectorAll('.set-time');
const startBtn = document.getElementById('start-btn');
const stopBtn = document.getElementById('stop-btn');
const display = document.getElementById('display');
const timerSound = document.getElementById('timer-sound');

let timerInterval;
let remainingTime = 0; // 残り時間（秒単位）

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');
    return `${formattedMinutes}:${formattedSeconds}`;
}

function updateDisplay() {
    display.textContent = formatTime(remainingTime);
}

function startTimer() {
    // 既にタイマーが動いていたら何もしない
    if (timerInterval) return;

    if (remainingTime <= 0) {
        alert('時間を設定してください！');
        return;
    }

    timerInterval = setInterval(() => {
        remainingTime--;
        updateDisplay();

        if (remainingTime <= 0) {
            stopTimer();
            timerSound.play();
        }
    }, 1000); // 1秒ごとに実行
}

function stopTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
}

// 時間設定ボタンのイベントリスナー
timeButtons.forEach(button => {
    button.addEventListener('click', () => {
        stopTimer();
        const minutes = parseInt(button.dataset.minutes);
        remainingTime = minutes * 60;
        updateDisplay();
    });
});

// スタートボタンのイベントリスナー
startBtn.addEventListener('click', startTimer);

// ストップボタンのイベントリスナー
stopBtn.addEventListener('click', stopTimer);

// 初期表示
updateDisplay();