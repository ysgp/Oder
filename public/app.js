const firebaseConfig = {
    apiKey: "AIzaSyBP36Ia16UvldsGFpI9diZV-vcm-EUrY8w",
    authDomain: "oder-9b509.firebaseapp.com",
    projectId: "oder-9b509",
    storageBucket: "oder-9b509.appspot.com",
    messagingSenderId: "162271330874",
    appId: "1:162271330874:web:4b0be61f911cd2f84f6b03"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

let cart = [];

// 加載商品
function loadProducts() {
    db.collection("products").get().then((querySnapshot) => {
        let html = "";
        querySnapshot.forEach((doc) => {
            const product = doc.data();
            html += `
                <li>
                    ${product.name} - $${product.price}
                    <button onclick="addToCart('${doc.id}', '${product.name}', ${product.price})">加入購物車</button>
                </li>
            `;
        });
        document.getElementById("productList").innerHTML = html;
    });
}

// 加入購物車
function addToCart(productId, name, price) {
    cart.push({ id: productId, name, price });
    updateCartDisplay();
}

// 更新購物車顯示
function updateCartDisplay() {
    let html = "";
    cart.forEach((item) => {
        html += `<li>${item.name} - $${item.price}</li>`;
    });
    document.getElementById("cart").innerHTML = html;
}

// 結帳
function checkout() {
    if (cart.length === 0) {
        alert("購物車是空的！");
        return;
    }
    db.collection("orders").add({
        items: cart,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).then(() => {
        alert("訂單已提交！");
        cart = [];
        updateCartDisplay();
    });
}

// 初始化加載
window.onload = loadProducts;