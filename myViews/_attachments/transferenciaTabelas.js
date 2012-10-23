var AE=[];
var AD=[];

function  butaoDir_cima (e) {
    var node=$("#tabelaMesaDireita .selected"); 
    if(node.prev().length>0){
	node.removeClass('selected');
	node.prev().addClass('selected');
	primVis ($("#tabelaMesaDireita tr").first()).prev().show();
    }
    if($("#tabelaMesaDireita .selected").length==0)  $("#tabelaMesaDireita tr:last").addClass('selected');

}

function  butaoDir_baixo (e) {
    var node=$("#tabelaMesaDireita .selected");
    if(node.next().length>0){
	node.removeClass('selected');
	node.next().addClass('selected');
	if(
	    $("#tabelaMesaDireita tr").length - 
		$("#tabelaMesaDireita tr").filter(":hidden").length >4
	  )
	    primVis ($("#tabelaMesaDireita tr").first()).hide();
	
    }
    if($("#tabelaMesaDireita .selected").length==0)  $("#tabelaMesaDireita tr:last").addClass('selected');
}
function  butaoEsq_cima (e) {
    var node=$("#tabelaMesaEsquerda .selected"); 
    if(node.prev().length>0){
	node.removeClass('selected');
	node.prev().addClass('selected');
	primVis ($("#tabelaMesaEsquerda tr").first()).prev().show();
    }
    if($("#tabelaMesaEsquerda .selected").length==0)  $("#tabelaMesaEsquerda tr:last").addClass('selected');
}

function  butaoEsq_baixo (e) {
    var node=$("#tabelaMesaEsquerda .selected");
    if(node.next().length>0){
	node.removeClass('selected');
	node.next().addClass('selected');
	if( $("#tabelaMesaEsquerda tr").length - 
		$("#tabelaMesaEsquerda tr").filter(":hidden").length >4
	)
	    primVis ($("#tabelaMesaEsquerda tr").first()).hide();
    }
    if($("#tabelaMesaEsquerda .selected").length==0)  $("#tabelaMesaEsquerda tr:last").addClass('selected');
}

function butaoEsqDir_click(evt)  {
    if(! $("#tabelaMesaEsquerda").find('.selected').length==0 ){
	var precoUnitario= 0.0;
	var cod1	 = $("#tabelaMesaEsquerda").find('.selected').find('.cod').text();
	var precoUnitario= $("#tabelaMesaEsquerda").find('.selected').find('.precoUnitario').text();
	var nome	 = $("#tabelaMesaEsquerda").find('.selected').find('.nome').text();
	var imp	 	 = $("#tabelaMesaEsquerda").find('.selected').find(".impressoraPedido").text(); 
	var cat	 	 = $("#tabelaMesaEsquerda").find('.selected').find(".categoriaProduto").text(); 
	console.log();
	//TODO a funcao Aux pode levar outros argumentos qnt e cod
	butaoEsqDir_Aux (evt,parseFloat(precoUnitario));	
	//TODO quantidade diferente de 1 e fracionaria
	//TODO hora
	//if( $("#tabelaMesaEsquerda").find('.selected').length==0 ){ //qundo nao tem nada selecionado
	
	AD.push({'codProduto'		: cod1,
		 'quantidadeLinha'	: 1,
		 'produto'		: nome, 
		 'precoLinha'		: parseFloat(precoUnitario) ,
		 'precoUnitario'	: parseFloat(precoUnitario) ,
		 'impressoraPedido'	: imp , 
		 'categoriaProduto'     : cat,
		 'anulacao'		: false ,
		 'hora'			: "12:00" 
		});		
	AE.push({'codProduto'		: cod1, 
		 'quantidadeLinha'	: 1, 
		 'produto'		: nome,
		 'precoLinha'		: -parseFloat(precoUnitario) ,
		 'precoUnitario'	: parseFloat(precoUnitario) ,
		 'impressoraPedido'	: imp ,
		 'categoriaProduto'     : cat,
		 'anulacao'		: true  , 
		 'hora'			: "12:00"
		});
    }
}

