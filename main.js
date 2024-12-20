/*

import { fetchUniversities, fetchUniversityFields } from './js/airtableService.js';
import { sendToChatGPT } from './js/chatService.js';
import { 
    appendMessage, 
    showLoading, 
    createOptionButton, 
    clearInput, 
    clearChat,
    createSearchInput,
    filterUniversities,
    updateUniversityList
} from './js/uiHelpers.js';

let currentMode = null;
let selectedUniversity = null;
let allUniversities = [];

function initializeChat() {
    const chatMessages = document.getElementById('chat-messages');
    clearChat(chatMessages);
    
    appendMessage(chatMessages, 'bot', 'Welcome! Please select an option:');
    
    const optionsDiv = document.createElement('div');
    optionsDiv.className = 'options-container';
    
    const universityButton = createOptionButton('University Information', () => handleModeSelection('university'));
    const generalButton = createOptionButton('General Information', () => handleModeSelection('general'));
    
    optionsDiv.appendChild(universityButton);
    optionsDiv.appendChild(generalButton);
    chatMessages.appendChild(optionsDiv);
}

async function handleModeSelection(mode) {
    currentMode = mode;
    const chatMessages = document.getElementById('chat-messages');
    clearChat(chatMessages);

    if (mode === 'university') {
        try {
            appendMessage(chatMessages, 'bot', 'Loading universities...');
            allUniversities = await fetchUniversities();
            clearChat(chatMessages);
            
            appendMessage(chatMessages, 'bot', 'Search for a university or course:');
            
            const { searchContainer, searchInput } = createSearchInput('Search by university or course name...');
            chatMessages.appendChild(searchContainer);
            
            const optionsDiv = document.createElement('div');
            optionsDiv.className = 'options-container university-list';
            chatMessages.appendChild(optionsDiv);
            
            // Initial list of all universities
            updateUniversityList(optionsDiv, allUniversities, handleUniversitySelection);
            
            // Add search functionality
            searchInput.addEventListener('input', (e) => {
                const searchTerm = e.target.value;
                const filteredUniversities = filterUniversities(allUniversities, searchTerm);
                updateUniversityList(optionsDiv, filteredUniversities, handleUniversitySelection);
            });
            
            // Add back button
            const backButton = createOptionButton('Back to Main Menu', initializeChat);
            const backContainer = document.createElement('div');
            backContainer.className = 'back-container';
            backContainer.appendChild(backButton);
            chatMessages.appendChild(backContainer);
            
        } catch (error) {
            appendMessage(chatMessages, 'bot', 'Sorry, I could not fetch the universities. Please try again.');
        }
    } else {
        appendMessage(chatMessages, 'bot', 'Please ask any general question about studying in Germany.');
        document.querySelector('.chat-input').style.display = 'flex';
    }
}

async function handleUniversitySelection(universityId) {
    selectedUniversity = universityId;
    const chatMessages = document.getElementById('chat-messages');
    clearChat(chatMessages);

    try {
        const fields = await fetchUniversityFields(universityId);
        appendMessage(chatMessages, 'bot', 'What information would you like to know?');
        
        const optionsDiv = document.createElement('div');
        optionsDiv.className = 'options-container';
        
        Object.keys(fields).forEach(field => {
            if (field !== 'Name') {
                const button = createOptionButton(field, () => showFieldInfo(field, fields[field]));
                optionsDiv.appendChild(button);
            }
        });
        
        // Add back button
        const backButton = createOptionButton('Back to University Search', () => handleModeSelection('university'));
        optionsDiv.appendChild(backButton);
        
        chatMessages.appendChild(optionsDiv);
    } catch (error) {
        appendMessage(chatMessages, 'bot', 'Sorry, I could not fetch the university information. Please try again.');
    }
}

function showFieldInfo(field, value) {
    const chatMessages = document.getElementById('chat-messages');
    appendMessage(chatMessages, 'bot', `${field}: ${value}`);
    
    const backButton = createOptionButton('Back to University Selection', () => handleModeSelection('university'));
    const newQuestionButton = createOptionButton('Ask Another Question', initializeChat);
    
    const optionsDiv = document.createElement('div');
    optionsDiv.className = 'options-container';
    optionsDiv.appendChild(backButton);
    optionsDiv.appendChild(newQuestionButton);
    chatMessages.appendChild(optionsDiv);
}

async function sendMessage() {
    if (currentMode !== 'general') return;

    const userInput = document.getElementById('user-input');
    const chatMessages = document.getElementById('chat-messages');
    const message = userInput.value.trim();

    if (!message) return;

    appendMessage(chatMessages, 'user', message);
    clearInput(userInput);

    const loadingDiv = showLoading(chatMessages);

    try {
        const botResponse = await sendToChatGPT(message);
        chatMessages.removeChild(loadingDiv);
        appendMessage(chatMessages, 'bot', botResponse);
    } catch (error) {
        chatMessages.removeChild(loadingDiv);
        appendMessage(chatMessages, 'bot', 'Sorry, I encountered an error. Please try again.');
    }
}

// Initialize chat when page loads
document.addEventListener('DOMContentLoaded', initializeChat);

// Handle Enter key press
document.getElementById('user-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});


*/

