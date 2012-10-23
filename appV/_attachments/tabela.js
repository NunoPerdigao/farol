
 $(document).ready(function(){
     //var t1 = new tabela("ola")
    // alert(t1.danome());
 });



function tabela(nomeTabela){

    this.nomeTabela= nomeTabela;
   

    this.danome=function (){
	return this.nomeTabela;
    }


    this.danode=function (){
	return this.node;
    }

    this.altura=0;

    this.n1={};
    this.n2={};

    this.da1=function (){
	return this.n1;
    }
    this.da2=function (){
	return this.n2;
    }
    this.remove= function(){
	$(this.da1()).remove();
	$(this.da2()).remove();
	return ;
    }

    this.removeLinhaSelecionada= function(){
	var that = this;
	var node= $(" tbody  .selected",that.danode() );
	
	if(node.next().length>0){
	    
	    node.next().addClass('selected');
	}
	else 
	    	node.prev().addClass('selected');

	node.remove();

    }


    this.daLinhaSelecionada= function(){
	
	var that = this;
	var node= $(" tbody  .selected",that.danode() );

	return node;   
	
    }

    


    this.daLinhaSelecionadaProd = function (){
	var that = this;
	var node= $(" tbody  .selected",that.danode() );


	var cp	=($("td.codProduto",$(node)).text());
	var qp	=($("td.quantidadeLinha" ,$(node)).text()); // 
	var np	=($("td.nomeProduto" ,$(node)).text());
	var ppr	=($("td.preco" ,$(node)).text());
	var pup= (parseFloat(ppr));
	var imp	=($("td.impressoraPedido" ,$(node)).text());
	var ctp	=($("td.categoriaProduto" ,$(node)).text());
	var pl	=($("td.precoLinha" ,$(node)).text());
	var hp	=($("td.hora" ,$(node)).text());
	
	// console.log($(value));
	
	return 	  ({
	    codProduto		:cp,
	    nomeProduto		:np,
	    preco			: pup ,
	    impressoraPedido	:imp,
	    categoriaProduto	:ctp,
	});
	
    }














// ||**********


    this.criaTabela=function (node,x,y,largura,altura){
	this.altura=altura;

	var div2 = document.createElement( 'div');	
	div2.style.position="absolute";
	div2.style.top     =x+"px" ; 
	div2.style.left    =y+"px" ; 
	div2.style.height  =altura; 
	div2.style.width   =largura ;
	
	var ht=	($(div2)).svg();
	var h= ht.svg('get');
	h.configure({width:largura, height:altura,'x':x, 'y':y}, true);

	//Borda a volta da tabela
	var d=h.rect( -2, -2, largura+4,altura+4, {
	    id: 'recQP',rx: "10", ry:"10",strokeWidth: 6,
	    fill: "none",'stroke-linejoin': 'round', stroke: 'orange'
	})
	h.rect(0, 0, largura, altura, 2,2, {fill:"white"});
	node.append(div2);
	this.n2=div2;

	var div = document.createElement( 'div');
	div.style.position	= "absolute";
	div.style.overflow	= "hidden";
	div.style.top		= x + "px" ; 
	div.style.left		= y + "px" ; 
	div.style.height	= altura + "px" ; 
	div.style.width		= largura+ "px" ;

	var table = document.createElement('table');
	table.setAttribute('id',  this.nomeTabela);   
	table.style.position	= "absolute"; 
	table.style.top		= " 0px";
	table.cellspacing	= "0";
	table.cellpadding	= "3"; 

	var tbody = document.createElement('tbody');
	table.appendChild(tbody);
	div2.appendChild(table);
	//node.append(div);
	
	this.node =$(" #"+this.nomeTabela, node);


	div2 = document.createElement( 'div');	
	div2.style.position="absolute";
	div2.style.top     =x+"px" ; 
	div2.style.left    =y+"px" ; 
	div2.style.height  =altura; 
	div2.style.width   =largura ;
	
	var ht2 =	($(div2)).svg();
	var h2  = ht2.svg('get');
	h2.configure({width:largura, height:altura,'x':x, 'y':y}, true);

	// botoes transparentes
	d=h2.rect( 0, 0, largura,(altura/2), {id: 'recQP',  
					        opacity :0,
					       fill: "red"})

	var r1=h2.rect( 0, 0+(altura/2), largura,(altura/2), {id: 'recQP',
							      opacity :0,
							      fill: "blue"})

	node.append(div2);
	this.n1=div2;


	var that = this;

	d.onmousedown= function(evt){
	   that.butao_cima(that.danode());
	}

	r1.onmousedown= function(e){
	    that.butao_baixo(that.danode());
	}
	
	//	return this.node;

    }

    
    this.butao_cima=function (n) {

	var node= $(" tbody  .selected",n);

	if(node.prev().length>0){
	    node.removeClass('selected');
	    node.prev().addClass('selected');
	    //primVis ($("#tabelaMesaDireita tr").first()).prev().show();


	    if ( node.prev().is(":visible") == false) 

	    {
		// node.prev().show();

		$(node.prev()).css('display', 'table-row')

		(node.nextUntil(":hidden"));
		(node.nextUntil(":hidden")).last().hide();
	    }
	}

	/* if($("#tabelaMesaDireita .selected").length==0)  $("#tabelaMesaDireita tr:last").addClass('selected');
	 */
    }
    


   
    this.butao_baixo=function (n) {

	var node= $(" tbody  .selected",n);

	if(node.next().length>0){
	    node.removeClass('selected');
	    node.next().addClass('selected');

	    if ( node.next().is(":visible") == false) 

	    {
		var w=0
		if ($(($(this.danode()).children()).children()[0]).is(":visible") == false) w=1

		var sw=$(($(this.danode()).children()).children()[0]).nextUntil(":visible").length+w
		$($(" tbody ",this.danode()).children()[sw]).hide();
		//node.next().show();
		$(node.next()).css('display', 'table-row')
//		node.next().css('display', 'table-row')
	
	    }
	   // if(n.children().height()>this.altura) console.log('altura');
	    //primVis ($("#tabelaMesaDireita tr").first()).prev().show();
	}

	/* if($("#tabelaMesaDireita .selected").length==0)  $("#tabelaMesaDireita tr:last").addClass('selected');
	 */
    }
    

    this.retornaLinhas = function (){
	var rPQ=[]
	$.each( $(" tbody tr  ",this.danode()),function(key,value)
		{
		    var cp	=($("td.codProduto",$(value)).text());
		    var qp	=($("td.quantidadeLinha" ,$(value)).text()); // 
		    var np	=($("td.nomeProduto" ,$(value)).text());
		    var pup	=($("td.preco" ,$(value)).text());
		    var imp	=($("td.impressoraPedido" ,$(value)).text());
		    var ctp	=($("td.categoriaProduto" ,$(value)).text());
		    var pl	=($("td.precoLinha" ,$(value)).text());
		    var hp	=($("td.hora" ,$(value)).text());
		    var ap	=($("td.anulacao" ,$(value)).text());
		   // console.log($(value));

		    rPQ.push({
			codProduto		:cp,
			quantidadeLinha		:qp,
			nomeProduto		:np,
			preco			:pup,
			precoLinha		:pl,
			impressoraPedido	:imp,
			categoriaProduto	:ctp,
			hora			:hp,
			anulacao		:ap 
		    });
		})
	    return (rPQ) ;
    }

		  

    // insere simples com os campos descriminados
    this.insereLinha=function (codigo,qnt,nomeProduto,preco,precoLinha,
			       impressoraPedido,categoriaProduto,anulacao ,hora){

	$(" tbody tr",this.danode()).removeClass("selected");
	var nIns=$('<tr class="selected" style="display: table-row "  ><td class="codProduto" nowrap="true">'
					 + codigo.trim()
					 +'</td><td  class="quantidadeLinha"'+
					 ' style="align : right;width: 26px; max-width:30px;overflow:hidden;"  nowrap="true" align="right"   >'
					 + qnt
					 +'</td><td  class="nome"  '+        
					 'style="text-align :left;max-width:98px;overflow:hidden;min-width:98px "'+
					 ' noWrap="true">'
					 + nomeProduto.trim()
					 +'</td><td  class="hora" style="align : right; min-width:21px"   noWrap="true" >'
					 + hora
					 +'</td><td  class="precoLinha"    style="text-align : right"  noWrap="true" >'
					 + precoLinha.toFixed(2)
					 +'</td><td  class="preco" style="align : right"   noWrap="true" >'
					 + preco.toFixed(2)
					 +'</td><td  class="impressoraPedido" noWrap="true" >'
					 + impressoraPedido
					 +'</td><td  class="anulacao" noWrap="true" >'
					 + anulacao
					 +'</td><td  class="categoriaProduto" noWrap="true" >'
					 + categoriaProduto
	  +'</td></tr>');

	$(" tbody",this.danode()).append(nIns);
	$(" .anulacao",this.danode()) .hide();
	$(" .categoriaProduto",this.danode()) .hide();
	$(" .codProduto",this.danode()).hide();
	$(" .impressoraPedido",this.danode()).hide();

    }


    // so retira as anul
    this.insereLinhaNaoProcessado=function (prod,qntd,anulacao,hr){
	var qntxprc= (prod.preco*qntd);
	var sele="";
	// $(" tbody tr",this.danode()).removeClass("selected");
	//a tabela esta vazia
	//se nao existe nenhuma linha na tabela
	if($(" tbody tr",this.danode()).length==0) {sele='class="selected"'}

	if(anulacao) {
	    
	    // var node= $(".selected",this.danode() );
	   //   console.log(prod.nomeProduto+" anula   "+qntd);
	    
	    this.removeProdutoQuantidade(prod.codProduto.trim(),qntd);


	}
	else{

//	     console.log(prod.nomeProduto+" insere   "+qntd);
	    
	    var insL=$('<tr '+sele+ ' style="display: table-row " ><td class="codProduto" nowrap="true">'
		       +  prod.codProduto.trim()
		       +'</td><td  class="quantidadeLinha"'+
		       ' style="align : right;width: 26px; max-width:30px;overflow:hidden;"  nowrap="true" align="right"   >'
		       + qntd/100
		       +'</td><td  class="nome"  '+        
		       'style="text-align :left;max-width:98px;overflow:hidden;min-width:98px "'+
		       ' noWrap="true">'
		       + prod.nomeProduto.trim()
		       +'</td><td  class="hora" style="align : right; min-width:21px"   noWrap="true" >'
		       + hr
		       +'</td><td  class="precoLinha"    style="text-align : right"  noWrap="true" >'
		       + (qntxprc/100).toFixed(2)
		       +'</td><td  class="preco" style="align : right"   noWrap="true" >'
		       + prod.preco.toFixed(2)
		       +'</td><td  class="impressoraPedido" noWrap="true" >'
		       + prod.impressoraPedido
		       +'</td><td  class="anulacao" noWrap="true" >'
		       + anulacao
		       
		       +'</td><td  class="categoriaProduto" noWrap="true" >'
		       + prod.categoriaProduto
		       +'</td></tr>');





	    var ds=$(this.danode()).height()
	
	    if(ds>this.altura) {
		insL.hide();
		$(" tbody",this.danode()).append(insL);
	    }
	    else{
		$(" tbody",this.danode()).append(insL);
	    }


	    $(" .categoriaProduto",this.danode()).hide();

	     $(" .anulacao",this.danode()) .hide();
	    $(" .codProduto",this.danode()).hide();
	    $(" .impressoraPedido",this.danode()).hide();
	    $(" .preco",this.danode()) .hide();
	}
    }

    // a quantidade argumento é centesimal
    // elemina a linha selecionada se a quantidade for = 0
    this.removeQuantidadeLinhaSelecionada = function (qntd){

	var codExiste	= false;
	var qtAnt	= centesimal(($(".quantidadeLinha",this.daLinhaSelecionada() ).text())) ;
	var qtAct	= qtAnt-qntd;
	var ppr		= (parseFloat($(".preco",this.daLinhaSelecionada() ).text())).toFixed(2);


	if(qtAct>=0){
	    $(".precoLinha",this.daLinhaSelecionada()).text((ppr*qtAct/100).toFixed(2) );  	    
	    $(".quantidadeLinha",this.daLinhaSelecionada()).text((qtAct/100 ).toFixed(2) );  
	    //$ ( $(this) .get(0)).addClass("selected");		    
	}

	if(qtAct==0){
	    this.removeLinhaSelecionada();	    
	    //$ ( $(this) .get(0)).addClass("selected");		    
	}
			
			


    }



    this.removeProdutoQuantidade = function (codProd,qntd){

	var  codExiste=false;
	var  faltaN=qntd;
	var  removeuVisivel=false;
	$.each( $(" tbody tr",this.danode()),
		function(key,value)
		{
		    // console.log("comeca  "+faltaN+"     ------------------------------------");

		    if ($(".codProduto",this).text().trim()==codProd.trim() && centesimal($(".quantidadeLinha",this).text())>0 && faltaN>0 ) {
			
			// 	var prAnt=centesimal($(".precoLinha",this).text());
			// console.log("node22223332");
			var qtAnt=centesimal($(".quantidadeLinha",this).text());
			var qtAct=qtAnt-faltaN ;
			/*
			console.log("KEY "+key);
			console.log(value);
			
			console.log($(this));
			console.log("qtAnt");
			console.log( qtAnt);
			console.log(faltaN );
			console.log("qtAct");
			
			console.log(qtAct );
			*/
			var ppr=parseFloat($(".preco",this).text());
			
			if(qtAct>0.00001){
		//	    console.log("qtAnt----------------");
			
			    faltaN=0;
			     $(".precoLinha",this).text((ppr*qtAct/100).toFixed(2) );  
			    
			    $(".quantidadeLinha",this).text((qtAct/100 ).toFixed(2) );  
			    //$ ( $(this) .get(0)).addClass("selected");		    
			}
			
			if(qtAct<=0)
			{

			    $(".precoLinha",this).text((ppr*qtAct/100).toFixed(2) );  			    
			    $(".quantidadeLinha",this).text((qtAct/100 ).toFixed(2) );  
		
			    if(faltaN<=0)
				faltaN=(-1)*faltaN;
			    else
				faltaN=(-1)*qtAct;

			    qtAct=0;


			    //var node= $(".selected",this.danode() );
			    
			    if($(this).attr("class")=="selected" ) 
			    {
				//console.log(($(this)).next())
				//console.log(($(this)).next())
				if(($(this)).next().length>0){
				    
				    ($(this)).next().addClass('selected');
				}
				else 
	    			    ($(this)).prev().addClass('selected');
				
			    }
			     $(this).remove();
			    
			    if( ($(this).is(":visible")) )
				removeuVisivel=true;
			    
			}
			
			
			
		    }
		}
	      );

	// se foi removida uma linha visivel da tabela entao procura a primeira
	// linha invisivel(se existir) e torna-a visivel
	if(removeuVisivel )
	{	    
	    $.each( $(" tbody tr",this.danode()),
		    function(key,value)
		    {	
			if( !($(this).is(":visible")) ){
			    //truque para so remover o primeiro
			     $(this).show();
			    //$(this()).css('display', 'table-row')

			    // break each cycle
			    return false;
			}	
		    }
		  );
	}		
    }
    
   
    
    // Insere uma linha de determinado produto 
    //Faz varias verificacoes se ja exite se e complemento...
    //   qntd ja vem multiplicada por 100
    // ---------------------------------------------- //
    // ---------------------------------------------- //


    this.insereProdutoQuantidadePedido = function (prod,qntd,hr){ 
	var insereAqui={};
	var qntxprc= (prod.preco*qntd);
	var th1="";
	if (hr!=undefined){
	    th1='</td><td  class="hora"   '+'style=" text-align:left;max-width:22px;overflow:hidden; min-width:21px"'+
					     ' noWrap="true">'
	    + hr;
	}


	console.log('<tr class="selected" style="display: table-row " ><td class="codProduto" nowrap="true">'
					     + prod.codProduto.trim()
					     +'</td><td  class="quantidadeLinha"  '+
					     ' style="align : right;width: 26px; max-width:30px;overflow:hidden;"  nowrap="true" align="right"   >'
					     + qntd/100
					     +'</td><td  class="nomeProduto"   '+
					     'style=" text-align:left;max-width:98px;overflow:hidden; min-width:98px"'+
					     ' noWrap="true">'
					     + prod.nomeProduto.trim()
					     +th1
					     +'</td><td  class="preco"  style="align :right"  noWrap="true" >'
					     + prod.preco.toFixed(2)
					     +'</td><td  class="precoLinha" style=" text-align:right" noWrap="true" >'
					     + (qntxprc/100).toFixed(2)
					     +'</td><td  class="impressoraPedido" noWrap="true" >'
					     + prod.impressoraPedido
					     +'</td><td  class="categoriaProduto" noWrap="true" >'
					     + prod.categoriaProduto
		    +'</td></tr>');;

	//a tabela esta vazia
	//se nao existe nenhuma linha na tabela
	if($(" tbody tr",this.danode()).length==0)
	{   $(" tbody",this.danode()).append('<tr class="selected" style="display: table-row " ><td class="codProduto" nowrap="true">'
					     + prod.codProduto.trim()
					     +'</td><td  class="quantidadeLinha"  '+
					     ' style="align : right;width: 26px; max-width:30px;overflow:hidden;"  nowrap="true" align="right"   >'
					     + qntd/100
					     +'</td><td  class="nomeProduto"   '+
					     'style=" text-align:left;max-width:98px;overflow:hidden; min-width:98px"'+
					     ' noWrap="true">'
					     + prod.nomeProduto.trim()
					     +th1
					     +'</td><td  class="preco"  style="align :right"  noWrap="true" >'
					     + prod.preco.toFixed(2)
					     +'</td><td  class="precoLinha" style=" text-align:right" noWrap="true" >'
					     + (qntxprc/100).toFixed(2)
					     +'</td><td  class="impressoraPedido" noWrap="true" >'
					     + prod.impressoraPedido
					     +'</td><td  class="categoriaProduto" noWrap="true" >'
					     + prod.categoriaProduto
					     +'</td></tr>');

	}
	//a tabela tem pelo menos uma linha
	else{ //insere a seguir Ã  linha selecionada
	    
	    insereAqui= $(" .selected",this.danode()) ;
	    var codExiste=false;
 
	    $(" tbody tr",this.danode()).removeClass("selected");
	    var precoL=(prod.preco * qntd) ;

	    //ve se ja existe o produto na tabela e se existir altera a quantidade e preco
	    //se for complemento nao verifica se existe esse complemento
	    if((prod.categoriaProduto).trim()!="Complementos"){

	    $.each( $(" tbody tr",this.danode()),function(key,value)
		    {	
			if ($(".codProduto",this).text().trim()==prod.codProduto.trim() 
			   ) {
			    console.log('existe  lllldddl');

			    console.log(' '+($(".precoLinha",this).text().trim()));


			    console.log	(prod); 


			    codExiste=true;
			    var prAnt=parseFloat($(".precoLinha",this).text())*100;
			    var prAct=prAnt+precoL;
			   
			    var qtAnt=parseFloat($(".quantidadeLinha",this).text())*100;
			    var qtAct=qtAnt+qntd;
			    
			    $(".precoLinha",this).text((prod.preco*qtAct/100).toFixed(2) );  
			   
			    $(".quantidadeLinha",this).text((qtAct/100 ).toFixed(2) );  
			    $ ( $(this) .get(0)).addClass("selected");		    
			}
		    }
		  );
	    }
	    console.log(insereAqui.nextUntil('tr:not(:contains("Complementos"))').last());
	    
	    if(!codExiste){
		var ultimoCoplemento=(insereAqui.nextUntil('tr:not(:contains("Complementos"))').last());

	//	console.log(insereAqui.nextAll());
		var insereD=insereAqui;

	/*	console.log('ultimoCoplemento');
		console.log(ultimoCoplemento);
		console.log('insereAqui');
		console.log(insereAqui);*/
		if (ultimoCoplemento.length>0) {
		    insereD=ultimoCoplemento ;
		}
		insereD.after('<tr class="selected" style="display: table-row " ><td class="codProduto" nowrap="true">'
			      + prod.codProduto.trim()
			      +'</td><td  class="quantidadeLinha"'+
			      'style=" align : right;width: 26px; max-width:30px;overflow:hidden;"  nowrap="true" align="right"   >'
			      + qntd/100
			      +'</td><td  class="nomeProduto"  '+
			      'style="text-align :left;max-width:98px;overflow:hidden; min-width:98px "'+
			      '  noWrap="true">'
			      + prod.nomeProduto.trim()
			      + th1
			      +'</td><td  class="preco"   style="align : right"  noWrap="true" >'
			      + prod.preco.toFixed(2)
			      +'</td><td  class="precoLinha"      style="text-align : right"  noWrap="true" >'
			      + (qntxprc/100).toFixed(2)
			      +'</td><td  class="impressoraPedido" noWrap="true" >'
			      + prod.impressoraPedido
			      +'</td><td  class="categoriaProduto" noWrap="true" >'
			      + prod.categoriaProduto
			      +'</td></tr>');

	    }
	}



	    $(" .anulacao",this.danode()) .hide();
	    $(" .categoriaProduto",this.danode()) .hide();
	    $(" .codProduto",this.danode()).hide();
	    $(" .impressoraPedido",this.danode()).hide();
	    $(" .preco",this.danode()).hide();




	var gg=$($(" tbody ",this.danode()).children()[0])
	var ds=$(this.danode()).height()


	if(ds<=this.altura) {
	    //console.log( 'pode inserir' );
			    }
	else {
	    //var hiddenEls = $(this.danode()).find("tr:hidden")
	    //var ni=($(this.danode())).find('tr:hidden').length
	    
	    var w=0

	    if ($(($(this.danode()).children()).children()[0]).is(":visible") == false) w=1

	    var sw=$(($(this.danode()).children()).children()[0]).nextUntil(":visible").length+w
	    $($(" tbody ",this.danode()).children()[sw]).hide();
	   
	    //console.log(  sw   );
	    // console.log($(this.danode()) );

	    
	}



    }
 









//________________________________________-

// falta anulacao
    this.insereProdutoQuantidade = function (prod,qntd,anulacao,hr){
	// console.log('insere '+prod+' qunt '+qntd);

	// if( prod.categoriaProduto.trim() =="Complementos") return;

	if(anulacao) {
	    this.removeProdutoQuantidade(prod.codProduto.trim(),qntd);
	}
	else{

	    // 	console.log(prod);
	    var insereAqui={};
	    var qntxprc= (prod.preco*qntd);
	    var th1="";
	    if (hr!=undefined){
		th1='</td><td  class="hora"   '+
		    'style=" text-align:left;max-width:22px;overflow:hidden; min-width:21px"'+
		    ' noWrap="true">'+ hr;}

	    //a tabela esta vazia
	    //se nao existe nenhuma linha na tabela
	    if($(" tbody tr",this.danode()).length==0)
	    {   $(" tbody",this.danode()).append('<tr class="selected" style="display: table-row " ><td class="codProduto" nowrap="true">'
						 + prod.codProduto.trim()
						 +'</td><td  class="quantidadeLinha" '
						 +'style="align :right;width: 26px; max-width:30px;overflow:hidden;" nowrap="true" align="right">'
						 + qntd/100
						 +'</td><td  class="nomeProduto"   '+
						 'style=" text-align:left;max-width:98px;overflow:hidden;'
						 +' min-width:98px" noWrap="true">'
						 + prod.nomeProduto.trim()
						 +th1
						 +'</td><td  class="preco" style="align :right" noWrap="true" >'
						 + prod.preco.toFixed(2)+'</td><td class="precoLinha"  '
						 +' style="text-align:right" noWrap="true">'
						 + (qntxprc/100).toFixed(2)
						 +'</td><td  class="impressoraPedido" noWrap="true" >'
						 + prod.impressoraPedido

						 +'</td><td  class="anulacao" noWrap="true" >'
						 + anulacao	
						 +'</td><td  class="categoriaProduto" noWrap="true" >'
						 + prod.categoriaProduto
						 +'</td></tr>');

	    }
	    //a tabela tem pelo menos uma linha
	    else{ //insere a seguir à linha selecionada
		
		insereAqui= $(" .selected",this.danode()) ;
		var codExiste=false;
		
		$(" tbody tr",this.danode()).removeClass("selected");
		var precoL=(prod.preco * qntd) ;

		//ve se ja existe o produto na tabela e se existir altera a quantidade e preco
		//se for complemento nao verifica se existe esse complemento
		if((prod.categoriaProduto).trim()!="Complementos"){

		    $.each( $(" tbody tr",this.danode()),function(key,value)
			    {	
				if ($(".codProduto",this).text().trim()==prod.codProduto.trim() ) {
				    codExiste=true;
				    var prAnt=centesimal($(".precoLinha",this).text());
				    var prAct=prAnt+precoL;
				    
				    var qtAnt=centesimal($(".quantidadeLinha",this).text());
				    var qtAct=qtAnt+qntd;
				    $(".precoLinha",this).text((prod.preco*qtAct/100).toFixed(2) );  
				    
				    $(".quantidadeLinha",this).text((qtAct/100 ).toFixed(2) );  
				    $ ( $(this) .get(0)).addClass("selected");		    
				}
			    }
			  );
		}
		
		if(!codExiste){
		    //	console.log(insereAqui.nextUntil('tr:not(:contains("Complementos"))').last());
		    var ultimoCoplemento=(insereAqui.nextUntil('tr:not(:contains("Complementos"))').last());

		    //	console.log(insereAqui.nextAll());
		    var insereD=insereAqui;

		    /*	console.log('ultimoCoplemento');
			console.log(ultimoCoplemento);
			console.log('insereAqui');
			console.log(insereAqui);*/
		    if (ultimoCoplemento.length>0) {insereD=ultimoCoplemento ;
						   }
		     $(" tbody",this.danode()).append('<tr class="selected" style="display: table-row" ><td class="codProduto" nowrap="true">'
				  + prod.codProduto.trim()
				  +'</td><td  class="quantidadeLinha"'+
				  'style=" align : right;width: 26px; max-width:30px;overflow:hidden;"  nowrap="true" align="right"   >'
				  + qntd/100
				  +'</td><td  class="nomeProduto"  '+
				  'style="text-align :left;max-width:98px;overflow:hidden; min-width:98px "'+
				  '  noWrap="true">'
				  + prod.nomeProduto.trim()
				  + th1
				  +'</td><td  class="preco"   style="align : right"  noWrap="true" >'
				  + prod.preco.toFixed(2)
				  +'</td><td  class="precoLinha"      style="text-align : right"  noWrap="true" >'
				  + (qntxprc/100).toFixed(2)
				  +'</td><td  class="impressoraPedido" noWrap="true" >'
				  + prod.impressoraPedido

				  +'</td><td  class="anulacao" noWrap="true" >'
				  + anulacao
				  +'</td><td  class="categoriaProduto" noWrap="true" >'
				  + prod.categoriaProduto
				  +'</td></tr>');

		}
	    }
	    

	    $(" .anulacao",this.danode()) .hide();
	    $(" .categoriaProduto",this.danode()) .hide();
	    $(" .codProduto",this.danode()).hide();
	    $(" .impressoraPedido",this.danode()).hide();
	    $(" .preco",this.danode()).hide();



	    var gg=$($(" tbody ",this.danode()).children()[0])
	    var ds=$(this.danode()).height()


	    if(ds<=this.altura) {
		//console.log( 'pode inserir' );
	    }
	    else {
		//var hiddenEls = $(this.danode()).find("tr:hidden")
		//var ni=($(this.danode())).find('tr:hidden').length
		
		var w=0

		if ($(($(this.danode()).children()).children()[0]).is(":visible") == false) w=1

		var sw=$(($(this.danode()).children()).children()[0]).nextUntil(":visible").length+w
		$($(" tbody ",this.danode()).children()[sw]).hide();
		
		// console.log($(this.danode()) );

		
	    }

	}

    }




    
    //this.danode().parent().get(0).style.top="200px"
}













