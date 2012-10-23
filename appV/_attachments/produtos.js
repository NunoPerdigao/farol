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
		$('#listaProdutos ').append(
		    '<tr id=m'+row.key[1]+"><td>"+ row.value.codProduto.toString()
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
		$("#escolheCategoria").append(
		    '<option id='+	ccat+' >'+
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

function checkRegexp(o,regexp,n) {
    if ( !( regexp.test( o.val() ) ) ) {
        o.addClass('ui-state-error');
        updateTips(n);
        return false;
    } else {
        return true;
    }
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
	alert("ddddd");
console.log("iiiii")

console.log(
($('#idp').val())
);
console.log(
($('#idp').val()).length
);
if( ($('#idp').val()).length>0)
{
	db.saveDoc( document,{
	    success : function (){
	    },
	    error: function() {
		alert( "Cannot save new document." );
	    }   
	});}
else 
	alert("o produto nao foi criado");
	
    });
    
    var codigo= $( "#codigoP" ),
        nome  = $( "#nomeP" ),
        preco = $( "#precoP" ),
        impressora=$("#impressoraP2"),
        categoria=$("#categoriaP"),
        allFields = $( [] ).add( codigo ).add(nome  ).add( preco ),
        tips = $( ".validateTips" );

    function updateTips( t ) {
        tips
            .text( t )
            .addClass( "ui-state-highlight" );
        setTimeout(function() {
                tips.removeClass( "ui-state-highlight", 1500 );
        }, 500 );
    }
    
    

    function checkLength( o, n, min, max ) {
	if ( o.val().length > max 
	     || o.val().length < min ) {
	    
	    o.addClass( "ui-state-error" );
	    updateTips( "O tamanho de  " + n 
			+ " tem de ser entre " +
			min + " e " + max + "." 
		      );
	    return false;
	} else {
	    return true;
	}
    }
    
    $( "#dialog-form" ).dialog({
	autoOpen: false,
	height: 400,
	width: 350,
	modal: true,
	buttons: {
	    "Criar produto": function() {
		var bValid = true;
		allFields.removeClass( "ui-state-error" );

		bValid = bValid && checkLength( codigo, 
						"codigo", 1, 16 );
		bValid = bValid && checkLength( nome, 
						"nome", 4, 23 );
		bValid = bValid && checkLength( preco, 
						"preço", 1, 16 );
		bValid = bValid && checkRegexp( nome, 
						/^[0-9a-z]([0-9a-z_])+$/i, 
						"Username may consiswedweft o" );
		bValid = bValid && checkRegexp( codigo,
						/^([0-9])+$/,
						"Password field only"
					      );
		bValid = bValid && checkRegexp( preco,
						/^([0-9])+(.[0-9]?[0-9]?)?$/i,
						"Usrnas, begin with a letter." );
		
		// From jquery.validate.js (by joern), contributed by Scott Gonzalez: http://projects.scottsplayground.com/email_address_validation/
		/*
		  
		  bValid = bValid && checkRegexp( email, /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i, "eg. ui@jquery.com" );

		*/

		if ( bValid ) {
		    /*name      = $( "#codigoP" ),
		      email     = $( "#nomeP" ),
		      password  = $( "#precoP" ),
		    */     
		    $( "#users tbody" ).append( 
			"<tr>" +
			    "<td>" + nome.val() + "</td>" + 
			    "<td>" + codigo.val() + "</td>" + 
			    "<td>" + preco.val() + "</td>" +
			    "</tr>" 	
		    );
		    
		    console.log(     
			codigo.val()
		    );
		    var estDial=$( this );
		    db.view("myViews/produtoLista", 
			    { "keys":[codigo.val().trim().toString() ],
			      success: function(data){
				  console.log("lllll   "+data.rows.length)
				  if(data.rows.length >0){
				      // produto ja existe ano pode inserir
				      alert("Codigo do produto ja existe");
				      console.log(     
 					  data.rows[0].value._id
 				      );
				      console.log( 
					  data.rows[0].value.nomeProduto
				      );				  
				  }
				  else{
				      // insere produto
				      var document = {};
				      document.codProduto =
					  codigo.val();
					  //$("input#codProduto").val();
				      document.nomeProduto = 
					  nome.val();
					  //$("input#nomeProduto").val();
				      
				      document.categoriaProduto=
					  categoria.val();
				      document.impressoraPedido=
					  impressora.val()
				      document.type = 
					  "produto";
				      document.preco =
					  parseFloat(preco.val());
				      db.saveDoc( document, {
 					  success: function() {
					      alert("Produto criado");
					      estDial.dialog( "close" );
					  },
					  error: function() {
					      alert( "Erro ao gravar o produto." );
					      estDial.dialog( "close" );
					  }
				      });
				      

				      // console.log(document);
				      		  
				  }
			      }
			      
			      
			      
			    });
		    //TODO inserir "novo"
		    // insere produto
		    
		    /*	if ($('#codProduto').val().length == 0  ) {
			return;
			}
			var document = {};
			document.codProduto = $("input#codProduto").val();
			document.nomeProduto = $("input#nomeProduto").val();
			document.categoriaProduto=$("input#categoriaProduto").val();
			document.impressoraPedido=$("input#impressoraProduto").val()
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
		    */	
		    
		}
	    },
	    Cancel: function() {
		alert("nao inseriu nenhum produto\n"+$( "#codigoP" ).val()+" - "+codigo.val());
		$( this ).dialog( "close" );
		
	    }
	},
	close: function() {
	    allFields.val( "" ).removeClass( "ui-state-error" );
	},
 	open: function() {

	    db.view('myViews/produtoImpressoras',{

		"group_level":1,
		success: function(data2) {    
		     $("#impressoraP2").empty("");

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
			bcat = bcat.replace(/\'/g, '');
			bcat = bcat.replace(/\s/g, '');
			bcat = bcat.replace(/\./g, '');
			bcat = bcat.replace(/\//g, '');
			bcat = bcat.replace(/\+/g, '');
			$("#impressoraP2").append(
			    '<option id='+	bcat+' >'+
				bcat2+'</option>');
			}
		}		
	    });

	    db.view('myViews/produtoCategorias',{
		"group_level":1,
		success: function(data2) {
		    $("#categoriaP").empty();
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
			$("#categoriaP").append(
			    '<option id='+	ccat+' >'+
				ccat2+'</option>');
		    }
		}
	    });
	    
	}
    });
    

    $('input#insereProduto').click(function(e) {
	// alert("2ppppiippii");
	$( "#dialog-form" ).dialog( "open" );

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
		    $('#listaProdutos ').append(
			'<tr id=m'+row.key+"><td>"+ row.value.codProduto.toString()
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
		      $("input#codProduto").val(
			  parseInt(data.rows[0].value.codProduto));
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
				  bcat = bcat.replace(/\'/g, '');
				  bcat = bcat.replace(/\s/g, '');
				  bcat = bcat.replace(/\./g, '');
				  bcat = bcat.replace(/\//g, '');
				  bcat = bcat.replace(/\+/g, '');

				  $("#impressoraProduto").append(
				      '<option id='+	bcat+' >'+
					  bcat2+'</option>');
				  
			      }
			      var tta1="";
			      //console.log("???????????????");
			      //  console.log(data.rows[0].value.impressoraPedido);

			      if (data.rows[0].value.impressoraPedido==""  )
			      {tta1="";}
			      else  if(data.rows[0].value.impressoraPedido==undefined)
			      {
				  // console.log( data.rows[0].value.impressoraPedido );
			      }
			      else{
				  tta1=data.rows[0].value.impressoraPedido  ;
				  
				  console.log(tta1+'.sd.s..55ss.'); 
				  tta1 = tta1.replace(/\'/g, '');
				  tta1 = tta1.replace(/\s/g, '');
				  tta1 = tta1.replace(/\//g, '');
				  tta1 = tta1.replace(/\+/g, '');
				  tta1 = tta1.replace(/\./g, ''); 
		       		  $("#impressoraProduto #"+tta1).attr(
				      "selected","selected");
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
				  ccat = ccat.replace(/\//g, '');
				  // console.log("cat  - "+ccat);
				  $("#categoriaProduto").append(
				      '<option id='+	ccat+' >'+
					  ccat2+'</option>');
				  
			      }
			      //console.log(data.rows[0]);
			      if (data.rows[0].value.categoriaProduto=="" 
				  || data.rows[0].value.categoriaProduto==undefined )
			      {
				  tta="";
				  // console.log( data.rows[0].value.categoriaProduto );
			      }
			      else{
				  tta=data.rows[0].value.categoriaProduto  ; 
				  //console.log(tta);
				  tta = tta.replace(/\'/g, '');
				  tta = tta.replace(/\s/g, '');
				  tta = tta.replace(/\./g, ''); 
// o  selector jquery nao funciona com carateres especias \ +
				  tta = tta.replace(/\//g, '');
				  // console.log("rtta -"+tta);
		       		  $("#categoriaProduto #"+tta).attr("selected","selected");
			      }
			      $("#categoriaProduto").change( function(a){ } );
			  }
		      });
		      //$("#categoriaProduto :selected").text();

		      if ( data.rows[0].value.impressoraPedido==undefined ) 
			  $("input#impressoraProduto").val(""); 
        	      else 
			  $("input#impressoraProduto").val(
			      data.rows[0].value.impressoraPedido); 
		      $("input#precoProduto").val(data.rows[0].value.preco);
		      
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


