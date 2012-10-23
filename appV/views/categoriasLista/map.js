function(doc) {
if (doc.type=="produto") 
if((doc.nomeProduto).substring(0,3)=="1/2")
  emit([doc.categoriaProduto, (doc.nomeProduto).slice(3)+" 1/2"],  { "nome" : doc.nomeProduto , "codigo" : doc.codProduto});
else
 emit([doc.categoriaProduto, (doc.nomeProduto)],  { "nome" : doc.nomeProduto , "codigo" : doc.codProduto});
}