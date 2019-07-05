var kr, ks={}, rA, rB, rX, mX, mousePos; var group = new Konva.Group();
var tX = (x,y,font,si,ci) => {return(new Konva.Text({x, y:900+y, fontFamily:font, fontSize:si, text:'', fill:ci}))}
var label = tX(10,10,'Calibri', 20,'black');
var text1 = tX(310,10,'Calibri',20,'gray');
var text2 = tX(510,10,'Calibri',20,'black');
var text3 = tX(510,10,'Calibri',20,'green');
var textM = tX(810,10,'Calibri',20,'green');
var textN = tX(10,40,'Calibri', 20,'black'); group.add(label, text1, text2, text3, textM, textN);
var writeMessage = message => {
	label.text('Output:');
	textM.text(''); text1.text(''); text2.text(''); text3.text('');
	if(mousePos) {
		if(/out/.test(message)) {
			textM.text(message); 
			if(/1$/.test(message))
				suNumb.map(nu => nu.show());
			else	
			if(/2$/.test(message))
				s1Numb.map(nu => nu.show());
			else	
				ssNumb.map(nu => nu.show());
			setTimeout(()=>suNumb.map(nu => nu.hide()), 500);
		}
		else {
			textM.text(mousePos.y+':'+mousePos.x); 
			if(/=/.test(message)) {
				text1.text('Fields value');
				text2.text(message);
			} else if(/:/.test(message)) {
				text1.text('Fields position');
				text3.text(message);
			}
		}
	}
	layer1.draw(); layer2.draw();
}
rMove = () => {
	var x,xx,x2,y,yy,y2,pa,pb,sa; mousePos = stage.getPointerPosition(); 
	if ( (mousePos.y > 900 || mousePos.x > 900) 
	&& (!(mousePos.x > 900 && mousePos.x < 1000 && mousePos.y < 100))) return;
	
	y  = ((mousePos.y+1000)+''), yy = y.substr(1,1)*1, y2 = y.substr(2)*1;
	x  = ((mousePos.x+1000)+''), xx = x.substr(1,1)*1, x2 = x.substr(2)*1;
	
	pa = yy*9+xx+1; 
	pb = (parseInt(y2/33)*3 + parseInt(x2/33+1)); if(pb > 9) pb = 9; 
	sa = pa+':'+pb; 
	sb = (sudoku && sudoku[pa-1]==0); 
	sa = (sb ? sa : pa+'='+sudoku[pa-1]); 
	ks = {sa, sb, pa, pb};
	
	document.body.style.cursor = sb ? 'crosshair': 'default';
	writeMessage(sa); 
}

rA = (nx,ny,nw,nh,cf,cs,ws,tx) => {return({x:nx, y:ny, width:nw, height:nh, fill:cf, stroke:cs, strokeWidth:ws, text:tx||'X', draggable:false})};
rB = (nx,ny,nw,nh,cf,cs,ws,tx) => {layer1.add(kr = new Konva['Rect'](rA(nx,ny,nw,nh,cf,cs,ws,tx))); return kr};
//	rY = sudo.takes[0];
rX = (nx,ny,nw,nh,cf,cs,ws) => {
	rB(nx,ny,nw,nh,cf,cs,ws);
	kr.on('mousemove', rMove)
	kr.on("mouseup", () => {
		ks.sa = (/up/.test(ks.sa))?ks.sa:'up: ' + ks.sa;
	})
	kr.on('mouseout', () => {
		var sa, mousePos = stage.getPointerPosition(); 
				                 if(mousePos.x <= 100) sa = 'out1'  
		else if(mousePos.x <= 200 && mousePos.x > 100) sa = 'out2'  
		else if(mousePos.x <= 300 && mousePos.x > 200) sa = 'out3'  
		
		else if(mousePos.x < 900 && mousePos.y > 900) sa = 'out1'  
		else if(mousePos.y < 900 && mousePos.x > 900) sa = 'out2'  
		else if(mousePos.x > 900 || mousePos.y > 900) sa = 'out3'  
		else sa = ks.sa;
		writeMessage(sa); 
		document.body.style.cursor = 'default';
	})
	stage.on('click tap', e => {
		let va, ka, nc; 
		if(!ks.sb) return;
		if(/:/.test(ks.sa)) {
			writeMessage('click ' + ks.sa);
			ka = ks.sa.split(':'); nc = ka[1]*1-1; 
			sudoku[nc] = ka[2]*1;
			window['grid'].va.slice(nc*9,(nc*9)+9).map(na => na.vo.hide());
			window['circ'].va[nc].vo.show();
			va = window['text'].va[nc]; va.text = sudoku[nc]; va.fontSize = 46; va.fill='white'; 
			suText[nc] = layer1.add(new Konva.Text(va));
		}
		if(/=/.test(ks.sa)) {
			writeMessage('unclick ' + ks.sa);
		}
		layer1.draw(); layer2.draw();
	})
}
var first = () => {
	vu = sudo.takes[0]; suNumb=[]; s1Numb=[]; ssNumb=[]; 
	for(nc=0; nc < 81; nc++) {
		let va, vb=[], vc, nu;
		if(sudocu[nc] > 0) {
			va = window['text'].va[nc]; va.text = sudocu[nc]; va.y-=6; va.x+=3; va.fontSize = 46, 
			layer1.add(vb[nc] = new Konva.Text(va));
		}
		if(sudoku[nc] > 0) {
			window['circ'].va[nc].vo.show();
		} else {
			vb[nc].hide(); 
			vu[nc+1].map(nu => {
				vc = window['grid'].va.slice(nc*9)[nu-1];
				va = window['text'].va[0]; va.text=nu; va.y=vc.y; va.x=vc.x; va.fontSize = 36, va.fill='gray'; 
				layer1.add(vb = new Konva.Text(va));
				suNumb[suNumb.length] = vb;
				if(vu[nc+1].length==1)
					s1Numb[s1Numb.length] = vb;
				if(nu == sudocu[nc])	
					ssNumb[ssNumb.length] = vb;
				vb.on('mousemove', rMove);
				vb.hide();
			})
			window['grid'].va.slice(nc*9,(nc*9)+9).map(na => na.vo.show());
		}
	}
	layer1.draw(); layer2.draw();
}
var sla = new Konva.Label({x: 0, y:900, opacity: 0.50})
sla.add(new Konva.Tag({fill: 'gray' }))
sla.add(new Konva.Text({text: 'Output:'+(' '.repeat(40)), fontFamily: 'Calibri', fontSize: 24, padding: 5, fill: 'yellow'}))
