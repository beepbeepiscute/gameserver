// screen_resize.js
const canvas = document.getElementById("screen");

// 고정 비율 (5:4)
const ASPECT_W = 5;
const ASPECT_H = 4;

function resizeCanvas() {
    const winW = window.innerWidth;
    const winH = window.innerHeight;

    let canvasW = winW;
    let canvasH = canvasW * (ASPECT_H / ASPECT_W);

    // 높이가 화면을 넘으면 높이 기준으로 조정
    if (canvasH > winH) {
        canvasH = winH;
        canvasW = canvasH * (ASPECT_W / ASPECT_H);
    }

    canvas.width = Math.floor(canvasW);
    canvas.height = Math.floor(canvasH);
}

// 최초 1회 + 리사이즈 대응
window.addEventListener("resize", resizeCanvas);
resizeCanvas();
