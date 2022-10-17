const chatMessage = document.getElementById("chatMessage");
function showMessageinUI(message,userName){
    chatMessage.innerHTML+=`<p>${userName}: ${message}`
}
function joinedNotificationinUI(userName){
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
})



setInterval(()=>{
    axios.get("http://localhost:3000/user/getAllMessage").then(response=>{
        let message=response.data.result;
        chatMessage.innerHTML='';
        message.forEach(element => {
           
            if(element.messageText=='JOINED'){
            joinedNotificationinUI(element.name)
            }
            else
            showMessageinUI(element.messageText,element.name)
        });
    }).catch(err=>{
        console.log(err)
    });
},1000);


