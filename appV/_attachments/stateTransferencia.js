

// Create a sandbox for our menu widget controller.

function machTransf (o,ecranTab1,ecranTab2, node,mesasEmp,mundo ) {


    // Cache DOM references for later use.
    var dom = {};
    var svg;
    // This is the current state of the widget. Once the
    // states are defined, this will be further set.
    var currentState = null;
    
    // I fascilitate the transition from the current to
    // the target state.
    var gotoState = function( 
    	newState ){
    	// Check to see if the current state is available
    	// and has a teardown method:
    	if (currentState && currentState.teardown)
    	{ // Teardown the old state.
    		currentState.teardown();
    	}
    	if (newState.setup){ // Setup the new state.
    		newState.setup()	    
    	}
    	// Store the new state.
    	currentState = newState;
    };
    var tabelaA;
    var tabelaB;
    // o.ret= function() {return node;}
    //  o.teardown =function(){currentState.teardown()};
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
    var doc2 ;
    var mesa2;
    var AA=[];
    var AB=[];

    //var daNode  = function() {return node;}   
    // Define the states for this widget. Each state is going
    // to have a setup and teardown state.

    // ---------------------------------------------- //
    // ---------------------------------------------- //

    var inDefault = {
    	// Check to see if the current state is available
		// and has a teardown method:

		description: "I am the state in which only the menu header appears.",
		// I am a short-hand GOTO function. This method can
		// be passed off to event handlers without scoping
		// problems.
		gotoState: function(){// Put widget into this state. 
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

	      desenhaRectG(svg,daMesasEmp(), daMundo().mesa , daMundo().empregado );

	      $(document).bind( 'keydown', primeiraTecla );
	  },
	  // I teardown the current state.
	  teardown: function(){// Remove the event.
	  	$(document).unbind( 'keydown', primeiraTecla );
	  }
	};


	var duasMesas = {
		// I am the description of the state (mostly for
		// debugging and documentation
		description: "I am the state in which only the menu header appears.",
		// I am a short-hand GOTO function. This method can
		// be passed off to event handlers without scoping
		// problems.
		gotoState: function(){
			// Put widget into this state.  
			gotoState( duasMesas );
		},
		// I setup the current state.
		setup: function(){
			AB=[];
			AA=[];
			$('#svgAnulacao').svg();
			svg =$('#svgAnulacao').svg('get');
			svg.clear();

			desenhaRect(svg);
			desenhaAB(  $('#svgAnulacao'),daMundo(),daTabelaA(),daTabelaB() );
			desenhaButaoVermelho(svg);
			desenhaButaoVerde(svg);
			desenhaBotaoAprova(svg,daMundo(),daTabelaA(),daTabelaB()   ) ;

			$(document).bind( 'keydown', segundaTecla );	    
		},
		// I teardown the current state.
		teardown: function(){// Remove the event.
			$(document).unbind( 'keydown', segundaTecla );
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
    	if((e.which >=48 &&  e.which <=57 ) || (e.which >=96 &&  e.which <=105))//0 a 9
    	{

    	}
    	if( e.which ==8 ||  e.which ==46 ){//Backsape e Del
    	}
    	if( e.which ==109 ){//29 (Esc) 109 (-)
    		$("#svgAnulacao").remove();
    		currentState.teardown(); 
    		o.run(); 
    	}
    	if (e.which == 13)    {//Enter


    	}
    }


    var segundaTecla = function (e) {
    	if((e.which >=48 &&  e.which <=57 ) || (e.which >=96 &&  e.which <=105))//0 a 9
    	{

    	}
    	if( e.which ==8 ||  e.which ==46 ){//Backsape e Del
    	}
    	if( e.which ==109 ){//29 (Esc) 109 (-)

    		$("#svgAnulacao").remove();
    		currentState.teardown(); 
    		gotoState(inDefault);  
    	}
    	if (e.which == 13){
    		/*
    		// Enter
    		//  gotoState(primeiroEstado);
    		*/
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
    	/*
    	var q = svg.group({id: 'svgGrupoAnulacao',stroke: 'black',strokeWidth: 0});
		var g = svg.group(q,{transform : "translate(50, 55 ) ",
		id: 'svgAnulacao',
		stroke: 'black',strokeWidth: 2}
		*/


		svg.rect( 53, 30, 730, 500, {
			id: 'recQP',rx: "10", ry:"10",strokeWidth: 6,	
			fill: "grey",'stroke-linejoin': 'round', stroke: 'orange'
		})



		svg.rect( 80, 18, 94, 24, {
			"rx"		: 2,"ry":2,
			fill		: "gray",
			'stroke-linejoin'	: 'round',
			stroke		: 'black',
			'stroke-width'	: 1
		});
		svg.text(130 ,37, mesa2+" " ,{
			fontFamily	: "Verdana",
			fontSize	: "24.5",
			fontWeight	:"bold", 
			fil		: "blue", 
			strokeWidth	:"0"
		});  



	}


	function desenhaRectG(svg,mesas,mesa,empregado ){

		var lm ={};
		db.view("appV/mesasAbertas", {
			success: function(data){
				/*
				  console.log("aberta : ");
				  console.log(mesas);
				  */
				  data.rows.map(function(row){
				  	/*
				  	push
				  	lm array com as mesas abertas



				  	*/
				  	lm[row.key] = {
				  		aberta	: row.value.aberta ,
				  		nome	: row.value.empregado ,
				  		tot	: row.value.total , 
				  		doc	: row.value
				  	};
				  });	
				  desenhaRectGAux(svg,7, 9, lm,mesas,mesa ,empregado);
				}
			});
	}


	function desenhaRectGAux(svg,nc, nl, lm,mE,mesa,k,permissoes){

		var q = svg.group({id: 'svgGrupoAnulacao',stroke: 'black',strokeWidth: 0});
		var g = svg.group(q,{transform : "translate(9,5 ) ",
			id: 'svgAnulacao',
			stroke: 'black',strokeWidth: 2});
		svg.rect(g, 3, 7, 760, 560 , {
			id: 'recQP',rx: "10", ry:"10",strokeWidth: 6,	
			fill: '#646D7E','stroke-linejoin': 'round', stroke: 'orange'
		})
		//______
		//      quadradinhos
		var contMesa = 0;
		for (j = 0; j < nl; j++){
			for (i = 0; i < nc; i++) {
				contMesa++;
				var cl1	= "#019a32";// "#018a37";
				//	var p1	= true;
				var p2	= false;
				var totMesa	= 0.0;	 
				var mes1	= mE[((i + 1) + (j * nc))-1 ]; //((i + 1) + (j * nc));
				//cores das mesas
				var stW=1;
				var cl2= 'orange';
				var cl3="#d3d3d3";
				if (lm[mes1]  == undefined)  {
					cl1 = "blue";
					p2=true;
				}
				else{
					totMesa = (lm[mes1]).tot;
					//	var sx  =((i + 1) + (j * nc));
					p2=(  lm[mes1]).nome== k;
					if ( (lm[mes1]).aberta == true)  {cl3= "#117a37"; }

					if ( (lm[mes1]).aberta != true)  {cl1 = "red";p2=false; }

					if (   (mE[((i + 1) + (j * nc))-1]) == mesa){
						cl1 = "lightgrey";stW=5;
						cl2='red'; cl3="#d3d3d3";
					}
					// if ((!permissoes)&& !((lm[(i + 1) + (j * nc)]).nome== k) ) { cl1 = "grey";p1=false;}
				}
				var g2 = svg.group(
				{
					stroke: 'black',
					strokeWidth: 2
				});

				var r3 = svg.rect(g2, 40 + 100 * i, 40 + 60 * j, 80, 40, 
				{
					id		: 'mesaR' + mes1,
					rx		: "3",ry: "3",
					fill		: "blue",
					stroke		: cl2,
					'stroke-width'	: stW
				});
				if(cl1 =="lightgrey"){
					var r3 = svg.rect(g2, 40 + 100 * i, 40 + 60 * j, 80, 40, 
					{
					id		: 'mesaR' + mes1,
					rx		: "3",ry: "3",
					fill		: "lightgrey",
					stroke		: cl2,
					'stroke-width'	: stW
				});
				}

				var r4 = svg.rect(g2, 43 + 100 * i, 74 + 60 * j, 74, 4, 
				{
					id		: 'mesaR' + mes1,
					fill		: cl1,
					stroke		: "none"
				});


				//nao transfere para a propria mesa
				if( (mE[((i + 1) + (j * nc))-1])   != mesa)
				{
					g2.onclick = function(){
						var this_e = k;//empregado
						var this_d = null ;
						var this_m = mes1 ;
						if(lm[mes1] != undefined ){
							this_d = lm[mes1].doc ;
						}
						var this_p = p2;
						var this_p1= permissoes;
						var this_mm=(mE[((i + 1) + (j * nc))-1]);
						return function(){
							mesa2= this_mm;
							doc2=this_d;
							gotoState( duasMesas );
							//ga - grupo desenho svg
							//
						}
					}();
				}
				//mE[0] ==>  1
				var tef =  (mE[((i + 1) + (j * nc))-1]).toString();
				svg.text(g2, 40 + 100 * i, 36 + 60 * j, tef, 
				{ 
					strokeWidth:"0" ,stroke:"#000000", 
					fill: "	#d3d3d3",
					fontSize: "14",
					fontWeight:"bold"
				});
				if(totMesa>0){
					var ts=(totMesa.toFixed(2)).toString();
					svg.text(g2, 65 + 100 * i, 72 + 60 * j, ts, 
					{ 
						strokeWidth	:"0" ,stroke:"#000000", 
						fill		:"#000000",fontSize: "14",
						style		:"text-anchor: middle;"
						//,fontWeight		:"bold"
					});
				}
			}
		}
	}
	function rAX (AX,boolX){

		var rPQ=[]

		for(var i=0;i<AX.length;i++   )
		{

			if(boolX && AX[i].quantidadeLinha<0 )		   
				rPQ.push({
					codProduto		:AX[i].codProduto,
					quantidadeLinha	:(Math.abs(AX[i].quantidadeLinha)/100).toFixed(2)+"" ,
					nomeProduto		:AX[i].nomeProduto ,
					preco		:AX[i].preco+" ",
					precoLinha		:parseFloat((AX[i].preco*(AX[i].quantidadeLinha))/100).toFixed(2)+"",
					impressoraPedido	:AX[i].impressoraPedido,
					categoriaProduto	:AX[i].categoriaProduto,
					hora		:"12:12",
					anulacao		: boolX 
				});

			if(!boolX && AX[i].quantidadeLinha>0 )		   
				rPQ.push({
					codProduto		:AX[i].codProduto,
					quantidadeLinha		:(Math.abs(AX[i].quantidadeLinha)/100).toFixed(2)+"" ,
					nomeProduto		:AX[i].nomeProduto ,
					preco			:AX[i].preco+"",
					precoLinha		:parseFloat(
						(AX[i].preco*(AX[i].quantidadeLinha))/100 
						).toFixed(2)+"",
					impressoraPedido	:AX[i].impressoraPedido,
					categoriaProduto	:AX[i].categoriaProduto,
					hora			:"12:12",
					anulacao		: boolX 
				});

		}
		return (rPQ) ;


	}


	function desenhaBotaoAprova(svg,mundo)   {

console.log("daMundo().doc");
		console.log(daMundo().doc);

		/* botoes cancelar e aprovar*/
		var g3 = svg.group({	transform :   "translate(380, 430 )" });
		g3.onclick = function(){
			// var this_e=doc
			return function(){

				var lp=(tabelaA.retornaLinhas());

				$("#svgAnulacao").remove();
				if (lp.length >0 ) 
				{
					currentState.teardown(); 
					daTabelaA().remove();
					daNode().clear();

					daecranTab1().remove();
					daecranTab2().remove();
					currentState.teardown();
					//o.run();
					//o.teardown();
					//		    console.log(rAX(AB,true).concat(rAX(AB,false) ));
					fazPedTT( rAX(AA,true ).concat(rAX(AA,false) )  ,daMundo().empregado ,doc2, mesa2,  true )
					fazPedTT( rAX(AB,true ).concat(rAX(AB,false) ),daMundo().empregado,daMundo().doc,daMundo().mesa , true )  ;
					//  currentState.teardown();
					//  gotoState( ultimoEstado );
					o.run();  
					o.teardown();
					constroiQuadroMesas(6,7,daMundo().empregado ,daMesasEmp() ,daMundo().permissao);
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

		var g2 = svg.group({transform :   "translate(110, 80 )   ","class":"botaoRem" ,id:"botaoRem"  });

		g2.onclick= function(evt){
			butaoAnulaRem_click(evt);

		}

		svg.rect(g2,265,110,60,60,  
		{
			id			:"botaoVerde" ,
			rx			:"36" ,ry:"10", 
			fill		:"green", 
			strokeLinejoin	:"round", 
			stroke		:"#1F1A17", 
			strokeWidth	:"3"
		});    

		var g3 = svg.group(g2,{	transform : "translate(235, 5 )"	});	
		svg.path(g3, "M 40,130 L 60,130 L 60,115 L 80,135 L 60,155 L 60,140 L 40,140 Z" ,
			{style:"fill: darkgreen; stroke: blak;   stroke-width: 2px"}) ; 

	}

	function desenhaButaoVermelho(svg){


		var g2 = svg.group({
			transform :   "translate(110, -100 )   ",
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

    	node.append('<input  id="qntAnul"  VALUE="1" '+	       
    		' style="font-size: 2.1em;position:absolute;top: 330px;left:370; width: 80;" size="3">'
    		);
    	$("#qntAnul").forceNumeric();
    	$('#qntAnul').click(function() {
    		$('#qntAnul').val(1);
    		$("#qntAnul").select();
    	});


    	var t1 = new tabela("tabelaPedido2");
    	// y x
    	t1.criaTabela(node,60,80,270,400);
    	if ( doc2!=null){
    		if(doc2.linhaConta.length>0 ){
    			var l1= doc2.linhaConta ;
    			for(var i=0;i<l1.length; i++){
    				var pl=produtoObj(l1[i].codProduto);
    				var ql=(l1[i].quantidadeLinha);
    				var al=(l1[i].anulacao);
    				// 	    var hl=(l1[i].hora);

    				t1.insereProdutoQuantidade(pl,ql*100,al,null);
    			}
    		}

    	}
    	setTabelaA(t1);

    	var t2 = new tabela("tabelaPedido3");
    	t2.criaTabela(node,60,475,270,400);
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
    		console.log("AA4444");
    		var nr=daTabelaB().daLinhaSelecionadaProd();
    		daTabelaA().insereProdutoQuantidade (nr, c1,false ,null);
    		daTabelaB().removeQuantidadeLinhaSelecionada( centesimal(g1)  );

    		redux(AA,nr,c1,false);		
    		redux(AB,nr, c1,true  );
    	}

    	if(centesimal(g0)-centesimal(g1)==0 ){
    		var  c1=centesimal(g1);
    		// daTabelaB().removeProdutoQuantidade(($($(".codProduto",$(nn))[0]).text()) ,centesimal(g1)  );
    		// daTabelaB().removeLinhaSelecionada();
    		var nr=daTabelaB().daLinhaSelecionadaProd();
    		daTabelaA().insereProdutoQuantidade (nr, c1 ,false,null);
    		daTabelaB().removeQuantidadeLinhaSelecionada( centesimal(g1)  );

    		console.log("AA3333");
    		redux(AA,nr,c1,false);		
    		redux(AB, nr, c1,true  );

    	}
    	/*	console.log("AA");
    	console.log(AA);
    	console.log("AB");
    	console.log(AB)
    	*/
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
    		console.log("AA22222"+centesimal(g1)  );
    		redux(AA,nr,centesimal(g1) ,true);		
    		redux(AB, nr, centesimal(g1) ,false  );



    	}

    	if(centesimal(g0)-centesimal(g1)==0 ){
    		var  c1=centesimal(g1);
    		// daTabelaB().removeProdutoQuantidade(($($(".codProduto",$(nn))[0]).text()) ,centesimal(g1)  );
    		// daTabelaB().removeLinhaSelecionada();

    		var nr=daTabelaA().daLinhaSelecionadaProd();
    		daTabelaB().insereProdutoQuantidade (nr, c1 ,false,null);
    		daTabelaA().removeQuantidadeLinhaSelecionada( centesimal(g1)  );
    		console.log("AA1111");
    		redux(AA,nr,c1,true);		
    		redux(AB, nr, c1,false  );

    	}
    }
    //________________________________________________________________________


    function fazPedTT(num, empregado,doc,ms,permissoes,anulacao,f,as ) {


    	console.log("------------Tdoc.aberta-------");
    	console.log("------------TTTTTTTTTTTTtt-------");
    	console.log(f);
    	var f5=function (a){return (     (isNaN( parseFloat( a.quantidadeLinha)))           
    		||( isNaN( parseFloat( a.preco)))       
    		||  ( ( parseFloat( a.quantidadeLinha       ))===null )       
    		|| ( ( parseFloat( a.preco        ))===null )    
    		|| ( ( parseFloat( a.quantidadeLinha     )  )=== undefined)
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
	  		fazPeTT(num, empregado,document,ms,permissoes,anulacao,f,as  );
	  	},
	  	error :  function(data){
	  		console.log(" erro fp249 diaSessao");
	  		console.log(document);
		// fazPe(num, empregado,document,ms,permissoes,anulacao );
	}
});



	}

	else

		fazPeTT(num, empregado,doc,ms,permissoes,anulacao,f,as  );



}

function fazPeTT(num, empregado,doc,ms,permissoes,anulacao,f,as ) {

	var linhas=doc.linhaConta;   

	for(var i=0;i<num.length; i++){
		var linh1={};
		var p=num[i];

		var ops=(p.preco) * (p.quantidadeLinha*100)
		var ops2= (ops/100).toFixed(2)
	// console.log((p.preco*100)+" q2dews  "+ops2 )

	var pl1= (p.preco * p.quantidadeLinha*100)/100;
	linh1.codProduto	= p.codProduto;
	linh1.nomeProduto	= p.nomeProduto;
	linh1.quantidadeLinha	= parseFloat( p.quantidadeLinha);
	var sinalP		=  1;
	if(p.anulacao) sinalP	= -1;
	linh1.precoLinha	= ops2*sinalP;
	linh1.anulacao		= p.anulacao;
	linh1.impressoraPedido	= p.impressoraPedido;
	linh1.preco		= parseFloat( p.preco);
	linh1.categoriaProduto	= p.categoriaProduto;

	var d		= new Date();
	var h= zeroFill(d.getHours(),2);
	var m= zeroFill(d.getMinutes(),2);
	var ka = h.toString()+':'+m.toString();

	linh1.hora	= ka;
	var numlinh	= linhas.length;
	linh1.linha	= numlinh;
	linhas		= linhas.concat([linh1]);
}

doc.linhaConta=linhas;
var f3= function (a){return a.precoLinha;};

doc.total=(doc.linhaConta.map(f3).reduce(function  (a,b){return (a+b);}) );
if(doc!=null)
doc.aberta=doc.aberta;
else
doc.aberta=true;

var f4=function (a){return (  a.quantidadeLinha<0);};



var existeLinhasNegativas=(reduzLinhas(doc.linhaConta).map(f4).reduce(function  (a,b){return (a||b);}) );



/*
    for(var i=0;i<num.length; i++){
	var p=num[i];
	var ops=(p.preco) * (p.quantidadeLinha*100)
	var ops2= (ops/100).toFixed(2)
	console.log("pedido  "+p.impressoraPedido+"  cod "+p.codProduto+"  preco "+p.preco+"  precoLinha "+ops2 +" anulacao "+p.anulacao+" mesa "+ms );
	console.log("linhas negativas?  "+existeLinhasNegativas);
    };
    return;

    */

    if(existeLinhasNegativas){
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
//		imprimePedido(empregado,ms,num,anulacao);


		// constroiQuadroMesas(7, 6, empregado,ms , permissoes );
	//	f.apply(null,as);

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


    }



}









//_____________________________________________________________________--

function redux(rr ,pr ,qt, anul ){

	console.log("llllll!"+pr.codProduto);
	console.log(rr);
	var inseriuP=false;

	for(var i=0;i<rr.length  ;i++)
	{  
		if(rr[i].codProduto==pr.codProduto){
			console.log("xxxl!"+qt);
			if(anul) {
				rr[i].quantidadeLinha=rr[i].quantidadeLinha-qt;
				rr[i].precoLinha=rr[i].quantidadeLinha*rr[i].precoLinha;
			}
			else {
				rr[i].quantidadeLinha=rr[i].quantidadeLinha+qt;
				rr[i].precoLinha=rr[i].quantidadeLinha*rr[i].precoLinha;
			}
			inseriuP=true;
		}
		
		
	}
	
	
	if(!inseriuP){
		
		var c11=qt;
		if(anul ) c11=-qt;
		console.log("---------++"+c11);
		rr.push({

			codProduto		:pr.codProduto,
			quantidadeLinha		:c11,
			nomeProduto		:pr.nomeProduto,
			preco			:pr.preco,
			precoLinha		: pr.preco*c11,
			impressoraPedido	:pr.impressoraPedido,
			categoriaProduto	:pr.categoriaProduto,
			hora			:"12:12",
			anulacao		:false 

		});


	}


}



















}