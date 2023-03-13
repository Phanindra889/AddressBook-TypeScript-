
class ContactInformation {
  id:number
  name:string;
  email:string;
  mobile:string;
  landline:string;
  website:string;
  address:string;
  identifier:number;
  constructor(details){
    this.id=details.id
    this.name=details.name;
    this.email=details.email;
    this.mobile=details.mobile;
    this.landline=details.landline;
    this.website=details.website;
    this.address=details.address;
    this.identifier=details.identifier;
  }
}

//fetch( "https://localhost:7184/api/Contact"+"/"+42).then(res => res.json()).then(data => console.log(data));
var url = "https://localhost:7184/api/Contact";
var token=localStorage.getItem("Token")
// class GetData {
    
//   private data = new Array<ContactInformation>();
//     dataPush(dataObject) {
//       this.data.push(dataObject);
//     }
//     retrieveData() {
//       return this.data;
//     }
//     updateEmployee(details,index) {
//       this.data[index].name=details.name;
//       this.data[index].email=details.email;   
//       this.data[index].mobile=details.mobile;
//       this.data[index].landline=details.landline;
//       this.data[index].website=details.website;
//       this.data[index].address=details.address;
//     }
//     deleteEmployee(elementIndex) {
//       this.data.splice(elementIndex, 1);
//     }
// }


//  var getDataObj = new GetData();

class AddressBookOperations {

  // private contactList = new Array<ContactInformation>();
 
  async  getContactList() {
    let response =await fetch(url,{
      method : 'GET',
      headers : {
        "Content-type":"application/json",
        "Authorization" : "bearer "+token
      }
    });
    if(!response.ok){
      alert("You don't have permission to get the contacts");
    }
    else{
    let contactDetails = await response.json();
    contactDetails.forEach(element => {
      let eachContact = new ContactInformation(element);
      //  this.contactList.push(eachContact);
        displayFewDetails(eachContact);
    });
  }
  }
  async getContactById(id) {
    let response = await fetch(url+"/"+id,{
      method : 'GET',
      headers : {
        "Authorization" : "bearer "+token
      }
    });
    var data = await response.json();
    console.log(data);
    displayFullDetails(data);
    return data;
  }
  async addContact(contact) {
    let response = await fetch(url,{
        method : 'POST',
        headers : { "Content-Type" : "application/json",
      "Accept":"application/json",
      "Authorization" : "bearer "+token
    },
        body : JSON.stringify(contact)
    });
    if(!response.ok){
      alert("You don't have permission to add a contact");
    }
  }
  async updateContact(contact)
  {
   let response = await fetch((url+"/"+contact.id),{
        method : 'PUT',
        headers : { "Content-Type" : "application/json",
        "Accept":"application/json",
        "Authorization" : "bearer "+token
      },
          body : JSON.stringify(contact)
    })
    if(!response.ok){
      alert("You don't have permission to update a contact");
    }
  }
  async deleteContact(contact){
    let response = await fetch((url+"/"+contact.id),{
      method : 'DELETE',
      headers : { "Content-Type" : "application/json",
        "Accept":"application/json",
        "Authorization" : "bearer "+token
      },
          body : contact.id
    })
    //location.reload();
    if(!response.ok){
      alert("You don't have permission to delete a contact");
    }
  }
}

var contact = new AddressBookOperations();
contact.getContactList();

function displayForm(): void {
 (<HTMLFormElement>document.getElementById("form")).reset();
  var buttonId = document.getElementById("update-button");
  if (buttonId) {
    buttonId.setAttribute("id", "add-button");
    buttonId.innerHTML="Add";
  }

  document.getElementById("full-details").style.display = "";
  document.getElementById("form").style.display = "block";
}

function emptyCheck(field,spanId,message) {
  if (field=="") {
    document.getElementById(spanId).innerHTML=message;
        return false;
  }
  else {
    document.getElementById(spanId).innerHTML="";
    return true;
  }
}

