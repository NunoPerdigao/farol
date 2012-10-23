function(doc) {
if (doc.type=="factura") 
  emit( doc.numFactura , doc);

}