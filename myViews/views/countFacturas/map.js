function(doc) {
if (doc.type=="factura") 
  emit(doc._id, doc.numFactura);

}