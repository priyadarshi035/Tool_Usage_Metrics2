//This code is for getting all the projects and issues created on a specific date
//  Format of Output:
// { Jira_Project_Name: 'zephyr',
//   Tool_Name: 'Jira',
//   Ip: '169.50.118.94',
//   Timestamp: '2016-10-24 00:39:18',
//   Issues_Count: 1,
//   DataObject: [ '{"Jira_Issue_Name":"automation","Jira_Issue_Id":"10015","Jira_Issue_Key":"ZEP-1","Issue_Type":"Test","Jira_Issue_Created_Date":"2016-10-07T08:39:13.000+0000","Jira_Issue_Updated":"2016-10-07T08:39:13.000+0000"}' ] }



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
var array2 = [];
var j = 0;
var k =0;
var i = 0;
var Issues_Count =0;
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
 			    
 			    for(  i = k; i < listofIssues.length; i = k)                                    
 			    { 
            check = listofIssues[i].fields.project.name;
//             
		      for(  j = k; j < listofIssues.length; j++ )
            {    
             if (i === j)
            {   array = [] ;  
                Issues_Count = 0;
                
                };      
                          
              if (check === listofIssues[j].fields.project.name)
                {
                   Details = {Jira_Issue_Name: listofIssues[j].fields.summary,Jira_Issue_Id: listofIssues[j].id,Jira_Issue_Key: listofIssues[j].key,Issue_Type : listofIssues[j].fields.issuetype.name ,Jira_Issue_Created_Date: listofIssues[j].fields.created,Jira_Issue_Updated: listofIssues[j].fields.updated };
 			             //DataObject= {Jira_Project_Name :listofIssues[j].fields.project.name};
//console.log(Details);
                    Jira_Project_Name = listofIssues[j].fields.project.name;
                    
                    array.push(JSON.stringify(Details));
                    
                    k = k+1;
                    Issues_Count = Issues_Count+1;
                 };

                 if (j === listofIssues.length-1 )
                 {
                  DataObject= {Jira_Project_Name : Jira_Project_Name, Tool_Name : "Jira",Ip : options['host'],Timestamp:timestamp,Issues_Count : Issues_Count , DataObject : array};
                  console.log(DataObject); 
                 };
                 
              };
              
                
      
       };                        
       })

}).end();



