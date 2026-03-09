// Login page JavaScript
// geting elements
const userName = document.getElementById('userName');
const passWord = document.getElementById('password');
const signInBtn = document.getElementById('signInBtn');

// handle login function
const handleLogin = () => {
  // get inpur value
  const userNameValue = userName.value;
  const passWordValue = passWord.value;
  // validation
  if (userNameValue === '' || passWordValue === '') {
    alert('Please fill in both username and password fields.');
    return;
  }
  if (userNameValue !== 'admin') {
    alert('Invalid username. please try again');
    return;
  }
  if (passWordValue !== 'admin123') {
    alert('Invalid Password. please try again');
    return;
  }
  // set login status in local storage
  localStorage.setItem('isLoggedIn', 'true');
  // redirect to dashboard page
  window.location.href = 'dashboard.html';
};

// add eventListener to sign in button
signInBtn.addEventListener('click', handleLogin);
document.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    handleLogin();
  }
});
