/**
 * 龙虾出行学院 — Unified Navigation Injection
 * taste-skill inspired redesign
 */
(function() {
  'use strict';

  const HOME_URL = '/';
  const NAV_CSS = '/assets/css/nav.css';

  const CATEGORIES = {
    industry: {
      label: '行业分享',
      courses: {
        'ctrip_analysis.html': '携程商业演进分析',
        'booking_analysis.html': 'Booking Holdings 分析',
        'decentralization_trends.html': '去中心化趋势与战略'
      }
    },
    strategy: {
      label: '商业策略',
      courses: {
        'mvp_strategy.html': 'MVP战略与商业模式设计',
        'mvp_growth.html': 'MVP增长与运营执行'
      }
    },
    'supply-chain': {
      label: '供应链',
      courses: {
        'intro.html': '机票酒店供应链入门',
        'sales.html': '供应链开拓实战',
        'management.html': '供应链管理进阶+AI应用'
      }
    },
    tech: {
      label: '技术通识',
      courses: {
        'api_directory.html': '全球出行行业API/B2B平台大全',
        'business_literacy.html': '技术研发人员商业通识'
      }
    }
  };

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

  const body = document.body;
  const bodyStyle = window.getComputedStyle(body);
  const isSlideMode = bodyStyle.overflow === 'hidden' && (bodyStyle.height === '100vh' || bodyStyle.height === window.innerHeight + 'px');

  if (!document.querySelector('link[href="' + NAV_CSS + '"]')) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = NAV_CSS;
    document.head.appendChild(link);
  }

  function buildNav() {
    const cat = activeCat ? CATEGORIES[activeCat] : null;

    let linksHtml = '';
    for (const [catId, c] of Object.entries(CATEGORIES)) {
      const isActive = catId === activeCat;
      linksHtml += `<a href="/#${catId}" class="${isActive ? 'rc-active' : ''}">${c.label}</a>`;
    }

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

    let drawerLinksHtml = '';
    for (const [catId, c] of Object.entries(CATEGORIES)) {
      const isActive = catId === activeCat;
      drawerLinksHtml += `<a href="/#${catId}" class="${isActive ? 'rc-active' : ''}">${c.label}</a>`;
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
            <span class="rc-logo-mark">R</span>
            <span class="rc-logo-text">龙虾出行<span>学院</span></span>
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

  const navWrapper = document.createElement('div');
  navWrapper.innerHTML = buildNav();
  while (navWrapper.firstChild) {
    body.insertBefore(navWrapper.firstChild, body.firstChild);
  }

  if (!isSlideMode) {
    body.classList.add('rc-nav-padded');
  }

  const hamburger = document.getElementById('rc-hamburger');
  const drawer = document.getElementById('rc-nav-drawer');
  if (hamburger && drawer) {
    hamburger.addEventListener('click', function() {
      const open = hamburger.classList.toggle('rc-open');
      drawer.classList.toggle('rc-open', open);
    });
    drawer.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        hamburger.classList.remove('rc-open');
        drawer.classList.remove('rc-open');
      });
    });
    document.addEventListener('click', function(e) {
      if (!hamburger.contains(e.target) && !drawer.contains(e.target)) {
        hamburger.classList.remove('rc-open');
        drawer.classList.remove('rc-open');
      }
    });
  }

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && hamburger && drawer) {
      hamburger.classList.remove('rc-open');
      drawer.classList.remove('rc-open');
    }
  });
})();
