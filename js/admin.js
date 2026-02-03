// Admin JavaScript File
console.log("Admin JS loaded");

// Admin login function
async function adminLogin(email, password) {
    try {
        const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
        alert("Login successful!");
        return userCredential.user;
    } catch (error) {
        alert("Login error: " + error.message);
        return null;
    }
}

// Add new news
async function addNews() {
    const user = firebase.auth().currentUser;
    if (!user) {
        alert("Please login first!");
        return;
    }
    
    const title = document.getElementById('news-title').value;
    const content = document.getElementById('news-content').value;
    const imageUrl = document.getElementById('news-image').value;
    const category = document.getElementById('news-category').value;
    
    if (!title || !content) {
        alert("Title and content are required!");
        return;
    }
    
    try {
        await db.collection("news").add({
            title: title,
            content: content,
            imageUrl: imageUrl || "",
            category: category || "အထွေထွေ",
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            createdBy: user.email,
            views: 0
        });
        
        alert("News added successfully!");
        
        // Clear form
        document.getElementById('news-title').value = '';
        document.getElementById('news-content').value = '';
        document.getElementById('news-image').value = '';
        document.getElementById('news-category').value = '';
        
    } catch (error) {
        alert("Error adding news: " + error.message);
    }
}

// Load all news for admin
async function loadAllNews() {
    try {
        const querySnapshot = await db.collection("news")
            .orderBy("createdAt", "desc")
            .get();
        
        const container = document.getElementById('admin-news-list');
        if (!container) return;
        
        container.innerHTML = '';
        
        querySnapshot.forEach((doc) => {
            const news = doc.data();
            const newsElement = document.createElement('div');
            newsElement.className = 'admin-news-item';
            newsElement.innerHTML = `
                <h4>${news.title}</h4>
                <p>${news.content.substring(0, 100)}...</p>
                <button onclick="editNews('${doc.id}')">Edit</button>
                <button onclick="deleteNews('${doc.id}')">Delete</button>
            `;
            container.appendChild(newsElement);
        });
        
    } catch (error) {
        console.error("Error loading news:", error);
    }
}

// Initialize admin page
if (window.location.pathname.includes('admin.html')) {
    document.addEventListener('DOMContentLoaded', function() {
        // Check if user is logged in
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                console.log("User logged in:", user.email);
                loadAllNews();
            } else {
                console.log("No user logged in");
                // Show login form
            }
        });
    });
}
