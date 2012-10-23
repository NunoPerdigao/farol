function(doc) {
if (doc.type=="empregado") 
  emit(doc.nome, doc);

}