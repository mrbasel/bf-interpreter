import fs from "fs";

import { BFInterpreter } from "./interpreter.js";

function main() {
  const HELP_MSG = '(Run "node main -h" for help)';
  const VALID_FLAGS = ["-h", "--help", "-d", "--debug"];

  const args = process.argv.slice(2);
  const flags = args.filter((arg) => arg.startsWith("-", 0));
  const filename = args[args.length - 1];
  const debug = flags.includes('-d') || flags.includes('--debug')
  const input = args[args.length - 2]?.startsWith("-")
    ? null
    : args[args.length - 2];

  if (flags.includes("-h")) {
    console.log(`Usage: node main [FLAGS]... [INPUT(optional)] [FILE]
Run brainf**k code

    -h, --help            print this message
    -d, --debug           Enable debug mode (use '!' command)
  `);
    return;
  }

  const invalidFlags = flags.filter((flag) => !VALID_FLAGS.includes(flag));
  if (invalidFlags.length > 0) {
    console.log(`Invalid flags ${invalidFlags} 
${HELP_MSG}`);
  }

  if (!filename) {
    console.log(`Missing filename 
${HELP_MSG}`);
  }

  fs.readFile(filename, "utf8", (err, data) => {
    if (err) {
      console.error(`No such file ${filename} ${HELP_MSG}`);
      return;
    }

    const interpreter = new BFInterpreter(data, debug);
    if (input) interpreter.run(input);
    else interpreter.run();
  });
}
main();
