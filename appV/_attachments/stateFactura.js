function machFact (o,ecranTab1,ecranTab2, node,mesasEmp,mundo ) {
        
    // Cache DOM references for later use.
    var dom = {};
    var svg;
    // This is the current state of the widget. Once the
    // states are defined, this will be further set.
    var currentState = null;
    
    // I fascilitate the transition from the current to
    // the target state.
    var gotoState = function( newState ){
	
	// Check to see if the current state is available
	// and has a teardown method:
	if (currentState && currentState.teardown)
	{    
	    // Teardown the old state.
	    currentState.teardown();   
	}	
	// Check to see if the new state has a setup method.
	if (newState.setup){
	    // Setup the new state.
	    newState.setup()	    
	}	
	// Store the new state.
	currentState = newState;
	
    };
//    o.ret= function() {return node;}
//    o.teardown =function(){currentState.teardown()};
    var daNode = function(){return node;}
    var daMundo  = function() {return mundo;} 
    var daMesasEmp =function() {return mesasEmp;}
    var tearDownM =function(){currentState.teardown()};
    var daecranTab1 =function() {return ecranTab1;};
    var daecranTab2 =function() {return ecranTab2;};
    var b1;
    var b2;   
    var b3;   
    var b4;
    var b5;   
    var nFact;
    var factActual;
    var doc;
    //var daNode  = function() {return node;}   
    // Define the states for this widget. Each state is going
    // to have a setup and teardown state.
    
    // ---------------------------------------------- //
    // ---------------------------------------------- //
 
    var inDefault = {
	
	// I am the description of the state (mostly for
	// debugging and documentation).
	description: "I am the state in which only the menu header appears.",	
	
	// I am a short-hand GOTO function. This method can
	// be passed off to event handlers without scoping
	// problems.
	gotoState: function(){	    
	    // Put widget into this state.  
	    gotoState( inDefault );	    
	},
		
	// I setup the current state.
	setup: function(){	   
	    /*console.log('primESTeeeeeeee');
	      console.log(daMundo());
	    */
	    $("body").append(' <div id="svgAnulacao"'+
			     ' style="position:absolute;top: 0px;left:0;'
			     +' width: 800; height:600";>'+
			     '</div>');
	    $('#svgAnulacao').svg();
	    svg =$('#svgAnulacao').svg('get');
	    
	    desenhaRect(svg);
	    desenhaBotaoFechaMesa(svg) ;
	    desenhaBotaoTiraFactura(svg);
	    desenhaBotaoDivideFactura(svg);
	    desenhaBotaoDivideFactura2(svg);
	    
	    $(document).bind( 'keydown', primeiraTecla );	    
	},	
	
	// I teardown the current state.
	teardown: function(){	    
	    // Remove the event.
	    $(document).unbind( 'keydown', primeiraTecla );	    
	}
	
    };
    
    // ---------------------------------------------- //
    // ---------------------------------------------- //
     var estadoDivideFacturas = {
	description: "I am tet.",
	
	gotoState: function(){
	    gotoState( estadoDivideFacturas );
	},
	setup: function(){
	   return;
	},
	teardown: function(){
	    return;
	}
	
    };

 
    // ---------------------------------------------- //
    // ---------------------------------------------- //
     var ultimoEstado = {
	description: "I am tet.",
	
	gotoState: function(){
	    gotoState( ultimoEstado );
	},
	setup: function(){
	   console.log('ultimo finito');
	   return;
	},
	teardown: function(){
	    return;
	}
    };
  
    // ---------------------------------------------- //
    // ----------------TECLAS FUNC------------------- //
    // ---------------------------------------------- //
    

    var primeiraTecla = function (e) {

	   
	if( (e.which >=48 &&  e.which <=57 ) || (e.which >=96 &&  e.which <=105))//0 a 9
	{
	   // gotoState(ultimoEstado);
	   // $('#codPed').val(numPad(e));
	}
	if( e.which ==8 ||  e.which ==46 ){//Backsape e Del
	}
	if( e.which ==109 ){//29 (Esc) 109 (-)
	    
	    $("#svgAnulacao").remove();
	    currentState.teardown(); 
	    o.run();  
	}
	if (e.which == 13)    {//Enter
	  //  gotoState(primeiroEstado);
	}
    }

    // ---------------------------------------------- //
    // ---------------------------------------------- //

    // ---------------------------------------------- //
    // -----------FIM TECLAS FUNC ------------------- //
    // ---------------------------------------------- //
    // ---------------------------------------------- //
    // ---------------------------------------------- //


       
    // To start with, put the menu into the default state.
    gotoState( inDefault );
    // console.log('comeca ouvir');
     
 
    // ---------------------------------------------- //
    // ---------------------------------------------- //
    // ----------------desenha----------------------- //
    // ---------------------------------------------- //

    function desenhaRect(svg){
	
	var q = svg.group({id: 'svgGrupoAnulacao',stroke: 'black',strokeWidth: 0});
	var g = svg.group(q,{transform : "translate(50, 55 ) ",
			     id: 'svgAnulacao',
			     stroke: 'black',strokeWidth: 2});
	svg.rect(g, 3, 3, 600, 400, {
	    id: 'recQP',rx: "10", ry:"10",strokeWidth: 6,	
	    fill: "grey",'stroke-linejoin': 'round', stroke: 'orange'
	})	



	
/*
	svg.rect(g, 3, 3, 600, 350,
		 {
		     id: 'ecPed1',rx: "10", ry:"10",
		     fill: "darkslategray",'stroke-linejoin': 'round', 
		     stroke: 'orange',strokeWidth: 6
		 });

*/
	/* Campos de insercao Cliente*/
	svg.text(g,"Nome", 	{
            fontFamily: "Verdana",
            "x" : "50" ,"y" : "61" ,strokeWidth : "0" ,
            strokeLinecap : "null" ,fontSize: "17",
            fill: "black", "text-anchor":"left"
	});
	
	svg.text(g,"Num Cont", 	{
            fontFamily: "Verdana",
            "x" : "50" ,"y" : "120" ,strokeWidth : "0" ,
            strokeLinecap : "null" ,fontSize: "17",
            fill: "black", "text-anchor":"left"
	});
        
	svg.text(g,"Refeicoes", 	{
            fontFamily: "Verdana",
            "x" : "50" ,"y" : "170" ,strokeWidth : "0" ,
            strokeLinecap : "null" ,fontSize: "17",
            fill: "black", "text-anchor":"left"
	});
	svg.rect(g , 30, 20, 550, 230, {
            id: 'ecPed5',rx: 5,ry:3,
            fill: "none",
            'stroke-linejoin': 'round',
            stroke: 'orange',
        'stroke-width': 2
	});

	$("#svgAnulacao").append('<input  id="NomeCli"  VALUE="" '+
				 ' style="font-size: 1em;position:absolute;top: 125px;left:100; width: 250;" size="70">'
				);

	$("#svgAnulacao").append('<input  id="ContCli"  class="nume" VALUE="" '+
				 ' style="font-size: 1em;position:absolute;top: 180px;left:100; width: 180;" size="70">'
				);

/*
	$("#svgAnulacao").append('<inpux  id="ContCli"  class="numeric"  VALUE="" '+
				 ' style="font-size: 1em;position:absolute;top: 180px;left:100; width: 180;" size="80">'
				);
*/
	$("#svgAnulacao").append('<input  id="RefeCli"  class="nume"  VALUE="" '+
				 ' style="font-size: 1em;position:absolute;top: 235px;left:100; width: 50;" size="80">'
				);
	
	$(".nume").numeric({ negative: false , decimal : false  }, function() {  });
    }

    function desenhaBotaoFechaMesa(svg)   {
 
	/* botoes cancelar e aprovar*/
	var g3 = svg.group({	transform :   "translate(490, 380 )" });
	b4=g3;
	g3.onclick = function(){
	    // var this_e=doc;
	    return function(){
		
		//_-----------------------------------
		var doc=daMundo().doc;
		var e =daMundo().empregado;
		var p=daMundo().permissao;
		var d		= new Date();
		var h 		= zeroFill(d.getHours(),2);
		var m 		= zeroFill(d.getMinutes(),2);
		var ka 		= h.toString()+':'+m.toString();
		doc.hora	= ka;
		doc.type = "conta";

		db.saveDoc( doc, {
		    success: function() {                      
			if(true){
			    currentState.teardown(); 
			    $("#svgAnulacao").remove();
			    daNode().clear();
			    daecranTab1().remove();
			    daecranTab2().remove();
			    currentState.teardown(); 
			    o.run();  
			    o.teardown();
			    constroiQuadroMesas(6,7,daMundo().empregado ,daMesasEmp() ,daMundo().permissao);   
			}	
		    },
		    error: function() {
			alert( "erro inserir doc.func saveLinha_Aux em quadroFactura" );
		    }
		});
	    }	    	    
	    
	}();
	
	svg.rect(g3,0,0,120,60,  {
	    rx:"6" ,ry:"10", id:"botaoFechaMesa" ,fill:"lightgrey",
	    strokeLinejoin:"round", stroke:"#1F1A17", strokeWidth:"2" 
	});
	svg.text(g3,"Fecha Mesa", 	{
            fontFamily: "Verdana",
            "x" : "3" ,"y" : "30" ,strokeWidth : "0" ,
            strokeLinecap : "null" ,fontSize: "19",
            fill: "black", "text-anchor":"left"
	});	
    }
    
   

    function desenhaBotaoDivideFactura(svg)   {

	/* botoes cancelar e aprovar*/
	var g3 = svg.group({	transform :   "translate(490, 180 )" });
	svg.rect(g3,0,0,120,53,  {
	    rx:"10" ,ry:"6", id:"botaoTiraFactura" ,fill:"lightgrey",
	    strokeLinejoin:"round", stroke:"#1F1A17", strokeWidth:"2" 
	});

	svg.text(g3,"Divide ", 	{
            fontFamily: "Verdana",
            "x" : "3" ,"y" : "18" ,strokeWidth : "0" ,
            strokeLinecap : "null" ,fontSize: "19",
            fill: "black", "text-anchor":"left"
	});

	svg.text(g3,"   por Valor", 	{
            fontFamily: "Verdana",
            "x" : "30" ,"y" : "41" ,strokeWidth : "0" ,
            strokeLinecap : "null" ,fontSize: "19",
            fill: "black", "text-anchor":"left"
	});

	$("#svgAnulacao").append('<input  id="ValorFactDiv"  class="numericA"  VALUE="0" '+
				 ' style="font-size: 1em;position:absolute;top: 195px;left:430; width: 40;text-align:right " size="80">'
				);
	
	 $(".numericA").numeric({ negative: false    }, function() {  });

	svg.text(g3," €", {fontFamily: "Verdana", strokeWidth : "0", fontSize: "25",
			   "x" : "-17" ,
			   "y" : "39" ,
			   strokeLinecap : "null" ,
			   fill: "black", "text-anchor":"left"
			  }
		);
	
	b5=g3;
	g3.onclick = function(){
	    // var this_e=doc;
	    return function(){
		
		var valFact=parseFloat( $("#svgAnulacao #ValorFactDiv").val());
		if (valFact>0 ) 
		{
		   
		    var tf  =(reduzLinhas(daMundo().doc.linhaConta));
		    var tf2 =(reduzLinhas(daMundo().doc.linhaConta));
		    var p1  =($("#svgAnulacao #NomeCli").val()); 
	        var p2  =($("#svgAnulacao #ContCli").val()); 
		    var p3  =($("#svgAnulacao #RefeCli").val());
		    
		    tira( valFact,p1,p2,p3, tf,tf2 );
		    
		    $("#svgAnulacao").remove();
	
		    currentState.teardown(); 		    
		    daNode().clear();

		    daecranTab1().remove();
		    daecranTab2().remove();
		    currentState.teardown(); 

		    //o.run();
		    //o.teardown();  		  
		    //		    console.log(rAX(AB,true).concat(rAX(AB,false) ));
		    //  currentState.teardown(); 
		    //  gotoState( ultimoEstado );

		    o.run();  
		    o.teardown();		    
		}
	    }
	}();	
    }
    
    
    /*
      valFact  -  valor da  Fact
      p1       -  Nome 
      p2       -  Conttribuinte 
      p3       -  numero de refeicoes 
      tf  =tf2 -  linhaConta do doc;		    
    */

    function tira ( valFact,p1,p2,p3, tf ,tf2)   {
	//console.log(daMundo().doc.linhaConta );
 	//console.log(tf);
	var num=[];
	var numA=[];

  //  	console.log("inicio "+valFact);
	for(var i=0;i<tf.length;i++)
	{
	    var vl= tf[i].quantidadeLinha*tf[i].preco/100
	    if (vl<= valFact){
	
/*		console.log(tf[i].codProduto+"  "+tf[i].quantidadeLinha+"x "+tf[i].nomeProduto+"  preco "+tf[i].preco+"    "+vl);
*/		tf[i].quantidadeLinha=tf[i].quantidadeLinha/100;
		tf[i].precoLinha=tf[i].precoLinha/100;
		tf[i].anulacao=false;
		var nVx = valFact-vl;	
		valFact=nVx;
//		console.log("-  "+vl+ " =  " + valFact.toFixed(2));
		num.push(tf[i]);

		tf2[i].quantidadeLinha=tf2[i].quantidadeLinha/100;
		tf2[i].precoLinha=tf2[i].precoLinha/100;
		tf2[i].anulacao=true;
		numA.push(tf2[i]);
	


	    }
	    else{
		
		/*
		  console.log("fim    "+nVx);
		console.log("nova   "+vl*tf[i].quantidadeLinha/tf[i].quantidadeLinha*tf[i].preco)
		*/
		var nVx	=valFact
		var hj	=nVx/vl*tf[i].quantidadeLinha;
		/*
		console.log("mm   "+hj+"  prco"+tf[i].preco);
		console.log("2mm  "+(hj*tf[i].preco/100 ).toFixed(2)  );
		console.log("3mm  "+(tf[i].preco-hj*tf[i].preco/100).toFixed(2)     );
		*/
		tf[i].quantidadeLinha=hj/100;
		tf[i].precoLinha=(hj*tf[i].preco/100);
		tf[i].anulacao=false;
		num.push(tf[i]);

		tf2[i].quantidadeLinha=hj/100;
		tf2[i].precoLinha=(hj*tf2[i].preco/100);
		tf2[i].anulacao=true;
		numA.push(tf2[i]);

		/*	console.log("daMiunfo  ");
			console.log(num );
			console.log(numA );
		*/

		fazPedTT(num,p1,p2,p3, daMundo().empregado ,null,93,true )
		fazPedTT(numA,p1,p2,p3, daMundo().empregado ,daMundo().doc,daMundo().mesa,false )

		break;

	    }

	}
    }




    //________________________________________________________________________



    function fazPedTT(num,p1,p2,p3, empregado,doc,ms,imprFact ) {
	
	/*	console.log("------------TTTTTTTTTTTTtt-------");
	 */	
	var f5=function (a){return (     (isNaN( parseFloat( a.quantidadeLinha)))           
					 || ( isNaN( parseFloat( a.preco)))       
					 || ( ( parseFloat( a.quantidadeLinha))=== null )       
					 || ( ( parseFloat( a.preco          ))=== null )    
					 || ( ( parseFloat( a.quantidadeLinha))=== undefined)
					 || ( ( parseFloat( a.preco        ))==undefined ) 				  
				   );};
	// certefica que nao insere valores invalidos
	var existeNAN=(num).map(f5).reduce(function  (a,b){return (a||b);}) ;

	if(  existeNAN ){
	    alert("quantidade ou preco NaN.Func fazPe de ecranMesa ");
	    console.log("NaN  "+existeNAN);
	    return;	
	}

	if (num.length==0 ){	      	
	    return;
	}

	// quer dizer que a mesa ainda nao foi aberta	     
	if ( doc == null){
	    var document	= {};
	    document.linhaConta	= [];
	    document.total	=  0;

	    var d	= new Date();
	    var h	= zeroFill(d.getHours(),2);
	    var m	= zeroFill(d.getMinutes(),2);
	    var ka	= h.toString()+':'+m.toString();
	    
	    document.hora = ka;
/*
	    console.log("da33333Miunfo  ");
	    console.log(daMundo().empregado );
*/	    
	    document.empregado	= empregado;
	    document.type	= "conta";
	    document.mesa	= ms;
	    document.aberta	= true;
	    document.diaSessao	= "1/1/1900";


	    db.view("appV/diaSessao",{
		success: function(data){
		    document.diaSessao = [data.rows[0].value.ano,
					  data.rows[0].value.mes,
					  data.rows[0].value.dia];
		    fazPeTT(num,p1,p2,p3, empregado,document,ms,imprFact  );
		},
		error :  function(data){
		    console.log(" erro fp249 diaSessao");
		    console.log(document);
		    // fazPe(num, empregado,document,ms,permissoes,anulacao );
		}
	    });	    
	}
	
	else
	    fazPeTT(num,p1,p2,p3, empregado,doc,ms,imprFact );
	
    }
 
    function fazPeTT(num,p1,p2,p3, empregado,doc,ms,imprFact) {

	var linhas=doc.linhaConta;   

	for(var i=0;i<num.length; i++){
	    var linh1	= {};
	    var p	= num[i];
	    var ops	= (p.preco) * (p.quantidadeLinha*100)
	    var ops2	= (ops/100).toFixed(2)
	    // console.log((p.preco*100)+" q2dews  "+ops2 )

	    var pl1			= (p.preco * p.quantidadeLinha*100)/100;
	    linh1.codProduto		= p.codProduto;
	    linh1.nomeProduto		= p.nomeProduto;
	    linh1.quantidadeLinha	= parseFloat( p.quantidadeLinha.toFixed(6)     );
	    var sinalP			=  1;
	    if(p.anulacao) sinalP	= -1;
	    linh1.precoLinha		= ops2*sinalP;
	    linh1.anulacao		= p.anulacao;
	    linh1.impressoraPedido	= p.impressoraPedido;
	    linh1.preco			= parseFloat( p.preco);
	    linh1.categoriaProduto	= p.categoriaProduto;
 	    linh1.empregado		= p.empregado
 	    
	    var d	= new Date();
	    var h	= zeroFill(d.getHours(),2);
	    var m	= zeroFill(d.getMinutes(),2);
	    var ka	= h.toString()+':'+m.toString();

	    linh1.hora	= ka;
	    var numlinh	= linhas.length;
	    linh1.linha	= numlinh;
	    linhas	= linhas.concat([linh1]);
	}

	doc.linhaConta	= linhas;
	var f3		= function (a){return a.precoLinha;};
	doc.total	= (doc.linhaConta.map(f3).reduce(function  (a,b){return (a+b);}) );
	doc.aberta	= false;
	var d		= new Date();
	var h 		= zeroFill(d.getHours(),2);
	var m 		= zeroFill(d.getMinutes(),2);
	var ka 		= h.toString()+':'+m.toString();
	doc.hora	= ka;
	
	var f4=function (a){return (  parseFloat(a.quantidadeLinha.toFixed(2)) <0);};
	var existeLinhasNegativas=(reduzLinhas(doc.linhaConta).map(f4).reduce(function(a,b){return (a||b);}) );
	var tgg=reduzLinhas(doc.linhaConta);
/*
	console.log("-------------------------num---------------------------");
	console.log( num );

	console.log("-------------------------doc---------------------------");
	console.log( existeLinhasNegativas+"   existe");
	console.log(doc);
	*/

	if(existeLinhasNegativas){

	    for(var i=0;i<tgg.length; i++){
		var p		=tgg[i];
		var ops		=(p.preco) * (p.quantidadeLinha*100);
		var ops2	= (ops/100).toFixed(2);
		console.log("pedido  "+p.quantidadeLinha+"  cod "+
			    p.codProduto+"  preco "+p.preco+"  precoLinha "+
			    ops2 +" anulacao "+p.anulacao );	
	    };	    
	    //TODO
	    //neste caso o doc original foi alterado por esta funco o que pode provocar conflitos
	    alert("quantidade que pretende anular não existe.Func fazPedTT de ecranMesa ");
	
	}
	else{

            // depois de remover o valor total for ≃ 0 entao apaga doc => mesa passa a estar livre 
	    if(doc.total < 0.00001)	    
		db.removeDoc(doc,{
		    success : function (){
		    },
		    error : function(){
			alert("erro remover doc.Funcao fazPe em ecranMesa ");		
		    }
		});
	    else {

		if(imprFact)
		    salvaFactura(doc,p1,p2,p3);
		    // imprimeFactura(empregado,doc,p1,p2,p3);
		else 

		    db.saveDoc(doc ,{
			success : function () {
			    // console.log('inserir  pedido')  ;console.log(doc)  ;
			    // console.log('inserido pedido --------------------------')  ;
			    // o imprimePedido nao pode falhar se alterou na mesa
			    //    imprimePedido(empregado,ms,num,anulacao);
			    //TODO verificar funcao ecranMesa
			    //    f.apply(null,as);
			    constroiQuadroMesas(6,7,daMundo().empregado ,daMesasEmp() ,daMundo().permissao);
			    
			    // ecranMesa(6,7,empregado,ms,doc,permissoes ,true );
			},
			error   : function () { 
			    //TODO
			    //neste caso o doc original foi alterado por esta funco o que pode provocar conflitosƒ
			    alert("erro inserir doc.Funcao fazPe em ecranMesa " );
			}
		    });
		
	    }
	    /*db.saveDoc(doc ,{
	      success : function () {
		    // console.log('inserir  pedido')  ;console.log(doc)  ;
		    // console.log('inserido pedido --------------------------')  ;
		    // o imprimePedido nao pode falhar se alterou na mesa
		    //    imprimePedido(empregado,ms,num,anulacao);
		    //TODO verificar funcao ecranMesa
		    //    f.apply(null,as);

		    // ecranMesa(6,7,empregado,ms,doc,permissoes ,true );
		},
		error   : function () { 
		    //TODO
		    //neste caso o doc original foi alterado por esta funco o que pode provocar conflitosƒ
		    alert("erro inserir doc.Funcao fazPe em ecranMesa " );
		}
	    });
*/

	}



    }









    //_____________________________________________________________________--



    function desenhaBotaoDivideFactura2(svg)   {

	/* botoes cancelar e aprovar*/
	var g3 = svg.group({	transform :   "translate(490, 115 )" });
	svg.rect(g3,0,0,120,53,  {
	    rx:"10" ,ry:"6", id:"botaoDivideFactura" ,fill:"lightgrey",
	    strokeLinejoin:"round", stroke:"#1F1A17", strokeWidth:"2" 
	});

	svg.text(g3,"Divide ", 	{
            fontFamily: "Verdana",
            "x" : "3" ,"y" : "18" ,strokeWidth : "0" ,
            strokeLinecap : "null" ,fontSize: "19",
            fill: "black", "text-anchor":"left"
	});

	svg.text(g3,"   por n Fact ", 	{
            fontFamily: "Verdana",
            "x" : "30" ,"y" : "41" ,strokeWidth : "0" ,
            strokeLinecap : "null" ,fontSize: "19",
            fill: "black", "text-anchor":"left"
	});

	$("#svgAnulacao").append('<input  id="NumFactsCli"  class="numericF"  VALUE="2" '+
				 ' style="font-size: 1em;position:absolute;'+
				 'top: 130px;left:430; width: 40; text-align:right" size="80">'
				);
	
	$(".numericF").numeric({ negative: false , decimal : false  }, function() {  });

	b3=g3;
	g3.onclick = function() 
	{
	    // var this_e=doc;
	    return function(){		

		// truque(a mudar,nao precisa ir à base de dados) em vez de fazer uma copia do documento
		db.openDoc(daMundo().doc._id, {
		    success: function(doc) {
			if($("#svgAnulacao #NumFactsCli").val()=="")
			    nFact=2;
			else
			    nFact=parseInt( $("#svgAnulacao #NumFactsCli").val());
			
			for(var i=0;i<doc.linhaConta.length;i++){
			    
			    var qa1=(centesimal(doc.linhaConta[i].quantidadeLinha)/nFact);
			    var sin=1;
			    if(doc.linhaConta[i].anulacao) sin=-1;
			    doc.linhaConta[i].quantidadeLinha=qa1/100;
			    doc.linhaConta[i].precoLinha=qa1* doc.linhaConta[i].preco  /100 *sin;
			}

			var f3= function (a){return a.precoLinha;};
			
			doc.total=(doc.linhaConta.map(f3).reduce(function  (a,b){return (a+b);}) );
/*
			console.log("resultado doc.linhaConta");
			console.log(doc.total);
*/
			$(b1).remove();
			$(b3).remove();
			$(b4).remove();
			$(b5).remove();
			factActual=1;
			$("#svgAnulacao #NumFactsCli").remove();
			$("#svgAnulacao #ValorFactDiv").remove();
			
			var tFa=svg.text("1/"+nFact, 	{
			    fontFamily: "Verdana",
			    "x" : "500" ,"y" : "200" ,strokeWidth : "0" ,
			    strokeLinecap : "null" ,fontSize: "59",
			    fill: "black", "text-anchor":"left"
			});		


			b2.onclick = function(){
			    return function(){
				var p1=($("#svgAnulacao #NomeCli").val()); 
				var p2=($("#svgAnulacao #ContCli").val()); 
				var p3=($("#svgAnulacao #RefeCli").val());
				
				if(factActual==nFact){
				    console.log("Ultima impressao");	
				    delete doc._id;
				    delete doc._rev;
				    salvaFactura(doc,p1,p2,p3);
				    
				    $("#svgAnulacao").remove();			     
				    currentState.teardown(); 
				    daNode().clear();
				    daecranTab1().remove();
				    daecranTab2().remove();
				    currentState.teardown(); 
				    o.run();  
				    o.teardown();
				    constroiQuadroMesas(6,7,daMundo().empregado ,daMesasEmp() ,daMundo().permissao);
				    
				}
				else{

				    if(factActual==1)
				    {	//console.log("primeira factura");
					salvaFactura(doc,p1,p2,p3);
				    }else 
				    {console.log("ouras");
				     delete doc._id;
				     delete doc._rev;
				     salvaFactura(doc,p1,p2,p3);
				    }
				    factActual=factActual+1;
				    gotoState( estadoDivideFacturas );
				    $(tFa).text(factActual+"/" +nFact );

				}
			    }
			}()
			
		    },
		    error: function(status) {
			console.log(status);
		    }
		});
	    }
	}();
	
    }

    function salvaFactura(doc,p1,p2,p3){
	var e =daMundo().empregado;
	var p=daMundo().permissao;
	
	db.view("appV/countFacturas", {
	    success: function(data){
		
		doc.numFactura=1;
		if(data.rows.length!=0) doc.numFactura=data.rows[0].value.max+1;

		var d		= new Date();
		var h 		= zeroFill(d.getHours(),2);
		var m 		= zeroFill(d.getMinutes(),2);
		var ka 		= h.toString()+':'+m.toString();
		doc.hora	= ka;
		doc.type = "factura";	
		db.saveDoc( doc, {
		    success: function() {                      
			if(true){

			    imprimeFactura(e,doc,p1,p2,p3);
			}
		    },
		    error: function() {
			alert( "erro inserir doc.func saveLinha_Aux em quadroFactura" );
		    }
		});
	    }
	});
    }


    function desenhaBotaoTiraFactura(svg)   {
	
	var g3 = svg.group({	transform :   "translate(490, 240 )" });
	svg.rect(g3,0,0,120,60,  {
	    rx:"10" ,ry:"6", id:"botaoDivideFactura" ,fill:"lightgrey",
	    strokeLinejoin:"round", stroke:"#1F1A17", strokeWidth:"3" 
	});
	svg.text(g3,"Factura ", 	{
            fontFamily: "Verdana",
            "x" : "3" ,"y" : "35" ,strokeWidth : "0" ,
            strokeLinecap : "null" ,fontSize: "19",
            fill: "black", "text-anchor":"left"
	});
	
	b2=g3;
	g3.onclick = function(){
	    // var this_e=doc;
	    return function(){
		
		var p1=($("#svgAnulacao #NomeCli").val()); 
	    var p2=($("#svgAnulacao #ContCli").val()); 
		var p3=($("#svgAnulacao #RefeCli").val());
		
		var doc=daMundo().doc;
		var e =daMundo().empregado;
		var p=daMundo().permissao;
				
		db.view("appV/countFacturas", {
		    success: function(data){		
			doc.numFactura=1;
			if(data.rows.length!=0) doc.numFactura=data.rows[0].value.max+1;
			var d		= new Date();
			var h 		= zeroFill(d.getHours(),2);
			var m 		= zeroFill(d.getMinutes(),2);
			var ka 		= h.toString()+':'+m.toString();
			doc.hora	= ka;
			doc.type = "factura";

			db.saveDoc( doc, {
			    success: function() {                      
				if(true){
				    currentState.teardown(); 				    
				    $("#svgAnulacao").remove();
				    daNode().clear();
				    
				    daecranTab1().remove();
				    daecranTab2().remove();
				    currentState.teardown(); 
				    o.run();  
				    o.teardown();
				    console.log("immmprimme"); 
				    imprimeFactura(e,doc,p1,p2,p3);
				    //$('#nomeCliente').val(),$('#numContribuinte').val(),$('#numRefeicoes').val() ); 
				    constroiQuadroMesas(6,7,daMundo().empregado ,daMesasEmp() ,daMundo().permissao);
				    
				}
				
			    },
			    error: function() {
				alert( "erro inserir doc.func saveLinha_Aux em quadroFactura" );
			    }
			});
		    }
		    		    		    
		});
		
	    }
	}();
	
	
    }


    /////////////////////////////////////////////////////////////////////////////////////////





    //----------------------------------------------
    //-------------FUNCOES AUXILIARES  -------------
    //----------------------------------------------
    
    function  imprimeFactura(empregado,document,nomeC,numCont,numRefeicoes) {
    
	var impT=[];
	var txI=cabecFactura;
	if(nomeC=="" || nomeC== undefined)
	    txI=txI+("\x0d\x0aNome \x5f\x5f\x5f\x5f\x5f\x5f\x5f\x5f\x5f\x5f\x5f\x5f\x5f\x5f");
	else  txI=txI+("\x0d\x0aNome "+ nomeC );
	if(numCont=="" ||  numCont==undefined )
            txI=txI+("\x0d\x0aN.C. \x5f\x5f\x5f\x5f\x5f\x5f\x5f\x5f");
	else  
	   txI=txI+("\x0d\x0aN.C. "+numCont );
	impT.push(txI);
	txI="";
	txI=txI+("\nVenda a Dinheiro "+document.numFactura)
	txI=txI+(" "+document.diaSessao[2]+'/'+
		 document.diaSessao[1]  +'/'+
 		 document.diaSessao[0]);
        
	txI=txI+("\x0d\x0a\n ");
	//se tiver poucas linhas
	if (document.linhaConta.length<7)txI=txI+("\n\n\n\n");
	    
	impT.push(txI);
	var pretf= (reduzLinhas(document.linhaConta));
	//console.log(pretf);

	var tf= ordenaPorCategoria(pretf);
	var f3= function (a){return a.precoLinha;};
	var t1=0.0;
	
	if (document.linhaConta.length>0) 
	    t1=document.linhaConta.map(f3).reduce(function  (a,b){return (a+b);}) ;
	txI="";
	if(numRefeicoes=="" || numRefeicoes==undefined)
	    tf.map(function (a) {
		var pr1 =(parseFloat(a.preco* a.quantidadeLinha/100)).toFixed(2);
		if(a!=undefined &&  pr1>0 ) 
		{
/*		    console.log(a.preco);
		    console.log(a.precoLinha);
		    console.log(a.quantidadeLinha)
		    console.log(a.quantidadeLinha/100*a.preco );
*/		    var si= (a.nomeProduto  +"                                 ").slice(0,22);
		    var pi=  ("   "+parseFloat(pr1).toFixed(2));
		    var pii= pi.slice(pi.length-6,pi.length );
		    var qi =parseFloat(a.quantidadeLinha/100).toFixed(2)+"        ";
		    var qii= qi.slice(0,4);
		    txI=txI+("\x0d\x0a"+qii+" "+si +pii);    
		}
	    });
	else{
	    txI=txI+("\x0d\x0a ");
	    txI=txI+("\x0d\x0a ");
	    txI=txI+("\x0d\x0a\x1b\x21\x20 "+numRefeicoes+" refeicoes "
		     /*+parseFloat(t1).toFixed(2)*/
		    );
	    txI=txI+("\x0d\x0a ");
	    txI=txI+("\x0d\x0a ");
	    
	}

	impT.push(txI);

	impT.push('\x1b\x21\x00\x0d '+'\n----------------------------'+"\x0d\x0a\x1b\x21\x20TOTAL   "
		  +(parseFloat(t1)).toFixed(2)+'\u20AC\x1b\x21\x00\x0d');
	txI="";
	txI=txI+("\x0d\x0amesa "+document.mesa+"   empregado   "+empregado);
	//txI=txI+("\x0d\x0ahora      "+document.hora);
	//se tiver poucas linhas
	if (document.linhaConta.length<4)txI=txI+("\n\n");

	txI=txI+("\x0d\x0a   ");
	txI=txI+("\x0d\x0a       Processado por computador");
	txI=txI+("\x0d\x0a           IVA incluido    23%  ");
	impT.push(txI);
	
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
	// imprime a factura na console
	for(var i=0;i<impT.length;i++)
	console.log(impT[i]);


	db.saveDoc(impB, {
            error: function() {
		alert( "erro inserir doc.func imprimeFactura em quadroFactura" );
	    }
	});
	
    }


    

}