function validateWebsite() : boolean {
  var website = (<HTMLInputElement>document.getElementById("website")).value;
  var regExp = new RegExp(/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/);
  if (!(regExp.test(website))) {
      document.getElementById("website-check").innerHTML="Enter valid website Address";
      return false;
  }
  else {
    document.getElementById("website-check").innerHTML="";
    return true;
  }
}

function validateEmailId() :boolean {
  var emailId = (<HTMLInputElement>document.getElementById("email")).value;
  var regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  if (!(regExp.test(emailId))) {
      document.getElementById("email-field-check").innerHTML="Enter valid email";
      return false;
  }
  else {
    document.getElementById("email-field-check").innerHTML="";
    return true;
  }
}

function validateMobileNumber() {
  var mobileNumber = (<HTMLInputElement>document.getElementById("mobile")).value;
  var regExp = new RegExp(/^(\+\d{1,2}[- ]?)?\d{10}$/);
  if (!(regExp.test(mobileNumber))) {
    document.getElementById("mobile-field-check").innerHTML="Enter valid mobile number";
    return false;
  }
  else {
    document.getElementById("mobile-field-check").innerHTML="";
    return true;
  }
}

function validateLandline() {
  var landline = (<HTMLInputElement>document.getElementById("landline")).value;
  var regExp = new RegExp(/^[0-9]\d{2,4}-\d{6,8}$/);
  if (!(regExp.test(landline))) {
    document.getElementById("landline-check").innerHTML="Enter valid ladline number";
    return false;
  }
  else {
    document.getElementById("landline-check").innerHTML="";
    return true;
  }
}

async function groupFormData(buttonId) {
  event.preventDefault();
  var nameValue = (<HTMLInputElement>document.getElementById("name")).value;
  var emailValue = (<HTMLInputElement>document.getElementById("email")).value;
  var mobileValue = (<HTMLInputElement>document.getElementById("mobile")).value;
  var websiteValue = (<HTMLInputElement>document.getElementById("website")).value;
  var nameField = emptyCheck(nameValue,"name-field-check","Name is required");
  var emailField = emptyCheck(emailValue,"email-field-check","Email is required");
  var mobileField = emptyCheck(mobileValue,"mobile-field-check","Mobile is required");
  var websiteField = emptyCheck(websiteValue,"website-check","Website is required");
  var isEmailValid = validateEmailId();
  var isWebsiteValid = validateWebsite();
  var isMobileValid = validateMobileNumber();
  var isLandlineValid = validateLandline();
  if(nameField && emailField && mobileField && websiteField && isEmailValid && isWebsiteValid && isMobileValid && isLandlineValid){
    
  if (buttonId == "add-button") {
    const formCV = document.getElementById("form");
    const formData = new FormData(<HTMLFormElement>formCV);
    const formDataObj = {};
    formData.forEach(
      (value, key) =>
        (formDataObj[key] = (<HTMLInputElement>(
          document.getElementById(key)
        )).value)
    );
    // formDataObj['identifier']=identifier++;
    var dataObject = new ContactInformation(formDataObj);
    contact.addContact(dataObject);
    console.log(dataObject);
    //getDataObj.dataPush(dataObject);
     formCV.style.display = "";
    (<HTMLFormElement>formCV).reset();
    //displayFewDetails(formDataObj);
        }
   
  else if (buttonId == "update-button") {
    var name = (<HTMLInputElement>(
      document.getElementById("name")
    )).value;
    var email = (<HTMLInputElement>(
      document.getElementById("email")
    )).value;
    var mobile = (<HTMLInputElement>(
      document.getElementById("mobile")
    )).value;
    var landline = (<HTMLInputElement>(
      document.getElementById("landline")
    )).value;
    var website = (<HTMLInputElement>(
      document.getElementById("website")
    )).value;
    var address = (<HTMLInputElement>(
      document.getElementById("address")
    )).value;
    document.getElementById("form").style.display = "";
    document.getElementById(buttonId).innerHTML="Update";
    var tempContact = new ContactInformation({'id':activeId, 'name':name,'email':email,'mobile':mobile,'landline':landline,'website':website,'address':address});
    await contact.updateContact(tempContact);
    //setTimeout(()=>alert("Details updated successfully"),1);
    //var data = getDataObj.retrieveData();
    //updateContact(tempContact);
    document.getElementById('left-body').innerHTML = "";
    await contact.getContactList();
    //location.reload();
  }
}
}
  function displayFewDetails(formData) {
  var divId = document.getElementById("left-body");
  var child = document.createElement("div");
  // child.id = formData.identifier;
  // console.log(formData.id);
  child.id = "details";
  child.addEventListener("click",  () =>  displayFullDetails(formData));
 
  child.innerHTML =
    "<p class='user-name' id='user-name'>" + formData.name + "</p>";
  child.innerHTML +=
    "<p class='mail' id='user-mail'>" + formData.email + "</p>";
  child.innerHTML +=
    "<p class='phone-number' id='user-phone'>" + formData.mobile + "</p>";
  divId.appendChild(child);
}
var activeId;

