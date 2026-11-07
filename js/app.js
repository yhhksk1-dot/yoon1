/**
 * Andong Travel Guide - Client-side Interactive Application
 * Bilingual support (EN/KO), Audio Flashcards, Trip Planner, Currency Converter.
 * 100% standalone via file:// or static server without build tools.
 * Mobile hardened: safeStorage (handles mobile SecurityError), touch-optimized.
 */

(function () {
  'use strict';

  // Safe storage helper to prevent mobile browser SecurityError / QuotaExceededError
  const safeStorage = {
    get: function (key, fallback) {
      try {
        if (typeof window !== 'undefined' && window.localStorage) {
          const val = window.localStorage.getItem(key);
          return val !== null ? val : fallback;
        }
      } catch (e) {
        console.warn('LocalStorage not available in this environment, using memory state:', e);
      }
      return fallback;
    },
    set: function (key, val) {
      try {
        if (typeof window !== 'undefined' && window.localStorage) {
          window.localStorage.setItem(key, val);
        }
      } catch (e) {
        console.warn('LocalStorage write failed:', e);
      }
    },
    remove: function (key) {
      try {
        if (typeof window !== 'undefined' && window.localStorage) {
          window.localStorage.removeItem(key);
        }
      } catch (e) {
        // ignore
      }
    }
  };

  // State Management
  const rawSaved = safeStorage.get('andong_saved_places', '[]');
  let initialSaved = [];
  try {
    initialSaved = JSON.parse(rawSaved);
  } catch (e) {
    initialSaved = [];
  }

  const state = {
    selectedCategory: 'all',
    searchQuery: '',
    savedPlaceIds: initialSaved,
    theme: safeStorage.get('andong_theme', (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')),
    lang: safeStorage.get('andong_lang', 'en'), // default is 'en' for foreign tourists
    selectedPlaceForModal: null,
    exchangeRates: {
      USD: 0.00073, // 1 KRW ≈ 0.00073 USD
      EUR: 0.00068,
      JPY: 0.11,
      CNY: 0.0053
    }
  };

  // DOM Elements
  const placesGrid = document.getElementById('placesGrid');
  const categoryFilters = document.getElementById('categoryFilters');
  const searchInput = document.getElementById('searchInput');
  const searchBtn = document.getElementById('searchBtn');
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const langToggleBtn = document.getElementById('langToggleBtn');
  const langLabel = document.getElementById('langLabel');
  const tripDrawer = document.getElementById('tripDrawer');
  const tripDrawerOpenBtn = document.getElementById('tripDrawerOpenBtn');
  const tripDrawerCloseBtn = document.getElementById('tripDrawerCloseBtn');
  const tripBadgeCount = document.getElementById('tripBadgeCount');
  const tripListContainer = document.getElementById('tripListContainer');
  const clearTripBtn = document.getElementById('clearTripBtn');
  const shareTripBtn = document.getElementById('shareTripBtn');
  
  // Modal Elements
  const placeModal = document.getElementById('placeModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalImg = document.getElementById('modalImg');
  const modalBadge = document.getElementById('modalBadge');
  const modalTitleEn = document.getElementById('modalTitleEn');
  const modalTitleKo = document.getElementById('modalTitleKo');
  const modalDesc = document.getElementById('modalDesc');
  const modalAddress = document.getElementById('modalAddress');
  const modalCopyAddressBtn = document.getElementById('modalCopyAddressBtn');
  const modalHours = document.getElementById('modalHours');
  const modalAdmission = document.getElementById('modalAdmission');
  const modalTransport = document.getElementById('modalTransport');
  const modalTipsList = document.getElementById('modalTipsList');
  const modalGoogleMapBtn = document.getElementById('modalGoogleMapBtn');
  const modalSaveBtn = document.getElementById('modalSaveBtn');

  // Food & Phrases & Transport Containers
  const foodGrid = document.getElementById('foodGrid');
  const phraseGrid = document.getElementById('phraseGrid');
  const transportGrid = document.getElementById('transportGrid');
  const itineraryGrid = document.getElementById('itineraryGrid');

  // Converter Elements
  const krwInput = document.getElementById('krwInput');
  const currencySelect = document.getElementById('currencySelect');
  const foreignVal = document.getElementById('foreignVal');

  // Expose global toggleLanguage for inline HTML onclick handlers
  window.toggleLanguage = function () {
    const nextLang = state.lang === 'en' ? 'ko' : 'en';
    setLanguage(nextLang);
    showToast(nextLang === 'ko' ? '한국어로 변경되었습니다' : 'Switched to English');
  };

  window.setLanguageTo = function (targetLang) {
    if (state.lang !== targetLang) {
      setLanguage(targetLang);
      showToast(targetLang === 'ko' ? '한국어로 변경되었습니다' : 'Switched to English');
    }
  };

  // Toast notification for user feedback
  function showToast(message) {
    let toast = document.getElementById('appToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'appToast';
      toast.className = 'app-toast';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => {
      toast.classList.remove('show');
    }, 2000);
  }

  // Theme Handling
  function applyTheme(theme) {
    state.theme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    safeStorage.set('andong_theme', theme);
    const sunIcon = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>`;
    const moonIcon = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
    if (themeToggleBtn) {
      themeToggleBtn.innerHTML = theme === 'dark' ? sunIcon : moonIcon;
      themeToggleBtn.setAttribute('title', theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode');
    }
  }

  // Language Switching (i18n)
  function setLanguage(lang) {
    state.lang = lang;
    safeStorage.set('andong_lang', lang);
    document.documentElement.lang = lang;

    // Update Language Switcher UI (both header & mobile float)
    document.querySelectorAll('.lang-btn-option').forEach(btn => {
      const btnLang = btn.getAttribute('data-lang');
      if (btnLang === lang) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    if (langLabel) {
      langLabel.textContent = lang === 'en' ? '한국어' : 'English';
    }
    if (langToggleBtn) {
      langToggleBtn.setAttribute('title', lang === 'en' ? '한국어로 전환하기' : 'Switch to English');
    }

    // Update all static data-i18n text nodes
    const dict = (typeof ANDONG_I18N !== 'undefined' && ANDONG_I18N[lang]) ? ANDONG_I18N[lang] : ANDONG_I18N.en;
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict && dict[key]) {
        el.innerHTML = dict[key];
      }
    });

    // Update search placeholder
    if (searchInput && dict && dict.searchPlaceholder) {
      searchInput.setAttribute('placeholder', dict.searchPlaceholder);
    }

    // Re-render all dynamic bilingual sections
    renderCategoryButtons();
    renderPlaces();
    renderFoods();
    renderItineraries();
    renderPhrases();
    renderTransport();
    renderTripDrawer();

    // If modal is open, re-render modal contents
    if (state.selectedPlaceForModal) {
      openModal(state.selectedPlaceForModal.id);
    }
  }

  // Category Buttons
  function renderCategoryButtons() {
    if (!categoryFilters || typeof ANDONG_DATA === 'undefined') return;
    const isKo = state.lang === 'ko';
    categoryFilters.innerHTML = ANDONG_DATA.categories.map(cat => {
      const label = isKo ? cat.ko : cat.en;
      const isActive = state.selectedCategory === cat.id ? 'active' : '';
      return `<button class="filter-btn ${isActive}" data-category="${cat.id}">${label}</button>`;
    }).join('');

    categoryFilters.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        state.selectedCategory = btn.dataset.category;
        renderCategoryButtons();
        renderPlaces();
      });
    });
  }

  // Render Places
  function renderPlaces() {
    if (!placesGrid || typeof ANDONG_DATA === 'undefined') return;
    const query = state.searchQuery.trim().toLowerCase();
    const isKo = state.lang === 'ko';

    const filtered = ANDONG_DATA.places.filter(place => {
      const matchCat = state.selectedCategory === 'all' || place.category === state.selectedCategory;
      const matchQuery = !query ||
        place.nameEn.toLowerCase().includes(query) ||
        place.nameKo.includes(query) ||
        place.taglineEn.toLowerCase().includes(query) ||
        place.taglineKo.includes(query) ||
        place.highlightsEn.some(h => h.toLowerCase().includes(query)) ||
        place.highlightsKo.some(h => h.includes(query));
      return matchCat && matchQuery;
    });

    if (filtered.length === 0) {
      const noMatchMsg = isKo
        ? `"${query}"에 해당하는 관광지를 찾을 수 없습니다.`
        : `No destinations found matching "${query}"`;
      const tipMsg = isKo
        ? '하회마을, 유네스코, 월영교, 서원 등의 검색어를 입력해 보세요.'
        : 'Try searching for "Hahoe", "UNESCO", "Bridge", "Temple", or clear your filter.';
      const resetLabel = isKo ? '전체 보기' : 'View All Highlights';

      placesGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem;">
          <p style="font-size: 1.2rem; font-weight: 700; color: var(--text-muted);">${noMatchMsg}</p>
          <p style="font-size: 0.9rem; color: var(--text-dim); margin-top: 0.5rem;">${tipMsg}</p>
          <button id="resetSearchBtn" class="btn-primary" style="display:inline-flex; width:auto; margin-top: 1rem;">${resetLabel}</button>
        </div>
      `;
      const resetBtn = document.getElementById('resetSearchBtn');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          state.searchQuery = '';
          state.selectedCategory = 'all';
          if (searchInput) searchInput.value = '';
          renderCategoryButtons();
          renderPlaces();
        });
      }
      return;
    }

    placesGrid.innerHTML = filtered.map(place => {
      const isSaved = state.savedPlaceIds.includes(place.id);
      const titleMain = isKo ? place.nameKo : place.nameEn;
      const titleSub = isKo ? place.nameEn : place.nameKo;
      const badge = isKo ? place.badgeKo : place.badgeEn;
      const tagline = isKo ? place.taglineKo : place.taglineEn;
      const reviews = isKo ? place.reviewsKo : place.reviewsEn;
      const highlights = isKo ? place.highlightsKo : place.highlightsEn;
      const detailBtnText = isKo ? '자세히 보기' : 'Explore';

      const displayImg = place.img;
      const fallbackSvg = (typeof generateLandmarkSVG === 'function' && generateLandmarkSVG(place.id)) || '';

      return `
        <article class="place-card" data-id="${place.id}">
          <div class="card-media">
            <img class="card-img" src="${displayImg}" alt="${titleMain}" loading="lazy" onerror="this.onerror=null; if('${fallbackSvg}') this.src='${fallbackSvg}';" />
            <span class="card-badge">${badge}</span>
            <button class="card-save-btn ${isSaved ? 'saved' : ''}" data-id="${place.id}" title="${isSaved ? 'Remove from My Trip' : 'Save to My Trip'}">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="${isSaved ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            </button>
          </div>
          <div class="card-body">
            <div class="card-names">
              <h3 class="card-title-en">${titleMain}</h3>
              <p class="card-title-ko">${titleSub}</p>
            </div>
            <p class="card-tagline">${tagline}</p>
            <div class="card-highlights">
              ${highlights.map(h => `<span class="pill-chip">${h}</span>`).join('')}
            </div>
            <div class="card-footer">
              <div class="card-rating">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                <span>${place.rating}</span>
                <span style="font-weight: normal; color: var(--text-dim); font-size: 0.78rem;">(${reviews})</span>
              </div>
              <button class="btn-card-detail" data-id="${place.id}">
                ${detailBtnText} <span>&rarr;</span>
              </button>
            </div>
          </div>
        </article>
      `;
    }).join('');

    // Attach card event listeners
    placesGrid.querySelectorAll('.btn-card-detail').forEach(btn => {
      btn.addEventListener('click', () => {
        const placeId = btn.dataset.id;
        openModal(placeId);
      });
    });

    placesGrid.querySelectorAll('.card-save-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const placeId = btn.dataset.id;
        toggleSavePlace(placeId);
      });
    });
  }

  // Render Foods
  function renderFoods() {
    if (!foodGrid || typeof ANDONG_DATA === 'undefined') return;
    const isKo = state.lang === 'ko';

    foodGrid.innerHTML = ANDONG_DATA.foods.map(food => {
      const titleMain = isKo ? food.nameKo : food.nameEn;
      const titleSub = isKo ? food.nameEn : food.nameKo;
      const spice = isKo ? food.spiceLevelKo : food.spiceLevelEn;
      const desc = isKo ? food.descKo : food.descEn;
      const price = isKo ? food.priceKo : food.priceEn;
      const place = isKo ? food.recommendedPlaceKo : food.recommendedPlaceEn;
      const allergen = isKo ? food.allergensKo : food.allergensEn;
      const tip = isKo ? food.foreignerTipKo : food.foreignerTipEn;

      return `
        <div class="food-card">
          ${food.img ? `<div class="food-media"><img class="food-img" src="${food.img}" alt="${titleMain}" loading="lazy" /></div>` : ''}
          <div class="food-body">
            <div class="food-top">
              <div>
                <h4 class="food-title-en">${titleMain}</h4>
                <p class="food-title-ko">${titleSub}</p>
              </div>
              <span class="food-spice-pill">${spice}</span>
            </div>
            <p class="food-desc">${desc}</p>
            <div class="food-meta-box">
              <div><strong>${isKo ? '가격' : 'Avg Price'}:</strong> ${price}</div>
              <div><strong>${isKo ? '추천 장소' : 'Top Spot'}:</strong> ${place}</div>
              <div><strong>${isKo ? '알레르기/식단' : 'Allergens/Notes'}:</strong> ${allergen}</div>
            </div>
            <div class="food-tip-foreigner">
              <span>💡</span>
              <span>${tip}</span>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  // Render Itineraries
  function renderItineraries() {
    if (!itineraryGrid || typeof ANDONG_DATA === 'undefined') return;
    const isKo = state.lang === 'ko';

    itineraryGrid.innerHTML = ANDONG_DATA.itineraries.map(itin => {
      const title = isKo ? itin.titleKo : itin.titleEn;
      const sub = isKo ? itin.subKo : itin.subEn;
      const duration = isKo ? itin.durationKo : itin.durationEn;
      const pace = isKo ? itin.paceKo : itin.paceEn;

      return `
        <div class="itinerary-card">
          <div class="itin-header">
            <h3 class="itin-title">${title}</h3>
            <p class="itin-sub">${sub}</p>
            <div class="itin-tags">
              <span class="pill-badge" style="margin-bottom:0;">⏱ ${duration}</span>
              <span class="pill-badge" style="margin-bottom:0; background:var(--pine-green-soft); color:var(--pine-green); border-color:transparent;">🚶 ${isKo ? '일정 템포' : 'Pace'}: ${pace}</span>
            </div>
          </div>
          <div class="timeline">
            ${itin.steps.map(step => {
              const stepTitle = isKo ? step.titleKo : step.titleEn;
              const stepDesc = isKo ? step.descKo : step.descEn;
              return `
                <div class="timeline-step">
                  <div class="timeline-dot"></div>
                  <div class="step-time">${step.time}</div>
                  <div class="step-title">${stepTitle}</div>
                  <div class="step-desc">${stepDesc}</div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      `;
    }).join('');
  }

  // Render Survival Phrases
  function renderPhrases() {
    if (!phraseGrid || typeof ANDONG_DATA === 'undefined') return;
    const isKo = state.lang === 'ko';

    phraseGrid.innerHTML = ANDONG_DATA.koreanPhrases.map(item => {
      const category = isKo ? item.categoryKo : item.categoryEn;
      const meaning = isKo ? item.meaningKo : item.meaningEn;
      const tip = isKo ? item.tipKo : item.tipEn;

      return `
        <div class="phrase-card notranslate" translate="no">
          <div>
            <div class="phrase-cat">${category}</div>
            
            <div class="phrase-field">
              <div class="phrase-field-label">${isKo ? '한국어 표현' : 'KOREAN (한글)'}</div>
              <div class="phrase-ko" translate="no">${item.phraseKo}</div>
            </div>

            <div class="phrase-roman-box notranslate" translate="no">
              <div class="phrase-field-label" style="color: var(--dancheong-red);">${isKo ? '소리나는 발음' : 'PRONUNCIATION'}</div>
              <div class="phrase-roman" translate="no">[ ${item.roman} ]</div>
            </div>

            <div class="phrase-field">
              <div class="phrase-field-label">${isKo ? '의미' : 'MEANING'}</div>
              <div class="phrase-meaning">${meaning}</div>
            </div>
          </div>

          <div class="phrase-footer">
            <div class="phrase-tip">💡 ${tip}</div>
            <button type="button" class="btn-speak" data-text="${item.phraseKo}" data-roman="${item.roman}" onclick="window.playPhraseAudio(this)" title="${isKo ? '원어민 발음 듣기' : 'Listen to Korean pronunciation'}">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/>
              </svg>
            </button>
          </div>
        </div>
      `;
    }).join('');
  }

  // Pre-load and cache Web Speech API voices for Mobile (iOS Safari / Android Chrome / Samsung Internet)
  let cachedVoices = [];
  function loadVoices() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        const voices = window.speechSynthesis.getVoices();
        if (voices && voices.length > 0) {
          cachedVoices = voices;
        }
      } catch (e) {
        // ignore
      }
    }
  }
  loadVoices();
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }

  function getBestKoreanVoice() {
    if (!cachedVoices || cachedVoices.length === 0) {
      loadVoices();
    }
    if (!cachedVoices || cachedVoices.length === 0) return null;

    // 1. Exact ko-KR or ko_KR match
    let koVoice = cachedVoices.find(v => v.lang && (v.lang.toLowerCase() === 'ko-kr' || v.lang.toLowerCase() === 'ko_kr'));
    // 2. Any lang starting with 'ko'
    if (!koVoice) {
      koVoice = cachedVoices.find(v => v.lang && v.lang.toLowerCase().startsWith('ko'));
    }
    // 3. Name contains Korean or 한국어
    if (!koVoice) {
      koVoice = cachedVoices.find(v => v.name && (v.name.toLowerCase().includes('korean') || v.name.includes('한국')));
    }
    return koVoice || null;
  }

  // Expose synchronous global handler so mobile user-gesture activation is never lost
  window.playPhraseAudio = function (btnElement) {
    if (!btnElement) return;
    const text = btnElement.getAttribute('data-text') || '';
    const roman = btnElement.getAttribute('data-roman') || '';
    playKoreanAudio(text, roman, btnElement);
  };

  // Synchronous Mobile-First Speech Synthesis Engine
  // IMPORTANT: Mobile browsers (iOS Safari, Android Chrome) require speechSynthesis.speak()
  // to be called synchronously inside the user tap event handler.
  function playKoreanAudio(text, roman, btnElement) {
    if (!text) return;
    const isKo = state.lang === 'ko';

    if (btnElement) {
      btnElement.classList.add('playing');
      setTimeout(() => btnElement.classList.remove('playing'), 1400);
    }

    // Glow the pronunciation box of the specific card
    const card = btnElement ? btnElement.closest('.phrase-card') : null;
    if (card) {
      const romanBox = card.querySelector('.phrase-roman-box');
      if (romanBox) {
        romanBox.classList.add('glow-pulse');
        setTimeout(() => romanBox.classList.remove('glow-pulse'), 1800);
      }
    }

    if (typeof window !== 'undefined' && 'speechSynthesis' in window && typeof SpeechSynthesisUtterance !== 'undefined') {
      try {
        const synth = window.speechSynthesis;

        // Wake up paused synth on iOS/Android
        if (synth.paused && synth.resume) {
          synth.resume();
        }

        const speakNow = () => {
          const utterance = new SpeechSynthesisUtterance(text);
          utterance.lang = 'ko-KR';
          utterance.rate = 0.88;
          utterance.pitch = 1.0;
          utterance.volume = 1.0;

          const koVoice = getBestKoreanVoice();
          if (koVoice) {
            utterance.voice = koVoice;
          }

          utterance.onerror = function () {
            showToast(
              isKo
                ? `🔇 기기에서 한국어 음성을 재생할 수 없습니다. [ ${roman || text} ]`
                : `🔇 Korean voice unavailable on this viewer. Read: [ ${roman || text} ]`
            );
          };

          synth.speak(utterance);
        };

        // Android Chrome bug: calling synth.cancel() immediately before synth.speak()
        // cancels the new utterance too. Only cancel if currently speaking!
        if (synth.speaking || synth.pending) {
          synth.cancel();
          setTimeout(speakNow, 45);
        } else {
          speakNow();
        }

        showToast(
          isKo
            ? `🔊 "${text}" 발음 재생 중 (소리가 안 나면 미디어 음량/무음모드를 확인하세요)`
            : `🔊 Playing "${text}" [${roman}] (Check media volume / mute switch)`
        );
        return;
      } catch (e) {
        console.warn('SpeechSynthesis error:', e);
      }
    }

    // Fallback when opened in an in-app browser without Web Speech API support
    showToast(
      isKo
        ? `🗣️ 현재 앱 내장 브라우저에서는 음성이 제한됩니다. 크롬/사파리에서 열거나 [${roman || text}] 발음을 참고하세요.`
        : `🗣️ Audio not supported in this in-app viewer. Open in Chrome/Safari or read: [${roman || text}]`
    );
  }

  // Render Transport
  function renderTransport() {
    if (!transportGrid || typeof ANDONG_DATA === 'undefined') return;
    const isKo = state.lang === 'ko';

    transportGrid.innerHTML = ANDONG_DATA.transportGuide.map(item => {
      const mode = isKo ? item.modeKo : item.modeEn;
      const from = isKo ? item.fromKo : item.fromEn;
      const time = isKo ? item.timeKo : item.timeEn;
      const price = isKo ? item.priceKo : item.priceEn;
      const info = isKo ? item.infoKo : item.infoEn;

      return `
        <div class="transport-card">
          <div class="transport-mode">
            <span>🚆</span> ${mode}
          </div>
          <div class="transport-route">${from}</div>
          <p class="transport-detail">${info}</p>
          <div class="transport-pill-row">
            <span class="pill-chip">⏱ ${time}</span>
            <span class="pill-chip">💳 ${price}</span>
          </div>
        </div>
      `;
    }).join('');
  }

  // Save / Bookmark Place Handling
  function toggleSavePlace(placeId) {
    const idx = state.savedPlaceIds.indexOf(placeId);
    if (idx >= 0) {
      state.savedPlaceIds.splice(idx, 1);
    } else {
      state.savedPlaceIds.push(placeId);
    }
    safeStorage.set('andong_saved_places', JSON.stringify(state.savedPlaceIds));
    updateSavedBadge();
    renderPlaces();
    renderTripDrawer();

    if (state.selectedPlaceForModal && state.selectedPlaceForModal.id === placeId) {
      updateModalSaveButton();
    }
  }

  function updateSavedBadge() {
    const count = state.savedPlaceIds.length;
    if (tripBadgeCount) {
      tripBadgeCount.textContent = count;
      tripBadgeCount.style.display = count > 0 ? 'flex' : 'none';
    }
  }

  function renderTripDrawer() {
    if (!tripListContainer || typeof ANDONG_DATA === 'undefined') return;
    const isKo = state.lang === 'ko';

    if (state.savedPlaceIds.length === 0) {
      tripListContainer.innerHTML = `
        <div class="empty-trip-state">
          <p style="font-size: 2rem; margin-bottom: 0.5rem;">🎒</p>
          <p style="font-weight: 700; margin-bottom: 0.25rem;">${isKo ? '저장된 여행지가 없습니다' : 'Your trip planner is empty'}</p>
          <p style="font-size: 0.85rem;">${isKo ? '명소 카드의 하트(♡) 버튼을 눌러 나만의 일정에 추가해 보세요.' : 'Click the heart icon on any attraction card to add it to your personalized itinerary.'}</p>
        </div>
      `;
      return;
    }

    const savedPlaces = ANDONG_DATA.places.filter(p => state.savedPlaceIds.includes(p.id));
    tripListContainer.innerHTML = savedPlaces.map((place, i) => {
      const nameMain = isKo ? place.nameKo : place.nameEn;
      const nameSub = isKo ? place.nameEn : place.nameKo;

      return `
        <div class="trip-item-card">
          <span style="font-size: 0.8rem; font-weight: 800; color: var(--dancheong-red);">${i + 1}</span>
          <div class="trip-item-info">
            <div class="trip-item-name">${nameMain}</div>
            <div class="trip-item-sub">${nameSub}</div>
          </div>
          <button class="trip-item-remove" data-id="${place.id}" title="${isKo ? '삭제' : 'Remove item'}">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
      `;
    }).join('');

    tripListContainer.querySelectorAll('.trip-item-remove').forEach(btn => {
      btn.addEventListener('click', () => {
        toggleSavePlace(btn.dataset.id);
      });
    });
  }

  // Modal Functions
  function openModal(placeId) {
    if (typeof ANDONG_DATA === 'undefined') return;
    const place = ANDONG_DATA.places.find(p => p.id === placeId);
    if (!place) return;
    state.selectedPlaceForModal = place;
    const isKo = state.lang === 'ko';

    if (modalImg) {
      const fallbackSvg = (typeof generateLandmarkSVG === 'function' && generateLandmarkSVG(place.id)) || '';
      modalImg.src = place.img;
      modalImg.onerror = function () {
        this.onerror = null;
        if (fallbackSvg) this.src = fallbackSvg;
      };
      modalImg.alt = isKo ? place.nameKo : place.nameEn;
    }
    if (modalBadge) modalBadge.textContent = isKo ? place.badgeKo : place.badgeEn;
    if (modalTitleEn) modalTitleEn.textContent = isKo ? place.nameKo : place.nameEn;
    if (modalTitleKo) modalTitleKo.textContent = isKo ? place.nameEn : place.nameKo;
    if (modalDesc) modalDesc.textContent = isKo ? place.descKo : place.descEn;
    if (modalAddress) modalAddress.textContent = place.addressKo;
    if (modalHours) modalHours.textContent = isKo ? place.hoursKo : place.hoursEn;
    if (modalAdmission) modalAdmission.textContent = isKo ? place.admissionKo : place.admissionEn;
    if (modalTransport) modalTransport.textContent = isKo ? place.transportKo : place.transportEn;

    const tips = isKo ? place.tipsKo : place.tipsEn;
    if (modalTipsList) {
      modalTipsList.innerHTML = tips.map(tip => `<li>${tip}</li>`).join('');
    }
    if (modalGoogleMapBtn) {
      modalGoogleMapBtn.href = `https://www.google.com/maps/search/?api=1&query=${place.mapQuery}`;
    }

    updateModalSaveButton();

    if (placeModal) {
      placeModal.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeModal() {
    if (placeModal) {
      placeModal.classList.remove('open');
      document.body.style.overflow = '';
    }
    state.selectedPlaceForModal = null;
  }

  function updateModalSaveButton() {
    if (!state.selectedPlaceForModal || !modalSaveBtn) return;
    const isSaved = state.savedPlaceIds.includes(state.selectedPlaceForModal.id);
    const isKo = state.lang === 'ko';

    if (isSaved) {
      modalSaveBtn.textContent = isKo ? '♥ 내 여행 일정에 담김' : '♥ Saved in My Trip';
      modalSaveBtn.style.color = 'var(--dancheong-red)';
    } else {
      modalSaveBtn.textContent = isKo ? '♡ 내 여행 일정에 담기' : '♡ Add to My Trip';
      modalSaveBtn.style.color = 'inherit';
    }
  }

  // Currency Converter Setup
  function setupCurrencyConverter() {
    if (!krwInput || !currencySelect || !foreignVal) return;

    function recalculate() {
      const val = parseFloat(krwInput.value) || 0;
      const curr = currencySelect.value;
      const rate = state.exchangeRates[curr] || 0.00073;
      const converted = (val * rate).toFixed(2);
      foreignVal.value = `${converted} ${curr}`;
    }

    krwInput.addEventListener('input', recalculate);
    currencySelect.addEventListener('change', recalculate);
    recalculate();
  }

  // Event Listeners
  function bindEvents() {
    // Search
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        state.searchQuery = e.target.value;
        renderPlaces();
      });
    }

    if (searchBtn) {
      searchBtn.addEventListener('click', () => {
        renderPlaces();
      });
    }

    // Theme toggle
    if (themeToggleBtn) {
      themeToggleBtn.addEventListener('click', () => {
        const nextTheme = state.theme === 'dark' ? 'light' : 'dark';
        applyTheme(nextTheme);
      });
    }

    // Language Toggle Button (Header)
    if (langToggleBtn) {
      langToggleBtn.addEventListener('click', function (e) {
        e.preventDefault();
        window.toggleLanguage();
      });
    }

    // Segmented language switch buttons if present
    document.querySelectorAll('.lang-btn-option').forEach(btn => {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        const targetLang = btn.getAttribute('data-lang');
        window.setLanguageTo(targetLang);
      });
    });

    // Drawer Open/Close
    if (tripDrawerOpenBtn) {
      tripDrawerOpenBtn.addEventListener('click', () => {
        tripDrawer.classList.add('open');
      });
    }

    if (tripDrawerCloseBtn) {
      tripDrawerCloseBtn.addEventListener('click', () => {
        tripDrawer.classList.remove('open');
      });
    }

    // Clear Trip
    if (clearTripBtn) {
      clearTripBtn.addEventListener('click', () => {
        const msg = state.lang === 'ko'
          ? '일정에 담긴 모든 관광지를 삭제하시겠습니까?'
          : 'Clear all saved destinations from your itinerary?';
        if (confirm(msg)) {
          state.savedPlaceIds = [];
          safeStorage.remove('andong_saved_places');
          updateSavedBadge();
          renderPlaces();
          renderTripDrawer();
        }
      });
    }

    // Share / Copy Trip Text
    if (shareTripBtn) {
      shareTripBtn.addEventListener('click', () => {
        const isKo = state.lang === 'ko';
        if (state.savedPlaceIds.length === 0) {
          alert(isKo ? '먼저 가고 싶은 장소를 일정에 담아주세요!' : 'Add some places first to export your trip!');
          return;
        }
        const savedPlaces = ANDONG_DATA.places.filter(p => state.savedPlaceIds.includes(p.id));
        const tripSummary = savedPlaces.map((p, i) => `${i + 1}. ${p.nameEn} (${p.nameKo})\n   📍 Address: ${p.addressKo}`).join('\n\n');
        const textToCopy = `[My Andong Trip Itinerary]\n\n${tripSummary}\n\n📞 Tourist Helpline: 1330`;
        navigator.clipboard.writeText(textToCopy).then(() => {
          alert(isKo
            ? '안동 여행 일정이 클립보드에 복사되었습니다! 메모장이나 택시 기사님께 보여주세요.'
            : 'Copied your custom Andong trip itinerary to clipboard! You can paste and save it or show it to taxi drivers.');
        }).catch(() => {
          prompt('Copy your itinerary below:', textToCopy);
        });
      });
    }

    // Modal Close
    if (modalCloseBtn) {
      modalCloseBtn.addEventListener('click', closeModal);
    }

    if (placeModal) {
      placeModal.addEventListener('click', (e) => {
        if (e.target === placeModal) {
          closeModal();
        }
      });
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && placeModal && placeModal.classList.contains('open')) {
        closeModal();
      }
    });

    // Copy Address Button
    if (modalCopyAddressBtn) {
      modalCopyAddressBtn.addEventListener('click', () => {
        if (state.selectedPlaceForModal) {
          const isKo = state.lang === 'ko';
          navigator.clipboard.writeText(state.selectedPlaceForModal.addressKo).then(() => {
            const originalText = modalCopyAddressBtn.textContent;
            modalCopyAddressBtn.textContent = isKo ? '복사 완료!' : 'Copied!';
            setTimeout(() => {
              modalCopyAddressBtn.textContent = originalText;
            }, 1800);
          });
        }
      });
    }

    // Modal Save Button
    if (modalSaveBtn) {
      modalSaveBtn.addEventListener('click', () => {
        if (state.selectedPlaceForModal) {
          toggleSavePlace(state.selectedPlaceForModal.id);
        }
      });
    }
  }

  // Initialize
  function init() {
    applyTheme(state.theme);
    setLanguage(state.lang);
    updateSavedBadge();
    setupCurrencyConverter();
    bindEvents();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