function  butaoDirEsq_click (e ) {
    if( ! $("#tabelaMesaDireita").find('.selected').length ==0){
	var precoUnitario=0.0;
	var cod1         =$("#tabelaMesaDireita").find('.selected').find('.cod').text();
	var precoUnitario=$("#tabelaMesaDireita").find('.selected').find('.precoUnitario').text();
	var nome         =$("#tabelaMesaDireita").find('.selected').find('.nome').text();
	var imp          =$("#tabelaMesaDireita").find('.selected').find(".impressoraPedido").text(); 
	var cat	 	 =$("#tabelaMesaDireita").find('.selected').find(".categoriaProduto").text();
	butaoDirEsq_Aux (e,parseFloat(precoUnitario));	
	
	//if( $("#tabelaMesaDireita").find('.selected').length==0 ){ //qundo nao tem nada selecionado
	AE.push({'codProduto'		: cod1, 
		 'quantidadeLinha'	: 1, 
		 'produto'		: nome,
		 'precoLinha'		: parseFloat(precoUnitario) ,
		 'precoUnitario'	: parseFloat(precoUnitario),
		 'impressoraPedido'	: imp , 
		 'categoriaProduto'     : cat,
		 'anulacao'		: false , 
		 'hora'			: "12:00"
		});		
	AD.push({'codProduto'		: cod1, 
		 'quantidadeLinha'	: 1, 
		 'produto'		: nome, 
		 'precoLinha'		: -parseFloat(precoUnitario) ,
		 'precoUnitario'	: parseFloat(precoUnitario),
		 'impressoraPedido'	: imp  ,
		 'categoriaProduto'     : cat,
		 'anulacao'		: true  , 
		 'hora'			: "12:00"
		});
    }
}


function  butaoEsqDir_Aux (e,precoUnitario) {

    var node	=$("#tabelaMesaEsquerda .selected");
    var quant1	=$("#tabelaMesaEsquerda").find('.selected').find('.qnt').text();
    var cod1	=$("#tabelaMesaEsquerda").find('.selected').find('.cod').text();
    if(parseInt(quant1)==1 ){
	if(node.next().length>0){
	    node.removeClass('selected');
	    node.next().addClass('selected');
	}
	else {
	    node.removeClass('selected');
	    node.prev().addClass('selected');
	}

	var findC=null;
	$('#tabelaMesaDireita tr').each(function() {
	    var $tds = $(this).find('td ');
	    if($tds.length != 0) {
		var $currText = $tds.eq(0).text();
		if($currText==cod1) 	findC=$tds;
	    }		

	});

	//existe cod na oura tabela
	if(findC != null){
	    var nh=parseInt( findC.filter(".qnt").text());
	    findC.filter(".qnt").text(nh+1);
	    var nh2=parseFloat( findC.filter(".precoLinha").text());
	    var nh3=nh2+precoUnitario;
	    findC.filter(".precoLinha").text(nh3.toFixed(2));
	} 
	else  { 
	    var nodeCl=node.clone();
	    nodeCl.find(".qnt").text(1);
	    nodeCl.find(".precoLinha").text(precoUnitario.toFixed(2));
	    $('#tabelaMesaDireita ' ).find('tbody').append(nodeCl);
	} 
	
	node.remove();
    } 
    else{//é igual so que na tabelaMesaAnulacao nao é removido o node apenas a quantidade em -1 e o preco
	
	var findC=null;
	$('#tabelaMesaDireita tr').each(function() {
	    var $tds = $(this).find('td ');
	    if($tds.length != 0) {
		var $currText = $tds.eq(0).text();
		if($currText==cod1)
		    findC=$tds;
	    }
	});
	
	
	//existe cod na oura tabela
	if(findC != null){
	    var nh=parseInt( findC.filter(".qnt").text());
	    findC.filter(".qnt").text(nh+1); 
	    var nh2=parseFloat( findC.filter(".precoLinha").text());
	    var nh3=nh2+precoUnitario;
	    findC.filter(".precoLinha").text(nh3.toFixed(2));
	    
	} 
	else  { 
	    var nodeClone=(node.clone());
	    nodeClone.find(".qnt").text(1);
	    nodeClone.find(".precoLinha").text(precoUnitario.toFixed(2));
	    nodeClone.removeClass('selected');
	    $('#tabelaMesaDireita ' ).find('tbody').append(nodeClone);  
	} 

	var qw=parseInt( node.find(".qnt").text());
	node.find(".qnt").text(qw-1);		
	var nh2=parseFloat( node.find(".precoLinha").text());
	var nh3=nh2-precoUnitario;
	node.find(".precoLinha").text(nh3.toFixed(2));
    }
}


