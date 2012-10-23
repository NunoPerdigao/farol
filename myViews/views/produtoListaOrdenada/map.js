function(doc) {
if (doc.type=="produto") 
  emit(parseInt(doc.codProduto), doc);

}