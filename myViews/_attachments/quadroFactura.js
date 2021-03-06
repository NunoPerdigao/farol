/* funcao init*/

function  desenhaQuadroFactura (doc, empregado, permissoes) {
    if(doc==null){
	return;
    }
    $(document).unbind('keydown', fk3);
    $(document).unbind('keydown', fk2);
    $(document).unbind('keydown', fk21);
    $(document).unbind('keydown', fk1);
    
    var svg = $('#svgbasics').svg('get');
    var  ga2 = svg.group({
	id: 'svgFactura', stroke: 'black',strokeWidth: 2
    });
    
    /*nao permitir aceder ao botoes que esta por baixo */
    svg.rect( ga2, 0, 0, 800, 600, {
	id: 'ecPed1',rx: "10", ry:"10",opacity:"0.5",
	fill: "white"
    });
    /*fim nao permitir aceder ao botoes que esta por baixo */
    var g = svg.group(ga2,
		      { transform :   "translate(50, 55 )   ",
			id: 'svgGTransparencia', stroke: 'black',strokeWidth: 2
		      });
    svg.rect(g, 3, 3, 600, 350,
	     {
		 id: 'ecPed1',rx: "10", ry:"10",
		 fill: "darkslategray",'stroke-linejoin': 'round', 
		 stroke: 'orange',strokeWidth: 6
	     });
    /* Campos de insercao Cliente*/
    svg.text(g,"Nome", 	{
        fontFamily: "Verdana",
        "x" : "50" ,"y" : "61" ,strokeWidth : "0" ,
        strokeLinecap : "null" ,fontSize: "17",
        fill: "black", "text-anchor":"left"
    });
    
    svg.text(g,"Num Cont", 	{
        fontFamily: "Verdana",
        "x" : "50" ,"y" : "105" ,strokeWidth : "0" ,
        strokeLinecap : "null" ,fontSize: "17",
        fill: "black", "text-anchor":"left"
    });
        
    svg.text(g,"Refeicoes", 	{
        fontFamily: "Verdana",
        "x" : "50" ,"y" : "147" ,strokeWidth : "0" ,
        strokeLinecap : "null" ,fontSize: "17",
        fill: "black", "text-anchor":"left"
    });
    svg.rect(g , 30, 20, 530, 200, {
        id: 'ecPed5',rx: 5,ry:3,
        fill: "none",
        'stroke-linejoin': 'round',
        stroke: 'orange',
        'stroke-width': 2
    });
    
    var fo = document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject');
    fo.setAttribute('id', 'textInputQuant');
    fo.setAttribute('width', '580');
    fo.setAttribute('height', '250');
    fo.setAttribute('x', '50');
    fo.setAttribute('y', '50');
    
    var p1 = document.createElementNS('http://www.w3.org/1999/xhtml', 'p');
    p1.setAttribute('xmlns', 'http://www.w3.org/1999/xhtml');  

    var inT1 = document.createElement( 'input');
  //  inT1.setAttribute('x', '50');
  //  inT1.setAttribute('y', '80');
    inT1.setAttribute('id', 'nomeCliente');
    inT1.setAttribute('size', '40');
    inT1.style.type = 'text';
    p1.appendChild(inT1);
    fo.appendChild(p1);
    g.appendChild(fo);
  

    var p2 = document.createElementNS('http://www.w3.org/1999/xhtml', 'p');
    p2.setAttribute('xmlns', 'http://www.w3.org/1999/xhtml');
    var inT2 = document.createElementNS('http://www.w3.org/1999/xhtml', 'input');
    inT2.setAttribute('xmlns', 'http://www.w3.org/1999/xhtml');
  //  inT2.setAttribute('x', '50');
  //  inT2.setAttribute('y', '180');
    inT2.setAttribute('id', 'numContribuinte');
    inT2.setAttribute('class', 'numeric'); 
    inT2.setAttribute('size', '12');
    inT2.style.type = 'text';
    p2.appendChild(inT2); 
    fo.appendChild(p2);
    g.appendChild(fo);


    var p3 = document.createElementNS('http://www.w3.org/1999/xhtml', 'p');
    p3.setAttribute('xmlns', 'http://www.w3.org/1999/xhtml');
    var inT3 = document.createElementNS('http://www.w3.org/1999/xhtml', 'input');
    inT3.setAttribute('xmlns', 'http://www.w3.org/1999/xhtml');
  //  inT3.setAttribute('x', '110');
  //  inT3.setAttribute('y', '260');
    inT3.setAttribute('id', 'numRefeicoes');
    inT3.setAttribute('size', '2');
   inT3.setAttribute('class', 'numeric'); 
    inT3.style.type = 'text';
    p3.appendChild(inT3); 
    fo.appendChild(p3);
    g.appendChild(fo);


  $(".numeric").numeric({ negative: false }, function() {  });




    
    /* botoes  */
    var gButTiraFactura= svg.group(g,{
        id: 'gButTiraFactura',
        stroke: 'black',
        strokeWidth: 2
    });
    
    svg.rect(gButTiraFactura,280, 140, 100, 60, {
        id: 'ecPed5',rx: 3,ry:3,
        fill: "green",
        'stroke-linejoin': 'round',
        stroke: 'orange',
        'stroke-width': 2
    });
 
    svg.text(gButTiraFactura,"Factura", 	{
        fontFamily: "Verdana",
        "x" : "330" ,"y" : "170" ,strokeWidth : "0" ,
        strokeLinecap : "null" ,fontSize: "17",
        fill: "black", "text-anchor":"middle"
    });
    
    
    gButTiraFactura.onclick = function(){
        var this_doc		= doc;
        var this_empregado	= empregado;
        var this_permissoes	= permissoes;
        
        return function(){
            tiraFactura_click(this_doc,this_empregado,this_permissoes);
        }
    }();
    //
    //
 /* botao Divide factura */
    var gButDivideFactura= svg.group(g,{
        id: 'gButDivideFactura',
        stroke: 'black',
        strokeWidth: 2
    });
    
    svg.rect(gButDivideFactura,390, 140, 100, 60, {
        id: 'ecPed55',rx: 3,ry:3,
        fill: "green",
        'stroke-linejoin': 'round',
        stroke: 'orange',
        'stroke-width': 2
    });
 
    svg.text(gButDivideFactura,"Divide", 	{
        fontFamily: "Verdana",
        "x" : "420" ,"y" : "170" ,strokeWidth : "0" ,
        strokeLinecap : "null" ,fontSize: "17",
        fill: "black", "text-anchor":"middle"
    });
    
    
    gButDivideFactura.onclick = function(){
	var this_doc		= doc;
        var this_empregado	= empregado;
        var this_permissoes	= permissoes;
        
        return function(){
            divideFactura_click(this_doc,this_empregado,this_permissoes);
        }
       
    }();



    // fim butao divide factura
    //-----------------------------------
    
    var gButFechaMesa= svg.group(g,{
        id: 'gButFechaMesa',
        stroke: 'black',
        strokeWidth: 2
    });
    
    svg.rect(gButFechaMesa, 470, 270, 100, 60, 
	     {rx		: 3,ry:3,
              id		: 'butFechaM',
              fill		: "green",
              'stroke-linejoin'	: 'round',
              stroke		: 'orange',
              'stroke-width'	: 2
	     });
    
    svg.text(gButFechaMesa,"FechaMesa", 
	     {
		 fontFamily	: "Verdana", "x" : "520" ,"y" : "310" ,
		 strokeWidth	: "0" ,
		 strokeLinecap	: "null" ,
		 fontSize	: "17",
		 fill		: "black", "text-anchor":"middle"
	     });
    
    gButFechaMesa.onclick = function(){
        var this_doc		=doc;
        var this_empregado	=empregado;
        var this_permissoes	= permissoes;
        
        return function(){
            fechaMesa_click(this_doc,this_empregado,this_permissoes);
        }
    }();
    /* botao cancelar  */
    var g4 = svg.group(g, {transform : "translate(33, 270 )"});
    g4.onclick= function(){
	var this_doc=doc;
	var this_emp=empregado;
	var this_ms=doc.mesa;
	var this_per=permissoes;
		return function(){
		    fechaQuadroFactura_click(empregado,this_ms,this_doc,this_per);
	
		}
	}();



    svg.rect(g4,0,0,60,60,  
	     {
		 id		:"botaoCancelaAnula" ,rx:"36" ,ry:"10",
		 fill		:"lightgrey",
		 strokeLinejoin	:"round",
		 stroke		:"#1F1A17", 
		 strokeWidth:"3"
	     });
    svg.line(g4,15,15,45,45,{style:" stroke: red;   stroke-width: 9px"});
    svg.line(g4,45,15,15,45,{style:" stroke: red;   stroke-width: 9px"});
    
    /* fim botao cancelar  */
    
    
    
    
}


