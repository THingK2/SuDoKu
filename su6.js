suDOKU = "|-----2947|8-2-76-5-|971--3--8|12-5---7-|-9-738---|58----439|2-6-1-59-|---29-7-3|--93-41--|40";
suDOKU = "|67------5|---4-5-79|-8-3---2-|-5---41--|-91---7-4|3----1---|--5-86-3-|---27--6-|--8----1-|28";
suDOKU = sudo.fempty;

var pa = su => {
	sudoku = sudo.sudoku.replace(/\|/g,'').replace(/\-/g,'0').substr(0,81).split('');
	sudocu = sudo.sudocu.replace(/\|/g,'').replace(/\-/g,'0').substr(0,81).split('');
	suText = Array.from(sudoku);
	first();
}

sudo.solver(suDOKU); 
pa(sudo.sudoku);

setTimeout(()=>{
	location.reload(true);
}, 10*1000); 
