var app=angular.module('app');

app.controller('loginCtrl', function($rootScope,$scope,$firebaseObject,$firebaseAuth,$window,$firebaseArray){
    const rootRef = firebase.database().ref().child('angular');

    $scope.Signin=function(){
    console.log("entered");
    var password = document.getElementById('password').value;
    var email = document.getElementById('email').value;
    var err=firebase.auth().signInWithEmailAndPassword(email, password).then(function(user){
            console.log("success");
            $rootScope.userid=user.uid;
            $window.location.assign('#/home');
         }).catch(function(error){
            alert(error);
         });
    }

    $scope.SignUp=function() {
                var name = document.getElementById('name').value;
                  var email = document.getElementById('email').value;
                  var password = document.getElementById('password').value;
                  var addressInput= document.getElementById('address').value;
                  var myResult;
                  if (email.length < 4) {
                    alert('Please enter an email address.');
                    return;
                  }
                  if (password.length < 4) {
                    alert('Please enter a password.');
                    return;
                  }

                  var geocoder = new google.maps.Geocoder();
                  geocoder.geocode({address: addressInput}, function(results, status) {

                        if (status == google.maps.GeocoderStatus.OK) {

                      myResult = results[0].geometry.location;
                      console.log(myResult);
                      console.log(myResult.lat());
                      console.log(myResult.lng());

                      var err=firebase.auth().createUserWithEmailAndPassword(email, password).then(function(user){
                          alert("successfully registered");
                          $scope.storedata(user);
                      }).catch(function(error){
                          alert(error);
                      });

                    }
                    });

                  $scope.storedata=function(user) {
                          var ref = rootRef.child('profile');
                          $scope.adduser = $firebaseArray(ref);
                          var timestamp = new Date().valueOf();

                          $scope.adduser.$add({
                              id: timestamp,
                              displayName: name,
                              email: email,
                              userid: user.uid,
                              latitude: myResult.lat(),
                              longitude: myResult.lng()
                          });
                          /*var userRef = ref.child(user.uid);
                          userRef.set({
                          displayName: name,
                          email: email,
                          latitude: myResult.lat(),
                          longitude: myResult.lng()
                      });*/
                    }

                  
                }
});


app.controller('homeCtrl', function($rootScope,$scope,$firebaseArray,$geolocation){
    //var user = firebase.auth().currentUser;
    var userid= $rootScope.userid;
    const rootRef = firebase.database().ref().child('angular');
    var ref = rootRef.child('query');
    $scope.object = $firebaseArray(ref); 

    var ansref = rootRef.child('answer');
    $scope.ansobject = $firebaseArray(ansref);


    $scope.questionsub= function(){
      console.log("in questionsub");
      var question = document.getElementById('question').value;
      var range = document.getElementById('range').value;
      var timestamp = new Date().valueOf();
      const rootRef = firebase.database().ref().child('angular');
      var ref = rootRef.child('query');
      $scope.addquery = $firebaseArray(ref);
      var timestamp = new Date().valueOf();
      $geolocation.getCurrentPosition({
            timeout: 60000
         }).then(function(position) {
             $scope.addquery.$add({
            id: timestamp,
          question: question,
          range: range,
          userid: userid,
          latitude:position.coords.latitude,
          longitude:position.coords.longitude
      });
            $scope.myPosition = position;
            console.log($scope.myPosition.coords.latitude);
         });
     
      /*var userRef = ref.child(timestamp);
      userRef.set({
      question: question,
      range: range,
      userid: userid
      });*/
    }

    $scope.answersub= function(questionobject){
      var question = $scope.questionobject.question;
      console.log($scope.questionobject.question);
      var ans = document.getElementById('answer').value;
      console.log(ans);
      var timestamp = new Date().valueOf();
      var ref = rootRef.child('answer');
      $scope.addquery = $firebaseArray(ref);
      var timestamp = new Date().valueOf();

      $scope.addquery.$add({
          id: timestamp,
          question: question,
          answer: ans
      });
    }

});

app.controller('ResetpasswordCtrl',
    function($scope) {
  $scope.resetPassword=function(){
    var auth = firebase.auth();
    var emailid = document.getElementById("emailid").value;

    auth.sendPasswordResetEmail(emailid).then(function() {
      // Email sent.
      console.log("success");
    }, function(error) {
      console.log(error);
      // An error happened.
    });
    }
});















