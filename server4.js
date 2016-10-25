//code for JIRA



console.log("Welcome");

getAllProduct();

function getAllProduct() {

	console.log("Starting getAllProduct");

	var request = require("request");

	process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
	request({
				uri: "https://169.50.118.94:8443/rest/api/2/search?jql=created%3E=%272016/9/23%2012:00%27",
				headers:{'Content-Type: application/json'},
				method: "GET",
				timeout: 10000,
				followRedirect: true,
				maxRedirects: 10
			},
			function(error, response, body) {

				console.log('in callback');
				console.log('Err: '+error);
                
  				console.log(body);
			});
};