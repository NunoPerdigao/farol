var db = $.couch.db(getCurrentDBName());

function getCurrentDBName() {
    return window.location.pathname.split("/")[1];
}


function limpaFormP(){
    $("#categoriaProduto").empty();   
    $("#impressoraProduto").empty("");
    
    $('#idp').val("");    
    $('#revp').val("");   
    $('#idp').hide();    
    $('#revp').hide();
    $("input#codProduto").val("");   
    $("input#nomeProduto").val("");    
    $("input#precoProduto").val("");
    
}

function preencheCat(){
    $("#listaProdutos").empty();
    $('#listaProdutos ').append(' <thead>    <tr>      <th>codigo</th>      <th>nomeProduto</th><th>preco</th>      <th>categoriaProduto</th><th>impressoraPedido</th> </tr>  </thead>');

    var ct=$("#escolheCategoria :selected").text();

    db.view("myViews/produtoListaOrdenadaCategorias", {
	startkey: [ct,0],endkey: [ct,9999999999999],limit:100,
	success: function(data){
	    data.rows.map(function(row) { 
		$('#listaProdutos ').append('<tr id=m'+row.key[1]+"><td>"+ row.value.codProduto.toString()
					    +"</td><td>"+row.value.nomeProduto
					    +"</td><td>"+ row.value.preco
					    +"</td><td>    " + row.value.categoriaProduto  
					    +"</td><td> "+row.value.impressoraPedido
               				    +'</td></tr>'
					   );

		$('#m'+row.key[1]).click(function() {
		    preencheDados(row.key[1] );
		    //refreshItems();
		    
               	    return false;
          	});
		

 	    });
	    
	}
    });





}



