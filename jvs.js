document.addEventListener("DOMContentLoaded", function () {

    function initInfiniteScroll(selector, speed = 0.5) {
        document.querySelectorAll(selector).forEach(container => {

            // On récupère les enfants d’origine
            const items = [...container.children];

            // On duplique les enfants proprement
            items.forEach(item => {
                const clone = item.cloneNode(true);
                container.appendChild(clone);
            });

            let scrollAmount = 0;

            function autoScroll() {
                scrollAmount += speed;
                container.scrollLeft = scrollAmount;

                // Si on dépasse la moitié → on reset discrètement
                if (scrollAmount >= container.scrollWidth / 2) {
                    scrollAmount = 0;
                }

                requestAnimationFrame(autoScroll);
            }

            autoScroll();
        });
    }

    initInfiniteScroll('.cards', 0.5);
    initInfiniteScroll('.cards3', 0.7);

});

// -----BOX ANIMATION-----
const zone = document.querySelector(".scroll-trigger");

const box1 = document.getElementById("box1");
const box2 = document.getElementById("box2");
const box3 = document.getElementById("box3");

window.addEventListener("scroll", () => {
    const rect = zone.getBoundingClientRect();

    let progress = (window.innerHeight - rect.top) / rect.height;
    progress = Math.max(0, Math.min(1, progress));

    // Phase 1 : Image 1
    if (progress < 0.33) {
        box1.style.opacity = 1;
        box2.style.opacity = 0;
        box3.style.opacity = 0;
    }
    // Phase 2 : transition image 1 → 2
    else if (progress < 0.66) {
        let p = (progress - 0.33) / 0.33;
        box1.style.opacity = 1 - p;  // disparait
        box2.style.opacity = p;      // apparait
        box3.style.opacity = 0;
    }
    // Phase 3 : transition image 2 → 3
    else {
        let p = (progress - 0.66) / 0.34;
        box1.style.opacity = 0;
        box2.style.opacity = 1 - p;  // disparait
        box3.style.opacity = p;      // apparait
    }
});

// -----END BOX ANIMATION-----