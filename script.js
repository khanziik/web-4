
const contactForm= document.getElementById("contactForm");
const registrationForm = document.getElementById ("registrationForm");


function updateForm(form) {
    const password=form.querySelector ("#password");
    const confirmPassword =form.querySelector("#confirmPassword");

    if (password && confirmPassword) {
        if (confirmPassword.value !== password.value) {
            confirmPassword.setCustomValidity("Passwords do not match");
        } else {
            confirmPassword.setCustomValidity("");
        
        }
    }

    const fields = form.querySelectorAll("input, textarea, select");

    fields.forEach(function (field){
        if (field.type === "radio") {
        const radios = form.querySelectorAll(
                 'input[name="' + field.name + '"]'
            );
            const selected = Array.from(radios).some(function (radio){
                return radio.checked;
            });


            radios.forEach(function (radio) {
                radio.classList.toggle("is-valid", selected);
                radio.classList.toggle("is-invalid", !selected);
            });

            const feedback= form.querySelector("#genderFeedback");
            if (feedback){
                feedback.style.display = selected ? "none" : "block";
            }
        } else if (field.type !== "checkbox") {
            field.classList.toggle("is-valid", field.checkValidity());
            field.classList.toggle("is-invalid", !field.checkValidity());
        }
    });
}


if (contactForm){
    contactForm.addEventListener("submit", function (event){
        event.preventDefault();
        updateForm(contactForm);

        if (contactForm.checkValidity()) {
            document.getElementById("contactResult").textContent =
                "your form is valid";
        } else {
            document.getElementById("contactResult").textContent =
                "correct the fields marked in red!";
        }
    });


    contactForm.addEventListener("input", function () {
        updateForm(contactForm);
        document.getElementById("contactResult").textContent = "";
    });
    contactForm.addEventListener("reset", function () {
        contactForm.querySelectorAll(".is-valid, .is-invalid")
            .forEach(function (field) {
                field.classList.remove("is-valid", "is-invalid");
            });
        document.getElementById("contactResult").textContent = "";
    });
}

if (registrationForm) {
    registrationForm.addEventListener("submit", function (event) {
        event.preventDefault();
        updateForm(registrationForm);   


        if (registrationForm.checkValidity()) {
            document.getElementById("registrationResult").textContent =
                "Registration form is valid";
        } else {
            document.getElementById("registrationResult").textContent =
                " correct the fields marked in red";
        }
    });


    registrationForm.addEventListener("input", function () {
        updateForm(registrationForm);
        document.getElementById("registrationResult").textContent = "";
    });


    registrationForm.addEventListener("change", function () {
        updateForm(registrationForm);
    });


    registrationForm.addEventListener("reset", function () {
        registrationForm.querySelectorAll(".is-valid, .is-invalid")
            .forEach(function (field) {
                field.classList.remove("is-valid", "is-invalid");
            });


        const feedback = document.getElementById("genderFeedback");
        feedback.style.display = "none";
        document.getElementById("registrationResult").textContent = "";
    });
}
