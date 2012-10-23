function(doc) {
if (doc.type=="mesa"){

for (item in doc.linhaConta){
var a1={codProduto:  doc.linhaConta[item].codProduto, produto:  doc.linhaConta[item].produto, quantidadeLinha:  doc.linhaConta[item].quantidadeLinha, precoLinha:  doc.linhaConta[item].precoLinha, anulacao:  doc.linhaConta[item].anulacao, hora: doc.linhaConta[item].hora , linha:  doc.linhaConta[item].linha , "_id": doc._id ,  "_rev" :doc._rev  }
  emit(doc._id
       ,a1)}}

}