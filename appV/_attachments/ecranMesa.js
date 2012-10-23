
/*

var strRestNome="Restaurante  O Alves";

var cabecFactura=
("\x1b\x40\x1b\x63\x34\x02\x1b\x74\x03\x1b\x45\x00\x1b\x2d\x00\x1b\x21\x00\x1b\x45\x01Restaurante O Alves"+
		 "\x0d\x0a\x1b\x45\x00Gentes & Costumes - Restauracao Lda"+
		 "\x0d\x0aAv Combatentes da Grande Guerra, 124/140\x0d\x0a4450-693 Le\u001b\u0087a d Tel.229954226"+
		 "\x0d\x0aN.Contrib. 509235719\x0d\x0aRegisto na Cons. Porto n.509235719");


var txtA=
[
	["Sopa","Peixe","Carne"],
	["V.Mad Branco","V.Mad Tinto","V.Verde Branco","V.Verde Tinto","Refrigerante"],
	["Entradas"],
	["Sobremesa","Gelados"],
	['Cafés'],
	["Aguardentes","Whisky's","Champagne","Licores"],
	["Complementos","Acompanhamento","Telefone"]
    ]

var textD=["Pratos", "Bebidas", "Entradas",  "Sobremesa", 
	       "Cafetaria", "E.L.G.",  "Diversos"];

	       	      
var cats4=
["Entradas", "Sopa","Peixe","Carne",
	 "V.Mad Branco","V.Mad Tinto","V.Verde Branco","V.Verde Tinto","Refrigerante",
	 "Complementos","Acompanhamento","Telefone","Sobremesa","Gelados",
	 "Aguardentes","Whisky's","Champagne","Licores", "Cafés",""
	];
	


*/


var strRestNome="Restaurante  O Farol";


var cabecFactura=("\x1b\x40\x1b\x63\x34\x02\x1b\x74\x03\x1b\x45\x00\x1b\x2d\x00\x1b\x21\x00\x1b\x45\x01Restaurante O Farol"+
		 "\x0d\x0a\x1b\x45\x00Farol de Le\u001b\u0087a / A Boa Nova"+
		 "\x0d\x0a\x1b\x45\x00Cervejaria Restaurante, Lda"+
		 "\x0d\x0aRua Sarmento Pimentel, 354\x0d\x0a4450 Tel.229969626"+
		 "\x0d\x0aN.Contrib. 503974064\x0d\x0aRegisto na Cons. Porto n.00794");

var txtA=[
	["Sopas","Peixes","Carnes","Mariscos","Petiscos/Grill","Serve/Casa"],
	["V.Maduro Branco","V.Maduro Tinto","V.Verde Branco","V.Verde Tinto","Refrigerantes","VINHOS"],
	["Entradas"],
	["Sobremesas","Gelados"],
	['Cafetaria',"CAFETARIA"],
	["Aguardentes","Whiskies","Espumantes","Licores", "E.L.G"],
	["Complementos","Acompanhamento","Telefone","Mensagens","diversos"]
    ]

var textD=["Pratos", "Bebidas", "Entradas",  "Sobremesa", 
	       "Cafetaria", "E.L.G.",  "Diversos"];
 var cats4=
	["Entradas", "Sopas","Peixes","Carnes","Mariscos","Petiscos/Grill","Serve/Casa",
	 "V.Maduro Branco","V.Maduro Tinto","V.Verde Branco","V.Verde Tinto","Refrigerantes","VINHOS",
	 "Complementos","Acompanhamento","Telefone","Sobremesas","Gelados",
	 "Aguardentes","Whiskies","Espumantes","Licores", "E.L.G",'Cafetaria',"CAFETARIA",""
	];


function ecranMesa(nc,nl,empregado,doc,mesa,mesasEmp,perm1,perm2){

    //console.log('empregado  ' +empregado+'  mesa '+mesa);
    var d="café";
    //    console.log(d);    
    var t1 = new tabela("tabelaPedido2");
    var node1=$("body");
    t1.criaTabela(node1,10,504,230,175);

    var t2 = new tabela("tabelaPedido3");
    t2.criaTabela(node1,225,504,230,324);

    db.view("appV/mesasAbertas",{ 
	"key":mesa,
	success: function(data){
	    //TODO : certificar se entretanto nao foi aberta
	    //mostra o conteudo da mesa na tabela
	    if(data.rows.length>0){
		var l1= data.rows[0].value.linhaConta;
		console.log("===========");
		console.log(data.rows[0].value);
		doc=data.rows[0].value;
		for(var i =0;i<l1.length; i++){
		    var pl=produtoObj(l1[i].codProduto);
		    var ql=(l1[i].quantidadeLinha);
		    var hl=(l1[i].hora);
		    var al=(l1[i].anulacao);
		    var prd={
				codProduto		: pl.codProduto,		    
				nomeProduto		: pl.nomeProduto ,	    
				preco			: l1[i].preco,
				categoriaProduto	: pl.categoriaProduto,
				impressoraPedido	: pl.impressoraPedido,
				categoriaProduto	: pl.categoriaProduto
			    }

		    // altera o preco em memoria pelo preco na mesa
		    // pl.preco=(l1[i].preco);
	    	    t2.insereLinhaNaoProcessado(prd,ql*100,al,hl);
		}	
	    }    
	    //state machine no ficheiro pedido.js
	    // maquina de estados do teclado para os pedidos
	    var svg = $($('#camada1')).svg('get');  
	    var mu=
		{'empregado':empregado , 
		 'mesa':mesa,'permissao': perm1,
		 'permissao2': perm2 ,'doc':doc };
	    var o={};
	    var tg= f1(o, t1,svg,t1,t2,mesasEmp,mu);
	    
	    //console.log("maq state")    
	    //console.log(o.ret())
	    // o é utlizado como callback para fazer o teardown

	    desenhaBarra(svg);
	    desenhaButaoRemoveLinha(o,t1,t2,empregado,doc,mesa,mesasEmp,perm1);
	    desenhaButaoRemoveQLinha(o,t1,t2,empregado,doc,mesa,mesasEmp,perm1);
	    desenhaButoesArtigos(o,t1,t2);
	    if(perm2)
		desenhaButaoAnulacao (o,t1,t2,empregado,doc,mesa,mesasEmp,perm1);
	    if(perm1)
		desenhaButaoTransferencia  (o,t1,t2,empregado,doc,mesa,mesasEmp,perm1);
	    desenhaButaoConta(o,svg,t1,empregado,mesa,doc,mesasEmp,perm1) ;
	    desenhaButaoFactura (o,svg,t1,t2,empregado,mesa,doc,mesasEmp,mu,perm1) ;
	    
	    desenhaNomeMesa(empregado,mesa,doc);
	    desenhaTotal(o,empregado,mesa,doc);
	   
	    if(perm2)
	    desenhaButaoPedido   (o,t1,t2,empregado,doc,mesa,mesasEmp,perm1,perm2);
	    desenhaHora(o,svg,t1); 
	},
	// mesmo que nao 
	error   : function() {
	    alert('nao consegui inseir documento.' );
	    constroiQuadroEmpregados();	    
	}	
    });
}


