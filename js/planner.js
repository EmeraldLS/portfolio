let icon1 = document.querySelector(".icon1")
let form = document.querySelector("#form")
icon1.addEventListener("click", function () {
    form.reset()
})

function _(element) {
    return document.querySelector(element)
}

let fname = _("#fname")
let email = _("#email")
let project = _("#project")
let budget = _("#budget")
let message = _("#details") 
let plannerBtn = _("#plannerBtn")


const SendPlannerDataToServer = async (url) => {
    const dataTosend = {
        full_name: fname.value,
        email: email.value,
        message: message.value,
        project: project.value,
        budget: budget.value,
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
    plannerBtn.disabled = false
    plannerBtn.innerText = "Submit"
}

plannerBtn.addEventListener("click", () => {
    plannerBtn.disabled = true
    plannerBtn.innerText = "Processing..."
    SendPlannerDataToServer("https://portfolio-backend-0mjz.onrender.com/api/planner-enquiry")
})
