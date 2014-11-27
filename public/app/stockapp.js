var app = angular.module('stockapp', ['ngRoute', 'stockcontrollers', 'ui.bootstrap']);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/', {
            controller: 'stockController',
            templateUrl: '/views/addstock.html'
        })
        .when('/stocks', {
            controller: 'stockviewcontroller',
            templateUrl: '/views/stocks.html'
        })
        .otherwise({
            redirectTo: '/'
        });
}]);

app.directive('format', ['$filter', function ($filter) {
    return {
        require: '?ngModel',
        link: function (scope, elem, attrs, ctrl) {
            if (!ctrl) return;


            ctrl.$formatters.unshift(function (a) {
                return $filter(attrs.format)(ctrl.$modelValue)
            });


            ctrl.$parsers.unshift(function (viewValue) {

                elem.priceFormat({
                    prefix: '$',
                    centsSeparator: '.',
                    thousandsSeparator: ','
                });

                return elem[0].value;
            });
        }
    };
}]);

app.directive('linechart', function () {
    return {
        link: function (scope, element, attrs) {
            scope.$watch(attrs.chartdata, function () {
                setTimeout(function () {
                    var jsonData = scope[attrs.chartdata];
                    var chart = c3.generate({
                        bindto: "#chart",
                        data: {
                            columns: jsonData
                        }
                    });
                }, 1000);
            });

            setTimeout(function () {
                var jsonData = scope[attrs.chartdata];
                var chart = c3.generate({
                    bindto: "#chart",
                    data: {
                        columns: jsonData
                    }
                });
            }, 1000)
        },
        template: '<div id="chart"></div>'
    };
});
