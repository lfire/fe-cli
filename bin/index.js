#!/usr/bin/env node

const commander = require('commander');
const pkg = require('../package.json');

// // 直接使用 commander 实例
// const { program } = commander;

// 手工自建一个实例
const program = new commander.Command();

program.showHelpAfterError();
program
  .name(Object.keys(pkg.bin)[0])
  .usage('<command> [options]')
  .version(pkg.version)
  .option('-d, --debug', '是否开启调试', false)
  .option('-e, --env <env>', '获取环境变量');

// // 获取配置项
// const options = program.opts();

// 注册命令
// 1. command 注册命令
const clone = program.command('clone <source> [destination]');
clone
  .description('clone a repository from remote')
  .option('-f, --force', '是否强制clone')
  .action((source, destination, cmdOpt) => {
    console.log(`do clone from ${source} to ${destination}`, cmdOpt);
  });

// 2. addCommand 注册子命令
const service = new commander.Command('service');
service.showHelpAfterError();
service.showSuggestionAfterError();
service
  .command('start [port]')
  .description('start service on some port, default 8888')
  .action((port = 8888) => {
    console.log(`start service on port ${port}`);
  });
service
  .command('stop')
  .description('stop service')
  .action(() => {
    console.log('stop the service');
  });
program.addCommand(service);

program
  .command('install [name]', 'install a package', {
    // 默认是：fec-install， 可以配置重定向命令为：fec-add
    // 这个可以实现多个脚手架之间串连的功能，a执行调用b
    executableFile: 'fec-add',
    isDefault: false,
    hidden: true,
  })
  .alias('i');

// 命令行参数自动匹配
program
  .arguments('<command> [options]')
  .description('front-end cli')
  .action((command, cmdOpt) => {
    console.log(`run ${command} with ${cmdOpt}`);
  });

// 解析参数
// console.log(process.argv);
program.parse(process.argv);

// program.outputHelp();

