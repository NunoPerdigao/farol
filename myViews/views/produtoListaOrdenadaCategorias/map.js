function(doc) {
if (doc.type=="produto") 
  emit([doc.categoriaProduto, parseInt(doc.codProduto)], doc);

}