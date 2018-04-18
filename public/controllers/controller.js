(function(){

	function GetAllService($http){
	
		function GetAll(){
			return $http.get("/jock/")
		}
	
		var factory = {
			GetAll: GetAll
		}

		return factory	
	}
    
	function CreateService($http){
	
		function Create(data){
			return $http.post("/jock", data)
		}

		var factory = {
			Create: Create
		}

		return factory

	}
   
	function Controller($scope, GetAllService,CreateService) {

		console.log("I am in controller")
		$scope.filteredTodos = []

		$scope.addContact = function() {	
			var promise = CreateService.Create($scope.contact)
			promise.then(function(){		  
				console.log("adding....")
			}) 
		}
	
		function buildUrl(url, parameters){
	  var qs = ""
	  for(var key in parameters) {
				var value = parameters[key]
				qs += encodeURIComponent(key) + "=" + encodeURIComponent(value) + "&"
	  }
	  if (qs.length > 0){
				qs = qs.substring(0, qs.length-1)
				url = url + "?" + qs
	  }
	  return url
		}
	
		$scope.refreshJock = function() {
			if (($scope.category!=undefined)&&($scope.count!=undefined)){
				var count = $scope.count
				var category = $scope.category
				var url = "/random/"
				var parameters = {
			  category: category,
			  count: count		  
				}
				var urlsend = buildUrl(url, parameters)
				$.ajax({
			  url: urlsend,
			  type: "GET",
			  data: {"category":category,
					 "count":count
			  },
			  cache: false,
			  success: function(response){
						$scope.filteredTodos=response
			   }
				})
			}
		}

		$scope.deselect = function() {
	  $scope.contact = ""
		}
	}//Controller

	angular
		.module("myApp", [])
		.factory("GetAllService", GetAllService)
		.factory("CreateService", CreateService)
		.controller("AppCtrl", Controller)

})()