
function cancelaInsere  (evt) {
    var svg =$('#svgbasics').svg('get');
    var g =$('#svgPedidos') ;
    $(document).unbind('keydown', fk3);
    $(document).unbind('keydown', fk2);
    $(document).unbind('keydown', fk21);
    $(document).unbind('keydown', fk1);
    $(document).bind('keydown', fk1);
    if(g != null){
	g.remove();
    }
}

function fk1 (e){

    if(  (e.which==107 ) ) //+
    {
	$('#gButPedido').click();

    }
    console.log(e.which);
    if( (e.which >=48 &&  e.which <=57 ) || (e.which >=96 &&  e.which <=105)) //0 a 9
    {
	$(document).unbind('keydown', fk1);
	$(document).bind('keydown', fk2);


	var svg =$('#svgbasics').svg('get');

	var q = svg.group({id: 'svgPedidos',stroke: 'black',strokeWidth: 0});
	/*
	  nao permitir aceder ao botoes que esta por baixo 
	*/
//TODO  ver melhor
	svg.rect(q, 0, 0, 800, 600, {id: 'recQP', rx: "10", ry:"10",opacity:"0.5",fill: "white"});
//	svg.rect(q, 728, 4, 70, 595, {id: 'recQP', rx: "10", ry:"10",fill: "darkslategray"});

	/*fim nao permitir aceder ao botoes que esta por baixo */

	var g = svg.group(q,{transform : "translate(50, 55 ) ",
			     id: 'svgAnulacao',
			     stroke: 'black',strokeWidth: 2});
	svg.rect(g, 3, 3, 600, 350, {
	    id: 'recQP',rx: "10", ry:"10",strokeWidth: 6,	
	    fill: "darkslategray",'stroke-linejoin': 'round', stroke: 'orange'
	});
	/* botao anular  */
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
	/* fim botao anular*/
	svg.rect(g, 50, 83,140, 43, {
	    rx:"5" ,ry:"5",
	    id: 'recText1',
	    fill: "white",stroke: 'orange',strokeWidth: 2
	});    
	svg.rect(g,205, 83,380, 43, {
	    rx:"5" ,ry:"5",
	    id: 'recText2',
	    fill: "white",stroke: 'orange',strokeWidth: 2
	}); 

	var tt = svg.text(g,numPad(e), {id : "textInserePedido",
					fontFamily: "Verdana","x" : "60","y" : "120",
					strokeWidth : "0",strokeLinecap : "null",fontSize: "38", 
					fill: "black"});
	var tt2 = svg.text(g, " ", {id : "textNomeProdPedido",
				    fontFamily: "Verdana","x" : "210","y" : "120",
				    strokeWidth : "0",
				    strokeLinecap : "null",fontSize: "28", 
				    fill: "black"});
	//aparentemente este d nao faz nada
	var d = $('#svgbasics').svg('get').root();
	var fo = document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject');
	fo.setAttribute('id', 'textInputQuant');
	fo.setAttribute('width', '80');
	fo.setAttribute('height', '50');
	fo.setAttribute('x', '450');
	fo.setAttribute('y', '270');
	var body = document.createElementNS('http://www.w3.org/1999/xhtml', 'body');
	body.setAttribute('xmlns', 'http://www.w3.org/1999/xhtml');
	body.style.margin = '0px';
	body.style.height = '100%';

	var inT1 = document.createElementNS('http://www.w3.org/1999/xhtml', 'input');
	inT1.setAttribute('xmlns', 'http://www.w3.org/1999/xhtml');
	inT1.setAttribute('x', '350');
	inT1.setAttribute('y', '380');
	inT1.setAttribute('id', 'qntPed');
	inT1.setAttribute('size', '4');
	inT1.style.type = 'text';
	body.appendChild(inT1);
	fo.appendChild(body);
	g.appendChild(fo);
	$('#qntPed').val("1");
	$('#qntPed').focus(function() {
	    this.select();
	    $(document).unbind('keydown', fk21);
	    $(document).unbind('keydown', fk2);
	    $(document).unbind('keydown', fk1);
	    $(document).bind('keydown', fk3);
	});
    }
    else
	if( e.which ==27 )//Esc
    {

    }
    else
	if( e.which ==8 ||  e.which ==46 )//Backsape e Del
    {
	return false;

    }
    else{}

}

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


