
// Create a sandbox for our menu widget controller.

function stCod (o,empregado,mesas ,permissoes,password ){
    
    
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
    

    o.teardown =function(){currentState.teardown()};
    o.apagaCorrente=function(){apagaCorrente()};
    var daEmpregado	= function() { return empregado ;}
    var daMesas		= function() { return mesas;     }
    var daPassword	= function() { return password;  }
    var daPermissoes	= function() { return permissoes;}
    var tearDownM	= function() { currentState.teardown()};


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
	    console.log('primESTeeeeeeee');
	    
	    desIn();
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
/*     var ultimoEstado = {
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
  */
    // ---------------------------------------------- //
    // ----------------TECLAS FUNC------------------- //
    // ---------------------------------------------- //
    

    var primeiraTecla = function (e) {

	   
	if( (e.which >=48 &&  e.which <=57 ) || (e.which >=96 &&  e.which <=105))//0 a 9
	{
	    $('#codEmpr').val($('#codEmpr').val()+numPad(e));
	}
	if( e.which ==8 ||  e.which ==46 ){//Backsape e Del
	}
	if( e.which ==109 ){//29 (Esc) 109 (-)
	    
	    console.log("----33--------"); 
	    $('#svgCodigo').remove();
	    // constroiQuadroEmpregados ();
	    currentState.teardown(); 
	    
	}
	if (e.which == 13)    {//Enter
	    
	    console.log("----password-"); 
	    console.log(daPassword() ); 
 
	    if (daPassword().toString()==$('#codEmpr').val() )  
	    {	
		var svg3 = $($('#camada1')).svg('get');
		svg3.clear();
		constroiQuadroMesas(7, 6,daEmpregado(),daMesas() ,daPermissoes());
	    }

	    $('#svgCodigo').remove();
	    currentState.teardown();
	}
    }

    

    // ---------------------------------------------- //
    // ---------------------------------------------- //

    // ---------------------------------------------- //
    // -----------FIM TECLAS FUNC ------------------- //
    // ---------------------------------------------- //
    // ---------------------------------------------- //
    // ---------------------------------------------- //

    
/*
    var apagaCorrente = function() {
	var svg4 = $($('#svgCodigo')).svg('get');  
	
	//	    var svg4 = $($('#camada1')).svg('get');  
	svg4.clear();
	// constroiQuadroEmpregados ();
	currentState.teardown(); 

    }
*/
    // ---------------------------------------------------- //
    // ---------------------------------------------------- //
    // ----------------desenha  insere codigo-------------- //
    // ---------------------------------------------------- //

    
    var desIn = function (){
	$("body").append(' <div id="svgCodigo"'+
			 ' style="position:absolute;top: 5px;left:24; width: 700; height:480";>'+
			 '</div>');
	$('#svgCodigo').svg();
	var svg =$('#svgCodigo').svg('get');
	//	console.log(svg);
	var g = svg.group({id: 'svgGrupoPedidos',stroke: 'black',strokeWidth: 0});
	svg.rect(g, 260, 80, 200, 100, {
	    id: 'recQP',rx: "10", ry:"10",strokeWidth: 6,	
	    fill: "grey",'stroke-linejoin': 'round', stroke: 'orange'
	})
	
	/////////////////////////////////////////////////////////////////////////////////////////
	//inputs

	$('#svgCodigo').append('<div id="svgPedido"'+ // onselectstart="return false;"  onmousedown="return false;" '+
			       'style="position:absolute;top: 0px;left:0; width: 800; height:600"  >'+
			       '<input type="password"  id="codEmpr" onselectstart="return false;"  onmousedown="return false;" '+
			       ' style="font-size: 1.1em;position:absolute;top: 120px;left:320; width: 80;" size="3">'+
			       ' </div>');

	


    }

    /////////////////////////////////////////////////////////////////////////////////////////
    
    // To start with, put the menu into the default state.
    gotoState( inDefault );
    // console.log('comeca ouvir');
    
} 




    // ---------------------------------------------- //
    // ---------------------------------------------- //
    // ----------------desenha----------------------- //
    // ---------------------------------------------- //


/////////////////////////////////////////////////////////////////////////////////////////






   //----------------------------------------------
   //-------------FUNCOES AUXILIARES  -------------
   //----------------------------------------------