function fechaQuadroFactura_click(  emp,ms,doc,per ){
    $("#svgFactura").remove();
    ecraMesa(emp,ms,doc,per,true);
   // console.log();
    $(document).bind('keydown', fk1);
  
}

function tiraFactura_click (doc,e,p){
    db.view("myViews/countFacturas", {
        success: function(data){
            doc.numFactura=1;
            if(data.rows.length!=0) doc.numFactura=data.rows[0].value.max+1;
            doc.type = "factura";
            saveLinhaF( doc,e,p);
        }
    });
    //$("#svgFactura").remove();
    
    $(document).bind('keydown', fk1);
    
}
function saveLinhaF(document,e,p){
    var ff2= function(a,b,c,d){
	imprimeFactura(e,document,$('#nomeCliente').val(),$('#numContribuinte').val(),$('#numRefeicoes').val() ); 
	constroiQuadroMesas(a,b,c,d);
	$("#svgFactura").remove();
    }
    
    // (funcao , argumentos para a funcao,doc,e,p) 
    saveLinha_Aux(ff2,[ 7,6,e,p] ,document,e,p    );
   

}

function fechaMesa_click( d,e,p){
    d.type = "conta";
    saveLinha( d,e,p);
    $("#svgFactura").remove();
    $(document).bind('keydown', fk1);
}

