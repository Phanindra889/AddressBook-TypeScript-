fetch("https://localhost:7184/api/Employee")
.then(res => res.json())
.then(data => console.log(data))
