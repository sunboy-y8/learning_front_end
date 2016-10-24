'use strict';

/**
 * @ngdoc function
 * @name yoTest1App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the yoTest1App
 */
angular.module('yoTest1App')
  .controller('MainCtrl', function ($scope) {
    /*this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];*/
$scope.todos = [];
      //$scope.todos = ['Item 1', 'Item 2', 'Item 3'];

      /*
      我们将会从本地存储里读取然后再将它们存入$scope.todos中。
      我们还需要使用Angular的$warch监听器来监听$scope.todos的值得变化。
      如果有人添加或者删减了Todo项目，本地存储中的数据也会被同步
      */
      /*var todosInStore = localStorageService.get('todos');
      $scope.todos = todosInStore && todosInStore.split('\n') || [];
      $scope.$watch('todos', function () {
         localStorageService.add('todos', $scope.todos.join('\n'));
      }, true);*/

      $scope.addTodo = function(){
        $scope.todos.push($scope.todo);
        $scope.todo = '';
      };

      $scope.removeTodo = function(index){
        $scope.todos.splice(index,1);
      };
  });
