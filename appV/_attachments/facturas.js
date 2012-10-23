var db = $.couch.db(getCurrentDBName());
var arrayC;
var arrayC2;

function getCurrentDBName() {
    console.log( window.location);// hostname
    return window.location.pathname.split("/")[1];    
}

$(function() {
    $( "#tabs" ).tabs();
    $( "#tabs2" ).tabs();

});
$(document).ready(function() {

    db.view("myViews/diaSessao",{
	success: function(data){
	    
	    //init stuff
	    datas   ( data.rows[0].value.ano ,(data.rows[0].value.mes),
		      (data.rows[0].value.dia));
	    //inicia datePicker
	    refreshItems(data.rows[0].value.ano ,pad2(data.rows[0].value.mes),
			 pad2(data.rows[0].value.dia));
	    
	}
    });
   /* 
    $("#buttonAbreDia").click(function() {
	db.view("myViews/diaSessao",{
	    success: function(data){
		
		console.log(".................");
		var ti=data.rows[0].value;
		//init stuff
		console.log("+++++++++++++++++");
		
		var dia=$(".hasDatepicker").datepicker("getDate"); 
		var rt=dia.getDate();
		var md= dia.getMonth()+1;
		console.log(dia.getFullYear()+"  -  "+rt+" - "+md);
		ti.ano=parseInt(dia.getFullYear());
		ti.dia=parseInt(dia.getDate());
		ti.mes=parseInt(dia.getMonth()+1);
		db.saveDoc(ti);
		
	    }
	});




    });
*/



    db.view('myViews/empregadoLista',{
	success: function(data) {
	    
	    for (var i = 0; i < data.rows.length; i++){
		$("#escolheEmpregado").append('<option>'+
					      data.rows[i].key+'</option>');
		
	    }
            $("#escolheEmpregado").change(
		        function(a){
			    console.log ("this.value");
			    console.log(arrayC);
			    if(this.value=="") {
				preencheTabelaF(arrayC);
				preencheTabelaC(arrayC2);
				preencheTabelaAb();
			    }
			    else {
				preencheTabelaF(arrayC,this.value);	
				preencheTabelaC(arrayC2,this.value);
				preencheTabelaAb(this.value);
				  
				 }

			}
	    );
	}
    });


    
});


  
function refreshItems(a,m,d){
    jQuery(function($){
	$.datepicker.regional['pt-BR'] = {
	    closeText: 'Fechar',
	    prevText: '&#x3c;Anterior',
	    nextText: 'Pr&oacute;ximo&#x3e;',
	    currentText: 'Hoje',
	    monthNames: ['Janeiro','Fevereiro','Mar&ccedil;o','Abril','Maio','Junho',
			 'Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
	    monthNamesShort: ['Jan','Fev','Mar','Abr','Mai','Jun',
			      'Jul','Ago','Set','Out','Nov','Dez'],
	    dayNames: ['Domingo','Segunda-feira','Ter&ccedil;a-feira','Quarta-feira',
		       'Quinta-feira','Sexta-feira','Sabado'],
	    dayNamesShort: ['Dom','Seg','Ter','Qua','Qui','Sex','Sab'],
	    dayNamesMin: ['Dom','Seg','Ter','Qua','Qui','Sex','Sab'],
	    weekHeader: 'Sm',
	    dateFormat: 'dd/mm/yy',
	    firstDay: 0,
	    isRTL: false,
	    showMonthAfterYear: false,
	    yearSuffix: ''
	};
	$.datepicker.setDefaults($.datepicker.regional['pt-BR']	);
    });
    $( "#datepicker" ).datepicker( );
    $( "#datepicker").val(d+"/"+m+"/"+a);
    console.log( $( "#datepicker").val()+"  data");
    $("#listaProdutos").empty();
    $('#listaProdutos ').append('<thead> <tr> <th>codigo</th>'+
				'<th>nomeProduto</th><th>preco</th>'+
				'<th>categoriaProduto</th>'+
				'<th>impressoraPedido</th></tr> </thead>');
    $( "#datepicker" ).change(function() {
	$('#empergMesa').empty();
	$('#listaFacturas').empty();
	$('#tabelaFDecrim').empty();	
	$('#factD').empty();
	$('#tabelaDiscrim').empty();

	var dia=$(".hasDatepicker").datepicker("getDate"); 
	var rt=dia.getDate()+1;
	var md= dia.getMonth()+1;
	datas ( dia.getFullYear(),md  , dia.getDate(),dia.getFullYear()) ;
    });
}

  



function datas(a1,m1,d1) {
    console.log(a1+' '+ m1+' '+d1+' ');
    db.view("myViews/facturaEmpregadoDia", {
	startkey : [a1,m1,d1],
	endkey : [a1,m1,d1,{}],
	success: function(data){
	    preencheTabelaF(data);
	}
    });

    db.view("myViews/contaLista2", {
	startkey : [a1,m1,d1],
	endkey : [a1,m1,d1,{}],
	success: function(data){
	    preencheTabelaC(data);
	}
    });
    
    var diaHoje=""
    db.view("myViews/diaSessao",{
	    success: function(data){
		diaHoje= pad2(data.rows[0].value.dia)+"/"+
		    pad2(data.rows[0].value.mes)+"/"+
		    data.rows[0].value.ano;
		console.log(diaHoje +" e "  );
		if(diaHoje==$( "#datepicker").val()){
		    preencheTabelaAb();
		}
		else  $('#listaMesasAbertas ').empty();		
	    }
    });
    
}


function preencheTabelaAb(emp1 ){
    var diaHoje="";

    $('#empergMesa').empty();
    db.view("myViews/diaSessao",{
	    success: function(data){
		diaHoje=pad2(data.rows[0].value.dia)+"/"+
		    pad2(data.rows[0].value.mes)+"/"+
		    data.rows[0].value.ano;
		console.log(diaHoje+"-  dia   -"+$( "#datepicker").val() )
		if(diaHoje==$( "#datepicker").val()){
		    preencheTabelaAbAux(emp1);
		}
		else {
		 		    return;
		}
		
	    }
    });


}

function preencheTabelaAbAux(emp1){

    $('#listaMesasAbertas ').empty();
    var nomE=null;
    var totE=0.0;
    
    db.view("myViews/mesasAbertas", {
	success: function(data){
	    data.rows.map(function(row) {
		//console.log("emp1"+emp1 );
		if(emp1==undefined || emp1==row.value.empregado)
		{
		    totE=totE+ row.value.total;
		    var tr = linhaTabela1(
			row.value.numFactura,
			row.value.diaSessao,
			row.value.empregado,
			row.value.total.toFixed(2),
			row.value.mesa)
		    
		    $('#listaMesasAbertas ').append(tr);
		    
		    //tr.onClick
		    tr.onclick = function(){
			var this_r=row.value;
			return function(){    
			    $("#empergMesa").empty();
			    $("#factD").empty();
			    linhaLad(this_r);
			    //$("#empergMesa").append("<h3>Factura fff</h3>");
			    preencheEmp(row);
			}
		    }();		
		}
	    });
	    
	    $('#listaMesasAbertas ').append("<tr> <td></td> <td>Total</td><td></td><td>"+
					    totE.toFixed(2)+"</td></tr>"); 
	    
	}
   });
    
}





function preencheTabelaF(data,emp1 ){

    $('#listaFacturas ').empty();
    console.log(data);
    console.log("as");
    console.log(emp1);
    var nomE=null;
    var totE=0.0;
    arrayC = data;
    data.rows.map(function(row) {
	// console.log("emp1"+em );
	if(emp1==undefined || emp1==row.value.empregado)
	{
	    totE=totE+ row.value.total;
	    var tr = linhaTabela1(
		row.value.numFactura,
		row.value.diaSessao,
		row.value.empregado,
		row.value.total.toFixed(2),
		row.value.mesa)
	    
	    $('#listaFacturas ').append(tr);
	    
	    //tr.onClick
	    tr.onclick = function(){
	
		var this_r=row.value;
		return function(){

		    linhaLad(this_r);
		}
	    }();		
	    
	}
    });
    
    $('#listaFacturas ').append("<tr> <td></td> <td>Total</td><td></td><td>"+
				totE.toFixed(2)+"</td></tr>");

    
}


function preencheTabelaC(data,emp1 ){

    $('#listaMesasFechadas ').empty();
    console.log(data);
    console.log("as");
    console.log(emp1);
    var nomE=null;
    var totE=0.0;
    arrayC2 = data;

    data.rows.map(function(row) {
	console.log("______---___");
	 console.log(row.value );
	if(emp1==undefined || emp1==row.value.empregado)
	{
	    totE=totE+ row.value.total;
	    var tr = linhaTabela1(
		row.value.type,
		row.value.diaSessao,
		row.value.empregado,
		row.value.total.toFixed(2),
		row.value.mesa)
	    
	    $('#listaMesasFechadas ').append(tr);
	    
	    //tr.onClick
	     tr.onclick = function(){
	       var this_r=row.value;
	       return function(){
	       linhaLad(this_r);
	       }
	       }();
	   		
	    
	}
    });
    
    $('#listaMesasFechadas ').append("<tr> <td></td> <td>Total</td><td></td><td>"+
				totE.toFixed(2)+"</td></tr>");

    
}



function linhaLad(rq){
    $('#empergMesa').empty();
    
    console.log("rq");

    console.log(rq);

    var this_r=rq;
    if(this_r.numFactura!=undefined){
		$("#factD").text("Factura "+this_r.numFactura);
	}
    else
		$("#factD").text(" "+this_r.type);

    var table = document.createElement('table');
    table.setAttribute('id', 'tabelaFDecrim');
    table.setAttribute("align","center");
    table.setAttribute("width","200");
    table.style.width = '100%';
    var tbody = document.createElement('tbody');
    for (var j = 0; j < this_r.linhaConta.length ;j++) {
	var tr = document.createElement('tr');
	var td = document.createElement('td');
	td.setAttribute("noWrap","true");
	if((this_r.linhaConta)[j]. anulacao)
	    td.style.background = 'red';
	else
	    td.style.background = 'green';
	td.appendChild(document.createTextNode(
	
	    ( parseFloat((this_r.linhaConta)[j].quantidadeLinha)).toFixed(2) ) );
	var td2 = document.createElement('td');
	td2.setAttribute("noWrap","true");
	td2.appendChild(document.createTextNode(
	    (this_r.linhaConta)[j].nomeProduto));
	var td3 = document.createElement('td');
	td3.setAttribute("noWrap","true");
	//preco unitario
	td3.appendChild(document.createTextNode(
	    (this_r.linhaConta)[j].precoLinha.toFixed(2)));
	var td4 = document.createElement('td');
	td4.setAttribute("noWrap","true");
	//empregado
	td4.appendChild(document.createTextNode(
	    (this_r.linhaConta)[j].empregado  ));

	if ( (this_r).empregado!=(this_r.linhaConta)[j].empregado  )
	    td4.style.background = 'red';
	
	tr.appendChild(td);
	tr.appendChild(td2);
	tr.appendChild(td3);
	tr.appendChild(td4);
	tbody.appendChild(tr);
    }
    
    var tt = document.createElement('tr');
    var tda = document.createElement('td');
    tda.setAttribute("noWrap","true");
    td.appendChild(document.createTextNode(" "));
    var tdb = document.createElement('td');
    tdb.setAttribute("noWrap","true");
    tdb.appendChild(document.createTextNode(" TOTAL"));
    var tdc = document.createElement('td');
    tdc.setAttribute("noWrap","true");
    //preco unitario
    tdc.appendChild(
	document.createTextNode(
	    (this_r.total.toFixed(2))));
    tt.appendChild(tda);
    tt.appendChild(tdb);
    tt.appendChild(tdc);
    tbody.appendChild(tt);
    table.appendChild(tbody);
    
    $("#tabelaDiscrim").empty();
    
    console.log("lllllllllllll");
    console.log(rq);


    
    //reemprime factura
    if(rq.type== "factura"){
    	if(rq.imprimido!=undefined )
    	{
    		var duplic="duplicado"
    		$('#tabelaDiscrim').append('<h2>'+'Duplicado</h2>');
    		$('#tabelaDiscrim').append('<button type="button" id="butaoReImprime">'+'ReImprimir !</button>');
    		$( "#butaoReImprime" ).click(function() {
    			
    			var impB={"type":"impressora","texto":rq.imprimido,
    			"local":window.location.host};
    			db.saveDoc(impB, {
    				error: function() {
    					alert( "erro saveDoc func linhaLad em factura.js" );
    				}
    			});


    		});

    	}
    	else{

    		$('#tabelaDiscrim').append('<input  id="Numrefreimp"  VALUE="" style=" width: 18px;">' );
			$('#tabelaDiscrim').append('Num refeicoes  &nbsp&nbsp' );

    		$('#tabelaDiscrim').append('<button type="button" id="butaoImprime">'+'Imprimir !</button>');
    		console.log( $('#tabelaDiscrim'));
    		console.log($("#tabelaDiscrim #Numrefreimp").val());
    		
    		$( "#butaoImprime" ).click(function() {
    				
    				var numRefeicoes=$("#Numrefreimp");
    				console.log(numRefeicoes.val())
    					
    				console.log("Numrefreimp")

					console.log(rq);

					imprimeFacturaAnt(rq.empregado,rq,"","",numRefeicoes.val()) 
    				
    		});


    	}
    }



    if(rq.type== "conta"){
	$('#tabelaDiscrim').append('<button type="button" id="butaoImprime">'+
				   'Reabre </button>');
	$( "#butaoImprime" ).click(function() {
	    console.log(rq);
	    rq.aberta=false;
	    var d		= new Date();
		var h= zeroFill(d.getHours(),2);
		var m= zeroFill(d.getMinutes(),2);
		var ka = h.toString()+':'+m.toString();
		rq.hora	= ka;
	    rq.type  ="mesa";

	    db.saveDoc(rq, {
		    error: function() {
			alert( "erro saveDoc func linhaLad em factura.js" );
		    }
	    });
	    //    tiraFactura_click (rq,"nuno",true)
	    
	});
    }
    

	
    $("#tabelaDiscrim").append(table);
}



function linhaTabela1(nF,dS,eM,tT,mS){

    var tr = document.createElement('tr');
    
    var td = document.createElement('td');
    td.setAttribute("noWrap","true");			
    td.style.background = 'green';
    td.appendChild(document.createTextNode(nF));
    var td2 = document.createElement('td');
    td2.setAttribute("noWrap","true");
    td2.appendChild(document.createTextNode(dS));
    var td3 = document.createElement('td');
    td3.setAttribute("noWrap","true");
    td3.appendChild(document.createTextNode(eM));
    var td4= document.createElement('td');
    td4.setAttribute("noWrap","true");
    td4.appendChild(document.createTextNode(tT
					    +'  euros  '));
    var td5 = document.createElement('td');
    td5.setAttribute("noWrap","true");
    td5.appendChild(document.createTextNode("mesa  "  +mS));
    tr.appendChild(td);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);
    
    return tr;

}

