/**
 * MHS Darul Habeeb Daily Calendar - Main Application Controller
 */

// Daily Insights Presets (Authentic Hadiths with Malayalam Translations)
const DAILY_INSIGHTS_PRESETS = [
  {
    ar: 'قال رسول الله ﷺ : خَيْرُكُمْ خَيْرُكُمْ لِأَهْلِهِ وَأَنَا خَيْرُكُمْ لِأَهْلِي',
    ml: 'നിങ്ങളില്‍ ഏറ്റവും ഉത്തമന്‍ തന്റെ കുടുംബത്തോട് നന്നായി പെരുമാറുന്നവനാണ്. ഞാന്‍ എന്റെ കുടുംബത്തോട് ഏറ്റവും നന്നായി പെരുമാറുന്നവനുമാണ്.'
  },
  {
    ar: 'قال رسول الله ﷺ : طَلَبُ الْعِلْمِ فَرِيضَةٌ عَلَى كُلِّ مُسْلِمٍ',
    ml: 'വിജ്ഞാനം കരസ്ഥമാക്കുക എന്നത് ഓരോ മുസ്ലിമിനും നിർബന്ധ ബാധ്യതയാണ്.'
  },
  {
    ar: 'قال رسول الله ﷺ : مَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الآخِرِ فَلْيَقُلْ خَيْرًا أَوْ لِيَصْمُتْ',
    ml: 'അല്ലാഹുവിലും അന്ത്യദിനത്തിലും വിശ്വസിക്കുന്നവൻ നല്ലത് പറയട്ടെ, അല്ലെങ്കിൽ മിണ്ടാതിരിക്കട്ടെ.'
  },
  {
    ar: 'قال رسول الله ﷺ : لاَ تَحْقِرَنَّ مِنَ الْمَعْرُوفِ شَيْئًا وَلَوْ أَنْ تَلْقَى أَخَاكَ بِوَجْهٍ طَلْقٍ',
    ml: 'സഹോദരനെ പുഞ്ചിരിയോടെ അഭിമുഖീകരിക്കുന്നതായാലും നന്മകളിൽ യാതൊന്നിനെയും നീ നിസ്സാരമായി കാണരുത്.'
  },
  {
    ar: 'قال رسول الله ﷺ : الْمُسْلِمُ أَخُو الْمُسْلِمِ لاَ يَظْلِمُهُ وَلاَ يُسْلِمُهُ',
    ml: 'ഒരു മുസ്ലിം മറ്റൊരു മുസ്ലിമിന്റെ സഹോദരനാണ്; അവൻ അവനെ അക്രമിക്കുകയോ കൈവെടിയുകയോ ഇല്ല.'
  },
  {
    ar: 'قال رسول الله ﷺ : مَنْ سَلَكَ طَرِيقًا يَلْتَمِسُ فِيهِ عِلْمًا سَهَّلَ اللَّهُ لَهُ بِهِ طَرِيقًا إِلَى الْجَنَّةِ',
    ml: 'ആരെങ്കിലും അറിവ് തേടി ഒരു വഴിയിലൂടെ സഞ്ചരിച്ചാൽ അല്ലാഹു അവന് സ്വർഗ്ഗത്തിലേക്കുള്ള പാത എളുപ്പമാക്കിക്കൊടുക്കും.'
  },
  {
    ar: 'قال رسول الله ﷺ : إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى',
    ml: 'പ്രവർത്തനങ്ങൾ സ്വീകരിക്കപ്പെടുന്നത് നിയ്യത്തുകളെ അടിസ്ഥാനമാക്കിയാണ്; ഓരോ വ്യക്തിക്കും അവൻ കരുതിയതേ ലഭിക്കുകയുള്ളൂ.'
  }
];