function displayFullDetails(selectedContact) {
  document.getElementById("form").style.display = "";
  document.getElementById("full-details").style.display = "block";
  activeId = selectedContact.id;
//  var dataItem = getDataObj.retrieveData();
//   dataItem.forEach((element) => {
//     if (element.id == activeId) {
      document.getElementById("right-name").innerHTML = selectedContact.name;
      document.getElementById("right-email").innerHTML = selectedContact.email;
      document.getElementById("right-mobile").innerHTML = selectedContact.mobile;
      document.getElementById("right-landline").innerHTML = selectedContact.landline;
      document.getElementById("right-website").innerHTML = selectedContact.website;
      document.getElementById("right-address").innerHTML = selectedContact.address;
  //   }
  // });
}

async function deleteContact() {

  var selectedContact = await contact.getContactById(activeId);
  await contact.deleteContact(selectedContact);
  document.getElementById("full-details").style.display = "";
  document.getElementById("left-body").innerHTML = "";
  await contact.getContactList();
}

async function editContact() {
   
  var buttonId = document.getElementById("add-button");
  if (buttonId) 
  {
    buttonId.setAttribute("id", "update-button");
    console.log(buttonId);
    buttonId.innerHTML="Update";
  }
  // var data = getDataObj.retrieveData();
  // data.forEach((element) => {
  //   if (element.id == activeId ) {
  //     index = data.indexOf(element);
  var selectedContact = await contact.getContactById(activeId);
      (<HTMLInputElement>document.getElementById("name")).value =
        selectedContact.name;
      (<HTMLInputElement>document.getElementById("email")).value =
      selectedContact.email;
      (<HTMLInputElement>document.getElementById("mobile")).value =
      selectedContact.mobile;
      (<HTMLInputElement>document.getElementById("landline")).value =
      selectedContact.landline;
      (<HTMLInputElement>document.getElementById("website")).value =
      selectedContact.website;
      (<HTMLInputElement>document.getElementById("address")).value =
      selectedContact.address;
      document.getElementById("full-details").style.display = "";
      document.getElementById("form").style.display = "block"; 
    // }
  // });
}

function updateContact(data) {
    document.getElementById("details").querySelector('#user-name').innerHTML = data.name;
    document.getElementById("details").querySelector('#user-mail').innerHTML = data.email;
    document.getElementById('details').querySelector("#user-phone").innerHTML = data.mobile;
    document.getElementById("right-name").innerHTML = data.name;
    document.getElementById("right-email").innerHTML = data.email;
    document.getElementById("right-mobile").innerHTML = data.mobile;
    document.getElementById("right-landline").innerHTML = data.landline;
    document.getElementById("right-website").innerHTML = data.website;
    document.getElementById("right-address").innerHTML = data.address;
    (<HTMLFormElement>document.getElementById("form")).reset();
    //displayFullDetails(data);
}

