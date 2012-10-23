

// Create a sandbox for our menu widget controller.

function machMC (o, node ,empregado,mesa ,doc ) {
    
    
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
    var daMesa =function() {return mesa;}
    var tearDownM =function(){currentState.teardown()};
   
    var daDoc = function(){return doc;} ;
   
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
			     ' style="position:absolute;top: 0px;left:0; width: 800; height:600";>'+
			     '</div>');
	    $('#svgAnulacao').svg();
	    svg =$('#svgAnulacao').svg('get');
	    
	    desenhaRect(svg);
	    
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
	svg.rect(g, 3, 3, 600, 500, {
	    id: 'recQP',rx: "10", ry:"10",strokeWidth: 6,	
	    fill: "grey",'stroke-linejoin': 'round', stroke: 'orange'
	})	

console.log('imprimeTalaoEcran(daDoc()) ');  
	console.log((daDoc()));
	console.log(imprimeTalaoEcran(daDoc()));
	var textoT="";
 	$.each( imprimeTalaoEcran(daDoc()),function(index, value) {textoT=textoT+value+"  \u000A  "  }  )

	$("#svgAnulacao").append('<textarea  cols="52" rows="30"  style="font-size: 1em;position:absolute;top: 90px;left:100" >'+textoT+'</textarea>');



	

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
	var g3 = svg.group({	transform :   "translate(490, 80 )" });
	svg.rect(g3,0,0,120,53,  {
	    rx:"10" ,ry:"6", id:"botaoTiraFactura" ,fill:"lightgrey",
	    strokeLinejoin:"round", stroke:"#1F1A17", strokeWidth:"2" 
	});
	
	b1=g3;
	g3.onclick = function(){
	    // var this_e=doc;
	    return function(){
		
	    
		if (true ) 
		{
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

		    console.log(daMundo() );
		    constroiQuadroMesas(6,7,daMundo().empregado ,daMesasEmp() ,daMundo().permissao);

		}
	    }
	}();
	
	
    }
    function desenhaBotaoDivideFactura2(svg)   {

 
	/* botoes cancelar e aprovar*/
	var g3 = svg.group({	transform :   "translate(490, 140 )" });
	svg.rect(g3,0,0,120,53,  {
	    rx:"10" ,ry:"6", id:"botaoDivideFactura" ,fill:"lightgrey",
	    strokeLinejoin:"round", stroke:"#1F1A17", strokeWidth:"2" 
	});

	svg.text(g3,"Divide1 ", 	{
            fontFamily: "Verdana",
            "x" : "3" ,"y" : "39" ,strokeWidth : "0" ,
            strokeLinecap : "null" ,fontSize: "19",
            fill: "black", "text-anchor":"left"
	});
	
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


			console.log("resultado doc.linhaConta");
			console.log(doc.total);

			$(b1).remove();
			$(b3).remove();
			$(b4).remove();
			factActual=1;
			$("#svgAnulacao #NumFactsCli").remove();
			
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

 
	/* botoes cancelar e aprovar*/
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
	else  txI=txI+("\x0d\x0aN.C. "+numCont );
	txI=txI+("\x0d\x0aVenda a Dinheiro "+document.numFactura+"  "+document.diaSessao[2]+'/'+
		 document.diaSessao[1]  +'/'+
 		 document.diaSessao[0]);
        
	txI=txI+("\x0d\x0a ");
	impT.push(txI);

	var pretf= (reduzLinhas(document.linhaConta));
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
		    var si= (a.nomeProduto  +"                                 ").slice(0,22);
		    var pi =  ("   "+pr1);
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
		    /* +parseFloat(t1).toFixed(2)*/
		    );
	    txI=txI+("\x0d\x0a ");
	    txI=txI+("\x0d\x0a ");
	    
	}
	impT.push(txI);

	impT.push('\x1b\x21\x00\x0d '+'----------------------------'+"\x0d\x0a\x1b\x21\x20TOTAL   "
		  +(parseFloat(t1)).toFixed(2)+'\u20AC\x1b\x21\x00\x0d');
	txI="";
	txI=txI+("\x0d\x0amesa "+document.mesa+"   empregado   "+empregado);
	//txI=txI+("\x0d\x0ahora      "+document.hora);
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
	for(var i=0;i<impT.length;i++)
	console.log(impT[i]);


	db.saveDoc(impB, {
            error: function() {
		alert( "erro inserir doc.func imprimeFactura em quadroFactura" );
	    }
	});
	
    }


    

}
