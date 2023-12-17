// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBYmiCLqD9PY2VIhh0fC1e5ezbsj01FDR4",
    authDomain: "behonest2213.firebaseapp.com",
    databaseURL: "https://behonest2213-default-rtdb.firebaseio.com",
    projectId: "behonest2213",
    storageBucket: "behonest2213.appspot.com",
    messagingSenderId: "661398569271",
    appId: "1:661398569271:web:14d4869cc3676658781ab2",
    measurementId: "G-TMWPM3TVHQ"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Initialize variables
const auth = firebase.auth()
const database = firebase.database()


window.addEventListener('load', () => {
    // Check if useruid is already in local storage
    const userUid = localStorage.getItem('useruid');
    if (userUid) {
        // User is already logged in, redirect to another window
        window.location.href = 'dashboard.html';
    } });



// Set up our register function
function register() {
    // Get all our input fields
    email = document.getElementById('email').value
    password = document.getElementById('password').value
    full_name = document.getElementById('full_name').value
    money = "0"

    // Validate input fields
    if (validate_email(email) == false || validate_password(password) == false) {
        alert('Email or Password is incorrect!!')
        return
        // Don't continue running the code
    }
    if (validate_field(full_name) == false) {
        alert('User name is to short!!')
        return
    }

    // Move on with Auth
    auth.createUserWithEmailAndPassword(email, password)
        .then(function () {
            // Declare user variable
            var user = auth.currentUser

            // Add this user to Firebase Database
            var database_ref = database.ref()

            // Create User data
            var user_data = {
                email: email,
                full_name: full_name,
                total: money,
                last_login: Date.now()
            }


            // Push to Firebase Database
            database_ref.child('users/' + user.uid).set(user_data);

            localStorage.setItem('useruid', user.uid);

            // DOne
            setTimeout(function () {
                window.location.href = "/dashboard.html";
            }, 1500);

        })
        .catch(function (error) {
            // Firebase will use this to alert of its errors
            var error_code = error.code
            var error_message = error.message

            alert(error_message)
        })
}

// Set up our login function
function login() {
    // Get all our input fields
    email = document.getElementById('email').value
    password = document.getElementById('password').value

    // Validate input fields
    if (validate_email(email) == false || validate_password(password) == false) {
        alert('Email or Password incorrect!!')
        return
        // Don't continue running the code
    }

    auth.signInWithEmailAndPassword(email, password)
        .then(function () {
            // Declare user variable
            var user = auth.currentUser

            // Add this user to Firebase Database
            var database_ref = database.ref()

            // Create User data
            var user_data = {
                last_login: Date.now()
            }

            // Push to Firebase Database
            database_ref.child('users/' + user.uid).update(user_data)

            localStorage.setItem('useruid', user.uid)

            // DOne

            setTimeout(function () {
                window.location.href = "/dashboard.html";
            }, 1000);


        })
        .catch(function (error) {
            // Firebase will use this to alert of its errors
            var error_code = error.code
            var error_message = error.message

            alert(error_message)
        })
}




// Validate Functions
function validate_email(email) {
    expression = /^[^@]+@\w+(\.\w+)+\w$/
    if (expression.test(email) == true) {
        // Email is good
        return true
    } else {
        // Email is not good
        return false
    }
}

function validate_password(password) {
    // Firebase only accepts lengths greater than 6
    if (password < 6) {
        return false
    } else {
        return true
    }
}

function validate_field(field) {
    if (field == null) {
        return false
    }

    if (field.length <= 0) {
        return false
    } else {
        return true
    }
}
function licence() {
    window.location.href = "/licence.html"
}