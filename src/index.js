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
        divImg.id = obj.id;
        divRate.textContent = obj.rating;
        divComment.textContent = obj.comment;
    })
    // Delete items from db
    const del = document.createElement("button");
    del.textContent = "<<Del";
    del.addEventListener("click", () => {
        imgDiv.remove();
        fetch(`http://localhost:3000/ramens/${obj.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
        location.reload();
    });
    imgDiv.appendChild(del);
    // Patch items in db
    // const patch = document.createElement('button');
    // patch.addEventListener("click", () => {

    // })
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
        divImg.id = obj[0].id;
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
    console.log(divImg.id);
    fetch(`http://localhost:3000/ramens/${divImg.id}`, {
        method: "PATCH",
        body: JSON.stringify({
            rating: divRate.textContent,
            comment: divComment.textContent
        }),
        headers: {
            "Content-Type": "application/json"
        }
    })
})

// Post item
const create = document.querySelector('#create');
create.addEventListener("click", (e) => {
    e.preventDefault();
    const els = e.target.parentNode.elements
    fetch("http://localhost:3000/ramens", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: JSON.stringify({
            name: `${els["new-name"].value}`,
            restaurant: `${els["new-restaurant"].value}`,
            image: `${els["new-image"].value}`,
            rating: `${els["new-rating"].value}`,
            comment: `${els["new-comment"].value}`
        })
    })
})