function  butaoDirEsq_Aux (e,precoUnitario) {

    var node  =$("#tabelaMesaDireita .selected");
    var quant1=$("#tabelaMesaDireita").find('.selected').find('.qnt').text();
    var cod1  =$("#tabelaMesaDireita").find('.selected').find('.cod').text();

    if(parseInt(quant1)==1 ){
	if(node.next().length>0){
	    node.removeClass('selected');node.next().addClass('selected');
	}
	else {
	    node.removeClass('selected');node.prev().addClass('selected');
	}
	
	var findC=null;
	$('#tabelaMesaEsquerda tr').each(function() {
	    var $tds = $(this).find('td ');
	    if($tds.length != 0) {
		var $currText = $tds.eq(0).text();
		if($currText==cod1) 	findC=$tds;
	    }		
	});

	//existe cod na oura tabela
	if(findC != null){
	    var nh=parseInt( findC.filter(".qnt").text());
	    findC.filter(".qnt").text(nh+1);
	    var nh2=parseFloat( findC.filter(".precoLinha").text());
	    var nh3=nh2+precoUnitario;
	    findC.filter(".precoLinha").text(nh3.toFixed(2));
	} 
	else  { 
	    var nodeCl=node.clone();
	    nodeCl.find(".precoLinha").text(precoUnitario);
	    $('#tabelaMesaEsquerda ' ).find('tbody').append(nodeCl);
	} 
	node.remove();
    } 
    else{//é igual so que na tabelaMesaAnulacao nao é removido o node apenas a quantidade em -1 e o preco

	var findC=null;
	$('#tabelaMesaEsquerda tr').each(function() {
	    var $tds = $(this).find('td ');
	    if($tds.length != 0) {
		var $currText = $tds.eq(0).text();
		if($currText==cod1)
		    findC=$tds;
	    }
	});

	//existe cod na oura tabela
	if(findC != null){
	    var nh=parseInt( findC.filter(".qnt").text());
	    findC.filter(".qnt").text(nh+1); 
	    var nh2=parseFloat( findC.filter(".precoLinha").text());
	    var nh3=nh2+precoUnitario;
	    findC.filter(".precoLinha").text(nh3.toFixed(2));
	} 
	else  { 
	    var nodeClone=(node.clone());
	    nodeClone.find('.qnt').text(1);
	    nodeClone.find(".precoLinha").text(precoUnitario.toFixed(2));
	    nodeClone.removeClass('selected');
	    $('#tabelaMesaEsquerda ' ).find('tbody').append(nodeClone);  
	} 

	var qw=parseInt( node.find(".qnt").text());
	node.find(".qnt").text(qw-1);		
	var nh2=parseFloat( node.find(".precoLinha").text());
	var nh3=nh2-precoUnitario;
	node.find(".precoLinha").text(nh3.toFixed(2));
    }
}



/*funcao principal init*/ 
function transferencia_click(empregado,ms,this_d,permissoes,podeIns) {
  
    AE=[];
    AD=[];
    var lm = [];
    db.view("myViews/mesasAbertas", {
	success: function(data){
		    data.rows.map(function(row){
			lm[row.key] = { aberta :  row.value.aberta ,
					nome   :  row.value.empregado ,
					tot    :  row.value.total ,
					doc    :  row.value 
				      };	
		    });
	    
	}
    });



    db.view("myViews/empregadoLista", {
	key:empregado,
	success: function(data){
	    
	    var mE = data.rows[0].value.mesas
	   // desenhaQuadradinhos(7, 8, lm,mE ,k,permissoes);
	    desenhaEscolheMesa(7, 6, lm,mE,empregado,ms,this_d,permissoes,podeIns);
	}
    });


}


