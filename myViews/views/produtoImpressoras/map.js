function(doc) {
if (doc.type=="produto") 
  emit((doc.impressoraPedido), doc.preco);

}