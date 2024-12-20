export function appendMessage(chatMessages, sender, message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    messageDiv.textContent = message;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

export function showLoading(chatMessages) {
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'message bot loading';
    loadingDiv.textContent = 'Thinking...';
    chatMessages.appendChild(loadingDiv);
    return loadingDiv;
}

export function createOptionButton(text, onClick) {
    const button = document.createElement('button');
    button.textContent = text;
    button.className = 'option-button';
    button.onclick = onClick;
    return button;
}

export function clearInput(input) {
    input.value = '';
}

export function clearChat(chatMessages) {
    while (chatMessages.firstChild) {
        chatMessages.removeChild(chatMessages.firstChild);
    }
}

export function createSearchInput(placeholder) {
    const searchContainer = document.createElement('div');
    searchContainer.className = 'search-container';
    
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = placeholder;
    searchInput.className = 'search-input';
    
    searchContainer.appendChild(searchInput);
    return { searchContainer, searchInput };
}

export function filterUniversities(universities, searchTerm) {
    searchTerm = searchTerm.toLowerCase();
    return universities.filter(uni => {
        const name = uni.fields.Name.toLowerCase();
        const courses = (uni.fields.Courses || '').toLowerCase();
        return name.includes(searchTerm) || courses.includes(searchTerm);
    });
}

export function updateUniversityList(optionsDiv, universities, onSelect) {
    optionsDiv.innerHTML = '';
    universities.forEach(uni => {
        const button = createOptionButton(uni.fields.Name, () => onSelect(uni.id));
        if (uni.fields.Courses) {
            const coursesSpan = document.createElement('span');
            coursesSpan.className = 'courses-preview';
            coursesSpan.textContent = `Courses: ${uni.fields.Courses}`;
            button.appendChild(coursesSpan);
        }
        optionsDiv.appendChild(button);
    });
}