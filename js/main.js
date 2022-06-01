var hamburger = document.querySelectorAll(".hamburger")
var section2 = document.querySelector(".page__section__2")
options = {
    rootMargin : "-100px 0px 0px 0px"
}

var iconObserver = new IntersectionObserver(function (entries, iconObserve) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                console.log("It is not intersecting")
            } else {
                if (entry.isIntersecting) {
                    console.log("It's intersecting")
                }
            }
        })
    }, options)
iconObserver.observe(section2)