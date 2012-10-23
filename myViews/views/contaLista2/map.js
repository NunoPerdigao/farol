function(doc) {
var g=doc.diaSessao;
 
if (doc.type=="conta") 
  emit([g[0],g[1],g[2],doc.empregado], doc);

}