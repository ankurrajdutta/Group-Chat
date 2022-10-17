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
        console.log(result)
    }).catch(err=>{
        console.log(err)
    });
})

window.addEventListener("DOMContentLoaded",()=>{
    axios.get("http://localhost:3000/user/getAllMessage").then(response=>{
        let message=response.data.result;
        
        message.forEach(element => {
            console.log(element)
            if(element.messageText=='JOINED'){
            joinedNotificationinUI(element.name)
            }
            else
            showMessageinUI(element.messageText,element.name)
        });
    }).catch(err=>{
        console.log(err)
    });
});


