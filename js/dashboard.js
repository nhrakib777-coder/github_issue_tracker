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
// tab filter
const filterIssues = (status) => {
  if (status === 'all') {
    renderCards(allIssues);
    return;
  }
  const filtered = allIssues.filter((issue) => issue.status === status);
  renderCards(filtered);
};

// get status border
const getStatusBorder = (status) => {
  if (status === 'open') {
    return 'border-t-4 border-green-400';
  } else if (status === 'closed') {
    return 'border-t-4 border-red-400';
  } else {
    return 'border-t-4 border-primary';
  }
};

const getStatusPoint = (status) => {
  if (status === 'open') {
    return 'bg-green-200  text-green-500';
  } else if (status === 'closed') {
    return 'bg-red-200  text-red-500';
  } else {
    return 'bg-yellow-200  text-yellow-500';
  }
};

// priority color
const getPriority = (priority) => {
  if (priority === 'high') {
    return 'bg-red-100 text-red-600';
  } else if (priority === 'medium') {
    return 'bg-yellow-100 text-yellow-600';
  } else {
    return 'bg-gray-100 text-gray-600';
  }
};

// load issue
const loadIssueCard = async (id) => {
  const url = 'https://phi-lab-server.vercel.app/api/v1/lab/issues';
  const res = await fetch(url);
  const data = await res.json();
  displayIssueCard(data.data);
};
// filter function
let allIssues = [];
const displayIssueCard = (issues) => {
  allIssues = issues;
  renderCards(issues);
};
const renderCards = (issues) => {
  const issueContainer = document.getElementById('issueContainer');
  issueContainer.innerHTML = '';

  issues.forEach((issue) => {
    const issueCard = document.createElement('div');

    const borderColor = getStatusBorder(issue.status);
    const pointColor = getStatusPoint(issue.status);
    const priorityColor = getPriority(issue.priority);

    issueCard.innerHTML = `
  <div class="card ${borderColor} bg-white shadow-sm p-4 space-y-2">

    <div class="flex justify-between">
      <span id="point" class=" ${pointColor} text-[13px] w-6 h-6 rounded-full  flex items-center justify-center "><i class="fa-regular fa-circle"></i></span>
      <h2 class="badge ${priorityColor}">${issue.priority}</h2>
    </div>

    <h2 class="font-semibold text-[14px]">${issue.title}</h2>

    <p class="text-[12px]">${issue.description}</p>

    <span class="badge">${issue.labels}</span>

    <hr class='border-gray-300'/>

    <span>#${issue.id} by ${issue.author}</span>
    <span>${issue.createdAt}</span>

  </div>
  `;

    issueContainer.appendChild(issueCard);
  });
};

loadIssueCard();

// renderJobs
