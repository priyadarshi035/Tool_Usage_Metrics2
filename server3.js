//This Node.js code Calls GitLab Api to give the number of commits of a project and pushes the
//data into the cloudant Database.
//Name of the Database is Test.
//Cloudant Database Connectivity Setting------------------------------------------------------
var Cloudant = require('cloudant');
var me = "85686c07-cb41-4aa1-a121-56a9dae74828-bluemix"; // Set this to your own account
var password = "afa70fc4e03c2fd97a1efc68a6509157b180e11f0066022b8604259462d163bf";
// // Initialize the library with my account.
var cloudant = Cloudant({account:me, password:password});

cloudant.db.list(function(err, allDbs) {
//console.log('All my databases: %s', allDbs.join(', '))
 });
var test = cloudant.db.use('test')
//----------------------------------------------------------------------------------------------

console.log("Welcome");

getAllProduct();

function getAllProduct() {

	console.log("Starting getAllProduct");

	var request = require("request");

	process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
	request({
				uri: "https://169.50.113.30:8443/api/v3/projects/2/repository/commits",
				headers:{'PRIVATE-TOKEN':'1fkBozzsNVEbcBu9oQhu'},
				method: "GET",
				timeout: 10000,
				followRedirect: true,
				maxRedirects: 10
			},
			function(error, response, body) {

				console.log('in callback');
				console.log('Err: '+error);
				// var details = JSON.parse(body);
				// var detail = JSON.stringify(details);
				
                //var detail = "{" + "docs :" + body + "}";
                var detail = {
                	//"_id" : "5",
                	"Commit" : JSON.parse(body)
                };
               // console.log(detail);
  				// var details =  {
  				// 	            "-id" : "2";
  				// 	            body;
  				// }
 //Specifying to use the db named test------------------------------------------------------------
                                  var test = cloudant.db.use('test')
  				                  test.insert(detail, function(err, body, header) {
                                  if (err) {

                                  return console.log('[test.insert]', err.message);
                                   }

                                   console.log('You have inserted the data.');
                                   console.log(body);
                                   });
			});
};