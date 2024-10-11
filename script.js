const url = 'https://fakestoreapi.com/products';
const row = document.querySelector(".row");

fetch(url)
.then((response) => { return response.json()})
.then((data) => {
    data.forEach((urun) => {
        row.innerHTML += `
        <div class="col-4 mb-4">
            <div class="card boyut">
                <img src="${urun.image}" class="card-img-top foto-boyut" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${urun.title}</h5>
                    <p class="card-price">${urun.price}₺</p>
                    <span class="fs-6">${urun.category}</span> <br>
                    <a id="addBtn" href="#" class="btn btn-primary add-to-cart-btn">Sepete Ekle</a>
                </div>
                </div>
        </div>
        `
    })
    sepeteEkle()
})


// ! Ürünler içerisinde arama yapmak
const form = document.querySelector("form");
const searchInput = document.querySelector("#searchInput");
const searchBtn = document.querySelector("#searchBtn");
form.addEventListener("submit", function(e){
    e.preventDefault();

    let searchTerm = searchInput.value.trim().toLocaleLowerCase("tr-TR");
    
    let cards = document.querySelectorAll(".col-4");

    let found = false;

    cards.forEach((card) => {
        let title = card.querySelector(".card-title").innerHTML;

        if(title.toLocaleLowerCase("tr-TR").includes(searchTerm)){
            card.style.display = "block";
            found = true;
        }else{
            card.style.display = "none";
        }
    })

    let warning = document.querySelector("#uyari");
    
    if (!found) {
        if (!warning) { // Eğer uyarı mesajı daha önce eklenmemişse
            let warningMessage = document.createElement("p");
            warningMessage.id = "uyari";
            warningMessage.textContent = "Aradığınız ürün yok!";
            row.appendChild(warningMessage); // Mesajı en sona ekleyin
        }
    } else {
        if (warning) {
            warning.remove(); // Eğer ürün varsa ve uyarı mesajı varsa, kaldırın
        }
    }
})


// ! Katogorileri ekrana getirmek için
const categoriesUrl = 'https://fakestoreapi.com/products/categories';
const dropdown = document.querySelector(".dropdown-menu");

fetch(categoriesUrl)
.then((response) => {return response.json()})
.then((data) => {
    data.forEach((category) => {
        const dropdownItem = document.createElement("li");
        dropdownItem.innerHTML = `<a class="dropdown-item" href="#">${category}</a>`
        dropdown.append(dropdownItem);

        dropdownItem.addEventListener("click", () => {
            fetchProductsByCategory(category);
        })
    })
})


// ! Belirli bir kategoriye göre ürünleri listelemek için;
// function fetchProductsByCategory(category) {
//     const spesificCategory = `https://fakestoreapi.com/products/category/${category}`

//     fetch(spesificCategory)
//     .then((response) => {return response.json()})
//     .then((data) => {
//         row.innerHTML = "";
//         data.forEach((urun) =>{
//             row.innerHTML += `
//         <div class="col-4 mb-4">
//             <div class="card boyut">
//                 <img src="${urun.image}" class="card-img-top foto-boyut" alt="...">
//                 <div class="card-body">
//                     <h5 class="card-title">${urun.title}</h5>
//                     <p class="card-price">${urun.price}₺</p>
//                     <span class="fs-6">${urun.category}</span> <br>
//                     <a id="addBtn" href="#" class="btn btn-primary">Sepete Ekle</a>
//                 </div>
//                 </div>
//         </div>
//         `
//         })
//     })
// }


function fetchProductsByCategory(category){
    const categoryUrl = `https://fakestoreapi.com/products/category/${category}`

    fetch(categoryUrl)
    .then((response) => {
        return response.json()
    })
    .then((data) =>{
        console.log(data)

        row.innerHTML = "";
        
        data.forEach((product) => {
            row.innerHTML +=`
            <div class="col-4 mb-4">
                <div class="card boyut" data-id=${urun.id}>
                    <img src="${product.image}" class="card-img-top foto-boyut" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${product.title}</h5>
                        <p class="card-price">${product.price}₺</p>
                        <span class="fs-6">${product.category}</span> <br>
                        <a id="addBtn" href="#" class="btn btn-primary add-to-cart-btn">Sepete Ekle</a>
                    </div>
                    </div>
            </div>
            `
        })
        sepeteEkle();
    })
}


