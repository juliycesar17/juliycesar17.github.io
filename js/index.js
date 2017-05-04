
var model=[
     {name:'first', comments:['comment_first1','commen_first2','comment_first3','comment_first4'], active:false},
     {name:'second', comments:['c1','c2','c3','c4'], active:false}

   ];
angular.module("items", []).factory("save_to_browser", function () {
  var array_of_scopes=[];
return {save_to:  function (key, value){
  // array_of_scopes.push(value.toString():value)
  localStorage.setItem(key, JSON.stringify(value));}
}

}).controller("main", function(save_to_browser){
  save_to_browser.save_to("model",model);
  uu=localStorage.getItem("model");
  console.log(uu);
}).directive( "bar", function () {
    return {
      restrict: 'E',
      link: function($scope, $element){
    },
      templateUrl:'views/bar.html ',
    }
  }).directive("mainn", function(){
    return {
      restrict:'E',
      link: function(scope, element, attr){
          scope.$watch(function () {return scope.items.length}, function(newval, oldval){
            if(newval>oldval) {console.log("added")}
            if(newval<oldval) {console.log("removed")}
          });
      },
      controller: function($scope, $rootScope, $filter, save_to_browser){
$scope.setitem_x=null;
$scope.setfnitem= function (item) {
 return  $scope.setitem_x == null ||
 item.name == $scope.setitem_x;
 }
 $scope.show_all= function () {
  $scope.setitem_x = null ;
  $rootScope.$broadcast("clear_comm")
  }
        $scope.items = model;
        $scope.addItem=function(item){
        $scope.setitem_x=null;
        var new_arr=$scope.items.map(function(elem){return elem.name;});
        console.log(item);
        if (new_arr.indexOf(item)==-1 && item !==undefined)
        {$scope.items.push({name:item, comments:[], active:false})}
        save_to_browser.save_to("newarr_n", $scope.items);
        var uuu=localStorage.getItem("newarr_n");
        console.log(uuu);

      }

        $scope.setItem=function(item_x){$scope.setitem_x=item_x.name;
          console.log($scope.setitem_x);
            console.log(item_x);
          $rootScope.$broadcast("show_comments", {"comm":item_x.comments, "name":item_x.name} )
        }
        $scope.delItem=function(item){
          for( var i =0;i < $scope.items.length; i++){
          if ( $scope.items[i] === item) $scope.items.splice(i, 1);
        }
        $rootScope.$broadcast("destroy_item");
        }
      },
      templateUrl:'views/main.html'
    }
  }

).directive("comments", function (){
  return {
    restrict:'E',
    templateUrl:'views/comments.html',
    link: function(scope, element, attr){

        },
    controller: function($scope, $filter){
      $scope.$on("show_comments", function(e, data){ console.log(data.comm);
        $scope.comments_yet=data.comm;
        $scope.name=data.name;
        console.log(  $scope.comments_yet);

      })
        $scope.$on("clear_comm", function(e, data){   $scope.comments_yet=null;
         $scope.name=null;
        });
        $scope.$on("destroy_item", function(e, data){   $scope.comments_yet=null;
         $scope.name=null;
          $scope.comments_yet=null;
        })
        $scope.addComment=function(com_c){
          $scope.comments_yet.push(com_c)
        }
    }
  }
})