function desenhaButoesArtigos(o,t1,t2){

    //botoes artigos
    var svg = $($('#camada1')).svg('get');  
    var gr = svg.group();    
   
    console.log(txtA[4]);
    var gT = svg.group({
	id		: 'svgPrimeiraClass',
	stroke		: 'black',
	strokeWidth	: 2
    });

    for(var i=0;i<textD.length;i++ )
    {
	var gP = svg.group(gT,{
	    id         : 'svgaCs',
	    stroke     : 'black',
	    strokeWidth: 2
	});

	svg.rect(gP, 10 ,95+(i*50),140,42, {
	    // fill: 'url(#myGrad'+i+")", 
	    id			: 'svg_5',
	    "rx"		: "3","ry": "3",
	    fill		: '#646D7E',  
	    stroke		: '#000000',
	    strokeLinejoin	: 'round',   
	    strokeWidth		: 2
	});




	svg.text(gP,75 ,125+(i*50),textD[i], {
	    id            : 'svg_t1',
	    "text-anchor" :"middle",
	    fontFamily    : "serif",
	    strokeWidth   : "0" ,
	    strokeLinecap : "null" ,
	    fontSize      : "24", 
	    fill          : "black"
	});   
	
	gP.onclick = function(){
	    var this_txtAi=txtA[i];
	    return function(){
		$("#svgPrimeiraClass g ").removeClass("selected");
		$(this).addClass("selected");
	 	$("#svgSegundaClass").remove();
 		segundaClass (o,t1,svg,this_txtAi)
	    }
	}();  
    }
    segundaClass (0,t1,svg,txtA[0]);
    $("#svgPrimeiraClass :first ").addClass("selected");
}




function segundaClass (o,t1,svg,txtA){
    
    var gS = svg.group(
		       {
			   id         : 'svgSegundaClass',
			   stroke     : 'black', 
			   strokeWidth: 2
		       });
    for(var i=0;i<txtA.length;i++ ){
	
	var gA = svg.group(gS,
			   {
			       id         : 'svgSegundaClassButao',
			       stroke     : 'black',
			       strokeWidth: 2
			   });
	/*
	var defs = svg.defs(gA); 
	svg.linearGradient(defs, 'myGradSeg'+i, 
			   [[0, 'white'], [1, '#646D7E	']], 450,85+(i*50), 450, 115+(i*50), 
			   {gradientUnits: 'userSpaceOnUse'});
	
	*/
	svg.rect(gA, 155 ,95+(i*50),140,42, 
		 {
		     id			: 'svg_39',
		     fill		: "#646D7E" , // 'url(#myGradSeg'+i+")",
		     "rx"		: "3",
		     "ry"		: "3",
		     strokeLinejoin	: 'round',
		     stroke		: '#000000',
		     strokeWidth	: 2
		 });
	var tamF = "24";
	if(txtA[i].length >11) tamF = "20"; 
	svg.text(gA,225 ,125+(i*50),txtA[i], 
		 {
		     id            : 'svg_s1',
		     "text-anchor" :"middle",
		     fon           : "serif",
		     strokeWidth   : "0" ,
		     strokeLinecap : "null" ,
		     fontSize      : tamF,
		     fill          : "black"
		 }
		);

  	gA.onclick = function(e){
	    var this_t=txtA[i];
	    return function(){
		$("#svgSegundaClass g ").removeClass("selected");
		$(this).addClass("selected");
		var numPrdLinha=12;
		$("#svgTerceiraClass").remove();
		db.view("appV/categoriasLista", 
			{startkey: [this_t," "],endkey: [this_t,"ZZZZZZZ"],
			 "limit" : numPrdLinha,
			 success: function(data){
			     //console.log(this_t+"   pppp" );
			     //	console.log(data.rows );
			     if(data.rows.length>0){
				 if(data.rows[numPrdLinha-1]!=undefined)
 				     terceiraClass (o,t1,svg,data.rows,data.rows[0].value.nome,
						    data.rows[numPrdLinha-1].value.nome,
						    this_t,numPrdLinha);
				 else
				     terceiraClass (o,t1,svg,data.rows,data.rows[0].value.nome,
						    data.rows[0].value.nome,this_t,numPrdLinha);
			     }
			 },
			 error   : function() { alert('nao consegui inseir documento.' );}
			});
		//console.log("se "+this_t);
	    }
	}();
    }
    
    $("#svgTerceiraClass").remove();
    db.view("appV/categoriasLista", 
	    {startkey: [txtA[0]," "],endkey: [txtA[0],"ZZZZZ"],
	     limit : 12,
	     success: function(data){
		 //console.log(data);
		 //console.log(data.rows );
		 if(data.rows.length>0){

		     if(data.rows[12-1]!=undefined)
			 terceiraClass (o,t1,svg,data.rows,data.rows[0].value.nome,
					data.rows[12-1].value.nome,txtA[0],12);
		     else
			 terceiraClass (0,t1,svg,data.rows,data.rows[0].value.nome,
					data.rows[0].value.nome,txtA[0],12);
		 }
	     },
	     error   : function() { alert('erro view categorias.' );}
	    });
    
    $("#svgSegundaClass :first ").addClass("selected");
}



// key ->categoriaProduto -- categoria selecionada na segundaClass
function terceiraClass(o,t1,svg,txtB,primeiro,ultimo,key,numeroLinhas){

    $("#svgTerceiraClass g ").remove();
    var gT = svg.group({
	id         : 'svgTerceiraClass',
	stroke     : 'black',
	strokeWidth: 2
    });
    
    var bCima = svg.group(gT,{
	transform   : "translate(-28, 0 ) ",
	id          : 'svgterceiraClassButaoC',
	stroke      : 'black',
	strokeWidth : 2
    });
    
    var rectCima=svg.rect(bCima, 431 ,540,95,36, {
	id               : 'svg_47',
	fill             : 'green', 
	"rx"             : "3",
	"ry"             : "3",
	'stroke-linejoin': 'round',
	stroke           : '#000000',
	'stroke-width'   : 2
    });

    svg.path(bCima, "M 453.5,570 l 50,0   l -25,-24 Z" ,  
	     {
		 style:"fill: #20ffa0 ; stroke: black;   stroke-width: 2px"
	     }) ;

    //console.log(txtB+"   popo"+key+" u "+ultimo );
    bCima.onclick = function(){
	var this_t=key;	
	var this_u=primeiro;
	if((primeiro).substring(0,3)=="1/2")
	    this_u=(primeiro).slice(3)+" 1/2";
	
	// console.log('startkey  '+ this_t+'  '+this_u );
	return function(){
	    var numPrdLinha=numeroLinhas;
	    $("#svgTerceiraClass").remove();
	    db.view("appV/categoriasLista", {
		startkey: [ this_t, this_u],endkey: [this_t," "],
		"limit" : numPrdLinha,
		descending : true,
		success: function(data){
		    if(data.rows.length>0){
			if(data.rows[numPrdLinha-1]!=undefined )
 			    terceiraClass (o,t1,svg,data.rows.reverse(),data.rows[0].value.nome,
					   data.rows[numPrdLinha-1].value.nome,this_t,
					   numPrdLinha);
			else
			    terceiraClass (o,t1,svg,data.rows.reverse(),data.rows[0].value.nome,
					   data.rows[0].value.nome, this_t,numPrdLinha);
		    }
		},
		error   : function() { alert('nao consegui ver view.' );}
	    });
	}
    }();
    
    var bBaixo = svg.group(gT,{
	transform   : "translate(-23, 0 ) ",
	id         : 'svgterceiraClassButaoB',
	stroke     : 'black',
	strokeWidth: 2
    });
    
    var rectBaixo=svg.rect(bBaixo, 326 ,540,95,36, {
	id		: 'svg_47',
	fill		: "green", 
	"rx"		: "3","ry": "3",
	strokeLinejoin	: 'round',
	stroke		: '#000000',
	strokeWidth	: 2
    });

    svg.path(bBaixo, "M 348.5,546 l 50,0   l -25,24 Z" , 
	     {
		 style:"fill: #20ffa0 ; stroke: black;   stroke-width: 2px"
	     }) ;


    bBaixo.onclick = function(){
	var this_t=key;
	var this_u=ultimo;
	if((ultimo).substring(0,3)=="1/2")
	    this_u=(ultimo).slice(3)+" 1/2";
	// console.log('startkey  '+ this_t+'  '+this_u );
	return function(){
	    var numPrdLinha=numeroLinhas;
	    $("#svgTerceiraClass").remove();
	    db.view("appV/categoriasLista", {
		startkey : [this_t,this_u],endkey: [this_t,"ZZZZZ"],
		"limit"  : numPrdLinha, 
		success  : function(data){
		    if(data.rows.length>0){
			if(data.rows[numPrdLinha-1]!=undefined )
 			    terceiraClass (o,t1,svg,data.rows,data.rows[0].value.nome,
					   data.rows[numPrdLinha-1].value.nome,
					   this_t,numPrdLinha);
			else
			    terceiraClass (o,t1,svg,data.rows,data.rows[0].value.nome,
					   data.rows[0].value.nome, this_t,numPrdLinha);
		    }
		},
		error   : function() { alert('nao consegui ver view.' );}
		
	    });
	}
    }();
    
    for(var i=0;i<txtB.length;i++ ){
	// desenha o botao da terceira coluna
	var gB = botaoTerceira(svg,gT,txtB,i);	

	gB.onclick = function(){
	    var this_t=txtB[i].value.codigo;
	    return function(){			
		var  ms =  parseInt(this_t).toString();
		var p1=produtoObj( ms.trim());
		var rq=centesimal("1");
		t1.insereProdutoQuantidadePedido(p1,rq);
	    }
	}();
    }
}


