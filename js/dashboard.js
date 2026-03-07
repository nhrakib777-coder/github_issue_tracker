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
      t.classList.remove(
        'bg-primary',
        'bg-green-400',
        'bg-red-400',
        'border',
        'border-gray-200',
        'text-white'
      );
    });

    // set active tab
    if (allTab.checked) {
      allTab.classList.add('bg-primary', 'text-white');
    }
    if (openTab.checked) {
      openTab.classList.add('bg-green-400', 'text-white');
    }
    if (closeTab.checked) {
      closeTab.classList.add('bg-red-400', 'text-white');
    }
  });
});

// get status border
const getStatusBorder = (status) => {
  if(status === "open") {
    return "border-t-4 border-green-400";
  }else if(status === "closed"){
    return "border-t-4 border-red-400";
  }else{
    return "border-t-4 border-primary"
  }
}


// load issue
const loadIssueCard = async (id) => {
  const url = 'https://phi-lab-server.vercel.app/api/v1/lab/issues';
  const res = await fetch(url);
  const data = await res.json();
  displayIssueCard(data.data);
};

const displayIssueCard = (issues) => {
  const issueContainer = document.getElementById('issueContainer');
  issueContainer.innerHTML = '';

  issues.forEach((issue) => {

  const issueCard = document.createElement('div');

  const borderColor = getStatusBorder(issue.status);

  issueCard.innerHTML = `
  <div class="card ${borderColor} bg-white shadow-sm p-4 space-y-2">

    <div class="flex justify-between">
      <h2 class="badge bg-red-100 text-red-600">${issue.priority}</h2>
    </div>

    <h2 class="font-semibold text-[14px]">${issue.title}</h2>

    <p class="text-[12px]">${issue.description}</p>

    <span class="badge">${issue.labels}</span>

    <hr/>

    <span>#${issue.id} by ${issue.author}</span>
    <span>${issue.createdAt}</span>

  </div>
  `;

  issueContainer.appendChild(issueCard);

});
};

// count card
const countContainer = document.getElementById("")



loadIssueCard();

// renderJobs
