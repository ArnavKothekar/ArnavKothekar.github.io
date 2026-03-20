'use strict';

/**
 * =====================================================
 * UTILITY FUNCTIONS
 * =====================================================
 */

// Safe toggle function
const elementToggleFunc = function (elem) {
  if (elem) {
    elem.classList.toggle("active");
  }
};

/**
 * =====================================================
 * SIDEBAR FUNCTIONALITY
 * =====================================================
 */

const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

if (sidebarBtn && sidebar) {
  sidebarBtn.addEventListener("click", function () {
    elementToggleFunc(sidebar);
  });
}

/**
 * =====================================================
 * SCROLL SPY - Navbar Highlighting on Scroll
 * =====================================================
 */

const navbarLinks = document.querySelectorAll('.navbar-link');
const articles = document.querySelectorAll('article[id]');

// Window scroll event for scroll spy
if (articles.length > 0 && navbarLinks.length > 0) {
  window.addEventListener('scroll', function () {
    let current = '';

    articles.forEach(article => {
      const articleTop = article.offsetTop - 100;
      if (window.scrollY >= articleTop) {
        current = article.getAttribute('id');
      }
    });

    navbarLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // Also handle click events on navbar links
  navbarLinks.forEach(link => {
    link.addEventListener('click', function () {
      navbarLinks.forEach(l => l.classList.remove('active'));
      this.classList.add('active');
    });
  });
}

/**
 * =====================================================
 * FILTER & SELECT VARIABLES
 * =====================================================
 */

const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

// Safe event listener for select dropdown toggle
if (select) {
  select.addEventListener("click", function () {
    elementToggleFunc(this);
  });
}

// Safe event listeners for mobile select items
if (selectItems.length > 0) {
  for (let i = 0; i < selectItems.length; i++) {
    selectItems[i].addEventListener("click", function () {
      const selectedValue = this.innerText.toLowerCase();
      
      if (selectValue) {
        selectValue.innerText = this.innerText;
      }
      
      if (select) {
        elementToggleFunc(select);
      }
      
      filterFunc(selectedValue);
    });
  }
}

/**
 * =====================================================
 * PROJECT FILTERING & SEE MORE LOGIC
 * =====================================================
 */

const filterItems = document.querySelectorAll("[data-filter-item]");
const seeMoreProjectBtn = document.getElementById('see-more-projects');

// Filter state variables
let currentFilterValue = 'all';
let showAllProjects = false;

/**
 * Update project display based on current filter and show-more state
 */
const updateProjectDisplay = function () {
  if (filterItems.length === 0) return;

  let matchingCount = 0;
  let displayedCount = 0;

  // Step 1: Count how many projects match the current filter
  filterItems.forEach(item => {
    const category = (item.dataset.category || '').toLowerCase();
    if (currentFilterValue === 'all' || category === currentFilterValue) {
      matchingCount++;
    }
  });

  // Step 2: Show/hide items based on filter and "See More" state
  filterItems.forEach((item) => {
    const category = (item.dataset.category || '').toLowerCase();
    const matchesFilter = currentFilterValue === 'all' || category === currentFilterValue;

    if (matchesFilter) {
      displayedCount++;
      if (displayedCount <= 3 || showAllProjects) {
        // Item should be shown
        item.classList.remove('hiding');
        item.classList.add('active');
      } else {
        // Item should be hidden with animation
        if (item.classList.contains('active')) {
          item.classList.add('hiding');
          setTimeout(() => {
            item.classList.remove('active', 'hiding');
          }, 400); // Match the fadeOut animation duration
        }
      }
    } else {
      // Item doesn't match filter, hide with animation
      if (item.classList.contains('active')) {
        item.classList.add('hiding');
        setTimeout(() => {
          item.classList.remove('active', 'hiding');
        }, 400);
      }
    }
  });

  // Step 3: Update button visibility and text
  if (seeMoreProjectBtn) {
    if (matchingCount <= 3) {
      seeMoreProjectBtn.classList.add('hidden');
    } else {
      seeMoreProjectBtn.classList.remove('hidden');
      seeMoreProjectBtn.textContent = showAllProjects ? 'See Less Projects' : 'See More Projects';
    }
  }
};

/**
 * Handle filter changes
 */
const filterFunc = function (selectedValue) {
  currentFilterValue = selectedValue;
  showAllProjects = false; // Reset "See More" when category changes
  updateProjectDisplay();
};

// Attach click handlers to desktop filter buttons
if (filterBtn.length > 0) {
  // Set initial active button to "All"
  filterBtn[0].classList.add('active');
  
  for (let i = 0; i < filterBtn.length; i++) {
    filterBtn[i].addEventListener("click", function () {
      // Remove active class from all buttons
      filterBtn.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      this.classList.add('active');
      
      const selectedValue = this.innerText.toLowerCase();
      
      if (selectValue) {
        selectValue.innerText = this.innerText; // Sync mobile dropdown
      }
      
      filterFunc(selectedValue);
    });
  }
}

// Attach click handler to "See More Projects" button
if (seeMoreProjectBtn) {
  seeMoreProjectBtn.addEventListener('click', function () {
    showAllProjects = !showAllProjects;
    updateProjectDisplay();
  });
}

// Initialize project display on page load
updateProjectDisplay();

/**
 * =====================================================
 * CERTIFICATIONS SEE MORE LOGIC
 * =====================================================
 */

const seeMoreCertBtn = document.getElementById('see-more-certifications');
const certItems = document.querySelectorAll('.certificates-item');
let showAllCertifications = false;

/**
 * Update certifications display based on show-more state
 */
const updateCertDisplay = function () {
  if (certItems.length === 0) return;

  certItems.forEach((item, index) => {
    if (index < 4 || showAllCertifications) {
      // Item should be shown
      item.classList.remove('hiding');
      item.classList.add('active');
    } else {
      // Item should be hidden with animation
      if (item.classList.contains('active')) {
        item.classList.add('hiding');
        setTimeout(() => {
          item.classList.remove('active', 'hiding');
        }, 400); // Match the fadeOut animation duration
      }
    }
  });

  if (seeMoreCertBtn) {
    if (certItems.length <= 4) {
      seeMoreCertBtn.classList.add('hidden');
    } else {
      seeMoreCertBtn.classList.remove('hidden');
      seeMoreCertBtn.textContent = showAllCertifications ? 'See Less Certifications' : 'See More Certifications';
    }
  }
};

// Attach click handler to certifications "See More" button
if (seeMoreCertBtn && certItems.length > 0) {
  seeMoreCertBtn.addEventListener('click', function () {
    showAllCertifications = !showAllCertifications;
    updateCertDisplay();
  });

  // Initialize certifications display on page load
  updateCertDisplay();
}