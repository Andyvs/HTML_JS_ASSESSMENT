// Validating form

// Globle vaiable
var myDet = new Object;

function SendData(formObj) {

    var uname = formObj['name'];
    var age = formObj['age'];
    var gender = formObj['gender'];
    var language = formObj['lang'];

    var storeDet = new Object;

    table = document.getElementById("tableData")

    if (ValidateName(uname) && ValidateAge(age) && ValidateGender(gender) && ValidateLanguage(language)) {

        // Storing data in the array once the table creation is done
        storeDet['myname'] = uname.value;
        storeDet['age'] = age.value;
        storeDet['gender'] = gender.value;

        // Pushing data to the object
        myDet[uname.value] = storeDet

        //Fix me : Checking if already data added and trying to edit the same data


        // Dynamically creating the <tr>,<td> on the bases of language selected.
        for (i = 0; i < myDet['language'].length; i++) {
            if (myDet['language'][i]) {
                //create row object
                row = document.createElement("tr")
                nametd = document.createElement("td");
                nametd.innerText = myDet[uname.value].myname;
                row.appendChild(nametd);
                agetd = document.createElement("td");
                agetd.innerText = myDet[uname.value].age;
                row.appendChild(agetd);
                gendertd = document.createElement("td");
                gendertd.innerText = myDet[uname.value].gender;
                row.appendChild(gendertd);
                languagetd = document.createElement("td");
                languagetd.innerText = myDet['language'][i];
                row.appendChild(languagetd);
                fluencytd = document.createElement("td");
                fluencytd.innerText = myDet['fluency'][i]
                row.appendChild(fluencytd);
                table.appendChild(row)
                // we need to go to the tr i.e parentNode.parentNode.parentNode and then remove the child element i.e td which is parentNode.paretNode
                var delbtn = "<button type='button' onclick='this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);return false;'>Delete</button>"
                var editbtn = "<button type='button' onclick='edit(this.parentNode.parentNode); return false;'>Edit</button>"
                action = delbtn + editbtn;
                actiontd = document.createElement("td");
                actiontd.innerHTML = action;
                row.appendChild(actiontd);
                table.appendChild(row)
            }
        }

        // clearing the form values
        formObj.reset();

        //disabling the radio buttons once the checkboxes are unchecked.
        var lang = document.getElementsByName('lang');
        for (i = 0; i < lang.length; i++) {
            if (!lang[i].checked) {
                wrs = document.getElementsByName(lang[i].value);
                for (j = 0; j < wrs.length; j++) {
                    wrs[j].disabled = true;
                }
            }
        }
    } else {
        return false;
    }
};

// Enabling Speak|Read|Write div when on selection of Langauage.
function selWRS(buttonObj) {
    wrs = document.getElementsByName(buttonObj.value);
    for (j = 0; j < wrs.length; j++) {
        if (wrs[j].disabled) {
            wrs[j].disabled = false;
        } else {
            wrs[j].disabled = true;
        }
    }
};

function edit(row) {
    // calling clearForm function to clear the form fields.
    clearForm();

    for (i = 0; i < row.children.length; i++) {

        // we need to loop each element and make it like the initial form
        if (i == 0) {
            var name = row.children[i].innerHTML;
            document.getElementById('name').value = name;
        }
        if (i == 1) {
            var age = row.children[i].innerHTML;
            document.getElementById('age').value = age;
        }
        if (i == 2) {
            var gender = row.children[i].innerHTML;
            var editGender = document.getElementsByName('gender');
            for (i = 0; i < editGender.length; i++) {
                if (editGender[i].value == gender) {
                    editGender[i].checked = true;
                } else {
                    editGender[i].checked = false;
                }
            }
        }
        if (i == 3) {
            var language = row.children[i].innerHTML;

            editLang = document.getElementsByName('lang');
            for (i = 0; i < editLang.length; i++) {
                if (editLang[i].value == language) {
                    editLang[i].checked = true;
                    // enabling radio buttons
                    wrs = document.getElementsByName(lang[i].value);
                    for (j = 0; j < wrs.length; j++) {
                        wrs[j].disabled = false;
                    }
                }

            }
        }
        if (i == 4) {
            var fluency = row.children[i].innerHTML;

            editLang = document.getElementsByName('lang');
            for (i = 0; i < editLang.length; i++) {
                if (editLang[i].checked == true) {
                    // passing the radio button value
                    wrs = document.getElementsByName(lang[i].value);
                    for (j = 0; j < wrs.length; j++) {
                        if (wrs[j].value == fluency) {
                            wrs[j].checked = true;
                        }
                    }
                }
            }

        }
    }

};

