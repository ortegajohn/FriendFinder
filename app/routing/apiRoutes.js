var friendData = require("../data/friends");


module.exports = function(app) {
    // API GET Requests
    // Below code handles when users "visit" a page.
    // In each of the below cases when a user visits a link
    // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
    // ---------------------------------------------------------------------------
  
    app.get("/api/friends", function(req, res) {
      res.json(friendData);
    });
  
  
    // API POST Requests
    // Below code handles when a user submits a form and thus submits data to the server.
    // In each of the below cases, when a user submits form data (a JSON object)
    // ...the JSON is pushed to the appropriate JavaScript array
    // (ex. User fills out a reservation request... this data is then sent to the server...
    // Then the server saves the data to the tableData array)
    // ---------------------------------------------------------------------------
  
    app.post("/api/friends", function(req, res) {
      // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
      // It will do this by sending out the value "true" have a table
      // req.body is available since we're using the body parsing middleware

      // console.log("apiR req.body.scores:",req.body.scores);
      let scores_to_match = req.body.scores;
      let total_def = 0;
      let index_of_match
  
      for(i=0;i<friendData.length;i++){//loop through existing scores
        let relitave_def = 0;
        // console.log("friendData[i].scores:",friendData[i].scores);
        for(j=0;j<friendData[i].scores.length;j++){
          // console.log("friendData[i].scores[j]:",friendData[i].scores[j])
          relitave_def += Math.abs(friendData[i].scores[j] - scores_to_match[j]);
        }
        // console.log("relitave_def: ",relitave_def);
        if(i == 0){
          total_def = relitave_def;
          index_of_match = i;
        }else if (total_def > relitave_def){
          total_def = relitave_def;
          index_of_match = i;          
        }

      }


      console.log("friendData[index_of_match].name: ",friendData[index_of_match].name)

      friendData.push(req.body);
      // res.json(true);
      res.json(friendData[index_of_match]);


      // console.log("friendData: ",friendData)
     
    });
  
    // ---------------------------------------------------------------------------
    // I added this below code so you could clear out the table while working with the functionality.
    // Don"t worry about it!
  
    // app.post("/api/clear", function(req, res) {
    //   // Empty out the arrays of data
    //   friendData.length = 0;
  
    //   res.json({ ok: true });
    // });
  };
  