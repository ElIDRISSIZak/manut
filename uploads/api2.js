// Insert JSON format is database from SFA
    router.get('/insertion3', (req, res) => {
        var collection;
    connection((db) => {
        collection = db.collection('productsmanutan');
         //console.log(collection);
    });
    //console.log(collection);
   
    var fs = require('fs');
    fs.readFile('uploads/step-XML-V0.1 - 1 SFA.xml', (err, data) => {
        if (err) throw err;
        // var json = JSON.parse(data);
        var parser = new xml2js.Parser({ attrkey: 'attribut' });
        parser.parseString(data, function (err, result) {
            // res.json(result);
            console.log("=>",result, "<="); 
            var last = 0;
            var products = result['STEP-ProductInformation']['Products'];
            // suppression des données dans la collection productsmanutan
            connection((db) => {
               db.collection('productsmanutan').deleteMany({}); 
            });
            //insertion des product avec item product par product
            products.forEach((item) => {
                
                connection((db) => {
                    db.collection('productsmanutan').insert(item['Product'], {safe: true});
                });
            });                    
        if(err) throw err;           
        });
            res.json("file inserted ");
      });
    });
    
    // Insert JSON format is database from SFA Attribute
    router.get('/insertion4', (req, res) => {
        var collection;
    connection((db) => {
        collection = db.collection('attribute');
         //console.log(collection);
    });
    //console.log(collection);
   
    var fs = require('fs');
    fs.readFile('uploads/step-XML-V0.1 - 1 SFA.xml', (err, data) => {
        if (err) throw err;
        // var json = JSON.parse(data);
        var parser = new xml2js.Parser({ attrkey: 'attribut' });
        parser.parseString(data, function (err, result) {
            // res.json(result);
            console.log("=>",result, "<="); 
            var last1 = 0;
            var attribute = result['STEP-ProductInformation']['AttributeList'];
            console.log(result);
            // suppression des données dans la collection productsmanutan
            connection((db) => {
               db.collection('attribute').deleteMany({}); 
            });
            //insertion des product avec item product par product
            attribute.forEach((obj) => {
                
                connection((db) => {
                    db.collection('attribute').insert(obj['Attribute'], {safe: true});
                });
            });                    
        if(err) throw err;           
        });
            res.json("file inserted ");
      });
    });
    
   // csv to json 
    router.get('/csv', (req, res) => {
    
    var collection;
    connection((db) => {
        collection = db.collection('filiale1');
         //console.log(collection);
    });
 
    var json = csvToJson.getJsonFromCsv("uploads/filiale1.csv");
    for(var i=0; i<json.length;i++){
        console.log(json[i]);
    }

   //console.log(json);
   var fs = require('fs');
        var fileInputName = 'uploads/filiale1.csv'; 
        var fileOutputName = 'uploads/fil.json';
         
        csvToJson.generateJsonFileFromCsv(fileInputName,fileOutputName);
      fs.readFile(fileOutputName, 'utf8', function (erreur, donnees) {
         if (erreur)
            throw erreur; // Vous pouvez gérer les erreurs avant de parser le JSON
         var filiales1 = JSON.parse(donnees);
         
            connection((db) => {
               db.collection('filiale1').deleteMany({}); 
            });
         
         filiales1.forEach((objf1) => {
            
                connection((db) => {
                    db.collection('filiale1').insert(objf1, {safe: true});
                });
         });    
      }); 
  });
    
        // Insert JSON format is database from SFA Unit
    router.get('/insertion5', (req, res) => {
        var collection;
    connection((db) => {
        collection = db.collection('unit');
         //console.log(collection);
    });
    //console.log(collection);
   
    var fs = require('fs');
    fs.readFile('uploads/step-XML-V0.1 - 1 SFA.xml', (err, data) => {
        if (err) throw err;
        // var json = JSON.parse(data);
        var parser = new xml2js.Parser({ attrkey: 'attribut' });
        parser.parseString(data, function (err, result) {
            // res.json(result);
            console.log("=>",result, "<="); 
            var last1 = 0;
            var unit = result['STEP-ProductInformation']['UnitList'];
            console.log(result);
            // suppression des données dans la collection productsmanutan
            connection((db) => {
               db.collection('unit').deleteMany({}); 
            });
            //insertion des product avec item product par product
            unit.forEach((obj1) => {
                
                connection((db) => {
                    db.collection('unit').insert(obj1['Unit'], {safe: true});
                });
            });                    
        if(err) throw err;           
        });
            res.json("file inserted ");
      });
    });
