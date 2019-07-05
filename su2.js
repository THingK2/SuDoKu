if(typeof(window) === 'undefined') require('./su1.js');
var psolver = (sudoku, count) => {
	var nc, nn, sp, vb, vc, vm, vo, vp=[], take, sudocu, sudo = window.sudo;
	sudocu      = sudo.trans(sudoku); sudocu.unshift(81);
	sudo.solve  = Array.from(sudocu);
	sudo.suvo   = Array.from(sudocu);

	sudo.gener = !sudo.solve.slice(1).reduce((na,nb) => na+nb); 
	if(sudo.gener) {
		nn = 0; sudocu[0] = 0; 
		while(nn < count) {
			nc = sudo.nrand(81); vm = sudo.sfield(nc, sudocu).split('').map(na => na*1); 
			nb = (sudo.rand(vm.length)[0])-1; 
			na = vm[nb]; 
			if(!isNaN(na)) {
				sudocu[0]  = ++nn; 
				sudocu[nc] = na; 
			}  
		}
		if(sudo.checkAll(sudocu)) return {suvo:[0,0]};

		sudoku = sudo.pad(sudo.compress(sudocu).slice(1).join('|').replace(/,/g,''),'||').replace(/0/g,'-') +sudocu[0];
		sudocu      = sudo.trans(sudoku); sudocu.unshift(81);
		sudo.solve  = Array.from(sudocu);
		sudo.suvo   = Array.from(sudocu);
	}

	take = sudo.res.slice(1).map(na => na.split('|')[1].split(',').map(na => na*1));
	nc = 0; nn = 0; sudo.suvo = take.map(na => {nn++; if(!sudocu[nn]) return 0; nc++; return sudocu[nn]+'Z'+sudocu[nn]}); 
	sudo.solve[0] = nc; sudo.suvo.unshift(nc); take.unshift(nc); sudocu[0] = nc; sudo.takes = [], loop=0, count=0;
	
	do {
		vp = []; sudo.nc = 0; sudo.takes[loop] = sudo.suvo.map(na => 0);
		for(nn = 1; nn <= 81; nn++) {
			if(!sudo.solve[nn]) {
				vo = sudo.diffn9(take[nn].map(na => sudo.solve[na])).join('');
			//	vm = sudo.sfield(nn, sudo.solve);
			//	if(vm !== vo) console.log(vm, vo);
				switch(vo.length) {
					case 0: 	break;
					case 1:		vp[vp.length] = {nn, vo}; 
								break;
					default:	sudo.suvo[nn] = 'N'+vo; 
								sudo.takes[loop][nn] = vo.split('').map(na=> na*1);
				}
				if(!vo.length)break;
		}}
		vp.map(va => {
			sudo.suvo[va.nn]  = va.vo+'H'+va.vo; 
			sudo.solve[va.nn] = va.vo*1;
			sudo.takes[loop][va.nn] = [va.vo*1];
			sudo.nc++;	
		})
		if(!sudo.nc && sudo.suvo[0] < 81) {
			vp = []; 
			vo = sudo.compress(sudo.suvo);
			vc = sudo.rows.map(na => sudo.suvo[sudo.cols[na]]); vc[0] = vo[0]; vc = sudo.compress(vc);
			vb = sudo.rows.map(na => sudo.suvo[sudo.bers[na]]); vb[0] = vo[0]; vb = sudo.compress(vb);

			for(nn=0; nn < 9; nn++) {
				sp = sudo.checkOne(vo[nn+1], nn*9, sudo.rows); if(sp) vp.push(sp);
				sp = sudo.checkOne(vc[nn+1], nn*9, sudo.cols); if(sp) vp.push(sp);
				sp = sudo.checkOne(vb[nn+1], nn*9, sudo.bers); if(sp) vp.push(sp);
			}
			vp = (vp+'').split(',').map(na => na.split('=').map(na => na*1)); 
			vp.map(na => {
				if(na.length < 2) return;
				if(/X/.test(sudo.suvo[na[0]])) return; 
				sudo.nc++; count++; 
				sudo.solve[na[0]]    = na[1];
				sudo.suvo[na[0]]     = na[1] +'X'+ na[1]
				sudo.takes[0][na[0]] = [na[1]*1];
			})
		}
		loop++; 
		if(isNaN(sudo.solve[0]))
			err=1;
		if(sudo.nc) {
			sudo.solve[0] += sudo.nc;
			sudo.suvo[0]  += sudo.nc; 
		}
	}
	while(sudo.nc);

	sudo.takes=sudo.takes.map(na => {na[0]=na.filter(nb => nb!==0).length; return na});
	if(sudo.takes[sudo.takes.length-1][0]==0) sudo.takes.pop();

	sudo.suvo   = [sudo.solve[0], sudo.solve.slice(1).reduce((na,nb) => na+nb)];
	sudo.sudoku = sudoku.split('|'); sudo.sudoku[0]=''; sudo.sudoku=sudo.sudoku.join('|');
	sudo.sudocu = sudo.pad(sudo.compress(sudo.solve).slice(1).join('|').replace(/,/g,''),'||');
	return sudo;
}

var solver = (sudoku, count=28) => {
	let su, sa, sb, nc; sudo.loop=0;
	do {
		su = psolver(sudoku, count); nc = 0;
	    if(su.suvo[0] === 81 && su.suvo[1] === 405) {
			if(!sudo.checkAll(su.solve)) {
				sa = sudo.compress(sudo.solve).slice(1);
				sb = sa.map(na=> (('0'+sudo.diffn9(na)).replace(/,/g,'.'))*1);
				sb.map(na=> (na > 0)?nc++:0)
				if(!nc) break;
			}
		}	
		sudo.loop++;
	} while(true)
}

window.sudo.__proto__['solver'] = solver;