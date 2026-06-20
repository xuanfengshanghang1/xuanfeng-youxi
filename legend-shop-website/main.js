// 炫锋商行官网 - 交互脚本

// ========== 全站配置动态加载 ==========
// 页面加载后自动应用 SITE_CONFIG 配置
document.addEventListener('DOMContentLoaded', function() {
  if (typeof SITE_CONFIG !== 'undefined') {
    // 动态更新品牌名
    document.querySelectorAll('.brand-name').forEach(el => {
      el.textContent = SITE_CONFIG.brandName;
    });
    
    // 动态更新QQ号
    document.querySelectorAll('.qq-number').forEach(el => {
      el.textContent = SITE_CONFIG.qq;
    });
    
    // 动态更新微信号
    document.querySelectorAll('.wechat-name').forEach(el => {
      el.textContent = SITE_CONFIG.wechat;
    });
    
    // 动态更新工作时间
    document.querySelectorAll('.work-time').forEach(el => {
      el.textContent = SITE_CONFIG.workTime;
    });
    
    // 动态渲染Logo
    const logoContainer = document.getElementById('site-logo');
    if (logoContainer) {
      renderLogo(logoContainer, SITE_CONFIG);
    }
    
    // 动态更新页面title（如果包含品牌名占位符）
    if (document.title.includes('传奇商行')) {
      document.title = document.title.replace(/传奇商行/g, SITE_CONFIG.brandName);
    }
  }
});

// Logo渲染函数
function renderLogo(container, config) {
  container.innerHTML = '';
  
  if (config.logoType === 'svg') {
    // SVG龙图标
    container.innerHTML = '<span class="logo-icon">⚔</span><span class="logo-text brand-name">' + config.brandName + '</span>';
  } else if (config.logoType === 'image' && config.logoImage) {
    const img = document.createElement('img');
    img.src = config.logoImage;
    img.alt = config.brandName;
    img.className = 'logo-image';
    container.appendChild(img);
  } else if (config.logoType === 'text') {
    container.innerHTML = '<span class="logo-text">' + config.logoText + '</span>';
  }
}

// ========== 原有交互逻辑 ==========

// 导航栏滚动效果
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// 移动端菜单切换
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const spans = navToggle.querySelectorAll('span');
        if (navLinks.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
            spans[0].style.transform = '';
            spans[1].style.opacity = '';
            spans[2].style.transform = '';
        }
    });
}

// 点击导航链接关闭移动菜单
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const spans = navToggle?.querySelectorAll('span');
        if (spans) {
            spans[0].style.transform = '';
            spans[1].style.opacity = '';
            spans[2].style.transform = '';
        }
    });
});

// 滚动渐入动画
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.adv-card, .biz-card, .goods-item, .testi-card, .biz-detail-card, .step, .guarantee-card, .about-block, .goods-page-item, .contact-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// 平滑滚动到锚点
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});
