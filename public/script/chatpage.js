const chatMessage = document.getElementById("chatMessage");
function showMessageinUI(message,userName){
    chatMessage.innerHTML+=`<p>${userName}: ${message}`
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
        let userName=result.data.user.name;
        showMessageinUI(chatMessage,userName)
    }).catch(err=>{
        console.log(err)
    });
})



