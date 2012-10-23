function(doc) {
if (doc.type=="conta") 
  emit(doc._id, doc);

}