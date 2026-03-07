// check if user is logged in or not, if not then redirect to login page
if(localStorage.getItem('isLoggedIn') !== 'true') {
    window.location.href = 'index.html';
}