//Specific filed and back button for option 2

/*

import { fetchUniversities, fetchUniversityFields } from './js/airtableService.js';
import { sendToChatGPT } from './js/chatService.js';
import { 
    appendMessage, 
    showLoading, 
    createOptionButton, 
    clearInput, 
    clearChat,
    createSearchInput,
    filterUniversities,
    updateUniversityList
} from './js/uiHelpers.js';

let currentMode = null;
let selectedUniversity = null;
let allUniversities = [];

function initializeChat() {
    const chatMessages = document.getElementById('chat-messages');
    clearChat(chatMessages);
    
    appendMessage(chatMessages, 'bot', 'Welcome! Please select an option:');
    
    const optionsDiv = document.createElement('div');
    optionsDiv.className = 'options-container';
    
    const universityButton = createOptionButton('University Information', () => handleModeSelection('university'));
    const generalButton = createOptionButton('General Information', () => handleModeSelection('general'));
    
    optionsDiv.appendChild(universityButton);
    optionsDiv.appendChild(generalButton);
    chatMessages.appendChild(optionsDiv);
}

async function handleModeSelection(mode) {
    currentMode = mode;
    const chatMessages = document.getElementById('chat-messages');
    clearChat(chatMessages);

    if (mode === 'university') {
        try {
            appendMessage(chatMessages, 'bot', 'Loading universities...');
            allUniversities = await fetchUniversities();
            clearChat(chatMessages);
            
            appendMessage(chatMessages, 'bot', 'Search for a university:');
            
            const { searchContainer, searchInput } = createSearchInput('Search by university name...');
            chatMessages.appendChild(searchContainer);
            
            const optionsDiv = document.createElement('div');
            optionsDiv.className = 'options-container university-list';
            chatMessages.appendChild(optionsDiv);
            
            // Initial list of all universities
            updateUniversityList(optionsDiv, allUniversities, handleUniversitySelection);
            
            // Add search functionality
            searchInput.addEventListener('input', (e) => {
                const searchTerm = e.target.value;
                const filteredUniversities = filterUniversities(allUniversities, searchTerm);
                updateUniversityList(optionsDiv, filteredUniversities, handleUniversitySelection);
            });
            
            // Add back button
            const backButton = createOptionButton('Back to Main Menu', initializeChat);
            const backContainer = document.createElement('div');
            backContainer.className = 'back-container';
            backContainer.appendChild(backButton);
            chatMessages.appendChild(backContainer);
            
        } catch (error) {
            appendMessage(chatMessages, 'bot', 'Sorry, I could not fetch the universities. Please try again.');
        }
    } else {
        appendMessage(chatMessages, 'bot', 'Please ask any general question about studying in Germany.');
        document.querySelector('.chat-input').style.display = 'flex';
    }
}

async function handleUniversitySelection(universityId) {
    selectedUniversity = universityId;
    const chatMessages = document.getElementById('chat-messages');
    clearChat(chatMessages);

    try {
        const fields = await fetchUniversityFields(universityId);
        appendMessage(chatMessages, 'bot', 'Available information:');
        
        const optionsDiv = document.createElement('div');
        optionsDiv.className = 'options-container';

        // Show only specified fields
        ['Application Type', 'Application Mode', 'Winter Deadline', 'Summer Deadline'].forEach(field => {
            if (fields[field]) {
                const button = createOptionButton(field, () => showFieldInfo(field, fields[field]));
                optionsDiv.appendChild(button);
            }
        });
        
        // Add back button
        const backButton = createOptionButton('Back to University Search', () => handleModeSelection('university'));
        optionsDiv.appendChild(backButton);
        
        chatMessages.appendChild(optionsDiv);
    } catch (error) {
        appendMessage(chatMessages, 'bot', 'Sorry, I could not fetch the university information. Please try again.');
    }
}

function showFieldInfo(field, value) {
    const chatMessages = document.getElementById('chat-messages');
    appendMessage(chatMessages, 'bot', `${field}: ${value}`);
    
    const backButton = createOptionButton('Back to University Selection', () => handleModeSelection('university'));
    const newQuestionButton = createOptionButton('Back to Main Menu', initializeChat);
    
    const optionsDiv = document.createElement('div');
    optionsDiv.className = 'options-container';
    optionsDiv.appendChild(backButton);
    optionsDiv.appendChild(newQuestionButton);
    chatMessages.appendChild(optionsDiv);
}

async function sendMessage() {
    if (currentMode !== 'general') return;

    const userInput = document.getElementById('user-input');
    const chatMessages = document.getElementById('chat-messages');
    const message = userInput.value.trim();

    if (!message) return;

    appendMessage(chatMessages, 'user', message);
    clearInput(userInput);

    const loadingDiv = showLoading(chatMessages);

    try {
        const botResponse = await sendToChatGPT(message);
        chatMessages.removeChild(loadingDiv);
        appendMessage(chatMessages, 'bot', botResponse);
    } catch (error) {
        chatMessages.removeChild(loadingDiv);
        appendMessage(chatMessages, 'bot', 'Sorry, I encountered an error. Please try again.');
    }
}

// Initialize chat when page loads
document.addEventListener('DOMContentLoaded', initializeChat);

// Handle Enter key press
document.getElementById('user-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

*/


