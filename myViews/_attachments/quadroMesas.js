/*  
    funcao init
    constroiQuadroMesas(nº colunas  , nº  linhas, key empregado ,bool permissoes);
 */
//TODO tira o nc e nl da funcao
function constroiQuadroMesas(nc,nl,k,permissoes){

    var lm = [];

    db.view("myViews/mesasAbertas", {
	success: function(data){
	    var svg = $('#svgbasics').svg('get');
	    svg.clear();
	    data.rows.map(function(row){
		//push
		lm[row.key] = { 
		    aberta	: row.value.aberta ,
		    nome	: row.value.empregado ,
		    tot		: row.value.total , 
		    doc		: row.value
		};
		/*	console.log("aberta : "+row.value.aberta + "nome :"+ 
			row.value.empregado+ "tot " + row.value.total);				
		*/
	    });

	    db.view("myViews/empregadoLista", {
		key:k,
		success: function(data){
		    
		    var mE = data.rows[0].value.mesas
		    desenhaQuadradinhos(7, 8, lm,mE ,k,permissoes);
		}
	    });

	}
    });


    
}









/*   desenhaQuadradinhos(nº colunas  , nº  linhas, array de mesas abertas,mesas do empregado ,key empregado ,bool permissoes);
 */
function desenhaQuadradinhos(nc, nl, lm,mE,k,permissoes){
    var svg = $('#svgbasics').svg('get');
    svg.clear();


    var g = svg.group({
	stroke: 'black',
	strokeWidth: 2
    });

    var defs = svg.defs(g); 
    svg.linearGradient(defs, "MyGradient", 
		       [
			   ["0%","#B4CFEC"], ["25%", "#2f4f4f"],
			   ["62%","#2f4f4f"], ["100%", "#B4CFEC"]
		       ], 
		       2, 0, 798, 300, {gradientUnits:"userSpaceOnUse"}); 


    svg.rect(g, 0, 0, 800, 600, {
	id: 'ecMesasQ',
	fill: "url(#MyGradient)",
	'stroke-linejoin': 'round',
	stroke: 'orange',
	'stroke-width': 2
    });


    //Barra lateral
 
   svg.linearGradient(defs, "BarraGradient", 
		      [
			  ["0%","#9adafF"], ["25%", "#9adafF"],
			  ["82%","#9adafF"], ["100%", "#2f4f4f"]
		      ], 
		      2, 300, 798, 300, {gradientUnits:"userSpaceOnUse"}); 


    svg.rect(g, 728, 4, 70, 595, {
	id               : 'barraLateral',
	fill             : "url(#BarraGradient)",
	'stroke-width'   : 0
    });
    
    
     var lkFr='http://'+location.host+'/'+location.pathname.split('/')[1]+
	'/'+location.pathname.split('/')[2]+'/'+location.pathname.split('/')[3]+
	"/frames.html";

   
    console.log(lkFr);

    var li1 =svg.link(g, lkFr) ;
    var ci2=svg.rect(li1, 728,15,70,54, {
	id			: 'tras2',
	fill			: "blue",
	'stroke-linejoin'	: 'round',
	stroke			: '#006666',
	'fill-opacity'		: 0.7,
	'stroke-opacity'	: 0.4,
	'stroke-width'		: 2
    });



    // rectangulo  cinzento

    var ciz1=svg.rect(g, 730, 70,67,530, {
	id               : 'tras',
	fill             : "#339999",
	'stroke-linejoin': 'round',
	stroke           : '#006666',
	'stroke-width'   : 2,
	opacity: 0.2,
	onclick          : "constroiQuadroEmpregados();"
    });


    var contMesa = 0;	
    for (j = 0; j < nl; j++)
	for (i = 0; i < nc; i++) {
	    contMesa++;
	    var cl1	= "green";
	    var p1	= true;
	    var p2	= false;
	    var totMesa	= 0.0;
	    var mes1	= mE[((i + 1) + (j * nc))-1 ];
	  //  var mes1 = ((i + 1) + (j * nc));
	    if (lm[mes1] == undefined)  {
		cl1 = "#155086";
		p2=true;
	    }
	    
	    else{
		//totMesa=(lm[(i + 1) + (j * nc)]).tot;
		
		p2=(lm[mes1]).nome== k;
		if ( (lm[mes1]).aberta != true)  
		{
		    cl1 = "red";
		    p2=false;
		}
		if ((!permissoes)&& !((lm[mes1]).nome== k) ) 
		{
		    cl1 = "grey";
		    p1=false;
		}
	    }

	    
            if( mes1!=undefined){ 



	    var g2 = svg.group({
		stroke: 'black',
		strokeWidth: 2
	    });
	    var r3 = svg.rect(g2, 40 + 100 * i, 40 + 80 * j, 80, 40, {
		id: 'mesaR' + mes1,rx: "3",ry: "3",
		fill: cl1,
		stroke: '#1569C7',
		'stroke-width': 1
	    });

	    if(p1)
		
		g2.onclick = function(){
		    var this_e=k;
		    var this_d = null ;
		    var this_m = mes1 ;
		    if(lm[this_m] != undefined ){
			this_d = lm[this_m].doc ;
		    }
		    var this_p= p2;
		    var this_p1= permissoes;
		    return function(){
			/*
			  console.log(this_e+"  kkk  "+this_m,this_d+"  iiii   "+this_p1,this_p1  || this_p );
			  console.log("2222222222%%%%");
			  console.log(this_d.linhaConta);
			*/
			ecraMesa(this_e,this_m,this_d,this_p1,this_p1  || this_p );
		    }
		}();





	    var tef = (mE[((i + 1) + (j * nc))-1]).toString();
	    svg.text(g, 40 + 100 * i, 40 + 80 * j, tef, { strokeWidth:"0" ,stroke:"white", fill:"white"});
		
	    }
	    if( lm[mes1] != undefined &&  mes1!=undefined ){


		var ts=0;
		if (lm[mes1] != undefined) 
		    if	 ((lm[mes1]).tot!=null) ts=(lm[mes1]).tot.toFixed(2);
		svg.text(g2, 75 + 100 * i, 70 + 80 * j, ts.toString(), { 
		    strokeWidth:"0" ,stroke:"#000000", 
		    fill:"#000000"});


	    }




	    
	}
		
    
    
    svg.rect(g, 30, 1, 94, 24, {
	"rx"			: 2,"ry":2,
	fill			: "gray",
	'stroke-linejoin'	: 'round',
	stroke			: 'black',
	'stroke-width'		: 1,
	opacity			: 0.5

    });
    svg.text(g,33 ,22,k ,{
	fontFamily: "Verdana",
	fontSize: "24.5",
	fontWeight:"bold", 
	fill: "blue", 
	strokeWidth:"0"}); 
    
    

}