function botaoTerceira(svg,gT,txtB,i){

    var gB = svg.group(gT,{
	id		: 'svgterceiraClassButao',
	stroke		: 'black',
	strokeWidth	: 2
    });

    var myrect=svg.rect(gB, 300 ,60+(i*40),200,36, {
	id			: 'svg_47',
	fill		:   "#79bead",  	    //e6e6cc 
	"rx"		: "3","ry": "3",
	'stroke-linejoin'	: 'round',
	stroke		: '#000000',
	'stroke-width'	: 1
    });


    svg.text(gB,495 ,93 +(i*40),txtB[i].value.codigo, {
	id           : 'svg_s1',
	"text-anchor": "end",
	fontFamily   : "serif",
	strokeWidth  : "0" ,
	strokeLinecap: "null" ,
	fontSize     : "12", fill: "darkolivegreen"
    });


    svg.text(gB,400 ,82 +(i*40),txtB[i].value.nome.substring(0,18), {
	id           : 'svg_s1',
	"text-anchor": "middle",
	fontFamily   : "serif",
	strokeWidth  : "0" ,
	strokeLinecap: "null" ,
	fontSize     : "24", fill: "black"
    });

    return gB;
}


function desenhaNomeMesa( em,ms,doc ){
    
    var li=[] ;
    if (doc!=null)		li= doc.linhaConta;
    
    var svg = $($('#camada1')).svg('get');  
    var  gE = svg.group({
	id: 'titulo', stroke: 'black',strokeWidth: 2
    });

    svg.rect(gE, 30, 1, 94, 24, {
	"rx"			: 2,"ry":2,
	fill			: "gray",
	'stroke-linejoin'	: 'round',
	stroke			: 'black',
	'stroke-width'		: 1,
	opacity			: 0.5
    });
    svg.text(gE,33 ,22,em ,{
	fontFamily	: "Verdana",
	fontSize	: "24.5",
	fontWeight	:"bold", 
	fill		: "blue", 
	strokeWidth	:"0"
    });  

    svg.rect(gE, 130, 1, 44, 24, {
	"rx"			: 2,"ry":2,
	fill			: "gray",
	'stroke-linejoin'	: 'round',
	stroke			: 'black',
	'stroke-width'		: 1,
	opacity			: 0.5
    });
}


function desenhaTotal(o, em,ms,doc ){
    
    var li=[] ;
    if (doc!=null)		
	li= doc.linhaConta;
    
    var svg = $($('#camada1')).svg('get');  
    var  gE = svg.group({
	id: 'titulo', stroke: 'black',strokeWidth: 2
    });

    // rectangulo para apresentar o valor total na mesa
    var  gT = svg.group({
	id: 'tutalo', stroke: 'black',strokeWidth: 2
    });

    svg.rect(gT, 505, 560, 230, 35, {
	id               : 'recTotal',
	fill             : "white",
	strokeLinejoin   : 'round',
	stroke           : 'orange',
	strokeWidth      : 2
    });

    svg.text(gT,133 ,22,ms+"" ,{
	fontFamily: "Verdana",
	fontSize: "24.5",
	fontWeight:"bold", 
	fill: "blue", 
	strokeWidth:"0"});

    gT.onclick= function(){
	var that=this;
	return function(){
	    //    var lp=(tabela.retornaLinhas());	    
	    //    if (lp.length >0 ) {
	    // 	tabela.removeQuantidadeLinhaSelecionada(centesimal("1"));
	    //	tabela.removeLinhaSelecionada();
	    //	console.log($( tabela.daLinhaSelecionada()) );
	    //    }
	    o.pausa();
	    var tg = machMC (o, svg ,em,ms ,doc);	
	    // var tg=  machAnul( o,tabela,tabela2,svg ,mesasEmp,mu);	    
	}
    }();
    
    svg.text(gT,"TOTAL  ", {fontFamily: "serif","x" : "518","y" : "585",
			    strokeWidth : "0" ,strokeLinecap : "null",
			    strokeDasharray : "null", fontWeight:"bold" ,
			    strokeLinejoin : "null" , fontSize: "22"
			   });
    
    var f3= function (a){return a.precoLinha;};
    var t1=0.0;
    if (li.length>0) t1=li.map(f3).reduce(function  (a,b){return (a+b);}) ;
    
    svg.text(gT,t1.toFixed(2) , {fontFamily: "serif","x" : "730" ,"y" : "585" ,
				 strokeWidth : "0" ,strokeLinecap : "null",	
				 textAnchor	: "end",
				 strokeDasharray : "null",fontWeight:"bold" ,
				 strokeLinejoin : "null", fontSize: "22" 
				});
    
}


function desenhaButaoPedido(o,tabela,tabela2,empregado,doc,mesa,mesasEmp,permissao,perm2){

    var svg = $($('#camada1')).svg('get');  
    var  gE = svg.group({
	id: 'svgButPedido', stroke: 'black',strokeWidth: 2
    });

    var g2 = svg.group(gE,
		       {
			   id		: "aa",
			   stroke	: 'black',
			   strokeWidth	: 2
		       });
    var r3 = svg.rect(g2, 504, 185, 230, 40, {
	rx			: "3",
	ry			: "3",
	fill			: "darkgreen",
	'stroke-linejoin'	: 'round',
	stroke			: 'green',
	'stroke-width'		: 2
    });

    g2.onclick = function(){
	var that=this;
	return function(){
	    //console.log(tabela);
	    // lp linhas do pedido
	    var lp=(tabela.retornaLinhas());
	    tabela.remove();	    
	    tabela2.remove();
	    
	    var svg3 = $($('#camada1')).svg('get');  
	    svg3.clear();
	    	    
	    o.teardown();
	    if (lp.length >0 ) 
	    {
		fazPed(lp,empregado,doc,mesa,permissao,false, 
		       ecranMesa,[6,7,empregado,doc,mesa, 
				  mesasEmp ,permissao,perm2 ] );	   
		//	  console.log(lp);
		//		  console.log("p1p "+empregado);
		//		  console.log(doc);
		//		  console.log("p3p "+permissao);	
	    }
	    
	    else {
		constroiQuadroMesas(6,7,empregado,mesasEmp ,permissao);		
		
	    }
	}
    }();
}



