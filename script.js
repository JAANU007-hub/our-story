/* =========================================================
   SETTINGS
========================================================= */

const USE_FINAL_VIDEO = true;

// =========================
// BMW BIRTHDAY INTRO
// =========================

const bmwIntroScreen = document.getElementById("bmwIntroScreen");
const bmwIntroVideo = document.getElementById("bmwIntroVideo");
const skipBMW = document.getElementById("skipBMW");

function finishBMWIntro() {

    if (bmwIntroVideo) {
        bmwIntroVideo.pause();
        bmwIntroVideo.currentTime = 0;
    }

    if (bmwIntroScreen) {
        bmwIntroScreen.classList.remove("active");
    }

    showScreen("introScreen");
}

if (bmwIntroVideo) {
    bmwIntroVideo.addEventListener("ended", finishBMWIntro);

    bmwIntroVideo.addEventListener("error", finishBMWIntro);

    bmwIntroVideo.play().catch(() => {
        // Browser autoplay restriction
    });
}

if (skipBMW) {
    skipBMW.addEventListener("click", finishBMWIntro);
}
/* =========================================================
   SCREEN SYSTEM
========================================================= */

const screens = document.querySelectorAll(".screen");


function showScreen(id) {

    screens.forEach(screen => {

        screen.classList.remove("active");

    });


    const target = document.getElementById(id);

    if (!target) return;


    requestAnimationFrame(() => {

        target.classList.add("active");

    });

}


/* =========================================================
   INTRO
========================================================= */

const bgMusic = document.getElementById("bgMusic");

bgMusic.volume = 0.25;

enterStory.addEventListener("click", () => {
    showScreen("mapScreen");
    bgMusic.play().catch(() => {});
});

/* SPACE TO ENTER */

document.addEventListener("keydown", event => {

    if (
        event.code === "Space" &&
        document
            .getElementById("introScreen")
            .classList.contains("active")
    ) {

        event.preventDefault();

        showScreen("mapScreen");
    }

});


/* =========================================================
   MAP → LEVEL
========================================================= */

const levelNodes =
    document.querySelectorAll(".level-node");


levelNodes.forEach(node => {

    node.addEventListener("click", () => {

        const chapter =
            node.dataset.chapter;

        showScreen(chapter);

    });

});


/* =========================================================
   MAP BUTTONS
========================================================= */

const mapButtons =
    document.querySelectorAll("[data-back]");


mapButtons.forEach(button => {

    button.addEventListener("click", () => {

        showScreen(
            button.dataset.back
        );

    });

});


/* =========================================================
   DIRECT LEVEL → LEVEL
========================================================= */

const continueButtons =
    document.querySelectorAll("[data-next]");


continueButtons.forEach(button => {

    button.addEventListener("click", () => {

        const next =
            button.dataset.next;

        showScreen(next);

    });

});


/* =========================================================
   LEVEL 01 — MEMORY CARDS
========================================================= */

const envelopeCards =
    document.querySelectorAll(
        ".envelope-card"
    );


const storyPieces =
    document.querySelectorAll(
        ".story-reveal p"
    );


envelopeCards.forEach(card => {

    card.addEventListener("click", () => {

        const targetId =
            card.dataset.reveal;

        storyPieces.forEach(piece => {

            piece.classList.remove("visible");

        });


        const target =
            document.getElementById(targetId);


        if (target) {

            target.classList.add("visible");

        }

    });

});


/* =========================================================
   LEVEL 01 — PROPOSAL MOMENT
========================================================= */

const proposalScene =
    document.getElementById(
        "proposalScene"
    );


let proposalTimer;


envelopeCards.forEach(card => {

    card.addEventListener("click", () => {

        clearTimeout(proposalTimer);


        /*
         * Show the special scene only
         * when the final memory is opened.
         */

        if (
            card.dataset.reveal === "story4"
        ) {

            proposalTimer = setTimeout(() => {

                proposalScene.classList.add("show");

            }, 900);

        }

    });

});


proposalScene.addEventListener("click", () => {

    proposalScene.classList.remove("show");

});


/* =========================================================
   LEVEL 02 — ROMANTIC STORY
========================================================= */
/* =========================================================
   LEVEL 02 — CRICKET STORY
========================================================= */

const storyCards =
    document.querySelectorAll(
        ".story-card"
    );

const storyControls =
    document.querySelectorAll(
        ".story-control"
    );


storyControls.forEach(control => {

    control.addEventListener("click", () => {

        const index =
            Number(
                control.dataset.story
            );


        /* Change active card */

        storyCards.forEach((card, i) => {

            card.classList.toggle(
                "active",
                i === index
            );

        });


        /* Change active navigation */

        storyControls.forEach(button => {

            button.classList.remove(
                "active"
            );

        });

        control.classList.add(
            "active"
        );

    });

});


/* =========================================================
   LEVEL 03 — MANGA PANELS
========================================================= */

