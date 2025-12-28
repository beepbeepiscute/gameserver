const keys = {};
window.addEventListener("keydown", (e) => {
    keys[e.code] = true;
});
window.addEventListener("keyup", (e) => {
    keys[e.code] = false;
});
window.addEventListener("blur", () => {
    for (const k in keys) {
        keys[k] = false;
    }
});
export function isKeyDown(code) {
    return keys[code] === true;
}
