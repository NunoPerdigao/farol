var libxmljs = require("libxmljs");

var cradle = require('cradle');var fs = require("fs");
var conn =new(cradle.Connection)('http://localhost', 5984,{cache: true,raw: false});
var db = conn.database('farol');


if(  process.argv[2] == undefined){
	console.log(" ");
	console.log(" ");
	console.log("\texemplo de utilizacao");
	console.log("\t---------------------");
	console.log(" ");
	console.log("\tnode xml.js inicio   fim");
	console.log(" ");
	console.log("\tnode xml.js 1/2/2012 3/5/2012");
	console.log(" ");
	//abortar
	process.exit(0);
}
// process.argv.forEach(function (val, index, array) {
//   console.log(index + ': ' + val);
// });
//console.log("inicio")
var data1= process.argv[2].split("/");
//console.log("fim")
var data2=(process.argv[3].split("/"));

var a1=parseInt(data1[2]);
var m1=parseInt(data1[1]);
var d1=parseInt(data1[0]);
var a2=parseInt(data2[2]);
var m2=parseInt(data2[1]);
var d2=parseInt(data2[0]);

var p = new Date();
var pMes=p.getMonth()+1;

var dataP1=''+a1
if(m1<10)
	dataP1=dataP1+'-0'+m1
else
	dataP1=dataP1+'-'+m1

if(d1<10)
	dataP1=dataP1+'-0'+d1
else
	dataP1=dataP1+'-'+d1

var dataP2=''+a2
if(m2<10)
	dataP2=dataP2+'-0'+m2
else
	dataP2=dataP2+'-'+m2

if(d2<10)
	dataP2=dataP2+'-0'+d2
else
	dataP2=dataP2+'-'+d2

var dataC=''+p.getFullYear()
if(pMes<10)
	dataC=dataC+'-0'+pMes
else
	dataC=dataC+'-'+pMes

if(p.getDate()<10)
	dataC=dataC+'-0'+p.getDate()
else
	dataC=dataC+'-'+p.getDate()


var xml2 = '<?xml version="1.0" encoding="UTF-8"?>'
+'<AuditFile xmlns="urn:OECD:StandardAuditFile-Tax:PT_1.01_01" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">'

+'<Header>'
+'  <AuditFileVersion>1.01_01</AuditFileVersion>'
+'  <CompanyID>111111</CompanyID>'
+'  <TaxRegistrationNumber>100000001</TaxRegistrationNumber>'
+'  <TaxAccountingBasis>I</TaxAccountingBasis>'
+'  <CompanyName>Cervejaria Restaurante, Lda</CompanyName>'
+'  <CompanyAddress>'
+'    <BuildingNumber>354</BuildingNumber>'
+'    <StreetName>Rua Sarmento Pimentel</StreetName>'
+'    <AddressDetail>Rua Sarmento Pimentel, 354</AddressDetail>'
+'    <City>Leca da Palmeira</City>'
+'    <PostalCode>4450-750</PostalCode>'
+'    <Region>Matosinhos</Region>'
+'    <Country>PT</Country>'
+'  </CompanyAddress>'
+'  <FiscalYear>2012</FiscalYear>'
+'  <StartDate>' + dataP1 +'</StartDate>'
+'  <EndDate>' + dataP2 +'</EndDate>'
+'  <CurrencyCode>EUR</CurrencyCode>'
+'  <DateCreated>' +dataC +'</DateCreated>'
+'<TaxEntity>Sede</TaxEntity>'
+ '<ProductCompanyTaxID>599999999</ProductCompanyTaxID>'
 + '   <SoftwareCertificateNumber>12345</SoftwareCertificateNumber>'


+'  <ProductID>Rest Alves/Soft</ProductID>'
+'  <ProductVersion>0.4</ProductVersion>'
+'    <Telephone>229969626</Telephone>'
+'    <Fax>229969620</Fax>'
+'<Email>restaurante@d.pt</Email>'
+'</Header>'
+'</AuditFile>'

