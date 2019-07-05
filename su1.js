var pad, unique, sort, diff, diffn9, filler, loop, trans, stretch, compress, checkOne, checkAll, result, rand, nrand, time, capFirst, sfield, fill09, fill81, fempty;
var sudo = () => {};

unique 	 = arr  =>  [...new Set(arr)];
sort 	 = arr  =>  [...new Set(arr)].sort();
diffn9   = arr 	=> 	diff(fill09, arr);
trans    = str 	=> 	str.split('|').slice(1,10).join('').replace(/\-/g,'0').split('').map(na=>na*1);
stretch	 = arr 	=> 	{let nn=0, va = [];    arr.map(nc => (!nn++) ? va=[arr[0]] : nc.map(nr => va = va.concat(nr))); return va}
compress = arr 	=> 	{let nn=0, va = [arr[0]]; fill09.map(nc => {va[va.length] = arr.slice(nn*9+1, nn*9+10); nn++}); return va}
result 	 = na  	=> 	[na.filter(na=>na*1).length, na.reduce((n1, n2) => (n1*1)+(n2*1))]; 
rand   	 = max 	=> 	{let randInt = (max, min=1) => {max++; return Math.floor(Math.random() * (max*1 - min*1)) + min*1};
				     let nc=0, na=[]; while(na.length < max) {na.push(randInt(max)); na=unique(na)}; return na;}
nrand  	 = max  => 	{if(typeof(window._rand)=== 'undefined')window._rand=[];if(!window._rand.length)window._rand=rand(max);return(window._rand.pop())};							
time   	 = mode => 	{let now = (() => new Date())(); let {hh, mm, ss} = {hh:now.getHours(), mm:now.getMinutes(), ss:now.getSeconds()};
		 		     return (!mode) ? hh+':'+((mm<=9)?'0'+mm:mm)+':'+((ss<=9)?'0'+ss:ss): nrand(120)-1} //(mm%2)*60+ss 
capFirst = str  => 	(typeof str !== 'string') ? '': str.charAt(0).toUpperCase() + str.slice(1);
pad 	 = (str, char = ['{{= ', ' }}']) => char[0] + String(str) + char[1]
filler   = (arr, num) 	 => {let len=arr.length, max=num-len; if(num >= len) while (max--) arr[max+len] = arr[max%len]; return arr;}
loop   	 = (delay, func) => setTimeout(func, delay); //setInterval(func, delay);

diff = (one,two) => {
	let ol=one.length, tl=two.length, nn=-1, va=[];
	while (++nn < ol) {
		let n, ele=one[nn], hasEle = false;
		for (n=0; n < tl; n++) 
			if (ele === two[n]) {hasEle = true; break}
		if (!hasEle) {va.push(ele)}
	}
	return va;
}

checkOne = (va, nf, trans) => {
	let isOne = (v, n) => v.split(n).length==2;
	let vo, vp=[]; 
	sudo.fill09.map(nn => {
		if(isOne(va.join(), nn)) {
			np = -1;
			va.map(na => {
				if(!na) return; np++; 
				try 	{if(na.match(nn+'')) vp[vp.length] = (nf+np+1)+'='+nn} 
				catch(e){}
			})
		}
	})
	if(!vp.length) return vp;
	vo = vp.map(na => {nb=na.split('='); vo=trans[nb[0]]+'='+nb[1]; return(vo)});
	return vo;
}

checkAll = sudocu => {
	let so = sudo.compress(sudocu).slice(1,10);			
	let sn = so.map(na => na.reduce((n1,n2) => (n1*1)+(n2*1)));
	let su = ('0'+ so.join('|').replace(/[,0]/g,'').split('|')
				.map(na => {vp={}; na.split('').map(nb => {nb=nb*1; if(!vp[nb])vp[nb]=0;vp[nb]++;}); return(vp)})
				.map(na => Object.values(na).filter(nb => nb > 1)+'').join(''))*1;
	if(!su && sudocu[0]===81) {
		let sm = sn.filter(na => na !== 45);
		return(sm.length); 
	}
	return(su);			
}

sfield = (nn, sudoku) => {
	if(sudoku.length < 82) sudoku.unshift(81);
	if(typeof(window._take) === 'undefined') 
		window._take = sudo.res.slice(1).map(na => na.split('|')[1].split(',').map(na => na*1));
	let data = window._take[nn-1].map(na => sudoku[na]).map(na => na*1);
	let diff = sudo.diffn9(data).join('');
	return diff;
}

let res=[], col=[], row=[], ber=[], nn=0, na=0, nb=0, i1=0, i2=0, i3=0; 
for(nn=0; nn < 81; nn++) {
	let s = (nn<9) ? '0'+(nn+1): nn+1; 		
	(!(nn%9)) ? i1=1 : i1++; if(!(nn%9)) i2++;
	(!(nn%9)) ? nb=1 : (!(nn%3)) ? nb++ : 0;  
	if(nn==27|nn==54) na+=3; i3 = na+nb; 
	if(!col[i1]) col[i1] = []; col[i1].push(s);   
	if(!row[i2]) row[i2] = []; row[i2].push(s);   
	if(!ber[i3]) ber[i3] = []; ber[i3].push(s);   
	res[res.length] = {id:s, col:i1, row:i2, ber:i3, let:i1+''+i2+''+i3};
}
fill09 = row[1].map(na => na*1);
fill81 = res.map(na => na.id*1);
fempty = ['',filler(['---------'], 9).join('|'),'0'].join('|');

res = res.map(na => [na.id, sort((row[na.row]+','+col[na.col]+','+ber[na.ber]).split(',')), na.let].join('|'));
col[0] = 9; ber[0] = 9; row[0] = 9; res.unshift(81);
cols = stretch(col).map(na => na*1); bers = stretch(ber).map(na => na*1); rows = fill81;  
cols[0] = 81; bers[0] = 81; rows.unshift(81);

res = {res, col, row, ber, cols, rows, bers, fill09, fill81, fempty}; 	     				  		
Object.keys(res).map(na => sudo[na] = res[na]);

res = {pad, unique, sort, diff, diffn9, trans, stretch, compress, checkOne, checkAll, result, rand, nrand, time, capFirst, loop, sfield};  
Object.keys(res).map(na => sudo.__proto__[na] = res[na]);

if (typeof(window) === 'undefined') {module.exports = sudo; global.window = global;}
window.sudo = sudo; 