function saveLinha(document,e,p){
    var ff2= function(a,b,c,d){
	constroiQuadroMesas(a,b,c,d);
	$("#svgFactura").remove();
    }
    
    saveLinha_Aux(ff2,[ 7,6,e,p] ,document,e,p    );
}

function saveLinha_Aux(ff,ar,document,e,p){
    db.saveDoc( document, {
        success: function() {                      
	    ff.apply(null,ar);      
        },
        error: function() {
	    alert( "erro inserir doc.func saveLinha_Aux em quadroFactura" );
			  }
    });
}

function  imprimeFactura(empregado,document,nomeC,numCont,numRefeicoes) {
    
    var impT=[];
    var txI=("\x1b\x40\x1b\x63\x34\x02\x1b\x74\x03\x1b\x45\x00\x1b\x2d\x00\x1b\x21\x00\x1b\x45\x01Restaurante O Alves"+
	     "\x0d\x0a\x1b\x45\x00Gentes & Costumes - Restauracao Lda"+
	     "\x0d\x0aAv Combatentes da Grande Guerra, 124/140\x0d\x0a4450-693 Le\u001b\u0087a d Tel.229954226"+
	     "\x0d\x0aN.Contrib. 509235719\x0d\x0aRegisto na Cons. Porto n.509235719");
    
    if(nomeC=="" || nomeC== undefined)
	txI=txI+("\x0d\x0aNome \x5f\x5f\x5f\x5f\x5f\x5f\x5f\x5f\x5f\x5f\x5f\x5f\x5f\x5f");
    else  txI=txI+("\x0d\x0aNome "+ nomeC );
    if(numCont=="" ||  numCont==undefined )
        txI=txI+("\x0d\x0aN.C. \x5f\x5f\x5f\x5f\x5f\x5f\x5f\x5f");
    else  txI=txI+("\x0d\x0aN.C. "+numCont );
    txI=txI+("\x0d\x0aVenda a Dinheiro "+document.numFactura+"  "+document.diaSessao[2]+'/'+
	  document.diaSessao[1]  +'/'+
 	    document.diaSessao[0]);
    
    
    txI=txI+("\x0d\x0a ");
    impT.push(txI);
    /* console.log("......");
    console.log((document));
    console.log("......");
    console.log("......");*/
 
    var pretf= (reduzLinhas(document.linhaConta));
    var tf= ordenaPorCategoria(pretf);
    var f3= function (a){return a.precoLinha;};
    var t1=0.0;
    // console.log(rows.length);
    // console.log(rows.map(f3));
    if (document.linhaConta.length>0) t1=document.linhaConta.map(f3).reduce(function  (a,b){return (a+b);}) ;
    txI="";
    if(numRefeicoes=="" || numRefeicoes==undefined)
	tf.map(function (a) {
            var pr1 =(parseFloat(a.precoLinha)).toFixed(2);
            if(a!=undefined &&  parseFloat(a.precoLinha)>0 ) 
	    {
		var si= (a.produto +"                                 ").slice(0,22);
		var pi=  ("       "+pr1);
		var pii= pi.slice(pi.length-6,pi.length );
		var qi =parseFloat(a.quantidadeLinha).toFixed(2)+"        ";
		var qii= qi.slice(0,4);

		txI=txI+("\x0d\x0a"+qii+"   "+
			 si +" "+pii);    
	    }
	});
    else
	txI=txI+("\x0d\x0a\x1b\x21\x20 "+numRefeicoes+" refeicoes  "+parseFloat(t1).toFixed(2) );

    impT.push(txI);

    impT.push('\x1b\x21\x00\x0d '+'----------------------------'+"\x0d\x0a\x1b\x21\x20TOTAL     "+(parseFloat(t1)).toFixed(2)+'\u20AC\x1b\x21\x00\x0d');
    txI="";
    txI=txI+("\x0d\x0amesa "+document.mesa+"   empregado   "+empregado);
    //txI=txI+("\x0d\x0ahora      "+document.hora);
    txI=txI+("\x0d\x0a   ");
    txI=txI+("\x0d\x0a       Processado por computador");
    txI=txI+("\x0d\x0a           IVA incluido    13%  ");
    impT.push(txI);
   // impT.push("\x0d\x0a             \n ");   
    
    impT.push("\x0d\x0a             \n "); 
    impT.push("\x0d\x0a             \n "); 
    //impT.push("\x0d\x0a  \n\n\n\x1d\x56\x00");
   // impT.push(" \x1b\x645");
    impT.push("\x1b\x69");

    document.imprimido=impT;
    db.saveDoc(document, {
        error: function() {
	    alert( "erro inserir imprimido imprimeFactura em quadroFactura" );
			  }
    });
    
    
    var impB={"type":"impressora","texto":impT,"local":window.location.host};
    db.saveDoc(impB, {
        error: function() {
	    alert( "erro inserir doc.func imprimeFactura em quadroFactura" );
			  }
    });
    
}