/*


 "codProduto": "308", "categoriaProduto": "Peixe", "nomeProduto": "Arroz Tambori ",   "preco"       : 14 ,  "impressoraPedido": "cozinha", "type": "produto
 "codProduto": "201", "categoriaProduto": "Sopa" , "produto":          "Sopa      ",  "preco": 1.4, "impressoraPedido": "cozinha"


  "quantidadeLinha": 1,
  "precoLinha": 1.4,
  "anulacao": false,
  "hora": "23:15",
  "linha": 0

--------------Produto          -----------


{"codProduto": " 308", "categoriaProduto": "Peixe", "nomeProduto": "Arroz Tambori      ","preco": 14,"type": "produto","impressoraPedido": "cozinha"}


   "codProduto": " 308",
   "categoriaProduto": "Peixe",
   "nomeProduto": "Arroz Tambori      ",
   "preco": 14,
   "type": "produto",
   "impressoraPedido": "cozinha"


------------LinhaConta

           "codProduto": "201",
           "produto": "Sopa               ",
           "impressoraPedido": "cozinha",
           "quantidadeLinha": 1,
           "precoLinha": 1.4,
           "anulacao": false,
           "preco": 1.4,
           "categoriaProduto": "Sopa",
           "hora": "23:15",
           "linha": 0

----------Use
var t1 = new tabela("tabelaPedido")
var node1=$("body")
t1.criaTabela(node1,210,120)

var p1={"codProduto": " 308", "categoriaProduto": "Peixe", "nomeProduto": "Arroz Tambori      ","preco": 14,"type": "produto","impressoraPedido": "cozinha"}
t1.insereProdutoQuantidade(p1,5)







*/