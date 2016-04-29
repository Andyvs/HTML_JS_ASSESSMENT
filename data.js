// Validating form

function SendData(formObj){

    var uname = formObj['name'];
    var age = formObj['age'];
    var gender = formObj['gender'];
    var language = formObj['lang'];
    

    table = document.getElementById("tableData")

    if (ValidateName(uname) && ValidateAge(age) && ValidateGender(gender) && ValidateLanguage(language)){

        // Going to another form 
        showData(); 

        // Dynamically creating the <tr>,<td> on the bases of language selected.
        for(i=0; i<language.length; i++){
            if(language[i].checked){
            //create row object
            row = document.createElement("tr")
            nametd = document.createElement("td");
            nametd.innerText = uname.value;
            row.appendChild(nametd);
            agetd = document.createElement("td");
            agetd.innerText = age.value;
            row.appendChild(agetd);
            gendertd = document.createElement("td");
            gendertd.innerText = gender.value;
            row.appendChild(gendertd);
            languagetd = document.createElement("td");
            languagetd.innerText = language[i].value;
            row.appendChild(languagetd);
            fluencytd = document.createElement("td");
            fluencytd.innerText = formObj[language[i].value].value
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
    }
    else{
        return false;
    }
};

// Enabling Speak|Read|Write div when on selection of Langauage.
function selWRS(){
    
    wrsDiv = document.getElementsByName('lang');

    for(i=0; i<wrsDiv.length; i++){
        if(wrsDiv[i].checked){
            wrs = document.getElementsByName(wrsDiv[i].value);
            for(i=0; i<wrs.length; i++){
                if(wrs[i].disabled){
                    wrs[i].disabled = false;
                }
     
                }
            }
                            else{
                    wrs[i].disabled = true;   
        }
    }
};

// creating the hiddent fields
    function showData() {
        mainDiv = document.getElementById('userDet');
        subDiv = document.getElementById('tabData');

        if (mainDiv.style.display == 'none') {
            subDiv.style.display = 'none';
            mainDiv.style.display = 'block';
            document.getElementById("read").reset();
        } else {
            mainDiv.style.display = 'none';
            subDiv.style.display = 'block';
        }
    };

   function edit(row)
    {
        document.getElementById("tableSave").style.display="block";
        for(i=0; i<row.children.length; i++)
        {

            // when we are clicking save button we will use this variable
            editingrow = row;

            // we need to loop each element and make it like the initial form

            if(i==0){
                var name = '<input name="name" id="name" value="" type="text">';
                row.children[i].innerHTML = name;
            }
            if(i==1){
                var age = '<input name="age" id="age" value="" type="number">';
                row.children[i].innerHTML = age;
            }
            if(i==2){
                var gender = '<select><option value="Male">Male</option><option value="Female">Female</option></select>';
                row.children[i].innerHTML = gender;
            }
            if(i==3){
                var language = '<select><option value="Kannada">Kannada</option> <option value="Hindi">Hindi</option><option value="English">English</option><option value="Marathi">Marathi</option></select>';
                row.children[i].innerHTML = language;
            }
            if(i==4){
                var fluency = '<select><option value="Speak">Speak</option> <option value="Read">Read</option><option value="Write">Write</option></select>';
                row.children[i].innerHTML = fluency;
            }
        }

    };


function handleSave(row){
    for(i=0; i<row.children.length-1; i++)
    {
        var td = row.children[i];
        var newvalue = td.children[0].value;
        td.innerHTML =  newvalue;
    }
    document.getElementById("tableSave").style.display="hidden";
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
        }
        else{
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

    function ValidateLanguage(myLang){

        if (!validateEmptyLangauges(myLang)) {
            return false;
        }
        else{
                return true;
            }

    }

     /**
     * Pass the value of a field and validate.
     * @param  {fieldObj} field The field to get the value of
     */
    var validateEmptyFields = function(fieldObj) 
    {
        // This condition id for Radio/Checkboxes.
        if (fieldObj.length > 1) 
            {
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
        var checkedValue = [];

        //defining the counter variable for counting checked
        var counter = 0;

        for (var i = 0; i < selectObj.length; i++) 
        {
            if (selectObj[i].checked) 
            {
                counter += 1;
                checkedValue.push(selectObj[i].value);
                // just['language'] = checkedValue
            }
            if (i == selectObj.length)
                return true;
            if (!counter) 
            {
                return alert("Please select your " + selectObj[0].name);
            }
            return true;
            }
        };
