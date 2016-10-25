//This code is to get the commits from a particular project in GitLab
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
                
  				console.log(body);
			});
};