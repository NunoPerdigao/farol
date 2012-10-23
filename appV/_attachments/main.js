var produtosArray;
var db = $.couch.db(getCurrentDBName());


$(document).ready(function(){
    /*
      db.view("appV/mesasAbertas",{ 
      "key":2});
    */
    // console.log("..........:");
    produtosArray=[];
    iniciaArray();
});


function getCurrentDBName(){
    return window.location.pathname.split("/")[1];
}

// -------------------------------------------------------------------------------------------
// passa todos os produtos na base de dados para um array
function iniciaArray(){
    db.view("appV/produtoLista", 
	    { 
		success: function(data){
		    produtosArray=[];
		    for(var i=0;i<data.rows.length;i++){
			produtosArray.push(	 
			    {
				codProduto		: data.rows[i].key,		    
				nomeProduto		: data.rows[i].value.nomeProduto ,	    
				preco			: data.rows[i].value.preco,
				categoriaProduto	: data.rows[i].categoriaProduto,
				impressoraPedido	: data.rows[i].value.impressoraPedido,
				categoriaProduto	: data.rows[i].value.categoriaProduto
			    }
			)
		    }
		    constroiQuadroEmpregados();
		}
	    }
	   );
}


var $changes ;

db.info({
  success: function (data) {
    console.log(data["update_seq"]);
      $changes = db.changes(data["update_seq"],{ "filter" : "appV/produto"});
      $changes.onChange ( function (data) {
	  //  iniciaArray();
	  db.view("appV/produtoLista", 
		  { 
		      success: function(data){
			  produtosArray=[];
			  for(var i=0;i<data.rows.length;i++){
			      produtosArray.push(	 
				  {
				      codProduto		: data.rows[i].key,		    
				      nomeProduto		: data.rows[i].value.nomeProduto ,	    
				      preco			: data.rows[i].value.preco,
				      categoriaProduto	: data.rows[i].categoriaProduto,
				      impressoraPedido	: data.rows[i].value.impressoraPedido,
				      categoriaProduto	: data.rows[i].value.categoriaProduto
				  }
			      )
			  }
			  // 	    constroiQuadroEmpregados();
		      }
		  }
		 );
	  
	  alert("produtos actualizados ");
	  console.log("changes ..........");
	  console.log(data);
      })
  }
})



// desativa teclas backspace e alt+seta direita shortcut

$(document).keydown(function(e) {
    var evtobj = window.event ? event : e;
    var unicode = evtobj.charCode ? e.charCode : evtobj.keyCode;

    var nodeName = e.target.nodeName.toLowerCase();

    if (e.which === 8) {
        if ((nodeName === 'input' && e.target.type === 'text') ||
            nodeName === 'textarea') {
            // do nothing
        } else {
            e.preventDefault();
        }
    }


    if ((unicode == 37) && (evtobj.altKey == true))
    {
            e.preventDefault();
    }

});




// funcao de pesquisa de um produto no array
function produtoObj(vs){
    for(var i=0;i<produtosArray.length;i++){
	if( produtosArray[i].codProduto==vs) return produtosArray[i];
    }
    return '';

}


//------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------

