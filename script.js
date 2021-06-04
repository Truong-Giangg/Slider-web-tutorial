// Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyC4ZKqFzr-T2O8fg0nxIj273WAj25LK1OI",
    authDomain: "slider-edf63.firebaseapp.com",
    databaseURL: "https://slider-edf63-default-rtdb.firebaseio.com",
    projectId: "slider-edf63",
    storageBucket: "slider-edf63.appspot.com",
    messagingSenderId: "555959782160",
    appId: "1:555959782160:web:b3903013ddebc3ff4ef395",
    measurementId: "G-YGKRME26JR"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
var sliderRed = document.getElementById("sliderRed");
var sliderGreen = document.getElementById("sliderGreen");
var sliderBlue = document.getElementById("sliderBlue");

var SelectValueRed = document.getElementById("SelectValueRed"); /* create variable*/
var SelectValueGreen = document.getElementById("SelectValueGreen"); /* create variable*/
var SelectValueBlue = document.getElementById("SelectValueBlue"); /* create variable*/
SelectValueRed.innerHTML = sliderRed.value; /* get value from slider id in HTML but the value unable to change*/
SelectValueGreen.innerHTML = sliderGreen.value; /* get value from slider id in HTML but the value unable to change*/
SelectValueBlue.innerHTML = sliderBlue.value; /* get value from slider id in HTML but the value unable to change*/
//--------------get value from firebase to show it when first run (sync between html and firebase)
var database = firebase.database();
database.ref().on("value", function(snap){      
    sliderBlue.value = snap.val().blueValue;           //get value blueValue from firebase and store to  sliderBlue.value
	SelectValueBlue.innerHTML = snap.val().blueValue;  //get value blueValue from firebase and store to  SelectValueBlue.innerHTML	
	
	sliderRed.value = snap.val().redValue;           
	SelectValueRed.innerHTML = snap.val().redValue;  
	
	sliderGreen.value = snap.val().greenValue;           
	SelectValueGreen.innerHTML = snap.val().greenValue;
	
    // change the background based on RGB value
	document.getElementsByClassName('wrapper')[0].style.backgroundColor = `rgb(${sliderRed.value}, ${sliderGreen.value}, ${sliderBlue.value})`
});
sliderRed.oninput = function(){
    SelectValueRed.innerHTML = this.value; /* able to change the value*/
    var firebaseRef = firebase.database().ref().child("redValue");
    firebaseRef.set(sliderRed.value);           

}
sliderGreen.oninput = function(){
    SelectValueGreen.innerHTML = this.value; /* able to change the value*/
    var firebaseRef = firebase.database().ref().child("greenValue");
    firebaseRef.set(sliderGreen.value);           

}
sliderBlue.oninput = function(){
    SelectValueBlue.innerHTML = this.value; /* able to change the value*/
    var firebaseRef = firebase.database().ref().child("blueValue");
    //firebaseRef.set(Number(sliderBlue.value));           
    firebaseRef.set(sliderBlue.value);           
}