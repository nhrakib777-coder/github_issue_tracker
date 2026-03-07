// check if user is logged in or not, if not then redirect to login page
if (localStorage.getItem('isLoggedIn') !== 'true') {
  window.location.href = 'index.html';
}

// Tabs active
const allTab = document.getElementById('allTab');
const openTab = document.getElementById('openTab');
const closeTab = document.getElementById('closeTab');

const tabs = [allTab, openTab, closeTab];

tabs.forEach((tab) => {
  tab.addEventListener('change', () => {
    // reset all tabs
    tabs.forEach((t) => {
      t.classList.remove('bg-primary', 'bg-green-400', 'bg-red-400', 'border', 'border-gray-200', 'text-white');
    });

    // set active tab
    if(allTab.checked){
        allTab.classList.add('bg-primary', 'text-white');
    }
    if(openTab.checked){
        openTab.classList.add('bg-green-400', 'text-white');
    }
    if(closeTab.checked){
        closeTab.classList.add('bg-red-400', 'text-white');
    }
  });
});