/* =========================================================
   LEVEL 03 — ANIME STORY
========================================================= */

const animeLines =
    document.querySelectorAll(
        ".anime-line"
    );

const animeDots =
    document.querySelectorAll(
        ".anime-dot"
    );

let animeStoryTimer;

let animeIndex = 0;


/* Show one story line */

function showAnimeStory(index) {

    animeLines.forEach((line, i) => {

        line.classList.toggle(
            "active",
            i === index
        );

    });


    animeDots.forEach((dot, i) => {

        dot.classList.toggle(
            "active",
            i === index
        );

    });

}


/* Start anime story */

function startAnimeStory() {

    clearInterval(
        animeStoryTimer
    );

    animeIndex = 0;

    showAnimeStory(0);


    animeStoryTimer =
        setInterval(() => {

            animeIndex++;

            if (
                animeIndex >=
                animeLines.length
            ) {

                clearInterval(
                    animeStoryTimer
                );

                return;
            }


            showAnimeStory(
                animeIndex
            );

        }, 4000);

}


/* Restart whenever Level 03 opens */

const chapter03 =
    document.getElementById(
        "chapter03"
    );


const animeObserver =
    new MutationObserver(() => {

        if (
            chapter03.classList.contains(
                "active"
            )
        ) {

            startAnimeStory();

        } else {

            clearInterval(
                animeStoryTimer
            );

        }

    });


animeObserver.observe(
    chapter03,
    {
        attributes: true,
        attributeFilter: ["class"]
    }
);


/* =========================================================
   LEVEL 04 — POLAROIDS
========================================================= */

const polaroids =
    document.querySelectorAll(
        ".polaroid"
    );


polaroids.forEach(card => {

    card.addEventListener("click", () => {

        card.classList.add("memory-pop");


        setTimeout(() => {

            card.classList.remove(
                "memory-pop"
            );

        }, 500);

    });

});


/* =========================================================
   FINAL VIDEO
========================================================= */

const forYouButton =
    document.getElementById(
        "forYouButton"
    );


const ourVideo =
    document.getElementById(
        "ourVideo"
    );


const videoPlaceholder =
    document.getElementById(
        "videoPlaceholder"
    );


const continueWithoutVideo =
    document.getElementById(
        "continueWithoutVideo"
    );


forYouButton.addEventListener("click", () => {

    showScreen("videoChapter");

    setupVideo();

});


function setupVideo() {

    if (!USE_FINAL_VIDEO) {

        videoPlaceholder.style.display =
            "flex";

        ourVideo.style.display =
            "none";

        return;
    }


    videoPlaceholder.style.display =
        "none";

    ourVideo.style.display =
        "block";


    ourVideo.currentTime = 0;


    const playPromise =
        ourVideo.play();


    if (playPromise !== undefined) {

        playPromise.catch(() => {

            videoPlaceholder.style.display =
                "flex";

        });

    }

}


/* video ended */

ourVideo.addEventListener(
    "ended",
    showThankYou
);


/* fallback */

ourVideo.addEventListener(
    "error",
    () => {

        videoPlaceholder.style.display =
            "flex";

        ourVideo.style.display =
            "none";

    }
);


/* Continue without video */

continueWithoutVideo.addEventListener(
    "click",
    showThankYou
);


/* =========================================================
   THANK YOU
========================================================= */

function showThankYou() {

    showScreen(
        "thankYouScreen"
    );


    const paragraphs =
        document.querySelectorAll(
            ".thank-you-text p"
        );


    paragraphs.forEach((paragraph, index) => {

        paragraph.style.opacity = "0";

        paragraph.style.transform =
            "translateY(15px)";


        setTimeout(() => {

            paragraph.style.transition =
                "opacity .7s ease, transform .7s ease";

            paragraph.style.opacity = "1";

            paragraph.style.transform =
                "translateY(0)";

        }, index * 450);

    });

}


/* =========================================================
   ESCAPE → MAP
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (event.key !== "Escape") return;


        const activeScreen =
            document.querySelector(
                ".screen.active"
            );


        if (
            activeScreen &&
            activeScreen.id !== "introScreen" &&
            activeScreen.id !== "mapScreen"
        ) {

            showScreen("mapScreen");

        }

    }
);


/* =========================================================
   PREVENT DOUBLE-TAP ZOOM
========================================================= */

let lastTouchEnd = 0;


document.addEventListener(
    "touchend",
    event => {

        const now =
            Date.now();


        if (
            now - lastTouchEnd <= 300
        ) {

            event.preventDefault();

        }


        lastTouchEnd = now;

    },
    {
        passive: false
    }
);


/* =========================================================
   INITIAL SCREEN
========================================================= */

showScreen("bmwIntroScreen");


console.log(
    "%cA + J — Our Story",
    "color:#ef9fba;font-size:20px;font-weight:bold;"
);