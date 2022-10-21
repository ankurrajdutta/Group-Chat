const chatMessage = document.getElementById("chatMessage");
const availableGroup = document.getElementById("availableGroup");
function showMessageinUI(message,userName){
  console.log(chatMessage)
   
    chatMessage.innerHTML += `<p>${userName}: ${message}</p>`;
   
   
}
function joinedNotificationinUI(userName){
  console.log(chatMessage);
    chatMessage.innerHTML+=`<p><b>${userName} Joined</b></p>`
}




document.getElementById('addGroup').addEventListener('click',()=>{
  document.getElementById("addGroupForm").classList.toggle("hidden")
});

document.getElementById("addGroupSubmitButton").addEventListener('click',(e)=>{
  e.preventDefault();
  let token=localStorage.getItem('token')
  let groupName = document.getElementById("inputGroupName").value;
  let reqObj={
    groupName
  }
  axios
    .post(`http://localhost:3000/group/addGroup`, reqObj,{
      headers: {
        Authorization: token,
      }
    })
    .then((response) => {
      console.log(response);
      window.location.reload();
    })
    .catch((err) => {
      console.log(err);
    });
});
function viewGroupInUI(obj){
  availableGroup.innerHTML += `<div><span>${obj.name}</span><button id="addUser" onclick='addUserGroup(event)'>Add User</button> <button onclick='openChat(event)'>Open Chat</button></div>`;
}
let groupName;
function addUserGroup(e){
  groupName = e.target.parentNode.firstElementChild.innerText;
  console.log('63',groupName)
  document.getElementById("addUserForm").classList.toggle('hidden');
}

window.addEventListener('DOMContentLoaded',()=>{
  let token=localStorage.getItem('token')
  axios
    .get("http://localhost:3000/group/getAllGroup", {
      headers: {
        Authorization: token,
      }
    })
    .then((result) => {
    
      result.data.forEach((element) => {
        viewGroupInUI(element);
      });
    })
    .catch((err) => {
      console.log(err);
    });
})


function openChat(e) {
  groupName = e.target.parentNode.firstElementChild.innerText;
  document.getElementById("chatHeader").innerHTML=`<h1>${groupName}</h1>`;
  
  setInterval(()=>{
    let messagesObj = JSON.parse(localStorage.getItem(`${groupName}`));
    let lastMessageId;
    if (messagesObj) {
      let lastObj = messagesObj[messagesObj.length - 1];
      lastMessageId = lastObj.id;
    } else {
      lastMessageId = 0;
    }
    axios
      .get(
        `http://localhost:3000/user/getAllMessage?lastMessageId=${lastMessageId}&groupName=${groupName}`
      )
      .then((response) => {
        let message = response.data.result;
        if (!localStorage.getItem(`${groupName}`)) {
          localStorage.setItem(`${groupName}`, JSON.stringify(message));
        } else {
          if (message.length > 0) {
            messagesObj.push(message[0]);
            localStorage.setItem(`${groupName}`, JSON.stringify(messagesObj));
          }
        }
        chatMessage.innerHTML = "";

        if (Array.isArray(messagesObj)) {
          messagesObj.forEach((element) => {
            if (element.messageText == "JOINED") {
              joinedNotificationinUI(element.name);
            } else showMessageinUI(element.messageText, element.name);
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },1000)
  
}

document.getElementsByClassName("btn")[0].addEventListener("click", () => {
  let token = localStorage.getItem("token");
  let chatMessage = document.getElementById("chatMessageInput").value;
  let reqObj = {
    chatMessage,
    groupName
  };
  axios
    .post("http://localhost:3000/user/sendMessage", reqObj, {
      headers: {
        Authorization: token,
      },
    })
    .then((result) => {
      console.log(result);
      
    })
    .catch((err) => {
      console.log(err);
    });
});


// setInterval(()=>{
//     let messagesObj = JSON.parse(localStorage.getItem("messagesObj"));
//     let lastMessageId;
//     if(messagesObj){ 
//       let lastObj=messagesObj[(messagesObj.length-1)]
//       lastMessageId=lastObj.id;
//     }else{
//       lastMessageId=0;
//     }
//     axios
//       .get(
//         `http://localhost:3000/user/getAllMessage?lastMessageId=${lastMessageId}`
//       )
//       .then((response) => {
//         let message = response.data.result;       
//         if(!localStorage.getItem('messagesObj')){
//           localStorage.setItem("messagesObj",JSON.stringify(message));
//         }else{
//           if(message.length>0){
//            messagesObj.push(message[0]);     
//            localStorage.setItem("messagesObj", JSON.stringify(messagesObj));
//           }
//         }
//         chatMessage.innerHTML='';
        
//        if(Array.isArray(messagesObj)){
//          messagesObj.forEach((element) => {
//            if (element.messageText == "JOINED") {
//              joinedNotificationinUI(element.name);
//            } else showMessageinUI(element.messageText, element.name);
//          });
//        }
        
       
//       })
//       .catch((err) => {
//         console.log(err);
//       });
// },2000);


document.getElementById("addUserSubmitButton").addEventListener('click',()=>{
   const inputEmail = document.getElementById("inputEmail").value;
   const reqObj = {
     inputEmail,
     groupName,
   };
   console.log(reqObj);
   axios
     .post("http://localhost:3000/group/addUserGroup", reqObj)
     .then((result) => {
       console.log(result);
       alert(result.data.message)
     })
     .then((err) => {
       console.log(err);
     });
});