function handleSave(row) {
    for (i = 0; i < row.children.length - 1; i++) {
        var td = row.children[i];
        var newvalue = td.children[0].value;
        td.innerHTML = newvalue;
    }
    document.getElementById("tableSave").style.display = "hidden";
};

// User First Name Validation
function ValidateName(name) {
    regx = /^[a-zA-Z ]*$/;

    // Function invoking for validating empty fields.
    if (!validateEmptyFields(name)) {
        return false;
    } else if (!validateMinMax(name, 8, 24)) {
        return false;
    } else if (regx.test(name.value)) {
        return true;
    } else {
        alert("User First Name should be Alphabet");
    }
};

// User First Name Validation
function ValidateAge(age) {
    // Function invoking for validating empty fields.
    if (!validateEmptyFields(age)) {
        return false;
    } else {
        return true;
    }
};

// User Gender Validation
function ValidateGender(gender) {

    // Function invoking for validating empty fields.
    if (!validateEmptyFields(gender)) {
        return false;
    } else if (gender) {
        return true;
    }
};

function ValidateLanguage(myLang) {

    if (!validateEmptyLangauges(myLang)) {
        return false;
    } else {
        return true;
    }

}

/**
 * Pass the value of a field and validate.
 * @param  {fieldObj} field The field to get the value of
 */
var validateEmptyFields = function(fieldObj) {
    // This condition id for Radio/Fields.
    if (fieldObj.length > 1) {
        if (fieldObj[0].type == 'radio') {
            for (var i = 0; i < fieldObj.length; i++) {
                if (fieldObj[i].checked)
                    break;
            }
            if (i == fieldObj.length)
                return alert("Please select " + fieldObj[0].name);
            return true;
        }
    } else if (!fieldObj.value) {
        alert("Please Enter " + fieldObj.name);
        return false;
    } else {
        return true;
    }
};

/**
 * Pass the value of a field and validate.
 * @param  {fieldObj} field The field to get the value of
 */
var validateMinMax = function(fieldObj, min, max) {
    if (fieldObj.value.length < min || fieldObj.value.length > max) {
        alert(fieldObj.name + " length be between " + min + " to " + max);
    } else {
        return true;
    }
};

function validateEmptyLangauges(selectObj) {
    // array that will store the value of selected checkboxes
    var checkedValue = new Array;
    var fluencyCheck = new Array;

    //defining the counter variable for counting checked
    var counter = 0;
    var count = 0;

    for (var i = 0; i < selectObj.length; i++) {
        if (selectObj[i].checked) {
            counter += 1;
            checkedValue.push(selectObj[i].value);
            myDet['language'] = checkedValue;

            // checking if the fluency is selected. If yes then add it Array
            wrs = document.getElementsByName(selectObj[i].value);
            for (j = 0; j < wrs.length; j++) {
                if (wrs[j].checked == true) {
                    count += 1;
                    fluencyCheck.push(wrs[j].value)
                    myDet['fluency'] = fluencyCheck;
                }
            }

            if (i == selectObj.length)
                return true;
        }
    }
    if (!counter || !count) {
        return alert("Please select your Langauage and Fluency");
    }
    return true;
};

function clearForm() {
    //disabling the radio buttons
    var lang = document.getElementsByName('lang');
    for (i = 0; i < lang.length; i++) {
        if (lang[i].checked) {
            lang[i].checked = false;

            wrs = document.getElementsByName(lang[i].value);
            for (j = 0; j < wrs.length; j++) {
                wrs[j].checked = false;
                wrs[j].disabled = true;
            }
        }
    }
}