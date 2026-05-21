var isLoggedIn = false;

// tiny ugly hash switch, because this is only for screenshots
function authSwitch() {
    if (location.hash == '#register') {
        document.body.classList.add('show-register');
        document.title = 'Royal Delivery - Regisztráció';
    } else {
        document.body.classList.remove('show-register');
        document.title = 'Royal Delivery - Bejelentkezés';
    }
}
window.addEventListener('hashchange', authSwitch);
window.addEventListener('load', authSwitch);