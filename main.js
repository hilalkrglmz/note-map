import { userIcon,setStorage, getStorage, translate,icons } from "./helpers.js";

//! HTML'DEN GELENLER:

const form= document.querySelector("form");
const input= document.querySelector("form #title");
const cancelBtn= document.querySelector("form #cancel");
const noteList= document.querySelector("ul");
const expandBtn= document.querySelector("#checkbox");
const aside= document.querySelector(".wrapper");


//!!ORTAK DEĞİŞKENLER */
var map;
var coords= []; //ileride farklı functionlar trf kullanbiliriz.
var notes= getStorage("NOTES") || [];
var markerLayer=[];

//!OLAY İZLEYİCİLERİ

cancelBtn.addEventListener("click",()=>{
    form.style.display="none";
    clearForm();
})

function loadMap(coords){
    map = L.map('map').setView(coords, 10);//*L:leaflet i simgeler

    /* HARİTANIN NASIL GÖZÜKECEĞİ BELİRLENİR tilelayer ile. */
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


//imleçleri tutacağımız ayrı katman
markerLayer= L.layerGroup().addTo(map);

/* L.marker kullanıcının bulunduğu konumu gösterir.*/
L.marker(coords, {icon: userIcon}).addTo(map)
 .bindPopup('Şu anda buradasınız.')//bind popup imlece tıklayınca bilgilendirme içindir.
//     .openPopup();//ekran yenilendiğinde bilgilendirmenin açık gelmesini sağlar.

// harita yüklendiği zaman varsa localden gelen notarı ekrana bas
renderNoteList(notes);


//*haritadaki tıklanma olaylarını izler

map.on('click', onMapClick)
}

form.addEventListener("submit", (e)=>{

    e.preventDefault();

    //formun içindeki değerlere erişme
    
    const title = e.target[0].value;
    const date = e.target[1].value;
    const status = e.target[2].value;

    notes.unshift(
        {
            id: new Date().getTime(), //ileride silme de yapabilmek için diğer eklenenlerden bunu ayırt etmemizi sağlayacak id.
                                    //içindeki id değerinin benzersiz bir sayı olması için new Date() ve onun da içindeki getTime methodunu kullandık. 
            title,
            date,
            status,
            coords
        }

    )
    
    //note ları renderNoteList'e listelemesi için gönder
    renderNoteList(notes);

    //gönderilen elemanları localStorage'a kaydet
        setStorage(notes)


    // formun kapatılması:
    
    form.style.display='none';
    clearForm();
    
})

function renderMarker(item){

    //todo:imleci oluştur
    L.marker(item.coords, {icon: icons[item.status]})
    //todo: imleci katmana ekle
    .addTo(markerLayer)
    //todo: popup ekle
    .bindPopup(item.title);
}

//not listesini ekrana basar
function renderNoteList(items){

    //eski yazılan elemanlarla birlikte tekrar yazmasın diye  yazılanı sileriz.
    noteList.innerHTML ='';

    //eski imleçleri temizler
    markerLayer.clearLayers();


    //her bir eleman için function çalıştırır listelemeyi ekrana basar.
    items.forEach((e) =>{
        //todo: li elemanı oluştur.
        const ListEle= document.createElement("li")

    //locationda yer alan id verisini html deki "li" elemanına eklemek için "dataset" özelliğini kullanmamız gerekir.
        ListEle.dataset.id=e.id;
    
        //todo içeriğini belirle
        ListEle.innerHTML= `
        <div>
            <p>${e.title}</p>
            <p> <span>Tarih: </span> ${e.date}</p>
            <p><span>Durum:</span> ${translate[e.status]}</p>
        </div>
        <i id="fly" class="bi bi-airplane"></i>
        <i id="delete" class="bi bi-trash"></i>
    `
        //htmldeki listeye (ul elemanına) gönder
        noteList.appendChild(ListEle);

        //ekrana imleç bas;
        renderMarker(e);

    });
}


/* kullanıcının konumunu isteme */
navigator.geolocation.getCurrentPosition((e) =>

//kullanıcı izin verirse haritayı onun bulunduğu konumda açma
    loadMap([e.coords.latitude,e.coords.longitude]), 
    //izin vermezse varsayılan konumda açar
    () =>{
    loadMap([38.802424, 35.505317]);
});//navigator: window içindedir.Onun içinde de geoLocation var.


//*haritaya tıklanınca çalışan onMapClick function:

const onMapClick = (e) =>{
    //tıklanılan alanın koordinatlarını ortak alana gönder.
    coords = [e.latlng.lat, e.latlng.lng],
    //form u göster
    form.style.display="flex";

    //inputa focuslama
    input.focus();

    
}

//todo: FORMU listeye eklemeden sonra temizler
function clearForm(){
    form[0].value="";
    form[1].value="";
    form[2].value="goto";
}


//notları silme ve uçuş

noteList.addEventListener('click', (e) =>{
    const foundid= e.target.closest("li").dataset.id;
    
    if(e.target.id==='delete' && 
    confirm('Silmek istediğinizden emin misiniz?')){
        
        //todo: id sini bildiğimiz note u noteList ten çıkar:
        notes= notes.filter((note) => note.id !== Number(foundid))

        //todo: lokali güncelle
        setStorage(notes);

        //todo:ekranı güncelle:

        renderNoteList(notes);

    }
    if(e.target.id==='fly'){
        //todo:id sini bildiğimiz elemanın koordinatlarına erişme
        const note= notes.find((note) => note.id ===Number(foundid))
       
        //todo:animasyonu çalıştır:
        map.flyTo(note.coords,13);

        //todo:elemanın koordinatlarında geçici bir popup oluştur
        var popup = L.popup()
        .setLatLng(note.coords)
        .setContent(note.title)

        if(window.innerWidth <769){
            checkbox.checked =false;
            aside.classList.add('hide')

        }
        //todo: oluşturduğun popup ı elamanın üzerinde çıkar
        popup.openOn(markerLayer);

    }

});


//! Gizle / Göster

checkbox.addEventListener("input", (e) =>{
    const isChecked=  e.target.checked;

    if(isChecked){
        aside.classList.remove("hide");
    }else{
        aside.classList.add("hide");
    }
    })