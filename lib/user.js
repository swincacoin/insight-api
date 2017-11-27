'use strict';

var Common = require('./common');

function UserController(node) {
  this.node = node;
  this.common = new Common({log: this.node.log});
}

UserController.prototype.getUser = function(req, res, next) {
  var self = this;
  var usernameOrRegTxId = req.params.usernameOrRegTxId;

  this.node.services.bitcoind.getUser(usernameOrRegTxId, function(err, data) {
    if(err) {
      return self.common.handleErrors(err, res);
    }

    res.jsonp(data);
  });

};

module.exports = UserController;