//Loading 2000 record Load more option 

import { fetchUniversities, fetchUniversityFields } from './js/airtableService.js';
import { sendToChatGPT } from './js/chatService.js';
import { 
    appendMessage, 
    showLoading, 
    createOptionButton, 
    clearInput, 
    clearChat,
    createSearchInput,
    filterUniversities,
    updateUniversityList
} from './js/uiHelpers.js';

let currentMode = null;
let selectedUniversity = null;
let allUniversities = [];
let currentPage = 1;
const itemsPerPage = 50;

function initializeChat() {
    const chatMessages = document.getElementById('chat-messages');
    clearChat(chatMessages);
    
    appendMessage(chatMessages, 'bot', 'Welcome! Please select an option:');
    
    const optionsDiv = document.createElement('div');
    optionsDiv.className = 'options-container';
    
    const universityButton = createOptionButton('University Information', () => handleModeSelection('university'));
    const generalButton = createOptionButton('General Information', () => handleModeSelection('general'));
    
    optionsDiv.appendChild(universityButton);
    optionsDiv.appendChild(generalButton);
    chatMessages.appendChild(optionsDiv);
}

async function handleModeSelection(mode) {
    currentMode = mode;
    const chatMessages = document.getElementById('chat-messages');
    clearChat(chatMessages);

    if (mode === 'university') {
        try {
            appendMessage(chatMessages, 'bot', 'Loading universities...');
            startBackgroundLoading(); // Start background loading
            clearChat(chatMessages);
            
            appendMessage(chatMessages, 'bot', 'Search for a university:');
            
            const { searchContainer, searchInput } = createSearchInput('Search by university name...');
            chatMessages.appendChild(searchContainer);
            
            const optionsDiv = document.createElement('div');
            optionsDiv.className = 'options-container university-list';
            chatMessages.appendChild(optionsDiv);

            const loadMoreButton = createOptionButton('Load More', () => loadMoreUniversities(optionsDiv, searchInput.value));
            loadMoreButton.style.display = 'none';
            chatMessages.appendChild(loadMoreButton);

            // Initial list of universities
            loadMoreUniversities(optionsDiv);
            
            // Add search functionality
            searchInput.addEventListener('input', (e) => {
                currentPage = 1; // Reset pagination for search
                updateSearchResults(optionsDiv, e.target.value, loadMoreButton);
            });
            
            // Add back button
            const backButton = createOptionButton('Back to Main Menu', initializeChat);
            const backContainer = document.createElement('div');
            backContainer.className = 'back-container';
            backContainer.appendChild(backButton);
            chatMessages.appendChild(backContainer);
            
        } catch (error) {
            appendMessage(chatMessages, 'bot', 'Sorry, I could not fetch the universities. Please try again.');
        }
    } else {
        appendMessage(chatMessages, 'bot', 'Please ask any general question about studying in Germany.');
        document.querySelector('.chat-input').style.display = 'flex';
    }
}