function desenhaEscolheMesa(nc, nl, lm,mE,k,mesa,docum,permissoes,podeIns){
    console.log(mE);
     var svg = $('#svgbasics').svg('get');
    var ga = svg.group({
	id: 'svgTransferencia', stroke: 'black',strokeWidth: 2
    });

    /*nao permitir aceder ao botoes que esta por baixo */
    svg.rect(ga, 0, 0, 800, 600, {
	id	: 'recPed1',
	rx	: "10", ry:"10",
	opacity	: "0.5",
	fill	: "grey"
    });

    /*fim nao permitir aceder ao botoes que esta por baixo */
    svg.rect(ga, 23, 30, 730, 560, {
	id			: 'ecPed1',rx: "10", ry:"10",
	fill			: "darkslategray",
	'stroke-linejoin'	: 'round',
	stroke			: 'orange',
	strokeWidth		: 6 
    });

    var contMesa = 0;
    for (j = 0; j < nl; j++)
	for (i = 0; i < nc; i++) {
	    contMesa++;
	    var cl1	= "green";
	    var p1	= true;
	    var p2	= false;
	    var totMesa	= 0.0;	 
	    var mes1	= mE[((i + 1) + (j * nc))-1 ]; //((i + 1) + (j * nc));
	    //cores das mesas
	    if (lm[mes1]  == undefined)  {
		cl1 = "blue";
		p2=true;
	    }
	    else{
		totMesa = (lm[mes1]).tot;
	//	var sx  =((i + 1) + (j * nc));
		p2=(  lm[mes1]   ).nome== k;
		if ( (lm[mes1]).aberta != true)  {cl1 = "red";p2=false;}
		if (   (mE[((i + 1) + (j * nc))-1]) == mesa){cl1 = "lightgrey";}
		//if ((!permissoes)&& !((lm[(i + 1) + (j * nc)]).nome== k) ) { cl1 = "grey";p1=false;}
	    }

	    var g2 = svg.group(ga, 
			       {
				   stroke: 'black',
				   strokeWidth: 2
			       });
	    var r3 = svg.rect(g2, 40 + 100 * i, 40 + 80 * j, 80, 40, 
			      {
				  id: 'mesaR' + mes1,rx: "3",ry: "3",
				  fill: cl1,
				  stroke: 'orange',
				  'stroke-width': 1
			      });
	    //nao transfere para a propria mesa
	    if( (mE[((i + 1) + (j * nc))-1])   != mesa)
		g2.onclick = function(){
		    var this_e = k;//empregado
		    var this_d = null ;
		    var this_m = mes1 ;
		    if(lm[mes1] != undefined ){
			this_d = lm[mes1].doc ;
		    }
		    var this_p = p2;
		    var this_p1= permissoes;
		    return function(){
			//ga - grupo desenho svg
			transferencia_click2(ga,k,docum,this_m,this_d,podeIns );	 
		    }
		}();

	    var tef =  (mE[((i + 1) + (j * nc))-1]).toString();
	    svg.text(ga, 40 + 100 * i, 40 + 80 * j, tef, { strokeWidth:"0" ,stroke:"#000000", fill:"#000000"});
	    if(totMesa>0){
		var ts=(totMesa.toFixed(2)).toString();
		svg.text(g2, 75 + 100 * i, 70 + 80 * j, ts, { strokeWidth:"0" ,stroke:"#000000", fill:"#000000"});
	    }
	}	


    /* botao cancela*/
    var g4 = svg.group(ga,
		       {
			   transform :   "translate(633, 500 )",
			   onmousedown : " limpaFormTransferencias(evt)"
		       });
    svg.rect(g4,0,0,60,60,  
	     {
		 rx:"36" ,ry:"10",
		 id:"botaoCancelaAnula" ,
		 fill:"lightgrey",
		 strokeLinejoin:"round", 
		 stroke:"#1F1A17", 
		 strokeWidth:"3"   
	     });
    svg.line(g4,15,15,45,45,{style:" stroke: red;   stroke-width: 9px"});
    svg.line(g4,45,15,15,45,{style:" stroke: red;   stroke-width: 9px"});
}


/* funcao do botao cancelar - sai da fora do painel de transferencias*/
function  limpaFormTransferencias(evt){

	$("#svgTransferencia").remove();
	$(document).bind('keydown', fk1);

}

