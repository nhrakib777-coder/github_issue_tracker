
// check if user is logged in or not, if not then redirect to login page
if (localStorage.getItem('isLoggedIn') !== 'true') {
  window.location.href = 'index.html';
}
// label array function
const createElements = (arr) => {
  const htmlElements = arr.map(
    (el) => `<span class="badge ${getLabelColor(el)}">${el}</span>`
  );
  return htmlElements.join(' ');
};

// manage spinner
const manageSpinner = (status) =>{
  if(status === true){
    document.getElementById('spinner').classList.remove('hidden');
    document.getElementById('spinner').classList.add('flex');
    document.getElementById('issueContainer').classList.add('hidden');

  }
  else{
    document.getElementById('spinner').classList.add('hidden');
    document.getElementById('issueContainer').classList.remove('hidden');
  }
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
      openTab.classList.add('border',
        'border-gray-200');
        closeTab.classList.add('border',
        'border-gray-200');
    }
    if (openTab.checked) {
      openTab.classList.add('bg-green-400', 'text-white');
       allTab.classList.add('border',
        'border-gray-200');
      closeTab.classList.add('border',
        'border-gray-200');
    }
    if (closeTab.checked) {
      closeTab.classList.add('bg-red-400', 'text-white');
       allTab.classList.add('border',
        'border-gray-200');
         openTab.classList.add('border',
        'border-gray-200');
    }
  });
});
// tab filter
const filterIssues = (status) => {
  if (status === 'all') {
    renderCards(allIssues);
    updateCounters(allIssues);
    return;
  }
  const filtered = allIssues.filter((issue) => issue.status === status);
  renderCards(filtered);
  updateCounters(filtered);
};

// get status border
const getStatusBorder = (status) => {
  if (status === 'open') {
    return 'border-t-4 border-green-400 ';
  } else if (status === 'closed') {
    return 'border-t-4 border-red-400';
  } else {
    return 'border-t-4 border-primary';
  }
};

// get point color
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

// get label color
const getLabelColor = (label) => {
  if (label === 'bug') {
    return 'bg-red-100 text-red-500 border border-red-500';
  } else if (label === 'help wanted') {
    return 'bg-yellow-100 text-yellow-500 border border-yellow-500';
  } else if (label === 'good first issue') {
    return 'bg-blue-100 text-blue-500 border border-blue-500';
  } else {
    return 'bg-green-100 text-green-500 border border-green-500';
  }
};

// detailed issue

const loadIssueDetail = async (id) => {
   manageSpinner(true);

  const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;

  const res = await fetch(url);
  const data = await res.json();

  console.log(data);

  displayIssueDetail(data.data);
   manageSpinner(false);
};

// display detail issue
const displayIssueDetail = (issue) => {
  console.log(issue);
   const pointColor = getStatusPoint(issue.status);
  const priorityColor = getPriority(issue.priority);
  const detailsBox = document.getElementById('details-container');
  const assignee = issue.assignee ?? "Nur Hasan";
  
  detailsBox.innerHTML = `
            <h2 class="text-[#1f2937] font-bold text-xl">
             ${issue.title}
            </h2>
            <div class="flex items-center gap-2 p-0">
              <span class="badge ${pointColor} rounded-full"
                >${issue.status}</span
              >
              <span class="text-[5px] text-[#64748B]"
                ><i class="fa-solid fa-circle"></i
              ></span>
              <p class="text-[9px] text-[#64748B]">${issue.status} by ${assignee}</p>
              <span class="text-[5px] text-[#64748B]"
                ><i class="fa-solid fa-circle"></i
              ></span>
              <p class="text-[9px] text-[#64748B]">${issue.updatedAt}</p>
            </div>
            <div class="flex flex-wrap gap-2 ">${createElements(issue.labels)}</div>
            <p class="text-[#647488] text-[14px] text-justify">
              ${issue.description}
            </p>
            <div
              class="flex justify-between items-center rounded-md bg-base-200 p-3">
              <div class="text-left">
                <span>Assignee:</span><br />
                <p>${assignee} </p>
              </div>
              <div class="text-left">
                <span>Priority:</span><br />
                <p class="badge ${priorityColor}">${issue.priority}</p>
              </div>
            </div>

          
           <div class="modal-action">
          <form method="dialog">
            <button class="btn btn-primary outline-none">Close</button>
          </form>
        </div>`;
  document.getElementById('my_modal_5').showModal();
};

// load issue
const loadIssueCard = async (id) => {
   manageSpinner(true);
  const url = 'https://phi-lab-server.vercel.app/api/v1/lab/issues';
  const res = await fetch(url);
  const data = await res.json();
  displayIssueCard(data.data);

  updateCounters(allIssues);
};
// filter function
let allIssues = [];
const displayIssueCard = (issues) => {
  allIssues = issues;
  renderCards(issues);
  updateCounters(issues);
};
// renderJobs
const renderCards = (issues) => {
  const issueContainer = document.getElementById('issueContainer');
  issueContainer.innerHTML = '';

  issues.forEach((issue) => {
    const issueCard = document.createElement('div');

    const borderColor = getStatusBorder(issue.status);
    const pointColor = getStatusPoint(issue.status);
    const priorityColor = getPriority(issue.priority);

    issueCard.innerHTML = `
  <div onclick="loadIssueDetail(${issue.id})" class="card ${borderColor} bg-white shadow-sm p-4 space-y-2 min-h-[320px] flex flex-col justify-center cursor-pointer">

    <div class="flex justify-between">
      <span class="${pointColor}  w-6 h-6 p-3 rounded-full flex items-center justify-center">
        <i class="fa-regular fa-circle"></i>
      </span>
      <h2 class="badge ${priorityColor}">${issue.priority}</h2>
    </div>

    <h2 class="font-semibold text-[14px]">${issue.title}</h2>
    <p class="text-[12px] text-justify">${issue.description}</p>

    <div class="flex flex-wrap gap-2 ">${createElements(issue.labels)}</div>

    <hr class='border-gray-300'/>

    <span class="text-[12px]">#${issue.id} by ${issue.author}</span>
    <span class="text-[12px]">${issue.createdAt}</span>

  </div>
`;
    
    issueContainer.appendChild(issueCard);
  });
   manageSpinner(false);
};

// Counter update
const updateCounters = (issues) => {
  // select the text element
  const countText = document.getElementById('countText');

  // update text
  countText.innerText = `${issues.length} Issues`;
};

// search
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('search-btn');
const currentTab = 'all';


function filterAndDisplayIssues() {
  const query = searchInput.value.trim().toLowerCase();
  let filtered = allIssues;

  // Filter by current tab first
  if (currentTab !== 'all') {
    filtered = filtered.filter((issue) => issue.status === currentTab);
  }

  // Filter by search query if there is one
  if (query) {
    filtered = filtered.filter((issue) =>
      (issue.title || issue.issue)?.toLowerCase().includes(query)
    );
  }

  displayIssueCard(filtered);
}

// search events
searchInput.addEventListener('input', filterAndDisplayIssues);
searchBtn.addEventListener('click', filterAndDisplayIssues);

loadIssueCard();
