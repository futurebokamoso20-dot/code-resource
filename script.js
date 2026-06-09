// 1. Get the 'creator' parameter from the URL (e.g., ?creator=techguru)
const urlParams = new URLSearchParams(window.location.search);
const creatorParam = urlParams.get('creator');

// 2. Fetch the database
fetch('database.json')
    .then(response => response.json())
    .then(data => {
        // 3. Find the matching creator
        const creatorData = data.find(creator => creator.username === creatorParam);

        if (creatorData) {
            // 4. Populate the HTML with the data
            document.getElementById('creatorName').innerText = `@${creatorData.displayName}`;
            document.getElementById('videoTitle').innerText = creatorData.videoTitle;
            document.getElementById('codeBlock').innerText = creatorData.codeSnippet;
            
            // 5. Show the code container
            document.getElementById('codeContainer').classList.remove('hidden');
        } else {
            // Fallback if no creator is found or no parameter is in URL
            document.getElementById('creatorName').innerText = "Programmatic Resource Network";
            document.getElementById('videoTitle').innerText = "Submit your code snippets to get your own free copy-paste page.";
        }
    })
    .catch(error => {
        console.error('Error loading database:', error);
        document.getElementById('creatorName').innerText = "Error Loading";
    });

// 6. Copy to Clipboard Function
function copyCode() {
    const codeText = document.getElementById('codeBlock').innerText;
    navigator.clipboard.writeText(codeText).then(() => {
        const btn = document.getElementById('copyBtn');
        btn.innerText = "✅ Copied!";
        setTimeout(() => { btn.innerText = "📋 Copy Code"; }, 2000);
    });
}