// ! İlgili ürüne tıkladığımda beni onun detay sayfasına göndersin;
row.addEventListener("click", (e) => {
    const card = e.target.closest(".card");
    if(card && e.target.id != "addBtn"){
        const cardId = card.getAttribute("data-id");
        window.location.href = `detay.html?id=${cardId}`;
    }
})


// ! Sepete Ekleme
function sepeteEkle() {
    const urunler = document.querySelectorAll('.add-to-cart-btn');
    console.log(urunler)
    const modal_li = document.querySelector('.modal-li');

    // Bos sepet uyarisi
    let sepetBosUyarisi = document.querySelector('.sepet-bos');

    if(!sepetBosUyarisi) {
        sepetBosUyarisi = document.createElement('p');
        sepetBosUyarisi.classList.add('text-center','text-danger','fw-bold','fs-5','sepet-bos');
        sepetBosUyarisi.textContent = 'Sepetiniz Bos';
        modal_li.append(sepetBosUyarisi);
    }

    function sepetBosKontrol() {
        let urunSayisi = modal_li.querySelectorAll('.urun-bilgisi').length;
        if(urunSayisi == 0){
            sepetBosUyarisi.style.display = 'block';
        }else{
            sepetBosUyarisi.style.display = 'none'; 
        }
    }
    sepetBosKontrol()

    urunler.forEach((addBtn) => {
        addBtn.addEventListener('click', function(e){
            e.preventDefault();

            const urunCard = addBtn.closest('.card');
            const urunImg = urunCard.querySelector('.card-img-top').src;
            const urunBaslik = urunCard.querySelector('.card-title').innerText;
            const urunFiyat = urunCard.querySelector('.card-price').innerText;

            const fiyat = parseFloat(urunFiyat.replace('₺',''));

            const urun_wrapper = document.createElement('div');
            urun_wrapper.classList = 'urun-bilgisi d-flex justify-content-around align-items-center mb-3 text-center';

            urun_wrapper.innerHTML = `
                <div class="fotograf col">
                    <img width="100px" height="100px" src="${urunImg}" alt="">
                </div>
                <div class="baslik col-4">${urunBaslik}</div>
                <div class="butonlar col">
                    <button id="azalt" class="btn btn-danger">-</button>
                    <span class="adet">1</span>
                    <button id="arttir" class="btn btn-success">+</button>
                </div>
                <div class="fiyat col">${urunFiyat}</div>
                <div class="toplam-fiyat col">
                <p>Toplam fiyat : <br> <span class='toplamFiyatDegeri'>${urunFiyat}</span></p>
                </div>
                <i class="bi bi-x-circle fs-3 col"></i>
            `

            modal_li.append(urun_wrapper);

            // Sepetin bos olup olmadigini kontrol et
            sepetBosKontrol()

            // Sepetteki urun sayisini arttirmak icin
            const littleBox = document.querySelector('.little-box');
            littleBox.innerText++;

            // Sepet icindeki arttirma ve azaltma
            const arttir = urun_wrapper.querySelector('#arttir');
            const azalt = urun_wrapper.querySelector('#azalt');
            const adetSpan = urun_wrapper.querySelector('.adet');
            const silBtn = urun_wrapper.querySelector('.bi-x-circle');
            silBtn.style.cursor = 'pointer';
            const toplamFiyatSpan = urun_wrapper.querySelector('.toplamFiyatDegeri');

            arttir.addEventListener('click', function(){
                adetSpan.innerText++;
                toplamFiyatSpan.textContent = ((adetSpan.innerText * fiyat) + '₺');
            })

            azalt.addEventListener('click', function(){
                if(adetSpan.innerText > 1){
                    adetSpan.innerText--;
                    littleBox.innerText--;
                    toplamFiyatSpan.textContent = ((adetSpan.innerText * fiyat) + '₺');
                }else{
                    urun_wrapper.remove();
                    littleBox.innerText--;
                    sepetBosKontrol()
                }
            })

            silBtn.addEventListener('click', function(){
                urun_wrapper.remove();
                littleBox.innerText--;
                sepetBosKontrol()
            })

            // ! odeme adimina gitmek icin;
            const odemeBtn = document.querySelector('.odemeBtn');
            odemeBtn.addEventListener('click', function(){
                window.location.href = 'odeme.html';
            })
        })
    })
    
}
