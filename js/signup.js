let email=document.getElementById("email1")
let username=document.getElementById("username")
let password=document.getElementById("password1")
let signupbtn=document.getElementById("signupbtn")

signupbtn.addEventListener("click",function(e){
    e.preventDefault()
    if(username.value===""||email.value===""||password.value===""){
        alert("please fill all fields")
    }else{
        localStorage.setItem("username",username.value)
        localStorage.setItem("email",email.value)
        localStorage.setItem("password",password.value)
        setTimeout(()=>{
            window.location="login.html"
        },5)
    }
})

