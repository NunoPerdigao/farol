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
    $('#listaProdutos ').append(' <thead> <tr> <th>codigo</th>  <th>nomeProduto</th><th>preco</th>'+
				' <th>categoriaProduto</th><th>impressoraPedido</th></tr> </thead>');
    $( "#datepicker" ).change(function() {
	$('#empergMesa').empty();
	$('#listaFacturas').empty();
	$('#tabelaFDecrim').empty();	
	$('#factD').empty();
	$('#tabelaDiscrim').empty();

	var dia=$(".hasDatepicker").datepicker("getDate"); 
	var rt=dia.getDate()+1;
	var md= dia.getMonth()+1;
	datas   ( dia.getFullYear(),md  , dia.getDate(),dia.getFullYear()) ;
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
		diaHoje= pad2(data.rows[0].value.dia)+"/"+
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
   
    console.log(rq);
    var this_r=rq;
    if(this_r.numFactura!=undefined)
	$("#factD").text("Factura "+this_r.numFactura);
    else
	$("#factD").text("Factura "+this_r.type);

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
	    (this_r.linhaConta)[j].produto));
	var td3 = document.createElement('td');
	td3.setAttribute("noWrap","true");
	//preco unitario
	td3.appendChild(document.createTextNode(
	    (this_r.linhaConta)[j].precoLinha.toFixed(2)));
	tr.appendChild(td);
	tr.appendChild(td2);
	tr.appendChild(td3);
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
    tdc.appendChild(document.createTextNode(
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
	$('#tabelaDiscrim').append('<button type="button" id="butaoImprime">Imprimir !</button>');
	$( "#butaoImprime" ).click(function() {
	    if(rq.imprimido!=undefined ){

		var impB={"type":"impressora","texto":rq.imprimido,"local":window.location.host};
		db.saveDoc(impB, {
		    error: function() {
			alert( "erro inserir doc.func imprimeFactura em quadroFactura" );
		    }
		});
	    }
	    
	});
    }



    if(rq.type== "conta"){
	$('#tabelaDiscrim').append('<button type="button" id="butaoImprime">Tira Factura </button>');
	$( "#butaoImprime" ).click(function() {
	    
	    

	    tiraFactura_click (rq,"nuno",true)
	    
	    
	    
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