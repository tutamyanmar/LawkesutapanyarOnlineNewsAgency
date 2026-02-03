// Firebase Configuration (Firestore သုံးပါက)
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Firebase ကို initialize လုပ်ပါ
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// သတင်းများကို ဖော်ပြရန် function
async function loadNews() {
    try {
        const querySnapshot = await db.collection("news")
            .orderBy("createdAt", "desc")
            .limit(10)
            .get();
        
        const container = document.getElementById('news-container');
        container.innerHTML = '';
        
        querySnapshot.forEach((doc) => {
            const news = doc.data();
            const newsElement = `
                <div class="news-item">
                    <img src="${news.imageUrl || 'images/default.jpg'}" alt="${news.title}">
                    <h3>${news.title}</h3>
                    <p>${news.content.substring(0, 200)}...</p>
                    <span class="date">${new Date(news.createdAt).toLocaleDateString('my-MM')}</span>
                    <a href="#" class="read-more" data-id="${doc.id}">ဆက်ဖတ်ရန်</a>
                </div>
            `;
            container.innerHTML += newsElement;
        });
    } catch (error) {
        console.error("သတင်းများ ဖော်ပြရာတွင် အမှားတစ်ခုဖြစ်နေပါသည်:", error);
    }
}

// စာမျက်နှာ load ပြီးတိုင်း သတင်းများကို ဖော်ပြပါ
document.addEventListener('DOMContentLoaded', loadNews);
