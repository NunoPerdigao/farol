
// Create a sandbox for our menu widget controller.

function f0 (o, node,mesasEmp,mundo ){
    
    
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
    o.apagaCorrente=function(){apagaCorrente()};
    var daNode  = function() {return node;}
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
	    console.log('primESTeeeeeeee');
	    console.log(daMundo());
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
	   gotoState(ultimoEstado);
	   // $('#codPed').val(numPad(e));
	}
	if( e.which ==8 ||  e.which ==46 ){//Backsape e Del
	}
	if( e.which ==109 ){//29 (Esc) 109 (-)
	    
	    console.log("------------");
	    var svg4 = $($('#camada1')).svg('get');  
	    svg4.clear();
	    constroiQuadroEmpregados ();
	    currentState.teardown(); 
	    
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

    

    var apagaCorrente = function() {

	    var svg4 = $($('#camada1')).svg('get');  
	    svg4.clear();
	    constroiQuadroEmpregados ();
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


/////////////////////////////////////////////////////////////////////////////////////////






   //----------------------------------------------
   //-------------FUNCOES AUXILIARES  -------------
   //----------------------------------------------