function desenhaButaoRemoveQLinha (o,tabela,tabela2,empregado,doc,mesa,mesasEmp,permissao){

    var svg = $($('#camada1')).svg('get');  
    var  gE = svg.group({
	id		: 'svgButRemQL', 
	stroke		: 'black',
	strokeWidth	: 2
    });

    var g2 = svg.group(gE,{
	id		: "weqf2",
	stroke		: 'black',
	strokeWidth	: 2 
    });

    var r3 = svg.rect(g2, 737, 100, 60, 80, {
	rx			: "6",ry :"6",
	fill			: "grey",
	'stroke-linejoin'	: 'round',
	stroke			: 'orange',
	'stroke-width'		: 2
    });

    svg.text(g2,"1", {
      "x"		: "768" ,"y" : "157" ,
      fontFamily	: "Sans",
      textAnchor	: "middle",
      stroke		: 'none',
      strokeLinecap	: "null" ,
      fontSize		: "37.4", fill: "black"
    });
    
    g2.onclick = function(){
	var that=this;
	return function(){
	    var lp=(tabela.retornaLinhas());	    
	    if (lp.length >0 ) {
		tabela.removeQuantidadeLinhaSelecionada(centesimal("1"));
		//	tabela.removeLinhaSelecionada();
		//	console.log($( tabela.daLinhaSelecionada()) );
	    }	    
	}
    }();

}



function desenhaButaoRemoveLinha (o,tabela,tabela2,empregado,doc,mesa,mesasEmp,permissao){

    var svg = $($('#camada1')).svg('get');  
    var  gE = svg.group({
	id		: 'svgButRemLin', 
	stroke		: 'black',
	strokeWidth	: 2
    });

    var g2 = svg.group(gE,{
	id		: "weqf2",
	stroke		: 'black',
	strokeWidth	: 2 
    });

    var r3 = svg.rect(g2, 737, 15, 60, 80, {
	rx			: "6",ry :"6",
	fill			: "grey",
	'stroke-linejoin'	: 'round',
	stroke			: 'orange',
	'stroke-width'		: 2
    });

    svg.text(g2,"X", {
      "x"		: "768" ,"y" : "73" ,
      fontFamily	: "Sans",
      textAnchor	: "middle",
      stroke		: 'none',
      strokeLinecap	: "null" ,
      fontSize		: "37.4", fill: "black"
    });
    
    g2.onclick = function(){
	var that=this;
	return function(){
	    var lp=(tabela.retornaLinhas());	    
	    if (lp.length >0 ) {
		tabela.removeLinhaSelecionada();
	//	console.log($( tabela.daLinhaSelecionada()) );
	    }	    
	}
    }();

}



function desenhaButaoAnulacao (o,tabela,tabela2,empregado,doc,mesa,mesasEmp,permissao){

    var svg = $($('#camada1')).svg('get');  
    var  gE = svg.group({
	id		: 'svgButPedido2', 
	stroke		: 'black',
	strokeWidth	: 2
    });

    var r3 = svg.rect(gE, 737, 220, 60, 80, {
	rx			: "6",ry :"6",
	fill			: "#339999",//"red",
	'stroke-linejoin'	: 'round',
	stroke			: '#006666',//'orange',
	'stroke-width'		: 2
    });

    var g2 = svg.group(gE,{

	transform   : "translate(9, 20 ) ",
	id		: "aa2",
	stroke		: 'black',
	strokeWidth	: 2 
    });

    svg.rect(g2, 742, 219, 20, 40, {
	id               : 'ecCP4',
	fill             : "white",
	'stroke-linejoin': 'round',
	stroke           : 'black',
	'stroke-width'   : 2
    });
    
    svg.path(g2, "M 752,247 l 20,0  l 0,5 l -20,0  Z" ,  
	     {style:"fill: darkred; stroke: darkred;   stroke-width: 2px"}) ; 
    svg.path(g2, "M 772,252 l 5,0 l 0,-20 l -5,0  Z" ,  
	     {style:"fill: darkred; stroke: darkred;   stroke-width: 2px"}) ; 
    svg.path(g2, "M 768,232 l 13,0  l -7,-5 Z" ,  
	     {style:"fill: darkred; stroke: darkred;   stroke-width: 2px"}) ; 

    gE.onclick = function(){
	var that=this;
	return function(){
	    console.log("tabela");
	    //    console.log(doc);
	    
	    // lp linhas do pedido
	    var lp=(tabela.retornaLinhas());
	    
	    if (lp.length ==0 &&  (doc!=null) ) 
	    {
	   	//	var svg3 = $($('#camada1')).svg('get');  
		// 	svg3.clear();
		
		var svg = $($('#camada1')).svg('get');  
		var mu={'empregado':empregado , 'mesa':mesa,'permissao': permissao,'doc':doc };
		var bo ={};
		o.pausa();
		
		var tg=  machAnul( o,tabela,tabela2,svg ,mesasEmp,mu);		
		    
	    }
	
	}
    }();

}


/*

*/


function desenhaButaoTransferencia (o,tabela,tabela2,empregado,doc,mesa,mesasEmp,permissao){

    var svg = $($('#camada1')).svg('get');  
    var  gE = svg.group({
	id		: 'svgButTransf', 
	stroke		: 'black',
	strokeWidth	: 2
    });

    var r3 = svg.rect(gE, 737, 303, 60, 80, {
	rx			: "6",ry :"6",
	fill			:  "#339999",// "yellow",
	'stroke-linejoin'	: 'round',
	stroke			: '#006666',//'orange',
	'stroke-width'		: 2
    });


    var g2 = svg.group(gE,{

	transform   : "translate(4, 20 ) ",
	id		: "aa2",
	stroke		: 'black',
	strokeWidth	: 2 
    });

    svg.rect(g2, 738, 300, 20, 40, {
	id               : 'ecCP4',
	fill             : "white",
	'stroke-linejoin': 'round',
	stroke           : 'black',
	'stroke-width'   : 2
    });
    svg.rect(g2, 768, 300, 20, 40, {
	id               : 'ecCP5',
	fill             : "white",
	'stroke-linejoin': 'round',
	stroke           : 'black',
	'stroke-width'   : 2
    });
    svg.path(g2, "M 748,330 l 25,0  l 0,5 l 5,-7.5 l -5,-7.5 l 0,5 l -25,0 Z" ,  
	     {style:"fill: darkred; stroke: darkred;   stroke-width: 2px"}) ; 
    
    gE.onclick = function(){
	var that=this;
	return function(){

	    var lp=(tabela.retornaLinhas());	   
	    if (lp.length ==0 &&(doc!=null) ) 
	    {
		var svg = $($('#camada1')).svg('get');  
		var mu={'empregado':empregado , 'mesa':mesa,'permissao': permissao,'doc':doc };
		var bo ={};
		o.pausa();
		var tg=  machTransf( o,tabela,tabela2,svg ,mesasEmp,mu);
		//console.log("fazPe   linhas:")
	    }
	}
    }();

}

