let icon1 = document.querySelector(".icon1")
let form = document.querySelector("#form")

function _(element) {
    return document.querySelector(element)
}

let fname = _("#fname")
let email = _("#email")
let project = _("#project")
let interest = _("#interest")
let message = _("#details") 
let startupBtn = _("#startupBtn")



icon1.addEventListener("click", function(){
    form.reset()
})

const SendStartupDataToServer = async (url) => {
    const dataTosend = {
        full_name: fname.value,
        email: email.value,
        message: message.value,
        project: project.value,
        interest: interest.value,
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
    }
    else if (json.response == "mail_error") {
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

    startupBtn.disabled = false
    startupBtn.innerText = "Submit"

}

startupBtn.addEventListener("click", () => {
    startupBtn.disabled = true
    startupBtn.innerText = "Processing..."
        SendStartupDataToServer("https://mybackendportfolio.up.railway.app/api/startup-enquiry")

})