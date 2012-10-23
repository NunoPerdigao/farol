//curl -X POST http:192.168.1.80:5984/_replicate -d '{"source":"r61b","target":"produto-replica" , "filter":"myView/produto" }' -H "Content-Type: application/json"

/* ecraMesa(empregadoKey,mesa,doc type=mesa ,permissoes ,podePedirBool );
o campo doc pode ser null se a mesa esta livre
*/

function ecraMesa(empregado,ms,doc,permissoes,podeIns){
    

  $('#tabelaLinhas').empty();
    var gf=[];
// tabela de debug 
  if(doc!=null) {
      gf=doc.linhaConta;
      $('#tabelaLinhas').append('<tr><td>linha</td><td >' +
      "quantidade"+'</td><td >'+"codigo"+
      '</td> <td > nome</td><td>'+"preco Unitario"+
      "</td><td> PrecoLinha </td> <td>" +"hora"+
      " </td> <td> " +"Anulacao" +"</td><td>"+"Impressora"+
      '</td> </tr>');
      gf.map(
        function(row){
          $('#tabelaLinhas').append('<tr  id="' + row.linha + '">' +
				    '<td width="10%">' 		+row.linha +
				    '</td> <td width="5%">' 	+row.quantidadeLinha +
				    '</td> <td width="15%" > ' 	+row.codProduto +
				    '</td> <td width="15%" > ' 			+row.produto +
				    '</td> <td width="10%"> ' 	+row.precoUnitario +
				    '</td> </td> <td width="5%">' 	+row.precoLinha +
				    '</td> <td  width="5%">   ' 	+row.hora +
				    '</td> <td  width="5%">   ' 	+row.anulacao +
				    '</td> <td  width="5%">   ' 	+row.impressoraPedido +
				    '</td> <td  width="5%">   ' 	+row.categoriaProduto+
				    '</td> </tr>'
				   );
        });;
  }
        //   fim  de tabela debug

    var svg = $('#svgbasics').svg('get');
    svg.clear();

    var g = svg.group({
	id          : 'svgGMesa',
	stroke      : 'black',
	strokeWidth : 2
    });
    var defs = svg.defs(g); 
    svg.linearGradient(defs, "MyGradient", 
		       [
			   ["0%" ,"#B4CFEC"], ["25%" , "#2f4f4f"],
			   ["62%","#2f4f4f"], ["100%", "#B4CFEC"]
		       ], 
		       2, 0, 798, 300, {gradientUnits:"userSpaceOnUse"}); 
  

    svg.rect(g, 0, 0, 800, 600, {
	id		: 'ecPed1',
	fill		:"#2f4f4f",//'url(#MyGradient)',
	strokeLinejoin	: 'round' ,
	stroke		: 'orange',
	strokeWidth	: 2
    });



    svg.rect(g, 30, 1, 94, 26, {
      "rx"		:3, "ry":3,
      fill		: "gray",
      strokeLinejoin	: 'round',
      stroke		: 'orange',
      strokeWidth	: 2
    });
    // desenha o nome do empregado
    svg.text(g,33 ,22,empregado,{
      fontFamily : "Verdana",
      fontSize   : "24.5",
      fontWeight : "bold",
      fill       : "blue",
      strokeWidth: "0"
    }); 

    svg.rect(g, 135, 1, 44, 26, {
      "rx"		:3,"ry":3,
      fill		: "gray",
      strokeLinejoin	: 'round',
      stroke		: 'orange',
      strokeWidth	: 2
    });
    // desenha o numero da mesa
    svg.text(g,142 ,22,""+ms,{
      fontFamily : "Verdana",
      fontSize   : "24.5",
      fontWeight : "bold",
      fill       : "blue",
      strokeWidth: "0"
    });	


    //botoes artigos

    var gr = svg.group(); 
    var textD=["Pratos", "Bebidas", "Entradas",  "Sobremesa", 
	       "Cafetaria", "E.L.G.",  "Diversos"];
    primeiraClass(svg,g,textD);
    
    //fim botoes artigos 
    
    //Barra lateral
    var defs = svg.defs(g); 
    svg.linearGradient(defs, "BarraGradient", [
	["0%","#9adafF"], ["25%", "#9adafF"],
	["82%","#9adafF"], ["100%", "#2f4f4f"]], 
		       2, 300, 798, 300, {gradientUnits:"userSpaceOnUse"}); 


    svg.rect(g, 728, 4, 70, 595, {
	id               : 'barraLateral',
	fill             : "url(#BarraGradient)",
	'stroke-width'   : 0
    });

  svg.linearGradient(defs, "CanceGradient", [
	["0%","white"], ["25%", "#2f4f4f"],
	["82%","#2f4f4f"], ["100%", "black"]], 
		       2, 470, 2, 700, {gradientUnits:"userSpaceOnUse"}); 

    
    // rectangulo  cinzento

    var ci1= svg.group( { 
	id         : 'gButCinz'
	 
    });
    
    

    svg.rect(ci1, 728, 530,70,70, {
	id			: 'tras',
	fill			: "red", //"url(#CanceGradient)",
	'stroke-linejoin'	: 'round',
	stroke			: '#006666',
	//'fill-opacity'		: 0.5,
	//'stroke-opacity'	: 0.4,
	'stroke-width'		: 0,
    });


    var currentTime = new Date()
    var h=currentTime.getHours()
    var minutes = currentTime.getMinutes()
    if (minutes < 10){
	minutes = "0" + minutes
    }
    
    var currText =(h+":"+minutes);

    svg.text(ci1,currText, {
	"x"		: "794" ,"y" : "580" ,
	fontFamily	: "Sans",
	textAnchor	: "end",
	stroke		: 'none',
	strokeLinecap	: "null" ,
	fontSize	: "24", fill: "black"
    });


    ci1.onclick = function(){
	var this_e=empregado;
	var this_p=permissoes;
	return function(){
            //console.log("permissoes1");
            //console.log(permissoes); console.log("se "+this_p);
            //console.log("-----");
	    //So retorna as mesa se nao tiver nenhum pedido
	    if($("#tabelaPedido tr").length<1){
		constroiQuadroMesas(7, 6, this_e , this_p );
		$(document).unbind('keydown', fk3);
		$(document).unbind('keydown', fk2);
		$(document).unbind('keydown', fk21);
		$(document).unbind('keydown', fk1);
	    }

	}
    }();
    
    // fim  rectangulo cinzento* 



    // rectangulo onde serao introduzidas as tabelas de pedido e artigo na mesa
    svg.rect(g, 535, 210, 190, 340, {
      id		: 'ecPed2',
      fill		: "white",
      strokeLinejoin	: 'round',
      stroke		: 'orange',
      strokeWidth	: 2
    });

    svg.rect(g, 535, 10, 190, 150, {
      id		: 'ecPed3',
      fill		: "white",
      strokeLinejoin	: 'round',
      stroke		: 'orange',
      strokeWidth	: 2
    });

    // rectangulo para apresentar o valor total na mesa
    svg.rect(g, 535, 555, 190, 35, {
      id               : 'recTotal',
      fill             : "white",
      strokeLinejoin   : 'round',
      stroke           : 'orange',
      strokeWidth      : 2
    });
    
  if(permissoes){

    var gButTransf=desenhaButaoTransferencia(g,svg);
    gButTransf.onclick = function(){
      var this_d    = doc;
      var this_e    = empregado;
      var this_p    = permissoes ;	
      var this_podeI= podeIns;
      return function(){
	  $(document).unbind('keydown', fk3);
	  $(document).unbind('keydown', fk2);
	  $(document).unbind('keydown', fk21);
	  $(document).unbind('keydown', fk1);
          transferencia_click(this_e,ms,this_d,this_p,this_podeI);
      }
    }();
    }

    // os seguintes botoes so aparecem se o empregado tiver permissao
    if(podeIns){

	var bi = desenhaButaoFazPedido(g,svg);
	bi.onclick = function(){
	    var this_d  = doc;
	    var this_m  = ms;
	    var this_e  = empregado;
	    var this_p  = permissoes;
	    var this_pd = podeIns;
	    return function(){
		/*
		  doc.linhaConta.map(
		  function(row){
		  console.log( "######g2g#####");
		  console.log( row.quantidadeLinha +' td    ' +row.codProduto+" - "+doc.linhaConta[row.linha].quantidadeLinha );
		  });*/
		pedido_click(this_e,this_m,this_d,this_p,this_pd);
            }
	}();
	//botao de anulacao 

	var gButAnulacao= svg.group(g,{
	    id         : 'gButTransf',
	    stroke     : 'black',
	    strokeWidth: 2
	});

	svg.rect(gButAnulacao, 733, 200, 60, 80, {	
	    rx			: 33,
	    ry			: 10,	 
	    id			: 'ecPed32',
	    fill		: "#339999",
	    //'fill-opacity'	: 0.7,
	    //'stroke-opacity'	: 0.5,
	    //'stroke-linejoin'	: 'round',
	    stroke		: '#006666',
	    'stroke-width'	: 3
	});




	svg.rect(gButAnulacao, 742, 219, 20, 40, {
	    id               : 'ecCP4',
	    fill             : "white",
	    'stroke-linejoin': 'round',
	    stroke           : 'black',
	    'stroke-width'   : 2
	});

	svg.path(gButAnulacao, "M 752,247 l 20,0  l 0,5 l -20,0  Z" ,  
		 {style:"fill: darkred; stroke: darkred;   stroke-width: 2px"}) ; 
	svg.path(gButAnulacao, "M 772,252 l 5,0 l 0,-20 l -5,0  Z" ,  
		 {style:"fill: darkred; stroke: darkred;   stroke-width: 2px"}) ; 
	svg.path(gButAnulacao, "M 768,232 l 13,0  l -7,-5 Z" ,  
		 {style:"fill: darkred; stroke: darkred;   stroke-width: 2px"}) ; 

	
	gButAnulacao.onclick = function(){
	    var this_e = empregado;
	    var this_p = permissoes;
	    var this_d = doc;
	    var this_m = ms;
	    var this_po= podeIns;
	    
	    return function(){
		$(document).unbind('keydown', fk3);
		$(document).unbind('keydown', fk2);
		$(document).unbind('keydown', fk21);
		$(document).unbind('keydown', fk1);
		anulacao_click(this_e,this_m,this_d,this_p,this_po);
	    }
	}();
    }
    
    //fim
	
    // butao do lado direito do pedido que elemina a ultima linha do pedido
    var gButEleminaL= desenhaButaoEliminaLinhaPedido(g,svg);
    gButEleminaL.onclick = function(){
      return function(){
        $("#tabelaPedido tr").last().remove();
      }
    }();

    
    var gButTalao= svg.group( { 
	id         : 'gButTalao',
	stroke     : 'black',
	strokeWidth: 2
    });
    
    svg.rect(gButTalao, 733, 370, 60, 80, {
	id: 'ecPed5',rx: 33,ry:10,
	fill             : "#339999",
	'stroke-linejoin': 'round',
	stroke           : '#006666',
	//'fill-opacity'		: 0.7,
	//'stroke-opacity'	: 0.4,
	'stroke-width'   : 3
    });
    svg.rect(gButTalao, 745, 408, 35, 19, {
	id: 'ecPedr5',
	fill             : "lightgrey",
	stroke           : 'grey',
	strokeWidth      : 1
    });

    svg.rect(gButTalao, 748, 402, 29, 12, {
	id: 'ecPedrt5',
	fill             : "lightgrey",
	stroke           : 'grey',
	strokeWidth      : 1
    });

  svg.rect(gButTalao, 751, 406, 23, 2.5, {
	id: 'ecPedrjt5',
	fill             : "black",
	stroke           : 'black',
	strokeWidth   : 1
	
    });
  svg.rect(gButTalao, 753.3, 393, 18, 14, {
	id: 'ecPedrjt5',
	fill             : "white",
	stroke           : 'black',
	strokeWidth   : 1	
    });
    
    gButTalao.onclick = function(){	
	var this_doc		= doc;
	var this_empregado	= empregado;
	var this_permissoes	= permissoes;	 
	return function(){
	    talaoImprime_click(this_doc,this_empregado,this_permissoes);
	}
    }();
    
    var gButConta=  desenhaButaoFactura(g,svg);
    gButConta.onclick = function(){
	var this_doc       = doc;
	var this_empregado = empregado;
	var this_permissoes= permissoes;	 
	return function(){
	    desenhaQuadroFactura(this_doc,this_empregado,this_permissoes );	
	}
    }();


    $(document).bind('keydown', fk1);
    var d3=doc;
    if(d3!=null){listagemMesa(reduzLinhas2(d3.linhaConta));}
    criaTabelaPedido();
    // rectangulos invisivei sobre a tabela de mesa para navegar para cima e para baixo
    dRC(svg,g);    
}

