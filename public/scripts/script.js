
document.addEventListener("DOMContentLoaded", function(){  

     fetch("recommendations.json")
     .then(response => response.json())
     .then(data => {
       // console.log(data)
         data.recommendations.forEach(message => {
         //   console.log(message)
             // createCard(blog.title);
            //  createAndAppendCard(blog.title, blog.preview, blog.time)
             createRecommendation(message.message)
         });
     })
     .catch(error => {
         console.error('Error fetching blogs:', error);
     });
 })
 

let form = document.getElementById("recommendation-id");
form.addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent default form submission

    let formData = new FormData(form);
    fetch("/", {
        method: "POST",
        body: formData
    })
    .then(response => response.text())
    .then(() => {
        Swal.fire({
            title: "Thank you!",
            text: "Recommendation has been recommended!",
            icon: "success"
        }).then(() => {
            fetch("recommendations.json")
                .then(response => response.json())
                .then(data => {
                    document.getElementById("container").innerHTML = ''; // Clear existing recommendations
                    data.recommendations.forEach(message => {
                        createRecommendation(message.message);
                    });
                })
                .catch(error => {
                    console.error('Error fetching recommendations:', error);
                });
            form.reset(); // Reset form fields
        });
    })
    .catch(error => {
        console.error('Error submitting form:', error);
    });
});





function createRecommendation(text){
    let container = document.getElementById("container")
    let card = document.createElement("div");
    let card_text = document.createElement("h1")
    card_text.innerText = text;
    card.appendChild(card_text)
    container.appendChild(card);
    card.classList.add("recommendation-box");
}