/*
  <Product>
      <ProductType>I</ProductType>
      <ProductCode>IECCER033</ProductCode>
      <ProductDescription>Imposto Especial Consumo Cerveja 0.33</ProductDescription>
      <ProductNumberCode>IECCER033</ProductNumberCode>
    </Product>
    <Customer>
      <CustomerID>508650704</CustomerID>
      <AccountID>21110001</AccountID>
      <CustomerTaxID>508650704</CustomerTaxID>
      <CompanyName>Gomes &amp; Gomes, Lda.</CompanyName>
      <Contact>Sra. Maria Arminda Soares</Contact>
      <BillingAddress>
        <AddressDetail>Av. Liberdade, 435, R/C</AddressDetail>
        <City>Expo 98</City>
        <PostalCode>1050-007</PostalCode>
        <Country>PT</Country>
      </BillingAddress>
      <ShipToAddress>
        <AddressDetail>Rua Férra</AddressDetail>
        <City>Azambuja</City>
        <PostalCode>2050-010</PostalCode>
        <Country>PT</Country>
      </ShipToAddress>
      <Telephone>229725566</Telephone>
      <Fax>229725568</Fax>
      <Email>gomes_gomes@sapo.pt</Email>
      <Website>www.GomesAndGomes.pt</Website>
      <SelfBillingIndicator>0</SelfBillingIndicator>
    </Customer>
        <Supplier>
      <SupplierID>502531010</SupplierID>
      <AccountID>22110002</AccountID>
      <SupplierTaxID>502531010</SupplierTaxID>
      <CompanyName>Armazém Produtos Escritório, S.A.</CompanyName>
      <Contact>Sr. Rui Mateus</Contact>
      <BillingAddress>
        <AddressDetail>Av. Liberdade, 435, R/C</AddressDetail>
        <City>Expo 98</City>
        <PostalCode>1050-007</PostalCode>
        <Country>PT</Country>
      </BillingAddress>
      <ShipFromAddress>
        <AddressDetail>Leziria Park, Lt 56</AddressDetail>
        <City>Almeirim</City>
        <PostalCode>2080-027</PostalCode>
        <Country>PT</Country>
      </ShipFromAddress>
      <Telephone>244820930</Telephone>
      <Fax>244820990</Fax>
      <SelfBillingIndicator>0</SelfBillingIndicator>
    </Supplier>

    */  
    var xmlDoc2 = libxmljs.parseXmlString(xml2);



    var elem = xmlDoc2.root().node('MasterFiles');
/*
elem.attr({to: 'wongfoo'});
elem.text("texttoooo")
*/


db.view('myViews/produtoLista',
	function (err, res) {
		//console.log(err);
		//console.log(res);

		for(var pr=0;pr<res.length ;pr++) {
			var elemp=elem.node('Product');

			elemp.node('ProductType').text("P");//P de produto
			elemp.node('ProductCode').text(res[pr].value.codProduto);
			elemp.node('ProductGroup').text(res[pr].value.categoriaProduto);
			elemp.node('ProductDescription').text(res[pr].value.nomeProduto);
			elemp.node('ProductNumberCode').text(res[pr].value.codProduto);
			/*
			var elemp2=elem.node('Products');
			elemp2.node('ProductType').text("S");
			elemp2.node('ProductCode').text("3");
			elemp2.node('ProductGroup').text("Mensagens");
			elemp2.node('ProductDescription').text("Bem Passado")
			elemp2.node('ProductNumberCode')
			*/
			/*
			<Customer></Customer>
			<TaxTable></TaxTable>
			*/
		}


		var elemCust = elem.node('Customer')
		elemCust.node('CustomerID').text('502283963')
		elemCust.node('AccountID').text('21110023')
		elemCust.node('CustomerTaxID').text('123456789')
		elemCust.node('CompanyName').text('Clinte nao registado')
		var bilAdd=elemCust.node('BillingAddress')
bilAdd.node('AddressDetail').text('rua deserta')
bilAdd.node('City').text('rua deserta')
bilAdd.node('PostalCode').text('1234-123')
bilAdd.node('Country').text('PT')


		elemCust.node('SelfBillingIndicator').text('0')


		var sourElem = xmlDoc2.root().node('SourceDocuments');

		var salsElem = sourElem.node('SalesInvoices')
		salsElem.node('NumberOfEntries').text("12433");
		salsElem.node('TotalDebit').text("0.0000");
		salsElem.node('TotalCredit').text("29325.41");
		insereFacturas(salsElem);

	}
	);





