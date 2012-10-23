function(doc) {
var g=doc.diaSessao;
 
 
if (doc.type=="conta"||doc.type=="mesa"||doc.type=="factura") 
  emit([g[0],g[1],g[2],doc.empregado], doc.total);

}