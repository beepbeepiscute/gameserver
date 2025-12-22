const canvas = document.getElementById("screen");
const ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = false;
export const SCREEN_SIZE_X = 15;
export const SCREEN_SIZE_Y = 12;
export const TILE_SIZE = 44;
export function GetTilePos(x, y) {
    const TILE_W = canvas.width / SCREEN_SIZE_X;
    const TILE_H = canvas.height / SCREEN_SIZE_Y;
    return {
        x: x * TILE_W,
        y: y * TILE_H,
        w: TILE_W,
        h: TILE_H
    };
}
export const BG_tile_imgs = { isLoaded: false };
export const Char_tile_imgs = { isLoaded: [false] };
const BGimg = new Image();
BGimg.src = "./Assets/Image/BG.png";
const Charimg_cup = new Image();
Charimg_cup.src = "./Assets/Image/cuptain.png";
function createTile(img, sx, sy, sw, sh, scale = 1) {
    const tile = document.createElement("canvas");
    tile.width = Math.round(sw * scale);
    tile.height = Math.round(sh * scale);
    const tctx = tile.getContext("2d");
    tctx.imageSmoothingEnabled = false;
    tctx.drawImage(img, Math.round(sx), Math.round(sy), Math.round(sw), Math.round(sh), 0, 0, tile.width, tile.height);
    return tile;
}
BGimg.onload = () => {
    let index = 0;
    for (let y = 0; y < 25; y++) {
        for (let x = 0; x < 24; x++) {
            BG_tile_imgs[index++] = createTile(BGimg, x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
        }
    }
    BG_tile_imgs.isLoaded = true;
    console.log("BG loaded");
};
Charimg_cup.onload = () => {
    for (let x = 0; x < 4; x++) {
        Char_tile_imgs[x] = createTile(Charimg_cup, x * TILE_SIZE, 0, TILE_SIZE, TILE_SIZE, 2);
    }
    Char_tile_imgs.isLoaded[0] = true;
    console.log("Char loaded");
};
export function clearScreen() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
export function DrawTile(img, x, y, flipX = false, flipY = false) {
    if (!img)
        return;
    const tileW = canvas.width / SCREEN_SIZE_X;
    const tileH = canvas.height / SCREEN_SIZE_Y;
    const drawW = tileW;
    const drawH = tileH;
    const centerX = canvas.width / 2 - drawW / 2;
    const drawX = centerX + x * tileW;
    const drawY = y * tileH;
    ctx.save();
    ctx.imageSmoothingEnabled = false;
    if (flipX || flipY) {
        ctx.translate(drawX + drawW / 2, drawY + drawH / 2);
        ctx.scale(flipX ? -1 : 1, flipY ? -1 : 1);
        ctx.drawImage(img, -drawW / 2, -drawH / 2, drawW, drawH);
    }
    else {
        ctx.drawImage(img, drawX, drawY, drawW, drawH);
    }
    ctx.restore();
}
