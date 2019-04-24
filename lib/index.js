#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = __importDefault(require("chalk"));
// import clear from 'clear';
var figlet = __importStar(require("figlet"));
var commander_1 = __importDefault(require("commander"));
var inquirer_1 = __importDefault(require("inquirer"));
var child_process_1 = require("child_process");
function createProject() {
    console.log('init new project');
    inquirer_1.default
        .prompt([
        {
            type: 'input',
            name: 'project_name',
            message: "What's your project name",
            default: function () {
                return 'New Project';
            }
        },
    ]).then(function (answers) {
        console.log('You write : ', JSON.stringify(answers, null, '  '));
        console.log('createProject ', answers.project_name);
    });
}
function showHelp(txt) {
    console.log(chalk_1.default.red(figlet.textSync('tsunamy CLI', { horizontalLayout: 'full' })));
    commander_1.default.outputHelp(txt);
}
function runCommand(cmd, param) {
    var child = child_process_1.spawn(cmd, param);
    child.stdout.on('data', function (chunk) {
        process.stdout.write(chunk.toString());
    });
    child.on('close', function (code) {
        console.log("end with code " + code);
    });
    child.on('error', function (code) {
        console.log("child error with code " + code);
    });
}
function start() {
    runCommand('npm', ['run', 'start']);
}
function build() {
    runCommand('npm', ['run', 'build']);
}
function startProd() {
    runCommand('npm', ['run', 'start-prod']);
}
function test() {
    runCommand('npm', ['run', 'test']);
}
commander_1.default
    .version('0.0.0', 'v, version')
    .description('A CLI for tsunamy framework')
    .option('n, new', 'version create new project', createProject)
    .option('start', 'start project', start)
    .option('start --prod', 'start project in production mode', startProd)
    .option('build', 'build project', build)
    .option('test', 'test project', test)
    .option('h, help', 'display help', showHelp)
    .parse(process.argv);
// if (!process.argv.slice(2).length) {
//   program.outputHelp();
// }
