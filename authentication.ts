class LoginCredentials
{
    userName:string;
    password:string;
    constructor(userName,password){
        this.userName = userName;
        this.password = password;
    }
}

var token = localStorage.getItem("Token");

async function authenticateUser()
{
    var userName = (<HTMLInputElement>document.getElementById("login-name")).value;
    var password = (<HTMLInputElement>document.getElementById("login-password")).value;
    var userCredentials = new LoginCredentials(userName,password);
    token =(await tockenReturner(userCredentials));
    localStorage.setItem("Token",token);
    console.log(token);
    if(token != "User Not Found") {
        window.location.href="mainPage.html";
    }
    else {
        alert("Invalid user!!");
    }
}

async function tockenReturner(userCredentials)
{
   return await fetch("https://localhost:7184/api/Authentication/Login",{
        method : 'POST',
        headers :{
            'Content-Type' : "application/json"
        },
        body : JSON.stringify(userCredentials)
    })
    .then(response => response.text())
}
