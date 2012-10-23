function(doc) {
if (doc.type=="impressora") 
  emit(doc._id, doc);

}