// Get the 'creator' parameter from URL
const urlParams = new URLSearchParams(window.location.search);
const creatorParam = urlParams.get('creator');

// Fetch the database
fetch('database.json')
    .then(response => response.json())
    .then(data => {
        const gallery = document.getElementById('codeGallery');
        const pageTitle = document.getElementById('pageTitle');
        
        if (creatorParam) {
            // Show only this creator's videos
            const creatorVideos = data.filter(item => item.username.includes(creatorParam));
            
            if (creatorVideos.length > 0) {
                pageTitle.innerText = `@${creatorVideos[0].displayName}'s Code Library`;
                
                creatorVideos.forEach(video => {
                    const card = createVideoCard(video);
                    gallery.appendChild(card);
                });
            } else {
                pageTitle.innerText = "Creator not found";
                gallery.innerHTML = '<p>No videos found for this creator.</p>';
            }
        } else {
            // Show all creators
            pageTitle.innerText = "Browse All Code Libraries";
            
            const creators = {};
            data.forEach(item => {
                const baseUsername = item.username.split('-')[0];
                if (!creators[baseUsername]) {
                    creators[baseUsername] = [];
                }
                creators[baseUsername].push(item);
            });
            
            Object.keys(creators).forEach(username => {
                const videos = creators[username];
                const card = document.createElement('div');
                card.className = 'video-card';
                card.innerHTML = `
                    <h2>@${videos[0].displayName}</h2>
                    <p>${videos.length} video(s) available</p>
                    <a href="?creator=${username}" style="color: #58a6ff;">View all codes →</a>
                `;
                gallery.appendChild(card);
            });
        }
    })
    .catch(error => {
        console.error('Error loading database:', error);
        document.getElementById('pageTitle').innerText = "Error Loading";
    });

function createVideoCard(video) {
    const card = document.createElement('div');
    card.className = 'video-card';
    
    let thumbnailHTML;
    if (video.thumbnail && (video.thumbnail.endsWith('.jpg') || video.thumbnail.endsWith('.png'))) {
        thumbnailHTML = `<img src="${video.thumbnail}" alt="${video.videoTitle}" class="thumbnail-img">`;
    } else {
        thumbnailHTML = `<div class="thumbnail">${video.thumbnail || '💻'}</div>`;
    }
    
    card.innerHTML = `
        <h2>${video.videoTitle}</h2>
        ${thumbnailHTML}
        <pre><code>${escapeHtml(video.codeSnippet)}</code></pre>
        <button onclick="copyCode(this)">📋 Copy Code</button>
    `;
    
    return card;
}

function copyCode(button) {
    const codeBlock = button.previousElementSibling.querySelector('code');
    const codeText = codeBlock.innerText;
    
    navigator.clipboard.writeText(codeText).then(() => {
        const originalText = button.innerText;
        button.innerText = "✅ Copied!";
        button.style.backgroundColor = "#2ea043";
        
        setTimeout(() => {
            button.innerText = originalText;
            button.style.backgroundColor = "#238636";
        }, 2000);
    });
}

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