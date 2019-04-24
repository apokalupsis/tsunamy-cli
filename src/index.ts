#!/usr/bin/env node

import chalk from 'chalk';
import * as figlet from 'figlet';
import path from 'path';
import program from 'commander';
import inquirer from 'inquirer';
import { spawn } from 'child_process';


function createProject() {
  console.log('init new project');
  inquirer
  .prompt([
  {
    type: 'input',
    name: 'project_name',
    message: `What's your project name`,
    default: () => {
      return 'New Project';
    }
  },
  ]).then( (answers: any) => {
      console.log('You write : ', JSON.stringify(answers, null, '  '));
      console.log('createProject ', answers.project_name);
  });
}

function showHelp(txt: any) {
  console.log(
    chalk.red(
      figlet.textSync('tsunamy CLI', { horizontalLayout: 'full' })
    )
  );
  program.outputHelp(txt);
}

function runCommand( cmd: string, param: string[]) {
  const child = spawn(cmd, param);
  child.stdout.on('data', (chunk) => {
      process.stdout.write(chunk.toString());
  });
  child.on('close', (code) => {
    console.log(`end with code ${code}`);
  });
  child.on('error', (code) => {
    console.log(`child error with code ${code}`);
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

program
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
