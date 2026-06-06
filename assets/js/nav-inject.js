/**
 * RideClaw Courses — 统一导航栏注入
 * 在每个课程页面底部引入即可自动注入
 * <script src="/assets/js/nav-inject.js"></script>
 */
(function() {
  'use strict';

  // Config
  const HOME_URL = '/';
  const NAV_CSS = '/assets/css/nav.css';

  // Category map: path segment -> { label, icon, courses: {filename: title} }
  const CATEGORIES = {
    industry: {
      label: '行业分享',
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>',
      courses: {
        'ctrip_analysis.html': '携程商业演进分析',
        'booking_analysis.html': 'Booking Holdings 分析',
        'decentralization_trends.html': '去中心化趋势与战略'
      }
    },
    strategy: {
      label: '商业策略',
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
      courses: {
        'mvp_strategy.html': 'MVP战略与商业模式设计',
        'mvp_growth.html': 'MVP增长与运营执行'
      }
    },
    'supply-chain': {
      label: '供应链',
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>',
      courses: {
        'intro.html': '机票酒店供应链入门',
        'sales.html': '供应链开拓实战',
        'management.html': '供应链管理进阶+AI应用'
      }
    },
    tech: {
      label: '技术通识',
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
      courses: {
        'api_directory.html': '全球出行行业API/B2B平台大全',
        'business_literacy.html': '技术研发人员商业通识课'
      }
    }
  };

  // Detect category & course from URL
  const path = window.location.pathname;
  let activeCat = null, activeCourse = null, courseTitle = '';
  for (const [catId, cat] of Object.entries(CATEGORIES)) {
    if (path.includes('/courses/' + catId + '/')) {
      activeCat = catId;
      const filename = path.split('/').pop();
      if (cat.courses[filename]) {
        activeCourse = filename;
        courseTitle = cat.courses[filename];
      }
      break;
    }
  }

  // Detect slide mode: body has overflow:hidden + height:100vh
  const body = document.body;
  const bodyStyle = window.getComputedStyle(body);
  const isSlideMode = bodyStyle.overflow === 'hidden' && (bodyStyle.height === '100vh' || bodyStyle.height === window.innerHeight + 'px');

  // Inject CSS if not already present
  if (!document.querySelector('link[href="' + NAV_CSS + '"]')) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = NAV_CSS;
    document.head.appendChild(link);
  }

  // Build nav HTML
  function buildNav() {
    const cat = activeCat ? CATEGORIES[activeCat] : null;

    // Desktop links
    let linksHtml = '';
    for (const [catId, c] of Object.entries(CATEGORIES)) {
      const isActive = catId === activeCat;
      linksHtml += `<a href="/#${catId}" class="${isActive ? 'rc-active' : ''}">${c.icon}<span>${c.label}</span></a>`;
    }

    // Breadcrumb
    let breadcrumbHtml = '';
    if (cat && courseTitle) {
      breadcrumbHtml = `<div class="rc-breadcrumb">
        <a href="/">首页</a>
        <span class="rc-sep">/</span>
        <a href="/#${activeCat}">${cat.label}</a>
        <span class="rc-sep">/</span>
        <span title="${courseTitle}">${courseTitle}</span>
      </div>`;
    } else if (cat) {
      breadcrumbHtml = `<div class="rc-breadcrumb">
        <a href="/">首页</a>
        <span class="rc-sep">/</span>
        <span>${cat.label}</span>
      </div>`;
    }

    // Drawer links (mobile)
    let drawerLinksHtml = '';
    for (const [catId, c] of Object.entries(CATEGORIES)) {
      const isActive = catId === activeCat;
      drawerLinksHtml += `<a href="/#${catId}" class="${isActive ? 'rc-active' : ''}">${c.icon}<span>${c.label}</span></a>`;
      // Sub-courses in drawer
      if (catId === activeCat) {
        for (const [fname, ftitle] of Object.entries(c.courses)) {
          const isCourseActive = fname === activeCourse;
          drawerLinksHtml += `<a href="/courses/${catId}/${fname}" style="padding-left:44px;font-size:13px;${isCourseActive ? 'color:var(--nav-accent);' : ''}">${isCourseActive ? '●' : '○'} ${ftitle}</a>`;
        }
      }
      drawerLinksHtml += '<div class="rc-drawer-divider"></div>';
    }

    return `<nav id="rc-nav" class="${isSlideMode ? 'rc-slide-mode' : ''}">
      <div class="rc-nav-inner">
        <div style="display:flex;align-items:center;min-width:0;">
          <a href="${HOME_URL}" class="rc-logo">
            <span class="rc-logo-icon">🦞</span>
            <span class="rc-logo-text">RideClaw <span>Courses</span></span>
          </a>
          ${breadcrumbHtml}
        </div>
        <ul class="rc-nav-links">${linksHtml}</ul>
        <button class="rc-hamburger" id="rc-hamburger" aria-label="菜单">
          <span></span><span></span><span></span>
        </button>
      </div>
    </nav>
    <div class="rc-nav-drawer" id="rc-nav-drawer">
      <ul class="rc-drawer-links">${drawerLinksHtml}</ul>
    </div>`;
  }

  // Insert nav at top of body
  const navWrapper = document.createElement('div');
  navWrapper.innerHTML = buildNav();
  while (navWrapper.firstChild) {
    body.insertBefore(navWrapper.firstChild, body.firstChild);
  }

  // Apply body padding for non-slide courses
  if (!isSlideMode) {
    body.classList.add('rc-nav-padded');
  }

  // Hamburger toggle
  const hamburger = document.getElementById('rc-hamburger');
  const drawer = document.getElementById('rc-nav-drawer');
  if (hamburger && drawer) {
    hamburger.addEventListener('click', function() {
      const open = hamburger.classList.toggle('rc-open');
      drawer.classList.toggle('rc-open', open);
    });
    // Close on link click
    drawer.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        hamburger.classList.remove('rc-open');
        drawer.classList.remove('rc-open');
      });
    });
    // Close on outside click
    document.addEventListener('click', function(e) {
      if (!hamburger.contains(e.target) && !drawer.contains(e.target)) {
        hamburger.classList.remove('rc-open');
        drawer.classList.remove('rc-open');
      }
    });
  }

  // Keyboard: ESC to close drawer
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && hamburger && drawer) {
      hamburger.classList.remove('rc-open');
      drawer.classList.remove('rc-open');
    }
  });
})();
