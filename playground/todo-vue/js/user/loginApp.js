(function(exports){

  'use strict';

  exports.loginApp = new Vue({
    el: '#loginApp',
    data: {
      signInEmail:'',
      signUpEmail:'',
      signUpName:'',
      signUpVisibility: false
    },
    methods: {
      toggleSignUpWindow: function() {
        this.signUpVisibility = !this.signUpVisibility;
      },
      validUserInfo: function(user) {
        var emailPattern = new RegExp(/\w+\@\w+\.\w/);

        if(this.isValid(user.name)
            && this.isValid(user.emailAddress)
            && emailPattern.test(user.emailAddress))
          return true;
        return false;
      },
      isValid: function(str) {
        if(str != null && str != undefined && str != '')
          return true;
        return false;
      },
      signUp: function() {
        var user = {emailAddress: this.signUpEmail, name: this.signUpName};
        if(this.signUpEmail === '' || this.signUpName === '')
          return false;
        this.signUpEmail = '';
        this.signUpName = '';

        if(!this.validUserInfo(user)) {
          alert('가입형식을 확인하세요!');
          return false;
        }

        if(userStorage.saveUser(user)) {
          console.debug('사용자 등록 완료');
          alert('사용자가 등록되었습니다!');
          this.signInEmail= user.emailAddress;
          this.signIn();
          // this.signInEmail= user.emailAddress;
        } else {
          alert('이미 등록된 사용자입니다!');
          return false;
        }
        return true;
      },
      signIn: function() {
        if(this.signInEmail === '')
          return;
        var users = userStorage.fetch();
        var user = users.find(o => {return o.emailAddress === this.signInEmail});
        if(user) {
          console.debug('사용자 인증 완료');
          userStorage.setCurrentUser(user);
          window.location.href = '/toys/todo-vue/';
        } else {
          alert('이메일 주소를 가진 사용자가 존재하지 않습니다.');
        }
        this.signInEmail = '';
      }
    }
  });

})(window);
