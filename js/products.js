var app = angular.module('Compounds', []);
var app2 = angular.module('Safety', []);

app2.controller('safetyCtrl', function($location, $scope, $http){
	$http.get("../products/compounds.php")
	.then(function (response) {
		$scope.safety_sheets = response.data.records;
	});
}) 

app.config(['$locationProvider', function($locationProvider){
  $locationProvider.html5Mode(true);   
}]);

app.controller('compoundCtrl', function($location, $scope, $http){
	$http.get("../products/compounds.php")
	.then(function (response) {
		$scope.compounds = response.data.records;
	});
	$scope.options = [{
		value: '1',
		label: '100 ug'
	}, {
		value: '5',
		label: '500 ug'
	}, {
		value: '10',
		label: '1 mg'
	}];
	var search = $location.search();
	switch(search.filter) {
		case "pNP":
		case "Az":
			$scope.familyFilter = search.filter;
			break;
		default:
			$scope.familyFilter = '';
	}	
	$scope.filterBy = function(x) {
		$scope.nameFilter = x; 
	}
	$scope.filterFamily = function(x) {
		$scope.familyFilter = x;
	}
	$scope.filterSeries = function(x) {
		$scope.seriesFilter = x;
	}
	$scope.availablity = function(x) {
		if(x === '#')
			return false;
		else if(x === '')
			return false;
		else
			return true;
	}
	$scope.noPrice = function(x) {
		if(x === '0') 
			return true;
		else
			return false;
	}
	$scope.displayPrice = function(price, multiplier) {
		price = Number(price);
		multiplier = Number(multiplier);
		if(multiplier === 5) {
			price = price * multiplier * .7;
		}
		else if(multiplier === 10) {
			price = price * multiplier * .6;
		}
		return price;
	}
	$scope.isPNP = function(family) {
		if(family === "pNP")
			return true;
		else
			return false;
	}
});
