function validate() {
    var password = document.getElementById("password");
    var confirmPassword = document.getElementById("confirm-password");
    var errorMessage = document.getElementById("error-passwords");
        
    var form = document.getElementById("form");
    function handleForm(event) { event.preventDefault(); } 

    if (password.value != confirmPassword.value) {
        errorMessage.textContent = '* Passwords do not match';
        password.classList.add("error");
        confirmPassword.classList.add("error");
        form.addEventListener("submit", handleForm); 
    }
}