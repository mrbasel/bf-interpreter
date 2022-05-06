import { BFInterpreter } from "./interpreter.js";

function main() {
  const interpreter = new BFInterpreter(
    `++++++++[>++++[>++>+++>+++>+<<<<-]>+>+>->>+[<]<-]>>.>---.+++++++..+++.>>.<-.<.+++.------.--------.>>+.>++.`
  );
  interpreter.run();
}
main();
