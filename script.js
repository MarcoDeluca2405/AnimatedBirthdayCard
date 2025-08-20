const envelope = document.querySelector(".envelope");
const topFlap = document.querySelector(".top-flap");
const letter = document.querySelector(".letter");

const letter_front = document.querySelector(".letter-front");
const letter_back = document.querySelector(".letter-back");

const content = document.querySelector(".front-content");

const helper = document.querySelector(".helper");

const helper_text = document.querySelector(".text-helper");

const happy_birthday = new Audio("public/happy_birthday.mp3");
happy_birthday.loop = true;

const bubbleSrc = "public/bubble.mp3";
const preloadBubble = new Audio(bubbleSrc);
preloadBubble.load();

var isFirst = false;
var isFinishAnimationOne = false;
var count = 0;

envelope.addEventListener("click", () => {
  envelope.classList.add("open");
  const isOpen = envelope.classList.contains("open");
  if (isFinishAnimationOne) ++count;

  console.log(isOpen);
  if (isOpen && !isFirst) {
    isFirst = true;
    ++count;

    envelope.style.transform = "translateY(0%)";
    envelope.classList.remove("firstAn");

    helper.classList.remove("helperAn");
    helper.classList.add("helperAn2");

    // apri flap
    topFlap.style.transform = "rotateX(180deg)";
    topFlap.style.zIndex = "0";

    setTimeout(() => {
      const heartsCount = Math.floor(Math.random() * 10) + 7;
      for (let i = 0; i < heartsCount; i++) {
        setTimeout(() => {
          createHeart();
          const bubbleClone = preloadBubble.cloneNode();
          bubbleClone
            .play()
            .catch((err) => console.log("Audio non riprodotto:", err));
        }, i * 300);
      }
    }, 500);

    // lettera sale
    setTimeout(() => {
      letter.style.bottom = "150px"; // solleva
    }, 1000);

    // busta scompare
    setTimeout(() => {
      envelope.classList.add("disappear");
    }, 2500);

    // lettera si apre come libro
    setTimeout(() => {
      letter.classList.remove("closed");
      letter.classList.add("opened");
    }, 3000);

    setTimeout(() => {
      letter.style.bottom = "0px";
    }, 3500);

    setTimeout(() => {
      letter_back.classList.add("rotate");
    }, 4000);

    setTimeout(() => {
      letter_front.classList.add("rotate");
    }, 4035);

    setTimeout(() => {
      letter_front.classList.add("rotate");
    }, 4035);

    setTimeout(() => {
      letter_front.classList.add("moveY");
      letter_back.classList.add("moveY");
    }, 5100);

    setTimeout(() => {
      letter_front.classList.add("zoom1");
      letter_back.classList.add("zoom1");

      isFinishAnimationOne = true;
      helper.classList.remove("helperAn2");
      helper.classList.add("helperAn");
      helper_text.textContent = "PREMI NUOVAMENTE";
      helper_text.setAttribute("data-text", "PREMI NUOVAMENTE");
    }, 6000);
  }

  if (count == 2 && isFinishAnimationOne) {
    helper.classList.remove("helperAn");
    helper.classList.add("helperAn2");

    setTimeout(() => {
      letter_front.classList.add("backzoom");
      letter_back.classList.add("backzoom");
    }, 350);

    setTimeout(() => {
      letter_front.classList.add("open");
      setTimeout(() => {
        content.style.display = "none";
        happy_birthday.play();
      }, 900);
      letter_back.classList.add("open");
    }, 1000);

    setTimeout(() => {
      letter_front.classList.add("zoom");
      letter_back.classList.add("zoom");
    }, 1800);
  }
});

function createHeart() {
  const heart = document.createElement("div");
  heart.classList.add("heart");

  // Posizione casuale dentro la busta
  const left = Math.random() * 200 + 50; // evita i bordi estremi
  const bottom = 0;
  heart.style.left = `${left}px`;
  heart.style.bottom = `${bottom}px`;

  envelope.appendChild(heart);

  // Rimuove il cuore dopo l'animazione
  setTimeout(() => {
    heart.remove();
  }, 4000);
}
