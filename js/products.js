var app = angular.module('Compounds', []);

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
			$scope.seriesFilter = search.series;
			break;
		default:
			$scope.familyFilter = '';
	}

	$scope.filterBy = function(x) {
		$scope.nameFilter = x; 
	}
	$scope.filterFamily = function(x) {
		$location.search({filter: x, series: ''});
		$scope.familyFilter = $location.search().filter;
		$scope.seriesFilter = $location.search().series;
		
	}
	$scope.filterSeries = function(x) {
		$location.search({filter: $scope.familyFilter, series: x});
		$scope.seriesFilter = $location.search().series;
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
