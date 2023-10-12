const _ = (element) => {
    return document.querySelector(element)
}

let icon1 = _(".icon1")
let form = _("#form")
let fname = _("#fname")
let email = _("#email")
let message = _("#others")
let contactBtn = _("#contact-btn")
icon1.addEventListener("click", function(){
    form.reset()
})

const SendContactDataToServer = async (url) => {
    const dataTosend = {
        full_name: fname.value,
        email: email.value,
        message: message.value
    }
    const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(dataTosend),
        headers: {
            "content-type": "application/json"
        }
    });
    const json = await response.json()
    if(json.response == "error") {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: "An error occured. Pls try again shortly.",
          })
    }
    else if(json.response == "fields_error"){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: "Fill empty fields",
          })
    }
    else if (json.response == "email_error"){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: json.message,
          })
    }

    else if (json.response == "message_error") {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: json.message,
          })
    } else if (json.response == "mail_error") {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: json.message,
          })
    }
    else if(json.response == "success"){
        Swal.fire({
            icon: 'success',
            title: 'Details Sent',
            text: "We will contact you shortly via provided email.",
          }).then(() => {
            form.reset()
          })
        
    }

    else{
        Swal.fire({
            icon: 'error',
            title: 'Error occured',
            text: "So sorry, an unknown error occured, pls try again later.",
          })
    }

    contactBtn.disabled = false
    contactBtn.innerText = "Submit"
}


contactBtn.addEventListener("click", () => {
    contactBtn.disabled = true
    contactBtn.innerText = "Processing..."
    SendContactDataToServer("https://portfolio-backend-0mjz.onrender.com/api/contact")
})

