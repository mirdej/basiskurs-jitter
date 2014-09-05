var currentparam = "";
var x = 12;
var y;
var objects = new Array();

function clear(){
	while(objects.length) {
		this.patcher.remove(objects.pop());
	}
	this.patcher.remove(objects.pop());
}

function paramlist (l) {
	clear();

	y = 200;
	
	for (var i = 0; i < arguments.length; i++) {
		if ((arguments[i] != "tex0") && (arguments[i] != "tex1")) {
			currentparam = arguments[i];
			outlet(0,"getparamval",currentparam);
		}
	}
}

function paramval(l) {
	var a = null;
	var b = null;
	y += 22;
	var test;
	for (var i = 0; i < arguments.length; i++) {
	if (arguments[i].toString().indexOf(".") === -1) {
			arguments[i]+=".";
	}
	}
	a = patcher.newobject("comment", x,y,100,12,currentparam);
 	objects.push(a);
	a = patcher.newdefault(x,y,"pak", "param", currentparam, arguments[0],arguments[1],arguments[2],arguments[3]);
	a.hidden = true;
 	objects.push(a);
 	b = patcher.newdefault(x,y,"send","to_slab");
 	b.hidden = true;
 	patcher.hiddenconnect (a, 0, b, 0);
	objects.push(b);
	
 	for (var i = 0; i < arguments.length; i++) {
 		b = patcher.newdefault(x + 100 + i*48,y,"flonum");
 		b.message("set",  parseFloat(arguments[i]));
 		patcher.hiddenconnect (b, 0, a, i+2)
	 	objects.push(b);
	}
 	
}

