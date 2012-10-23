function(doc) {
 
 
if (doc.type=="contadorCozinha") 
  emit(doc, doc.numero);

}