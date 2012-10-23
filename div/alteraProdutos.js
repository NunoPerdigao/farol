var cradle = require('cradle');var fs = require("fs");var sys = require("sys");
var conn =new(cradle.Connection)('http://localhost', 5984, {cache: true, raw: false});

var db = conn.database('farol');



db.view('appV/categoriasLista', {startkey:["Complementos","A"],endkey:["Complementos",{}]},function (err, res) { 


    
    for(var i=0;i<res.length;i++) {
	    
    	//console.log(res[i]);
	db.get(res[i].id , function (err, doc) {
		doc.impressoraPedido="complemento";
		db.save(doc);
   		 sys.puts(doc.categoriaProduto);
	
		});
    	
    	/*
    	//node alteraProdutos.js  | grep cozinha

    	db.merge(res[i].id , {"impressoraPedido": "cozinha"}, function (err, res) {
});
*/
    	
    

    
	}
});