function constroiQuadroEmpregados(){
    $('#camada1').svg()
    var svg = $($('#camada1')).svg('get');
    console.log("svg");
   	// svg.clear();

	var d = new Date();
	var curr_date = d.getDate();


	db.view("appV/diaSessao",{
	    success: function(data){
		 		    if(curr_date==  data.rows[0].value.dia)
				    	console.log("yyygtre")
				    else
				    	if(!(0>d.getHours()<2)){
				    		svg.text(520 ,225,'data sessao '+ data.rows[0].value.dia
				    			, 
				    			{   
				    				id            : 'svg_t1',
				    				"text-anchor" :"middle",
				    				fontFamily    : "serif",
				    				strokeWidth   : "4" ,
				    				strokeLinecap : "null" ,
				    				fontSize      : "50", 
				    				fill          : "red"
				    			});   

				    		svg.text(520 ,275,' nao coincide com', 
				    		{  
				    			id            : 'svg_t1',
				    			"text-anchor" :"middle",
				    			fontFamily    : "serif",
				    			strokeWidth   : "4" ,
				    			strokeLinecap : "null" ,
				    			fontSize      : "50", 
				    			fill          : "red"
				    		});   

				    		svg.text(520 ,325,' data actual '+curr_date+' ', 
				    		{  
				    			id            : 'svg_t1',
				    			"text-anchor" :"middle",
				    			fontFamily    : "serif",
				    			strokeWidth   : "4" ,
				    			strokeLinecap : "null" ,
				    			fontSize      : "50", 
				    			fill          : "red"
				    		});   

				    	}	
				    },
				    error :  function(data){
				    	console.log(" erro fp249 diaSessao");
				    	console.log(document);
						// fazPe(num, empregado,document,ms,permissoes,anulacao );
					}
				});
	
  	

    var  gE = svg.group({
	id: 'svgEmpregados', stroke: 'black',strokeWidth: 2
    });
    


    var g = svg.group({
	stroke: 'black',
	strokeWidth: 2
    });



    db.view("appV/empregadoLista", {
	success: function(data){
	    var nem=0;
	    data.rows.map(function(row){
		//  console.log(row);
		nem++;
		var g2 = svg.group(gE,{
		    stroke: 'black',
		    strokeWidth: 2 });
		var r3 = svg.rect(g2, 40 + 100 , 40 + (80 * nem), 150, 45, {
		    rx: "6",ry :"6",
		    fill: "gray",
		    'stroke-linejoin': 'round',
		    stroke: 'orange',
		    'stroke-width': 2
		});
		svg.text(g2, 40 + 100 + 75 , 70 + (80 * nem), row.key,
			 {
			     fontFamily: "Verdana",
			     fontSize: "24.5", 
			     fontWeight:"bold", 
			     fill: "blue", 
			     'text-anchor': "middle", 
			     strokeWidth:"0"
			 });
		g2.onclick	= function(){
		    var this_empregado	= row.key;
		    var this_permissoes	= row.value.permissoes;
		    var this_mesas	= row.value.mesas;
		    var this_password	= row.value.password;
		  
		    return function(){
			//$('#numEmp').val(this_c);		  
			var svg3 = $($('#camada1')).svg('get');
			if(this_password!=undefined){
			    var o={};
			    stCod(o,this_empregado,this_mesas ,this_permissoes,this_password )
			    console.log("######"+this_password);
			}
			else{
			    svg3.clear();
			    constroiQuadroMesas(7, 6,this_empregado,this_mesas ,this_permissoes);
			}
 }
		}();
	    });
	}
    });
};







//------------------------------------------------------------------------------------

function constroiQuadroMesas( colunas,linhas,empregado,mesas,permissoes){  




/*
    console.log(getCurrentDBName());
    console.log("c-.-------  ");
    console.log($.couch.db("faisca").info() );

 console.log("-----------colunas  "+ colunas+" linhas  "+linhas+"  empregado "+empregado+"  mesas  "+mesas+" permissoes  "+permissoes)
*/
    //var lm =[]
    var lm ={};
    db.view("appV/mesasAbertas", {
	success: function(data){
	  // console.log("aberta : ");
	  //  console.log(mesas);
	    data.rows.map(function(row){
		//push

		lm[row.key] = { 
		    aberta	: row.value.aberta ,
		    nome	: row.value.empregado ,
		    tot		: row.value.total , 
		    doc		: row.value
		};
		
				
	    });	
// if
   if(permissoes)
 		desenhaQuadradinhos(8, 10, lm,mesas ,empregado,permissoes);
	   
   else
	    desenhaQuadradinhos(7, 8, lm,mesas ,empregado,permissoes);
	    /*console.log("%%%%%%% aberta : %%%%%%%%%%%%%");
	      console.log(lm);
	      console.log(mesas);
	    */    
	}
    });
}






