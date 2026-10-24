const totalJobs=document.getElementById('total-counts')
const interviewJobs=document.getElementById('interview-counts')
const rejectedJobs=document.getElementById('rejected-counts')

const filterall=document.getElementById('filter-all')
const filterinterview=document.getElementById('filter-interview')
const filterreject=document.getElementById('filter-reject')

const filterButtons=[filterall, filterinterview, filterreject]

let currentFilter = 'all';
 

function updateCounts(){
    const cards=document.querySelectorAll('.job-card')
    const interview=document.querySelectorAll('.job-card[data-status="interview"]').length
    const reject=document.querySelectorAll('.job-card[data-status="rejected"]').length
    totalJobs.innerText=cards.length
    interviewJobs.innerText=interview
    rejectedJobs.innerText=reject
    
}

function setStatus(card, status) {
    const badge = card.querySelector('.status-badge');
    card.dataset.status = status;

    if (status === 'interview') {
        badge.innerText = 'INTERVIEW';
        badge.className = 'status-badge inline-block rounded bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-600';
    } else if (status === 'rejected') {
        badge.innerText = 'REJECTED';
        badge.className = 'status-badge inline-block rounded bg-red-50 px-3 py-2 text-xs font-medium text-red-600';
    }

    updateCounts();
    applyFilter(currentFilter);
}


function applyFilter(filter) {
    currentFilter = filter;
    const cards = document.querySelectorAll('.job-card');

    cards.forEach(card => {
        if (filter === 'all' || card.dataset.status === filter) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });

    // Active button highlight
    filterButtons.forEach(btn => {
        btn.className = 'rounded border border-gray-200 bg-white px-3 py-2 text-xs text-slate-600 transition hover:bg-gray-100';
    });

    const activeBtn = document.getElementById('filter-' + filter);
    activeBtn.className = 'rounded bg-blue-500 px-7 py-2 text-xs font-medium text-white transition hover:bg-blue-600';
}

// Event delegation: sob card er button ekshathe handle hobe
document.addEventListener('click', function (e) {
    const interviewBtn = e.target.closest('.btn-interview');
    const rejectedBtn = e.target.closest('.btn-rejected');
    const deleteBtn=e.target.closest('.btn-delete')

    if (interviewBtn) {
        setStatus(interviewBtn.closest('.job-card'), 'interview');
    }

    if (rejectedBtn) {
        setStatus(rejectedBtn.closest('.job-card'), 'rejected');
    }
    if(deleteBtn){
        const card=deleteBtn.closest('.job-card')
        card.remove()
        updateCounts()
    }
});

// Filter button click
filterall.addEventListener('click', () => applyFilter('all'));
filterinterview.addEventListener('click', () => applyFilter('interview'));
filterreject.addEventListener('click', () => applyFilter('rejected'));

// Shuru te count set kora
updateCounts();