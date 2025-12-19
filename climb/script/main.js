// main.js
import { BG_tile_imgs, DrawTile, clearScreen } from "./render.js";

const Lobby_Data = [
    [0,0,412,412,412,412,412,412,412,412,412,412,412,0,0],
    [0,134,{id:72,xflip:true},72,{id:72,xflip:true},72,93,94,95,{id:72,xflip:true},72,{id:72,xflip:true},72,133,0],
    [134,140,{id:72,xflip:true,yflip:true},{id:72,yflip:true},{id:72,xflip:true,yflip:true},{id:72,yflip:true},201,202,203,{id:72,xflip:true,yflip:true},{id:72,yflip:true},{id:72,xflip:true,yflip:true},{id:72,yflip:true},139,133],
    [140,146,84,84,84,84,207,208,209,84,84,84,84,145,139],
    [146,127,0,0,0,0,117,118,119,0,0,0,0,121,145],
    [127,0,0,0,0,0,0,0,0,0,0,0,0,0,121]

]

function drawLobby(yOffset = 0) {
    for (let y = 0; y < Lobby_Data.length; y++) {
        for (let x = 0; x < Lobby_Data[y].length; x++) {
            const tile = Lobby_Data[y][x];

            // 숫자인 경우
            if (typeof tile === "number") {
                DrawTile(BG_tile_imgs[tile], x, y+yOffset, false, false);
            }
            // 객체인 경우
            else if (typeof tile === "object" && tile.id !== undefined) {
                const flipX = tile.xflip || false;
                const flipY = tile.yflip || false;
                DrawTile(BG_tile_imgs[tile.id], x, y+yOffset, flipX, flipY);
            }
        }
    }
}

function gameLoop() {
    if (!BG_tile_imgs.isLoaded) {
        requestAnimationFrame(gameLoop);
        return;
    }

    clearScreen();

    drawLobby(5)

    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
