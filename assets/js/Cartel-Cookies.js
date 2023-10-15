// Función para mostrar el cartel de cookies
function showCookieBanner() {
    const cookieBanner = document.getElementById('cookie-banner');
    cookieBanner.style.display = 'block';
}

// Función para ocultar el cartel de cookies
function hideCookieBanner() {
    const cookieBanner = document.getElementById('cookie-banner');
    cookieBanner.style.display = 'none';
}

// Función para guardar la preferencia de cookies
function saveCookiePreference(preference) {
    // Aquí podrías usar cookies o localStorage para guardar la preferencia
    // Por simplicidad, este ejemplo solo muestra un mensaje en la consola
    console.log('Cookie preference saved:', preference);
    hideCookieBanner();
}

document.addEventListener('DOMContentLoaded', function() {
    const cookieSettingsButton = document.getElementById('cookie-settings');
    const rejectCookiesButton = document.getElementById('reject-cookies');
    const acceptCookiesButton = document.getElementById('accept-cookies');

    cookieSettingsButton.addEventListener('click', function() {
        // Aquí podrías redirigir a una página de configuración de cookies
        console.log('Redirect to cookies settings page');
    });

    rejectCookiesButton.addEventListener('click', function() {
        saveCookiePreference('rejected');
    });

    acceptCookiesButton.addEventListener('click', function() {
        saveCookiePreference('accepted');
    });

    showCookieBanner();
});