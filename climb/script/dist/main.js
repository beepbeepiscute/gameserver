import { BG_tile_imgs, DrawTile, clearScreen, Dialog_tile_imgs, addText, removeText, drawTexts, applyRenderState } from "./render.js";
import { Map } from "./map.js";
import { Player } from "./player.js";
const gameSetting = {
    boostmode: false
};
const player = new Player();
const camera = { x: 0, y: 0 };
const map = new Map();
function drawMap(camera, mapdata, Xoffset = 0, Yoffset = 0) {
    for (const [y, Ydata] of Object.entries(mapdata)) {
        const numY = parseInt(y, 16);
        if (numY > 12)
            continue;
        for (let x = camera.x - 7; x <= camera.x + 7; x++) {
            const tile = Ydata[x];
            if (typeof tile === "number") {
                DrawTile(BG_tile_imgs[tile], x + Xoffset, numY + Yoffset);
            }
            else if (tile !== null && typeof tile === "object") {
                const id = tile.id;
                const xflip = tile.xflip;
                const yflip = tile.yflip;
                if (typeof id !== "number")
                    continue;
                DrawTile(BG_tile_imgs[id], x + Xoffset, numY + Yoffset, xflip, yflip);
            }
        }
    }
}
function drawDialog(type = "base") {
    let dialogdata;
    const base = {
        "8": [10, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 10],
        "9": [10, 7, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 5, 10],
        "A": [10, 7, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 5, 10],
        "B": [10, 2, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 3, 10]
    };
    const setting = {};
    const charSelect = {};
    if (type == "base")
        dialogdata = base;
    else if (type == "setting")
        dialogdata = setting;
    else if (type == "charSelect")
        dialogdata = charSelect;
    else
        return;
    for (const [y, Ydata] of Object.entries(dialogdata)) {
        const numY = parseInt(y, 16);
        if (numY > 12)
            continue;
        Ydata.forEach((value, index) => {
            DrawTile(Dialog_tile_imgs[value], index - 7, numY);
        });
    }
}
let lastTime = performance.now();
let tick = 0;
let base_start_uuid = addText(`   [시작]`, -5, 8.9, 0.65);
let base_char_uuid = addText(`   [캐릭터]`, -5, 9.7, 0.65);
let base_setting_uuid = addText(`   [설정]`, -5, 10.5, 0.65);
let select = "start";
let dialogscreen = "base";
let gameStartAnimated = false;
function onKeyDown(event) {
    console.log(event);
    if (event.key == "ArrowUp") {
        if (dialogscreen == "base") {
            if (select == "start")
                select = "setting";
            else if (select == "char")
                select = "start";
            else if (select == "setting")
                select = "char";
        }
    }
    else if (event.key == "ArrowDown") {
        if (dialogscreen == "base") {
            if (select == "start")
                select = "char";
            else if (select == "char")
                select = "setting";
            else if (select == "setting")
                select = "start";
        }
    }
    else if (event.key == "z") {
        if (dialogscreen == "base") {
            if (select == "start") {
                dialogscreen = "gameStart";
                player.is_start = true;
                removeText(base_start_uuid);
                removeText(base_char_uuid);
                removeText(base_setting_uuid);
            }
        }
    }
}
window.addEventListener("keydown", onKeyDown);
function gameLoop(time) {
    requestAnimationFrame(gameLoop);
    const dt = (time - lastTime) / 1000;
    lastTime = time;
    tick++;
    if (tick % 2 == 0 && !gameSetting.boostmode)
        return;
    clearScreen();
    applyRenderState();
    drawMap(camera, map.data);
    player.CharacterDraw();
    if (!player.is_start) {
        drawDialog();
        if (dialogscreen == "base") {
            if (select == "start") {
                DrawTile(Dialog_tile_imgs[9], -5.3, 8.7);
            }
            else if (select == "char") {
                DrawTile(Dialog_tile_imgs[9], -5.3, 9.5);
            }
            else if (select == "setting") {
                DrawTile(Dialog_tile_imgs[9], -5.3, 10.3);
            }
        }
    }
    drawTexts();
}
requestAnimationFrame(gameLoop);
