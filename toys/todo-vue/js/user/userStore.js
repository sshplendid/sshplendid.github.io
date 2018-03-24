/*jshint unused:false */

(function (exports) {

	'use strict';

	var STORAGE_KEY = 'todos-user';

	exports.userStorage = {
		fetch: function () {
			return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
		},
		save: function (users) {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
		},
    setCurrentUser: function(user) {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    },
    getCurrentUser: function() {
      return JSON.parse(sessionStorage.getItem(STORAGE_KEY) || '{"emailAddress":"default"}');
    },
    flushCurrentUser: function() {
      sessionStorage.removeItem(STORAGE_KEY);
    },
    saveUser: function(user) {
      var users = this.fetch();
      var duplicated = users.filter(o => {
        if(o.emailAddress === user.emailAddress)
          return true;
      });
      if(duplicated.length > 0) {
        //alert('이미 등록된 사용자입니다!');
				return false;
      }
      users.push(user);
      this.save(users);
			return true;

    },
		getUser: function (_email) {
			var users = this.fetch();
			var user = users.filter(o => {
        if(o.emailAddress === _email)
          return true;
      })[0] || {};
			return user;
		}
	};

})(window);
