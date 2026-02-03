// js/admin.js

// Admin login function
async function adminLogin() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    if (!email || !password) {
        alert("ကျေးဇူးပြု၍ email နှင့် password ထည့်ပါ။");
        return;
    }
    
    try {
        // window.firebaseAuth ကို အသုံးပြုပါ
        const userCredential = await window.firebaseAuth.signInWithEmailAndPassword(email, password);
        alert("Login successful!");
        
        // Show admin panel
        document.getElementById('admin-panel').style.display = 'block';
        document.getElementById('news-list-section').style.display = 'block';
        
        // Load all news
        loadAllNews();
        
        return userCredential.user;
    } catch (error) {
        alert("Login error: " + error.message);
        return null;
    }
}

// Add new news
async function addNews() {
    // window.firebaseAuth ကို အသုံးပြုပါ
    const user = window.firebaseAuth.currentUser;
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
        // window.firebaseDb ကို အသုံးပြုပါ
        await window.firebaseDb.collection("news").add({
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
        
        // Reload news list
        loadAllNews();
        
    } catch (error) {
        alert("Error adding news: " + error.message);
    }
}

// Load all news for admin
async function loadAllNews() {
    try {
        // window.firebaseDb ကို အသုံးပြုပါ
        const querySnapshot = await window.firebaseDb.collection("news")
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

// Edit news function (အခြေခံ)
function editNews(newsId) {
    alert("Edit news: " + newsId + "\nနောက်ပိုင်းတွင် ပြင်ဆင်ပါမည်။");
}

// Delete news function (အခြေခံ)
async function deleteNews(newsId) {
    if (confirm("ဒီသတင်းကို ဖျက်မှာ သေချာပါသလား?")) {
        try {
            await window.firebaseDb.collection("news").doc(newsId).delete();
            alert("သတင်း ဖျက်ပြီးပါပြီ။");
            loadAllNews();
        } catch (error) {
            alert("ဖျက်ရာတွင် အမှားဖြစ်နေပါသည်: " + error.message);
        }
    }
}

// Initialize admin page
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is already logged in
    window.firebaseAuth.onAuthStateChanged(function(user) {
        if (user) {
            console.log("User already logged in:", user.email);
            document.getElementById('admin-panel').style.display = 'block';
            document.getElementById('news-list-section').style.display = 'block';
            loadAllNews();
        }
    });
});
