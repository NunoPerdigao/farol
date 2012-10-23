$(function() {
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
	    dayNames: ['Domingo','Segunda-feira','Ter&ccedil;a-feira','Quarta-feira','Quinta-feira','Sexta-feira','Sabado'],
	    dayNamesShort: ['Dom','Seg','Ter','Qua','Qui','Sex','Sab'],
	    dayNamesMin: ['Dom','Seg','Ter','Qua','Qui','Sex','Sab'],
	    weekHeader: 'Sm',
	    dateFormat: 'dd/mm/yy',
	    firstDay: 0,
	    isRTL: false,
	    showMonthAfterYear: false,
	    yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['pt-BR']);
	
	
    });
    $( "#datepicker" ).datepicker();
    
    
    
    
});

var db = $.couch.db(getCurrentDBName());

function getCurrentDBName() {
    return window.location.pathname.split("/")[1];
}

$(document).ready(function() {
    
    //init stuff
    //refreshAbertas();
    
    //	refreshItems(1,2,2000);
    db.view("myViews/diaSessao",{
	success: function(data){

	    //inicia datePicker
	    refreshItems(
		parseInt(	pad2(parseInt(data.rows[0].value.dia))) ,
		parseInt(pad2(data.rows[0].value.mes)),
		parseInt(data.rows[0].value.ano));

	  
	    }
    });

    $( "#datepicker" ).change(function() {
	var dia=$(".hasDatepicker").datepicker("getDate"); 
	refreshItems   (dia.getDate(),     dia.getMonth()+1, dia.getFullYear());
	
	
    });

});


function refreshItems(di,me,an){
    console.log("EFREFRE....."+di+me+an);
    $("#listaProdutos").empty();
    $('#listaProdutos ').append(' <thead>    <tr>      <th>codigo</th>      <th>nomeProduto</th><th>preco</th>      <th>categoriaProduto</th><th>impressoraPedido</th> </tr>  </thead>');
    $( "#datepicker").val(di+"/"+me+"/"+an);
    db.view("myViews/contaListaTotal", {
	startkey : [an,me,di],
	endkey : [an,me,di,{}],
	group_level : 4,
	success: function(data){
	    var st=0.0;
	    console.log(data);
	    $("#listaContas").empty();
	    data.rows.map(function(row) {
		st=st+(row.value);
		$('#listaContas ').append(
		    '<tr id=m'+ row.value+"><td>"+row.key[2]+"-"+row.key[1]+"-"+row.key[0]
			+"</td><td>" +  row.key[3]
			+"</td><td>" +(parseFloat(row.value)).toFixed(2)
			+'</td></tr>');
	    });
	    $('#listaContas ').append(
		'<tr ><td></td><td>'+ "TOTAL"+"</td><td>"+st.toFixed(2)
		    +'</td></tr>');
	    

	}
    });
}







function pad2(number) {

	return (number < 10 ? '0' : '') + number

}