function desenhaButaoFactura(g,svg ){
  var gButConta= svg.group(g,{
    id         : 'gsvgCF',
    stroke     : 'black',
    strokeWidth: 2
  });
  
  svg.rect(gButConta, 733, 455, 60, 80, {
      id: 'ecPed6',	fill: "red",rx: 33,ry:10,
      'stroke-linejoin': 'round',
      fill             : "#339999",
      'stroke-linejoin': 'round',
      stroke           : '#006666',
      'stroke-width'   : 3
  });
    
    svg.rect(gButConta, 747, 470, 32, 45, {
	id: 'ecPed6',	
	fill: "white",
	'stroke-width'   :1.3
  });



  svg.text(gButConta,"$", {
      "x"		: "763" ,"y" : "507" ,
      fontFamily	: "Sans",
      textAnchor	: "middle",
      stroke		: 'none',
      strokeLinecap	: "null" ,
      fontSize		: "37.4", fill: "black"
  });
  
  return gButConta;
  
}


function desenhaButaoEliminaLinhaPedido(g,svg){

    var gButEleminaL= svg.group(g,{
	//id: 'gsvgMesa',
	stroke     : 'black',
	strokeWidth: 2
    });
    
    svg.rect(gButEleminaL, 733, 35, 60, 80, {
	id               : 'ecPedterm1',
	rx               : 33,
	ry               : 10,
	fill             : "#339999",
	'stroke-linejoin': 'round',
	stroke           : '#006666',
	'stroke-width'   : 3
    });

    svg.text(gButEleminaL,"X", 	{
	fontFamily	: "Verdana",
	"x"		: "760" ,"y" : "80" ,
	strokeWidth	: "0" ,
	strokeLinecap	: "null" ,
	fontSize	: "19", 
	fill		: "black", 
	textAnchor	:"middle"
    });
    
    return gButEleminaL;
}

