
var signupForm = document.getElementById("signupForm");
var signupName = document.getElementById('signupName');
var signupEmail = document.getElementById('signupEmail')
var signupPassword = document.getElementById('signupPassword')
var signupNameError = document.getElementById('signupNameError')
var selectedInput = document.querySelectorAll('.selectedInput')
var exist = document.getElementById('exist')
var success = document.getElementById('success')
var login = document.getElementById('login')
var signinEmail = document.getElementById('signinEmail')
var signinPassword = document.getElementById('signinPassword')
var invalid = document.getElementById('invalid')
var username = document.getElementById('username')
var logOut = document.getElementById('logOut')
var forgetPass = document.getElementById('forgetPass')
var forgetPassEmail = document.getElementById('forgetPassEmail')
var invalid_forgetPassword = document.getElementById('invalid-forgetPassword')
var resetPass = document.getElementById('resetPass')





var users = []

if (localStorage.getItem('allUsers') != null) {
    users = JSON.parse(localStorage.getItem('allUsers'));

}

signupForm?.addEventListener('submit', function (e) {
    e.preventDefault()
    console.log('add')
    var userObj = {
        name: signupName.value,
        email: signupEmail.value,
        password: signupPassword.value
    }
    console.log(!isExist(users, userObj))
    if (check() && !isExist(users, userObj)) {
        success.classList.replace('d-none', 'd-block')
        users.push(userObj)
        console.log(users)
        localStorage.setItem('allUsers', JSON.stringify(users))
        clear()
        setTimeout(function () {
            window.location.href = './index.html'
        }, 2000)
    }
    else {
        success.classList.replace('d-block', 'd-none')
    }
})



for (var i = 0; i < selectedInput.length; i++) {
    selectedInput[i].addEventListener(('input'), function (e) {
        console.log(e.target.value)
        var inputId = e.target.id;
        var inputVal = e.target.value;
        validation(inputId, inputVal)

    })
}

function validation(id, value) {
    var regex = {
        signupName: /^[a-z]{3,15}/,
        signupEmail: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        signupPassword: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
        resetPass: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/
    }
    var element = document.getElementById(id)
    var errMsg = document.getElementById(id + 'Error')
    if (regex[id].test(value) == true) {
        console.log('valid')
        element.classList.add('is-valid')
        element.classList.remove('is-invalid')
        errMsg?.classList.replace('d-block', 'd-none')
        return true;

    }
    else {
        console.log('invalid')
        element.classList.add('is-invalid')
        element.classList.remove('is-valid')
        errMsg?.classList.replace('d-none', 'd-block')
        return false;
    }
}

function check() {
    if (validation(signupName.id, signupName.value)
        && validation(signupEmail.id, signupEmail.value)
        && validation(signupPassword.id, signupPassword.value)) {
        return true;
    }
    else {
        return false;
    }

}
var loginEmail, index;
function isExist(arr, newObj) {
    for (var i = 0; i < arr.length; i++) {
        console.log(arr[i])
        if (arr[i].email == newObj.email) {
            loginEmail = arr[i].email
            index = i;
            console.log(loginEmail, i)
            console.log('email is already exist')
            exist?.classList.replace('d-none', 'd-block')
            return true;
        }


    }


    console.log('not exist')
    exist?.classList.replace('d-block', 'd-none')
    return false;


}

function clear() {
    signupName.value = '',
        signupEmail.value = '',
        signupPassword.value = ''
    signupName.classList.remove('is-valid')
    signupEmail.classList.remove('is-valid')
    signupPassword.classList.remove('is-valid')
}



login?.addEventListener('submit', function (e) {
    e.preventDefault();
    console.log('login');
    var loginUser = {
        email: signinEmail.value,
        password: signinPassword.value
    }
    console.log((isExist(users, loginUser)))
    console.log(index)
    if (isExist(users, loginUser) && users[index].password == loginUser.password) {
        console.log('ok')
        invalid.classList.replace('d-block', 'd-none')
        setTimeout(function () {
            window.location.href = './home.html'
        }, 2000)
        console.log(users[index].name)
        localStorage.setItem('userName', users[index].name)
    }
    else {
        invalid.classList.replace('d-none', 'd-block')
    }

})



if (localStorage.getItem('userName') != null) {
    username.innerHTML += ' ' + localStorage.getItem('userName');

}
logOut?.addEventListener('click', function () {
    localStorage.removeItem('userName');
    window.location.href = './index.html'
})

forgetPass?.addEventListener('submit', function (e) {
    e.preventDefault();
    console.log('forget')
    var verifyUser = {
        email: forgetPassEmail.value,
        password: resetPass.value
    }
    if (isExist(users, verifyUser)) {
        console.log('ok')
        if (validation(resetPass.id, resetPass.value)) {
            users[index].password = resetPass.value;
            console.log('updated')
            localStorage.setItem('allUsers', JSON.stringify(users))

            Swal.fire({
                icon: "success",
                title: "updated password",
            });
            invalid_forgetPassword.classList.replace('d-block', 'd-none')

        }

    }
    else {
        invalid_forgetPassword.classList.replace('d-none', 'd-block')
    }
})








