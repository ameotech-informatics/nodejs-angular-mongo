angular.module('stockcontrollers', [])
.controller('stockController', ['$scope', '$http',
      function ($scope, $http) {
          //Create StockPrice object.
          $scope.StockPrice = { Price: 0, Day: new Date(), OpenDatePicker: false };

          //Copy the stockPrice object to PriceInfo.
          $scope.PriceInfo = [angular.copy($scope.StockPrice)];

          $scope.Message = {};

          //Var to hold stock info.
          $scope.Stock = {
              Name: "",
              StockPriceInfo: []
          };

          //Add the price and day textboxes from the addstock.html page.
          $scope.AddMoreStockPriceInfo = function () {
              $scope.PriceInfo.push(angular.copy($scope.StockPrice));
          }

          //Remove the price and day textboxes from the addstock.html page. 
          $scope.RemoveStockPriceInfo = function (stockPriceIndex) {
              $scope.PriceInfo.splice(stockPriceIndex, 1);
          }

          //Open popup calender for Day field in addstock.html page.
          $scope.OpenCalender = function ($event, priceInfo) {
              $event.preventDefault();
              $event.stopPropagation();
              priceInfo.OpenDatePicker = true;
          }

          //Add stock in DB
          $scope.AddStock = function (valid) {
              if (valid) {
                  var stockInfo = {
                      Name: "",
                      CreatedDate: new Date(),
                      StockPriceInfo: []
                  };

                  stockInfo.Name = $scope.Stock.Name;

                  stockInfo.StockPriceInfo = [];

                  if ($scope.PriceInfo.length > 0) {
                      for (var pInfo in $scope.PriceInfo) {
                          var priceInfo = $scope.PriceInfo[pInfo];
                          stockInfo.StockPriceInfo.push({
                              Price: parseFloat(priceInfo.Price.replace("$", "").replace(",", "")),
                              // Price: parseFloat($scope.FormatNumber(priceInfo.Price)),
                              Day: new Date(priceInfo.Day)
                          });
                      }
                  }

                  $http.post('/api/addstock', stockInfo)
                      .success(function (data) {
                          $scope.Stock = {}; // clear the form so our user is ready to enter another                      
                          $scope.PriceInfo = [angular.copy($scope.StockPrice)];
                          $scope.Message = { Text: "Stock has been added successfully", Result: true };
                      })
                    .error(function (data) {
                        $scope.Message = { Text: "Something went wrong! Please try again later...", Result: false };
                        console.log('Error: ' + data);
                    });
              }
          }
      }])

.controller('stockviewcontroller', ['$scope', '$http',
    function ($scope, $http) {

        $scope.Stocks = [];

        //Get all stocks from the DB
        $scope.GetAllStocks = function () {
            $http.get('/api/stocks')
                .success(function (data) {
                    $scope.Stocks = data;
                    $scope.GeneratePriceInfoChartData();
                    $scope.Stocks = $scope.Stocks.reverse();
                    $scope.AttachShowHideOfPrices($scope.Stocks);
                })
              .error(function (data) {
                  console.log('Error: ' + data);
              });
        }

        //Show and hide prices from the list of stocks. 
        $scope.AttachShowHideOfPrices = function (items) {
            for (var stock in items) {
                var addedStock = items[stock];
                addedStock.ShowPrice = true;
            }
        }

        $scope.StartDate = "";
        $scope.EndDate = "";

        $scope.OpenStartDateCalender = false;
        $scope.OpenEndDateCalender = false;

        //Open popup calenders for start and end date.
        $scope.OpenDateCalender = function ($event, startDate) {
            $event.preventDefault();
            $event.stopPropagation();
            if (startDate) {
                $scope.OpenStartDateCalender = true;
            }
            else {
                $scope.OpenEndDateCalender = true;
            }
        }

        //Show prices in stocks.html page.
        $scope.ShowPrices = function (stock) {
            stock.ShowPrice = !stock.ShowPrice;
        }

        //Search stocks based on start and end date.
        $scope.Search = function () {
            var startDate = $scope.StartDate;
            var endDate = $scope.EndDate;
            $http.get('/api/searchAll/' + new Date(startDate).toISOString() + "/" + new Date(endDate).toISOString())
                .success(function (data) {
                    $scope.Stocks = data;
                    $scope.GeneratePriceInfoChartData();
                    $scope.Stocks = $scope.Stocks.reverse();
                    $scope.AttachShowHideOfPrices($scope.Stocks);
                })
              .error(function (data) {
                  console.log('Error: ' + data);
              });
        }

        //Calls the GetAllStocks() method.
        $scope.GetAllStocks();

        $scope.ChartData = [];

        $scope.GeneratePriceInfoChartData = function () {
            $scope.ChartData = [];
            var added = false;
            for (var stk in $scope.Stocks) {
                var stock = $scope.Stocks[stk];
                var priceInfo = [];

                if (priceInfo.length <= 0) {
                    priceInfo.push(stock.Name);
                }
                if (stock.StockPriceInfo.length > 0) {
                    for (var price in stock.StockPriceInfo) {
                        var priceDetail = stock.StockPriceInfo[price];
                        priceInfo.push(priceDetail.Price);
                    }
                }
                $scope.ChartData.push(priceInfo);
            }
        }
    }
]);