// Application State
const AppState = {
  currentDate: new Date(),
  hijriOffset: 0,
  zoom: 1.0,

  // Poster fields
  dayEn: 'Friday',
  dayMl: 'വെള്ളി',
  dayAr: 'يوم الجمعة',

  gregDay: '25',
  gregMonth: 'September',
  gregYear: '2026',

  mlDay: '09',
  mlMonth: 'കന്നി',
  mlYear: '1202',

  hijriDay: '14',
  hijriMonth: 'ربيع الاخر',
  hijriYear: '1448',

  insightsArabic: DAILY_INSIGHTS_PRESETS[0].ar,
  insightsMalayalam: DAILY_INSIGHTS_PRESETS[0].ml,
  insightsArSize: 24,
  insightsArWeight: 700,
  insightsArColor: '#0e2a47',
  insightsArFont: "'Amiri', serif",
  insightsArAlign: 'center',

  insightsMlSize: 17,
  insightsMlWeight: 600,
  insightsMlColor: '#0d4671',
  insightsMlFont: "'Noto Sans Malayalam', sans-serif",
  insightsMlAlign: 'center',

  // Prayer Times (Kasaragod)
  timeIsha: '07:38',
  timeMaghrib: '06:27',
  timeAsr: '03:43',
  timeDhuhr: '12:25',
  timeThulu: '06:19',
  timeSubah: '05:01',

  footerTitle: 'MISBAHUL HUDA STUDENTS UNION',
  footerSub: 'Darul habeeb campus, Periyadukka'
};

document.addEventListener('DOMContentLoaded', () => {
  initApp();
});

function initApp() {
  renderPresetsList();
  setupEventListeners();
  autoScalePoster();
  window.addEventListener('resize', autoScalePoster);

  // Initialize with today's real present date
  applyDate(new Date());

  // Also check if local storage has any saved preferences
  loadSavedCustomizations();
}

/**
 * Apply full date calculations to state and UI
 */
function applyDate(date, preserveInsights = true) {
  AppState.currentDate = new Date(date);

  // 1. Day of Week
  const dayData = CalendarCalc.getDayData(AppState.currentDate);
  AppState.dayEn = dayData.en;
  AppState.dayMl = dayData.ml;
  AppState.dayAr = dayData.ar;

  // 2. Gregorian
  const gregData = CalendarCalc.getGregorianData(AppState.currentDate);
  AppState.gregDay = gregData.day;
  AppState.gregMonth = gregData.month;
  AppState.gregYear = gregData.year;

  // 3. Malayalam (Kolla Varsham)
  const mlData = CalendarCalc.getMalayalamData(AppState.currentDate);
  AppState.mlDay = mlData.day;
  AppState.mlMonth = mlData.month;
  AppState.mlYear = mlData.year;

  // 4. Hijri
  const hijriData = CalendarCalc.getHijriData(AppState.currentDate, AppState.hijriOffset);
  AppState.hijriDay = hijriData.day;
  AppState.hijriMonth = hijriData.month;
  AppState.hijriYear = hijriData.year;

  // 5. Kasaragod Prayer Times
  const pt = CalendarCalc.getKasaragodPrayerTimes(AppState.currentDate);
  AppState.timeSubah = pt.subah;
  AppState.timeThulu = pt.thulu;
  AppState.timeDhuhr = pt.dhuhr;
  AppState.timeAsr = pt.asr;
  AppState.timeMaghrib = pt.maghrib;
  AppState.timeIsha = pt.isha;

  syncStateToInputs();
  syncStateToPoster();
}

/**
 * Sync AppState to Form Inputs
 */
function syncStateToInputs() {
  // Date Picker
  const yyyy = AppState.currentDate.getFullYear();
  const mm = String(AppState.currentDate.getMonth() + 1).padStart(2, '0');
  const dd = String(AppState.currentDate.getDate()).padStart(2, '0');
  const dateInput = document.getElementById('input-picker-date');
  if (dateInput) dateInput.value = `${yyyy}-${mm}-${dd}`;

  // Day Inputs
  setVal('input-day-en', AppState.dayEn);
  setVal('input-day-ml', AppState.dayMl);
  setVal('input-day-ar', AppState.dayAr);

  // Gregorian
  setVal('input-greg-day', AppState.gregDay);
  setVal('input-greg-month', AppState.gregMonth);
  setVal('input-greg-year', AppState.gregYear);

  // Malayalam
  setVal('input-ml-day', AppState.mlDay);
  setVal('input-ml-month', AppState.mlMonth);
  setVal('input-ml-year', AppState.mlYear);

  // Hijri
  setVal('input-hijri-day', AppState.hijriDay);
  setVal('input-hijri-month', AppState.hijriMonth);
  setVal('input-hijri-year', AppState.hijriYear);

  // Daily Insights
  setVal('input-insights-ar', AppState.insightsArabic);
  setVal('input-insights-ml', AppState.insightsMalayalam);
  setVal('input-ar-color', AppState.insightsArColor);
  setVal('input-ml-color', AppState.insightsMlColor);
  setVal('input-ar-size', AppState.insightsArSize);
  setVal('input-ml-size', AppState.insightsMlSize);
  document.getElementById('val-ar-size').textContent = `${AppState.insightsArSize}px`;
  document.getElementById('val-ml-size').textContent = `${AppState.insightsMlSize}px`;

  // Prayer Times
  setVal('input-time-subah', AppState.timeSubah);
  setVal('input-time-thulu', AppState.timeThulu);
  setVal('input-time-dhuhr', AppState.timeDhuhr);
  setVal('input-time-asr', AppState.timeAsr);
  setVal('input-time-maghrib', AppState.timeMaghrib);
  setVal('input-time-isha', AppState.timeIsha);

  // Footer
  setVal('input-footer-title', AppState.footerTitle);
  setVal('input-footer-sub', AppState.footerSub);
}