function pad2(number) {
   
     return (number < 10 ? '0' : '') + number
   
}


function preencheEmp(doc){
    $("#empergMesa").append('<H3 >mesa '+doc.value.mesa+'</h3>');
    var jde=$("#empergMesa").append('<select id="opEmp" ></select>');
    
    db.view('myViews/empregadoLista',{
	success: function(data) {
	    
	    $("#opEmp").append('<option>'+ doc.value.empregado+'</option>');
	    for (var i = 0; i < data.rows.length; i++){
		$("#opEmp").append('<option>'+
				   data.rows[i].key+'</option>');
		
	    }
            $("#opEmp").change(
		function(a){
		    console.log (this.value);
		    if(this.value!=null&&this.value!=undefined){
			doc.value.empregado=this.value;
			db.saveDoc(doc.value, {	
			    success: function() {
				
			    }
			});
		    }
		    

		}
			    
	    );
	}
    });
    



}



    //----------------------------------------------
    //-------------FUNCOES AUXILIARES  -------------
    //----------------------------------------------




var strRestNome="Restaurante  O Alves";

var cabecFactura=
("\x1b\x40\x1b\x63\x34\x02\x1b\x74\x03\x1b\x45\x00\x1b\x2d\x00\x1b\x21\x00\x1b\x45\x01Restaurante O Alves"+
		 "\x0d\x0a\x1b\x45\x00Gentes & Costumes - Restauracao Lda"+
		 "\x0d\x0aAv Combatentes da Grande Guerra, 124/140\x0d\x0a4450-693 Le\u001b\u0087a d Tel.229954226"+
		 "\x0d\x0aN.Contrib. 509235719\x0d\x0aRegisto na Cons. Porto n.509235719");


