
let username=document.getElementById("username")
let password=document.getElementById("password1")
let loginbtn=document.getElementById("loginbtn")
let susername=localStorage.getItem("username")
let spass=localStorage.getItem("password")
loginbtn.addEventListener("click",function(e){
    e.preventDefault()
    if(username.value===""||password.value===""){
        alert("please fill all fields")
    }else{
        
        if((susername && susername.trim())===(username.value).trim() && (spass && spass.trim())===(password.value).trim()){
            setTimeout(()=>{
                window.location="index.html"
            },5)
        }else{
            alert("invalid data")
            username.value=""
            password.value=""
        }
        
    }
})