function insereFacturas (salsElem){



	db.view('myViews/facturaEmpregadoDia',{startkey :[a1,m1,d1] ,
	// "["+a1+","+m1+","+d1+"]",
	endkey : [a2,m2,d2]},
	function (err, res) {
			//console.log("Ddddddddddddd");
			//console.log(res);
			for(var um=0;um<2/*res.length*/ ;um++) {
				/*factura individual*/ 
				var dataD=res[um].value.diaSessao[0]
				if(res[0].value.diaSessao[1]<10)
					dataD=dataD+'-0'+res[0].value.diaSessao[1]
				else
					dataD=dataD+'-'+res[0].value.diaSessao[1]
				if(res[0].value.diaSessao[2]<10)
					dataD=dataD+'-0'+res[0].value.diaSessao[2]
				else
					dataD=dataD+'-'+res[0].value.diaSessao[2]





				var invc1Elem =salsElem.node('Invoice');
				invc1Elem.node('InvoiceNo').text('FT '+res[um].value.numFactura+ '/1')
				invc1Elem.node('InvoiceStatus').text('N');
				invc1Elem.node('Hash').text('52fjEClltx2tF9m6/QTFynFjSuiboMslN');
				invc1Elem.node('HashControl').text('1');
				invc1Elem.node('Period').text(res[0].value.diaSessao[1])
				invc1Elem.node('InvoiceDate').text(dataD);
				//invc1Elem.node
				//Factura
				invc1Elem.node('InvoiceType').text("FT");
				invc1Elem.node('SelfBillingIndicator').text("0");
				invc1Elem.node('SystemEntryDate').text(dataD+'T00:00:00')
				invc1Elem.node('TransactionID').text('1111-01-01 VND 1')
				invc1Elem.node('CustomerID').text("502283963")

				

				var shipFromElem=invc1Elem.node('ShipFrom')
				shipFromElem.node('DeliveryID').text('id')
				shipFromElem.node('DeliveryDate').text(dataD);
				var adressFromElem=shipFromElem.node('Address');
				adressFromElem.node('BuildingNumber').text("354")
				adressFromElem.node('StreetName').text("Rua Sarmento Pimentel")
				adressFromElem.node('AddressDetail').text(
					"Rua Sarmento Pimentel, 354")
				adressFromElem.node('City').text("Leca da Palmeira")
				adressFromElem.node('PostalCode').text("4450")
				adressFromElem.node('Region').text("Matosinhos")
				adressFromElem.node('Country').text('PT');


	    	// console.log(res[um].value.numFactura+
	    	// "    \t"+res[um].value.diaSessao[0]+
	    	// "-"+res[0].value.diaSessao[1]+
	    	// "-"+res[0].value.diaSessao[2] 

	    	for(var i=0;i<res[um].value.linhaConta.length;i++){
	    		var linElem = invc1Elem.node("Line");
	    		linElem.node('LineNumber').text(
	    			res[um].value.linhaConta[i].linha+1);

	    		linElem.node('ProductCode').text(
	    			res[um].value.linhaConta[i].codProduto)
	    		linElem.node('ProductDescription').text(
	    			res[um].value.linhaConta[i].nomeProduto);
	    		linElem.node('Quantity').text(
	    			res[um].value.linhaConta[i].quantidadeLinha)
	    		linElem.node('UnitOfMeasure').text('UN')
	    		linElem.node('UnitPrice').text(
	    			res[um].value.linhaConta[i].preco.toFixed(2))
	    		linElem.node('TaxPointDate').text(dataD);
	    		 
	    		
		    linElem.node('Description').text(
	    			res[um].value.linhaConta[i].nomeProduto);
		    var prLin=parseFloat(res[um].value.linhaConta[i].precoLinha);
		    if (prLin > 0){
		    	//linElem.node('DebitAmount').text('0')
		    	linElem.node('CreditAmount').text(
		    		res[um].value.linhaConta[i].precoLinha)
		    }
		    else {
		    	linElem.node('DebitAmount').text(Math.abs(res[um].value.linhaConta[i].precoLinha) )
		    	//linElem.node('CreditAmount').text('0')
		    }


		    var linTxElem=linElem.node('Tax')
		    linTxElem.node('TaxType').text('IVA')
             linTxElem.node('TaxCountryRegion').text('PT')

		    linTxElem.node('TaxCode').text('NOR')
		    linTxElem.node('TaxPercentage').text('23')
		    linElem.node('SettlementAmount').text('0')

		}
		var invTotal=invc1Elem.node('DocumentTotals')
		invTotal.node('TaxPayable').text(
			(res[um].value.total.toFixed(2)*0.23).toFixed(2))
		invTotal.node('NetTotal').text(
			(res[um].value.total.toFixed(2)
				-res[um].value.total.toFixed(2)*0.23 ).toFixed(2) )
		invTotal.node('GrossTotal').text(res[um].value.total.toFixed(2))
			//	console.log("\t TOTAL  \t"+res[um].value.total.toFixed(2))
		}
		insereTaloes (salsElem);
		
	})
}

