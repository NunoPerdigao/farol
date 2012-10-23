
document.documentElement.style.overflow = 'hidden';	

var db = $.couch.db(getCurrentDBName());
function getCurrentDBName(){
    return window.location.pathname.split("/")[1];
}


var produtosArray=[];


db.view("myViews/produtoLista", 
	{ 
	    success: function(data){
		for(var i=0;i<data.rows.length;i++){
		    produtosArray.push(	 
			{
			    codigo		: data.rows[i].key,		    
			    nomeProduto		: data.rows[i].value.nomeProduto ,			    
			    preco		: data.rows[i].value.preco,
			    categoriaProduto	: data.rows[i].categoriaProduto,			   
			    impressoraPedido	: data.rows[i].value.impressoraPedido,
			    categoriaProduto    :  data.rows[i].value.categoriaProduto
		
	}
		    )
		}
	    }
	}
       );

function produtoObj(vs){

	for(var i=0;i<produtosArray.length;i++){
	    if( produtosArray[i].codigo==vs) return produtosArray[i];
	   // console.log(produtosArray[i].nomeProduto);
	}
    return '';

}









///////////


$(function(){
    //cria svg (node base para todo o programa)
    $('#svgbasics').svg();
    var svg = $('#svgbasics').svg('get'); 
    var g = svg.group({
	stroke: 'black',
	strokeWidth: 2
    });

    svg.rect( g,0,0, 800, 600, {
	id: 'ecMesasQ',
	fill: "#aad4ff",
	'stroke-linejoin': 'round',
	stroke: 'orange',
	'stroke-width': 2,
	onclick:  "  constroiQuadroEmpregados();"
    });

    var path = svg.createPath(); 
    //defs para nao desenhar
    var defs = svg.defs(); 
    svg.path(defs, path.move(60, 420).curveC([[200,270, 300, 0, 400, 100],
					      [500, 200, 600, 300, 700,200], 
					      [800, 100, 800, 100, 900, 100]]),
	     {id: "MyPath"}); 
    var text = svg.text("", 
			{
			    fontFamily: "Verdana",fontSize: "44.5",
			    fontWeight:"bold", fill: "blue",
			    onclick:  "constroiQuadroEmpregados()"}); 
    var texts = svg.createText(); 
    svg.textpath(text, "#MyPath", 
		 texts.string("restaurante  ").span("o Alves ",
						    {dy: -30, fill: "red"}).span(" retaurante ",  {dy: 30}).span("o Alves ", {dy: -30, fill: "red"}));

});





// experiencia

db.view("myViews/diaSessao",
	{
	    success: function(data){}
	});



coas( function(a){console.log(a) ;},2 );


function coas(funS,mesa ){

    var lm = [];

    db.view("myViews/mesasAbertas",{ "keys":[mesa ] ,
				     success: function(data){
					 data.rows.map(function(row){
					     funS(row);
					     
					     lm[row.key] = { 
						 aberta : row.value.aberta ,
						 nome : row.value.empregado ,
						 tot : row.value.total };
					 });
				     }
				   });

};


function constroiQuadroEmpregados(){
    var svg = $('#svgbasics').svg('get');
    svg.clear();
  

    var  gE = svg.group({
	id: 'svgEmpregados', stroke: 'black',strokeWidth: 2
    });
    


    var g = svg.group({
	stroke: 'black',
	strokeWidth: 2
    });


    var defs = svg.defs(gE); 
    svg.linearGradient(defs, "MyGradient", [
	["0%","#2f4f4f"], ["25%", "#2f4f4f"],
	["62%","#2f4f4f"], ["100%", "#2f4f4f"]], 
		       2, 300, 798, 300, {gradientUnits:"userSpaceOnUse"}); 




    svg.rect(gE, 0 , 0, 800, 600, {
	id: 'ecMesasQ',
	fill: "url(#MyGradient)",
	'stroke-linejoin': 'round',
	stroke: 'orange',
	'stroke-width': 2
    });



    var lm = [];


    db.view("myViews/empregadoLista", {
	success: function(data){
	    var nem=0;
	    data.rows.map(function(row){
		nem++;
		var g2 = svg.group(gE,{
		    stroke: 'black',
		    strokeWidth: 2 });
		var r3 = svg.rect(g2, 40 + 100 , 40 + (80 * nem), 110, 40, {
		    rx: "6",ry :"6",
		    fill: "gray",
		    'stroke-linejoin': 'round',
		    stroke: 'orange',
		    'stroke-width': 2
		});
		svg.text(g2, 55 + 100 , 70 + (80 * nem), 
			 row.key,  {fontFamily: "Verdana",fontSize: "24.5", 
				    fontWeight:"bold", fill: "blue", 
				    strokeWidth:"0"});
		g2.onclick	= function(){
		    var this_c	= row.key;
		    var this_b	=row.value.permissoes;
		    return function(){
			//$('#numEmp').val(this_c);
			constroiQuadroMesas(7, 6,this_c,this_b);     }
		}();


	    });
	}
    });
};
