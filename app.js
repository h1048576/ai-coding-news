// AI Coding News - Frontend App

const NEWS_URL = 'news.json';
const CACHE_KEY = 'ai_coding_news_cache';
const CACHE_DURATION = 6 * 60 * 60 * 1000; // 6 hours

async function fetchNews() {
    const loadingEl = document.getElementById('loading');
    const errorEl = document.getElementById('error');
    const newsContainer = document.getElementById('news-container');
    const lastUpdatedEl = document.getElementById('last-updated');

    try {
        // 尝试从缓存加载
        const cached = loadFromCache();
        if (cached) {
            renderNews(cached);
            updateLastUpdated(cached.timestamp);
            loadingEl.style.display = 'none';
        }

        // 从服务器获取最新数据
        const response = await fetch(NEWS_URL + '?t=' + Date.now());
        if (!response.ok) {
            throw new Error('Failed to fetch news');
        }

        const data = await response.json();
        
        // 保存到缓存
        saveToCache(data);
        
        // 渲染新闻
        renderNews(data);
        updateLastUpdated(data.timestamp);
        
        loadingEl.style.display = 'none';
        errorEl.style.display = 'none';
        
    } catch (error) {
        console.error('Error fetching news:', error);
        loadingEl.style.display = 'none';
        
        if (!cached) {
            errorEl.style.display = 'block';
        }
    }
}

function renderNews(data) {
    const newsContainer = document.getElementById('news-container');
    
    if (!data || !data.news || data.news.length === 0) {
        newsContainer.innerHTML = '<p class="error">暂无新闻数据</p>';
        return;
    }

    const platformIcons = {
        'brave': '🔵',
        'yahoo': '🟣',
        'duckduckgo': '🟡'
    };

    const platformClasses = {
        'brave': 'platform-brave',
        'yahoo': 'platform-yahoo',
        'duckduckgo': 'platform-duckduckgo'
    };

    let html = '';
    
    // 按平台分组新闻
    const groupedNews = {};
    data.news.forEach(item => {
        const platform = item.platform || 'unknown';
        if (!groupedNews[platform]) {
            groupedNews[platform] = [];
        }
        groupedNews[platform].push(item);
    });

    // 渲染每个平台的新闻
    const platformOrder = ['brave', 'yahoo', 'duckduckgo'];
    const platformNames = {
        'brave': 'Brave 搜索',
        'yahoo': 'Yahoo 搜索',
        'duckduckgo': 'DuckDuckGo 搜索'
    };

    platformOrder.forEach(platform => {
        const items = groupedNews[platform] || [];
        if (items.length === 0) return;

        const icon = platformIcons[platform] || '📰';
        const name = platformNames[platform] || platform;

        html += `
            <div class="section-header">
                <span class="section-icon">${icon}</span>
                <h3>${name}</h3>
            </div>
        `;

        items.forEach((item, index) => {
            const platformClass = platformClasses[platform] || '';
            const title = escapeHtml(item.title || '无标题');
            const url = item.url || '#';
            const snippet = item.snippet ? escapeHtml(item.snippet) : '';
            
            html += `
                <article class="news-card">
                    <h2><a href="${escapeHtml(url)}" target="_blank" rel="noopener">${title}</a></h2>
                    <div class="news-meta">
                        <span class="news-source">
                            <span class="platform-tag ${platformClass}">${platform}</span>
                        </span>
                        <span class="news-date">📅 ${formatDate(item.timestamp || data.timestamp)}</span>
                    </div>
                    ${snippet ? `<p class="news-snippet">${snippet}</p>` : ''}
                </article>
            `;
        });
    });

    newsContainer.innerHTML = html;
}

function updateLastUpdated(timestamp) {
    const el = document.getElementById('last-updated');
    if (el) {
        el.textContent = '最后更新：' + formatDateTime(timestamp);
    }
}

function formatDate(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) {
        return '今天';
    } else if (days === 1) {
        return '昨天';
    } else if (days < 7) {
        return `${days}天前`;
    } else {
        return date.toLocaleDateString('zh-CN');
    }
}

function formatDateTime(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    });
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function loadFromCache() {
    try {
        const cached = localStorage.getItem(CACHE_KEY);
        if (!cached) return null;
        
        const data = JSON.parse(cached);
        const age = Date.now() - data.timestamp;
        
        if (age > CACHE_DURATION) {
            localStorage.removeItem(CACHE_KEY);
            return null;
        }
        
        return data;
    } catch (e) {
        console.error('Cache load error:', e);
        return null;
    }
}

function saveToCache(data) {
    try {
        localStorage.setItem(CACHE_KEY, JSON.stringify(data));
    } catch (e) {
        console.error('Cache save error:', e);
    }
}

// 初始化
document.addEventListener('DOMContentLoaded', fetchNews);