function insereTaloes (salsElem){
	db.view('myViews/contaLista2',{startkey :[a1,m1,d1] ,
	// "["+a1+","+m1+","+d1+"]",
	endkey : [a2,m2,d2]},
	function (err, res) {
			//console.log("Ddddddddddddd");
			//console.log(res);
			for(var um=0;um<res.length ;um++) {
				/*factura individual*/ 

				var dataD=res[um].value.diaSessao[0]
				if(res[0].value.diaSessao[1]<10)
					dataD=dataD+'-0'+res[0].value.diaSessao[1]
				else
					dataD=dataD+'-'+res[0].value.diaSessao[1]
				if(res[0].value.diaSessao[2]<10)
					dataD=dataD+'-0'+res[0].value.diaSessao[2]
				else
					dataD=dataD+'-'+res[0].value.diaSessao[2]

				var invc1Elem =salsElem.node('Invoice');
				invc1Elem.node('InvoiceNo').text('NC '+res[um].value._id+ '/1')
				invc1Elem.node('InvoiceStatus').text('N');
				invc1Elem.node('Hash').text('52fjEClltx2tF9m6/QTFynFjSuiboMslN');
				invc1Elem.node('HashControl').text('1');
				invc1Elem.node('Period').text(res[0].value.diaSessao[1])
				invc1Elem.node('InvoiceDate').text(dataD);
				//invc1Elem.node
				//Factura
				invc1Elem.node('InvoiceType').text("VD");//Venda a Dinheiro
				invc1Elem.node('SelfBillingIndicator').text("0");

				invc1Elem.node('SystemEntryDate').text(dataD+'T00:00:00')
				invc1Elem.node('TransactionID').text('1111-01-01 VND 1')
				invc1Elem.node('CustomerID').text("502283963")


				var shipFromElem=invc1Elem.node('ShipFrom')
				shipFromElem.node('DeliveryID').text('id')
				shipFromElem.node('DeliveryDate').text(dataD)
				var adressFromElem=shipFromElem.node('Address');
				adressFromElem.node('BuildingNumber').text("354")
				adressFromElem.node('StreetName').text("Rua Sarmento Pimentel")
				adressFromElem.node('AddressDetail').text(
					"Rua Sarmento Pimentel, 354")
				adressFromElem.node('City').text("Leca da Palmeira")
				adressFromElem.node('PostalCode').text("4450")
				adressFromElem.node('Region').text("Matosinhos")
				adressFromElem.node('Country').text('PT');


	    	// console.log(res[um].value.numFactura+
	    	// "    \t"+res[um].value.diaSessao[0]+
	    	// "-"+res[0].value.diaSessao[1]+
	    	// "-"+res[0].value.diaSessao[2] 

	    	for(var i=0;i<res[um].value.linhaConta.length;i++){
	    		var linElem = invc1Elem.node("Line");
	    		linElem.node('LineNumber').text(
	    			res[um].value.linhaConta[i].linha+1);
	    		

	    		linElem.node('ProductCode').text(
	    			res[um].value.linhaConta[i].codProduto)
	    		linElem.node('ProductDescription').text(
	    			res[um].value.linhaConta[i].nomeProduto);
	    		linElem.node('Quantity').text(
	    			res[um].value.linhaConta[i].quantidadeLinha)
	    		linElem.node('UnitOfMeasure').text('UN')
	    		linElem.node('UnitPrice').text(
	    			res[um].value.linhaConta[i].preco.toFixed(2))
	    		linElem.node('TaxPointDate').text(dataD);
	    		
		    linElem.node('Description').text(
	    			res[um].value.linhaConta[i].nomeProduto);
		    var prLin=parseFloat(res[um].value.linhaConta[i].precoLinha);
		    if (prLin > 0){
		    	//linElem.node('DebitAmount').text('0')
		    	linElem.node('CreditAmount').text(
		    		res[um].value.linhaConta[i].precoLinha)
		    }
		    else {
		    	linElem.node('DebitAmount').text(Math.abs(res[um].value.linhaConta[i].precoLinha) )
		    	//linElem.node('CreditAmount').text('0')
		    }


		    var linTxElem=linElem.node('Tax')
		    linTxElem.node('TaxType').text('IVA')
              linTxElem.node('TaxCountryRegion').text('PT')

		    linTxElem.node('TaxCode').text('NOR')
		    linTxElem.node('TaxPercentage').text('23')
		    linElem.node('SettlementAmount').text('0')

		}
		var invTotal=invc1Elem.node('DocumentTotals')
		invTotal.node('TaxPayable').text(
			(res[um].value.total.toFixed(2)*0.23).toFixed(2))
		invTotal.node('NetTotal').text(
			(res[um].value.total.toFixed(2)
				-res[um].value.total.toFixed(2)*0.23 ).toFixed(2) )
		invTotal.node('GrossTotal').text(res[um].value.total.toFixed(2))
			//	console.log("\t TOTAL  \t"+res[um].value.total.toFixed(2))
		}
		
		var re =  /(<\/(\w+)>)/gi;
		var re2 =  /(<(\w+)\/>)/gi;
		var re3 =  /(><)/gi;
		console.log(xmlDoc2.toString().replace(re,"$1\n").replace(re2,"$1\n").replace(re3,">\n<") );
	})
}
/*


//factura individual
var invc1Elem =salsElem.node('Invoice22222');
invc1Elem.node('InvoiceNo').text("5555555555")
invc1Elem.node('Period').text("10")
invc1Elem.node('InvoiceDate').text("2008-10-03")
invc1Elem.node('InvoiceType').text("Venda a dinheiro")
invc1Elem.node('SystemEntryDate').text("2008-10-03T12:42:00")
invc1Elem.node('TransationID')
invc1Elem.node('CustomerID').text("9222222")



var shipToElem=invc1Elem.node('ShipTo')
shipToElem.node('DeliveryID')
shipToElem.node('DeliveryDate')
var adressElem=shipToElem.node('Address');
adressElem.node('BuildingNumber')
adressElem.node('StreetName')
adressElem.node('AddressDetail').text("Rua Sarmento Pimentel, 354")
adressElem.node('City').text("Leca da Palmeira")
adressElem.node('PostalCode').text("4450")
adressElem.node('Region')
adressElem.node('Country').text('Portugal')
var shipFromElem=invc1Elem.node('ShipFrom')
shipFromElem.node('DeliveryID')
shipFromElem.node('DeliveryDate')
var adressFromElem=shipFromElem.node('Address');
adressFromElem.node('BuildingNumber')
adressFromElem.node('StreetName')
adressFromElem.node('AddressDetail').text("Rua Sarmento Pimentel, 354")
adressFromElem.node('City').text("Leca da Palmeira")
adressFromElem.node('PostalCode').text("4450")
adressFromElem.node('Region')
adressFromElem.node('Country').text('Portugal')

//linha
var linElem = invc1Elem.node("line");
linElem.node('LineNumber').text('1');
var orRElem = linElem.node('OrderReference')
orRElem.node('OriginationON')
orRElem.node('OrderDate')

linElem.node('ProductCode').text('47')
linElem.node('ProductDescription').text('Pao Normal');
linElem.node('Quantity').text('1')
linElem.node('UnitOfMeasure')
linElem.node('UnitPrice').text('0.26')
linElem.node('TaxPointDate')
var linRefElem=linElem.node('References')
var linCrNElem=linRefElem.node('CreditNote')
linCrNElem.node('Reference')
linCrNElem.node('Reason')
//    <CreditNote><Reference/><Reason/></CreditNote>
linElem.node('Description')
linElem.node('DebitAmount').text('0')
linElem.node('CreditAmount').text('0.26')
var linTxElem=linElem.node('Tax')
linTxElem.node('TaxType')
linTxElem.node('TaxCode')
linTxElem.node('Percentage').text('23')
linElem.node('SettlementAmount').text('0')

//totais
var invTotal=invc1Elem.node('DocumentsTotals')
invTotal.node('TaxPayable').text('6.16')
invTotal.node('NetTotal').text('45.09')
invTotal.node('GrosTotal').text('51.25')
*/
//console.log(xmlDoc2.toString());