/*


*/

function desenhaButaoFactura(o,svg,tabela,tabela2,empregado,mesa,doc,mesasEmp,mun,permissao){

    var gButFact= svg.group({
	id         : 'gsvgCF',
	stroke     : 'black',
	strokeWidth: 2
    });
    
    svg.rect(gButFact, 738, 465, 60, 80, {
	id: 'RecFact',	fill: "red",rx: 33,ry:10,
	'stroke-linejoin': 'round',
	fill             : "#339999",
	'stroke-linejoin': 'round',
	stroke           : '#006666',
	'stroke-width'   : 3
    });
    
    svg.rect(gButFact, 752, 480, 32, 45, {
	id: 'RecFact6',	
	fill: "white",
	'stroke-width'   :1.3
    });

    svg.text(gButFact,"$", {
	"x"		: "768" ,"y" : "517" ,
	fontFamily	: "Sans",
	textAnchor	: "middle",
	stroke		: 'none',
	strokeLinecap	: "null" ,
	fontSize		: "37.4", fill: "black"
    });
    
    gButFact.onclick = function(){
	var that=this;
	
	return function(){
	    //	    alert("ola");
	    var lp=(tabela.retornaLinhas());
	    
	    if (lp.length ==0 && (doc!=null) ) 
	    {
	   	//	var svg3 = $($('#camada1')).svg('get');  
		// 	svg3.clear();
		
		var svg = $($('#camada1')).svg('get');  
		// var mu={'empregado':empregado , 'mesa':mesa,'permissao': permissao,'doc':doc };
		console.log("wdwdwdwd");
		console.log(mun );
		var bo ={};
		o.pausa();
		      
		var tg=  machFact( o,tabela,tabela2,svg ,mesasEmp,mun);		
		    
	    }

	}
    }();
}



/*

*/
function desenhaButaoConta(o,svg,tabela,empregado,mesa,doc,mesasEmp,perm1){

    var gButTalao= svg.group( { 
	id         : 'gButTalao',
	stroke     : 'black',
	strokeWidth: 2
    });
    
    svg.rect(gButTalao, 738, 385, 60, 80, {
	id: 'ecPed5',rx: 33,ry:10,
	fill             : "#339999",
	'stroke-linejoin': 'round',
	stroke           : '#006666',
	//'fill-opacity'		: 0.7,
	//'stroke-opacity'	: 0.4,
	'stroke-width'   : 3
    });

    svg.rect(gButTalao, 750, 415, 35, 21, {
	id: 'ecPedr5',
	fill             : "lightgrey",
	stroke           : 'grey',
	strokeWidth      : 1
    });

    svg.rect(gButTalao, 753, 412, 29, 12, {
	id: 'ecPedrt5',
	fill             : "lightgrey",
	stroke           : 'grey',
	strokeWidth      : 1
    });

  svg.rect(gButTalao, 756, 416, 23, 2.5, {
	id: 'ecPedrjt5',
	fill             : "black",
	stroke           : 'black',
	strokeWidth   : 1	
    });

  svg.rect(gButTalao, 758.3, 403, 18, 14, {
	id: 'ecPedrjt5',
	fill             : "white",
	stroke           : 'black',
	strokeWidth   : 1	
    });
    
    gButTalao.onclick = function(){	
	var this_doc		= doc;
	var this_empregado	= empregado;
	var this_permissoes	= perm1;	 
	return function(){
	    var lp=(tabela.retornaLinhas());	    
	    if (lp.length ==0 && (doc!=null) ) 
		talaoImprime_click(o,this_doc,this_empregado,  mesasEmp   ,this_permissoes);
	}
    }();
    
}

/*

*/

function desenhaHora(o,svg,tabela){

    var currentTime = new Date()
    var h=currentTime.getHours()
    var minutes = currentTime.getMinutes()
    if (minutes < 10){
	minutes = "0" + minutes
    }
    
    var g3= svg.group({
	id         : 'horaTras',
	stroke     : 'black',
	strokeWidth: 2
    });
    
    var currText =(h+":"+minutes);

    var r3 = svg.rect(g3, 735,547, 65, 60, {
	rx			: "0",ry :"0",
	fill			: "#47798a",
	'stroke-linejoin'	: 'round',
	stroke			:  "#339999",
	'stroke-width'		: 0
    });

    svg.text(g3,currText, {
	"x"		: "796" ,"y" : "585" ,
	fontFamily	: "Sans",
	textAnchor	: "end",
	stroke		: 'none',
	strokeLinecap	: "null" ,
	fontSize	: "20", fill: "black"
    });

    g3.onclick = function(){
	var that=this;
	return function(){
	    var lp=(tabela.retornaLinhas());	    
	   if (lp.length==0 ) {
		//alert("##")
		o.apagaCorrente();
	       o.teardown();
	    }	    
	}
    }();
}


function desenhaBarra(svg){

    //barra lateral
    var r3 = svg.rect( 735, 0, 65, 601, {
	rx			: "0",ry :"0",
	fill			: "#47798a",//"red",
	'stroke-linejoin'	: 'round',
	stroke			: 'orange',
	'stroke-width'		: 0
    });

}

/*

 */

function objPosArr(vs,pr,arr){

	for(var i=0;i<arr.length;i++){
	    if( arr[i].codProduto==vs && (arr[i].preco).toFixed(2)==pr  ){
//		console.log("??!!!!!");
//		console.log(arr[i].nomeProduto);
//		console.log(arr[i]);
//		console.log(arr);

		return {obj:arr[i],pos:i};
	    }
	   // console.log(produtosArray[i].nomeProduto);
	}
    return '';

}

//agrega todos os produtos com o mesmo codigo retirando as anulacoes e linha a zero
function reduzLinhas(rows){
    console.log("/////rows");

    console.log(rows);

    var aR = [];
    var numlinh=0;
    for (var i = 0; i < rows.length; i++) {
	var sinal = 1;
	if((rows[i]).anulacao!=undefined && (rows[i]).anulacao==true)
	    sinal = -1;
	var ty=objPosArr(((rows[i]).codProduto),((rows[i]).preco).toFixed(2) ,aR);
	//	console.log("ty");
	//	console.log(((rows[i]).codProduto));
	//	console.log(ty);
	
	if(   ty  ==""){
	    var rR1 = {};
	    rR1.quantidadeLinha = centesimal((rows[i]).quantidadeLinha) *sinal;
	    rR1.nomeProduto = ((rows[i]).nomeProduto  );
	    rR1.codProduto = ((rows[i]).codProduto  );
	    rR1.empregado = ((rows[i]).empregado );
	    rR1.categoriaProduto = ((rows[i]).categoriaProduto  );
	    rR1.preco = parseFloat( parseFloat((rows[i]).preco).toFixed(2)) ;

	    rR1.precoLinha	= rR1.quantidadeLinha *rR1.preco ;
	    rR1.anulacao	=  (rows[i]).anulacao;
	    rR1.impressoraPedido	= (rows[i]).impressoraPedido;
 	
	    var d		= new Date();
	    var h= zeroFill(d.getHours(),2);
	    var m= zeroFill(d.getMinutes(),2);
	    var ka = h.toString()+':'+m.toString();
	    rR1.hora	= ka;
	    //   rR1.linha	= numlinh;
	    //   numlinh ++;    
	    aR.push(rR1);

	}
	else{	
	    var pr1=ty.obj;
	    var rR2 = {};
	    rR2.nomeProduto 		= (pr1.nomeProduto  );
	    rR2.codProduto		= ((rows[i]).codProduto  );

	    rR2.categoriaProduto = ((rows[i]).categoriaProduto  );
	    rR2.quantidadeLinha	=  pr1.quantidadeLinha+centesimal(
		(rows[i]).quantidadeLinha) *sinal;
	    rR2.preco = parseFloat( parseFloat ((rows[i]).preco).toFixed(2)) ;
	    rR2.precoLinha	= rR2.quantidadeLinha *rR2.preco ;
	    rR2.anulacao	=  (rows[i]).anulacao;
	    rR2.empregado = ((rows[i]).empregado );
	    rR2.impressoraPedido	= (rows[i]).impressoraPedido;
	    rR2.hora	= (rows[i]).hora;
	    //   rR2.linha	= (rows[i]).linha;
	    aR[ty.pos]		=rR2;
	}
    }
   
/* 
    aR.map(function (a ){if(a!= undefined ) console.log(  a.quantidadeLinha+"  "+a.nomeProduto) ;});
    console.log(aR);
    console.log("?????????");
*/
    return aR;
}



