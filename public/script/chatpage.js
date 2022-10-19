const chatMessage = document.getElementById("chatMessage");
function showMessageinUI(message,userName){
  console.log(chatMessage)
   
    chatMessage.innerHTML += `<p>${userName}: ${message}</p>`;
   
   
}
function joinedNotificationinUI(userName){
  console.log(chatMessage);
    chatMessage.innerHTML+=`<p><b>${userName} Joined</b></p>`
}


document.getElementsByClassName('btn')[0].addEventListener('click',()=>{
    let token=localStorage.getItem('token')
    let chatMessage = document.getElementById("chatMessageInput").value;
    let reqObj={
        chatMessage
    }
    axios.post("http://localhost:3000/user/sendMessage",reqObj,{headers:{
        Authorization:token
    } }).then(result=>{
        console.log(result);
        window.location.reload()
    }).catch(err=>{
        console.log(err)
    });
});




setInterval(()=>{
    let messagesObj = JSON.parse(localStorage.getItem("messagesObj"));
    let lastMessageId;
    if(messagesObj){ 
      let lastObj=messagesObj[(messagesObj.length-1)]
      lastMessageId=lastObj.id;
    }else{
      lastMessageId=0;
    }
    axios
      .get(
        `http://localhost:3000/user/getAllMessage?lastMessageId=${lastMessageId}`
      )
      .then((response) => {
        let message = response.data.result;       
        if(!localStorage.getItem('messagesObj')){
          localStorage.setItem("messagesObj",JSON.stringify(message));
        }else{
          if(message.length>0){
           messagesObj.push(message[0]);     
           localStorage.setItem("messagesObj", JSON.stringify(messagesObj));
          }
        }
        chatMessage.innerHTML='';
        
       if(Array.isArray(messagesObj)){
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
},2000);


