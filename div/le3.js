var assert = require("assert"),
        sys = require("sys"),
        flr = require("./FileLineReader");

var cradle = require('cradle');


var db = new(cradle.Connection)().database('prodsfarol');
//var db = new(cradle.Connection)().database('restaurante');
var ct=[];
ct["100"] = "ENTRADAS            " 
ct["101"] = "Complementos        " 
ct["102"] = "Entradas            " 
ct["103"] = "Sopas               " 
ct["200"] = "PRATOS              " 
ct["201"] = "Petiscos/Grill      " 
ct["202"] = "Mariscos            " 
ct["203"] = "Peixes              " 
ct["204"] = "Carnes              " 
ct["300"] = "BEBIDAS             " 
ct["301"] = "Refrigerantes       " 
ct["400"] = "VINHOS              " 
ct["401"] = "V.Verde Branco      " 
ct["402"] = "V.Verde Tinto       " 
ct["403"] = "V.Maduro Branco     " 
ct["404"] = "V.Maduro Tinto      " 
ct["405"] = "Espumantes          " 
ct["500"] = "SOBREMESAS          " 
ct["501"] = "Sobremesas          " 
ct["502"] = "Gelados             " 
ct["600"] = "CAFETARIA           " 
ct["601"] = "Cafetaria           " 
ct["700"] = "E.L.G               " 
ct["701"] = "Whiskies            " 
ct["702"] = "Aguardentes         " 
ct["703"] = "Licores             " 
ct["800"] = "TELEFONE            " 
ct["801"] = "Telefone            " 
ct["2400"] = "DIVERSOS            " 
ct["2401"] = "diversos            " 







var imp=[];
imp["4"] ="Balcao        ";
imp["6"] ="Balcao        ";
imp["5"] ="Cozinha       ";
imp["3"] ="Bar           ";
imp["7"] = "Balcao+Coz";
imp["8"] ="Balcao+Coz" ;
imp["9"] ="Balcao+Bar" ;
imp["11"]="Balcao+Coz+Bar" ;




var reader = new flr.FileLineReader("prod.txt", 126);
while(reader.hasNextLine()) { 
	var sd=reader.nextLine();
	var a1 = sd.slice(7,11);
	var a2= sd.slice(18,21);
//	var a3= sd.slice(21,40);
	var a3= sd.slice(61,74)
	var a4= sd.slice(120,124);
	var a5= sd.slice(124,126);
	var a6= sd.slice(130,138);
	var a7=parseFloat(a6);
	//var a8= ct[a2];
	var a8= a2;


	
	if(a1!="   0"){
              if(ct[a2]!=undefined  && imp[a5.replace(/^\s+|\s+$/g,"")]   ){
		//if(a7>60)	console.log((parseInt(a1)).toString()+" ->  "+ct[a2]+"  - "+a3+" - " +a4+" - "+a5+" - "+a6 );
		if(true &&  a2=="205")         console.log(((parseInt(a1))+"        ").substring(0,7) +" ->  "+ct[a2]+"  - "+a3  +" - " +a4+" |"+imp[a5.replace(/^\s+|\s+$/g,"")]+"- "+a6 );

console.log((parseInt(a1)).toString()+" ->"+ct[a2]+"  -"+a3+" ~-" +a4+" -"+a5+" -"+a6+" impressora -"+imp[a5.replace(/^\s+|\s+$/g,"")] );
//console.log(a1.replace(/^\s+|\s+$/g,"") );

                  db.save( {

				impressoraPedido : imp[a5.replace(/^\s+|\s+$/g,"")],//.replace(/^\s+|\s+$/g,""),	

	    			codProduto : a1.replace(/^\s+|\s+$/g,""),
	    			categoriaProduto :ct[a2].replace(/^\s+|\s+$/g,""),
	    			nomeProduto : a3,
    				preco : a7,
				type: "produto"

			}, function (err, res) {
    				// Handle response
			});
     

	      	}
		else console.log((a1+"        ").substring(0,7) +" XXX->  "+ct[a2]+"  - "+a3+" - " +a4+" - "+a5+" - "+a6 );

}




}

