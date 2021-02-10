function downloadProductData() {
    const urlParams = new URLSearchParams(window.location.search);
   
    let ID = urlParams.get("productID");
    
    if (ID == null) {
        setupError();
        return;
    }

    if (parseInt(ID) < 10) ID = '0' + (ID.toString());

    const url = 'https://raw.githubusercontent.com/bencevicbruno/Gosei-Web-Shop-Database/main/product_' + ID + '.json'

    var request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.responseType = 'json';

    request.onload = function() {
        var status = request.status;

        setTimeout((status === 200 ? setupProduct : setupError), 1000, request.response);
    }

    request.send();
}

function setupProduct(data) {
    document.getElementById("loading_circle").style.display = 'none';
    document.getElementById("product").style.display = 'flex';

    document.getElementById("image").src = data.imageurl;
    document.getElementById("name").innerHTML = data.name;
    productName = data.name;

    const details = Object.getOwnPropertyNames(data.details)

    for (let i = 0; i < details.length; i++) {
        document.getElementById("detail" + (i + 1)).innerHTML = details[i];
        document.getElementById("value" + (i + 1)).innerHTML = data.details[details[i]];
    }

    document.getElementById("description").innerHTML = data.description;
    document.getElementById("price").innerHTML = "Price: " + data.price + "$";

    let cartDiv = document.getElementById("cart");
    cartDiv.onclick = function() {
        window.confirm("You have added " + data.name + " to your cart.");
    }
}

function setupError(data) {
    document.getElementById("loading_circle").style.display = 'none';
    document.getElementById("error").style.display = 'flex';
}

window.onload = downloadProductData;