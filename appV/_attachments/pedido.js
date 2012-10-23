
// Create a sandbox for our menu widget controller.

function f1 ( o,tabela,node,t1,t2,mesasEmp,mundo ){
    
    
    // Cache DOM references for later use.
    var dom = {};
  
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
    

    var inTabela=tabela;
    o.ret= function() {return node;}
    o.teardown =function(){currentState.teardown()};
    o.pausa =function(){gotoState(pausaEstado)};
    o.run =function(){gotoState(inDefault)};
    o.apagaCorrente=function(){apagaCorrente()};
    var daTabela= function() {return inTabela;}
    var daNode  = function() {return node;}
    var dat1  = function() {return t1;}
    var dat2  = function() {return t2;}
    var daMundo  = function() {return mundo;} 
    var daMesasEmp =function() {return mesasEmp;}
    var tearDownM =function(){currentState.teardown()};


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
	    /*console.log('primESTe');
	    console.log(daMundo());
	    */
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
    
    var primeiroEstado = {
	
	
	description: "Iatat .",

	gotoState: function(){
	    //console.log('prim');	    
	    gotoState( primeiroEstado );	    
	},
		
	setup: function(){
	    //...
	    df();
	    $(document).bind( 'keydown', segundaTecla );
	},
	
	teardown: function(){
	    $(document).unbind( 'keydown', segundaTecla );	    
	}
	
    };
    // ---------------------------------------------- //
    // ---------------------------------------------- //
    
    
    var pausaEstado = {
	description: "pausa",
	
	gotoState: function(){
	    gotoState( pausaEstado ); 
	},
	setup: function(){
	    console.log("pausa");
	   
	},
	teardown: function(){
	  
	    console.log("fim de pausa");
	}
	
    };
     // ---------------------------------------------- //
    // ---------------------------------------------- //    
    var segundoEstado = {
	description: "I ayet.",
	
	gotoState: function(){
	    gotoState( segundoEstado ); 
	},
	setup: function(){
	    $(document).bind( 'keydown', segundaTecla );
	},
	teardown: function(){
	    $(document).unbind( 'keydown', segundaTecla ); 
	}
	
    };
     // ---------------------------------------------- //
    // ---------------------------------------------- //
    
    
    var segundoEnterEstado = {
	description: "I am et.",
	gotoState: function(){
	    gotoState( segundoEnterEstado );
	},
	setup: function(){
	    $(document).bind( 'keydown', segundoEnterTecla );
	},
	teardown: function(){
	    $(document).unbind( 'keydown', segundoEnterTecla );
	}
    };
    // ---------------------------------------------- //

     var qntState = {
	description: "I am tet.",
	
	gotoState: function(){
	    gotoState( qntState );
	},
	setup: function(){
	  //  console.log('ultimo');
	    $(document).bind( 'keydown', qntTecla );

	   return;
	},
	teardown: function(){
	    $(document).unbind( 'keydown', qntTecla );

	    return;
	}
	
    };
    // ---------------------------------------------- //
     var ultimoEstado = {
	description: "I am tet.",
	
	gotoState: function(){
	    gotoState( ultimoEstado );
	},
	setup: function(){
	    console.log('ultimo est pedido');
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

	   gotoState(primeiroEstado);
	    $('#codPed').val(numPad(e));
	}
	if( e.which ==8 ||  e.which ==46 ){//Backsape e Del
	}
	if( e.which ==109 ){//29 (Esc) 109 (-)
	    // se houver pedidos na tabela nao deixa mudar de quadro
	    if (dat1().retornaLinhas().length==0 ){   
		apagaCorrente();
	    }
	}
	if (e.which == 107)    {// +

	    var lp=(daTabela().retornaLinhas());
	
	  console.log('faz pedido iiie '+e.which);
	  console.log(lp);
	  console.log( daMundo().permissao2 );
	
	    if(daMundo().permissao2 && lp.length>0){
		dat1().remove();
		dat2().remove();
		var gg=dat1();
		var gg1=dat1();
		gg  = {} ;
		gg1 = {};
		daNode().clear();
		fazPed(lp,daMundo().empregado, daMundo().doc , daMundo().mesa ,daMundo().permissao,false, 
		       ecranMesa,
		       [6,7,daMundo().empregado,daMundo().doc,daMundo().mesa,daMesasEmp(),daMundo().permissao,daMundo().permissao2]);
		currentState.teardown(); 
		// 
		//  gotoState(primeiroEstado);
	    }
	}

	if (e.which == 13)    {//Enter
	  //  gotoState(primeiroEstado);
	}
    }

    
    var segundaTecla = function (e) {

	$('#qntPed').click(function() {
	    $('#qntPed').val(1);
	    $("#qntPed").select();
	    gotoState(qntState);

	});

	if( (e.which >=48 &&  e.which <=57 ) || (e.which >=96 &&  e.which <=105)) //0 a 9
	{
	   // console.log('mais++');
	    if ( $('#codPed').val().length<4 )
		$('#codPed').val( $('#codPed').val()+numPad(e));
	    // gotoState(inDefault);
	}
	else{
	    if( e.which ==8 ||  e.which ==46 ){//Backsape e Del
		if ( $('#codPed').val().length>0 ){
		    var ta1=$('#codPed').val() ;		   
		    $('#codPed').val(ta1.slice(0,(ta1.length - 1)))
		}
		else 				      
		    $('#codPed').val("");
	    }

	    else {
		if( e.which ==109 ){//Esc
		    gotoState(inDefault);
		    $('#svgPedido').remove();
		}
		else 
		{ 
		    if (e.which == 13) 
		    {  //Enter	
			var q1=( $('#qntPed').val().trim())
			//console.log(q1)
			var p1=produtoObj( $('#codPed').val().trim());
			//daTab().insereProdutoQuantidadePedido(p1,2);
			if(p1!=""){
			    $('#nomPed').val(p1.nomeProduto);
			    //  console.log($('#codPed').val());
			    //  console.log(p1);
			    gotoState(segundoEnterEstado);
			}
		    }
		}
	    }
	}
    }

    // ---------------------------------------------- //



    var qntTecla = function (e) {


	if( (e.which >=48 &&  e.which <=57 ) || (e.which >=96 &&  e.which <=105)) //0 a 9
	{
	    //console.log('qnt++');
	    // gotoState(inDefault);
	}
	else{
	    if( e.which ==8 ||  e.which ==46 ){//Backsape e Del
		
	    }
	    else {
		if( e.which ==109 ){//Esc
		    gotoState(inDefault);
		    $('#svgPedido').remove();
		}
	else 		   
		{ 
		    if (e.which == 13) 
		    {  //Enter
			var p1=produtoObj( $('#codPed').val().trim());
			var q1=( $('#qntPed').val().trim())
			var rq=centesimal(q1);

			daTabela().insereProdutoQuantidadePedido(p1,rq);
			$('#nomPed').val(p1.nomeProduto);
			//console.log($('#codPed').val());
			//console.log("pede  "+p1.nomeProduto);
			gotoState(inDefault);
			$('#svgPedido').remove();
		    }
		}
	    }
	}
    }


    // ---------------------------------------------- //

    var segundoEnterTecla = function (e) {


	if( (e.which >=48 &&  e.which <=57 ) || (e.which >=96 &&  e.which <=105)) //0 a 9
	{
	   // console.log('qnt++');
	   
	    // gotoState(inDefault);
	}
	else{
	    if( e.which ==8 ||  e.which ==46 ){//Backsape e Del
		
		if ( $('#codPed').val().length>0 ){
		    var ta1=$('#codPed').val() ;
		    
		    $('#codPed').val(ta1.slice(0,(ta1.length - 1)))
		}
		else 				      
		    $('#codPed').val()= "";
		 gotoState(segundoEstado);
	    }
	    else {
		if( e.which ==109 ){//Esc
		    gotoState(inDefault);
		    $('#svgPedido').remove();
		}
	else 		   
		{ 
		    if (e.which == 13) 
		    {  //Enter
			//if(daMundo().permissao2){
			    var p1=produtoObj( $('#codPed').val().trim());
			    var q1=( $('#qntPed').val().trim())
			    var rq=centesimal(q1);

			    daTabela().insereProdutoQuantidadePedido(p1,rq);
			    $('#nomPed').val(p1.nomeProduto);
			    //console.log($('#codPed').val());
			    //console.log("pede  "+p1.nomeProduto);
			    gotoState(inDefault);
			    $('#svgPedido').remove();
			//}
		    }
		}
	    }
	}
    }
    // ---------------------------------------------- //
    // -----------FIM TECLAS FUNC ------------------- //
    // ---------------------------------------------- //
    // ---------------------------------------------- //
    // ---------------------------------------------- //

    
    var apagaCorrente = function() {

	dat1().remove();
	dat2().remove();
	// console.log("----1112--------");
	var gg=dat1();
	var gg1=dat1();
	gg  = {} ;
	gg1 = {};
	daNode().clear();
	constroiQuadroMesas(6,7,daMundo().empregado ,daMesasEmp() ,daMundo().permissao);
	currentState.teardown(); 



    }




       
    // To start with, put the menu into the default state.
    gotoState( inDefault );
   // console.log('comeca ouvir');
     
} 




    // ---------------------------------------------- //
    // ---------------------------------------------- //
    // ----------------desenha----------------------- //
    // ---------------------------------------------- //

    
    var df = function (){
	$("body").append(' <div id="svgPedido"'+
			 ' style="position:absolute;top: 5px;left:24; width: 700; height:480";>'+
			 '</div>');
	$('#svgPedido').svg();
	var svg =$('#svgPedido').svg('get');
	//	console.log(svg);
	var q = svg.group({id: 'svgGrupoPedidos',stroke: 'black',strokeWidth: 0});
	var g = svg.group(q,{transform : "translate(50, 55 ) ",
			     id: 'svgAnulacao',
			     stroke: 'black',strokeWidth: 2});
	svg.rect(g, 3, 3, 600, 350, {
	    id: 'recQP',rx: "10", ry:"10",strokeWidth: 6,	
	    fill: "grey",'stroke-linejoin': 'round', stroke: 'orange'
	})


	/////////////////////////////////////////////////////////////////////////////////////////
/*	// botao anular  
	var g4 = svg.group(g,{
	    transform :   "translate(73, 260 )", 
	    onmousedown : "cancelaInsere(evt)"
	});
	svg.rect(g4,0,0,60,60,  {
	    rx:"36" ,ry:"10", id:"botaoCancelaInsere" ,
	    fill:"lightgrey", strokeLinejoin:"round", 
	    stroke:"#1F1A17", strokeWidth:"3"   
	});
	svg.line(g4,15,15,45,45,{style:" stroke: red;   stroke-width: 9px"});
	svg.line(g4,45,15,15,45,{style:" stroke: red;   stroke-width: 9px"});
*/
	// fim botao anular
	/////////////////////////////////////////////////////////////////////////////////////////
	//inputs

	$('#svgPedido').append('<div id="svgPedido" onselectstart="return false;"  onmousedown="return false;" '+
			       'style="position:absolute;top: 0px;left:0; width: 800; height:600"  >'+
			       '<input  id="codPed" '+
			       ' style="font-size: 2.1em;position:absolute;top: 100px;left:100; width: 80;" size="3">'+
			       '<input  id="nomPed" '+
			       ' style="font-size: 2.1em;position:absolute;top: 100px;left:220; width: 300;"size="9">'+
			       '<input  id="qntPed" VALUE="1" '+
			       ' style="font-size: 2.1em;position:absolute;top: 200px;left:445; width: 70;"size="3">'+
			       ' </div>');
// 	$("#qntPed").attr("readonly",true)
	$("#nomPed").attr("readonly",true)
	$("#codPed").attr("readonly",true)
	$("#qntPed").forceNumeric();
	


    }

