function sayHello() {
    alert("hello");
    var name = document.getElementById("name").value;
    var pass = document.getElementById("pass").value;
   // alert(name);
    //var pass = "kiki";
    cordova.exec(sayHelloSuccess, sayHelloFailure, "HWPHello", "sayHello", [name,pass]);
}

function createdb() {
    alert("hello createdb");
    cordova.exec(sayHelloSuccess, sayHelloFailure, "HWPHello", "createdb");
}


function sayHelloSuccess (result){
    alert(result);
};
function sayHelloFailure(){
    
};

