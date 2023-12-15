#!/usr/bin/env npx ts-node --esm
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

yargs(hideBin(process.argv))
  .scriptName("Easychat")
  .usage("$0 <cmd> [args]")

  .command(
    "hello [name]",
    "Print a value from the console",
    (yargs) => {
      yargs.positional("name", {
        type: "string",
        default: "Cambi",
        describe: "the name to say hello to",
      });
    },
    function (argv) {
      console.log("hello", argv.name, "welcome to yargs!");
    }
  )
  


  .showHelpOnFail(true)
  .demandCommand(1, "")
  .help().argv;
