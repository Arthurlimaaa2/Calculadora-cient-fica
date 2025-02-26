let history = [];

function appendToDisplay(value) {
    document.getElementById('display').value += value;
}

function clearDisplay() {
    document.getElementById('display').value = '';
}

function calculate() {
    const display = document.getElementById('display');
    const expression = display.value;
    
    if (!expression) return;

    try {
        let result = expression
            .replace(/π/g, Math.PI)
            .replace(/e/g, Math.E)
            .replace(/sqrt\(/g, 'Math.sqrt(')
            .replace(/sin\(/g, 'Math.sin(')
            .replace(/cos\(/g, 'Math.cos(')
            .replace(/tan\(/g, 'Math.tan(')
            .replace(/log\(/g, 'Math.log10(')
            .replace(/ln\(/g, 'Math.log(')
            .replace(/\^/g, '**');

        result = eval(result);
        addToHistory(expression);
        display.value = result;
    } catch (error) {
        display.value = 'Erro';
    }
}

function addToHistory(expression) {
    const time = new Date().toLocaleTimeString();
    history.unshift({ time, expression });
    
    if (history.length > 4) {
        history.pop();
    }
    
    updateHistoryDisplay();
}

function updateHistoryDisplay() {
    const historyEntries = document.getElementById('history-entries');
    historyEntries.innerHTML = '';
    
    history.forEach(entry => {
        const entryDiv = document.createElement('div');
        entryDiv.className = 'history-entry';
        entryDiv.innerHTML = `
            <div class="history-time">${entry.time}</div>
            <div>${entry.expression}</div>
        `;
        
        entryDiv.onclick = () => {
            document.getElementById('display').value = entry.expression;
        };
        
        historyEntries.appendChild(entryDiv);
    });
}