/* funcao init do quadro de transferencia */
function transferencia_click2 (ga,empregado,docum,mesa2,doc2,podeIns ){
    //doc2 pode ou é sempre  ser null
    
    var permissoes=false;

    var svg = $('#svgbasics').svg('get');

    /*nao permitir aceder ao botoes que esta por baixo */
    svg.rect(ga, 0, 0, 800, 600, {
	id	: 'ecPed1',rx: "10", ry:"10",
	opacity	: "0.6",
	fill	: "grey"
    });
    /*fim nao permitir aceder ao botoes que esta por baixo */
    var g = svg.group(ga,{transform :   "translate(50, 55 )   ",
			  id: 'svgTransferencia', stroke: 'black',strokeWidth: 2});
    svg.rect(g, 3, 3, 600, 350, {
	id	: 'ecPed1',rx: "10", ry:"10",
	fill	: "darkslategray",'stroke-linejoin': 'round', 
	stroke	: 'orange',strokeWidth: 6 
    });
    svg.rect(g, 400, 20, 180, 300, {
	id		 : 'ecPed2',rx:"10", ry:"10",
	fill		 : "white",
	'stroke-linejoin': 'round',
	stroke		 : 'orange',
	'stroke-width'	 : 2
    });
    /* botoes setas */  
    var g2 = svg.group(g,{
	transform :   "translate(0, -155 )   ",
	"class":"botao" ,
	id:"botao" ,
	onmousedown: "butaoDirEsq_click(evt)"
    });

    svg.rect(g2,265,190,60,60,  {
	rx:"36" ,ry:"10", 
	id:"botaoVermelho" ,
	fill:"red",
	strokeLinejoin:"round", 
	stroke:"#1F1A17", 
	strokeWidth:"3",   
    });

    var g3 = svg.group(g2,{	
	transform : "translate(153, 155 ) rotate(-180 100 100)"	
    });
    svg.path(g3, "M 40,130 L 60,130 L 60,115 L 80,135 L 60,155 L 60,140 L 40,140 Z" ,
	     {style:"fill: darkred; stroke: blak;   stroke-width: 2px"}) ;   

    var g2 = svg.group(g,{
	transform :   "translate(0, 15 )   ",
	"class":"botaoRem" ,
	id:"botaoRem" ,
	onmousedown: "butaoEsqDir_click(evt)" 
    });

    svg.rect(g2,265,110,60,60,  {
	rx		:"36" ,ry:"10",
	id		:"botaoVerde" ,
	fill		:"green", 
	strokeLinejoin	:"round", 
	stroke		:"#1F1A17", 
	strokeWidth	:"3"
    });    
    var g3 = svg.group(g2 , { transform : "translate(235, 5 )"	  });

    svg.path(g3, "M 40,130 L 60,130 L 60,115 L 80,135 L 60,155 L 60,140 L 40,140 Z" ,
	     { style:"fill: darkgreen; stroke: blak;   stroke-width: 2px"}) ; 
    svg.rect(g, 20, 20, 180, 300, {
	id		: 'ecPed3',
	rx		:"10", ry:"10", 
	fill		: "white",
	strokeLinejoin	: 'round',
	stroke		: 'orange',
	strokeWidth	: 2
    });
    /* botoes cancelar e aprovar*/ 
    var g3 = svg.group(g,{	transform :   "translate(320, 260 )" });
    g3.onclick = function(){
	var this_doc=docum;
	var this_doc2=doc2;
	return function(){
	    aceitaTransferencia(empregado,mesa2,this_doc,this_doc2,permissoes,podeIns);
	}
    }();

    svg.rect(g3,0,0,60,60,  {
	rx:"36" ,ry:"10", 
	id:"botaoAceitaAnula" ,
	fill:"lightgrey",
	strokeLinejoin:"round", 
	stroke:"#1F1A17", strokeWidth:"3" 
    });
    
    svg.path(g3, "M 15,20 L 12,47 L 53,9 L 21,32 Z" , 
	     {style:"fill: green; stroke: blak;   stroke-width: 2px"}) ;
    
    
    var g4 = svg.group(g,{
	transform :   "translate(233, 260 )",
	onmousedown : " limpaFormTransferencias(evt)"
    });
    svg.rect(g4,0,0,60,60,  {
	rx:"36" ,ry:"10", 
	id		:"botaoCancelaAnula" ,
	fill		:"lightgrey", 
	strokeLinejoin	:"round",
	stroke		:"#1F1A17", 
	strokeWidth	:"3"   
    });
    svg.line(g4,15,15,45,45,{style:" stroke: red;   stroke-width: 9px"});
    svg.line(g4,45,15,15,45,{style:" stroke: red;   stroke-width: 9px"});
    /* fim botoes cancelar e aprovar*/
    /*  tabelaMesaDireita*/
    var fo = document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject');
    fo.setAttribute('width', '180');
    fo.setAttribute('height', '300');
    fo.setAttribute('x', '400');
    fo.setAttribute('y', '20');


    var body = document.createElementNS('http://www.w3.org/1999/xhtml', 'div');
    body.setAttribute('xmlns', 'http://www.w3.org/1999/xhtml');

    body.style="overflow:auto;height:300;width:180";
    var table = document.createElement('table');
    table.setAttribute('id', 'tabelaMesaDireita');   
    table.style.width = '100%';
    var tbody = document.createElement('tbody');
    table.appendChild(tbody);

    body.appendChild(table);
    fo.appendChild(body);
    g.appendChild(fo);
    /*  fim tabelaMesaDireita*/			
    /*  tabelaMesaEsquerda   tabelaMesaAnulacao1*/

    var fo = document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject');
    fo.setAttribute('width', '180');
    fo.setAttribute('height', '300');
    fo.setAttribute('x', '20');
    fo.setAttribute('y', '20');
    
    
    var body = document.createElementNS('http://www.w3.org/1999/xhtml', 'div');
    body.setAttribute('xmlns', 'http://www.w3.org/1999/xhtml');
    
    body.style="overflow:auto;height:300;width:180";
    var table = document.createElement('table');
    table.setAttribute('id', 'tabelaMesaEsquerda');   
    table.style.width = '100%';
    var tbody = document.createElement('tbody');
    table.appendChild(tbody);
    
    body.appendChild(table);
    fo.appendChild(body);
    g.appendChild(fo);
    /*  fim tabelaMesaEsquerda*/
    
    
    svg.rect(g, 40, -20, 145, 30, {
	id: 'ecPed1',rx: "10", ry:"10",
	fill: "gray",'stroke-linejoin': 'round', stroke: 'orange',strokeWidth: 4 
    });
    svg.text(g,49 ,5,"mesa     "+docum.mesa,
	     {fontFamily: "Verdana",fontSize: "24.5", 
	      fontWeight:"bold", fill: "blue", strokeWidth:"0"}); 
    
    svg.rect(g,400,20,180,150,  {
	id:"rec2" ,fill:"lightgrey", strokeLinejoin:"round",
	stroke:"#1F1A17", strokeWidth:"3",   
	onmousedown: "butaoDir_cima(evt)" , opacity:"0.1" 
	});

    svg.rect(g,400,170,180,150,  {
	id:"rec21" ,fill:"lightgrey", strokeLinejoin:"round", 
	stroke:"#1F1A17", strokeWidth:"3" , 
	opacity:"0.1" ,   
	onmousedown: "butaoDir_baixo(evt)"
    });   
    
    svg.rect(g, 420, -20, 145, 30, {
	id: 'ecPed1',rx: "10", ry:"10",
	fill: "gray",'stroke-linejoin': 'round',
	stroke: 'orange',strokeWidth: 4 
	});
    svg.text(g,429 ,5,"mesa     "+mesa2,
	     {fontFamily: "Verdana",
	      fontSize: "24.5", fontWeight:"bold",
	      fill: "blue", strokeWidth:"0"}); 
    
    
    svg.rect(g,20,20,180,150,  {
	id:"rec1" ,fill:"lightgrey", strokeLinejoin:"round",
	stroke:"#1F1A17", strokeWidth:"3",   
	onmousedown: "butaoEsq_cima(evt)" , opacity:"0.1" 
    });
    
    svg.rect(g,20,170,180,150,  {
	id:"rec1" ,fill:"lightgrey", strokeLinejoin:"round",
	stroke:"#1F1A17", strokeWidth:"3",   
	onmousedown: "butaoEsq_baixo(evt)" , opacity:"0.1" 
    });
    
    
    listagemEsquerda(reduzLinhas(docum.linhaConta));
    if(doc2==null) listagemDireita	([]);// mesa nao aberta
    else listagemDireita	(reduzLinhas(doc2.linhaConta));

}