/////////////////////////////////////////////////////////////////////////////////////////






//modo de usar
//f1( jQuery, jQuery( "div" ) );  







   //----------------------------------------------
   //-------------FUNCOES AUXILIARES  -------------
   //----------------------------------------------

// reconhece os algarismos do numPad
function numPad(e){
    if(e.which==96) return "0";
    if(e.which==97) return "1";
    if(e.which==98) return "2";
    if(e.which==99) return "3";
    if(e.which==100) return "4";
    if(e.which==101) return "5";
    if(e.which==102) return "6";
    if(e.which==103) return "7";
    if(e.which==104) return "8";
    if(e.which==105) return "9";
    return String.fromCharCode(e.which);	
}


// faz parsing de uma string com um "." a separar a parte inteira da decimal (se tiver)
//multiplica por cem ( 12.3 => 1230)
//e retorna o inteiro
// so pode ter duas casas decimais
function centesimal(eA){
    //console.log("----- "+eA);
    var e;
    
    if(typeof( e)=="number")
	 e=eA.toFixed(6)+"";
    else
	 e=eA+"";
    
    var a=e.split(".")
    var fa1,fa2,fa3;
    fa3=0;
    if(a.length>=2){

	if(a[0]==""&&a[1]=="") return 100
	if(a[1]=="") return a[0]*100

	if(a[0]!="")
 	    fa1=(parseInt(a[0],10))  *100;
	else fa1=0;
	if(a[1].length ==1)
	    fa2=parseInt((a[1]+"0"),10);
	else 
	{
	    var aaa=a[1].substring(0,2);
	    fa2=parseInt(aaa,10);
	    if(a[1].length>2){
		var aa3=a[1].substring(2,a[1].length);
		fa3=parseFloat( "0."+aa3)
	    }
	}	
	// if(fa2<10) fa2=fa2*10;
    }
    if(a.length==1)
    { 
	fa1=parseInt((a[0])*100);
	fa2=0;
    }
    /*console.log("~~~~~~~~~~");
    console.log(fa1+" @ "+fa2);
    */
    return ((fa1+fa2+fa3));

}





// forceNumeric() plug-in implementation
jQuery.fn.forceNumeric = function () {

    return this.each(function () {
        $(this).keydown(function (e) {
            var key = e.which || e.keyCode;

            if (!e.shiftKey && !e.altKey && !e.ctrlKey &&
                // numbers   
                key >= 48 && key <= 57 ||
                // Numeric keypad
                key >= 96 && key <= 105 ||
                // comma, period and minus, . on keypad
                key == 190 ||/* key == 188 ||*/ key == 109 || key == 110 ||
                // Backspace and Tab and Enter
                key == 8 || key == 9 || key == 13 ||
                // Home and End
                key == 35 || key == 36 ||
                // left and right arrows
                key == 37 || key == 39 ||
                // Del and Ins
                key == 46 || key == 45)
                return true;

            return false;
        });
    });
}
