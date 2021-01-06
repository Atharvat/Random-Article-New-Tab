//alert("Hello from your Chrome extension!")

var jsonText;



var firebaseConfig = {
	    apiKey: "AIzaSyCFeWhZ1bEhP83MXFpgSbtA3N7fAVBWPg8",
	    authDomain: "wiki-new-tab.firebaseapp.com",
	    databaseURL: "https://wiki-new-tab.firebaseio.com",
	    projectId: "wiki-new-tab",
	    storageBucket: "wiki-new-tab.appspot.com",
	    messagingSenderId: "390798717062",
	    appId: "1:390798717062:web:b2dc0b3f2e26dbebc0e107",
	    measurementId: "G-EV7V559H86"
	  };
	  // Initialize Firebase
	  firebase.initializeApp(firebaseConfig);
	  firebase.analytics();
	  //console.log("doing good");

var topic = "a";

var ref2 = firebase.database().ref().child(topic);

var arra = [];

var number = Math.floor(Math.random() * 5800);

var currentArticleNo = 1;

loadArticle(number, true);


document.getElementById("rimg").addEventListener("click",function(){
	number = Math.floor(Math.random() * 5800);
	loadArticle(number, true);
	currentArticleNo = arra.length;
	updatePrevButton();
});

document.getElementById("previous").addEventListener("click",function(){
	currentArticleNo--;
	var ano = arra[currentArticleNo-1];
	loadArticle(ano, false);
	updatePrevButton();
});


function loadArticle(number, shldPush){

	if(shldPush == true){
		arra.push(number);
	}

	
	var ref3 = ref2.child(number);

	var obj;

	ref3.once("value",function(snapshot){
		obj = JSON.parse(JSON.stringify(snapshot.val()));

		/*var number = Math.floor(Math.random() * 5800);
			if(number == 0){number = 1;}*/
		var text = obj.text;
		var href = obj.href;

		//console.log("going good");

		//console.log(text);
		var title = document.getElementById("link");
		//console.log(title.innerHTML);
		title.innerHTML = text;
		recreateNode(title, true);
		title = document.getElementById("link");
		title.addEventListener("click",function(){
			window.open("https://www.wikipedia.org"+href);
		});
		//window.open("https://www.wikipedia.org"+href,"_self");

	});

	console.log("article no. = "+currentArticleNo);

	/*recreateNode(document.getElementById("previous"), true);
*/	
}


var cors_api_url = 'https://cors-anywhere.herokuapp.com/';

jsonText = doCORSRequest({
    method: 'GET'
  }, function printResult(result) {
    //console.log(result);
  });

function doCORSRequest(options, printResult) {
	var x = new XMLHttpRequest();
	x.open(options.method, cors_api_url + "http://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=5");
	x.onload = x.onerror = function() {
		setUrlFromJson((x.responseText || ''));
	  printResult(
	    /*options.method + ' ' + "http://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1" + '\n' +
	    x.status + ' ' + x.statusText + '\n\n' +*/
	    (x.responseText || '')

	  );
	};
	if (/^POST/i.test(options.method)) {
	  x.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	}
	x.send("");
} 

function setUrlFromJson(jsonT){
	//console.log(jsonT);
	var jsonText = JSON.parse(jsonT);
	var url = "https://www.bing.com" + jsonText.images[0].url;
	//console.log(url);

	/*document.body.classList.add("bg");*/
	/*document.body.style.backgroundImage = "url("+ url+")";*/
	var bg = document.getElementById("bg");
	bg.src = url;
}

function recreateNode(el, withChildren) {
  if (withChildren) {
    el.parentNode.replaceChild(el.cloneNode(true), el);
  }
  else {
    var newEl = el.cloneNode(false);
    while (el.hasChildNodes()) newEl.appendChild(el.firstChild);
    el.parentNode.replaceChild(newEl, el);
  }
}

function updatePrevButton(){
	if(currentArticleNo == 1){
		document.getElementById("prev").style.display = "none";
	}else{
		document.getElementById("prev").style.display = "inline-block";
	}
}