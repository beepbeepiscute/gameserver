// render.js
const canvas = document.getElementById("screen");
const ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = false;

export const SCREEN_SIZE_X = 15;
export const SCREEN_SIZE_Y = 12;

/** 타일 위치 구하기 */
export function GetTilePos(x, y) {
    const tileW = Math.floor(canvas.width / SCREEN_SIZE_X);
    const tileH = Math.floor(canvas.height / SCREEN_SIZE_Y);

    return {
        x: x * tileW,
        y: y * tileH,
        w: tileW,
        h: tileH
    };
}

function loadImage(img, sx, sy, sw, sh) {
    const off = document.createElement("canvas");
    off.width = sw;
    off.height = sh;

    const octx = off.getContext("2d");
    octx.imageSmoothingEnabled = false;

    // 완전 투명으로 초기화
    octx.clearRect(0, 0, sw, sh);

    octx.drawImage(img, sx, sy, sw, sh, 0, 0, sw, sh);
    return off;
}

export const BG_tile_imgs = { isLoaded: false };

const BGimg = new Image();
BGimg.src = "/climb/Assets/Image/BG.png";

BGimg.onload = () => {
    let index = 0;

    for (let y = 0; y < 25; y++) {
        for (let x = 0; x < 24; x++) {
            BG_tile_imgs[index++] = loadImage(
                BGimg,
                x * 44,
                y * 44,
                44,
                44
            );
        }
    }

    BG_tile_imgs.isLoaded = true;
	console.log("BG loaded", BGimg.width, BGimg.height);
};

/** 타일 그리기 */
export function DrawTile(img, x, y, flipX = false, flipY = false) {
    const t = GetTilePos(x, y);

    ctx.save(); // 상태 저장

    // 뒤집기 처리
    ctx.translate(t.x + t.w / 2, t.y + t.h / 2); // 타일 중심으로 이동
    ctx.scale(flipX ? -1 : 1, flipY ? -1 : 1);
    ctx.drawImage(img, -t.w / 2, -t.h / 2, t.w, t.h);

    ctx.restore(); // 상태 복원
}

/** 스크린 초기화 */
export function clearScreen() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

