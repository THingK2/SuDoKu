require('./su1.js');

var fs = require('graceful-fs');
var nb, nc, sa, data='';
var file1 = './sudoku_modified.ini';
var file2 = './sudoku.ini';

var reWrite = () => {
	data += fs.readFileSync(file2, 'utf8');
	data += fs.readFileSync(file1, 'utf8');
	
	data = data.split(/(\n|\r)/).filter(na => /^(0|SUDOKU)/.test(na));
	nc   = 10**(data.length+'').length; nb = 0;
	data = sudo.sort(data.map(n1 => {n2 = n1.split('|'); n3=n2.slice(10); return n3+'|'+n2.slice(1,10).join('|')}));
	data = data.map(n1 => {n2 = n1.split('|'); n3=n2.slice(0,1); return sudo.pad(n2.slice(1,10).join('|'),['|','|'+n3])});
	data = data.map(na => 'SUDOKU'+((nc+(++nb)+'').substr(1))+'='+na.substr(0,93));
	data = data.join('\n');
	
	fs.writeFileSync(file2, '[CASE]\n');
	fs.appendFileSync(file2, data);
	fs.unlinkSync(file1);
}
if(fs.existsSync(file1)) reWrite();