/**
 * Sync AppState to Visual Poster DOM Elements
 */
function syncStateToPoster() {
  // Day Banner
  setText('poster-day-en', AppState.dayEn);
  setText('poster-day-ml', AppState.dayMl);
  setText('poster-day-ar', AppState.dayAr);

  // Gregorian Card
  setText('poster-greg-day', AppState.gregDay);
  setText('poster-greg-month', AppState.gregMonth);
  setText('poster-greg-year', AppState.gregYear);

  // Malayalam Card
  setText('poster-ml-day', AppState.mlDay);
  setText('poster-ml-month', AppState.mlMonth);
  setText('poster-ml-year', AppState.mlYear);

  // Hijri Card
  setText('poster-hijri-day', AppState.hijriDay);
  setText('poster-hijri-month', AppState.hijriMonth);
  setText('poster-hijri-year', AppState.hijriYear);

  // Daily Insights
  setText('poster-insights-ar', AppState.insightsArabic);
  setText('poster-insights-ml', AppState.insightsMalayalam);

  // Apply CSS Variables for dynamic styling
  const poster = document.getElementById('calendar-poster');
  if (poster) {
    poster.style.setProperty('--insights-ar-size', `${AppState.insightsArSize}px`);
    poster.style.setProperty('--insights-ar-weight', AppState.insightsArWeight);
    poster.style.setProperty('--insights-ar-color', AppState.insightsArColor);
    poster.style.setProperty('--insights-ar-font', AppState.insightsArFont);
    poster.style.setProperty('--insights-ar-align', AppState.insightsArAlign);

    poster.style.setProperty('--insights-ml-size', `${AppState.insightsMlSize}px`);
    poster.style.setProperty('--insights-ml-weight', AppState.insightsMlWeight);
    poster.style.setProperty('--insights-ml-color', AppState.insightsMlColor);
    poster.style.setProperty('--insights-ml-font', AppState.insightsMlFont);
    poster.style.setProperty('--insights-ml-align', AppState.insightsMlAlign);
  }

  // Prayer Times (Order matching image: Isha, Maghrib, Asr, Dhuhr, Thulu, Subah)
  setText('poster-time-isha', AppState.timeIsha);
  setText('poster-time-maghrib', AppState.timeMaghrib);
  setText('poster-time-asr', AppState.timeAsr);
  setText('poster-time-dhuhr', AppState.timeDhuhr);
  setText('poster-time-thulu', AppState.timeThulu);
  setText('poster-time-subah', AppState.timeSubah);

  // Footer
  setText('poster-footer-title', AppState.footerTitle);
  setText('poster-footer-sub', AppState.footerSub);
}

/**
 * Setup Event Listeners for UI interaction
 */
