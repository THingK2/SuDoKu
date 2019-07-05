var width = 900;
var va = [], vb = [], vc = [], vg = [], flag=true, id=0;
var rd = n => Math.round(n*1000,3)/1000;

vg.push({type:1, id:10, x1:0, y1:0, x2:width, y2:width, ca:0, cb:'black', ws:1, flag:flag=!flag});
nn = width / 27; 
	for(id=11, n1=0, nc=0, nb=0; nb < 3; nb++) 
		for(na=0; na < 3; na++, nc++) 
			vg.push({type:5, id:++id, x1:rd(n1*3*nn+nn*na+2+width+10), 	y1:rd(nn*nb+12), 
										x2:rd(nn-4), 			    y2:rd(nn-4), 
										cb:'cyan', ca:flag?'lightgray':'gray', ws:1, flag:flag=!flag});
vg.push({type:1, id:11, x1:910, y1:10, x2:100, y2:100, ca:0, cb:'black', ws:1, flag:flag=!flag});

va.push({type:1, id:0, x1:0, y1:0, x2:width, y2:width, ca:'green', cb:'black', ws:4, flag:flag=!flag});
nn = width / 3; 
for(id=0, nb=0; nb < 3; nb++) 
	for(na=0; na < 3; na++) 
		va.push({type:2, id:++id, x1:nn*na, y1:nn*nb, x2:nn, y2:nn, ca:'cyan', cb:'blue', ws:2, flag:flag=!flag});
nn = width / 9; 
for(id=0, nb=0; nb < 9; nb++) 
	for(na=0; na < 9; na++)
		vb.push({type:3, id:++id, x1:nn*na+1.5, y1:nn*nb+1.5, x2:nn-3, y2:nn-3, ca:'white', cb:'gray', ws:1, flag:flag=!flag, name:'F'+na+nb});
nn = width / 27; 
for(n3=0; n3 < 3; n3++) 
for(n2=0; n2 < 3; n2++) 
for(n1=0; n1 < 9; n1++) 
	for(id=0, nc=0, nb=0; nb < 3; nb++) 
		for(na=0; na < 3; na++, nc++) 
			vc.push({type:5, id:++id, x1:rd(n1*3*nn+nn*na+2), 	y1:rd(n3*9*nn+n2*3*nn+nn*nb+2), 
										x2:rd(nn-4), 			    y2:rd(nn-4), 
										cb:'cyan', ca:flag?'white':'yellow', ws:1, flag:flag=!flag});
var rect = va => {return({
	x: 			 va.x1,
	y: 			 va.y1,
	width: 	 	 va.x2,
	height:		 va.y2,
	fill: 		 va.ca,
	name: 		 va.name||'rect',
	draggable:   false,
	stroke: 	 va.cb,
	strokeWidth: va.ws,
	type:		 va.type
})};
var circ = va => {return({
	x: 			 va.x1 + va.x2*0.5,
	y: 			 va.y1 + va.y2*0.5,
	radius: 	 (va.x2 >>1) * 0.8,
	fill: 		 'lightgray',
	name: 		 'C'+(va.id<=9)?'0'+va.id:va.id,
	draggable:   false,
	stroke: 	 0,
	strokeWidth: va.ws,
	type:		 va.type
})};
var text = va => {
	var si = 36, text = (va.id<=9)?'0'+va.id:va.id;
	return({
	x: 			 va.x1 + 33,
	y: 			 va.y1 + 33,
	fontFamily:  'Calibri', 
	fontSize: 	 si, 
	fill: 		 'green',
	name: 		 'C'+((va.id<=9)?'0'+va.id:va.id),
	draggable:   false,
	text:		 '',
	type:		 va.type
})};
va = va.concat(vb);	
vc = vc.map(nb => rect(nb));

window['base']  = {va:vg.map(nb => rect(nb)), width};
window['rect']  = {va:va.map(nb => rect(nb)), width};
window['grid']  = {va:vc, width};
window['circ']  = {va:vb.map(nb => circ(nb)), radius:width/18};
window['text']  = {va:vb.map(nb => text(nb)), size:36};