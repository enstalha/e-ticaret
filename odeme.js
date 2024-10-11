// ! Kart Numarasını Güncelleme
const cardNumberInput = document.querySelector(".card-number-input");
const cardNumberBox = document.querySelector(".card-number-box");

cardNumberInput.addEventListener("input", () => {
    const cardNumber = cardNumberInput.value;

    cardNumberBox.textContent = cardNumber;

    if(cardNumber == ""){
        cardNumberBox.textContent = "################";
    }
})


// ! Kart Sahibinin İsmini Güncelleme
const cardHolderInput = document.querySelector(".card-holder-input");
const cardHolderName = document.querySelector(".card-holder-name");

cardHolderInput.addEventListener("input", () => {
    cardHolderName.textContent = cardHolderInput.value;

    if(cardHolderInput.value == ""){
        cardHolderName.textContent = "Full Name";
    }
})


// ! Tarih Güncelleme
const monthInput = document.querySelector(".month-input");
const yearInput = document.querySelector(".year-input");
const expMonth = document.querySelector(".exp-month");
const expYear = document.querySelector(".exp-year");

monthInput.addEventListener("input", () => {
    expMonth.textContent = monthInput.value;
})

yearInput.addEventListener("input", () => {
    expYear.textContent = yearInput.value;
})


// ! CVV Bilgisinde Kartı Çevirmek İçin;
const cvvInput = document.querySelector(".cvv-input");
const front = document.querySelector(".front");
const back = document.querySelector(".back");

cvvInput.addEventListener("mouseenter", () => {
    front.style.transform = "perspective(1000px) rotateY(-180deg)";
    back.style.transform = "perspective(1000px) rotateY(0deg)";
})

cvvInput.addEventListener("mouseleave", () => {
    front.style.transform = "perspective(1000px) rotateY(0deg)";
    back.style.transform = "perspective(1000px) rotateY(+180deg)";
})


// ! CVV Alanı Güncelleme
const cvvBox = document.querySelector(".cvv-box");

cvvInput.addEventListener("input", () => {
    cvvBox.textContent = cvvInput.value;
})


// ! Loading Ekranı İçin (Modalı İçin);
const loadingImg = document.querySelector(".loading-img");
const odemeBtn = document.querySelector("#odemeBtn");
const modalMessage = document.querySelector("#modalMessage");

odemeBtn.addEventListener("click", () => {   
    modalMessage.textContent = "Ödemeniz Alınıyor...";
    loadingImg.src = "img/loadingg.gif";

    setTimeout(() => {
        loadingImg.src = "img/onay.jpg";
        loadingImg.style.width = "30px";
        loadingImg.style.height = "250px";
        modalMessage.textContent = "Ödeme Başarılı!";

        // ! 1 Saniye Sonra Modalı Kapatmak İçin
        setTimeout(() => {
            const modalElement = document.querySelector("#staticBackdrop");
            const modal = bootstrap.Modal.getInstance(modalElement);
            modal.hide();
        },1000)

    },3000)
    
})