function startBackgroundLoading() {
    let offset = 0;
    const limit = 100; // Fetch 100 universities per interval

    const intervalId = setInterval(async () => {
        try {
            const newUniversities = await fetchUniversities(offset, limit);
            if (newUniversities.length === 0) {
                clearInterval(intervalId); // Stop fetching when no more universities
            } else {
                allUniversities = allUniversities.concat(newUniversities);
                offset += limit;
            }
        } catch (error) {
            console.error('Error loading universities in background:', error);
            clearInterval(intervalId);
        }
    }, 1000); // Fetch every second
}

function loadMoreUniversities(container, searchTerm = '') {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = currentPage * itemsPerPage;

    const universitiesToDisplay = searchTerm
        ? filterUniversities(allUniversities, searchTerm).slice(startIndex, endIndex)
        : allUniversities.slice(startIndex, endIndex);

    updateUniversityList(container, universitiesToDisplay, handleUniversitySelection);

    currentPage++;

    const loadMoreButton = container.nextElementSibling;
    if ((searchTerm && filterUniversities(allUniversities, searchTerm).length > endIndex) ||
        (!searchTerm && allUniversities.length > endIndex)) {
        loadMoreButton.style.display = 'block';
    } else {
        loadMoreButton.style.display = 'none';
    }
}

function updateSearchResults(container, searchTerm, loadMoreButton) {
    container.innerHTML = '';
    currentPage = 1;
    loadMoreUniversities(container, searchTerm);
}

async function handleUniversitySelection(universityId) {
    selectedUniversity = universityId;
    const chatMessages = document.getElementById('chat-messages');
    clearChat(chatMessages);

    try {
        const fields = await fetchUniversityFields(universityId);
        appendMessage(chatMessages, 'bot', 'Available information:');
        
        const optionsDiv = document.createElement('div');
        optionsDiv.className = 'options-container';

        // Show only specified fields
        ['Application Type', 'Application Mode', 'Winter Deadline', 'Summer Deadline'].forEach(field => {
            if (fields[field]) {
                const button = createOptionButton(field, () => showFieldInfo(field, fields[field]));
                optionsDiv.appendChild(button);
            }
        });
        
        // Add back button
        const backButton = createOptionButton('Back to University Search', () => handleModeSelection('university'));
        optionsDiv.appendChild(backButton);
        
        chatMessages.appendChild(optionsDiv);
    } catch (error) {
        appendMessage(chatMessages, 'bot', 'Sorry, I could not fetch the university information. Please try again.');
    }
}

function showFieldInfo(field, value) {
    const chatMessages = document.getElementById('chat-messages');
    appendMessage(chatMessages, 'bot', `${field}: ${value}`);
    
    const backButton = createOptionButton('Back to University Selection', () => handleModeSelection('university'));
    const newQuestionButton = createOptionButton('Back to Main Menu', initializeChat);
    
    const optionsDiv = document.createElement('div');
    optionsDiv.className = 'options-container';
    optionsDiv.appendChild(backButton);
    optionsDiv.appendChild(newQuestionButton);
    chatMessages.appendChild(optionsDiv);
}

async function sendMessage() {
    if (currentMode !== 'general') return;

    const userInput = document.getElementById('user-input');
    const chatMessages = document.getElementById('chat-messages');
    const message = userInput.value.trim();

    if (!message) return;

    appendMessage(chatMessages, 'user', message);
    clearInput(userInput);

    const loadingDiv = showLoading(chatMessages);

    try {
        const botResponse = await sendToChatGPT(message);
        chatMessages.removeChild(loadingDiv);
        appendMessage(chatMessages, 'bot', botResponse);
    } catch (error) {
        chatMessages.removeChild(loadingDiv);
        appendMessage(chatMessages, 'bot', 'Sorry, I encountered an error. Please try again.');
    }
}

// Initialize chat when page loads
document.addEventListener('DOMContentLoaded', initializeChat);

// Handle Enter key press
document.getElementById('user-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

