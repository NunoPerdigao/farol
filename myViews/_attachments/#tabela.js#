

function  butao_cima (e) {
	var node=$("#tabelaMesaAnulacao .selected"); 
    if(node.prev().length>0){node.removeClass('selected');node.prev().addClass('selected');
			     primVis ($("#tabelaMesaAnulacao tr").first()).prev().show();
			    }
	if($("#tabelaMesaAnulacao .selected").length==0)  $("#tabelaMesaAnulacao tr:last").addClass('selected');

}

function  butao_baixo (e) {
    var node=$("#tabelaMesaAnulacao .selected");
    if(node.next().length>0){
	node.removeClass('selected');
	node.next().addClass('selected');
	if(
	    $("#tabelaMesaAnulacao tr").length - 
		$("#tabelaMesaAnulacao tr").filter(":hidden").length >4
	  )
	    primVis ($("#tabelaMesaAnulacao tr").first()).hide();
    }
	if($("#tabelaMesaAnulacao .selected").length==0)  $("#tabelaMesaAnulacao tr:last").addClass('selected');
}


function  butao1_cima (e) {
	var node=$("#tabelaMesaAnulacao1 .selected"); 
	if(node.prev().length>0){
	    node.removeClass('selected');
	    node.prev().addClass('selected');
	    primVis ($("#tabelaMesaAnulacao1 tr").first()).prev().show();

	    
				}
	if($("#tabelaMesaAnulacao1 .selected").length==0)  $("#tabelaMesaAnulacao1 tr:last").addClass('selected');

}

function  butao1_baixo (e) {
    var node=$("#tabelaMesaAnulacao1 .selected");
    if(node.next().length>0){
	node.removeClass('selected');
	node.next().addClass('selected')
	if(
	    $("#tabelaMesaAnulacao1 tr").length - 
		$("#tabelaMesaAnulacao1 tr").filter(":hidden").length >4
	  )
	    primVis ($("#tabelaMesaAnulacao1 tr").first()).hide();

    }
	if($("#tabelaMesaAnulacao1 .selected").length==0)  $("#tabelaMesaAnulacao1 tr:last").addClass('selected');
}




function  butao_click (e) {
    // 	console.log("clickButao");
    if($("#tabelaMesaAnulacao").find('.selected').length==0 ) return;
    var precoUnitario=0.0;
    var cod1=$("#tabelaMesaAnulacao").find('.selected').find('.cod').text();
    db.view("myViews/produtoLista", {"keys":[cod1 ],
				     success: function(data){
					 // console.log(data.rows);
					 if(data.rows.length>0){
					     precoUnitario=data.rows[0].value.preco;
					     butaoAux_click (e,precoUnitario);
					     return false;
					 }
					 // console.log("x"+cod1+"x");
					 
					 if(data.rows.length==0) alert("produto nao existe");
				     }
				    });

}



