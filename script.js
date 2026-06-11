// Global variable to store all codes
let allCodes = [];

// Fetch the database
fetch('database.json')
    .then(response => response.json())
    .then(data => {
        allCodes = data;
        displayCodes(data);
    })
    .catch(error => {
        console.error('Error loading database:', error);
        document.getElementById('pageTitle').innerText = "Error Loading";
    });

// Display codes in gallery
function displayCodes(codes) {
    const gallery = document.getElementById('codeGallery');
    gallery.innerHTML = '';
    
    codes.forEach(video => {
        const card = createVideoCard(video);
        gallery.appendChild(card);
    });
}

// Create video card
function createVideoCard(video) {
    const card = document.createElement('div');
    card.className = 'video-card';
    card.dataset.category = getCategory(video.videoTitle);
    
    let thumbnailHTML;
    if (video.thumbnail && (video.thumbnail.endsWith('.jpg') || video.thumbnail.endsWith('.png'))) {
        thumbnailHTML = `<img src="${video.thumbnail}" alt="${video.videoTitle}" class="thumbnail-img" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                         <div class="thumbnail" style="display:none;">${getEmoji(video.videoTitle)}</div>`;
    } else {
        thumbnailHTML = `<div class="thumbnail">${video.thumbnail || getEmoji(video.videoTitle)}</div>`;
    }
    
    card.innerHTML = `
        <h2>${video.videoTitle}</h2>
        <p class="creator-name">By @${video.displayName}</p>
        ${thumbnailHTML}
        <pre><code>${escapeHtml(video.codeSnippet)}</code></pre>
        <button class="copy-btn" onclick="copyCode(this)">
            <span>📋</span> Copy Code
        </button>
    `;
    
    return card;
}

// Get category from title
function getCategory(title) {
    title = title.toLowerCase();
    if (title.includes('heart') || title.includes('love')) return 'heart';
    if (title.includes('logo') || title.includes('bmw')) return 'logo';
    return 'animation';
}

// Get emoji based on title
function getEmoji(title) {
    title = title.toLowerCase();
    if (title.includes('heart') || title.includes('love')) return '❤️';
    if (title.includes('logo') || title.includes('bmw')) return '🚗';
    if (title.includes('clock')) return '⏰';
    if (title.includes('spiral')) return '🌀';
    return '💻';
}

// Copy code function
function copyCode(button) {
    const codeBlock = button.previousElementSibling.querySelector('code');
    const codeText = codeBlock.innerText;
    
    navigator.clipboard.writeText(codeText).then(() => {
        const originalHTML = button.innerHTML;
        button.innerHTML = '<span>✅</span> Copied!';
        button.classList.add('copied');
        button.style.backgroundColor = '#2ea043';
        
        setTimeout(() => {
            button.innerHTML = originalHTML;
            button.classList.remove('copied');
            button.style.backgroundColor = '#238636';
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy:', err);
        alert('Failed to copy code. Please try again.');
    });
}

// Escape HTML
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

// Search functionality
document.getElementById('searchInput').addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();
    
    if (searchTerm === '') {
        displayCodes(allCodes);
        return;
    }
    
    const filtered = allCodes.filter(code => 
        code.videoTitle.toLowerCase().includes(searchTerm) ||
        code.displayName.toLowerCase().includes(searchTerm) ||
        code.codeSnippet.toLowerCase().includes(searchTerm)
    );
    
    displayCodes(filtered);
});

// Category filter
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        // Remove active class from all buttons
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        this.classList.add('active');
        
        const category = this.dataset.category;
        
        if (category === 'all') {
            displayCodes(allCodes);
        } else {
            const filtered = allCodes.filter(code => getCategory(code.videoTitle) === category);
            displayCodes(filtered);
        }
    });
});