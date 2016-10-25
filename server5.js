//This code is for getting all the projects and issues created on a specific date
var http= require('https');
var u = require("underscore");
var dateFormat = require('dateformat');
var date = require('date-and-time');
//var path = require('path');
var now = new Date();
var timestamp=date.format(now, 'YYYY-MM-DD HH:mm:ss');
var username = 'admin';
var password = 'ishu';
var buffer = new Buffer(username + ':' + password);
var base64String = buffer.toString('base64');
var authorization = 'Basic ' + base64String ;
var listofIssues;
var Details = new Object ();
var merge = require('merge')
var summation = new Object ();
var DataObject = new Object ();
var now = new Date();
var searchdate = date.format(now, 'YYYY/MM/DD');
var searchDate='2016-09-29';
var peter = '2016/9/20';
var Jira_Project_Name;
var array = [];
var j = 0;
var k =0;
var check;
var check2;
var options = {
	
	headers:{'Authorization': authorization},
	method:'GET',
	host:'169.50.118.94',
	port: 8443,
	//path:"/rest/api/2/search?jql=created>=%27"+peter+"%2006:00%27"
	path:'/rest/api/2/search?jql=created>=%272016/9/20%2006:00%27&&maxResults=1000'

};

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

http.request(options, function(res) {
	
  res.setEncoding('utf8');
 
  var body = '';
  
  res.on('data', function (data) {
  	
     body += data;
     //console.log(body);
     
     })
   res.on('end', function() {
	
 				listofIssues=JSON.parse(body).issues;
        //console.log(listofIssues.length);
 			    
 			    var count = Object.keys(listofIssues).length;
 			    
 			    for( var i = 0; i < listofIssues.length; i++ )                                    
 			    { 
            check = listofIssues[i].fields.project.name;
            //check2 = check;
                   
 			       for(  j = k; j < listofIssues.length; j++ )
            {
                           
              if (check === listofIssues[j].fields.project.name)
                {
                  
 			             DataObject= {Jira_Project_Name :listofIssues[j].fields.project.name ,Jira_Issue_Name: listofIssues[j].fields.summary,Jira_Issue_Id: listofIssues[j].id,Jira_Issue_Key: listofIssues[j].key,Jira_Issue_Created_Date: listofIssues[j].fields.created,Jira_Issue_Updated: listofIssues[j].fields.updated};
                
                    console.log( DataObject);
                    k++;
               
                };
             //check2 = listofIssues[j].fields.project.name;
            };
          
          };
                               
       })

}).end();



