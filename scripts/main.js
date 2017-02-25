(function (window) {            // Receives the 'window' object for use
  'use strict';                 // inside the function body;
  var FORM_SELECTOR = '[data-coffee-order="form"]';
  var CHECKLIST_SELECTOR = '[data-coffee-order="checklist"]';
  var SERVER_URL = 'http://coffeerun-v2-rest-api.herokuapp.com/api/coffeeorders';


  var App = window.App;
  var Truck = App.Truck;
  var DataStore = App.DataStore;
  var RemoteDataStore = App.RemoteDataStore;
  var FormHandler = App.FormHandler;
  var Validation = App.Validation;
  var CheckList = App.CheckList;
  var remoteDS = new RemoteDataStore(SERVER_URL);
  var webshim = window.webshim;

  var myTruck = new Truck('ncc-1701', new DataStore());
  window.myTruck = myTruck;
  var checkList = new CheckList(CHECKLIST_SELECTOR);
  checkList.addClickHandler(myTruck.deliverOrder.bind(myTruck));
  var formHandler = new FormHandler(FORM_SELECTOR);


  formHandler.addSubmitHandler(function(data) {
    return myTruck.createOrder.call(myTruck, data)
    .then(function() {
      checkList.addRow.call(checkList, data);
    },
    function() {
      alert('Server unreachable. Try again later');
    }
  );
  });

  formHandler.addInputHandler(Validation.isCompanyEmail);

  myTruck.printOrders(checkList.addRow.bind(checkList));

  webshim.polyfill('forms forms-ext');
  webshim.setOptions('forms', {addValidators: true, lazyCustomMessages: true});
})(window);


// Range Slider function --> Shows range on slide

var rangeSlider = function() {
  var slider = $('.range-slider');
  var range = $('.range-slider__range');
  var value = $('.range-slider__value');

  slider.each(function() {

    value.each(function() {
      var value = $(this).prev().attr('value');
      $(this).html(value);
    });

    range.on('input', function() {
      $(this).next(value).html(this.value);
    });
  });
};

rangeSlider()