function setupEventListeners() {
  // Tabs switching
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      const tabId = btn.getAttribute('data-tab');
      const pane = document.getElementById(tabId);
      if (pane) pane.classList.add('active');
    });
  });

  // Date Picker
  const datePicker = document.getElementById('input-picker-date');
  if (datePicker) {
    datePicker.addEventListener('change', (e) => {
      if (e.target.value) {
        const parts = e.target.value.split('-');
        const chosen = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
        applyDate(chosen);
        showToast('Date updated to ' + e.target.value);
      }
    });
  }

  // Today Reset Button
  const btnToday = document.getElementById('btn-today');
  if (btnToday) {
    btnToday.addEventListener('click', () => {
      AppState.hijriOffset = 0;
      applyDate(new Date());
      showToast('Reset to today\'s date');
    });
  }

  // Hijri Offset Buttons (-1, +1, 0)
  document.querySelectorAll('[data-hijri-offset]').forEach(btn => {
    btn.addEventListener('click', () => {
      const delta = parseInt(btn.getAttribute('data-hijri-offset'), 10);
      AppState.hijriOffset += delta;
      const hData = CalendarCalc.getHijriData(AppState.currentDate, AppState.hijriOffset);
      AppState.hijriDay = hData.day;
      AppState.hijriMonth = hData.month;
      AppState.hijriYear = hData.year;
      syncStateToInputs();
      syncStateToPoster();
      showToast(`Hijri adjusted (${AppState.hijriOffset >= 0 ? '+' : ''}${AppState.hijriOffset} day)`);
    });
  });

  // Recalculate Kasaragod Prayer Times
  const btnRecalcPrayer = document.getElementById('btn-recalc-prayer');
  if (btnRecalcPrayer) {
    btnRecalcPrayer.addEventListener('click', () => {
      const pt = CalendarCalc.getKasaragodPrayerTimes(AppState.currentDate);
      AppState.timeSubah = pt.subah;
      AppState.timeThulu = pt.thulu;
      AppState.timeDhuhr = pt.dhuhr;
      AppState.timeAsr = pt.asr;
      AppState.timeMaghrib = pt.maghrib;
      AppState.timeIsha = pt.isha;
      syncStateToInputs();
      syncStateToPoster();
      showToast('Kasaragod prayer times recalculated');
    });
  }

  // Real-time Text Input Bindings
  bindInput('input-day-en', val => { AppState.dayEn = val; syncStateToPoster(); });
  bindInput('input-day-ml', val => { AppState.dayMl = val; syncStateToPoster(); });
  bindInput('input-day-ar', val => { AppState.dayAr = val; syncStateToPoster(); });

  bindInput('input-greg-day', val => { AppState.gregDay = val; syncStateToPoster(); });
  bindInput('input-greg-month', val => { AppState.gregMonth = val; syncStateToPoster(); });
  bindInput('input-greg-year', val => { AppState.gregYear = val; syncStateToPoster(); });

  bindInput('input-ml-day', val => { AppState.mlDay = val; syncStateToPoster(); });
  bindInput('input-ml-month', val => { AppState.mlMonth = val; syncStateToPoster(); });
  bindInput('input-ml-year', val => { AppState.mlYear = val; syncStateToPoster(); });

  bindInput('input-hijri-day', val => { AppState.hijriDay = val; syncStateToPoster(); });
  bindInput('input-hijri-month', val => { AppState.hijriMonth = val; syncStateToPoster(); });
  bindInput('input-hijri-year', val => { AppState.hijriYear = val; syncStateToPoster(); });

  // Daily Insights Inputs
  bindInput('input-insights-ar', val => { AppState.insightsArabic = val; syncStateToPoster(); });
  bindInput('input-insights-ml', val => { AppState.insightsMalayalam = val; syncStateToPoster(); });

  // Arabic Styling
  bindInput('input-ar-color', val => { AppState.insightsArColor = val; syncStateToPoster(); });
  bindInput('input-ar-size', val => {
    AppState.insightsArSize = parseInt(val, 10);
    document.getElementById('val-ar-size').textContent = `${val}px`;
    syncStateToPoster();
  });
  bindInput('select-ar-font', val => { AppState.insightsArFont = val; syncStateToPoster(); });

  // Malayalam Styling
  bindInput('input-ml-color', val => { AppState.insightsMlColor = val; syncStateToPoster(); });
  bindInput('input-ml-size', val => {
    AppState.insightsMlSize = parseInt(val, 10);
    document.getElementById('val-ml-size').textContent = `${val}px`;
    syncStateToPoster();
  });
  bindInput('select-ml-font', val => { AppState.insightsMlFont = val; syncStateToPoster(); });

  // Boldness buttons for Arabic
  document.querySelectorAll('[data-ar-bold]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-ar-bold]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      AppState.insightsArWeight = btn.getAttribute('data-ar-bold');
      syncStateToPoster();
    });
  });

  // Boldness buttons for Malayalam
  document.querySelectorAll('[data-ml-bold]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-ml-bold]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      AppState.insightsMlWeight = btn.getAttribute('data-ml-bold');
      syncStateToPoster();
    });
  });

  // Alignment buttons for Arabic
  document.querySelectorAll('[data-ar-align]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-ar-align]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      AppState.insightsArAlign = btn.getAttribute('data-ar-align');
      syncStateToPoster();
    });
  });

  // Alignment buttons for Malayalam
  document.querySelectorAll('[data-ml-align]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-ml-align]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      AppState.insightsMlAlign = btn.getAttribute('data-ml-align');
      syncStateToPoster();
    });
  });

  // Prayer Times inputs
  bindInput('input-time-subah', val => { AppState.timeSubah = val; syncStateToPoster(); });
  bindInput('input-time-thulu', val => { AppState.timeThulu = val; syncStateToPoster(); });
  bindInput('input-time-dhuhr', val => { AppState.timeDhuhr = val; syncStateToPoster(); });
  bindInput('input-time-asr', val => { AppState.timeAsr = val; syncStateToPoster(); });
  bindInput('input-time-maghrib', val => { AppState.timeMaghrib = val; syncStateToPoster(); });
  bindInput('input-time-isha', val => { AppState.timeIsha = val; syncStateToPoster(); });

  // Footer inputs
  bindInput('input-footer-title', val => { AppState.footerTitle = val; syncStateToPoster(); });
  bindInput('input-footer-sub', val => { AppState.footerSub = val; syncStateToPoster(); });

  // Zoom controls
  const btnZoomIn = document.getElementById('btn-zoom-in');
  const btnZoomOut = document.getElementById('btn-zoom-out');
  const btnZoomReset = document.getElementById('btn-zoom-reset');

  if (btnZoomIn) btnZoomIn.addEventListener('click', () => adjustZoom(0.08));
  if (btnZoomOut) btnZoomOut.addEventListener('click', () => adjustZoom(-0.08));
  if (btnZoomReset) btnZoomReset.addEventListener('click', () => autoScalePoster());

  // Download Poster Image (High Resolution)
  const btnDownloadList = document.querySelectorAll('.btn-download-trigger');
  btnDownloadList.forEach(btn => {
    btn.addEventListener('click', exportPosterImage);
  });

  // Share Poster Button (Mobile)
  const btnShare = document.getElementById('btn-share');
  if (btnShare) {
    btnShare.addEventListener('click', sharePosterImage);
  }
}

