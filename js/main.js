// DOM Elements
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const sidebar = document.querySelector('.sidebar');

// Mobile menu toggle
if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('active');
    });
}

// Handle active navigation links
const navLinks = document.querySelectorAll('.nav-links a');
navLinks.forEach(link => {
    if (link.href === window.location.href) {
        link.classList.add('active');
    }
});

// Local Storage Functions
const storage = {
    set: (key, value) => {
        localStorage.setItem(key, JSON.stringify(value));
    },
    get: (key) => {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    },
    remove: (key) => {
        localStorage.removeItem(key);
    }
};

// User Authentication
const auth = {
    login: (email, password) => {
        const users = storage.get('users') || [];
        const user = users.find(u => u.email === email && u.password === password);
        if (user) {
            storage.set('currentUser', user);
            return true;
        }
        return false;
    },
    register: (userData) => {
        const users = storage.get('users') || [];
        if (users.some(u => u.email === userData.email)) {
            return false;
        }
        users.push(userData);
        storage.set('users', users);
        return true;
    },
    logout: () => {
        storage.remove('currentUser');
        window.location.href = 'index.html';
    },
    getCurrentUser: () => storage.get('currentUser'),
    isLoggedIn: () => !!storage.get('currentUser')
};

// Form Validation
const validateForm = (form) => {
    const inputs = form.querySelectorAll('input[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.classList.add('error');
        } else {
            input.classList.remove('error');
        }
    });

    return isValid;
};

// Chat Functions
const chat = {
    sendMessage: (recipientId, message) => {
        const currentUser = auth.getCurrentUser();
        if (!currentUser) return;

        const chats = storage.get('chats') || {};
        const chatId = [currentUser.id, recipientId].sort().join('-');

        if (!chats[chatId]) {
            chats[chatId] = [];
        }

        chats[chatId].push({
            senderId: currentUser.id,
            message,
            timestamp: new Date().toISOString()
        });

        storage.set('chats', chats);
        return true;
    },
    getMessages: (recipientId) => {
        const currentUser = auth.getCurrentUser();
        if (!currentUser) return [];

        const chats = storage.get('chats') || {};
        const chatId = [currentUser.id, recipientId].sort().join('-');

        return chats[chatId] || [];
    }
};

// Profile Functions
const profile = {
    update: (userData) => {
        const currentUser = auth.getCurrentUser();
        if (!currentUser) return false;

        const users = storage.get('users') || [];
        const userIndex = users.findIndex(u => u.id === currentUser.id);

        if (userIndex === -1) return false;

        users[userIndex] = { ...users[userIndex], ...userData };
        storage.set('users', users);
        storage.set('currentUser', users[userIndex]);
        return true;
    },
    getProfile: (userId) => {
        const users = storage.get('users') || [];
        return users.find(u => u.id === userId);
    }
};

// Roommate Search and Filter Functions
const roommates = {
    search: (filters = {}) => {
        const users = storage.get('users') || [];
        const currentUser = auth.getCurrentUser();

        return users.filter(user => {
            if (user.id === currentUser?.id) return false;
            
            for (const [key, value] of Object.entries(filters)) {
                if (value && user[key] !== value) return false;
            }
            return true;
        });
    },
    getFilters: () => ({
        sleepSchedule: ['Early Bird', 'Night Owl', 'Regular'],
        cleanliness: ['Very Clean', 'Moderately Clean', 'Relaxed'],
        noiseTolerance: ['High', 'Medium', 'Low'],
        smoking: ['Yes', 'No', 'Outside Only'],
        pets: ['Yes', 'No', 'Case by Case']
    })
};

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    // Check if user is logged in on protected pages
    const protectedPages = ['home.html', 'browse.html', 'chat.html', 'view-profile.html', 'edit-profile.html'];
    const currentPage = window.location.pathname.split('/').pop();

    if (protectedPages.includes(currentPage) && !auth.isLoggedIn()) {
        window.location.href = 'login.html';
    }

    // Initialize page-specific functionality
    const pageInit = {
        'browse.html': initBrowsePage,
        'chat.html': initChatPage,
        'edit-profile.html': initEditProfilePage
    };

    if (pageInit[currentPage]) {
        pageInit[currentPage]();
    }
});

// Page-specific initialization functions
function initBrowsePage() {
    const filterForm = document.getElementById('filter-form');
    const resultsContainer = document.getElementById('results-container');

    if (filterForm) {
        filterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(filterForm);
            const filters = Object.fromEntries(formData.entries());
            const results = roommates.search(filters);
            displayRoommateResults(results);
        });
    }
}

function initChatPage() {
    const messageForm = document.getElementById('message-form');
    const messagesContainer = document.getElementById('messages-container');

    if (messageForm) {
        messageForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const message = messageForm.querySelector('input[name="message"]').value;
            const recipientId = messageForm.dataset.recipientId;

            if (message && recipientId) {
                chat.sendMessage(recipientId, message);
                messageForm.reset();
                updateChatMessages(recipientId);
            }
        });
    }
}

function initEditProfilePage() {
    const profileForm = document.getElementById('profile-form');
    const currentUser = auth.getCurrentUser();

    if (profileForm && currentUser) {
        // Pre-fill form with current user data
        Object.entries(currentUser).forEach(([key, value]) => {
            const input = profileForm.querySelector(`[name="${key}"]`);
            if (input) input.value = value;
        });

        profileForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (validateForm(profileForm)) {
                const formData = new FormData(profileForm);
                const userData = Object.fromEntries(formData.entries());
                if (profile.update(userData)) {
                    window.location.href = 'view-profile.html';
                }
            }
        });
    }
}

// Helper Functions
function displayRoommateResults(results) {
    const container = document.getElementById('results-container');
    if (!container) return;

    container.innerHTML = results.map(user => `
        <div class="profile-card fade-in">
            <div class="profile-header">
                <img src="${user.avatar || 'images/default-avatar.svg'}" alt="${user.name}" class="profile-avatar">
                <div>
                    <h3>${user.name}</h3>
                    <p>${user.major} - Year ${user.year}</p>
                </div>
            </div>
            <div class="profile-info">
                <div class="info-item">
                    <strong>Sleep Schedule:</strong> ${user.sleepSchedule}
                </div>
                <div class="info-item">
                    <strong>Cleanliness:</strong> ${user.cleanliness}
                </div>
                <div class="info-item">
                    <strong>Noise Tolerance:</strong> ${user.noiseTolerance}
                </div>
                <div class="info-item">
                    <strong>Hobbies:</strong> ${user.hobbies.join(', ')}
                </div>
            </div>
            <div class="card-actions">
                <a href="chat.html?id=${user.id}" class="btn btn-primary">Message</a>
                <a href="view-profile.html?id=${user.id}" class="btn btn-secondary">View Profile</a>
            </div>
        </div>
    `).join('');
}

function updateChatMessages(recipientId) {
    const container = document.getElementById('messages-container');
    if (!container) return;

    const messages = chat.getMessages(recipientId);
    const currentUser = auth.getCurrentUser();

    container.innerHTML = messages.map(msg => `
        <div class="message ${msg.senderId === currentUser.id ? 'sent' : 'received'}">
            ${msg.message}
            <small class="message-time">${new Date(msg.timestamp).toLocaleTimeString()}</small>
        </div>
    `).join('');

    container.scrollTop = container.scrollHeight;
} 