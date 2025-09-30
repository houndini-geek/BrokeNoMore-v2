    // Alert on Resize 
      let alertShown = false;
      window.addEventListener('resize',()=> {
        if (!alertShown) {
          alert("For a better experience, please avoid resizing the window.");
          alertShown = true;
        }
        
        if (window.innerWidth <= 600) {
          alert("For the best experience, please use a device with a larger screen.");
          alertShown = true;
        }
      });
      document.addEventListener('DOMContentLoaded', function() {
        const display_total_amount = document.querySelector('.display_total_amount p');
        const advancedFilters = document.querySelector('#advancedFilters')
            const filterButtons = document.querySelectorAll('.filter-buttons button');
            const tableRows = document.querySelectorAll('#records tbody tr');
            const categorySelect = document.getElementById('categorySelect');

            // Type Filter
            filterButtons.forEach(button => {
              button.addEventListener('click', () => {
                const filter = button.textContent.toLowerCase();
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                tableRows.forEach(row => {
                  const type = row.cells[0].textContent.toLowerCase();
                  const category = row.cells[2].textContent.toLowerCase();
                  if (filter === 'all' || type === filter) {
                    row.style.display = '';
                  } else {
                    row.style.display = 'none';
                  }
                });


                    // Now calculate total for the visible rows only
        const filteredTotal = Array.from(tableRows)
          .filter(r => r.style.display !== 'none')
          .reduce((sum, r) => sum + parseFloat(r.cells[1].textContent), 0);

        // Display
        if (filter === 'all') {
          display_total_amount.innerHTML = `Total amount for <strong>All</strong>: <strong>$${filteredTotal.toFixed(2)}</strong>`;
        } else {
          display_total_amount.innerHTML = `Total amount for "<strong>${filter.charAt(0).toUpperCase() + filter.slice(1)}</strong>": <strong>$${filteredTotal.toFixed(2)}</strong>`;
        }
              });

            
            });




      // Category Filter
      categorySelect.addEventListener('change', () => {
        const selectedCategory = categorySelect.value.toLowerCase();
        filterButtons.forEach(btn => btn.classList.remove('active'));

        // Loop just to toggle visibility
        tableRows.forEach(row => {
          const rowCategory = row.cells[2].textContent.toLowerCase();
          if (selectedCategory === 'all' || rowCategory === selectedCategory) {
            row.style.display = '';
          } else {
            row.style.display = 'none';
          }
        });

        // Now calculate total for the visible rows only
        const filteredTotal = Array.from(tableRows)
          .filter(r => r.style.display !== 'none')
          .reduce((sum, r) => sum + parseFloat(r.cells[1].textContent), 0);

        // Display
        if (selectedCategory === 'all') {
          display_total_amount.innerHTML = `Total amount for <strong>All</strong>: <strong>$${filteredTotal.toFixed(2)}</strong>`;
        } else {
          display_total_amount.innerHTML = `Total amount for "<strong>${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}</strong>": <strong>$${filteredTotal.toFixed(2)}</strong>`;
        }
      });


      // Modal Elements
const modal = document.getElementById('amountFilterModal');

const closeBtn = modal.querySelector('.close');
const cancelBtn = document.getElementById('cancelFilter');

// Filter Elements
const filterType = document.getElementById('filterType');
const singleInput = document.getElementById('singleAmountInput');
const rangeInputs = document.getElementById('rangeAmountInputs');
const amountInput = document.getElementById('amount');
const minInput = document.getElementById('minAmount');
const maxInput = document.getElementById('maxAmount');
const applyBtn = document.getElementById('applyFilter');
const filteredTotalEl = document.getElementById('filteredTotal');


// Open Modal 
advancedFilters.addEventListener('change',() => {

  const filter = advancedFilters.value.toLowerCase()
  if(filter == 'sort-by-amount'){
    modal.classList.add('active')
  }
})


// Close Modal

cancelBtn.addEventListener('click', () => modal.classList.remove('active'));

// Toggle Inputs based on filter type
filterType.addEventListener('change', () => {
  if (filterType.value === 'between') {
    singleInput.style.display = 'none';
    rangeInputs.style.display = 'block';
  } else {
    singleInput.style.display = 'block';
    rangeInputs.style.display = 'none';
  }
});



// Apply Filter Logic
modal.addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent form submission
  let total = 0;
  tableRows.forEach(row => {
    const amount = parseFloat(row.cells[1].textContent); // amount column
    let show = false;

    if (filterType.value === 'greater' && amount >= parseFloat(amountInput.value)) show = true;
    if (filterType.value === 'less' && amount <= parseFloat(amountInput.value)) show = true;
    if (filterType.value === 'between') {
      const min = parseFloat(minInput.value);
      const max = parseFloat(maxInput.value);
      if (amount >= min && amount <= max) show = true;
    }

    row.style.display = show ? '' : 'none';
    if (show) total += amount;
  });

  filteredTotalEl.textContent = `Total: $${total.toFixed(2)}`;
  modal.classList.remove('active'); // close modal after applying
});


    });