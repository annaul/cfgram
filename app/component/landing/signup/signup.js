'use strict';

require('./_signup.scss');
const angular = require('angular');

module.exports = {
  template: require('./signup.html'),
  controller: ['$log', '$location', 'authService', '$uibModal', SignupController],
  controllerAs: 'signupCtrl'
};

angular.module('cfgram').controller('ModalController', function ($uibModalInstance) {
  var $ctrl = this;

  $ctrl.ok = function () {
    $uibModalInstance.close();
  };
});

function SignupController($log, $location, authService, $uibModal) {
  $log.debug('SignupController');

  authService.getToken()
  .then( () => {
    $location.url('/home');
  });

  this.signup = function(user) {
    $log.debug('signupCtrl.signup');

    authService.signup(user)
    .then( () => {
      $location.url('/home');
    }).catch(()=> {
      $uibModal.open({
        templateUrl: 'myModalContent.html',
        controller: 'ModalController',
        controllerAs: '$ctrl'
      });
    });
  };
}
