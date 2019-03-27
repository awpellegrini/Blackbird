// Initialize Firebase
var config = {
    apiKey: "AIzaSyATq6yp36sRF0T1PunHdMVXLYU9Y_m-mQw",
    authDomain: "blackbird-4d2a1.firebaseapp.com",
    databaseURL: "https://blackbird-4d2a1.firebaseio.com",
    projectId: "blackbird-4d2a1",
    storageBucket: "blackbird-4d2a1.appspot.com",
    messagingSenderId: "818782685612"
  };
  firebase.initializeApp(config);

  let user = "chiarabaroni"

      // Get a reference to the database service
      var db = firebase.firestore();
        
      db.collection("users").get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            //   console.log(doc.id, doc.data());
            //   console.log(doc.data().username);
            //   console.log(doc.data().hashPassword);
          });
      });

  
  

  function mySubmit() {
      let inputPassword = document.querySelector("#InputPassword");
      console.log(inputPassword.value)
      sha1(inputPassword.value)
      let hash = sha1.create();
      console.log(hash)
      hash.update(inputPassword.value)
      console.log(hash)
      let passwordHash = hash.hex()
      console.log(passwordHash);
      return passwordHash;
  } 

  function login() {
    let inputEmail = document.querySelector("#InputEmail");
    let inputPassword = document.querySelector("#InputPassword");
      var passHash = mySubmit();
      console.log(passHash)
      let trovato = 0;
      // When the user clicks on <span> (x), close the modal
      document.getElementsByClassName("close")[0].onclick = function() {
        document.getElementById('myModal').style.display = "none";
        }

        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
            if (event.target == document.getElementById('myModal')) {
                document.getElementById('myModal').style.display = "none";
            }
        }
      db.collection("users").get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
              if((inputEmail.value != doc.data().email) || (passHash != doc.data().password)) {
                document.getElementById('myModal').style.display = "flex"
                document.getElementById('modal-text').innerHTML = '<div class="alert-title">Invalid email or password</div><div class="alert-text">Please reinsert both carefully</div>'
                inputEmail.style.borderColor = "var(--red)"
                inputPassword.style.borderColor = "var(--red)" 
                trovato++
              } 
              if (inputEmail.value == '' || inputPassword == '') {
                  document.getElementById('myModal').style.display = "flex"
                  document.getElementById('modal-text').innerHTML = '<div class="alert-title">Please fill both fields</div>'
              }
          });
          if (trovato == 0) {
            window.location.href = "chats.html";
          }
      });
  }

  function simpleBorder(input) {
      input.style.borderColor = "var(--light-grey)"
  }

  

// var tapThreeDots = document.querySelectorAll("#message-list .tap-threedots");
// var cardActions = document.querySelector("#card-action-tmpl > *");
// var card = document.querySelectorAll("#message-list .message-card");
// var username = document.querySelector("#chatting-username");
// var messageCardUsername = document.querySelectorAll("#message-list .message-card-username");
// var inputKeyboard = document.querySelector("#input-keyboard");
// var singleChat = document.querySelector("#single-chat");

// //forEach chiamante vuole 3 elementi, poi magari non li userò ma se li aspetta
// card.forEach(function(elemento,i,array) {
//     elemento.addEventListener("click", function(){
//         highlightCard(elemento);
//     });
//     elemento.addEventListener("click", function(){
//         firstChat(elemento);
//     });
// })

// function firstChat(e) {
//     for (i=0; i<card.length; i++) {
//         card[i].classList.remove("upper");
//     }
//     e.childNodes[7].innerHTML = '';
//     e.childNodes[7].innerHTML = convertToMyDate();
//     e.classList.add("upper");
//     e.parentNode.prepend(e);
// }

// function highlightCard(e) {
//     username.innerHTML=e.querySelector(".message-card-username").textContent;
//     for (i=0; i<card.length; i++) {
//         card[i].classList.remove("highlight");
//     }
//     e.classList.add("highlight");
// }

// tapThreeDots.forEach(function(elemento,i,array) {
//     elemento.addEventListener("click", function(){
//         appendSelectedCard(elemento.parentNode);
//     });
// })

// function appendSelectedCard(contenitore) {
//     contenitore.appendChild(cardActions);
// }

let first = true;
db.collection("users/antoniopellegrini/collocutors/chiarabaroni/messages").orderBy("date", "desc").onSnapshot( querySnapshot => {
    
    var singleChat = document.querySelector('#single-chat');
    var lastMessage
    querySnapshot.forEach((doc) => {
        if (!document.getElementById(doc.id)) {
            lastMessage = document.createElement("div");
            console.log(doc.data().text)
            if (doc.data().sender === user) {
                lastMessage.setAttribute('class', 'message message-sent');
            } else  lastMessage.setAttribute('class', 'message message-received');
        
            lastMessage.innerHTML = `<div class="message-text" id= ${doc.id}> ${doc.data().text} </div><div class="message-time"> ${convertToMyDate(doc.data().date)}</div>`; 
        
            if (first) singleChat.prepend(lastMessage);
            else singleChat.appendChild(lastMessage);                      
        } 
        document.querySelector('#conversation-container').scrollTop += 2000;      
    }); 
    first = false;
});


function convertToMyDate (x) {
        var newTime = x.toDate()
        var hoursPure = newTime.getHours();
        var hours;
        if(hoursPure < 10) hours = "0" + hoursPure;
        else hours = hoursPure;
        // Minutes part from the timestamp
        var minutesPure = newTime.getMinutes();
        if(minutesPure < 10) minutes = "0" + minutesPure;
        else minutes = minutesPure;
        // Seconds part from the timestamp
        // var seconds = "0" + newTime.getSeconds();
        // Will display time in 10:30:23 format
        var formattedTime = hours + ':' + minutes;
        return formattedTime;
    }



function invia () {
    var testoMessaggio = document.querySelector('#input-keyboard')
    var date = new Date();
    let collocutor = "antoniopellegrini"
    var singleMsg = {
        text: document.getElementById('input-keyboard').value,
        date: date,
        sender: user
    }
    
    db.collection(`users/${user}/collocutors/${collocutor}/messages`).add(singleMsg)
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });

    db.collection(`users/${collocutor}/collocutors/${user}/messages`).add(singleMsg)
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });

    db.collection(`users/${user}/collocutors/`).doc(collocutor).update({
        lastMsg: singleMsg
    })

    db.collection(`users/${collocutor}/collocutors/`).doc(user).update({
        lastMsg: singleMsg
    })

    testoMessaggio.value = ''    
}

// testoMessaggio.addEventListener('keydown', function(event) {
//     if(event.which == 13 && testoMessaggio.value != '') {
//         invia()
//     }
// } )