function listagemEsquerda(rows){
    var contLE=0;
    for (var j = 0; j < rows.length; j++) {
	if (rows[j] != undefined && rows[j].precoLinha!=0) {
	    contLE++;
	    var quant =rows[j].quantidadeLinha;
	    var nome=rows[j].produto;	
	    var cod=rows[j].codProduto;
	    var precoL=(rows[j].precoLinha).toFixed(2);
	    var precoUnit=(rows[j].precoUnitario).toFixed(2);
	    var selected="";

	    if(contLE==1) selected="selected";
	    $('#tabelaMesaEsquerda').append(
		'<tr class="'+ selected+'" ><td class="cod">'+
		    cod+'</td><td class="qnt">'+quant+
		    '</td><td class="nome" noWrap >'+
		    nome+'</td><td class="precoLinha">'+precoL+
		    '</td><td  class="impressoraPedido"  >'+
		    rows[j].impressoraPedido+ //" transferencia " +
		    '</td><td  class="precoUnitario"  >'+ 
		    precoUnit+
		    '</td><td  class="categoriaProduto"  >'+ 
		    rows[j].categoriaProduto+
		    '</td></tr>'
	    );


	    $("#tabelaMesaEsquerda .impressoraPedido").hide();
	    $("#tabelaMesaEsquerda .precoUnitario").hide();
 $("#tabelaMesaEsquerda .categoriaProduto").hide();

	    var tr = document.createElement('tr');
	    var td = document.createElement('td');
	    
	    td.style.background = 'green';
	    td.appendChild(document.createTextNode(rows[j].quantidadeLinha));
	    var td2 = document.createElement('td');
	    td2.appendChild(document.createTextNode(rows[j].produto));
	    var td3 = document.createElement('td');
	}
    }
}

