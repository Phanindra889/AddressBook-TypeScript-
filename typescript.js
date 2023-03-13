var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var ContactInformation = /** @class */ (function () {
    function ContactInformation(details) {
        this.id = details.id;
        this.name = details.name;
        this.email = details.email;
        this.mobile = details.mobile;
        this.landline = details.landline;
        this.website = details.website;
        this.address = details.address;
        this.identifier = details.identifier;
    }
    return ContactInformation;
}());
//fetch( "https://localhost:7184/api/Contact"+"/"+42).then(res => res.json()).then(data => console.log(data));
var url = "https://localhost:7184/api/Contact";
var token = localStorage.getItem("Token");
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
var AddressBookOperations = /** @class */ (function () {
    function AddressBookOperations() {
    }
    // private contactList = new Array<ContactInformation>();
    AddressBookOperations.prototype.getContactList = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, contactDetails;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch(url, {
                            method: 'GET',
                            headers: {
                                "Content-type": "application/json",
                                "Authorization": "bearer " + token
                            }
                        })];
                    case 1:
                        response = _a.sent();
                        if (!!response.ok) return [3 /*break*/, 2];
                        alert("You don't have permission to get the contacts");
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, response.json()];
                    case 3:
                        contactDetails = _a.sent();
                        contactDetails.forEach(function (element) {
                            var eachContact = new ContactInformation(element);
                            //  this.contactList.push(eachContact);
                            displayFewDetails(eachContact);
                        });
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AddressBookOperations.prototype.getContactById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch(url + "/" + id, {
                            method: 'GET',
                            headers: {
                                "Authorization": "bearer " + token
                            }
                        })];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        data = _a.sent();
                        console.log(data);
                        displayFullDetails(data);
                        return [2 /*return*/, data];
                }
            });
        });
    };
    AddressBookOperations.prototype.addContact = function (contact) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch(url, {
                            method: 'POST',
                            headers: { "Content-Type": "application/json",
                                "Accept": "application/json",
                                "Authorization": "bearer " + token
                            },
                            body: JSON.stringify(contact)
                        })];
                    case 1:
                        response = _a.sent();
                        if (!response.ok) {
                            alert("You don't have permission to add a contact");
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    AddressBookOperations.prototype.updateContact = function (contact) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch((url + "/" + contact.id), {
                            method: 'PUT',
                            headers: { "Content-Type": "application/json",
                                "Accept": "application/json",
                                "Authorization": "bearer " + token
                            },
                            body: JSON.stringify(contact)
                        })];
                    case 1:
                        response = _a.sent();
                        if (!response.ok) {
                            alert("You don't have permission to update a contact");
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    AddressBookOperations.prototype.deleteContact = function (contact) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch((url + "/" + contact.id), {
                            method: 'DELETE',
                            headers: { "Content-Type": "application/json",
                                "Accept": "application/json",
                                "Authorization": "bearer " + token
                            },
                            body: contact.id
                        })
                        //location.reload();
                    ];
                    case 1:
                        response = _a.sent();
                        //location.reload();
                        if (!response.ok) {
                            alert("You don't have permission to delete a contact");
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return AddressBookOperations;
}());
var contact = new AddressBookOperations();
contact.getContactList();
function displayForm() {
    document.getElementById("form").reset();
    var buttonId = document.getElementById("update-button");
    if (buttonId) {
        buttonId.setAttribute("id", "add-button");
        buttonId.innerHTML = "Add";
    }
    document.getElementById("full-details").style.display = "";
    document.getElementById("form").style.display = "block";
}
function emptyCheck(field, spanId, message) {
    if (field == "") {
        document.getElementById(spanId).innerHTML = message;
        return false;
    }
    else {
        document.getElementById(spanId).innerHTML = "";
        return true;
    }
}
function validateWebsite() {
    var website = document.getElementById("website").value;
    var regExp = new RegExp(/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/);
    if (!(regExp.test(website))) {
        document.getElementById("website-check").innerHTML = "Enter valid website Address";
        return false;
    }
    else {
        document.getElementById("website-check").innerHTML = "";
        return true;
    }
}
function validateEmailId() {
    var emailId = document.getElementById("email").value;
    var regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    if (!(regExp.test(emailId))) {
        document.getElementById("email-field-check").innerHTML = "Enter valid email";
        return false;
    }
    else {
        document.getElementById("email-field-check").innerHTML = "";
        return true;
    }
}
function validateMobileNumber() {
    var mobileNumber = document.getElementById("mobile").value;
    var regExp = new RegExp(/^(\+\d{1,2}[- ]?)?\d{10}$/);
    if (!(regExp.test(mobileNumber))) {
        document.getElementById("mobile-field-check").innerHTML = "Enter valid mobile number";
        return false;
    }
    else {
        document.getElementById("mobile-field-check").innerHTML = "";
        return true;
    }
}
function validateLandline() {
    var landline = document.getElementById("landline").value;
    var regExp = new RegExp(/^[0-9]\d{2,4}-\d{6,8}$/);
    if (!(regExp.test(landline))) {
        document.getElementById("landline-check").innerHTML = "Enter valid ladline number";
        return false;
    }
    else {
        document.getElementById("landline-check").innerHTML = "";
        return true;
    }
}
function groupFormData(buttonId) {
    return __awaiter(this, void 0, void 0, function () {
        var nameValue, emailValue, mobileValue, websiteValue, nameField, emailField, mobileField, websiteField, isEmailValid, isWebsiteValid, isMobileValid, isLandlineValid, formCV, formData, formDataObj_1, dataObject, name, email, mobile, landline, website, address, tempContact;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    event.preventDefault();
                    nameValue = document.getElementById("name").value;
                    emailValue = document.getElementById("email").value;
                    mobileValue = document.getElementById("mobile").value;
                    websiteValue = document.getElementById("website").value;
                    nameField = emptyCheck(nameValue, "name-field-check", "Name is required");
                    emailField = emptyCheck(emailValue, "email-field-check", "Email is required");
                    mobileField = emptyCheck(mobileValue, "mobile-field-check", "Mobile is required");
                    websiteField = emptyCheck(websiteValue, "website-check", "Website is required");
                    isEmailValid = validateEmailId();
                    isWebsiteValid = validateWebsite();
                    isMobileValid = validateMobileNumber();
                    isLandlineValid = validateLandline();
                    if (!(nameField && emailField && mobileField && websiteField && isEmailValid && isWebsiteValid && isMobileValid && isLandlineValid)) return [3 /*break*/, 4];
                    if (!(buttonId == "add-button")) return [3 /*break*/, 1];
                    formCV = document.getElementById("form");
                    formData = new FormData(formCV);
                    formDataObj_1 = {};
                    formData.forEach(function (value, key) {
                        return (formDataObj_1[key] = (document.getElementById(key)).value);
                    });
                    dataObject = new ContactInformation(formDataObj_1);
                    contact.addContact(dataObject);
                    console.log(dataObject);
                    //getDataObj.dataPush(dataObject);
                    formCV.style.display = "";
                    formCV.reset();
                    return [3 /*break*/, 4];
                case 1:
                    if (!(buttonId == "update-button")) return [3 /*break*/, 4];
                    name = (document.getElementById("name")).value;
                    email = (document.getElementById("email")).value;
                    mobile = (document.getElementById("mobile")).value;
                    landline = (document.getElementById("landline")).value;
                    website = (document.getElementById("website")).value;
                    address = (document.getElementById("address")).value;
                    document.getElementById("form").style.display = "";
                    document.getElementById(buttonId).innerHTML = "Update";
                    tempContact = new ContactInformation({ 'id': activeId, 'name': name, 'email': email, 'mobile': mobile, 'landline': landline, 'website': website, 'address': address });
                    return [4 /*yield*/, contact.updateContact(tempContact)];
                case 2:
                    _a.sent();
                    //setTimeout(()=>alert("Details updated successfully"),1);
                    //var data = getDataObj.retrieveData();
                    //updateContact(tempContact);
                    document.getElementById('left-body').innerHTML = "";
                    return [4 /*yield*/, contact.getContactList()];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    });
}
function displayFewDetails(formData) {
    var divId = document.getElementById("left-body");
    var child = document.createElement("div");
    // child.id = formData.identifier;
    // console.log(formData.id);
    child.id = "details";
    child.addEventListener("click", function () { return displayFullDetails(formData); });
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
function deleteContact() {
    return __awaiter(this, void 0, void 0, function () {
        var selectedContact;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, contact.getContactById(activeId)];
                case 1:
                    selectedContact = _a.sent();
                    return [4 /*yield*/, contact.deleteContact(selectedContact)];
                case 2:
                    _a.sent();
                    document.getElementById("full-details").style.display = "";
                    document.getElementById("left-body").innerHTML = "";
                    return [4 /*yield*/, contact.getContactList()];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function editContact() {
    return __awaiter(this, void 0, void 0, function () {
        var buttonId, selectedContact;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    buttonId = document.getElementById("add-button");
                    if (buttonId) {
                        buttonId.setAttribute("id", "update-button");
                        console.log(buttonId);
                        buttonId.innerHTML = "Update";
                    }
                    return [4 /*yield*/, contact.getContactById(activeId)];
                case 1:
                    selectedContact = _a.sent();
                    document.getElementById("name").value =
                        selectedContact.name;
                    document.getElementById("email").value =
                        selectedContact.email;
                    document.getElementById("mobile").value =
                        selectedContact.mobile;
                    document.getElementById("landline").value =
                        selectedContact.landline;
                    document.getElementById("website").value =
                        selectedContact.website;
                    document.getElementById("address").value =
                        selectedContact.address;
                    document.getElementById("full-details").style.display = "";
                    document.getElementById("form").style.display = "block";
                    return [2 /*return*/];
            }
        });
    });
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
    document.getElementById("form").reset();
    //displayFullDetails(data);
}