/**
 * Render presets for Daily Insights
 */
function renderPresetsList() {
  const container = document.getElementById('preset-list-container');
  if (!container) return;

  container.innerHTML = '';
  DAILY_INSIGHTS_PRESETS.forEach((preset, index) => {
    const card = document.createElement('div');
    card.className = 'preset-card';
    card.innerHTML = `
      <div class="preset-ar">${preset.ar}</div>
      <div class="preset-ml">${preset.ml}</div>
    `;
    card.addEventListener('click', () => {
      AppState.insightsArabic = preset.ar;
      AppState.insightsMalayalam = preset.ml;
      setVal('input-insights-ar', preset.ar);
      setVal('input-insights-ml', preset.ml);
      syncStateToPoster();
      showToast(`Inserted Preset #${index + 1}`);
    });
    container.appendChild(card);
  });
}

/**
 * High-Resolution Poster Image Generation and Download
 */
async function exportPosterImage() {
  const poster = document.getElementById('calendar-poster');
  const wrapper = document.getElementById('poster-scale-wrapper');
  if (!poster) return;

  showToast('Generating high-resolution poster image...', 'info');

  try {
    // Save previous transform to restore after export
    const prevTransform = wrapper.style.transform;
    wrapper.style.transform = 'none';

    // Wait for any pending fonts or layouts
    await document.fonts.ready;

    // Use html2canvas with scale 2.5 for crisp HD poster
    const canvas = await html2canvas(poster, {
      scale: 2.5,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#fcfbf7',
      logging: false,
      scrollX: 0,
      scrollY: 0
    });

    // Restore wrapper scale
    wrapper.style.transform = prevTransform;

    // Filename: Darul-Habeeb-Calendar-YYYY-MM-DD.png
    const yyyy = AppState.currentDate.getFullYear();
    const mm = String(AppState.currentDate.getMonth() + 1).padStart(2, '0');
    const dd = String(AppState.currentDate.getDate()).padStart(2, '0');
    const filename = `Darul-Habeeb-Calendar-${yyyy}-${mm}-${dd}.png`;

    // Download file
    const link = document.createElement('a');
    link.download = filename;
    link.href = canvas.toDataURL('image/png');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast('Poster downloaded successfully!', 'success');
  } catch (err) {
    console.error('Error generating poster image:', err);
    showToast('Download error. Please try again.', 'error');
  }
}

