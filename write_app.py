import os

content = r"""// app.js -- MathPath NGO Application Core
// SPA router and all page rendering. Depends on: data.js, progress.js, speech.js, admin.js

const state = {
  page: 'welcome',
  lang: 'en',
  studentName: '',
  level: '',
  currentTopicId: null,
  currentLessonTab: 'lesson',
  practiceTopicId: null,
  practiceQuestions: [],
  practiceIndex: 0,
  practiceCorrect: 0,
  practiceWrong: 0,
  practiceAnswered: false,
};

const t = (key) => (APP_DATA.ui[state.lang][key] || key);
const gel = (id) => document.getElementById(id);
function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ---- Router ----------------------------------------------------------------
function showPage(pageName, param) {
  state.page = pageName;
  Speech.stop();
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const pageEl = gel('page-' + pageName);
  if (pageEl) pageEl.classList.add('active');
  document.querySelectorAll('.nav-item').forEach(n => {
    n.classList.toggle('active', n.dataset.page === pageName);
  });
  updateLangBar();
  switch (pageName) {
    case 'welcome':  renderWelcome(); break;
    case 'home':     renderHome(); break;
    case 'topics':   renderTopics(); break;
    case 'lesson':
      if (param) state.currentTopicId = param;
      state.currentLessonTab = 'lesson';
      renderLesson(); break;
    case 'practice':
      if (param) state.practiceTopicId = param;
      startPractice(); break;
    case 'result':   renderResult(param); break;
    case 'progress': renderProgress(); break;
    case 'admin':    renderAdmin(); break;
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function switchLang(lang) {
  state.lang = lang;
  Progress.setLang(lang);
  Speech.stop();
  updateLangBar();
  showPage(state.page, state.currentTopicId || state.practiceTopicId);
}

function updateLangBar() {
  const bar = gel('lang-bar');
  if (!bar) return;
  const brand = bar.querySelector('.app-brand');
  if (brand) brand.textContent = t('appName');
  bar.querySelectorAll('.lang-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.lang === state.lang);
  });
}

// ---- Welcome ---------------------------------------------------------------
function renderWelcome() {
  const pageEl = gel('page-welcome');
  const saved = Progress.load();
  if (saved.studentName && saved.level) {
    state.studentName = saved.studentName;
    state.level = saved.level;
    state.lang = saved.lang || 'en';
    showPage('home');
    return;
  }
  pageEl.innerHTML = `
    <div class="welcome-hero">
      <span class="welcome-logo">&#x1F9EE;</span>
      <div class="welcome-title">${t('appName')}</div>
      <div class="welcome-subtitle">${t('appSubtitle')}</div>
    </div>
    <div class="welcome-card">
      <h2>${t('enterName')}</h2>
      <input type="text" id="name-input" class="name-input"
        placeholder="${t('namePlaceholder')}" maxlength="40" autocomplete="given-name" />
      <button class="btn btn-primary btn-full" id="name-next-btn">${t('letsLearn')}</button>
    </div>
  `;
  const nameInput = gel('name-input');
  const nameBtn   = gel('name-next-btn');
  function proceed() {
    const name = nameInput.value.trim();
    if (!name) {
      nameInput.focus();
      nameInput.style.borderColor = 'var(--red)';
      setTimeout(() => { nameInput.style.borderColor = ''; }, 1200);
      return;
    }
    state.studentName = name;
    renderLevelSelect();
  }
  nameBtn.addEventListener('click', proceed);
  nameInput.addEventListener('keydown', e => { if (e.key === 'Enter') proceed(); });
  nameInput.focus();
}

function renderLevelSelect() {
  const pageEl = gel('page-welcome');
  const levelsHtml = APP_DATA.levels.map(lv => `
    <div class="level-card ${lv.id.toLowerCase()}" data-level="${lv.id}" tabindex="0" role="button">
      <span class="level-icon">${lv.icon}</span>
      <div>
        <div class="level-name">${lv.id}</div>
        <div class="level-desc">${lv.desc[state.lang]}</div>
      </div>
    </div>
  `).join('');
  pageEl.innerHTML = `
    <div class="welcome-hero">
      <span class="welcome-logo">&#x1F9EE;</span>
      <div class="welcome-title">${t('welcome')} ${state.studentName}!</div>
      <div class="welcome-subtitle">${t('chooseLevel')}</div>
    </div>
    <div class="welcome-card">
      <div class="level-grid">${levelsHtml}</div>
    </div>
  `;
  pageEl.querySelectorAll('.level-card').forEach(card => {
    function select() {
      state.level = card.dataset.level;
      Progress.setStudent(state.studentName, state.level);
      showPage('home');
    }
    card.addEventListener('click', select);
    card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') select(); });
  });
}

// ---- Home ------------------------------------------------------------------
function renderHome() {
  const pageEl = gel('page-home');
  const prog    = Progress.load();
  const topics  = APP_DATA.topics[state.level] || [];
  const completed = prog.topicsCompleted.filter(id => topics.find(tp => tp.id === id)).length;
  const levelInfo = APP_DATA.levels.find(l => l.id === state.level) || { icon: '&#x1F4DA;' };
  const firstIncomplete = topics.find(tp => tp.available && !prog.topicsCompleted.includes(tp.id));
  const continueId = firstIncomplete ? firstIncomplete.id : (topics[0] ? topics[0].id : null);

  if (state.level !== 'Beginner') {
    pageEl.innerHTML = `
      <div class="home-header">
        <div class="home-greeting">${t('hello')},</div>
        <div class="home-name">${state.studentName} &#x1F44B;</div>
        <span class="level-badge">${levelInfo.icon} ${state.level}</span>
      </div>
      <div class="container">
        <div class="coming-soon">
          <span class="cs-emoji">&#x1F31F;</span>
          <h2>${t('comingSoon')}</h2>
          <p>${t('comingSoonDesc')}</p>
          <button class="btn btn-outline" id="change-lvl">${t('changeLevel')}</button>
        </div>
      </div>
    `;
    gel('change-lvl').addEventListener('click', () => {
      Progress.reset(); state.studentName = ''; state.level = ''; showPage('welcome');
    });
    return;
  }

  const topicCardsHtml = topics.map(tp => {
    const done = prog.topicsCompleted.includes(tp.id);
    const badge = done
      ? `<span class="topic-badge badge-done">${t('topicDone')}</span>`
      : `<span class="topic-badge badge-available">${t('topicStart')}</span>`;
    return `
      <div class="topic-card clickable" data-topic="${tp.id}" tabindex="0" role="button">
        <span class="topic-icon">${tp.categoryIcon}</span>
        <div class="topic-info">
          <div class="topic-cat">${tp.category[state.lang]}</div>
          <div class="topic-name">${tp.title[state.lang]}</div>
        </div>
        ${badge}
      </div>
    `;
  }).join('');

  pageEl.innerHTML = `
    <div class="home-header">
      <div class="home-greeting">${t('hello')},</div>
      <div class="home-name">${state.studentName} &#x1F44B;</div>
      <span class="level-badge">${levelInfo.icon} ${state.level}</span>
    </div>
    <div class="container">
      ${continueId ? `<div class="continue-btn-wrap mt-16"><button class="btn btn-primary btn-full btn-lg" id="continue-btn">${t('continueLearning')}</button></div>` : ''}
      <div class="mini-progress">&#x1F4CA; ${completed} / ${topics.length} ${t('topicsCompleted')}</div>
      <div class="section-title mt-20">&#x1F4DA; ${t('availableTopics')}</div>
      ${topicCardsHtml}
    </div>
  `;

  const contBtn = gel('continue-btn');
  if (contBtn) contBtn.addEventListener('click', () => showPage('lesson', continueId));
  pageEl.querySelectorAll('.topic-card').forEach(card => {
    function go() { showPage('lesson', card.dataset.topic); }
    card.addEventListener('click', go);
    card.addEventListener('keydown', e => { if (e.key === 'Enter') go(); });
  });
}

// ---- Topics ----------------------------------------------------------------
function renderTopics() {
  const pageEl  = gel('page-topics');
  const prog    = Progress.load();
  const topics  = APP_DATA.topics[state.level] || [];
  const levelInfo = APP_DATA.levels.find(l => l.id === state.level) || { icon: '&#x1F4DA;' };

  if (state.level !== 'Beginner' || topics.length === 0) {
    pageEl.innerHTML = `<div class="container"><div class="coming-soon"><span class="cs-emoji">&#x1F31F;</span><h2>${t('comingSoon')}</h2><p>${t('comingSoonDesc')}</p></div></div>`;
    return;
  }

  const topicCardsHtml = topics.map(tp => {
    const done = prog.topicsCompleted.includes(tp.id);
    const badge = done
      ? `<span class="topic-badge badge-done">${t('topicDone')}</span>`
      : `<span class="topic-badge badge-available">${t('topicStart')}</span>`;
    return `
      <div class="topic-card clickable" data-topic="${tp.id}" tabindex="0" role="button">
        <span class="topic-icon">${tp.categoryIcon}</span>
        <div class="topic-info">
          <div class="topic-cat">${tp.category[state.lang]}</div>
          <div class="topic-name">${tp.title[state.lang]}</div>
        </div>
        ${badge}
      </div>
    `;
  }).join('');

  pageEl.innerHTML = `
    <div class="home-header">
      <div class="home-greeting">${levelInfo.icon} ${state.level}</div>
      <div class="home-name">${t('availableTopics')}</div>
    </div>
    <div class="container mt-20">${topicCardsHtml}</div>
  `;
  pageEl.querySelectorAll('.topic-card').forEach(card => {
    function go() { showPage('lesson', card.dataset.topic); }
    card.addEventListener('click', go);
    card.addEventListener('keydown', e => { if (e.key === 'Enter') go(); });
  });
}

// ---- Lesson ----------------------------------------------------------------
function renderLesson() {
  const pageEl   = gel('page-lesson');
  const topicId  = state.currentTopicId;
  const lesson   = APP_DATA.lessons[topicId];
  const topicMeta = (APP_DATA.topics[state.level] || []).find(tp => tp.id === topicId);
  if (!lesson || !topicMeta) { pageEl.innerHTML = '<div class="container"><p>Topic not found.</p></div>'; return; }

  const expl      = lesson.explanation[state.lang];
  const catName   = topicMeta.category[state.lang];
  const topicName = topicMeta.title[state.lang];
  const tab       = state.currentLessonTab;

  pageEl.innerHTML = `
    <div class="lesson-header">
      <div class="lesson-topic-cat">${catName}</div>
      <div class="lesson-topic-title">${topicName}</div>
    </div>
    <div class="tabs">
      <button class="tab-btn ${tab === 'lesson' ? 'active' : ''}" data-tab="lesson">${t('lessonTab')}</button>
      <button class="tab-btn ${tab === 'examples' ? 'active' : ''}" data-tab="examples">${t('examplesTab')}</button>
      <button class="tab-btn ${tab === 'practice' ? 'active' : ''}" data-tab="practice">${t('practiceTab')}</button>
    </div>
    <div class="container">
      <div id="tab-lesson" class="tab-content ${tab === 'lesson' ? 'active' : ''}">
        <div class="text-center mb-12">
          <button class="btn-listen" id="listen-btn">${t('listen')}</button>
        </div>
        <div class="explanation-text">${expl.text}</div>
        ${buildLessonVisual(topicId)}
        <div class="flex-gap mt-20">
          <button class="btn btn-outline btn-sm" id="back-topics-btn">${t('backToTopics')}</button>
          <button class="btn btn-primary" id="to-examples-btn">${t('next')}</button>
        </div>
      </div>
      <div id="tab-examples" class="tab-content ${tab === 'examples' ? 'active' : ''}">
        ${buildExamples(topicId)}
        <div class="flex-gap mt-20">
          <button class="btn btn-outline btn-sm" id="ex-back-btn">${t('prev')}</button>
          <button class="btn btn-primary" id="to-practice-tab-btn">${t('next')}</button>
        </div>
      </div>
      <div id="tab-practice" class="tab-content ${tab === 'practice' ? 'active' : ''}">
        <div class="card text-center">
          <div style="font-size:3rem;margin-bottom:12px;">&#x270F;&#xFE0F;</div>
          <h2 style="font-size:1.3rem;font-weight:700;margin-bottom:8px;">${t('readyToPractice')}</h2>
          <p style="color:var(--text-light);margin-bottom:20px;">${lesson.questions.length} ${t('questions')}</p>
          <button class="btn btn-secondary btn-full" id="start-practice-btn">${t('startPractice')}</button>
        </div>
        <div class="mt-12">
          <button class="btn btn-ghost btn-sm" id="pr-back-btn">${t('prev')}</button>
        </div>
      </div>
    </div>
  `;

  pageEl.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => { state.currentLessonTab = btn.dataset.tab; renderLesson(); });
  });

  gel('listen-btn').addEventListener('click', () => Speech.speak(lesson.explanation[state.lang].voice, state.lang));
  gel('back-topics-btn').addEventListener('click', () => showPage('topics'));
  gel('to-examples-btn').addEventListener('click', () => { state.currentLessonTab = 'examples'; renderLesson(); });
  gel('ex-back-btn').addEventListener('click', () => { state.currentLessonTab = 'lesson'; renderLesson(); });
  gel('to-practice-tab-btn').addEventListener('click', () => { state.currentLessonTab = 'practice'; renderLesson(); });
  gel('pr-back-btn').addEventListener('click', () => { state.currentLessonTab = 'examples'; renderLesson(); });
  gel('start-practice-btn').addEventListener('click', () => showPage('practice', topicId));
}

function buildLessonVisual(topicId) {
  if (topicId === 'big-small') {
    const ex = APP_DATA.lessons[topicId].visualExamples[0][state.lang];
    return `
      <div class="comparison-visual">
        <div class="comparison-item emoji-big">
          <div class="comp-emoji">${ex.left.emoji}</div>
          <div class="comp-word comp-word-big">${ex.left.word}</div>
        </div>
        <div class="comparison-item emoji-small">
          <div class="comp-emoji">${ex.right.emoji}</div>
          <div class="comp-word comp-word-small">${ex.right.word}</div>
        </div>
      </div>
    `;
  }
  if (topicId === 'circle') {
    const word = state.lang === 'te' ? '&#x0C35;&#x0C43;&#x0C24;&#x0C4D;&#x0C24;&#x0C02;' : 'CIRCLE';
    const desc = state.lang === 'te' ? '&#x0C2E;&#x0C42;&#x0C32;&#x0C32;&#x0C41; &#x0C32;&#x0C47;&#x0C35;&#x0C41;, &#x0C05;&#x0C02;&#x0C1A;&#x0C41;&#x0C32;&#x0C41; &#x0C32;&#x0C47;&#x0C35;&#x0C41;!' : 'A perfectly round shape with no corners!';
    return `
      <div class="circle-visual">
        <div class="shape-circle">${word}</div>
        <div class="circle-label">${desc}</div>
      </div>
    `;
  }
  return '';
}

function buildExamples(topicId) {
  return APP_DATA.lessons[topicId].visualExamples.map(ex => {
    const exL = ex[state.lang];
    if (ex.type === 'comparison') {
      const lC = exL.left.size === 'big' ? 'emoji-big' : 'emoji-small';
      const rC = exL.right.size === 'big' ? 'emoji-big' : 'emoji-small';
      const lW = exL.left.size === 'big' ? 'comp-word-big' : 'comp-word-small';
      const rW = exL.right.size === 'big' ? 'comp-word-big' : 'comp-word-small';
      return `
        <div class="example-card">
          <div class="example-label">${exL.label}</div>
          <div class="comparison-visual" style="margin:0;">
            <div class="comparison-item ${lC}"><div class="comp-emoji">${exL.left.emoji}</div><div class="comp-word ${lW}">${exL.left.word}</div></div>
            <div class="comparison-item ${rC}"><div class="comp-emoji">${exL.right.emoji}</div><div class="comp-word ${rW}">${exL.right.word}</div></div>
          </div>
        </div>
      `;
    }
    if (ex.type === 'circle') {
      return `
        <div class="example-card">
          <div class="example-label">${exL.label}</div>
          <div class="circle-example">
            <div class="circle-example-shape">${exL.icon}</div>
            <div class="circle-word-badge">${exL.word}</div>
          </div>
        </div>
      `;
    }
    return '';
  }).join('');
}

// ---- Practice --------------------------------------------------------------
function startPractice() {
  const lesson = APP_DATA.lessons[state.practiceTopicId];
  if (!lesson) { showPage('home'); return; }
  state.practiceQuestions = lesson.questions;
  state.practiceIndex     = 0;
  state.practiceCorrect   = 0;
  state.practiceWrong     = 0;
  state.practiceAnswered  = false;
  renderPracticeQuestion();
}

function renderPracticeQuestion() {
  const pageEl  = gel('page-practice');
  const topicId = state.practiceTopicId;
  const qs      = state.practiceQuestions;
  const idx     = state.practiceIndex;
  const total   = qs.length;
  const meta    = (APP_DATA.topics[state.level] || []).find(tp => tp.id === topicId);
  const tName   = meta ? meta.title[state.lang] : topicId;
  const q       = qs[idx][state.lang];
  const pct     = Math.round((idx / total) * 100);

  pageEl.innerHTML = `
    <div class="practice-header">
      <div class="practice-title">&#x270F;&#xFE0F; ${tName}</div>
      <div class="practice-subtitle">${t('questionOf')} ${idx + 1} ${t('of')} ${total}</div>
    </div>
    <div class="container">
      <div class="question-counter">${t('questionOf')} ${idx + 1} ${t('of')} ${total}</div>
      <div class="progress-bar-container">
        <div class="progress-bar-fill" style="width:${pct}%"></div>
      </div>
      <div class="question-card">
        <div class="question-text">${q.question}</div>
      </div>
      <input type="text" id="answer-input" class="answer-input"
        placeholder="${t('yourAnswer')}" autocomplete="off" autocorrect="off"
        autocapitalize="off" spellcheck="false" />
      <button class="btn btn-primary btn-full" id="submit-btn">${t('submit')}</button>
      <div class="feedback-box" id="feedback-box"></div>
      <div class="hint-box" id="hint-box">
        <span class="hint-label">${t('hint')}</span>
        <span id="hint-text"></span>
      </div>
      <div class="mt-12" id="next-btn-wrap" style="display:none;">
        <button class="btn btn-secondary btn-full" id="next-question-btn">${t('nextQuestion')}</button>
      </div>
    </div>
  `;

  const ansInput   = gel('answer-input');
  const submitBtn  = gel('submit-btn');
  const feedbackEl = gel('feedback-box');
  const hintEl     = gel('hint-box');
  const nextWrap   = gel('next-btn-wrap');
  const nextBtn    = gel('next-question-btn');

  function submitAnswer() {
    if (state.practiceAnswered) return;
    const userAns    = ansInput.value.trim().toLowerCase();
    const correctAns = q.answer.trim().toLowerCase();
    const isCorrect  = userAns === correctAns;
    state.practiceAnswered = true;
    ansInput.disabled   = true;
    submitBtn.disabled  = true;
    submitBtn.style.opacity = '0.5';
    if (isCorrect) {
      state.practiceCorrect++;
      feedbackEl.className = 'feedback-box feedback-correct visible';
      feedbackEl.innerHTML = `<span class="feedback-icon">&#x2713;</span> ${t('correct')}`;
      ansInput.classList.add('correct-anim');
    } else {
      state.practiceWrong++;
      feedbackEl.className = 'feedback-box feedback-incorrect visible';
      feedbackEl.innerHTML = `<span class="feedback-icon">&#x2715;</span> ${t('incorrect')} &mdash; <em>${q.answer}</em>`;
      ansInput.classList.add('incorrect-anim');
      gel('hint-text').textContent = q.hint;
      hintEl.classList.add('visible');
    }
    nextWrap.style.display = 'block';
    nextBtn.focus();
  }

  submitBtn.addEventListener('click', submitAnswer);
  ansInput.addEventListener('keydown', e => { if (e.key === 'Enter') submitAnswer(); });
  nextBtn.addEventListener('click', () => {
    state.practiceIndex++;
    state.practiceAnswered = false;
    if (state.practiceIndex >= state.practiceQuestions.length) {
      Progress.recordPractice(state.practiceTopicId, state.practiceCorrect, state.practiceWrong);
      showPage('result', { topicId: state.practiceTopicId, correct: state.practiceCorrect, wrong: state.practiceWrong });
    } else {
      renderPracticeQuestion();
    }
  });
  setTimeout(() => ansInput.focus(), 80);
}

// ---- Result ----------------------------------------------------------------
function renderResult(param) {
  const pageEl  = gel('page-result');
  const topicId = param ? param.topicId : null;
  const correct = (param && param.correct) || 0;
  const wrong   = (param && param.wrong)   || 0;
  const total   = correct + wrong;
  const pct     = total > 0 ? Math.round((correct / total) * 100) : 0;
  const great   = pct >= 60;
  pageEl.innerHTML = `
    <div class="container">
      <div class="result-hero">
        <span class="result-emoji">${great ? '&#x1F389;' : '&#x1F4AA;'}</span>
        <div class="result-title">${t('practiceComplete')}</div>
        <div class="result-subtitle">${great ? t('greatJob') : t('keepTrying')}</div>
      </div>
      <div class="result-score-ring">
        <span class="score-pct">${pct}%</span>
        <span class="score-label">${t('score')}</span>
      </div>
      <div class="card result-stats">
        <div class="stat-row"><span class="stat-label">${t('questions')}</span><span class="stat-value">${total}</span></div>
        <div class="stat-row"><span class="stat-label">${t('correctLabel')}</span><span class="stat-value green">${correct}</span></div>
        <div class="stat-row"><span class="stat-label">${t('wrongLabel')}</span><span class="stat-value red">${wrong}</span></div>
        <div class="stat-row"><span class="stat-label">${t('score')}</span><span class="stat-value">${pct}%</span></div>
      </div>
      <div class="result-actions">
        <button class="btn btn-outline" id="try-again-btn">${t('tryAgain')}</button>
        <button class="btn btn-primary" id="result-home-btn">${t('backHome')}</button>
      </div>
    </div>
  `;
  gel('try-again-btn').addEventListener('click', () => showPage('practice', topicId));
  gel('result-home-btn').addEventListener('click', () => showPage('home'));
}

// ---- Progress --------------------------------------------------------------
function renderProgress() {
  const pageEl  = gel('page-progress');
  const prog    = Progress.load();
  const topics  = APP_DATA.topics[state.level] || [];
  const totals  = Progress.getTotals();
  const levelInfo = APP_DATA.levels.find(l => l.id === state.level) || { icon: '&#x1F4DA;' };

  const topicsHtml = topics.map(tp => {
    const done  = prog.topicsCompleted.includes(tp.id);
    const pData = prog.practice[tp.id];
    const stats = pData ? `${pData.correct} ${t('correctLabel')} / ${pData.wrong} ${t('wrongLabel')} &mdash; ${Math.round((pData.correct / pData.attempted) * 100)}%` : '';
    return `
      <div class="progress-topic-card">
        <span class="progress-topic-icon">${tp.categoryIcon}</span>
        <div style="flex:1;">
          <div class="progress-topic-name">${tp.title[state.lang]}</div>
          ${stats ? `<div class="progress-topic-stats">${stats}</div>` : ''}
        </div>
        ${done ? '<span class="progress-check">&#x2705;</span>' : ''}
      </div>
    `;
  }).join('');

  const overallPct = totals.totalAttempted > 0 ? Math.round((totals.totalCorrect / totals.totalAttempted) * 100) : 0;
  const overallHtml = totals.totalAttempted > 0 ? `
    <div class="overall-stats mt-16">
      <div class="overall-title">&#x1F4CA; Overall Performance</div>
      <div class="stat-row"><span class="stat-label">${t('questions')}</span><span class="stat-value">${totals.totalAttempted}</span></div>
      <div class="stat-row"><span class="stat-label">${t('correctLabel')}</span><span class="stat-value green">${totals.totalCorrect}</span></div>
      <div class="stat-row"><span class="stat-label">${t('wrongLabel')}</span><span class="stat-value red">${totals.totalWrong}</span></div>
      <div class="stat-row"><span class="stat-label">${t('score')}</span><span class="stat-value">${overallPct}%</span></div>
    </div>
  ` : `<div class="empty-state mt-16"><span class="es-icon">&#x1F680;</span><p>${t('noProgress')}</p></div>`;

  pageEl.innerHTML = `
    <div class="progress-header">
      <div>${levelInfo.icon} ${state.level}</div>
      <div class="progress-title-text">${t('progressTitle')}</div>
    </div>
    <div class="container">
      <div class="section-title mt-16">&#x1F4DA; ${t('topicsCompleted')}</div>
      ${topicsHtml || `<div class="empty-state"><span class="es-icon">&#x1F4D6;</span><p>${t('noProgress')}</p></div>`}
      ${overallHtml}
      <div class="mt-20">
        <button class="btn btn-primary btn-full" id="prog-home-btn">${t('backHome')}</button>
      </div>
    </div>
  `;
  gel('prog-home-btn').addEventListener('click', () => showPage('home'));
}

// ---- Admin -----------------------------------------------------------------
function renderAdmin() {
  const pageEl  = gel('page-admin');
  const prog    = Progress.load();
  const totals  = Progress.getTotals();
  const bTopics = APP_DATA.topics.Beginner || [];
  const completedNames = bTopics.filter(tp => prog.topicsCompleted.includes(tp.id)).map(tp => tp.title[state.lang]).join(', ') || '&mdash;';

  let breakdown = '';
  if (Object.keys(prog.practice).length > 0) {
    const rows = Object.entries(prog.practice).map(([tid, p]) => {
      const meta = bTopics.find(tp => tp.id === tid);
      const name = meta ? meta.title[state.lang] : tid;
      const p2   = p.attempted > 0 ? Math.round((p.correct / p.attempted) * 100) : 0;
      return `<div class="info-row"><span class="info-key">${name}</span><span class="info-value">${p.correct}/${p.attempted} (${p2}%)</span></div>`;
    }).join('');
    breakdown = `<div class="admin-card"><h3>&#x1F4DD; Topic Breakdown</h3>${rows}</div>`;
  }

  pageEl.innerHTML = `
    <div class="admin-header">
      <div class="admin-title">&#x2699;&#xFE0F; ${t('adminDashboard')}</div>
      <div class="admin-badge">V1.0 Prototype</div>
    </div>
    <div class="container">
      <div class="admin-card">
        <h3>&#x1F464; ${t('studentInfo')}</h3>
        <div class="info-row"><span class="info-key">Name</span><span class="info-value">${prog.studentName || '&mdash;'}</span></div>
        <div class="info-row"><span class="info-key">${t('level')}</span><span class="info-value">${prog.level || '&mdash;'}</span></div>
        <div class="info-row"><span class="info-key">${t('topicsCompleted')}</span><span class="info-value">${completedNames}</span></div>
        <div class="info-row"><span class="info-key">${t('questions')}</span><span class="info-value">${totals.totalAttempted}</span></div>
        <div class="info-row"><span class="info-key">${t('correctLabel')}</span><span class="info-value" style="color:var(--green-dark)">${totals.totalCorrect}</span></div>
        <div class="info-row"><span class="info-key">${t('wrongLabel')}</span><span class="info-value" style="color:var(--red)">${totals.totalWrong}</span></div>
      </div>
      ${breakdown}
      <div class="admin-card">
        <h3>&#x1F4CA; ${t('correctVsWrong')}</h3>
        <div class="chart-section">
          <canvas id="admin-chart" width="200" height="200"></canvas>
          <div class="chart-legend">
            <div class="legend-item"><div class="legend-dot legend-correct"></div><span>${t('correctLabel')} (${totals.totalCorrect})</span></div>
            <div class="legend-item"><div class="legend-dot legend-wrong"></div><span>${t('wrongLabel')} (${totals.totalWrong})</span></div>
          </div>
        </div>
      </div>
      <div class="mt-12">
        <button class="btn btn-outline btn-sm" id="admin-home-btn">${t('backHome')}</button>
      </div>
    </div>
  `;
  setTimeout(() => renderAdminChart(totals.totalCorrect, totals.totalWrong), 60);
  gel('admin-home-btn').addEventListener('click', () => showPage('home'));
}

// ---- Nav & Init ------------------------------------------------------------
function buildNavBar() {
  const nav = gel('nav-bar');
  if (!nav) return;
  const items = [
    { page: 'home',     icon: '&#x1F3E0;', labelKey: 'home'     },
    { page: 'topics',   icon: '&#x1F4DA;', labelKey: 'topics'   },
    { page: 'progress', icon: '&#x1F4CA;', labelKey: 'progress' },
    { page: 'admin',    icon: '&#x2699;&#xFE0F;', labelKey: 'admin' },
  ];
  nav.innerHTML = items.map(item =>
    `<button class="nav-item" data-page="${item.page}" aria-label="${item.labelKey}"><span class="nav-icon">${item.icon}</span><span class="nav-label" data-nav="${item.labelKey}">${t(item.labelKey)}</span></button>`
  ).join('');
  nav.querySelectorAll('.nav-item').forEach(btn => {
    btn.addEventListener('click', () => showPage(btn.dataset.page));
  });
}

function buildLangBar() {
  const bar = gel('lang-bar');
  if (!bar) return;
  bar.innerHTML = `
    <span class="app-brand">${t('appName')}</span>
    <div class="lang-switcher">
      <button class="lang-btn ${state.lang === 'en' ? 'active' : ''}" data-lang="en">English</button>
      <button class="lang-btn ${state.lang === 'te' ? 'active' : ''}" data-lang="te">&#x0C24;&#x0C46;&#x0C32;&#x0C41;&#x0C17;&#x0C41;</button>
    </div>
  `;
  bar.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => switchLang(btn.dataset.lang));
  });
}

function initApp() {
  const saved = Progress.load();
  state.lang  = saved.lang || 'en';
  buildLangBar();
  buildNavBar();
  if (saved.studentName && saved.level) {
    state.studentName = saved.studentName;
    state.level       = saved.level;
    showPage('home');
  } else {
    showPage('welcome');
  }
}
"""

js_dir = os.path.join(r"C:\Users\Raghava\.gemini\antigravity\scratch\math-ngo-app", "js")
os.makedirs(js_dir, exist_ok=True)
js_file = os.path.join(js_dir, "app.js")

with open(js_file, 'w', encoding='utf-8') as f:
    f.write(content)

print(f"Successfully wrote {js_file}")
print(f"File size: {os.path.getsize(js_file)} bytes")
