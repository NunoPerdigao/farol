

// Create a sandbox for our menu widget controller.

function machAnul (o,ecranTab1,ecranTab2, node,mesasEmp,mundo ) {
    
    
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
    var tabelaA;
    var tabelaB;
//    o.ret= function() {return node;}
//    o.teardown =function(){currentState.teardown()};
    var daNode = function(){return node;}
    var daMundo  = function() {return mundo;} 
    var daMesasEmp =function() {return mesasEmp;}
    var tearDownM =function(){currentState.teardown()};
    var daTabelaA  = function() {return tabelaA;}
    var daTabelaB  = function() {return tabelaB;}
    var setTabelaA  = function(t) { tabelaA=t;}
    var setTabelaB  = function(t) { tabelaB=t;}
    var daecranTab1 =function() {return ecranTab1;};
    var daecranTab2 =function() {return ecranTab2;};
 
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
			     ' style="position:absolute;top: 0px;left:0; width: 800; height:600";>'+
			     '</div>');
	    $('#svgAnulacao').svg();
	    svg =$('#svgAnulacao').svg('get');
	    
	    desenhaRect(svg);
	    desenhaAB(  $('#svgAnulacao'),daMundo(),daTabelaA(),daTabelaB() );
	    desenhaButaoVermelho(svg);
	    desenhaButaoVerde(svg);
	    desenhaBotaoAprova(svg) ;
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
    }


    function desenhaBotaoAprova(svg)   {

 
	/* botoes cancelar e aprovar*/
	var g3 = svg.group({	transform :   "translate(320, 380 )" });
	g3.onclick = function(){
	    // var this_e=doc;
	    return function(){

		var lp=(tabelaA.retornaLinhas());
	    
		$("#svgAnulacao").remove();
		if (lp.length >0 ) 
		{
		    currentState.teardown(); 
		    daTabelaA().remove();
		    daNode().clear();


		    console.log(daecranTab1());
		    
		    daecranTab1().remove();
		    daecranTab2().remove();
		    o.teardown();  
/*
	fazPed(lp,empregado,doc,mesa,permissao,false, 
		       ecranMesa,[6,7,empregado,doc,
		          mesa, 
				  mesasEmp ,permissao,perm2 ] );
*/
    fazPed(lp,daMundo().empregado,daMundo().doc,daMundo().mesa,daMundo().permissao,true,
			   ecranMesa,[6,7,daMundo().empregado,daMundo().doc,
			            daMundo().mesa,
						daMesasEmp() ,daMundo().permissao,true] );	   
/*
		    fazPed(lp,daMundo().empregado,daMundo().doc,daMundo().mesa,daMundo().permissao,true,
			   constroiQuadroMesas,[6,7,daMundo().empregado,
						daMesasEmp() ,
						daMundo().permissao] );	   
		*/
		// aceitaFormAnulacoes(empregado,ms,doc,permissoes,podeIns);
		}
	    }
	}();
	
	svg.rect(g3,0,0,60,60,  {
	    rx:"36" ,ry:"10", id:"botaoAceitaAnula" ,fill:"lightgrey",
	    strokeLinejoin:"round", stroke:"#1F1A17", strokeWidth:"3" 
	});
	
	svg.path(g3, "M 15,20 L 12,47 L 53,9 L 21,32 Z" , {
	    style:"fill: green; stroke: blak;   stroke-width: 2px"}) ;  
	var g4 = svg.group({
	    transform :   "translate(233, 260 )", onmousedown : "limpaFormAnulacoes(evt)"
	});
	

    }
    
    function desenhaButaoVerde(svg){

	var g2 = svg.group({transform :   "translate(50, 80 )   ","class":"botaoRem" ,id:"botaoRem"  });

	g2.onclick= function(evt){
	    butaoAnulaRem_click(evt);
	}

	svg.rect(g2,265,110,60,60,  {
	    rx:"36" ,ry:"10", id:"botaoVerde" ,
	    fill:"green", strokeLinejoin:"round", 
	    stroke:"#1F1A17", strokeWidth:"3"});    
	var g3 = svg.group(g2,{	transform : "translate(235, 5 )"	});

	svg.path(g3, "M 40,130 L 60,130 L 60,115 L 80,135 L 60,155 L 60,140 L 40,140 Z" ,
		 {style:"fill: darkgreen; stroke: blak;   stroke-width: 2px"}) ; 

    }

    function desenhaButaoVermelho(svg){

	
	var g2 = svg.group({
	    transform :   "translate(50, -100 )   ",
	    "class":"botao" ,
	    id:"botao" ,
	    /*	onmouseup:"butaoUp_click(evt)" ,
		onmousedown: "butao_click(evt)" 
	    */
	});

	g2.onclick= function(evt){
	    butaoRem_click(evt);
	}

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




    }



    /////////////////////////////////////////////////////////////////////////////////////////
    function desenhaAB(node,mundo){


	node.append('<input  id="qntAnul"  VALUE="1" '+	       ' style="font-size: 2.1em;position:absolute;top: 300px;left:310; width: 80;" size="3">'
		   );
	$("#qntAnul").forceNumeric();
	$('#qntAnul').click(function() {
	    $('#qntAnul').val(1);
	    $("#qntAnul").select();
	});
	

	var t1 = new tabela("tabelaPedido2");
	
	// y x
	t1.criaTabela(node,80,80,200,300);
	setTabelaA(t1);

	var t2 = new tabela("tabelaPedido3");
	t2.criaTabela(node,80,410,200,300);
	// console.log("mundo");
	if ( mundo.doc!=null){
	    if(mundo.doc.linhaConta.length>0 ){
		var l1= mundo.doc.linhaConta ;
		for(var i=0;i<l1.length; i++){
		    var pl=produtoObj(l1[i].codProduto);
		    var ql=(l1[i].quantidadeLinha);
		    var al=(l1[i].anulacao);
		    // 	    var hl=(l1[i].hora);
		   
		    t2.insereProdutoQuantidade(pl,ql*100,al,null);
		}
	    }

	}
	setTabelaB(t2);

    }





    //----------------------------------------------
    //-------------FUNCOES AUXILIARES  -------------
    //----------------------------------------------
    function butaoRem_click(evt) {

	var nn=daTabelaB().daLinhaSelecionada();

	var  g0=$($(".quantidadeLinha",$(nn))[0]).text()
	var  g1=($('#qntAnul').val());

	if(centesimal(g0)-centesimal(g1)>0 ){
	    var  c1=centesimal(g1);
	    //daTabelaB().removeProdutoQuantidade(($($(".codProduto",$(nn))[0]).text()) ,centesimal(g1)  );
	    
	    var nr=daTabelaB().daLinhaSelecionadaProd();
	    daTabelaA().insereProdutoQuantidade (nr, c1,false ,null);
	    daTabelaB().removeQuantidadeLinhaSelecionada( centesimal(g1)  );
	    
	}

	if(centesimal(g0)-centesimal(g1)==0 ){
	    var  c1=centesimal(g1);
	    // daTabelaB().removeProdutoQuantidade(($($(".codProduto",$(nn))[0]).text()) ,centesimal(g1)  );
	    // daTabelaB().removeLinhaSelecionada();

	    var nr=daTabelaB().daLinhaSelecionadaProd();
	    daTabelaA().insereProdutoQuantidade (nr, c1 ,false,null);
	    daTabelaB().removeQuantidadeLinhaSelecionada( centesimal(g1)  );
	}
    }



    function butaoAnulaRem_click(evt){


	var nn=daTabelaA().daLinhaSelecionada();

	var  g0=$($(".quantidadeLinha",$(nn))[0]).text()
	var  g1=($('#qntAnul').val());

	if(centesimal(g0)-centesimal(g1)>0 ){
	    var  c1=centesimal(g1);
	    //daTabelaB().removeProdutoQuantidade(($($(".codProduto",$(nn))[0]).text()) ,centesimal(g1)  );
	    
	    var nr=daTabelaA().daLinhaSelecionadaProd();
	    daTabelaB().insereProdutoQuantidade (nr, c1,false ,null);
	    daTabelaA().removeQuantidadeLinhaSelecionada( centesimal(g1)  );
	    
	}

	if(centesimal(g0)-centesimal(g1)==0 ){
	    var  c1=centesimal(g1);
	    // daTabelaB().removeProdutoQuantidade(($($(".codProduto",$(nn))[0]).text()) ,centesimal(g1)  );
	    // daTabelaB().removeLinhaSelecionada();

	    var nr=daTabelaA().daLinhaSelecionadaProd();
	    daTabelaB().insereProdutoQuantidade (nr, c1 ,false,null);
	    daTabelaA().removeQuantidadeLinhaSelecionada( centesimal(g1)  );
	}











    }

}