/*


var strRestNome="Restaurante  O Farol";


var cabecFactura=("\x1b\x40\x1b\x63\x34\x02\x1b\x74\x03\x1b\x45\x00\x1b\x2d\x00\x1b\x21\x00\x1b\x45\x01Restaurante O Farol"+
		 "\x0d\x0a\x1b\x45\x00Farol de Le\u001b\u0087a / A Boa Nova"+
		 "\x0d\x0a\x1b\x45\x00Cervejaria Restaurante, Lda"+
		 "\x0d\x0aRua Sarmento Pimentel, 354\x0d\x0a4450 Tel.229969626"+
		 "\x0d\x0aN.Contrib. 503974064\x0d\x0aRegisto na Cons. Porto n.00794");

*/

// faz parsing de uma string com um "." a separar a parte inteira da decimal (se tiver)
//multiplica por cem ( 12.3 => 1230)
//e retorna o inteiro
// so pode ter duas casas decimais
function centesimalAnt(eA){
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



//agrega todos os produtos com o mesmo codigo retirando as anulacoes e linha a zero
function reduzLinhasAnt(rows){
    console.log("/////rows");

    console.log(rows);

    var aR = [];
    var numlinh=0;
    for (var i = 0; i < rows.length; i++) {
	var sinal = 1;
	if((rows[i]).anulacao!=undefined && (rows[i]).anulacao==true)
	    sinal = -1;
	var ty=objPosArr(((rows[i]).codProduto),((rows[i]).preco).toFixed(2) ,aR);
	//	console.log("ty");
	//	console.log(((rows[i]).codProduto));
	//	console.log(ty);
	
	if(   ty  ==""){
	    var rR1 = {};
	    rR1.quantidadeLinha = centesimalAnt((rows[i]).quantidadeLinha) *sinal;
	    rR1.nomeProduto = ((rows[i]).nomeProduto  );
	    rR1.codProduto = ((rows[i]).codProduto  );
	    rR1.empregado = ((rows[i]).empregado );
	    rR1.categoriaProduto = ((rows[i]).categoriaProduto  );
	    rR1.preco = parseFloat( parseFloat((rows[i]).preco).toFixed(2)) ;

	    rR1.precoLinha	= rR1.quantidadeLinha *rR1.preco ;
	    rR1.anulacao	=  (rows[i]).anulacao;
	    rR1.impressoraPedido	= (rows[i]).impressoraPedido;
 	
	    var d		= new Date();
	    var h= zeroFill(d.getHours(),2);
	    var m= zeroFill(d.getMinutes(),2);
	    var ka = h.toString()+':'+m.toString();
	    rR1.hora	= ka;
	    //   rR1.linha	= numlinh;
	    //   numlinh ++;    
	    aR.push(rR1);

	}
	else{	
	    var pr1=ty.obj;
	    var rR2 = {};
	    rR2.nomeProduto 		= (pr1.nomeProduto  );
	    rR2.codProduto		= ((rows[i]).codProduto  );

	    rR2.categoriaProduto = ((rows[i]).categoriaProduto  );
	    rR2.quantidadeLinha	=  pr1.quantidadeLinha+centesimalAnt(
		(rows[i]).quantidadeLinha) *sinal;
	    rR2.preco = parseFloat( parseFloat ((rows[i]).preco).toFixed(2)) ;
	    rR2.precoLinha	= rR2.quantidadeLinha *rR2.preco ;
	    rR2.anulacao	=  (rows[i]).anulacao;
	    rR2.empregado = ((rows[i]).empregado );
	    rR2.impressoraPedido	= (rows[i]).impressoraPedido;
	    rR2.hora	= (rows[i]).hora;
	    //   rR2.linha	= (rows[i]).linha;
	    aR[ty.pos]		=rR2;
	}
    }
   
/* 
    aR.map(function (a ){if(a!= undefined ) console.log(  a.quantidadeLinha+"  "+a.nomeProduto) ;});
    console.log(aR);
    console.log("?????????");
*/
    return aR;
}


    
    function  imprimeFacturaAnt(empregado,document,nomeC,numCont,numRefeicoes) {
    
	var impT=[];
	var txI=cabecFactura;

	if(nomeC=="" || nomeC== undefined)
	    txI=txI+("\x0d\x0aNome \x5f\x5f\x5f\x5f\x5f\x5f\x5f\x5f\x5f\x5f\x5f\x5f\x5f\x5f");
	else  txI=txI+("\x0d\x0aNome "+ nomeC );
	if(numCont=="" ||  numCont==undefined )
            txI=txI+("\x0d\x0aN.C. \x5f\x5f\x5f\x5f\x5f\x5f\x5f\x5f");
	else  txI=txI+("\x0d\x0aN.C. "+numCont );
	txI=txI+("\x0d\x0aVenda a Dinheiro "+document.numFactura+"  "+document.diaSessao[2]+'/'+
		 document.diaSessao[1]  +'/'+
 		 document.diaSessao[0]);
        
	txI=txI+("\x0d\x0a ");
	impT.push(txI);

	var pretf= (reduzLinhasAnt(document.linhaConta));
	var tf= ordenaPorCategoria(pretf);
	var f3= function (a){return a.precoLinha;};
	var t1=0.0;
	
	if (document.linhaConta.length>0) 
	    t1=document.linhaConta.map(f3).reduce(function  (a,b){return (a+b);}) ;
	txI="";
	if(numRefeicoes=="" || numRefeicoes==undefined)
	    tf.map(function (a) {
		var pr1 =(parseFloat(a.preco* a.quantidadeLinha/100)).toFixed(2);
		if(a!=undefined &&  pr1>0 ) 
		{
		    var si= (a.nomeProduto  +"                                 ").slice(0,22);
		    var pi =  ("   "+pr1);
		    var pii= pi.slice(pi.length-6,pi.length );
		    var qi =parseFloat(a.quantidadeLinha/100).toFixed(2)+"        ";
		    var qii= qi.slice(0,4);

		    txI=txI+("\x0d\x0a"+qii+" "+si +pii);    
		}
	    });
	else{
	    txI=txI+("\x0d\x0a ");
	    txI=txI+("\x0d\x0a ");
	    txI=txI+("\x0d\x0a\x1b\x21\x20 "+numRefeicoes+" refeicoes "
		    /* +parseFloat(t1).toFixed(2)*/
		    );
	    txI=txI+("\x0d\x0a ");
	    txI=txI+("\x0d\x0a ");
	    
	}
	impT.push(txI);

	impT.push('\x1b\x21\x00\x0d '+'----------------------------'+"\x0d\x0a\x1b\x21\x20TOTAL   "
		  +(parseFloat(t1)).toFixed(2)+'\u20AC\x1b\x21\x00\x0d');
	txI="";
	txI=txI+("\x0d\x0amesa "+document.mesa+"   empregado   "+empregado);
	//txI=txI+("\x0d\x0ahora      "+document.hora);
	txI=txI+("\x0d\x0a   ");
	txI=txI+("\x0d\x0a       Processado por computador");
	txI=txI+("\x0d\x0a           IVA incluido    23%  ");
	impT.push(txI);
	
	impT.push("\x0d\x0a             \n "); 
	impT.push("\x0d\x0a             \n "); 
	//impT.push("\x0d\x0a  \n\n\n\x1d\x56\x00");
	// impT.push(" \x1b\x645");
	impT.push("\x1b\x69");

	document.imprimido=impT;
	db.saveDoc(document, {
            error: function() {
		alert( "erro inserir imprimido imprimeFactura em quadroFactura" );
	    }
	});
	
	
	var impB={"type":"impressora","texto":impT,"local":window.location.host};
	for(var i=0;i<impT.length;i++)
	console.log(impT[i]);


	db.saveDoc(impB, {
            error: function() {
		alert( "erro inserir doc.func imprimeFactura em quadroFactura" );
	    }
	});
	
    }