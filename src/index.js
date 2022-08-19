// write your code here
const divName = document.querySelector(".name");
const divRes = document.querySelector(".restaurant");
const divImg = document.querySelector(".detail-image");
const divRate = document.querySelector("#rating-display");
const divComment = document.querySelector("#comment-display");

function placeImg(obj) {
    const imgDiv = document.createElement('div');
    const pin = document.createElement('img');
    pin.id = obj.id
    pin.src = obj.image;
    imgDiv.appendChild(pin);
    document.getElementById("ramen-menu").appendChild(imgDiv);
    pin.addEventListener("click", () => {
        divName.textContent = obj.name;
        divRes.textContent = obj.restaurant
        divImg.src = obj.image;
        divRate.textContent = obj.rating;
        divComment.textContent = obj.comment;
    })
    const del = document.createElement("button");
    del.textContent = "<<Del";
    del.addEventListener("click", () => {
        imgDiv.remove();
        fetch(`http://localhost:3000/ramens/${obj.id}`,{
            method:"DELETE",
            headers:{
                "Content-Type":"application/json"
            }
        })
        location.reload();
    });
    imgDiv.appendChild(del);
}
fetch("http://localhost:3000/ramens")
    .then(resp => resp.json())
    .then(obj => {
        for (element of obj) {
            console.log(element);
            placeImg(element);
        }
        // Advanced deliverables
        divName.textContent = obj[0].name;
        divRes.textContent = obj[0].restaurant;
        divImg.src = obj[0].image;
        divRate.textContent = obj[0].rating;
        divComment.textContent = obj[0].comment;
    });
// Advanced Deliverables
// Update item
const sub = document.querySelector("#edit-ramen");
sub.addEventListener("submit", (e) => {
    e.preventDefault();
    // changes on frontend only and no backend
    divRate.textContent = e.target.elements["new-rating"].value;
    divComment.textContent = e.target.elements["new-comment"].value;
})

