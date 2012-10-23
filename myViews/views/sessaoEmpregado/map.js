function(doc) {
if (doc.type=="factura"||doc.type=="conta") 
  emit([doc.diaSessao,doc.empregado], doc.total);

}