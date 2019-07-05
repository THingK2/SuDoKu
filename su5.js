var take1  = {rect:'Rect', grid:'Rect', circ:'Circle', text:'Text'};
var take2  = {base:'Rect'};
var width  = window.innerWidth;
var height = window.innerHeight;

var stage
var layer1
var layer2

var make = () => {
	stage  = new Konva.Stage({container: 'container', width, height});
	layer1 = new Konva.Layer();
	layer2 = new Konva.Layer();

	stage.add(layer2, layer1);
	layer1.add(label, text1, text2, text3, textM, textN, sla);

	Object.keys(take2).map(na => window[na].va=window[na].va.map(rt => {var vo; layer2.add(vo = new Konva[take2[na]](rt)); rt.vo=vo; return rt}))
	Object.keys(take1).map(na => window[na].va=window[na].va.map(rt => {var vo; layer1.add(vo = new Konva[take1[na]](rt)); rt.vo=vo; return rt}))

	window['circ'].va.map(rt => rt.vo.hide());
	window['text'].va.map(rt => rt.vo.hide());
	window['grid'].va.map(rt => rt.vo.hide());

	rX( 0, 0, 900, 900, '', 'black', 4);
	layer1.draw(); layer2.draw();
}
make();
