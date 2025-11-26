// assets/js/script.js

// 1. DATA PRODUK (Database Simulasi)
const defaultProducts = [
    { id: 1, nama: "Dress Musim Panas", harga: 150000, kategori: "pakaian", img: "https://source.unsplash.com/400x400/?dress", deskripsi: "Bahan adem cocok untuk cuaca panas." },
    { id: 2, nama: "Blender Portable", harga: 250000, kategori: "rumah_tangga", img: "https://source.unsplash.com/400x400/?blender", deskripsi: "Praktis dibawa kemana saja." },
    { id: 3, nama: "Kacamata Hitam", harga: 75000, kategori: "aksesori", img: "https://source.unsplash.com/400x400/?sunglasses", deskripsi: "Pelindung UV stylish." }
];

// Load Produk
function loadProducts() {
    if (!localStorage.getItem('products')) {
        localStorage.setItem('products', JSON.stringify(defaultProducts));
    }
    return JSON.parse(localStorage.getItem('products'));
}

// 2. DATA ORDER (Database Pesanan)
function loadOrders() {
    return JSON.parse(localStorage.getItem('orders')) || [];
}

function saveOrder(customerName, total, items) {
    let orders = loadOrders();
    const newOrder = {
        id: "ORD-" + Date.now(), // ID unik berdasarkan waktu
        customer: customerName,
        total: total,
        items: items,
        status: "Menunggu Bayar", // Status awal
        date: new Date().toLocaleDateString("id-ID")
    };
    orders.unshift(newOrder); // Tambah ke paling atas
    localStorage.setItem('orders', JSON.stringify(orders));
}

// 3. FORMAT RUPIAH
const rupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0
    }).format(number);
}

// 4. CART SYSTEM
function addToCart(id) {
    let products = loadProducts();
    let product = products.find(p => p.id == id);
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    let existing = cart.find(item => item.id == id);
    if(existing) {
        existing.qty++;
    } else {
        cart.push({...product, qty: 1});
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    alert("Produk masuk keranjang!");
    updateCartBadge();
}

function updateCartBadge() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let count = cart.reduce((sum, item) => sum + item.qty, 0);
    let badge = document.getElementById('cart-badge');
    if(badge) badge.innerText = count;
}

document.addEventListener("DOMContentLoaded", () => {
    updateCartBadge();
});