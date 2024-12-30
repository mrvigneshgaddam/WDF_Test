class Calculator {
    constructor() {
        this.current = '0';
        this.previous = '';
        this.operation = undefined;
        this.shouldResetScreen = false;
        
        this.display = document.querySelector('.current');
        this.historyDisplay = document.querySelector('.history');
        this.setupEventListeners();
    }

    setupEventListeners() {
        document.querySelectorAll('[data-number]').forEach(button => {
            button.addEventListener('click', () => this.appendNumber(button.textContent));
        });

        document.querySelectorAll('[data-action="operator"]').forEach(button => {
            button.addEventListener('click', () => this.chooseOperation(button.textContent));
        });

        document.querySelector('[data-action="calculate"]').addEventListener('click', () => this.calculate());
        document.querySelector('[data-action="clear"]').addEventListener('click', () => this.clear());
        document.querySelector('[data-action="delete"]').addEventListener('click', () => this.delete());

        // Keyboard support
        document.addEventListener('keydown', (e) => {
            if (e.key >= '0' && e.key <= '9' || e.key === '.') this.appendNumber(e.key);
            if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') this.chooseOperation(e.key);
            if (e.key === 'Enter' || e.key === '=') this.calculate();
            if (e.key === 'Backspace') this.delete();
            if (e.key === 'Escape') this.clear();
        });
    }

    appendNumber(number) {
        if (this.shouldResetScreen) {
            this.current = '';
            this.shouldResetScreen = false;
        }
        if (number === '.' && this.current.includes('.')) return;
        this.current = this.current === '0' ? number : this.current + number;
        this.updateDisplay();
    }

    chooseOperation(operator) {
        if (this.current === '') return;
        if (this.previous !== '') {
            this.calculate();
        }
        this.operation = operator;
        this.previous = this.current;
        this.current = '';
        this.updateDisplay();
    }

    calculate() {
        let computation;
        const prev = parseFloat(this.previous);
        const current = parseFloat(this.current);
        
        if (isNaN(prev) || isNaN(current)) return;

        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '×':
            case '*':
                computation = prev * current;
                break;
            case '÷':
            case '/':
                computation = prev / current;
                break;
            case '%':
                computation = prev % current;
                break;
            default:
                return;
        }

        // Add to history
        this.historyDisplay.textContent = `${prev} ${this.operation} ${current} =`;
        this.current = computation.toString();
        this.operation = undefined;
        this.previous = '';
        this.shouldResetScreen = true;
        this.updateDisplay();
    }

    delete() {
        this.current = this.current.toString().slice(0, -1);
        if (this.current === '') this.current = '0';
        this.updateDisplay();
    }

    CE() {
        this.current = '0';
        this.previous = '';
        this.operation = undefined;
        this.historyDisplay.textContent = '';
        this.updateDisplay();
    }

    updateDisplay() {
        this.display.textContent = this.current;
        if (this.operation != null) {
            this.historyDisplay.textContent = `${this.previous} ${this.operation}`;
        }
    }
}

// Initialize calculator
const calculator = new Calculator();