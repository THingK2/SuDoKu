//'use strict';
var fs  = require('graceful-fs');
var ini = require('ini');

require('./su1.js');
require('./su2.js');

var AP = require('argparse').ArgumentParser;
var parser = new AP({
  version: '0.0.1',
  addHelp: true,
  description: 'Argparse'
})
parser.addArgument([ '-f', '--file' ],  {help: 'file config.ini'})
parser.addArgument([ '-m', '--mody' ],  {help: 'mody sudoku_modified.ini'})
parser.addArgument([ '-i', '--idx' ],   {help: 'index 28'})

var args = parser.parseArgs();
args.file = args.file || 'sudoku.ini'; 			args.file = './'+args.file; 
args.mody = args.mody || 'sudoku_modified.ini'; args.mody = './'+args.mody;
args.idx  = args.idx  || 28; 

writeMessage = console.log;

sudoku = "|-----2947|8-2-76-5-|971--3--8|12-5---7-|-9-738---|58----439|2-6-1-59-|---29-7-3|--93-41--|40";
sudoku = "|67------5|---4-5-79|-8-3---2-|-5---41--|-91---7-4|3----1---|--5-86-3-|---27--6-|--8----1-|28";
sudoku = "|---4-----|--1---87-|--9---3--|9--8---4-|7-3---59-|2--76----|--4-16--7|-----3---|-6------8|23";
sudoku = "|--9------|-1--786--|------9--|9------7-|----1----|4-8--5---|-4--5-1--|7---6----|35---28--|21";

while(true) {
	var file = args.mody;
	sudoku = sudo.fempty;

	sudo.solver(sudoku, args.idx);
	writeMessage(sudo.res);
	writeMessage(sudo.row);
	writeMessage(sudo.col);
	writeMessage(sudo.ber);

	writeMessage(sudo.sudoku+'\n'+sudo.sudocu+'81:'+sudo.loop);
	sudoku = sudo.sudoku.replace(/\|/g,'').replace(/\-/g,'0').substr(0,81).split('');
	sudoku.unshift(81-sudo.takes.length);

	if(sudo.gener) {
		sudo.solver(sudo.sudoku);
		writeMessage(sudo.sudoku+'\n'+sudo.sudocu+'81:'+sudo.loop);
		sudoku = sudo.sudoku.replace(/\|/g,'').replace(/\-/g,'0').substr(0,81).split('');
		sudoku.unshift(81-sudo.takes.length);
	}
	fs.appendFileSync(file, ini.stringify([sudo.sudoku,sudo.sudocu], { section: 'CASE' }))
}
