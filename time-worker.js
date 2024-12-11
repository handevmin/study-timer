// timer-worker.js
let lastTick = Date.now();

// 현재 시간 즉시 보내기
function sendCurrentTime() {
    const now = new Date();
    postMessage({
        type: 'tick',
        time: {
            hours: now.getHours(),
            minutes: now.getMinutes(),
            seconds: now.getSeconds()
        }
    });
}

// 시작하자마자 현재 시간 전송
sendCurrentTime();

function checkTime() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    // 매 초마다 메인 스레드에 현재 시간 전송
    postMessage({
        type: 'tick',
        time: {
            hours,
            minutes,
            seconds
        }
    });

    // 수업 시작/종료 시간 체크
    if (hours >= 10 && hours <= 22) {
        if (minutes === 0 && seconds === 0) {
            postMessage({
                type: 'classStart',
                period: hours - 9
            });
        }
        if (minutes === 50 && seconds === 0) {
            postMessage({
                type: 'classEnd'
            });
        }
    }
}

// 1초마다 시간 체크
setInterval(checkTime, 1000);