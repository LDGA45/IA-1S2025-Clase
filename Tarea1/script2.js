function reflexAgent(location, state) {
    if (state === "DIRTY") {
        return 'CLEAN';
    } else if (location === 'A') {
        return 'RIGHT';
    } else if (location === 'B') {
        return 'LEFT';
    }
}

function imprimirEstado(recorridos, A, B, L) {
    A = A === "DIRTY" ? "D" : "C";
    B = B === "DIRTY" ? "D" : "C";
    let code = A + B + L;
    
    for (let recorrido of recorridos) {
        if (recorrido[0] === code) {
            if (recorrido[1] === 0) {
                recorrido[1] = 1;
                return true;
            } else {
                return true;
            }
        }
    }
    return false;
}

function verificarEstado(recorridos) {
    for (let recorrido of recorridos) {
        if (recorrido[1] === 0) {
            return false;
        }
    }
    return true;
}

function test(states) {
    let recorridos = [['DDA', 0], ['DDB', 0], ['DCA', 0], ['DCB', 0], ['CDA', 0], ['CDB', 0], ['CCA', 0], ['CCB', 0]];
    let outputElement = document.getElementById("output");
    
    let interval = setInterval(() => {
        let location = states[0];
        let state = location === 'A' ? states[1] : states[2];
        let action = reflexAgent(location, state);

        if (imprimirEstado(recorridos, states[1], states[2], location)) {
            let listItem = document.createElement("li");
            listItem.textContent = `A: ${states[1]} B: ${states[2]} | Location: ${location} | Action: ${action}`;
            outputElement.appendChild(listItem);
        }
        
        if (verificarEstado(recorridos)) {
            clearInterval(interval);
            return;
        }

        if (action === "CLEAN") {
            if (location === 'A') {
                states[1] = "CLEAN";
            } else if (location === 'B') {
                states[2] = "CLEAN";
            }
        } else if (action === "RIGHT") {
            states[0] = 'B';
        } else if (action === "LEFT") {
            states[0] = 'A';
        }

        let randomNumber = Math.floor(Math.random() * 4) + 1;
        if (randomNumber === 1) {
            states[1] = 'DIRTY';
        } else if (randomNumber === 2) {
            states[2] = 'DIRTY';
        } else if (randomNumber === 3) {
            states[1] = 'DIRTY';
            states[2] = 'DIRTY';
        }
    }, 1000);
}

document.addEventListener("DOMContentLoaded", () => {
    test(['A', 'DIRTY', 'DIRTY']);
});
