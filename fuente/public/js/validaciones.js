function teclasPermitidas(evt) {
    if (
        evt.key === "Backspace" ||
        evt.key === "Tab" ||
        evt.key === "Delete" ||
        evt.key === "ArrowLeft" ||
        evt.key === "ArrowRight" ||
        evt.key === "ArrowUp" ||
        evt.key === "ArrowDown"
    ) {
        return true;
    }
    return false;
}

function isNumberKey(evt) {
    // Permitir teclas de control: backspace, tab, delete, flechas, etc.
    if (teclasPermitidas(evt)) {
        return true;
    }
    // Permitir solo números (0-9)
    if (evt.key >= "0" && evt.key <= "9") {
        return true;
    }
    return false;
}

function isNumberKeyTLF(evt) {
    // Permitir teclas de control: backspace, tab, delete, flechas, etc.
    if (teclasPermitidas(evt)) {
        return true;
    }
    // Permitir solo números (0-9), '-' y '+'
    if ((evt.key >= "0" && evt.key <= "9") || evt.key === '-' || evt.key === '+') {
        return true;
    }
    return false;
}

function isCedulaPattern(evt, input) {
    const allowedLetters = ['V', 'E', 'J', 'C'];
    const value = input.value;
    // Permitir teclas de control
    if (teclasPermitidas(evt)) {
        return true;
    }
    // Primera posición: solo V, E, J, C (mayúscula o minúscula) y luego se agrega un guion
    if (value.length === 0) {
        if (['v', 'e', 'j', 'c', 'V', 'E', 'J', 'C'].includes(evt.key)) {
            setTimeout(function () {
                input.value = evt.key.toUpperCase() + "-";
            }, 0);
            return false;
        }
        return false;
    }
    // Segunda posición: solo guion
    if (value.length === 1) {
        if (evt.key === "-") {
            return true;
        }
        return false;
    }
    // A partir de la tercera posición: solo números
    if (value.length > 1) {
        if (evt.key >= "0" && evt.key <= "9") {
            return true;
        }
        return false;
    }
    return false;
}