function(doc) {
var g=doc.diaSessao;
 
if (doc.type=="conta"||  doc.type=="mesa") {
   var nst=(doc.hora).match(/([0-9]?\d)(?::(\d\d))/);
    
        var  h=parseInt(nst[1],10)
        var  m=parseInt(nst[2],10)


  emit([g[0],g[1],g[2],h,m], doc);

}
}