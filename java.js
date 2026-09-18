// document.addEventListener("DOMContentLoaded", () => {
//     const includes = [
//         { id: "navbar", file: "styles/navbar.html" },
//         { id: "footer", file: "styles/footer.html" }
//     ];

//     includes.forEach(({ id, file }) => {
//         const el = document.getElementById(id);
//         if (el) {
//             fetch(file)
//                 .then(response => {
//                     if (!response.ok) throw new Error(`Cannot load ${file}`);
//                     return response.text();
//                 })
//                 .then(html => {
//                     el.innerHTML = html;
//                 })
//                 .catch(err => {
//                     console.error(err);
//                     el.innerHTML = `<p style="color:red;">Error loading ${file}</p>`;
//                 });
//         }
//     });
// });

fetch("/styles/navbar.html")
    .then(response => {
        if (!response.ok) throw new Error("Navbar nije pronađen");
        return response.text();
    })
    .then(data => {
        document.getElementById("navbar").innerHTML = data;
    })
    .catch(error => console.error(error));
fetch("/styles/footer.html")
    .then(response => {
        if (!response.ok) throw new Error("Footer nije pronađen");
        return response.text();
    })
    .then(data => {
        document.getElementById("footer").innerHTML = data;
    })
    .catch(error => console.error(error));

/*brojke o nama*/
const counters = document.querySelectorAll('.broj');
let started = false;


function startCounter(entries) {
if (entries[0].isIntersecting && !started) {
started = true;
counters.forEach(counter => {
const target = +counter.getAttribute('data-target');
let value = 0;
const increment = target / 70; //brzina


const update = () => {
value += increment;
if (value < target) {
counter.textContent = Math.floor(value);
requestAnimationFrame(update);
} else {
counter.textContent = target;
}
counter.style.opacity = 1;
counter.style.transform = 'translateY(0)';
};


update();
});
}
}


const observer = new IntersectionObserver(startCounter, {
threshold: 0.3
});



const _brojkeGrid = document.querySelector('.brojke-grid');
if (_brojkeGrid) {
    observer.observe(_brojkeGrid);
} else {

}

/*otvaranje sertifikata*/

const certificateImages = document.querySelectorAll(".certificate-clickable");
const lightbox = document.getElementById("certificateLightbox");
const lightboxImage = document.getElementById("lightboxImage");
const closeButton = document.getElementById("lightboxClose");
certificateImages.forEach(image => {
    image.addEventListener("click", () => {
        lightboxImage.src = image.src;
        lightboxImage.alt = image.alt;
        lightbox.classList.add("active");
        document.body.style.overflow = "hidden";
    });
});
function closeLightbox() {
    lightbox.classList.remove("active");
    document.body.style.overflow = "";
}
closeButton.addEventListener("click", closeLightbox);
lightbox.addEventListener("click", event => {
    if (event.target === lightbox) {
        closeLightbox();
    }
});
document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        closeLightbox();
    }
});


/*da se pusti samo video koji je trenutno prikazan u karuselu */
const videoCarousel = document.getElementById("ivicnjaciVideoCarousel");
const videos = videoCarousel.querySelectorAll("video");
function playActiveVideo(){
    videos.forEach(video => {
        video.muted = true;
        if(video.closest(".carousel-item").classList.contains("active")){
            video.play().catch(() => {});
        }else{
            video.pause();
        }
    });
}
playActiveVideo();
videoCarousel.addEventListener("slid.bs.carousel", playActiveVideo);