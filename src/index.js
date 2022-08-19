// write your code here
function placeImg(obj){
    const pin = document.createElement('img');
    const divName = document.querySelector(".name");
    const divRes = document.querySelector(".restaurant");
    const divImg = document.querySelector(".detail-image");
    const divRate = document.querySelector("#rating-display");
    const divComment = document.querySelector("#comment-display");
    pin.id= obj.name
    pin.src=obj.image;
    document.getElementById("ramen-menu").appendChild(pin)
    pin.addEventListener("click",(e)=>{
        divName.textContent = obj.name;
        divRes.textContent = obj.restaurant
        divImg.src = obj.image;
        divRate.textContent = obj.rating;
        divComment.textContent = obj.comment;
    })
}
fetch("http://localhost:3000/ramens")
    .then(resp => resp.json())
    .then(obj => {
        for (element of obj) {
            console.log(element);
            placeImg(element);
        }
    }
    )