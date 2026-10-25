document.addEventListener("DOMContentLoaded", () => {
    const faqQuestions = document.querySelectorAll(".faq-question");
    faqQuestions.forEach(question => {
        question.addEventListener("click", () => {
            const answer = question.nextElementSibling;
            const icon = question.querySelector("span");
            if (answer.style.display === "none" || answer.style.display === "") {
                answer.style.display = "block";
                icon.textContent = "-";
            } else {
                answer.style.display = "none";
                icon.textContent = "+";
            }
        });
    });

    const contactBtn = document.getElementById("contactUsBtn");
    const popupForm = document.getElementById("popupForm");
    const closePopup = document.getElementById("closePopup");

    if (contactBtn && popupForm) {

        contactBtn.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            popupForm.style.display = "flex";
        });
    }

    if (closePopup && popupForm) {

        closePopup.addEventListener("click", () => {
            popupForm.style.display = "none";
        });
    }

    window.addEventListener("click", (e) => {
        if (e.target === popupForm) {
            popupForm.style.display = "none";
        }
    });

    const form = document.getElementById("contactForm");
    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            
            const email = document.getElementById("popEmail").value;
            const password = document.getElementById("popPassword").value;
            const confirm = document.getElementById("popConfirm").value;
            
            const emailError = document.getElementById("emailError");
            const passwordError = document.getElementById("passwordError");
            const confirmError = document.getElementById("confirmError");
            
            let isValid = true;

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                emailError.style.display = "block";
                isValid = false;
            } else {
                emailError.style.display = "none";
            }

            if (password.length < 6) {
                passwordError.style.display = "block";
                isValid = false;
            } else {
                passwordError.style.display = "none";
            }

            if (password !== confirm) {
                confirmError.style.display = "block";
                isValid = false;
            } else {
                confirmError.style.display = "none";
            }

            if (isValid) {
                alert("Form send succesfully!");
                form.reset();
                popupForm.style.display = "none";
            }
        });
    }
});


/* Task 4: Change Background Color */

const changeBackgroundBtn = document.getElementById("changeBackgroundBtn");

const backgroundColors = [
    "#0b0b0b",
    "#102a43",
    "#243b2f",
    "#3b243a",
    "#302b1d"
];

let backgroundColorIndex = 0;

if (changeBackgroundBtn) {
    changeBackgroundBtn.addEventListener("click", function() {
        backgroundColorIndex++;

        if (backgroundColorIndex >= backgroundColors.length) {
            backgroundColorIndex = 0;
        }

        document.body.style.backgroundColor =
            backgroundColors[backgroundColorIndex];
    });
}


/* Task 5: Display Current Date and Time */

const currentDateTime = document.getElementById("currentDateTime");

function updateDateTime() {
    const now = new Date();

    const formattedDate = new Intl.DateTimeFormat("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
        hour12: true
    }).format(now);

    if (currentDateTime) {
        currentDateTime.textContent = formattedDate;
    }
}

updateDateTime();
setInterval(updateDateTime, 1000);


/* Animation of transitions between pages */

document.addEventListener("DOMContentLoaded", () => {
    const overlay = document.getElementById("pageOverlay");

    if (overlay) {
        overlay.classList.remove("active");
    }

    document.querySelectorAll("a[href]").forEach(link => {
        link.addEventListener("click", (e) => {
            const href = link.getAttribute("href");
            if (href && !href.startsWith("#") && !href.startsWith("http") && href !== "#" && link.id !== "contactUsBtn") {
                e.preventDefault();
                if (overlay) {
                    overlay.classList.add("active");
                    setTimeout(() => {
                        window.location.href = href;
                    }, 250);
                } else {
                    window.location.href = href;
                }
            }
        });
    });
});


/* Sound Randomizer */

/* Sound Randomizer */

const playRandomSoundBtn = document.getElementById("playRandomSoundBtn");

const soundFiles = [
    "assets/sounds/sound1.mp3",
    "assets/sounds/sound2.mp3",
    "assets/sounds/sound3.mp3",
    "assets/sounds/sound4.mp3",
    "assets/sounds/sound5.mp3",
    "assets/sounds/sound6.mp3",
    "assets/sounds/sound7.mp3"
];

let currentAudio = null;
let lastSoundIndex = -1;

if (playRandomSoundBtn) {
    playRandomSoundBtn.addEventListener("click", function() {
        if (soundFiles.length === 0) return;

        let randomIndex;

        if (soundFiles.length > 1) {
            do {
                randomIndex = Math.floor(Math.random() * soundFiles.length);
            } while (randomIndex === lastSoundIndex);
        } else {
            randomIndex = 0;
        }

        lastSoundIndex = randomIndex;
        const selectedSound = soundFiles[randomIndex];

        if (currentAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
        }

        currentAudio = new Audio(selectedSound);
        currentAudio.volume = 0.5;

        currentAudio.play().catch(error => {
            console.warn("Audio error:", error);
        });
    });
}