function listagemDireita(rows){
    var contLD=0;
    for (var j = 0; j < rows.length; j++) {
	if (rows[j] != undefined && rows[j].precoLinha!=0) {
	    contLD++;
	    var quant =rows[j].quantidadeLinha;
	    var nome=rows[j].produto;	
	    var cod=j;
	    var precoL=(rows[j].precoLinha).toFixed(2);
	    var precoUnit=(rows[j].precoUnitario).toFixed(2);
	    var selected="";


	    if(contLD==1) selected="selected";
	    $('#tabelaMesaDireita').append(
		'<tr class="'+ selected+'" ><td class="cod">'+
		    cod      +'</td><td class="qnt">'+
		    quant    + '</td><td class="nome" noWrap >'+
		    nome     +'</td><td class="precoLinha">'+
		    precoL   +'</td><td  class="precoUnitario"  >'+
		    precoUnit+'</td><td  class="impressoraPedido"  >'+
		    rows[j].impressoraPedido+'</td><td  class="categoriaProduto"  >'+ 
		    rows[j].categoriaProduto+'</td></tr>'
	    );
	    $("#tabelaMesaDireita .impressoraPedido").hide();
	    $("#tabelaMesaDireita .precoUnitario").hide();
	    $("#tabelaMesaDireita .categoriaProduto").hide();
	    var tr = document.createElement('tr');
	    var td = document.createElement('td');
	    td.style.background = 'green';
	    td.appendChild(document.createTextNode(rows[j].quantidadeLinha));
	    var td2 = document.createElement('td');
	    td2.appendChild(document.createTextNode(rows[j].produto));
	    var td3 = document.createElement('td');
	    }
	}
}


function aceitaTransferencia(empregado,ms,doc,doc2,permissoes,podeIns) {
    //doc2 é null quando transfere para uma mesa vazia
    // "mesa" é o tipo do documento a criar se doc2 null
    var ff =  ecraMesa; 
    fazPeT(ff,[empregado,ms,doc,permissoes ,podeIns],  redux(AE,[]),
	   empregado,doc.mesa,doc  ,"mesa",permissoes,podeIns ,false ) ;
    fazPeT(ff,[empregado,ms,doc,permissoes ,podeIns],  redux(AD,[]), 
	   empregado,ms      ,doc2 ,"mesa",permissoes,podeIns ,false ) ;

    $("#svgTransferencia").remove();
    $("#svgGMesa").remove();
    constroiQuadroMesas(7,6,empregado,permissoes)
   // $(document).bind('keydown', fk1);
}

function fazPeT(ff,arrff,arrayPed, empregado,ms,doc,tipoM,permissoes,podeIns ,anulacao ) {
    //TODO ver o argumento anulacao
    //TODO nao faz uma copia profunda
    var num= arrayPed.slice();
    
    if ( doc == null){
	//alert("nova mesa");
	var docR=criaNovaContaELinhaT(num, empregado,ms,tipoM,permissoes,podeIns  ,anulacao );
	criaNovaContaELinhaT_Aux( docR ,empregado,ms,permissoes,podeIns );

	return;
    }
    
    //   console.log("mesa "+ms +" ------------------------------------------------ linha  antes" ); 
    //   console.log( (doc));
    //TODO mais uma copia
    var linhas=doc.linhaConta.slice();
    for(var i=0;i<num.length; i++){
	var linh1={};
	var p=num[i];
	console.log("in  1 ---");
		console.log(num[i]);
	console.log( p.categoriaProduto);			 
	linh1.codProduto=( p.codProduto );
	linh1.produto=	 p.produto;
	linh1.quantidadeLinha= parseFloat( p.quantidadeLinha);
	linh1.impressoraPedido = p.impressoraPedido;
	
	linh1.precoLinha= parseFloat( p.precoLinha);
	linh1.anulacao= p.anulacao;
	linh1.precoUnitario=parseFloat( p.precoUnitario);
	linh1.categoriaProduto= p.categoriaProduto;



	var d = new Date();
	var h= d.getHours();
	var m= d.getMinutes();
	linh1.hora = h.toString()+':'+m.toString();
	var numlinh=linhas.length;
	linh1.linha=numlinh;
	linhas=linhas.concat([linh1]);
    }
    
    var f4=function (a){return (  a.precoLinha<0);};
    
    
    var existeLinhasNegativas =false;
    var linhaas =	jQuery.extend(true,{},linhas);
    if(reduzLinhas(linhaas)!=0) { 
	existeLinhasNegativas=(reduzLinhas(linhaas).map(f4).reduce(function  (a,b){return (a||b);}) );
	var tdf=reduzLinhas(linhaas);
	
    }
    
    if(existeLinhasNegativas){
	console.log("tdf linhas reduzidas");
	console.log(tdf);
	alert("quantidade que pretende anular não existe tranferenciaTabela");
    }
    
    else{doc.linhaConta=linhas;
	 var f3= function (a){return a.precoLinha;};
	 doc.total=(linhas.map(f3).reduce(function  (a,b){return (a+b);}) );
	 var vg =(doc.total<0.00001);
	 if(vg){	
	     db.removeDoc(doc ,{
		 success : function () {	
		     
		 },
		 error   : function () { 
		     alert('erro remover doc.Func fazPeT1 em transferenciaTabelas ' );
		 }
	     });
	 }
	 
	 else
	     if(doc!=null){	
		 db.saveDoc(doc ,{
		     success : function () {
			 //TODO	
			 ff.apply(null,arrff);
			 // ecraMesa(empregado,ms,doc,permissoes ,podeIns );			
		     },
		     error   : function () { 
			 alert('erro inserir doc.Func fazPeT2 em transferenciaTabelas.' );
		     }
		 });
	     }
	 else{	
	     alert('doc igual null.' );
	 }
	}   
}





