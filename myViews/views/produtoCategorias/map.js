function(doc) {
if (doc.type=="produto") 
  emit((doc.categoriaProduto), doc.preco);

}