// js/main.js

// ဒီ file မှာ Firebase initialization ကို မထည့်တော့ဘူး
// ဘာလို့လဲဆိုတော့ index.html မှာ ရှေ့ကတည်းက initialize လုပ်ပြီးသားမို့

// Function to load news
async function loadNews() {
    try {
        const newsContainer = document.getElementById('news-container');
        if (!newsContainer) return;
        
        newsContainer.innerHTML = '<p>သတင်းများ ရယူနေသည်...</p>';
        
        // window.firebaseDb ကို အသုံးပြုပါ
        const querySnapshot = await window.firebaseDb.collection("news")
            .orderBy("createdAt", "desc")
            .limit(10)
            .get();
        
        if (querySnapshot.empty) {
            newsContainer.innerHTML = '<p>သတင်းများ မရှိသေးပါ။</p>';
            return;
        }
        
        let newsHTML = '';
        querySnapshot.forEach((doc) => {
            const news = doc.data();
            const dateStr = news.createdAt ? 
                news.createdAt.toDate().toLocaleDateString('my-MM') : 
                'ရက်စွဲမရှိ';
            
            newsHTML += `
                <div class="news-item">
                    <h3>${news.title || 'ခေါင်းစဉ်မရှိ'}</h3>
                    <p>${news.content ? news.content.substring(0, 150) + '...' : 'အကြောင်းအရာမရှိ'}</p>
                    <p><strong>အမျိုးအစား:</strong> ${news.category || 'အထွေထွေ'}</p>
                    <span class="date">${dateStr}</span>
                    <br>
                    <a href="#" class="read-more" onclick="viewNewsDetail('${doc.id}')">ဆက်ဖတ်ရန်</a>
                </div>
            `;
        });
        
        newsContainer.innerHTML = newsHTML;
        
    } catch (error) {
        console.error("သတင်းများ ရယူရာတွင် အမှား:", error);
        const newsContainer = document.getElementById('news-container');
        if (newsContainer) {
            newsContainer.innerHTML = '<p>သတင်းများ ရယူရာတွင် အမှားတစ်ခုဖြစ်နေပါသည်။</p>';
        }
    }
}

// Function to view news detail
function viewNewsDetail(newsId) {
    alert('သတင်း ID: ' + newsId + '\nနောက်ပိုင်းတွင် ပြင်ဆင်ပါမည်။');
}

// Load news when page is ready
document.addEventListener('DOMContentLoaded', function() {
    loadNews();
    
    // Auto-refresh every 5 minutes
    setInterval(loadNews, 300000);
});
