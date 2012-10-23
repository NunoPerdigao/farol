function(doc) {
if (doc.type=="factura") 
 {
  if(typeof(doc.numFactura)=="number")
    emit(doc._id, doc.numFactura);
  else
    emit(doc._id, 1);
 }
}