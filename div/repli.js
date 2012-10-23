var cradle = require('cradle');var fs = require("fs");
var conn =new(cradle.Connection)('http://127.0.0.1', 5984, {cache: true, raw: false});

var db = conn.database('r61b');
//


/*
  db.get('', function (err, doc) {

  var last = doc.committed_update_seq;

  db.changes({ since: last, filter: "myViews/impressora", include_docs:true }).on('response', function (res) {
  console.log(res);
  console.log('rr');
  return enqueue(function (callback) { return execute("res.doc", callback); });
  res.on('end', function () { });
  });
  });
*/
console.log(db);

var dbR = conn.database('\_replicator')
dbR.get('myrep', function (err, doc) {
    console.log(err);
    console.log('----------');
    console.log(doc);
    if(err==null) {
	console.log(doc._replication_state );
	console.log(doc._id );
	var ndoc={ 'continuous': true,
		   'source'    : doc.source,
		   'target'    : doc.target}

	// db.save(ndoc,{})
	if(doc._replication_state=='error' )

	    db.save(doc._id,doc._rev,ndoc, function (err, res) {
		// Handle response
		console.log(res)
	    } )

	console.log(doc )
    }

});




db.view('myViews/mesasAbertas2',  { group : true },function (err, res) {
    console.log(res[0])
    /*
      for (var i = res.length - 1; i >= 0; i--) {
      console.log( res[i]);
      };*/

    res.forEach(function (row) {
	if(row.length>1){
	    db.get(row[0], function (err, doc) { 

		//console.log("-------------------------");
		//console.log(doc);
		//console.log("-------------------------");
		var lnF=(doc.linhaConta);    
		db.get(row[1], function (err2, doc2) { 
		    var tmF=doc2.linhaConta.length;
		    for (var i = 0; i<lnF.length ; i++) {
			lnF[i].linha=tmF+i;
			doc2.linhaConta.push(lnF[i]);
		    };

		    // console.log("Fianl222222");
		    // console.log(doc2);
		    // console.log("Fianl1111");
		    // console.log(doc);
		    // console.log("////////////  ");
		    //soma totais
		    var antI=doc2._id;
		    var antR=doc2._rev;
		    
		    var ndocN=doc2;
		    ndocN.total=doc2.total+doc.total;
		    delete ndocN._id;
		    delete ndocN._rev;
		    //save doc2


		    
		    db.save(antI,antR,ndocN, function (err, res) {
			// Handle response
			//	console.log(res)
		    } )
		    
		    //delete doc
		    //console.log("xxx "+doc._id);
		    //console.log("xxbbx "+doc2);
		 
		    db.remove(doc._id,doc._rev, function (err, res) {
			// Handle response
			console.log(res)
		    });
		    /*
		      db.remove(doc2._id,doc2._rev, function (err, res) {
		      // Handle response
		      console.log(res)
		      });
		    */

		})
	    })
	}
    });
});










