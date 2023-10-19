//*gönderilen verileri localStorage a kayıt eden function:

export const setStorage = (data) =>{
    //gelen veriyi stringe çevir

    const strData= JSON.stringify(data)
    localStorage.setItem("NOTES",strData)

}

//value lara karşılık gelen içerikler 

export const translate= {
    goto:'ziyaret',
    home:"ev adresi",
    job:"iş gezisi",
    park:"park yeri"
};

//*locale den eleman alır geri döndürür.

export const getStorage = (key) =>{

    //*locale den string veriyi al
    const strData =localStorage.getItem(key)

    //*veriyi javascript objesine çevir, çağrıldığı yere gönder.

    return JSON.parse(strData);
}

export var userIcon = L.icon({
    iconUrl: '/images/user.png',
    iconSize: [50, 50],
    // iconAnchor: [22, 94],
    popupAnchor: [0, -20],
    shadowUrl: '/images/shadow.png',
    shadowSize: [68, 95],
    shadowAnchor: [30, 50]
});
var homeIcon = L.icon({
    iconUrl: '/images/home.png',
    iconSize: [50, 50],
    // iconAnchor: [22, 94],
    popupAnchor: [0, -20],
    shadowUrl: '/images/shadow.png',
    shadowSize: [68, 95],
    shadowAnchor: [30, 50]
});
var jobIcon = L.icon({
    iconUrl: '/images/job.png',
    iconSize:[50, 50],
    // iconAnchor: [22, 94],
    popupAnchor: [0, -20],
    shadowUrl: '/images/shadow.png',
    shadowSize: [68, 95],
    shadowAnchor: [30, 50]
});
var gotoIcon = L.icon({
    iconUrl: '/images/goto.png',
    iconSize: [50, 50],
    // iconAnchor: [22, 94],
    popupAnchor: [0, -20],
    shadowUrl: '/images/shadow.png',
    shadowSize: [68, 95],
    shadowAnchor: [30, 50]
});
var parkIcon = L.icon({
    iconUrl: '/images/park.png',
    iconSize: [50, 50],
    // iconAnchor: [22, 94],
    popupAnchor: [0, -20],
    shadowUrl: '/images/shadow.png',
    shadowSize: [68, 95],
    shadowAnchor: [30, 50]
});

export const icons= {
    goto:gotoIcon,
    home:homeIcon,
    job:jobIcon,
    park:parkIcon
};