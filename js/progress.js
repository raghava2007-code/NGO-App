// progress.js — Student progress tracking using localStorage.
// No backend required for V1.0. All data is stored in the browser.

const Progress = {
  KEY: "mathpath_v1_progress",

  load() {
    try {
      const raw = localStorage.getItem(this.KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) { /* ignore parse errors */ }
    return this.defaults();
  },

  defaults() {
    return {
      studentName: "",
      level: "",
      lang: "en",
      topicsCompleted: [],   // array of topic ids that have been practiced
      practice: {}           // { [topicId]: { attempted, correct, wrong } }
    };
  },

  save(data) {
    try {
      localStorage.setItem(this.KEY, JSON.stringify(data));
    } catch (e) { /* ignore storage errors */ }
  },

  setStudent(name, level) {
    const data = this.load();
    data.studentName = name;
    data.level = level;
    this.save(data);
  },

  setLang(lang) {
    const data = this.load();
    data.lang = lang;
    this.save(data);
  },

  // Record results after completing a practice session
  recordPractice(topicId, correct, wrong) {
    const data = this.load();
    data.practice[topicId] = {
      attempted: correct + wrong,
      correct,
      wrong,
    };
    if (!data.topicsCompleted.includes(topicId)) {
      data.topicsCompleted.push(topicId);
    }
    this.save(data);
  },

  // Aggregate totals across all practiced topics
  getTotals() {
    const data = this.load();
    let totalAttempted = 0, totalCorrect = 0, totalWrong = 0;
    Object.values(data.practice).forEach(p => {
      totalAttempted += p.attempted;
      totalCorrect += p.correct;
      totalWrong += p.wrong;
    });
    return { totalAttempted, totalCorrect, totalWrong };
  },

  isTopicCompleted(topicId) {
    return this.load().topicsCompleted.includes(topicId);
  },

  reset() {
    localStorage.removeItem(this.KEY);
  },
};