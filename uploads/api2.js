/*==========================================================================================*/
/*===================================Mapping Filiale========================================*/
/*==========================================================================================*/

router.get('/mappingsfa/:idf/:idsfa/:user', (req, res) => {

	
	var idf = req.params.idf;
	var idsfa = req.params.idsfa;
	var userId = req.params.user;
	var structure;
	
	
	db.collection("users").findOne({"username": userId}, function(err, user) {
		
		structure = user.structure;
		if(structure != "manutan"){
			var product;
			db.collection(structure).findOne({"ProductID" : idf}, function(err, product) {				
				console.log(product);
				if( product != null) {
					console.log("product");
					db.collection('mappingsfa').remove({"idf":idf});
					db.collection('mappingsfa').insert({"idf":idf, "idsfa":idsfa, "user":userId, "date": Date.now(), "statut":"provisoire" });
				} else {
					db.collection(structure).distinct("ProductID", {$or : [{"Classificationlevel1ID" : idf}, {"Classificationlevel2ID" : idf}, {"Classificationlevel3ID" : idf}, {"Classificationlevel4ID" : idf}, {"ModelID" : idf}] }, function(err, idproduct) {
						
						 if(idproduct != null){
							 idproduct.forEach((productline) => {
							 	db.collection('mappingsfa').findOne({"idf" : productline}, function(err, mapping) {	
									 console.log(productline);
									 if (mapping == null){
										 console.log("insert one");
										 db.collection('mappingsfa').insert({"idf": productline, "idsfa":idsfa, "user":userId, "date": Date.now(), "statut":"provisoire" });
									 } else {
										 console.log("Already existing");
									 }
							 	});	 
					 		});
						 }									
					});
				}	
			});	
		}
	});
});
/*=========================================================================================================================================================================*/
