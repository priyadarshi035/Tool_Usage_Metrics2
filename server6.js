var express = require('express'),
    app = express();
var u = require("underscore");
var dateFormat = require('dateformat');

function returnGitCountObj(projectId,GitCommitlist,date){
//get the job name 
var projectid=projectId;

var searchDate=date;
console.log('searchDate is ' + searchDate);

//get the count for a particular date.
var gitCount = u.filter(GitCommitlist, function(record){ return  dateFormat(record.created_at, "yyyy-mm-dd") === searchDate }).length;
//create a js object to add to count list
var gitCountRec = new Object ();
 
 gitCountRec= { Git_Project_ID : projectid, Commits_count : gitCount , date:searchDate};
 
 //return the json record to be added to the countlist
 return gitCountRec;
}


function getAllProduct(projectId) {

	console.log("Starting getAllProduct");

	var request = require("request");
	var uriValue = "https://169.50.113.30:8443/api/v3/projects/"+projectId+"/repository/commits";
	
	var options = {
				//uri: "https://169.50.113.30:8443/api/v3/projects/2/repository/commits",
				headers:{'PRIVATE-TOKEN':'1fkBozzsNVEbcBu9oQhu'},
				method: "GET",
				timeout: 10000,
				followRedirect: true,
				maxRedirects: 10
			};
			
		options['uri']=uriValue;
		
		var searchDate='2016-08-03';
		var id;
var saveDocument = function(id, name, value) {

	
	if(id === undefined) {
		// Generated random id
		id = '';
	}
	
	// db.insert({
	// 	name : name,
	// 	value : value
	// }, id, function(err, doc) {
	// 	if(err) {
	// 		console.log(err);
			
	// 	} else{
	// 		console.log(name+' Document Saved')
	// 	}
	// });
	
};
	process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
	request(options,function(error, response, body) {

				console.log('in callback');
				console.log('Err: '+error);
  				console.log(body);
				
				var gitCommits=JSON.parse(body);
				
				var commitsCountObj=returnGitCountObj(projectId,gitCommits,searchDate);
								
				saveDocument(id,'GITHub',commitsCountObj);
				
			});
};

app.get('/listGitHubHistory', function (req, res) {
		   console.log('getting GitHub data');
		// Make a new request to the target server to fetch the data
		   getAllProduct('2');
		   
});
app.listen(3000);