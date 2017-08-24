window.authTokenMyPersonalApp or= {};
window.authTokenMyPersonalApp.token = document.querySelector('meta[name="csrf-token"]').content;
