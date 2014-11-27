describe('Testing Stock Application', function () {
    
    /* declare our mocks out here so we can use them through the scope */
    var $scope, ctrl, $http;

    // This function will be called before every "it" block.
    // This should be used to "reset" state for your tests.
    beforeEach(function () {

        // load the module you're testing.
        module('stockapp');

        // INJECT! This part is critical
        // $rootScope - injected to create a new $scope instance.
        // $controller - injected to create an instance of our controller.
        inject(function ($rootScope, $controller, $http) {
            // create a scope object for us to use.
            $scope = $rootScope.$new();


            $http = $http;
            // now run that scope through the controller function,
            // injecting any services or other injectables we need.
            // **NOTE**: this is the only time the controller function
            // will be run, so anything that occurs inside of that
            // will already be done before the first spec.
            ctrl = $controller('stockController', {
                $scope: $scope
            });
        });
    });

    it("Check AddStock() function ", function () {
        $scope.Stock.Name = "stock Test";
        $scope.Stock.StockPriceInfo = [];
        $scope.Stock.StockPriceInfo.push({
            Price: 1000,
            Day: new Date()
        });
        $scope.AddStock();
    });
});