function fk2 (e){
    var svg =$('#svgbasics').svg('get');
    var tt= svg.getElementById('textInserePedido');
 console.log('e.whichfk2');

    if( (e.which >=48 &&  e.which <=57 && svg.getElementById('textInserePedido').firstChild.nodeValue.length <5 )
	||
	(e.which >=96 &&  e.which <=105  && svg.getElementById('textInserePedido').firstChild.nodeValue.length <5) )
    { //0 a 9
	if (tt!=null)
	    tt.firstChild.nodeValue=tt.firstChild.nodeValue+numPad(e);
	else
	    tt.firstChild.nodeValue=numPad(e);
    }
    if( e.which ==8 ||  e.which ==46 ){//Backsape e Del
	if (tt!=null)
	    tt.firstChild.nodeValue= (tt.firstChild.nodeValue).slice(0,(tt.firstChild.nodeValue).length - 1);
	else
	    tt.firstChild.nodeValue= "";
	return false;

    }
    if( e.which ==27 ){//Esc
	var svg =$('#svgbasics').svg('get');
	var g =$('#svgPedidos') ;

	if(g != null){
	    g.remove();
	}

	$(document).unbind('keydown', fk2);
	$(document).unbind('keydown', fk21);
	$(document).bind('keydown', fk1);
    }

    if (e.which == 13)    {//Enter

	var  ms=  parseInt( tt.firstChild.nodeValue).toString();
	var qtd=parseInt($('#qntPed').val()).toString();
	$(document).unbind('keydown', fk3);
	$(document).unbind('keydown', fk2);	
	$(document).unbind('keydown', fk21);
	$(document).unbind('keydown', fk1);
	$(document).bind('keydown', fk21);

	//no primeiro Enter nao insere apenas consulta o nome do produto

	var prodOb = produtoObj(ms);

	if (prodOb!=""){	    
	    var tt2= svg.getElementById('textNomeProdPedido');
	    tt2.firstChild.nodeValue=prodOb.nomeProduto +"";
	    return false;
	}
	if(prodObj=="") {
	    var g =$('#svgPedidos') ;
	    if(g != null){
		g.remove();
	    }

	    $(document).unbind('keydown', fk3);
	    $(document).unbind('keydown', fk2);
	    $(document).unbind('keydown', fk21);
	    $(document).unbind('keydown', fk1);
	    $(document).bind('keydown', fk1);
	    return false;
	}
    

    }


}
//é chamada depois da insercao do nome do produto na caixa de texto
function fk21 (e){
 console.log(e.which+'fk21');
    var svg =$('#svgbasics').svg('get');
    var tt= svg.getElementById('textInserePedido');
    
    if( (e.which >=48 &&  e.which <=57 ) || (e.which >=96 &&  e.which <=105)){ //0 a 9
	$(document).unbind('keydown', fk3);
	$(document).unbind('keydown', fk21);
	$(document).bind('keydown', fk2);

	tt.firstChild.nodeValue=numPad(e);
	
    }
    	
    if( e.which ==8 ||  e.which ==46 ){//Backsape e Del

	$(document).unbind('keydown', fk3);
	$(document).unbind('keydown', fk21);
	$(document).bind('keydown', fk2);
	if (tt!=null)
	    tt.firstChild.nodeValue= (tt.firstChild.nodeValue).slice(0,(tt.firstChild.nodeValue).length - 1);
	else
	    tt.firstChild.nodeValue= "";
	return false;

    }
    if( e.which ==27 ){//Esc
	var svg =$('#svgbasics').svg('get');
	var g =$('#svgPedidos') ;

	if(g != null){
	    g.remove();
	}
	$(document).unbind('keydown', fk21);
	$(document).unbind('keydown', fk2);
	$(document).bind('keydown', fk1);
    }

    if (e.which == 13)    {//Enter

	var  ms=  parseInt( tt.firstChild.nodeValue).toString();
	var qtd=parseInt($('#qntPed').val()).toString();

	var g = $('#svgPedidos') ;
	g.remove();


	$(document).unbind('keydown', fk3);
	$(document).unbind('keydown', fk2);
	$(document).unbind('keydown', fk21);
	$(document).unbind('keydown', fk1);
	$(document).bind('keydown', fk1);
	var ht=produtoObj(ms);

	
	if(ht!=""){

	    var existeP=false;
	    $('#tabelaPedido tr ').each(function(c) {

		if($(this).find(".cod").text()==ms && ht.impressoraPedido!="complemento"                 ){
		    var iq= parseInt($(this).find(".qnt").text());
		    var siq=iq+parseInt(qtd);
		    var fp= parseFloat($(this).find(".precoLinha").text());
		    var sfp= fp +ht.preco * parseInt(qtd);
		    parseFloat($(this).find(".precoLinha").text(sfp.toFixed(2)));
		    console.log(" prim  "+fp+" . " +sfp.toFixed(2)+"  . "+siq);
		    $(this).find(".qnt").text(siq);
		    existeP=true;
		    var nod1=  $(this);
		    var node	=$("#tabelaPedido .selected");
		    node.removeClass('selected');
		    nod1.addClass('selected');	

		}
	    })


		if(	 ht.impressoraPedido=="complemento"    ){

		    var nt=$("#tabelaPedido .selected");
		    $('<tr ><td class="cod" noWrap>'
		      +ms+'</td><td class="qnt" noWrap >'
		      +qtd+'</td><td class="nome" noWrap>'
		      +ht.nomeProduto 
		      +'</td><td  class="precoLinha" noWrap >'
		      +parseInt(qtd)* ht.preco
		      +'</td><td  class="precoUnitario" noWrap >'
		      + ht.preco
		      +'</td><td class="impressoraPedido" noWrap >'
		      + ht.impressoraPedido
		      +'</td></tr>').insertAfter(nt)

		}




	    if(!existeP &&
	       ht.impressoraPedido!="complemento"   )
	    {
		var node	=$("#tabelaPedido .selected");

		node.removeClass('selected');
		$('#tabelaPedido').append(
		    '<tr  class="selected"  ><td class="cod"  noWrap>'+ms+
			'</td><td class="qnt" noWrap >'+qtd+
			'</td><td class="nome" noWrap>'+
			ht.nomeProduto +		      
			'</td><td  class="precoLinha" noWrap >'+
			(parseInt(qtd)* ht.preco).toFixed(2)+
			'</td><td  class="categoriaProduto" noWrap >'+ 
			ht.categoriaProduto+
			'</td><td  class="precoUnitario" noWrap >'+ 
			ht.preco+
			'</td><td  class="impressoraPedido" noWrap >'+
			ht.impressoraPedido+'</td></tr>'
		);

	    }
	    $("#tabelaPedido .cod").hide();
	    $("#tabelaPedido .categoriaProduto").hide();
	    $("#tabelaPedido .impressoraPedido").hide();
	    $("#tabelaPedido .precoUnitario").hide();	
	    return false;
	}
	if(data.rows.length==0) 
	{
	    alert("produto nao existe");
	    
	    
	    var g =$('#svgPedidos') ;
	    if(g != null){
		g.remove();
	    }

	    /*
	      $(document).unbind('keydown', fk3);
	      $(document).unbind('keydown', fk2);
	      $(document).unbind('keydown', fk21);
	      $(document).unbind('keydown', fk1);
	      $(document).bind('keydown', fk1);*/
	    return false;
	}

	






	/*	$(document).unbind('keydown', fk3);
		$(document).unbind('keydown', fk2);
		$(document).unbind('keydown', fk21);
		$(document).unbind('keydown', fk1);
		$(document).bind('keydown', fk1);*/
    }


}
function fk3 (e){
    /*   caso seja alterada a quantidade*/

    var svg =$('#svgbasics').svg('get');
    var tt2= svg.getElementById('textInserePedido');
    if (e.which == 13)    {    //Enter
	var  ms=  parseInt( tt2.firstChild.nodeValue).toString();
	var qtd=parseInt($('#qntPed').val()).toString();
	db.view("myViews/produtoLista",
		{
		    "keys":[ms ],
		    success: function(data){
			
			if(data.rows.length>0){
			    var existeP=false;
			    
			    $('#tabelaPedido tr ').each(function(c) {
				if($(this).find(".cod").text()==ms){
				    var iq= parseInt($(this).find(".qnt").text());
				    var siq=iq+parseInt(qtd);
				    var fp= parseFloat($(this).find(".precoLinha").text());		 
				    var sfp= fp +data.rows[0].value.preco * parseInt(qtd);
				    parseFloat($(this).find(".precoLinha").text(sfp.toFixed(2)));	
				    $(this).find(".qnt").text(siq);
				    existeP=true;				
				    console.log(" seq  "+fp+" . " +sfp+"  . "+siq);
				}
			    })
				if(!existeP)
				    $('#tabelaPedido').append(
					'<tr ><td class="cod" noWrap>'+ms+
					    '</td><td class="qnt" noWrap >'+qtd+
					    '</td><td class="nome" noWrap>'+
					    data.rows[0].value.nomeProduto +
					    '</td><td  class="precoLinha" noWrap >'+
					    (parseInt(qtd)* data.rows[0].value.preco).toFixed(2)+
					    '</td><td  class="categoriaProduto" noWrap >'+
					    data.rows[0].value.categoriaProduto+
					    '</td><td  class="precoUnitario" noWrap >'+
					    data.rows[0].value.preco+
					    '</td><td  class="impressoraPedido" noWrap >'+
					    data.rows[0].value.impressoraPedido+'</td></tr>');
			    
			    
			    $("#tabelaPedido .cod").hide();
			    $("#tabelaPedido .categoriaProduto").hide();
			    $("#tabelaPedido .impressoraPedido").hide();
			    $("#tabelaPedido .precoUnitario").hide();		
			    
			    
			    
			    
			    
			    
			    
			    return false;}
			if(data.rows.length==0) {
			    alert("produto nao existe");
			    
			    var g =$('#svgPedidos') ;
			    if(g != null){
				g.remove();
			    }


			    $(document).unbind('keydown', fk3);
			    $(document).unbind('keydown', fk2);
			    $(document).unbind('keydown', fk21);
			    $(document).unbind('keydown', fk1);
			    $(document).bind('keydown', fk1);
			    return false;
			}
		    }
		});

	var svg =$('#svgbasics').svg('get');
	var g =$('#svgPedidos') ;
	if(g != null){
	    g.remove();
	}


	$(document).unbind('keydown', fk3);
	$(document).unbind('keydown', fk2);
	$(document).unbind('keydown', fk21);
	$(document).unbind('keydown', fk1);
	$(document).bind('keydown', fk1);



    }
    if( e.which ==27 ){//Esc
	var svg =$('#svgbasics').svg('get');
	var g =$('#svgPedidos') ;
	if(g != null){
	    g.remove();
	}
	$(document).unbind('keydown', fk3);
	$(document).unbind('keydown', fk2);
	$(document).unbind('keydown', fk21);
	$(document).unbind('keydown', fk1);
	$(document).bind('keydown', fk1);
    }

}





