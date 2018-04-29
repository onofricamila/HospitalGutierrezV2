'use strict';

module.exports = function(Account) {

  /**
   * Activates an user
   * @param {string} id Account id
   * @param {Function(Error, object)} callback
   */

  Account.activate = function(id, callback) {
    this.findById(id, function(err, account) {
      if (err) {
        callback(err);
      } else {
        if (account) {
          account.active = true;
          account.save(function(err) {
            if (err) {
              callback(err);
            } else {
              callback(null, "Account activated");
            }
          });
        } else {
          err = new Error(g.f('Account not found: %s', uid));
          err.statusCode = 404;
          err.code = 'USER_NOT_FOUND';
          callback(err);
        }
      }
    });
  };

  /**
   * Deactivates an account
   * @param {string} id Account id
   * @param {Function(Error, object)} callback
   */

  Account.deactivate = function(id, callback) {
    this.findById(id, function(err, account) {
      if (err) {
        callback(err);
      } else {
        if (account) {
          account.active = false;
          account.save(function(err) {
            if (err) {
              callback(err);
            } else {
              callback(null, "Account deactivated");
            }
          });
        } else {
          err = new Error(g.f('Account not found: %s', uid));
          err.statusCode = 404;
          err.code = 'USER_NOT_FOUND';
          callback(err);
        }
      }
    });
  };

  /**
   * Toggles activation
   * @param {string} id Account id
   * @param {Function(Error, object)} callback
   */

  Account.toggleState = function(id, callback) {
    this.findById(id, function(err, account) {
      if (err) {
        callback(err);
      } else {
        if (account) {
          account.active = !account.active;
          account.save(function(err) {
            if (err) {
              callback(err);
            } else {
              if (account.active) {
                callback(null, "Account activated");
              } else {
                callback(null, "Account deactivated");
              }
            }
          });
        } else {
          err = new Error(g.f('Account not found: %s', uid));
          err.statusCode = 404;
          err.code = 'USER_NOT_FOUND';
          callback(err);
        }
      }
    });
  };
};