function  butaoAux_click (e,precoUnitario) {

    /*
      Este é o botao vermelho 
      tabelaMesaAnulacao é a tabela da direita 
      tabelaMesaAnulacao1 é a tabela da esquerda
    */
    // console.log(e);
    // 	console.log("x------------x");
    
    
    document.getElementById("botao").setAttribute("class", "botaoDown");

    var node=$("#tabelaMesaAnulacao .selected");
    var quant1=$("#tabelaMesaAnulacao").find('.selected').find('.qnt').text();
    var cod1=$("#tabelaMesaAnulacao").find('.selected').find('.cod').text();

    /* so existe uma quantidade do produto para anular*/
    if(parseInt(quant1)==1 ){

	if(node.next().length>0){
	    node.removeClass('selected');node.next().addClass('selected');
	}
	else {
	    node.removeClass('selected');node.prev().addClass('selected');
	}

	var findC=null;
	$('#tabelaMesaAnulacao1 tr').each(function() {
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
	    findC.filter(".precoLinha").text((nh2+precoUnitario).toFixed(2));
	} 
	else  { 
	    $('#tabelaMesaAnulacao1 ' ).find('tbody').append(node.clone());
	    $('#tabelaMesaAnulacao1 ' ).find('tbody').children().first().addClass('selected');
	} 

	node.remove();
    } 
    else{//é igual so que na tabelaMesaAnulacao nao é removido o node apena a quantidade -1


	var findC=null;

	$('#tabelaMesaAnulacao1 tr').each(function() {

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
	    findC.filter(".precoLinha").text((nh2+precoUnitario).toFixed(2));

	} 
	else  { 
	    var nodeClone=(node.clone());
	    nodeClone.find('.qnt').text(1);
	    nodeClone.removeClass('selected');			
	    nodeClone.find(".precoLinha").text(precoUnitario);

	    $('#tabelaMesaAnulacao1 ' ).find('tbody').append(nodeClone);  
	    $('#tabelaMesaAnulacao1 ' ).find('tbody').children().first().addClass('selected');

	} 

	var qw=parseInt( node.find(".qnt").text());
	node.find(".qnt").text(qw-1);
	var pw=parseFloat( node.find(".precoLinha").text());
	node.find(".precoLinha").text((pw-precoUnitario).toFixed(2));




	/*
	  var quant2=$("#tabelaMesaAnulacao").find('.selected').find('.qnt').text();
	  var nQntd= parseInt(quant2);
	  $("#tabelaMesaAnulacao").find('.selected').find('.qnt').text(nQntd-1);

	  var clone1=node.clone();
	  clone1.removeClass('selected');
	  $("#tabelaMesaAnulacao1   ").append( clone1);*/

    }



}
function  butaoRemUp_click (e) {
	document.getElementById("botaoRem").setAttribute("class", "botaoRemUp");
}


function  butaoRem_click (e) {
    if($("#tabelaMesaAnulacao1").find('.selected').length==0 ) return;
    var precoUnitario=0.0;
    var cod1=$("#tabelaMesaAnulacao1").find('.selected').find('.cod').text();
    db.view("myViews/produtoLista", {"keys":[cod1 ],
				     success: function(data){
					 if(data.rows.length>0){
					     precoUnitario=data.rows[0].value.preco;
					     butaoRemAux_click (e,precoUnitario);
					     return false;
					 }
					 if(data.rows.length==0) alert("produto nao existe");
				     }
				    });
}


function  butaoRemAux_click (e,precoUnitario) {
    /*tabelaMesaAnulacao é a tabela da direita
      tabelaMesaAnulacao1 é a tabela da esquerda
    */
    document.getElementById("botaoRem").setAttribute("class", "botaoRemDown");

    var node=$("#tabelaMesaAnulacao1 .selected");
    var quant1=$("#tabelaMesaAnulacao1").find('.selected').find('.qnt').text();
    var cod1=$("#tabelaMesaAnulacao1").find('.selected').find('.cod').text();

    // console.log(precoUnitario);

    if(parseInt(quant1)==1 ){
	if(node.next().length>0){
	    node.removeClass('selected');node.next().addClass('selected');
	}
	else {
	    node.removeClass('selected');node.prev().addClass('selected');
	}
	var findC=null;
	$('#tabelaMesaAnulacao tr').each(function() {
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
	    var nh2=(parseFloat( findC.filter(".precoLinha").text()));
	    findC.filter(".precoLinha").text((nh2+precoUnitario).toFixed(2));
	} 
	else  { 
	    var nodeCl=node.clone();
	    nodeCl.find(".precoLinha").text(precoUnitario.toFixed(2));
	    $('#tabelaMesaAnulacao ' ).find('tbody').append(nodeCl);
	    $('#tabelaMesaAnulacao ' ).find('tbody').children().first().addClass('selected');
	    
	} 

	node.remove();
    } 
    else{//é igual so que na tabelaMesaAnulacao nao é removido o node apenas a quantidade em -1 e o preco


	var findC=null;

	$('#tabelaMesaAnulacao tr').each(function() {

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
	    findC.filter(".precoLinha").text((nh2+precoUnitario).toFixed(2));

	} 
	else  { 
	    var nodeClone=(node.clone());
	    nodeClone.find('.qnt').text(1);
	    nodeClone.find(".precoLinha").text(precoUnitario);
	    nodeClone.removeClass('selected');
	    $('#tabelaMesaAnulacao ' ).find('tbody').append(nodeClone);  
	    $('#tabelaMesaAnulacao ' ).find('tbody').children().first().addClass('selected');
	    
	} 

	var qw=parseInt( node.find(".qnt").text());
	node.find(".qnt").text(qw-1);		
	var nh2=parseFloat( node.find(".precoLinha").text());
	node.find(".precoLinha").text((nh2-precoUnitario).toFixed(2));


    }
}
function  butaoUp_click (e) {

	document.getElementById("botao").setAttribute("class", "botaoUp");


}


function aceitaFormAnulacoes(empregado,ms,doc,permissoes,podeIns) {

    //console.log("cod1");
    var g= $("#tabelaMesaAnulacao1 tr");
    var cod1=[];
    for(var i=0;i<g.length;i++){

	var a2=$("#tabelaMesaAnulacao1 tbody").children(" :nth-child("+ (i+1) +")" ).find(".cod").text();
	var b2=$("#tabelaMesaAnulacao1 tbody").children(" :nth-child("+ (i+1) +")" ).find(".qnt").text();
	var c2=$("#tabelaMesaAnulacao1 tbody").children(" :nth-child("+ (i+1) +")" ).find(".nome").text();
	var d2=$("#tabelaMesaAnulacao1 tbody").children(" :nth-child("+ (i+1) +")" ).find(".precoLinha").text();
	var e2=$("#tabelaMesaAnulacao1 tbody").children(" :nth-child("+ (i+1) +")" ).find(".precoUnitario").text();
	var f2=$("#tabelaMesaAnulacao1 tbody").children(" :nth-child("+ (i+1) +")" ).find(".impressoraPedido").text(); 
	var g2=$("#tabelaMesaAnulacao1 tbody").children(" :nth-child("+ (i+1) +")" ).find(".categoriaProduto").text(); 
	
        cod1[i]={'codigo' : a2, 'quantidade' : b2, 'nome' : c2, 'precoLinha': d2 , 'precoUnitario' : e2,'impressoraPedido' : f2 ,'categoriaProduto':g2  };
	//console.log('codigo   ' + a2+'   quantidade   '+  b2+ '   nome   ' + c2+ '    precoLinha   '+ d2 +  '  precoUnitario   ' + e2+'  perm '+permissoes );
    }
	 
    fazPe(cod1,empregado,ms,doc,permissoes,podeIns ,true )
}

/* funcao do botao cancelar - sai da fora do painel de anulacoes*/
function limpaFormAnulacoes(evt){
	$("#svgAnulacao").remove();
 	$(document).bind('keydown', fk1);

}


/*funcao principal init*/ 
function anulacao_click(empregado,ms,doc,permissoes,podeIns){
    $(document).unbind('keydown', fk3);
    $(document).unbind('keydown', fk2);
    $(document).unbind('keydown', fk21);
    $(document).unbind('keydown', fk1);
    
    gf=doc.linhaConta;
    /*
      gf.map(
      function(row){
      console.log(":::34344::");
      console.log(row);
      console.log(row.quantidadeLinha);
      });
    */  
    var svg = $('#svgbasics').svg('get');
    var ga = svg.group({
	id: 'svgAnulacao', stroke: 'black',strokeWidth: 2
    });

    /*nao permitir aceder ao botoes que esta por baixo */
    svg.rect(ga, 0, 0, 800, 600, {
	id: 'ecPed1',rx: "10", ry:"10",opacity:"0.5",
	fill: "white"
    });
    /*fim nao permitir aceder ao botoes que esta por baixo */
    var g = svg.group(ga,{transform :   "translate(50, 55 )   ",
			  id: 'svgAnulacao', stroke: 'black',strokeWidth: 2});
    svg.rect(g, 3, 3, 600, 350, {
	id: 'ecPed1',rx: "10", ry:"10",
	fill: "darkslategray",'stroke-linejoin': 'round', stroke: 'orange',strokeWidth: 6});

    svg.rect(g, 400, 20, 180, 300, {id: 'ecPed2',rx:"10", ry:"10", fill: "white",
				    'stroke-linejoin': 'round',stroke: 'orange','stroke-width': 2
				   });
    /* botoes */  
    var g2 = svg.group(g,{
	transform :   "translate(0, -155 )   ",
	"class":"botao" ,
	id:"botao" ,
	onmouseup:"butaoUp_click(evt)" ,
	onmousedown: "butao_click(evt)" 
    });

    svg.rect(g2,265,190,60,60,  {
	rx:"36" ,ry:"10", id:"botaoVermelho" ,
	fill:"red", strokeLinejoin:"round", 
	stroke:"#1F1A17", strokeWidth:"3" 

    });

    var g3 = svg.group(g2,{
	transform :   "translate(153, 155 )   rotate(-180 100 100)"
    });
    svg.path(g3, "M 40,130 L 60,130 L 60,115 L 80,135 L 60,155 L 60,140 L 40,140 Z" , 
	     {style:"fill: darkred; stroke: blak;   stroke-width: 2px"}) ;   

    var g2 = svg.group(g,{transform :   "translate(0, 15 )   ","class":"botaoRem" ,id:"botaoRem" ,
			  onmouseup:"butaoRemUp_click(evt)" ,onmousedown: "butaoRem_click(evt)" });

    svg.rect(g2,265,110,60,60,  {
	rx:"36" ,ry:"10", id:"botaoVerde" ,
	fill:"green", strokeLinejoin:"round", 
	stroke:"#1F1A17", strokeWidth:"3"});    
    var g3 = svg.group(g2,{	transform : "translate(235, 5 )"	});

    svg.path(g3, "M 40,130 L 60,130 L 60,115 L 80,135 L 60,155 L 60,140 L 40,140 Z" ,
	     {style:"fill: darkgreen; stroke: blak;   stroke-width: 2px"}) ; 
    svg.rect(g, 20, 20, 180, 300, {id: 'ecPed3',rx:"10", ry:"10", fill: "white",
				   'stroke-linejoin': 'round',stroke: 'orange','stroke-width': 2
				  });
    
    /* botoes cancelar e aprovar*/
    var g3 = svg.group(g,{	transform :   "translate(320, 260 )" });
    g3.onclick = function(){
	var this_e=doc;
	return function(){
	    aceitaFormAnulacoes(empregado,ms,doc,permissoes,podeIns);
	}
    }();
    
    svg.rect(g3,0,0,60,60,  {
	rx:"36" ,ry:"10", id:"botaoAceitaAnula" ,fill:"lightgrey",
	strokeLinejoin:"round", stroke:"#1F1A17", strokeWidth:"3" 
    });
    
    svg.path(g3, "M 15,20 L 12,47 L 53,9 L 21,32 Z" , {
	style:"fill: green; stroke: blak;   stroke-width: 2px"}) ;  
    var g4 = svg.group(g,{
	transform :   "translate(233, 260 )", onmousedown : "limpaFormAnulacoes(evt)"
    });
    svg.rect(g4,0,0,60,60,  {
	rx:"36" ,ry:"10", id:"botaoCancelaAnula" ,
	fill:"lightgrey", strokeLinejoin:"round", 
	stroke:"#1F1A17", strokeWidth:"3"   
    });
    
    svg.line(g4,15,15,45,45,{style:" stroke: red;   stroke-width: 9px"});
    svg.line(g4,45,15,15,45,{style:" stroke: red;   stroke-width: 9px"});
    /* fim botoes cancelar e aprovar*/
    /*  tabelaMesaAnulacao*/
    var fo = document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject');
    fo.setAttribute('width', '180');
    fo.setAttribute('height', '300');
    fo.setAttribute('x', '400');
    fo.setAttribute('y', '20');


    var body = document.createElementNS('http://www.w3.org/1999/xhtml', 'div');
    body.setAttribute('xmlns', 'http://www.w3.org/1999/xhtml');

    body.style="overflow:auto;height:300;width:180";
    var table = document.createElement('table');
    table.setAttribute('id', 'tabelaMesaAnulacao');   
    table.style.width = '100%';
    var tbody = document.createElement('tbody');
    table.appendChild(tbody);

    body.appendChild(table);
    fo.appendChild(body);
    g.appendChild(fo);
    /*  tabelaMesaAnulacao1*/
    
    var fo = document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject');
    fo.setAttribute('width', '180');
    fo.setAttribute('height', '300');
    fo.setAttribute('x', '20');
    fo.setAttribute('y', '20');


    var body = document.createElementNS('http://www.w3.org/1999/xhtml', 'div');
    body.setAttribute('xmlns', 'http://www.w3.org/1999/xhtml');

    body.style="overflow:auto;height:300;width:180";
    var table = document.createElement('table');
    table.setAttribute('id', 'tabelaMesaAnulacao1');   
    table.style.width = '100%';
    var tbody = document.createElement('tbody');
    table.appendChild(tbody);

    body.appendChild(table);
    fo.appendChild(body);
    g.appendChild(fo);
    /*  fim tabelaMesaAnulacao1*/

    svg.rect(g,400,20,180,150,  {
	id:"rec2" ,fill:"lightgrey", strokeLinejoin:"round", stroke:"#1F1A17", strokeWidth:"3",   
	onmousedown: "butao_cima(evt)" , opacity:"0.1" 
    });

    svg.rect(g,400,170,180,150,  {
	id:"rec21" ,fill:"lightgrey", strokeLinejoin:"round", stroke:"#1F1A17", strokeWidth:"3",   
	onmousedown: "butao_baixo(evt)" , opacity:"0.1" 
    });

    svg.rect(g,20,20,180,150,  {
	id:"rec1" ,fill:"lightgrey", strokeLinejoin:"round", stroke:"#1F1A17", strokeWidth:"3",   
	onmousedown: "butao1_cima(evt)" , opacity:"0.1" 
    });

    svg.rect(g,20,170,180,150,  {
	id:"rec1" ,fill:"lightgrey", strokeLinejoin:"round", stroke:"#1F1A17", strokeWidth:"3",   
	onmousedown: "butao1_baixo(evt)" , opacity:"0.1" 
    });

    listagemAnulacao(reduzLinhas(doc.linhaConta));

}

function listagemAnulacao(rows){
    var contLE=0;
    for (var j = 0; j < rows.length; j++) {
	//
	if (rows[j] != undefined && (rows[j].quantidadeLinha)!=0) {
	    contLE ++;
	    var selected	="";
	    var quant		=rows[j].quantidadeLinha;
	    var nome		=rows[j].produto;	
	    var cod		=rows[j].codProduto;
	    var precoL		=(rows[j].precoLinha).toFixed(2);
	    var precoUnit	=(rows[j].precoUnitario).toFixed(2);
	    var impre		=rows[j].impressoraPedido;
	    var catP		=rows[j].categoriaProduto;

	    if(contLE==1) selected="selected"; 	 

	    $('#tabelaMesaAnulacao').append('<tr class="'+ selected+'" ><td class="cod">'+
					    cod+'</td><td class="qnt">'+
					    quant+'</td><td class="nome" noWrap >'+
					    nome+'</td><td class="precoLinha">'+
					    precoL+'</td><td  class="precoUnitario" noWrap >'+ 
					    precoUnit+'</td><td  class="impressoraPedido"  >'+
					    impre+'</td> <td  class="categoriaProduto">   ' 	+
					    catP+'</td></tr>');

	    $("#tabelaMesaAnulacao .impressoraPedido").hide();
	    $("#tabelaMesaAnulacao .precoUnitario").hide();
	    $("#tabelaMesaAnulacao .categoriaProduto").hide();
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