function cates(){
    db.view('myViews/produtoCategorias',{
	"group_level":1,
	success: function(data2) {
	    $("#escolheCategoria").empty();
	$("#escolheCategoria").append('<option id= " "  >'+
					      '</option>');
	    for (var i = 0; i < data2.rows.length; i++){
	
		
		var ccat=" "  ;
		var cca2t=" "  ;
		if (data2.rows[i].key != undefined ) 
		{
		    ccat=data2.rows[i].key ;
		    ccat2=data2.rows[i].key ;
		}
		ccat = ccat.replace(/\'/g, '');
		ccat = ccat.replace(/\s/g, '');
		ccat = ccat.replace(/\./g, '');
		$("#escolheCategoria").append('<option id='+	ccat+' >'+
					      ccat2+'</option>');
		
	    }



	    
	    $("#escolheCategoria").change(
		function(a){
	
		    limpaFormP();
		    preencheCat();







		    
		}
	    );
	}
    });


}









$(document).ready(function() {
    cates();
    refreshItems();
    
    //botao "guardar"
    $('input#actualizaProduto').click(	function(e){
	var document={};
	document._id=$('#idp').val();
	document._rev=$('#revp').val();
	document.codProduto = $("input#codProduto").val();
	document.nomeProduto = $("input#nomeProduto").val();
	document.categoriaProduto = $("#categoriaProduto :selected").text(); 

	//console.log("input#categoriaProduto" + $("#impressoraProduto :selected").text()      );
	document.impressoraPedido = $("#impressoraProduto :selected").text(); 
	document.type = "produto";
	document.preco = parseFloat( $("input#precoProduto").val());
	db.saveDoc( document,{
	    success : function (){
	    },
	    error: function() {
		alert( "Cannot save new document." );
	    }   
	});
    });




    //TODO inserir "novo"
    $('input#insereProduto').click(function(e) {
 	if ($('#codProduto').val().length == 0  ) {
            return;
	}
	
	var document = {};
        document.codProduto = $("input#codProduto").val();
	document.nomeProduto = $("input#nomeProduto").val();
        document.categoriaProduto = $("input#categoriaProduto").val();
        document.impressoraPedido = $("input#impressoraProduto").val();
	document.type = "produto";
	document.preco =parseFloat( $("input#precoProduto").val());
	// document.creation_date = ( new Date() ).getTime();
        db.saveDoc( document, {
 	    success: function() {
                refreshItems();
            },
            error: function() {
                alert( "Cannot save new document." );
            }
        });
	
    });




    function refreshItems(){

	$("input#codProduto").keypress(function(e) {
	    if (e.which == 13)    {//Enter
	
		preencheDados(  $("input#codProduto").val()   );
	    }
	});
        
	$("#listaProdutos").empty();
	$('#listaProdutos ').append(' <thead>    <tr>      <th>codigo</th>      <th>nomeProduto</th><th>preco</th>      <th>categoriaProduto</th><th>impressoraPedido</th> </tr>  </thead>');

	limpaFormP();

	db.view("myViews/produtoListaOrdenada", {
	    success: function(data){
		data.rows.map(function(row) { 
		    $('#listaProdutos ').append('<tr id=m'+row.key+"><td>"+ row.value.codProduto.toString()
						+"</td><td>"+row.value.nomeProduto
						+"</td><td>"+ row.value.preco
						+"</td><td>    " + row.value.categoriaProduto  
						+"</td><td> "+row.value.impressoraPedido
               					+'</td></tr>'
					       );

		    $('#m'+row.key).click(function() {
			console.log('?????');
			preencheDados(row.key );
			//refreshItems();
			
               		return false;
          	    });
		    

 		});
		
	    }
	});


    }

});


 


function preencheDados(codP){
    console.log(codP);
    db.view("myViews/produtoLista", 
	    { "keys":[codP.toString() ],
	      success: function(data){
		  if(data.rows.length >0){
		      
 		      $('#idp').val(data.rows[0].value._id);
 		      $('#revp').val(data.rows[0].value._rev);
		      $("input#codProduto").val(parseInt(data.rows[0].value.codProduto));
		      $("input#nomeProduto").val(data.rows[0].value.nomeProduto);
		      $("#revp").hide();
		      $("#idp").hide();

		      db.view('myViews/produtoImpressoras',{
			  "group_level":1,
			  success: function(data2) {    
			      $("#impressoraProduto").empty("");
			      for (var i = 0; i < data2.rows.length; i++){
				  //  console.log( ".............." );
				  //  console.log( 	data2.rows[i] );
				  
				  var bcat=" "  ;
				  var bcat2=" "  ;
				  if (data2.rows[i].key != undefined ) 
				  {
				      bcat=data2.rows[i].key ;
				      bcat2=data2.rows[i].key ;
				  }
	

				  console.log("bcat");
				  console.log(bcat);
/*				  bcat = bcat.replace(/\'/g, '');
				  bcat = bcat.replace(/\s/g, '');
				  bcat = bcat.replace(/\./g, '');
*/
				  $("#impressoraProduto").append('<option id='+	bcat+' >'+
								bcat2+'</option>');
				  
			      }
			      var tta1="";
			      //console.log("???????????????");
			      //  console.log(data.rows[0].value.impressoraPedido);

			      if (data.rows[0].value.impressoraPedido==""  )
			      {tta1="";}
			      else if(data.rows[0].value.impressoraPedido==undefined ){
				  // console.log( data.rows[0].value.impressoraPedido );
			      }
			      else{
				  // console.log(tta1+'.sd.s..55ss.');
				  tta1=data.rows[0].value.impressoraPedido  ;
				  // console.log(tta+'.sd.s.34.ss.');
				  tta1 = tta1.replace(/\'/g, '');
				  tta1 = tta1.replace(/\s/g, '');
				  tta1 = tta1.replace(/\./g, ''); 
		       		  $("#impressoraProduto #"+tta1).attr("selected","selected");
			      }
			      $("#impressoraProduto").change( function(a){ });
			  }
		      });




		      db.view('myViews/produtoCategorias',{
			  "group_level":1,
			  success: function(data2) {
			      $("#categoriaProduto").empty();
			      for (var i = 0; i < data2.rows.length; i++){
				  //console.log( 	data2.rows[i].key );
				  
				  var ccat=" "  ;
				  var cca2t=" "  ;
				  if (data2.rows[i].key != undefined ) 
				  {
				      ccat=data2.rows[i].key ;
				      ccat2=data2.rows[i].key ;
				  }
				  ccat = ccat.replace(/\'/g, '');
				  ccat = ccat.replace(/\s/g, '');
				  ccat = ccat.replace(/\./g, '');
				  $("#categoriaProduto").append('<option id='+	ccat+' >'+
								ccat2+'</option>');
				  
			      }
			      //console.log(data.rows[0]);
			      if (data.rows[0].value.categoriaProduto=="" || data.rows[0].value.categoriaProduto==undefined )
			      {tta="";// console.log( data.rows[0].value.categoriaProduto );
			      }
			      else{
				  tta=data.rows[0].value.categoriaProduto  ; //console.log(tta);
				  tta = tta.replace(/\'/g, '');
				  tta = tta.replace(/\s/g, '');
				  tta = tta.replace(/\./g, ''); 
		       		  $("#categoriaProduto #"+tta).attr("selected","selected");
			      }
			      $("#categoriaProduto").change( function(a){ } );
			  }
		      });
		      //$("#categoriaProduto :selected").text();

		      if ( data.rows[0].value.impressoraPedido==undefined ) 
			  $("input#impressoraProduto").val(""); 
        	      else $("input#impressoraProduto").val(data.rows[0].value.impressoraPedido); 
		      $("input#precoProduto").val(data.rows[0].value.preco);
		      0
		      /*  if( data.rows[0].value.categoriaProduto==undefined)
        		  $("input#categoriaProduto").val(""  );
			  else{
		      */	  
		      /*	  }
		       */

		  }
		  else
		      alert("o codigo "+codP+" nao existe");

	      }


	    });



}


