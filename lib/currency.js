'use strict';

var request = require('request');

function CurrencyController(options) {
  this.node = options.node;
  var refresh = options.currencyRefresh || CurrencyController.DEFAULT_CURRENCY_DELAY;
  this.currencyDelay = refresh * 60000;
  this.exchange_rates = {
    swi_usd: 0.00,
    btc_usd: 0.00,
    btc_swi: 0.00
  };
  this.timestamp = Date.now();
}

CurrencyController.DEFAULT_CURRENCY_DELAY = 10;

CurrencyController.prototype.index = function(req, res) {
  var self = this;
  var currentTime = Date.now();
  if (self.exchange_rates.swi_usd === 0.00 || currentTime >= (self.timestamp + self.currencyDelay)) {
    self.timestamp = currentTime;
    self.exchange_rates = 1; //WiP - Info not available right now
    self.exchange_rates.bitstamp = 1; // backwards compatibility
  } else {
    res.jsonp({
      status: 200,
      data: self.exchange_rates
    });
  }

};

module.exports = CurrencyController;
