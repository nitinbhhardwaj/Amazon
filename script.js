document.addEventListener("DOMContentLoaded", () => {

    const searchInput = document.querySelector(".search-input");
    const productBoxes = document.querySelectorAll(".box");

    if (searchInput) {
        searchInput.addEventListener("input", () => {
            const value = searchInput.value.toLowerCase();

            productBoxes.forEach(box => {
                const title = box.querySelector("h2").textContent.toLowerCase();

                if (title.includes(value)) {
                    box.style.display = "";
                } else {
                    box.style.display = "none";
                }
            });
        });
    }

    const backToTop = document.getElementById("backToTop");

    if (backToTop) {
        backToTop.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    let cartCount = parseInt(localStorage.getItem("cartCount")) || 0;

    const cartDisplay = document.getElementById("cartCount");

    if (cartDisplay) {
        cartDisplay.textContent = cartCount;
    }

    const cartButtons = document.querySelectorAll(".cart-btn");

    cartButtons.forEach(button => {
        button.addEventListener("click", () => {
            cartCount++;

            localStorage.setItem("cartCount", cartCount);

            if (cartDisplay) {
                cartDisplay.textContent = cartCount;
            }

            button.textContent = "Added ✓";

            setTimeout(() => {
                button.textContent = "Add to Cart";
            }, 1000);
        });
    });

    productBoxes.forEach(box => {
        box.addEventListener("mouseenter", () => {
            box.style.transform = "translateY(-8px)";
            box.style.transition = "0.3s";
        });

        box.addEventListener("mouseleave", () => {
            box.style.transform = "translateY(0)";
        });
    });

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.animate(
                    [
                        {
                            opacity: 0,
                            transform: "translateY(40px)"
                        },
                        {
                            opacity: 1,
                            transform: "translateY(0)"
                        }
                    ],
                    {
                        duration: 600,
                        fill: "forwards"
                    }
                );
            }
        });
    });

    productBoxes.forEach(box => {
        observer.observe(box);
    });

});
function updateClock() {
    const now = new Date();
    document.getElementById("clock").textContent =
        now.toLocaleString();
}

setInterval(updateClock, 1000);
updateClock();
const modal = document.getElementById("productModal");
const modalTitle = document.getElementById("modalTitle");

document.querySelectorAll(".box").forEach(box => {
    box.addEventListener("click", () => {
        modal.style.display = "flex";
        modalTitle.textContent =
            box.querySelector("h2").textContent;
    });
});

document.getElementById("closeModal").onclick = () => {
    modal.style.display = "none";
};
let wishlist = 0;

document.querySelectorAll(".wishlist-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        wishlist++;
        btn.textContent = "❤️";
    });
});
document.querySelectorAll(".box").forEach(box => {
    box.addEventListener("click", () => {
        localStorage.setItem(
            "recent",
            box.querySelector("h2").textContent
        );
    });
});

console.log(localStorage.getItem("recent"));
function showToast(message){
    const toast = document.getElementById("toast");

    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(()=>{
        toast.classList.remove("show");
    },2000);
}
showToast("Item added to cart");
const countries = [
    "India",
    "USA",
    "Canada",
    "Germany",
    "Australia"
];

setInterval(() => {
    const random =
        countries[Math.floor(Math.random()*countries.length)];

    document.getElementById("country").textContent = random;
},4000);
const theme = localStorage.getItem("theme");

if(theme === "dark"){
    document.body.classList.add("dark-mode");
}
function toggleTheme(){
    document.body.classList.toggle("dark-mode");

    localStorage.setItem(
        "theme",
        document.body.classList.contains("dark-mode")
        ? "dark"
        : "light"
    );
}
document.querySelectorAll(".box-content").forEach(box => {

    const rating =
        (Math.random()*2+3).toFixed(1);

    const stars =
        document.createElement("p");

    stars.innerHTML =
        `⭐ ${rating} / 5`;

    box.appendChild(stars);
});
let seconds = 3600;

setInterval(() => {

    let mins = Math.floor(seconds/60);
    let secs = seconds%60;

    document.getElementById("offerTimer")
    .textContent =
    `Offer Ends In ${mins}:${secs
        .toString()
        .padStart(2,"0")}`;

    seconds--;

},1000);
const voiceBtn =
document.getElementById("voiceBtn");

const searchInput =
document.querySelector(".search-input");

voiceBtn.addEventListener("click", () => {

    const recognition =
    new webkitSpeechRecognition();

    recognition.start();

    recognition.onresult = e => {
        searchInput.value =
        e.results[0][0].transcript;

        searchInput.dispatchEvent(
            new Event("input")
        );
    };
});