function fazPed(num, empregado,doc,ms,permissoes,anulacao,f,as ) {
    
    console.log("num");
    console.log(num);
    
    var f5=function (a){return ((isNaN( parseFloat( a.quantidadeLinha)))           
				||( isNaN( parseFloat( a.preco)))       
				||  ( ( parseFloat( a.quantidadeLinha ))===null)  
				|| ( ( parseFloat( a.preco        ))===null )    
				|| ( ( parseFloat( a.quantidadeLinha))=== undefined)
				|| ( ( parseFloat( a.preco        ))==undefined )
			       );};
    // certefica que nao insere valores invalidos
    var existeNAN=(num).map(f5).reduce(function  (a,b){return (a||b);}) ;
    
    if(  existeNAN ){
	alert("quantidade ou preco NaN.Func fazPe de ecranMesa ");
	console.log("NaN  "+existeNAN);
	f.apply(null,as);
	return;	
    }

    if (num.length==0 ){	
	f.apply(null,as);	
	return;
    }
	// bool true se o pedido so contem um produto e é um complemento 
	var ped1Comp = (num.length==1 && num[0].impressoraPedido.trim() == "complemento");
if(  ped1Comp ){
	console.log("num");
    console.log(num);
   	alert("erro:\n é um complemento nao pode ser inserido isoladamente.\nFunc fazPe de ecranMesa ");

	f.apply(null,as);
	return;	
    }



    // quer dizer que a mesa ainda nao foi aberta	     
    if ( doc == null){
	var document = {};
	document.linhaConta=[];
	document.total=0;

	var d = new Date();
	var h= zeroFill(d.getHours(),2);
	var m= zeroFill(d.getMinutes(),2);
	var ka = h.toString()+':'+m.toString();
	
	document.hora = ka;
	
	document.empregado =   empregado;
	document.type = "mesa";
	document.mesa = ms;
	document.aberta = true;
	document.diaSessao ="1/1/1900";

	/*
	  db.view("appV/mesasAbertas",{ 
	  "keys":[ms] ,
	  success: function(data){
	  //certificar se entretanto nao foi aberta
	  if(data.rows.length==0){
	  console.log("cria novo documento mesa ");

	*/
	
	db.view("appV/diaSessao",{
	    success: function(data){
		document.diaSessao = [data.rows[0].value.ano,
				      data.rows[0].value.mes,
				      data.rows[0].value.dia];
		fazPe(num, empregado,document,ms,permissoes,anulacao,f,as  );
	    },
	    error :  function(data){
		console.log(" erro fp249 diaSessao");
		console.log(document);
		// fazPe(num, empregado,document,ms,permissoes,anulacao );
	    }
	});
    }
    else
	fazPe(num, empregado,doc,ms,permissoes,anulacao,f,as  );

}

function fazPe(num, empregado,doc,ms,permissoes,anulacao,f,as ) {
// erro quando o preco é zero
    var linhas=doc.linhaConta;   

    var d2	= new Date();
	var h2   = zeroFill(d2.getHours(),2);
	var m2   = zeroFill(d2.getMinutes(),2);
	var ka2  = h2.toString()+':'+m2.toString();

	doc.hora	= ka2;

    for(var i=0;i<num.length; i++){
	var linh1={};
	var p=num[i];
	
	var ops=(p.preco) * (p.quantidadeLinha*100)
	var ops2= (ops/100).toFixed(2)
	// console.log((p.preco*100)+" q2dews  "+ops2 )

	var pl1                 = (p.preco * p.quantidadeLinha*100)/100;
	linh1.codProduto	= p.codProduto;
	linh1.nomeProduto	= p.nomeProduto;
	linh1.quantidadeLinha	= parseFloat( p.quantidadeLinha);
	var sinalP		=  1;
	if(anulacao) sinalP	= -1;
	linh1.precoLinha	= ops2*sinalP;
	linh1.anulacao		= anulacao;
	linh1.impressoraPedido	= p.impressoraPedido;
	linh1.preco		= parseFloat( p.preco);
	linh1.categoriaProduto	= p.categoriaProduto;
	linh1.empregado	        = empregado;
 	
	var d	= new Date();
	var h   = zeroFill(d.getHours(),2);
	var m   = zeroFill(d.getMinutes(),2);
	var ka  = h.toString()+':'+m.toString();

	linh1.hora	= ka;
	var numlinh	= linhas.length;
	linh1.linha	= numlinh;
	linhas		= linhas.concat([linh1]);
    }

    doc.linhaConta=linhas;
    var f3= function (a){return a.precoLinha;};

    doc.total=(doc.linhaConta.map(f3).reduce(function  (a,b){return (a+b);}) );
    if(permissoes)    
	doc.aberta=true;
    var f4=function (a){return (  a.quantidadeLinha<0);};

    var existeLinhasNegativas=(reduzLinhas
			       (doc.linhaConta).map(f4).reduce(
				   function  (a,b){return (a||b);}
			       ));

	    

    if(existeLinhasNegativas ){
	//TODO
	//neste caso o doc original foi alterado por esta funco o que pode provocar conflitos
	alert("quantidade que pretende anular não existe.Func fazPe de ecranMesa ");
    }
    else{

        // depois de remover o valor total for ≃ 0 entao apaga doc => mesa passa a estar livre 
	if(doc.total < 0.00001)	    
	    db.removeDoc(doc,{
		success : function (){
		    // em principio é uma anulacao=true
		    imprimePedido(empregado,ms,num,anulacao,doc._id);
		    
		    // constroiQuadroMesas(7, 6, empregado,ms , permissoes );
		    f.apply(null,as);
		    
		    //  currentState.teardown(); 
		    // em vez de
		    // ecraMesa(empregado,ms,doc,permissoes ,podeIns );
		},
		error : function(){
		    alert("erro remover doc.Funcao fazPe em ecranMesa ");
		}
	    });
	else db.saveDoc(doc ,{
	    success : function () {
		// console.log('inserir  pedido')  ;console.log(doc)  ;
		// console.log('inserido pedido --------------------------')  ;
		// o imprimePedido nao pode falhar se alterou na mesa
		imprimePedido(empregado,ms,num,anulacao,doc._id);
		//TODO verificar funcao ecranMesa
		f.apply(null,as);
		
		// ecranMesa(6,7,empregado,ms,doc,permissoes ,true );
	    },
	    error   : function () { 
		//TODO
		//neste caso o doc original foi alterado por esta funco
		// o que pode provocar conflitosƒ
		alert("erro inserir doc.Funcao fazPe em ecranMesa " );
	    }
	});
    }
}