function desenhaButaoTransferencia(g,svg){

	var gButTransf= svg.group(g,{
	    id         : 'gButTransf',
	    stroke     : 'black',
	    strokeWidth: 2
	});
	
	
	svg.rect(gButTransf, 733, 285, 60, 80, {
	    id: 'ecPed4',rx: 33,ry:10,
	    fill             : "#339999",
	    'stroke-linejoin': 'round',
	    stroke           : '#006666',
	    'stroke-width'   : 3
	});

	svg.rect(gButTransf, 738, 300, 20, 40, {
	    id               : 'ecCP4',
	    fill             : "white",
	    'stroke-linejoin': 'round',
	    stroke           : 'black',
	    'stroke-width'   : 2
	});
	svg.rect(gButTransf, 768, 300, 20, 40, {
	    id               : 'ecCP5',
	    fill             : "white",
	    'stroke-linejoin': 'round',
	    stroke           : 'black',
	    'stroke-width'   : 2
	});
	svg.path(gButTransf, "M 748,330 l 25,0  l 0,5 l 5,-7.5 l -5,-7.5 l 0,5 l -25,0 Z" ,  
		 {style:"fill: darkred; stroke: darkred;   stroke-width: 2px"}) ; 

    return gButTransf;

}

function desenhaButaoFazPedido(g,svg){
	var bi= svg.group(g,{ 
	    id         : 'gButPedido',
	    stroke     : 'black',
	    strokeWidth: 2
	});
	
	var brt=svg.rect(bi, 535, 165, 190, 40, {	
	    rx               : 7,
	    ry               : 10,	 
	    id               : 'ecPed31',
	    fill             : "darkgreen",
	    'stroke-linejoin': 'round',
	    stroke           : 'black',
	    'stroke-width'   : 2
	});
	
	svg.path(bi, "M 595,175 l 70,0   l -35,20 Z" ,  {style:"fill: #20ffa0 ; stroke: black;   stroke-width: 2px"}) ;   
    return bi;
}


