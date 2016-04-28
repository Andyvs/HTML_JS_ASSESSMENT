// Validating form

var just = new Object();

function SendData(formObj){

	var uname = formObj['name'];
	var age = formObj['age'];
	var gender = formObj['gender'];
	var language = formObj['lang'];

	var userDet = new Object(); // or the shorthand way --> var userDet = {};

	if (ValidateName(uname) && ValidateAge(age) && ValidateGender(gender) && ValidateLanguage(language)){
		userDet['myname'] = uname.value;
		userDet['age'] = age.value;
		userDet['gender'] = gender.value;

		just[uname.value] = userDet
		showData();		
	}
	else{
		return false;
	}
};

// Enabling Speak|Read|Write div when on selection of Langauage.
function selWRS(){
	wrsDiv = document.getElementById('wrs');

	if (wrsDiv.style.display == 'none'){
		wrsDiv.style.display = 'block';
	}
	else {
		wrsDiv.style.display = 'none';
	}
};

// creating the hiddent fields
    function showData() {
        mainDiv = document.getElementById('userDet');
        subDiv = document.getElementById('tabData');

        if (mainDiv.style.display == 'none') {
            subDiv.style.display = 'none';
            mainDiv.style.display = 'block';
        } else {
            mainDiv.style.display = 'none';
            subDiv.style.display = 'block';
        }
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