function  imprimePedido(empregado,ms,num,anulacao,id) {

    var numPed= 0;
    var sd= null;

    db.view("appV/contadorPedido", {
	// falta error ?
	success: function(data){
	    numPed= data.rows[0].value;
	    sd= data.rows[0].key;
	    
	    // sd
	    //	    console.log("sd-------------------");
	    //	    console.log(sd);
	    //	    console.log(data.rows);
	    //	    console.log(data.rows[0].key.numero);
	    
	    sd.numero=sd.numero+1;
	    if(sd.numero==100) sd.numero=1;
	    db.saveDoc(sd,
		       {	
			   success: function(data){
			       imprimePedido2(empregado,ms,num,anulacao,numPed,id);
			   },
			   error: function(data){
			       imprimePedido2(empregado,ms,num,anulacao,numPed);
			       console.log("erro ao modificar o contador 8378");
			       console.log(data);
			   }
		       });
	},
	error : function(data){
	    console.log("erro view contadorPedido  845");
	    console.log(data);
	    imprimePedido2(empregado,ms,num,anulacao,0,id);
	}
    });
}


function  imprimePedido2(empregado,ms,num,anulacao,numPed,id) {
  
    
    //  ASCII ESC   !  n
    //  Hex    1B  21  n
    //
    // impT.push("!3");
    console.log("mesa");
    console.log(ms);
    console.log("num  ");
    console.log(num);

    //   num=impressoraIgual(num)
    //   console.log("num alterado");
    //   console.log(num);
    var dE= imprimePedido_Aux(num,[]);

    //console.log("dE");
    //console.log(dE);

    //-----------------------------------------------------------------
    //
    //dE=[
    //	["Balcao",[Object { codProduto="7056", quantidadeLinha="1", 
    //			    nomeProduto="Caldo Verde", more...}]], 
    //	["Bar", [Object { codProduto="1414", quantidadeLinha="1", 
    //			      nomeProduto="Alandra Branco", more...}]], 
    //	["Cozinha", [Object { codProduto="7022", quantidadeLinha="1", 
    //			      nomeProduto="Alheira Caça", more...}]]
    //	]
    //
    //------------------------------------------------------------------

    dE=fundeImpressoras (dE);
    //console.log("dE Fundido");
    //console.log(dE);

    dE.map(function (t) {
	var impT=[];
	impT.push("\x1b\x40\x1b\x63\x34\x02\x1b\x74\x03\x1b\x45\x00\x1b\x2d\x00");
	if (anulacao )  impT.push('!2   ANULACAO \x0d\x0a');
	//!1
	var d = new Date();
	var h= zeroFill(d.getHours(),2);
	var m= zeroFill(d.getMinutes(),2);
	var ka = h.toString()+':'+m.toString();
	impT.push("!2m "+ms+" "+empregado+" "+numPed+"\x0a\x0a\x0a");	
	//impT.push("!0 ");   

	t[1].map(function (a) {
	    var pr1=parseFloat(a.precoLinha).toFixed(2)
	    //impT.push("!0"+a.quantidade +" "+a.nome.substring(0,15)+
	    //	      "\x1b\x21\x00 "+ parseFloat(a.precoUnitario).toFixed(2)); 
	    // impT.push("\x1b\x21\x0d"+a.quantidade +" "+a.nome.substring(0,14)+
	    //        "\x1b\x21\x00 "+ parseFloat(a.precoUnitario).toFixed(2)); 	    
	    impT.push("\x1b\x21\x31"+a.quantidadeLinha +" "+a.nomeProduto.substring(0,14)+
		      "\x1b\x21\x00 "+ parseFloat(a.preco).toFixed(2)); 
	    impT.push("\x0d\x0a");
	});
	
	impT.push('\x1b!\x00'+	'\n--------'+ka+'---------'+'\x0c \x1b\x64\x03'); 
	impT.push("\x0d\x0a   ");
	impT.push("\x0d\x0a                       ");
	impT.push("\x0d\x0a                       ");
	
	// impT.push("\x0d\x0a  \n\n\n\x1d\x56\x00");
	// impT.push(" \x1bd5");
	// impT.push("!i");
	impT.push("\x1b\x69");

	var impB={"type":"impressora","texto":impT,"local": t[0],"docID":id}; 
	console.log(".......impressora.......");  
	console.log(t[0]);
	console.log(impB.docID);
	console.log(impB.docSessao);

	console.log(impT);
	//if (impT!=undefined || impT!="" )
	db.saveDoc(impB,
		   {   
		       success : function (data){
			   //console.log(data);
			   // console.log(document);
			   // console.log('-----------------');
		       },
		       error : function(){
			   // nao pode dar erro . tem de voltar a tentar ate conseguir
			   alert("erro 659 saveDoc  imprimePedido2(X)  ecranMesa.js");	
			   console.log("erro 659 saveDoc  imprimePedido2(X)  ecranMesa.js");
		       }
		   });
    });
}


//Separa os pedidos por impressoras
// retorna lu= [["impresora1",["linha1 produto preco"," linha2 prod pr","linha3 prod pr"]],[["impressora2"],[lin1,lin2 ..]], ...   ]
function  imprimePedido_Aux(listImp,lu) {
 
  
    if( listImp.length == 0 )
    {
	return lu;
    }
    var resto=[];
    var listaIR=[];
    listaIR[0]= listImp[0].impressoraPedido;
    listaIR[1]=[];
    var impAnt="";  
    listImp.map(
	function (a) {

	    if(  listImp[0].impressoraPedido.trim()== a.impressoraPedido.trim() ||
		 (impAnt.trim()==listImp[0].impressoraPedido.trim() && 
		  "complemento" == a.impressoraPedido.trim()  ) 
	      )
	    {
		listaIR[1].push(a);
	    }
	    else resto.push(a);

	    if("complemento" != a.impressoraPedido.trim() )
		impAnt=a.impressoraPedido;
	}
    );

    lu.push(listaIR);
    return imprimePedido_Aux( resto,lu) ;

}


//quando um produto é imprimido em mais do que uma impressora 

function fundeImpressoras_Aux (L,impA,impB,impAB){
    var l1=[];
    var l2=[];
    var l12=[];
    var bL1=-1; var bL2=-1;
    var bL3=-1;   
    console.log("L antes");
    console.log(L);

    for(var i=0;i<L.length;i++ ){
	if(L[i][0].trim()==impA.trim())  {l1=L[i][1];
					  bL1=i;
					 }
	if(L[i][0].trim()==impB.trim())  {l2=L[i][1];
					  bL2=i;
					 }
	if(L[i][0].trim()==impAB.trim()) {l12=L[i][1];
					  bL3=i;
					 }
    }

    if (bL1!=-1){ 
	L[bL1][1]=L[bL1][1].concat(l2).concat(l12)  ;
	 // if (bL2!=-1)  L[bL1][1]=L[bL1][1].concat(L[antes_bL2][1]);
    }
    if (bL1==-1){ 
	L.push([impA,l2.concat(l12)  ]);
    }

    if (bL2!=-1){
	L[bL2][1]=L[bL2][1].concat(l1).concat(l12);
    }
    if (bL2==-1) {
	L.push([impB,l1.concat(l12)]);
    }
    if (bL3!=-1) { 
	L.splice(bL3,1);
    }
    
    console.log("L depois");
    console.log(L);

    return L;
}

