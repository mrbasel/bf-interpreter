export class BFInterpreter {
  static COMMAND_CHARS = [">", "<", "+", "-", ".", ",", "[", "]", "!"];

  constructor(input) {
    this.cells = new Uint8Array(30000);
    this.input = input;
    this.currentIndex = 0;
    this.pointer = 0;
    this.stdinPointer = 0;
    this.nesting = 0;
  }

  run(stdin = "") {
    while (this.currentIndex < this.input.length) {
      const currentChar = this.input[this.currentIndex];
      switch (currentChar) {
        case ">":
          this.handleMovePointer(currentChar);
          break;
        case "<":
          this.handleMovePointer(currentChar);
          break;
        case "+":
          this.handleAdjustCell(currentChar);
          break;
        case "-":
          this.handleAdjustCell(currentChar);
          break;
        case ".":
          this.handleOutput();
          break;
        case ",":
          this.handleInput(stdin);
          break;
        case "[":
          this.handleLoop(currentChar);
          break;
        case "]":
          this.handleLoop(currentChar);
          break;

        case "!":
          console.log(this.cells);
          console.log(this.pointer);
          console.log(this.stack);
          console.log(this.stdinPointer);
          break;

        default:
          break;
      }
      this.currentIndex++;
    }
  }

  getCurrentCellValue() {
    return this.cells[this.pointer];
  }

  handleMovePointer(char) {
    if (char === ">") this.pointer++;
    else this.pointer--;
  }

  handleAdjustCell(char) {
    if (char === "+") this.cells[this.pointer] += 1;
    else this.cells[this.pointer] -= 1;
  }

  handleOutput() {
    process.stdout.write(String.fromCharCode(this.getCurrentCellValue()));
  }

  handleInput(stdin) {
    this.cells[this.pointer] = stdin[this.stdinPointer]?.charCodeAt(0);
    this.stdinPointer++;
  }

  handleLoop(char) {
    if (char === "[" && this.getCurrentCellValue() === 0) {
      let j = this.currentIndex;
      while (true) {
        j++;
        if (this.input[j] === "[") this.nesting++;
        else if (this.input[j] === "]" && this.nesting > 0) this.nesting--;
        else if (this.input[j] === "]" && this.nesting === 0) break;
      }
      this.currentIndex = j;
    } else if (char === "]" && this.getCurrentCellValue() !== 0) {
      let j = this.currentIndex;
      while (true) {
        j--;
        if (this.input[j] === "]") this.nesting++;
        else if (this.input[j] === "[" && this.nesting > 0) this.nesting--;
        else if (this.input[j] === "[" && this.nesting === 0) break;
      }
      this.currentIndex = j;
    }
  }
}
