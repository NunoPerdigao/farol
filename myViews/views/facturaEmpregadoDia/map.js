function(doc) {
var g=doc.diaSessao;
if (doc.type=="factura")   
emit([g[0],g[1],g[2],doc.numFactura], doc);
//if (doc.type=="conta"&& doc.aberta==false )   
//emit([g[0],g[1],g[2],doc.numFactura], doc);

}