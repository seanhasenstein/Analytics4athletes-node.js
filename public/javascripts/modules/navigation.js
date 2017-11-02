const menuButton = document.querySelector('#mobile-menu-toggle');
const navMenu = document.querySelector('nav');
const navLogin = document.querySelector('.nav-login');
const liDropdown = document.querySelector('li.dropdown');
const dropdownUl = document.querySelector('li.dropdown ul');
const sidebarNavButton = document.querySelector('.sidebar a.sidebar-nav');
const sidebarNav = document.querySelector('.sidebar .sidebar-dropdown');
const labels = document.querySelectorAll('.categories .label');
const sidebarCategoryDropdown = document.querySelector('.categories .label .dropdown');

const toggleOpenNav = () => {
	navMenu.classList.toggle('open');
	navLogin.classList.toggle('open');
	menuButton.classList.toggle('open');
};

const toggleOpenSidebar = () => {
	sidebarNavButton.classList.toggle('open');
	sidebarNav.classList.toggle('open');
}

const toggleDropdown = () => {
	liDropdown.classList.toggle('open');
};

menuButton.addEventListener('click', toggleOpenNav);
liDropdown.addEventListener('click', toggleDropdown);

if (sidebarNavButton !== null) {
	sidebarNavButton.addEventListener('click', toggleOpenSidebar);
}

for (const label of labels) {
	label.addEventListener('click', function() {
		label.classList.toggle('open');
	});
};
