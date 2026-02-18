async function loadStats() {
    const res = await fetch('/api/stats');
    const data = await res.json();

    document.getElementById('orders').textContent = data.orders;
    document.getElementById('users').textContent = data.users;
    document.getElementById('restaurants').textContent = data.restaurants;
    document.getElementById('couriers').textContent = data.couriers;
}

loadStats();