/**
 * Share via Web Share API
 */
async function sharePosterImage() {
  const poster = document.getElementById('calendar-poster');
  const wrapper = document.getElementById('poster-scale-wrapper');
  if (!poster) return;

  if (!navigator.canShare) {
    // Fallback to direct download
    exportPosterImage();
    return;
  }

  showToast('Preparing image for sharing...', 'info');

  try {
    const prevTransform = wrapper.style.transform;
    wrapper.style.transform = 'none';
    await document.fonts.ready;

    const canvas = await html2canvas(poster, {
      scale: 2.0,
      useCORS: true,
      backgroundColor: '#fcfbf7',
      logging: false
    });

    wrapper.style.transform = prevTransform;

    canvas.toBlob(async (blob) => {
      const file = new File([blob], 'darul-habeeb-calendar.png', { type: 'image/png' });
      if (navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: "Today's Calendar - Darul Habeeb",
          text: `Today's Calendar (${AppState.dayEn}, ${AppState.gregDay} ${AppState.gregMonth} ${AppState.gregYear})`
        });
        showToast('Shared successfully!', 'success');
      } else {
        exportPosterImage();
      }
    }, 'image/png');
  } catch (e) {
    console.warn('Share canceled or not supported:', e);
  }
}

/**
 * Responsive Auto-Scaling of Poster Preview
 */
function autoScalePoster() {
  const pane = document.querySelector('.preview-pane');
  const wrapper = document.getElementById('poster-scale-wrapper');
  if (!pane || !wrapper) return;

  const paneWidth = pane.clientWidth - 40;
  const paneHeight = pane.clientHeight - 80;

  // Poster base dimensions
  const posterW = 800;
  const posterH = 1024;

  const scaleX = paneWidth / posterW;
  const scaleY = paneHeight / posterH;
  let targetScale = Math.min(scaleX, scaleY, 0.82);

  if (targetScale < 0.25) targetScale = 0.25;

  AppState.zoom = Math.round(targetScale * 100) / 100;
  wrapper.style.transform = `scale(${AppState.zoom})`;

  const zoomText = document.getElementById('val-zoom');
  if (zoomText) zoomText.textContent = `${Math.round(AppState.zoom * 100)}%`;
}

function adjustZoom(delta) {
  AppState.zoom = Math.max(0.3, Math.min(1.5, AppState.zoom + delta));
  const wrapper = document.getElementById('poster-scale-wrapper');
  if (wrapper) wrapper.style.transform = `scale(${AppState.zoom})`;

  const zoomText = document.getElementById('val-zoom');
  if (zoomText) zoomText.textContent = `${Math.round(AppState.zoom * 100)}%`;
}

/**
 * Toast Notification Helper
 */
function showToast(message, type = 'info') {
  let toast = document.getElementById('app-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'app-toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.className = `toast show ${type === 'success' ? 'toast-success' : 'toast-info'}`;

  clearTimeout(toast._timeout);
  toast._timeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 2800);
}

/**
 * Storage Helpers
 */
function loadSavedCustomizations() {
  try {
    const saved = localStorage.getItem('mhs_calendar_prefs');
    if (saved) {
      const data = JSON.parse(saved);
      if (data.arColor) AppState.insightsArColor = data.arColor;
      if (data.mlColor) AppState.insightsMlColor = data.mlColor;
      if (data.arFont) AppState.insightsArFont = data.arFont;
      if (data.mlFont) AppState.insightsMlFont = data.mlFont;
      syncStateToInputs();
      syncStateToPoster();
    }
  } catch (e) {
    // Ignore storage errors
  }
}

// Utility Helpers
function setVal(id, val) {
  const el = document.getElementById(id);
  if (el) el.value = val;
}

function setText(id, val) {
  const el = document.getElementById(id);
  if (el) el.textContent = val;
}

function bindInput(id, callback) {
  const el = document.getElementById(id);
  if (!el) return;
  el.addEventListener('input', (e) => callback(e.target.value));
}