//
function criaNovaContaELinhaT_Aux( document,empregado,ms,permissoes,podeIns ){
    db.view("myViews/diaSessao",{
	success: function(data){
	    document.diaSessao = [data.rows[0].value.ano,data.rows[0].value.mes,data.rows[0].value.dia];
	    db.saveDoc(document,{
		success : function (){
		    //a diferenca desta versao de criaNovaContaELinha é que nao imprime
		    //imprimePedido(empregado,ms,num,anulacao);

		   // ecraMesa(empregado,ms,document,permissoes ,podeIns );
		},
		error   : function() { 
		    alert('erro inserir documento.Func criaNovaContaELinhaT_Aux em transferenciaTabelas.' );
		}
	    });
	}
    });
    
    
}

//


function criaNovaContaELinhaT(num, empregado,ms,tipo,permissoes,podeIns ,anulacao ){
    
    
    var document = {};
    //var t1=0;
    var linhas=[];
    for(var i=0;i<num.length; i++){
	var linh1={};
	var p=num[i];
	
	linh1.codProduto=( p.codProduto );
	linh1.produto=	 p.produto;
	linh1.impressoraPedido=	 p.impressoraPedido;
	linh1.quantidadeLinha= parseFloat( p.quantidadeLinha);
	//TODO verificar sinal
	var sinalP=1;
	linh1.precoLinha= parseFloat( p.precoLinha)*sinalP;
	linh1.anulacao= p.anulacao;
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
    document.empregado=empregado;
    var f3= function (a){return a.precoLinha;};
    document.total=( document.linhaConta.map(f3).reduce(function  (a,b){return (a+b);}) );
    
    var d = new Date();
    var h= d.getHours();
    var m= d.getMinutes();
    document.hora = h.toString()+':'+m.toString();
    
    document.empregado = empregado;
    document.type = tipo;
    document.mesa = ms;
    document.aberta = true;
    document.diaSessao ="1/1/1900";
    return document;
}


	

function redux(rows,aF){

    if (rows.length==0) {
	    return aF;
	}
    console.log("rows");
    console.log(rows);
    console.log(aF);
    //truque com quantidade
    var acod =(rows[0]).codProduto;
    var aqnt =(rows[0]).quantidadeLinha;
    if(rows[0].anulacao)  aqnt= - aqnt ;
    var apU  =parseFloat((rows[0]).precoUnitario);
    var apL  =parseFloat((rows[0]).precoLinha);
    var aN  =(rows[0]).produto;
    var aImp  =(rows[0]).impressoraPedido;
    var aH  =(rows[0]).hora;
    var caT  =(rows[0]).categoriaProduto
    
	for (  i = rows.length-1; i>0 ; i--) {		
	    
	    var sina=1;
	    if((rows[i]).anulacao)	sina=-1;
	    
	    if ( ((rows[i]).codProduto) == acod ) {	
		
		aqnt =aqnt+((rows[i]).quantidadeLinha *sina);
		apL  =apL +(rows[i]).precoLinha;
		rows.splice(i,1);			
	    }
	}
    rows.splice(0,1);
    
    var aBol=false;
    var sinT= 1;
    //TODO estudar/documentar o que se fazer com a relacao quantidadeLinha, precoLinha e anulacao
    if (apL<0) {aBol=true;sinT=-1}
    if (aqnt!=0)
	aF.push({
	    'codProduto'	: acod,
	    'quantidadeLinha'	: (sinT * aqnt),
	    'produto'		: aN,
	    'precoLinha'	: apL  ,
	    'precoUnitario'	: apU ,
	    'impressoraPedido'	: aImp, //"transferencia" , 
	    'anulacao'		: aBol ,
	    'hora'		: aH ,
	    'categoriaProduto'  : caT
	    
	}); 
    
    return redux(rows,aF);
}
