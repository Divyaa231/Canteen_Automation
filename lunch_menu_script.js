
const cartbarItems = document.querySelector('.cartbar-items');
const cart = {};

function renderCartbar() {
    cartbarItems.innerHTML = '';
    const names = Object.keys(cart);
    if (names.length === 0) {
        cartbarItems.textContent = 'Cart is empty';
        return;
    }
    names.forEach(name => {
        const { price, qty } = cart[name];
        const itemDiv = document.createElement('div');
        itemDiv.className = 'cartbar-item';
        itemDiv.innerHTML = `<span>${name} x${qty}</span><span>₹${price * qty}</span>`;
        cartbarItems.appendChild(itemDiv);
    });
}

document.querySelectorAll('.CartAdd').forEach(button => {
    button.addEventListener('click', () => {
        const name = button.getAttribute('data-name');
        const price = parseInt(button.getAttribute('data-price'));
        if (cart[name]) {
            cart[name].qty += 1;
        } else {
            cart[name] = { price, qty: 1 };
        }
        renderCartbar();
    });
});

renderCartbar();
function showToast(){
    let toast = document.getElementById("toast");
    toast.innerHTML ="item was added to the cart!";
    toast.className = "show";

    setTimeout(()=>{
        toast.classList.remove("show");
    },1000)
}

document.querySelectorAll(".CartAdd").forEach(button =>{
    button.addEventListener("click",(e)=>{
        showToast();
        console.log("button clicked");
    })
})

let navcart = document.querySelector("#navcart");
let cartbar = document.querySelector(".cartbar");
navcart.addEventListener("click",(e)=>{
    console.log("navcart was clicked");
    cartbar.classList.toggle("show");
})


document.body.addEventListener("click", (e) => {
    if (cartbar.classList.contains("show")) {
        console.log("Body was clicked while cartbar was open");

       
        let clickedCartAdd = [...document.querySelectorAll(".CartAdd")]
            .some(button => button.contains(e.target));

      
        if (!cartbar.contains(e.target) &&
            !navcart.contains(e.target) &&
            !clickedCartAdd) {
            cartbar.classList.remove("show");
        }
    }
});