function fundeImpressoras (L){
    console.log(L);
    var bc = false;
    var bb = false;

    for(var i=0;i<L.length;i++ ){
	if(L[i][0].trim()=="Balcao+Coz" )  bc=true;
	if(L[i][0].trim()=="Balcao+Bar" )  bb=true;
    }
    if(bb && bc) return   fundeImpressoras_Aux ( 
	fundeImpressoras_Aux (L,"Cozinha","Balcao","Balcao+Coz" ),"Bar","Balcao","Balcao+Bar"); 
    if(bc) return  fundeImpressoras_Aux (L,"Cozinha","Balcao","Balcao+Coz" ) ;
    if(bb) return  fundeImpressoras_Aux (L,"Bar","Balcao","Balcao+Bar" ) ;    
    else return L;
}



function zeroFill( number, width )
{
    width -= number.toString().length;
    if ( width > 0 ){
	return new Array( width + (/\./.test( number ) ? 2 : 1) ).join( '0' ) + number;
    }
    return number;
}


function  talaoImprime_click(o,doc,empregado,mesasEmp,permissoes) {
    //TODO imprime na impressora
    doc.aberta = false;
    var d		= new Date();
	var h= zeroFill(d.getHours(),2);
	var m= zeroFill(d.getMinutes(),2);
	var ka = h.toString()+':'+m.toString();
	doc.hora	= ka;
	console.log("muda a hora");
	console.log(doc);
    db.saveDoc(doc ,{
        success : function () {
            imprimeTalao(doc);
	    o.apagaCorrente();
	    //constroiQuadroMesas(6,7,empregado,mesasEmp ,permissoes);		
 	    //alert('inserido');				
	},
        error   : function () {
	    alert('erro 1048  talaoImprime_click() ecranMesa.js' ); 
	}
    });
    
}

function  imprimeTalao(document) {
    
    var impT=[];
    impT.push("\x1b\x40\x1b\x63\x34\x02\x1b\x74\x03\x1b\x45\x01"+strRestNome);
    impT.push("\x0d\x0a\x1b\x45\x00Consulta de Mesa "+document.mesa);
    impT.push("\x0d\x0a ");
    
    var tf= (reduzLinhas(document.linhaConta));
   
    var tf2= ordenaPorCategoria(tf);

    //se tiver poucas linhas
    if (tf2.length<7)impT.push("\n\n");

    tf2.map(function (a) {
	console.log("####");
	console.log(a);
		
	var pr1=parseFloat(a.preco*a.quantidadeLinha/100).toFixed(2);
	if(a!=undefined &&  pr1>0 ) 
	{ 
	    var si= (a.nomeProduto  +"                                 ").slice(0,22);
	    var pi=  ("  "+pr1);
	    var pii= pi.slice(pi.length-6,pi.length );
            var qi=(a.quantidadeLinha/100).toFixed(2)+"        ";
	    var qii= qi.slice(0,6);
	    //impT.push("\n"+qii+"  "+si +pii+"" );  
	    impT.push(""+qii+"  "+si +pii+"" );  
	}
    });

    //se tiver poucas linhas
    if (tf2.length<4) impT.push("\n\n");

    impT.push(' \x0d\x0a\x1b\x21\x00\x0d '+	'---------------------------------'+' '); 

    var f3= function (a1){return a1.precoLinha;};
    var t1=0.0;
    /*    console.log("///////////////////////////////");
	  console.log(document.linhaConta);
	  console.log("linhaConta.map(f13)");
	  console.log(tf2);
	  console.log(document.linhaConta.map(f3));
    */
    if (document.linhaConta.length>0) 
	t1=document.linhaConta.map(f3).reduce(function  (a,b){return (a+b);}) ;
    
    impT.push("\x0d\x0a\x0d\x0a\x1b\x21\x20TOTAL   "+
	      (t1).toFixed(2)+'€\x1b\x21\x00\x0d'); 
    impT.push("\x0d\x0a");
    impT.push(" empregado: "+document.empregado);
    //		impT.push("\x0d\x0ahora "+document.hora+"  ");
    impT.push("\x0d\x0a\x0d\x0a");
    impT.push("\x0d\x0a      Processado por computador");
    impT.push("\x0d\x0a           IVA incluido  23%    ");
    impT.push("\x0d\x0a                       ");
    impT.push("\x0d\x0a                       ");
    impT.push("\x0d\x0a                       ");
    impT.push("\x0d\x0a                       ");

    //    impT.push("\x0d\x0a             \n \n \n \n \n ");
    //impT.push("\x0d\x0a  \n\x1b\x64");
    impT.push("\x1b\x69");
    console.log(impT);    
    var impB={"type":"impressora","texto":impT,"local":window.location.host};
    db.saveDoc(impB,{
	error : function(){
	    alert("erro savedoc imprimeTalao() ecranMesa.js ");		
	}
    });

}

function  imprimeTalaoEcran(document) {
    
    var impT=[];
    impT.push(strRestNome);
    impT.push("  Consulta de Mesa "+document.mesa);
    impT.push("\x0d\x0a ");
    
    var tf= (reduzLinhas(document.linhaConta));
    var tf2= ordenaPorCategoria(tf);
    tf2.map(function (a) {
	//	console.log("####");
	//	console.log(a);
	
	var pr1=parseFloat(a.preco*a.quantidadeLinha/100).toFixed(2);
	if(a!=undefined &&  pr1>0 ) 
	{ 
	    var si= (a.nomeProduto  +"                                 ").slice(0,22);
	    var pi=  ("    \n   "+pr1);
	    var pii= pi.slice(pi.length-6,pi.length );
            var qi=(a.quantidadeLinha/100).toFixed(2)+"        ";
	    var qii= qi.slice(0,6);
	    impT.push(qii+"  "+si +pii+"" );  
	}
    });
    impT.push(' '+	'---------------------------------'+' '); 

    var f3= function (a1){return a1.precoLinha;};
    var t1=0.0;

    if (document.linhaConta.length>0) 
	t1=document.linhaConta.map(f3).reduce(function  (a,b){return (a+b);}) ;
    
    impT.push("     TOTAL   "+
	      (t1).toFixed(2)+'€'); 
    impT.push(" empregado: "+document.empregado);
    //		impT.push("\x0d\x0ahora "+document.hora+"  ");
    impT.push("\x0d\x0a\x0d\x0a");
    impT.push("\x0d\x0a      Processado por computador");
    impT.push("\x0d\x0a           IVA incluido  23%    ");
    impT.push("\x0d\x0a                       ");
    impT.push("\x0d\x0a                       ");
   
    return (impT);    
    
}


function ordenaPorCategoria(arrP){

    var arrSort=[];	

    for(var i=0;i<cats4.length;i++ ){
	for(var t=0;t<arrP.length;t++ ){
	    
	    if ( cats4[i]==  arrP[t].categoriaProduto.replace(/^\s+|\s+$/g, "")) 
	    {
		//console.log( 'entrou*'+cats4[i]+"=="+ arrP[t].categoriaProduto+"*weewe@");
		arrSort.push(arrP[t]);
	    }
	    
	}
    }
    
    //    for(var i=0;i<arrP.length;i++ ){
    //	  if ( arrP[i]== undefined ) 
    //	      arrSort.push(arrP[t]);
    //      }
    
    return arrSort;
    
}