function primeiraClass(svg,g,textD){
    var txtA=[
	["Sopa","Peixe","Carne"],
	["V.Mad Branco","V.Mad Tinto","V.Verde Branco","V.Verde Tinto","Refrigerante"],
	["Entradas"],
	["Sobremesa","Gelados"],
	["Cafés"],
	["Aguardentes","Whisky's","Champagne","Licores"],
	["Complementos","Acompanhamento","Telefone"]
    ]
    var gT = svg.group(g,{
	id: 'svgPrimeiraClass',
	stroke: 'black',
	strokeWidth: 2
    });

    for(var i=0;i<textD.length;i++ )
    {
	var gP = svg.group(gT,{
	    id         : 'svgaCs',
	    stroke     : 'black',
	    strokeWidth: 2
	});

	var defs = svg.defs(gP); 
	svg.linearGradient(defs, 'myGrad'+i, 
			   [[0, 'white'], [1, '#646D7E']], 450,85+(i*50), 450, 115+(i*50), 
			   {gradientUnits: 'userSpaceOnUse'});
	
	

	svg.rect(gP, 10 ,95+(i*50),150,42, {
	    // fill: 'url(#myGrad'+i+")", 
	    id			: 'svg_5',
	    "rx"		: "3","ry": "3",
	    fill		: '#646D7E',  
	    stroke		: '#000000',
	    strokeLinejoin	: 'round',   
	    strokeWidth		: 2
	});

	svg.text(gP,80 ,125+(i*50),textD[i], {
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
		segundaClass (svg,g,this_txtAi)
	    }
	}();  
	
    }
    
    segundaClass (svg,g,txtA[0]);
    $("#svgPrimeiraClass :first ").addClass("selected");
}
// key ->categoriaProduto -- categoria selecionada na segundaClass
function terceiraClass(svg,g,txtB,primeiro,ultimo,key,numeroLinhas){

    $("#svgTerceiraClass g ").remove();
    var gT = svg.group(g,{
	id         : 'svgTerceiraClass',
	stroke     : 'black',
	strokeWidth: 2
    });
    
    var bCima = svg.group(gT,{
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
	    db.view("myViews/categoriasLista", {
		startkey: [ this_t, this_u],endkey: [this_t," "],
		"limit" : numPrdLinha,
		descending : true,
		success: function(data){
		    if(data.rows.length>0){
			if(data.rows[numPrdLinha-1]!=undefined )
 			    terceiraClass (svg,g,data.rows.reverse(),data.rows[0].value.nome, 
					   data.rows[numPrdLinha-1].value.nome, this_t,numPrdLinha);
			else
			    terceiraClass (svg,g,data.rows.reverse(),data.rows[0].value.nome,
					   data.rows[0].value.nome, this_t,numPrdLinha);
		    }
		},
		error   : function() { alert('nao consegui ver view.' );}
	    });
	}
    }();
    
    var bBaixo = svg.group(gT,{
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
	    db.view("myViews/categoriasLista", {
		startkey : [this_t,this_u],endkey: [this_t,"ZZZZZ"],
		"limit"  : numPrdLinha, 
		success  : function(data){
		    if(data.rows.length>0){
			if(data.rows[numPrdLinha-1]!=undefined )
 			    terceiraClass (svg,g,data.rows,data.rows[0].value.nome,
					   data.rows[numPrdLinha-1].value.nome, this_t,numPrdLinha);
			else
			    terceiraClass (svg,g,data.rows,data.rows[0].value.nome,
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
		var qtd =  1;
		db.view("myViews/produtoLista", 
			{ "keys":[ms ],
			  success: function(data){
			      if(data.rows.length >0){
				  var existeP=false;
				  $('#tabelaPedido tr ').each(function(c) {
				      if($(this).find(".cod").text()==ms  &&
					 data.rows[0].value.impressoraPedido!="complemento"    )
				      {
					 
					  var iq  = parseInt($(this).find(".qnt").text());
					  var siq = iq+parseInt(qtd);
					  var fp  = parseFloat($(this).find(".precoLinha").text());	 
					  var sfp = fp +data.rows[0].value.preco * parseInt(qtd);
					  parseFloat($(this).find(".precoLinha").text(sfp.toFixed(2)));
					  // console.log("Boato terceira class-- prim  "+fp+"." +sfp+"  . "+siq);
					  $(this).find(".qnt").text(siq);
					  existeP=true;	
					  var nod1=  $(this);
					  var node	=$("#tabelaPedido .selected");
					  node.removeClass('selected');
					  nod1.addClass('selected');	

		
				      }
				  })

//  if($("#tabelaMesaAnulacao").find('.selected').length==0 ) return;

				      if(	 data.rows[0].value.impressoraPedido=="complemento"    ){
					  
					  var nt=$("#tabelaPedido .selected");
					  $('<tr ><td class="cod" noWrap>'
					    +ms+'</td><td class="qnt" noWrap >'
					    +qtd+'</td><td class="nome" noWrap>'
					    +data.rows[0].value.nomeProduto 
					    +'</td><td  class="precoLinha" noWrap >'
					    +parseInt(qtd)* data.rows[0].value.preco
					    +'</td><td  class="precoUnitario" noWrap >'
					    + data.rows[0].value.preco
					    +'</td><td class="impressoraPedido" noWrap >'
					    + data.rows[0].value.impressoraPedido
					    +'</td><td class="categoriaProduto" noWrap >'
					    + data.rows[0].value.categoriaProduto
					    +'</td></tr>').insertAfter(nt)

				      }

				      if(!existeP  &&
					 data.rows[0].value.impressoraPedido!="complemento"    ){
					  var node	=$("#tabelaPedido .selected");

					  node.removeClass('selected');


					  $('#tabelaPedido').append('<tr class="selected"><td class="cod" noWrap>'
								    +ms+'</td><td class="qnt" noWrap >'
								    +qtd+'</td><td class="nome" noWrap>'
								    +data.rows[0].value.nomeProduto 
								    +'</td><td  class="precoLinha" noWrap >'
								    +parseInt(qtd)* data.rows[0].value.preco
								    +'</td><td  class="precoUnitario" noWrap >'
								    + data.rows[0].value.preco
								    +'</td><td class="impressoraPedido" noWrap >'
								    + data.rows[0].value.impressoraPedido
								    +'</td><td class="categoriaProduto" noWrap >'
								    + data.rows[0].value.categoriaProduto
								    +'</td></tr>');
				      }
				  var g = $('#svgPedidos') ;
				  g.remove();
				  $("#tabelaPedido .cod").hide();
				  $("#tabelaPedido .impressoraPedido").hide();
				  $("#tabelaPedido .precoUnitario").hide();
				  $("#tabelaPedido .categoriaProduto").hide();

				  return false;
			      }
			      if(data.rows.length==0) {
				  alert("produto nao existe x"+ ms+"x");
				  var g =$('#svgPedidos') ;
				  if(g != null){
				      g.remove();
				  }
				  return false;
			      }
			  }
			});
		//console.log("sejjja   "+this_t);
		//console.log("-----");
	    }
	}();
    }
}




function botaoTerceira(svg,gT,txtB,i){


	var gB = svg.group(gT,{
	    id: 'svgterceiraClassButao',
	    stroke: 'black',
	    strokeWidth: 2
	});

	var defs = svg.defs(gB); 
	svg.linearGradient(defs, 'myGradTer'+i, 
			   [[0, 'white'], [1, 'red']], 450,48+(i*40), 450, 85+(i*40), 
			   {gradientUnits: 'userSpaceOnUse'});
	
	
	var myrect=svg.rect(gB, 326 ,60+(i*40),200,36, {
	    id: 'svg_47',
//e6e6cc 79bead
	    fill:   "#79bead",  "rx": "3","ry": "3",
	    'stroke-linejoin': 'round',
	    stroke: '#000000',
	    'stroke-width': 2
	});
	svg.text(gB,426 ,82 +(i*40),txtB[i].value.nome.substring(0,18), {
	    id           : 'svg_s1',
	    "text-anchor": "middle",
	    fontFamily   : "serif",
	    strokeWidth  : "0" ,
	    strokeLinecap: "null" ,
	    fontSize     : "24", fill: "black"}
		);
    return gB;
}

function segundaClass (svg,g,txtA){
    var gS = svg.group(g,
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

	var defs = svg.defs(gA); 
	svg.linearGradient(defs, 'myGradSeg'+i, 
			   [[0, 'white'], [1, '#646D7E	']], 450,85+(i*50), 450, 115+(i*50), 
			   {gradientUnits: 'userSpaceOnUse'});
	
	
	svg.rect(gA, 167 ,95+(i*50),150,42, 
		 {
		     id			: 'svg_39',
		     fill		: "#646D7E" , // 'url(#myGradSeg'+i+")",
		     "rx"		: "3",
		     "ry"		: "3",
		     strokeLinejoin	: 'round',
		     stroke		: '#000000',
		     strokeWidth	: 2
		 });
	
	svg.text(gA,240 ,125+(i*50),txtA[i], 
		 {
		     id            : 'svg_s1',
		     "text-anchor" :"middle",
		     fon           : "serif",
		     strokeWidth   : "0" ,
		     strokeLinecap : "null" ,
		     fontSize      : "24",
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
		db.view("myViews/categoriasLista", 
			{startkey: [this_t," "],endkey: [this_t,"ZZZZZZZ"],
			 "limit" : numPrdLinha,
			 success: function(data){
			     //console.log(this_t+"   pppp" );
			     //	console.log(data.rows );
			     if(data.rows.length>0){
				 if(data.rows[numPrdLinha-1]!=undefined)
 				     terceiraClass (svg,g,data.rows,data.rows[0].value.nome,
						    data.rows[numPrdLinha-1].value.nome,this_t,numPrdLinha);
				 else
				     terceiraClass (svg,g,data.rows,data.rows[0].value.nome,
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
    db.view("myViews/categoriasLista", 
	    {startkey: [txtA[0]," "],endkey: [txtA[0],"ZZZZZ"],
	     limit : 12,
	     success: function(data){
		 //console.log(data);
		 //console.log(data.rows );
		 if(data.rows.length>0){
		     if(data.rows[12-1]!=undefined)
			 terceiraClass (svg,g,data.rows,data.rows[0].value.nome,
					data.rows[12-1].value.nome,txtA[0],12);
		     else
			 terceiraClass (svg,g,data.rows,data.rows[0].value.nome,
					data.rows[0].value.nome,txtA[0],12);
		 }
	     },
	     error   : function() { alert('erro view categorias.' );}
	    });
    
    $("#svgSegundaClass :first ").addClass("selected");
}


function dRC(svg,g){
    var rfc = svg.rect(g, 535, 210, 190, 170, 
		       {
			   id               : 'ecPed2cv',
			   fill             : "white",
			   'stroke-linejoin': 'round',
			   stroke           : 'orange',
			   'opacity'        : 0.1,
			   'stroke-width'   : 2

		       });

    var rfb = svg.rect(g, 535, 380, 190, 170, 
		       {
			   id               : 'ecPed2vsr',
			   fill             : "white",
			   'stroke-linejoin': 'round',
			   stroke           : 'orange',
			   'opacity'        : 0.1,
			   'stroke-width'   : 2
		       });


    rfb.onclick = function(){
	return function(){
	    if($("#tabelaMesa tr").length - $("#tabelaMesa tr").filter(":hidden").length >12)
	    primVis ($("#tabelaMesa tr").first()).hide();
	}

    }();

    rfc.onclick = function(){
	return function(){
	    //
	    primVis ($("#tabelaMesa tr").first()).prev().show()

	}

    }();
}



/*
  tabelaMesa
  fo.setAttribute('width', '190');
  fo.setAttribute('height', '340');
  fo.setAttribute('x', '535');
  fo.setAttribute('y', '210');
  tabelaPedido
  fo.setAttribute('width', '190');
  fo.setAttribute('height', '150');
  fo.setAttribute('x', '535');
  fo.setAttribute('y', '10');
  
  // funcao auxiliar para navegar tabelas
  */

function naoEscondidos( tabela ){
    return $("#"+tabela + "tr").length - $("#"+tabela+" tr").filter(":hidden").length
}

function ultNVis(n){
    primVis (n).prev();
}

function primVis(n){
    if(n.length==0) return n;
    else{
	if(n.is(":visible")) return n;
	else return primVis(n.next());
    }

}

//FIM de: funcao auxiliar para navegar tabelas


function listagemMesa(rows){

    var svg = $('#svgbasics').svg('get').root();
    var d= svg.firstChild;
    var fo = document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject');

    fo.setAttribute('width', '190');
    fo.setAttribute('height', '340');
    fo.setAttribute('x', '535');
    fo.setAttribute('y', '210');

    var body = document.createElementNS('http://www.w3.org/1999/xhtml', 'body');
    body.setAttribute('xmlns', 'http://www.w3.org/1999/xhtml');
    body.style.margin = '0px';
    body.style.height = '100%';

    var table = document.createElement('table');
    table.setAttribute('id', 'tabelaMesa');
    table.style.width = '100%';
    var tbody = document.createElement('tbody');
    for (var j = 0; j < rows.length; j++) {
	if (rows[j] != undefined &&( rows[j].precoLinha!=0 ||  "complemento" ==rows[j].impressoraPedido    )     ) {
	    /*		console.log("........................");
			console.log(rows);
			console.log(rows[j].quantidadeLinha+" preco "+rows[j].produto);
	    */		
	    
	    
	    var tr = document.createElement('tr');
	    var td = document.createElement('td');
	    td.setAttribute("noWrap","true");
	    td.setAttribute("class" ,"quantidade");			
	    td.style.background = 'green';
	    td.appendChild(document.createTextNode(rows[j].quantidadeLinha));

	    var td2 = document.createElement('td');
	    td2.setAttribute("noWrap","true");
	    td2.setAttribute("class" ,"produto"); 
 	    td2.appendChild(document.createTextNode(rows[j].produto));
	    
	    var td3 = document.createElement('td');
	    td3.setAttribute("noWrap","true");
	    td3.setAttribute("class" ,"precoLinha");

	    //preco unitario
	    td3.appendChild(document.createTextNode(rows[j].precoLinha.toFixed(2)));
	    var td4 = document.createElement('td');
	    td4.setAttribute("noWrap","true");
	    td4.setAttribute("class","hora");
	    //var tdf = document.createElement('font');
	    //tdf.setAttribute("size","1");
	    td4.appendChild(document.createTextNode(rows[j].hora));
	    //td4.appendChild(tdf);
	    
	    tr.appendChild(td );
	    tr.appendChild(td2);
	    tr.appendChild(td4);
	    tr.appendChild(td3);
	    
	    tbody.appendChild(tr);
	    table.appendChild(tbody);
	}
    }
    var f3= function (a){return a.precoLinha;};
    var t1=0.0;
    // console.log(rows.length);
    // console.log(rows.map(f3));
    if (rows.length>0) t1=rows.map(f3).reduce(function  (a,b){return (a+b);}) ;
    var svg = $('#svgbasics').svg('get');
    
    
    
    svg.text("TOTAL  "      , {fontFamily: "serif","x" : "540","y" : "575",
			       strokeWidth : "0" ,strokeLinecap : "null",
			       strokeDasharray : "null", 
			       strokeLinejoin : "null" , fontSize: "16"
			      });
    svg.text(t1.toFixed(2) , {fontFamily: "serif","x" : "660" ,"y" : "575" ,
			      strokeWidth : "0" ,strokeLinecap : "null",
			      strokeDasharray : "null", 
			      strokeLinejoin : "null", fontSize: "16" 
			     });
    
    body.appendChild(table);
    fo.appendChild(body);
    d.appendChild(fo);

}
//agrega todos os produtos com o mesmo codigo retirando as anulacoes e linha a zero
function reduzLinhas(rows){
    var aR = [];
    
 
for (var i = 0; i < rows.length; i++) {
	var sinal = 1;
    if((rows[i]).anulacao!=undefined && (rows[i]).anulacao==true)
	sinal = -1;
    var ty=objPosArr(((rows[i]).codProduto) ,aR);
 console.log("ty");
    console.log(((rows[i]).codProduto));
   console.log(ty);
    if(   ty  ==""){
	var rR1 = {};
	rR1.quantidadeLinha = parseFloat((rows[i]).quantidadeLinha) *sinal;
	rR1.produto = ((rows[i]).produto  );
	rR1.codProduto = ((rows[i]).codProduto  );
	rR1.precoLinha = ((rows[i]).precoLinha  );
	rR1.precoUnitario = ((rows[i]).precoUnitario  );	
	rR1.impressoraPedido = ((rows[i]).impressoraPedido  );
	rR1.categoriaProduto = ((rows[i]).categoriaProduto  );

	aR.push(rR1);

    }
    else{	
	var pr1=ty.obj;
	var rR2 = {};
	rR2.produto		= (pr1.produto  );
	rR2.precoUnitario	= (pr1.precoUnitario  );
	rR2.codProduto		= ((rows[i]).codProduto  );
	rR2.quantidadeLinha	=  pr1.quantidadeLinha+parseFloat((rows[i]).quantidadeLinha) *sinal;
	rR2.precoLinha		= pr1.quantidadeLinha *(pr1.precoUnitario )+ 
	    parseFloat((rows[i]).precoUnitario)  *parseFloat((rows[i]).quantidadeLinha) *sinal;
 	rR2.impressoraPedido	= ((rows[i]).impressoraPedido  );
	rR2.categoriaProduto  = ((rows[i]).categoriaProduto  );

	aR[ty.pos]		=rR2;

    }


}

    //aR.map(function (a ){if(a!= undefined ) console.log(  a.quantidadeLinha+"  "+a.produto) ;});
    // console.log(aR);
    // console.log("?????????");
    return aR;
}




function objPosArr(vs,arr){

	for(var i=0;i<arr.length;i++){
	    if( arr[i].codProduto==vs) return {obj:arr[i],pos:i};
	   // console.log(produtosArray[i].nomeProduto);
	}
    return '';

}






//nao agrega os produtos nem retira as linha a zero apenas remove as anulacoes
function reduzLinhas2(linhas){


    
    
    var rows= linhas.slice();
    var aR = [];


   
   
/*
 //console.log( "######dddaag#####");
    linhas.map(
	function(row){
	    
	     console.log( row.quantidadeLinha +' td    ' +row.codProduto+" - "+row.quantidadeLinha );
	});
 //console.log( "######fimmm#####");

*/
   
    
    for (var i = 0; i < rows.length; i++) {

	
	var cdp=parseInt((rows[i]).codProduto).toString();
	
	var f3= function (a){return parseInt(a.codProduto).toString();};
	
	var ex1 =jQuery.inArray(cdp, aR.map(f3) );
	
	if((rows[i]).anulacao==false )	{
	    var ca= jQuery.extend(true,{},rows[i]);
	    // console.log( "----push   _________________"+i);
	    // console.log(ca);
	    aR.push(ca);
	    
	}
	else{	
	   // console.log( "else ****  _________________"+i);
	    var q =rows[i].quantidadeLinha;	
	    while (  q  > 0) {
		ex1 =jQuery.inArray(cdp, aR.map(f3) );
		//console.log( "....................."+cdp);
		//console.log(cdp);	
		if(  aR[ex1].quantidadeLinha -q  > 0)
		{	
		    aR[ex1].quantidadeLinha=aR[ex1].quantidadeLinha -q;
		    aR[ex1].precoLinha= aR[ex1].precoLinha-(aR[ex1].precoUnitario*q );
		    q=0;
		}
		else if(  aR[ex1].quantidadeLinha -q  == 0)
		{	
		    aR.splice(ex1,1);
		    q=0;	
		}
		else if(  aR[ex1].quantidadeLinha -q  < 0)
		{	q=q- aR[ex1].quantidadeLinha;
			aR.splice(ex1,1);
		}		
	    }
	}
    }
    /*
      linhas.map(
      function(row){
      console.log( "#####bbbbb6w#####");
      console.log( row.quantidadeLinha +' td    ' +row.codProduto+" - "+row.quantidadeLinha );
      });*/
    return aR;	
}





function criaTabelaPedido( ){
    var d = $('#svgbasics').svg('get').root().firstChild;
    var fo = document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject');
    fo.setAttribute('width', '190');
    fo.setAttribute('height', '150');
    fo.setAttribute('x', '535');
    fo.setAttribute('y', '10');
    var body = document.createElementNS('http://www.w3.org/1999/xhtml', 'body');
    body.setAttribute('xmlns', 'http://www.w3.org/1999/xhtml');
    body.style.margin = '0px';
    body.style.height = '100%';
    var table = document.createElement('table');
    table.setAttribute('id', 'tabelaPedido');
    table.style.width = '100%';
    var tbody = document.createElement('tbody');
    table.appendChild(tbody);
    body.appendChild(table);
    fo.appendChild(body);
    d.appendChild(fo);

} 


function pedido_click(empregado,ms,doc,permissoes,podeIns) {
    var g= $("#tabelaPedido tr");
    var cod1=[];
    for(var i=0;i<g.length;i++){
	// class="cod"   class="qnt"  class="nome"  class="precoLinha"  class="precoUnitario"  
        var a2=$("#tabelaPedido tbody").children(" :nth-child("+ (i+1) +")  "  ).find(".cod").text();
        var b2=$("#tabelaPedido tbody").children(" :nth-child("+ (i+1) +")  "  ).find(".qnt").text();
        var c2=$("#tabelaPedido tbody").children(" :nth-child("+ (i+1) +")  "  ).find(".nome").text();
        var d2=$("#tabelaPedido tbody").children(" :nth-child("+ (i+1) +")  "  ).find(".precoLinha").text();
	var e2=$("#tabelaPedido tbody").children(" :nth-child("+ (i+1) +")  "  ).find(".precoUnitario").text();
	var f2=$("#tabelaPedido tbody").children(" :nth-child("+ (i+1) +")  "  ).find(".impressoraPedido").text(); 
	var g2=$("#tabelaPedido tbody").children(" :nth-child("+ (i+1) +")  "  ).find(".categoriaProduto").text(); 

	//console.log(c2+"   lll  "+e2);
	//$("#tabelaPedido  .nome").hide();
	//$("#tabelaPedido  .cod").hide();
        cod1[i]={'codigo' : a2, 'quantidade' : b2, 'nome' : c2, 'precoLinha': d2 , 'precoUnitario' : e2 ,
		 'impressoraPedido' : f2,'categoriaProduto':g2 };
    }










    fazPe(cod1,empregado,ms,doc,permissoes,podeIns ,false )
    //fazPe(cod1 ,false )
}



function fazPe(num, empregado,ms,doc,permissoes,podeIns ,anulacao ) {
        
    console.log( "#######fffff###aa##");
    
    if ( doc == null){
	// acontece quando a mesa nao esta aberta
	// console.log("abre mesa");
	db.view("myViews/mesasAbertas",{ 
	    "keys":[ms] ,
	    success: function(data){
		//certificar se entretanto nao foi aberta
		if(data.rows.length==0)
		    criaNovaContaELinha(num, empregado,ms,doc,permissoes,podeIns ,anulacao );
		
		
	    }
	});

	
	return;
    }
    var linhas=doc.linhaConta;

    /*  console.log( (doc.linhaConta) );
    */
    for(var i=0;i<num.length; i++){
	var linh1={};
	var p=num[i];
	// console.log("pedido  "+p.impressoraPedido+"  . "+p.codigo);	
	linh1.codProduto=( p.codigo );
	linh1.produto=	 p.nome;
	linh1.quantidadeLinha= parseInt( p.quantidade);
	var sinalP=1;
	if(anulacao) sinalP=-1;
	linh1.precoLinha= parseFloat( p.precoLinha)*sinalP;
	linh1.anulacao= anulacao;
	linh1.impressoraPedido = p.impressoraPedido;
	linh1.precoUnitario=parseFloat( p.precoUnitario);
	linh1.categoriaProduto=( p.categoriaProduto);
	
	var d = new Date();
	var h= d.getHours();
	var m= d.getMinutes();
	linh1.hora = h.toString()+':'+m.toString();
	var numlinh=linhas.length;
	linh1.linha=numlinh;
	linhas=linhas.concat([linh1]);
    }
    doc.linhaConta=linhas;
    var f3= function (a){return a.precoLinha;};

    doc.total=(doc.linhaConta.map(f3).reduce(function  (a,b){return (a+b);}) );
    doc.aberta=true;
    var f4=function (a){return (  a.precoLinha<0);};
    var existeLinhasNegativas=(reduzLinhas(doc.linhaConta).map(f4).reduce(function  (a,b){return (a||b);}) );

    var f5=function (a){return (    (isNaN(a.precoLinha))           
				 || ( isNaN(a.precoUnitario))       
				 || ( (a.precoLinha)===null )       
				 || ( (a.precoUnitario)===null )    
				 || ( (a.precoLinha)=== undefined ) 
				 || ( (a.precoUnitario)===undefined ) 				  
			       );};

    var existeNAN=(doc.linhaConta).map(f5).reduce(function  (a,b){return (a||b);}) ;
    
    console.log("NaN  "+existeNAN);

    if(existeLinhasNegativas || existeNAN ){
	//TODO
	//neste caso o doc original foi alterado por esta funco o que pode provocar conflitos
	 if(existeLinhasNegativas )
	     alert("quantidade que pretende anular não existe.Func fazPe de ecranMesa ");
	 if( existeNAN )
	     alert("quantidade ou preco NaN.Func fazPe de ecranMesa ");
    }
    else{
	if(doc.total < 0.00001)	    
	    db.removeDoc(doc,{
		success : function (){
		   
		    imprimePedido(empregado,ms,num,anulacao);

  
        constroiQuadroMesas(7, 6, empregado , permissoes );
        $(document).unbind('keydown', fk3);
        $(document).unbind('keydown', fk2);
        $(document).unbind('keydown', fk21);
        $(document).unbind('keydown', fk1);





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
		imprimePedido(empregado,ms,num,anulacao);
		ecraMesa(empregado,ms,doc,permissoes ,podeIns );
	    },
	    error   : function () { 
		//TODO
		//neste caso o doc original foi alterado por esta funco o que pode provocar conflitosƒ
		alert("erro inserir doc.Funcao fazPe em ecranMesa " );
	    }
	});
    }
    $(document).unbind('keydown', fk3);
    $(document).unbind('keydown', fk2);
    $(document).unbind('keydown', fk21);
    $(document).unbind('keydown', fk1);
}

function criaNovaContaELinha(num, empregado,ms,doc,permissoes,podeIns ,anulacao ){
    
    var document = {};
    //var t1=0;
    var linhas=[];
    for(var i=0;i<num.length; i++){
	var linh1={};
	var p=num[i];
	
	linh1.codProduto=( p.codigo );
	linh1.produto=	 p.nome;
	linh1.impressoraPedido=	 p.impressoraPedido;
	linh1.quantidadeLinha= parseInt( p.quantidade);
	var sinalP=1;
	linh1.precoLinha= parseFloat( p.precoLinha)*sinalP;
	linh1.anulacao= false;
	linh1.precoUnitario=parseFloat( p.precoUnitario);
	linh1.categoriaProduto=( p.categoriaProduto);

	var d = new Date();
	var h= d.getHours();
	var m= d.getMinutes();
	linh1.hora = h.toString()+':'+m.toString();
	var numlinh=linhas.length;
	linh1.linha=numlinh;
	linhas=linhas.concat([linh1]);
    }

    document.linhaConta=linhas;
    var f3= function (a){return a.precoLinha;};
    document.total=( document.linhaConta.map(f3).reduce(function  (a,b){return (a+b);}) );

    var d = new Date();
    var h= d.getHours();
    var m= d.getMinutes();
    document.hora = h.toString()+':'+m.toString();

    document.empregado =   empregado;
    document.type = "mesa";
    document.mesa = ms;
    document.aberta = true;
    document.diaSessao ="1/1/1900";
    db.view("myViews/diaSessao",{
	success: function(data){
	    document.diaSessao = [data.rows[0].value.ano,
				  data.rows[0].value.mes,
				  data.rows[0].value.dia];
	    db.saveDoc(document,{
		success : function (){
		    console.log('mesa criada e inserido pedido');
		    // console.log(document);console.log('-----------------');
		    imprimePedido(empregado,ms,num,anulacao);
		    ecraMesa(empregado,ms,document,permissoes ,podeIns );
		},
		error   : function() { alert('erro inseir doc.Func criaNovaContaLista em ecranMesa' );}
	    });
	}
    });
}


function  talaoImprime_click(doc,empregado,permissoes) {
    //TODO imprime na impressora
    doc.aberta = false;
    db.saveDoc(doc ,{
        success : function () {
            imprimeTalao(doc);
	    constroiQuadroMesas(7,6,empregado,permissoes);

 	    //alert('inserido');				
	},
        error   : function () { alert('erro  inserir doc.Func ecranMesa talaoImprime_click' );                }
    });
    
}

function  imprimeTalao(document) {
 	
    var impT=[];
    impT.push("\x1b\x40\x1b\x63\x34\x02\x1b\x74\x03\x1b\x45\x01Restaurante O Alves");
    impT.push("\x0d\x0a\x1b\x45\x00Consulta de Mesa "+document.mesa);
    impT.push("\x0d\x0a ");
    
    var tf= (reduzLinhas(document.linhaConta));
    // console.log((document.linhaConta));
    /*   console.log(tf);
	 console.log("'''''''''''''ggff''''''''''''''");
    */
    var tf2= ordenaPorCategoria(tf);
    tf2.map(function (a) {
	var pr1=parseFloat(a.precoLinha).toFixed(2);
	if(a!=undefined &&  parseFloat(a.precoLinha)>0 ) 
	{ 
	    var si= (a.produto +"                                 ").slice(0,22);
	    var pi=  ("       "+pr1);
	    var pii= pi.slice(pi.length-6,pi.length );
            var qi=a.quantidadeLinha+"        ";
	    var qii= qi.slice(0,4);
	    impT.push(qii+"  "+si +pii+"" );  
	}
    });
    impT.push(' \x0d\x0a\x1b\x21\x00\x0d '+	'---------------------------------'+' '); 

 var f3= function (a1){return a1.precoLinha;};
    var t1=0.0;
  /*  console.log("///////////////////////////////");
    console.log(document.linhaConta);
    console.log("linhaConta.map(f13)");
    console.log(document.linhaConta.map(f3));
     console.log(document.linhaConta.map(f3));
*/
    if (document.linhaConta.length>0) t1=document.linhaConta.map(f3).reduce(function  (a,b){return (a+b);}) ;

    impT.push("\x0d\x0a\x0d\x0a\x1b\x21\x20TOTAL      "+
	      (t1).toFixed(2)+'€\x1b\x21\x00\x0d'); 
    impT.push("\x0d\x0a");
    impT.push(" empregado: "+document.empregado);
    //		impT.push("\x0d\x0ahora "+document.hora+"  ");
    impT.push("\x0d\x0a\x0d\x0a");
    impT.push("\x0d\x0a      Processado por computador");
    impT.push("\x0d\x0a           IVA incluido  13%    ");
    impT.push("\x0d\x0a                       ");
    impT.push("\x0d\x0a                       ");
    impT.push("\x0d\x0a                       ");
    impT.push("\x0d\x0a                       ");

    //    impT.push("\x0d\x0a             \n \n \n \n \n ");
    //impT.push("\x0d\x0a  \n\x1b\x64");
    impT.push("\x1b\x69");
    
    var impB={"type":"impressora","texto":impT,"local":window.location.host};
    db.saveDoc(impB,{
		error : function(){
		    alert("erro save doc.Funcao imprimeTalao em ecranMesa ");		
		}
	    });

}



function ordenaPorCategoria(arrP){
 console.log("weewe@");
    console.log(arrP);
    var arrSort=[];
    var cats4=
	["Entradas", "Sopa","Peixe","Carne",
	 "V.Mad Branco","V.Mad Tinto","V.Verde Branco","V.Verde Tinto","Refrigerante",
	 "Complementos","Acompanhamento","Telefone","Sobremesa","Gelados",
	 "Aguardentes","Whisky's","Champagne","Licores", "Cafés",""
	];

    for(var i=0;i<cats4.length;i++ ){
	for(var t=0;t<arrP.length;t++ ){
	    console.log("*****..............*"+ arrP[t].produto);
	    console.log( cats4[i]+"=="+ arrP[t].categoriaProduto.replace(/^\s+|\s+$/g, "")+"weewe@");
	    if ( cats4[i]==  arrP[t].categoriaProduto.replace(/^\s+|\s+$/g, "")) 
	    {
		console.log( 'entrou*'+cats4[i]+"=="+ arrP[t].categoriaProduto+"*weewe@");
		arrSort.push(arrP[t]);
	    }
	    
	}
    }
/*
   for(var i=0;i<arrP.length;i++ ){
 
	    if ( arrP[i]== undefined ) 
		arrSort.push(arrP[t]);

	    
 
    }
*/

    return arrSort;

}




function  imprimePedido(empregado,ms,num,anulacao) {
  
    /*
      ASCII ESC   !  n
      Hex    1B  21  n
    */
    // impT.push("!3");
    
    var dE= imprimePedido_Aux(num,[]);;

    db.view("myViews/contadorPedido", {

	success: function(data){

	    dE.map(function (t) {

		var numPed= data.rows[0].value;
		console.log(data.rows);
		console.log(data.rows[0].key.numero);

		var impT=[];
		impT.push("\x1b\x40\x1b\x63\x34\x02\x1b\x74\x03\x1b\x45\x00\x1b\x2d\x00");
		if (anulacao )  impT.push('!2   ANULACAO   ');
		//!1
		var d = new Date();
		var h= zeroFill(d.getHours(),2);
		var m= zeroFill(d.getMinutes(),2);
		var ka = h.toString()+':'+m.toString();
		impT.push("!2 m "+ms+"  "+empregado+"  "+numPed+"\x0a\x0a\x0a");
		
		//impT.push("!0 ");   

		t[1].map(function (a) {
		    var pr1=parseFloat(a.precoLinha).toFixed(2)
		   // impT.push("!0"+a.quantidade +" "+a.nome.substring(0,15)+"\x1b\x21\x00 "+ parseFloat(a.precoUnitario).toFixed(2)); 
		   // impT.push("\x1b\x21\x0d"+a.quantidade +" "+a.nome.substring(0,14)+"\x1b\x21\x00 "+ parseFloat(a.precoUnitario).toFixed(2)); 	    
		      impT.push("\x1b\x21\x31"+a.quantidade +" "+a.nome.substring(0,14)+"\x1b\x21\x00 "+ parseFloat(a.precoUnitario).toFixed(2)); 
		    impT.push("\x0d\x0a");
		    
		});
		
		impT.push('\x1b!\x00'+	'\n--------'+ka+'---------'+'\x0c \x1b\x64\x03'); 
		impT.push("\x0d\x0a   ");
		impT.push("\x0d\x0a                       ");
		impT.push("\x0d\x0a                       ");
		
		//  impT.push("\x0d\x0a  \n\n\n\x1d\x56\x00");
		// impT.push(" \x1bd5");
		// impT.push("!i");
		impT.push("\x1b\x69");

		var impB={"type":"impressora","texto":impT,"local": t[0] }; 
		console.log("..............");   
		console.log(t[0]);
		console.log(impT);
		//if (impT!=undefined || impT!="" )
		db.saveDoc(impB,
			   {   
			       success : function (data){
				   console.log(data);
				   // console.log(document);
				   console.log('-----------------');
				   
			       },
			       error : function(){
				   alert("erro save doc.Funcao imprimePedido em ecranMesa ");	
			       }
			   });
		

	    });

	    var sd= data.rows[0].key;
	    sd.numero=sd.numero+1;
	    if(sd.numero==100) sd.numero=0;
	    db.saveDoc(sd);
	    

	}
    });





 
	
}

//Separa os pedidos por impressoras

function  imprimePedido_Aux(listImp,lu) {

    if( listImp.length == 0 ){
	return lu;}
    var resto=[];
    var listaIR=[];
    listaIR[0]= listImp[0].impressoraPedido;
    listaIR[1]=[];
    var impAnt="";  
    listImp.map(
	function (a) {

	    if(  listImp[0].impressoraPedido== a.impressoraPedido ||
		 (impAnt==listImp[0].impressoraPedido && "complemento" == a.impressoraPedido  ) )
	    {
		listaIR[1].push(a);

	    }
	    else resto.push(a);

	    if("complemento" != a.impressoraPedido )
	    impAnt=a.impressoraPedido;
	}

    );


    lu.push(listaIR);

     return imprimePedido_Aux( resto,lu) ;
   




}



function zeroFill( number, width )
{
  width -= number.toString().length;
  if ( width > 0 )
  {
    return new Array( width + (/\./.test( number ) ? 2 : 1) ).join( '0' ) + number;
  }
  return number;
}