function desenhaLinkConfiguracao(svg,perm){

    
    if(perm){
	var g = svg.group({
	    stroke: 'black',
	    strokeWidth: 2
	});

	var lkFr='http://'+location.host+'/'+location.pathname.split('/')[1]+
	    '/'+location.pathname.split('/')[2]+'/'+location.pathname.split('/')[3]+
	    "/frames.html";

	

	var li1 =svg.link(g, lkFr) ;
	
	var ci2=svg.rect(li1,  735, 0, 65, 60, {
	    "rx"			: 2,"ry":2,
	    fill			: "blue",
	    'stroke-linejoin'	: 'round',
	    stroke			:   "#C9CACE",
	    'stroke-width'		: 1
	});



    }
}

/*   desenhaQuadradinhos(nº colunas  , nº  linhas, array de mesas abertas,mesas do empregado ,key empregado ,bool permissoes);
 */

function desenhaQuadradinhos(nc, nl, lm,mE,k,permissoes){
    
    var svg = $($('#camada1')).svg('get');  
    var g = svg.group({
	stroke: 'black',
	strokeWidth: 2
    });
    //  console.log("lm "+ lm+" me "+mE+"  k " +k+"  perm "+permissoes)
    /*
      var lkFr='http://'+location.host+'/'+location.pathname.split('/')[1]+
      '/'+location.pathname.split('/')[2]+'/'+location.pathname.split('/')[3]+
      "/frames.html";   
      console.log(lkFr);
    */
    var svg = $($('#camada1')).svg('get');  
    var mu={'empregado':k , 'mesa':mE};
    var o={};
    var tg= f0(o,svg,mE,mu);
    
    var  sepAlt=80;	
 	var  sepLarg=100;	
    
      if (nl==10) sepAlt=57;
  	  if (nc==8) sepLarg=86;	
    



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
		var r3 = svg.rect(g2, 40 + sepLarg * i, 
							  40 + sepAlt * j,
							  80,
							  40, 
							  {
		    id: 'mesaR' + mes1,rx: "3",ry: "3",
		    fill: cl1,
		    stroke: '#1569C7',
		    'stroke-width': 1
		});

		if(p1)
		    g2.onclick = function(){
			//       nc, nl, lm -mesas abertas ,mE mesas do empregado ,k -empregado ,permissoes
			var this_e=k;
			var this_d = null ;
			var this_m = mes1 ;//mesa que foi clickada
			var this_ms= mE;
			var this_lm= lm;
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
			    var svg4 = $($('#camada1')).svg('get');  
			    svg4.clear();
			    o.teardown();
			    ecranMesa(nc,nl,this_e,this_d,this_m,this_ms,this_p1,this_p1  || this_p );
			}
		    }();
		var tef = (mE[((i + 1) + (j * nc))-1]).toString();
		svg.text(g, 40 + sepLarg * i, 
			        40 + sepAlt * j, tef, { strokeWidth:"0" ,stroke:"white", fill:"white"});
		
	    }
	    if( lm[mes1] != undefined &&  mes1!=undefined ){
		var ts=0;
		if (lm[mes1] != undefined) 
		    if	 ((lm[mes1]).tot!=null) ts=(lm[mes1]).tot.toFixed(2);
		svg.text(g2, 115 + sepLarg * i, 
			          70 + sepAlt  * j, ts.toString(), {
		    textAnchor	: "end",
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



    var r3=svg.rect(g,  735, 0, 65, 601, {
	"rx"			: 2,"ry":2,
	fill			: "#C9CACE",
	'stroke-linejoin'	: 'round',
	stroke			:   "#C9CACE",
	'stroke-width'		: 1
    });


    r3.onclick = function(){
	var that=this;
	return function(){
	    // alert("##")
	       o.apagaCorrente();
	        o.teardown();
	}
	
    }();

    desenhaLinkConfiguracao(svg,permissoes);


  
    
    svg.text(g,33 ,22,k ,{
	fontFamily: "Verdana",
	fontSize: "24.5",
	fontWeight:"bold", 
	fill: "blue", 
	strokeWidth:"0"});  
}
