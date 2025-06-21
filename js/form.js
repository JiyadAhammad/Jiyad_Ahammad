document.getElementById("send_message").addEventListener("click", function (e) {
    e.preventDefault();

    const isValid = validateForm();
    if (isValid) {
        const scriptUrl = "https://script.google.com/macros/s/AKfycbyiid4P4N85utduaBO_wJsaN0zvy-F26guFF8BMDWqfwppuffgD4B5zhN_Oya3wdOL_ug/exec";
        const form = document.getElementById("contact_form");
        const formData = new FormData(form);
        const data = new URLSearchParams(formData);

        const successBox = document.querySelector(".returnmessage");
        successBox.innerText = "Sending final message...";

        // alert(data);

        fetch(scriptUrl, {
            method: "POST",
            body: data,
        })
            .then((response) => response.text())
            .then((text) => {
                successBox.innerText = ''
                alert('Your message has been received. We will contact you soon. ' + text);
                // successBox.innerText = "Your message has been received. We will contact you soon.";
                form.reset();
            })
            .catch((error) => {
                showError("Error submitting the form. Please try again.");
                console.error(error);
            });

    }
});

function validateForm() {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const message = document.getElementById("message").value.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{8,12}$/;

    if (name === "") {
        showError("Please Enter the name");
        return false;
    }

    if (name.length < 3) {
        showError("Name must be at least 3 characters.");
        return false;
    }

    if (email === "") {
        showError("Please Enter your email");
        return false;
    }

    if (!emailRegex.test(email)) {
        showError("Please enter a valid email address.");
        return false;
    }

    if (phone === "") {
        showError("Please Enter your Mobile Number");
        return false;
    }

    if (!phoneRegex.test(phone)) {
        showError("Phone number must be between 8 and 12 digits.");
        return false;
    }

    if (message.length < 10) {
        showError("Message must be at least 10 characters.");
        return false;
    }

    if (phone === "") {
        showError("Please Enter your Mobile Number");
        return false;
    }

    // Clear any error if all is valid
    showError("");
    return true;
}

function showError(message) {
    const notice = document.querySelector(".empty_notice");
    const errorBox = notice.querySelector("span");

    if (message) {
        errorBox.innerText = message;
        notice.style.display = "block";  // Make sure it's visible
    } else {
        errorBox.innerText = "";
        notice.style.display = "none";  // Hide when there's no error
    }
}
