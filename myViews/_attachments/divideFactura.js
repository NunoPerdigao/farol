var AQ= [];

    //init 

function  divideFactura_click(doc,this_empregado,this_permissoes)

{
    AQ= [];
    desenhaDivide(doc);
    console.log("divide");
}


function desenhaDivide(doc)
{
    var svg = $('#svgbasics').svg('get');
    var ga = svg.group({
	id: 'svgDivide', stroke: 'black',strokeWidth: 2
    });

    /*nao permitir aceder ao botoes que esta por baixo */
    svg.rect(ga, 0, 0, 800, 600, {
	id: 'ecPed1',rx: "10", ry:"10",opacity:"0.6",
	fill: "grey"
    });
    /*fim nao permitir aceder ao botoes que esta por baixo */
    var g = svg.group(ga, {
	transform	:   "translate(50, 55 )   ",
	id		: 'svgTransferencia', 
	stroke		: 'black',
	strokeWidth	: 2
    });
    svg.rect(g, 3, 3, 600, 420,  {
	id		: 'ecPed1',rx: "10", ry:"10",
	fill		: "darkslategray",'stroke-linejoin': 'round', 
	stroke		: 'orange',
	strokeWidth	: 6 
    });
    svg.rect(g, 400, 20, 180, 300,   {
	id			: 'ecPed2',rx:"10", ry:"10", 
	fill			: "white",
	'stroke-linejoin'	: 'round',
	stroke			: 'orange','stroke-width': 2
    });
    /* botoes setas */  

    var g2 = svg.group(g,{transform :   "translate(0, 15 )   ","class":"botaoRem" ,
			  id:"botaoRem" ,
			 // onmousedown: "butaoEsqDirDiv_click(evt)"
			 });

    g2.onclick = function(){
	var this_doc=doc;
	return function(){
	    butaoEsqDirDiv_click(this_doc);
	}
    }();


    svg.rect(g2,265,110,60,60,  {
	    rx:"36" ,ry:"10", id:"botaoVerde" ,
	    fill:"green", strokeLinejoin:"round", 
	    stroke:"#1F1A17", strokeWidth:"3"
    });    
    var g3 = svg.group(g2,{	transform : "translate(235, 5 )"	
			  });
    svg.path(g3, "M 40,130 L 60,130 L 60,115 L 80,135 L 60,155 L 60,140 L 40,140 Z" , 
	     { style:"fill: darkgreen; stroke: blak;   stroke-width: 2px"}) ; 
    svg.rect(g, 20, 20, 180, 300,   {
	id: 'ecPed3',rx:"10", ry:"10", 
	fill: "white",'stroke-linejoin': 'round',
	stroke: 'orange','stroke-width': 2
    });

    /* botoes cancelar e aprovar*/ 

    var g3 = svg.group(g,{	transform :   "translate(320, 260 )" });
    g3.onclick = function(){
	var this_doc=doc;
	//var this_doc2=doc2;
	return function(){
	    var dAQ=dupArr(AQ);
	    var eAQ=dupArr(AQ);
	    eAQ.map(function(r) {r.precoLinha=r.precoLinha*(-1);r.anulacao=true; }   )
	    var ff = function() { } ;
	    fazPeT(ff,[]  ,redux(eAQ,[]),doc.empregado,doc.mesa  ,doc  , 
		   "mesa"   , true, true ,false ) ;	
	    //falta tira a factura dAQ
	    //        podeInserir
	    //cria documento
	    // var docR=criaNovaContaELinhaT(dAQ, doc.empregado,ms       ,tipoM,permissoes,podeIns  ,anulacao );

	    var docR =criaNovaContaELinhaT(dAQ, doc.empregado,doc.mesa,
					   "conta",true      ,true     ,false );

	    db.view("myViews/diaSessao",{
		success: function(data){
		    docR.diaSessao = [data.rows[0].value.ano,
				      data.rows[0].value.mes,
				      data.rows[0].value.dia];
		    db.saveDoc(docR,{
			success : function (){
			    tiraFacturaDiv(docR,docR.empregado,true)
			},
			error   : function() { 
			    alert('erro  inserir doc.Func desenhaDivid em divide factura' );}
		    });
		}
	    });
 
	    // tiraFactura_click(docR,doc.empregado);
	   
	}
    }();

    svg.rect(g3,0,0,60,60,  {
	rx		:"36" ,ry:"10", 
	id		:"botaoAceitaDivideFact" ,
	fill		:"lightgrey",
	strokeLinejoin	:"round", 
	stroke		:"#1F1A17", 
	strokeWidth:"3" 
    });
    
    svg.path(g3, "M 15,20 L 12,47 L 53,9 L 21,32 Z" , 
	     {style:"fill: green; stroke: blak;   stroke-width: 2px"}) ;
    
    
    var g4 = svg.group(g,{
	transform	:   "translate(233, 260 )",
    });

   g4.onclick = function(){
	var this_doc=doc;
	return function(){
	    limpaFormDivide(this_doc);
	}
    }();

    svg.rect(g4,0,0,60,60,  {
	rx	:"36" ,ry:"10",
	id	:"botaoCancelaAnula" ,
	fill	:"lightgrey", strokeLinejoin:"round", 
	stroke	:"#1F1A17", strokeWidth:"3"   
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
    /*  quantidade text input*/

    var fo = document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject');
    fo.setAttribute('width'	, '50'	);
    fo.setAttribute('height'	, '30'	);
    fo.setAttribute('x'		, '270'	);
    fo.setAttribute('y'		, '60'	);
    
    
    var body = document.createElementNS('http://www.w3.org/1999/xhtml', 'div');
    body.setAttribute('xmlns', 'http://www.w3.org/1999/xhtml'); 
    body.style="height:300;width:180";

    var inputQ = document.createElement('input');
    inputQ.setAttribute('id', 'quantDivLinha');  
    inputQ.setAttribute('type', 'text');  
    inputQ.setAttribute('class', 'numeric'); 
    inputQ.style.width = '100%';
 
    body.appendChild(inputQ);
    fo.appendChild(body);
    g.appendChild(fo);
    $(".numeric").numeric({ negative: false }, function() {  });

    $('#quantDivLinha').val(1);
    /*  fim quantidade input*/

  /*  total  direita */

    var fo = document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject');
    fo.setAttribute('width'	, '120'	);
    fo.setAttribute('height'	, '30'	);
    fo.setAttribute('x'		, '70'	);
    fo.setAttribute('y'		, '360'	);
    
    
    var body = document.createElementNS('http://www.w3.org/1999/xhtml', 'div');
    body.setAttribute('xmlns', 'http://www.w3.org/1999/xhtml'); 
    body.style="height:300;width:180";

    var inputQ = document.createElement('input');
    inputQ.setAttribute('id', 'totalDivDireita');  
    inputQ.setAttribute('type', 'text');  
    inputQ.setAttribute('class', 'numeric'); 
    inputQ.style.width = '100%';
 
    body.appendChild(inputQ);
    fo.appendChild(body);
    g.appendChild(fo);


    /* fim total direita */

    /*  total  esquerda */

    var fo = document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject');
    fo.setAttribute('width'	, '120'	);
    fo.setAttribute('height'	, '30'	);
    fo.setAttribute('x'		, '450'	);
    fo.setAttribute('y'		, '360'	);
    
    
    var body = document.createElementNS('http://www.w3.org/1999/xhtml', 'div');
    body.setAttribute('xmlns', 'http://www.w3.org/1999/xhtml'); 
    body.style="height:300;width:180";

    var inputQ = document.createElement('input');
    inputQ.setAttribute('id', 'totalDivEsquerda');  
    inputQ.setAttribute('type', 'text');  
    inputQ.setAttribute('class', 'numeric'); 
    inputQ.style.width = '100%';
 
    body.appendChild(inputQ);
    fo.appendChild(body);
    g.appendChild(fo);


    /* fim total esquerda */




    /*  rectangulos de navegar na tabela cima,baixo   */
    svg.rect(g,20,20,180,150, 
	     {
		 id		:"rec1" ,fill:"lightgrey", 
		 strokeLinejoin	:"round",
		 stroke		:"#1F1A17", strokeWidth:"3",   
		 onmousedown	: "tabDivEsq_cima(evt)" ,
		 opacity	:"0.1" 
	     });
    
    svg.rect(g,20,170,180,150, 
	     {
		 id		:"rec1" ,fill:"lightgrey",
		 strokeLinejoin	:"round", 
		 stroke		:"#1F1A17", strokeWidth:"3",   
		 onmousedown	: "tabDivEsq_baixo(evt)" , 
		 opacity	:"0.1" 
	     });

    if(doc==null) console.log([]);// mesa nao aberta
    else listagemDivid	(reduzLinhas(doc.linhaConta));

    //console.log("divide"+"  "+doc);
}


/* funcao do botao cancelar - sai da fora do painel de divisao*/
function  limpaFormDivide(evt){
    $("#svgDivide").remove();
}


function tiraFacturaDiv (doc,e,p){
    db.view("myViews/countFacturas", {
        success: function(data){
            doc.numFactura=1;
            if(data.rows.length!=0) doc.numFactura=data.rows[0].value.max+1;
            doc.type = "factura";
            

	    var ff= function(a,b,c,d){
		imprimeFactura(e,doc,$('#nomeCliente').val(),$('#numContribuinte').val(),$('#numRefeicoes').val() ); 
		limpaFormDivide();
	    }



	    saveLinha_Aux(ff,[doc], doc,e,p  );
        }
    });
    //$("#svgFactura").remove();
    
  //  $(document).bind('keydown', fk1);
    
}




function listagemDivid(rows){
 
    var contLE=0;
    for (var j = 0; j < rows.length; j++) {
	if (rows[j] != undefined && rows[j].precoLinha!=0) {
	    contLE++;
	    var quant =(rows[j].quantidadeLinha).toFixed(2);
	    var nome=rows[j].produto;	
	    var cod=rows[j].codProduto;
	    var precoL=(rows[j].precoLinha).toFixed(2);
	    var precoUnit=(rows[j].precoUnitario).toFixed(2);
	    var selected="";
	   // console.log(precoL);
	    //console.log(rows[j].precoLinha);
	    if(contLE==1) selected="selected";
	    $('#tabelaMesaEsquerda').append(
		'<tr class="'+ selected+'" ><td class="cod">'+
		    cod+'</td><td class="qnt">'+quant+'</td><td class="nome">'+
		    nome+'</td><td class="precoLinha">'+precoL+
		    '</td><td  class="impressoraPedido" noWrap >'+

		" transferencia " +
		'</td><td  class="precoUnitario" noWrap >'+ 
		    precoUnit+
		    '</td><td  class="categoriaProduto"  >'+ 
		    rows[j].categoriaProduto+
		    '</td></tr>');
	    $("#tabelaMesaEsquerda .impressoraPedido").hide();
	    $("#tabelaMesaEsquerda .precoUnitario").hide();
	    $("#tabelaMesaEsquerda .cod").hide();
	    $("#tabelaMesaEsquerda .categoriaProduto").hide();
	    var tr = document.createElement('tr');
	    var td = document.createElement('td');
	    
	    td.style.background = 'green';
	    td.appendChild(document.createTextNode((rows[j].quantidadeLinha).toFixed(2)));
	    var td2 = document.createElement('td');
	    td2.appendChild(document.createTextNode(rows[j].produto));
	    var td3 = document.createElement('td');
	}
    }

    var f3= function (a){return a.precoLinha;};
    var docTotal=(rows.map(f3).reduce(function  (a,b){return (a+b);}) );
    console.log(rows);
    $('#totalDivDireita').val((parseFloat(docTotal)).toFixed(2))
}






function  tabDivEsq_cima (e) {
    var node=$("#tabelaMesaEsquerda .selected"); 
    if(node.prev().length>0){node.removeClass('selected');node.prev().addClass('selected')}
    if($("#tabelaMesaEsquerda .selected").length==0)  $("#tabelaMesaEsquerda tr:last").addClass('selected');
}

function  tabDivEsq_baixo (e) {
    var node=$("#tabelaMesaEsquerda .selected");
    if(node.next().length>0){node.removeClass('selected');node.next().addClass('selected')}
    if($("#tabelaMesaEsquerda .selected").length==0)  $("#tabelaMesaEsquerda tr:last").addClass('selected');
}



function   butaoEsqDirDiv_click(docD){
  

    if(( ! $("#tabelaMesaEsquerda").find('.selected').length ==0)
       &&   (parseFloat( $("#tabelaMesaEsquerda").find('.selected').find('.qnt').text() )
	     >= parseFloat($('#quantDivLinha').val()) ) ){

	var node		=$("#tabelaMesaEsquerda .selected");
	var quant1		=$("#tabelaMesaEsquerda").find('.selected').find('.qnt').text();
	var cod1		=$("#tabelaMesaEsquerda").find('.selected').find('.cod').text();
	var precoUnitario	=$("#tabelaMesaEsquerda").find('.selected').find('.precoUnitario').text();
	var nome		=$("#tabelaMesaEsquerda").find('.selected').find('.nome').text();
	var imp			=$("#tabelaMesaEsquerda").find('.selected').find(".impressoraPedido").text(); 
	var cat	 	        =$("#tabelaMesaEsquerda").find('.selected').find(".categoriaProduto").text(); 

	
                                      
	//tenta encontrar na tabelaMesaDireita 
	var findC=null;
	$('#tabelaMesaDireita tr').each(function() {
	  var $tds = $(this).find('td ');
	  if($tds.length != 0) {
	      var $currText = $tds.eq(0).text();
	      if($currText==cod1) 	findC=$tds;
	  }		
	});
	// console.log(findC);

	//existe cod na oura tabela
	if(findC != null){

	    var qn1=parseFloat($('#quantDivLinha').val());
	    // console.log(ph1+"  qn1");
	    var nh=parseFloat( findC.filter(".qnt").text());
	    var qn2 =(nh+qn1).toFixed(2)
	    findC.filter(".qnt").text(qn2);
	    var nh2=parseFloat( findC.filter(".precoLinha").text());

	    var nh3=nh2+(parseFloat(precoUnitario*qn1));
	    findC.filter(".precoLinha").text(nh3.toFixed(2));
	    AQ.push({
		'codProduto'		: cod1,
		'quantidadeLinha'	: parseFloat(qn1).toFixed(2), 
		'produto'		: nome, 
		'precoLinha'		: parseFloat(precoUnitario*qn1) ,
		'precoUnitario'		: parseFloat(precoUnitario),
		'categoriaProduto'      : cat,
		'impressoraPedido'	: imp , 
		'anulacao'		: false ,
		'hora'			: "12:00"
	    });	
	} 
	//cria uma nova linha na tabela
	else  { 

	    var nodeCl=node.clone();
	    // a quantida é para ir buscar ao text input
	    var qn1=parseFloat($('#quantDivLinha').val());
	    nodeCl.find(".qnt").text(qn1);
	    // console.log(nodeCl.find(".qnt").text());
	    var ph1= parseFloat($('#quantDivLinha').val())
	    var nh5= parseFloat(precoUnitario*ph1);
	    nodeCl.find(".precoLinha").text(nh5.toFixed(2));
	    nodeCl.find(".qnt").text(qn1.toFixed(2));
	    $('#tabelaMesaDireita ' ).find('tbody').append(nodeCl);
	    AQ.push({
		'codProduto'		: cod1,
		'quantidadeLinha'	: parseFloat(qn1).toFixed(2), 
		'produto'		: nome, 
		'precoLinha'		: parseFloat(nh5) ,
		'precoUnitario'		: parseFloat(precoUnitario),
		'categoriaProduto'      : cat,
		'impressoraPedido'	: imp , 
		'anulacao'		: false ,
		'hora'			: "12:00"
	    });	

      }
	var qn1=parseFloat($('#quantDivLinha').val());
	var qn2=parseFloat(quant1);
	var qn3=qn2-qn1
	node.find(".qnt").text(qn3.toFixed(2));
		
	//var nh2=parseFloat( node.find(".precoLinha").text());
	//console.log(nh2+" nh2");
	//console.log(parseFloat (precoUnitario  ));
	var nh3=(parseFloat (precoUnitario  ))* qn3      ;
	node.find(".precoLinha").text(nh3.toFixed(2));
	if(qn3==0) node.hide();


	//  var uu=redux(bb,[]) 	
	var f3= function (a){return a.precoLinha;};
	var gtotal=(AQ.map(f3).reduce(function  (a,b){return (a+b);}) );
	$('#totalDivEsquerda').val(gtotal.toFixed(2))	



	var docTotal=(docD.linhaConta.map(f3).reduce(function  (a,b){return (a+b);}) );
	// console.log(docD.linhaConta);
	$('#totalDivDireita').val(((docTotal-gtotal).toFixed(2)))




    }
    
}


function dupArr(rows1){
    var AA=[];
    for (  i = 0; i<rows1.length  ; i++) {
	AA.push(  jQuery.extend(true,{},rows1[i]) );		
    }
    return AA;

}