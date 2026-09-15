// admin.js — Admin dashboard chart rendering using Canvas API.
// No external chart libraries. Pure Canvas 2D drawing.

function renderAdminChart(correct, wrong) {
  const canvas = document.getElementById("admin-chart");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  // Make canvas crisp on high-DPI screens
  const dpr = window.devicePixelRatio || 1;
  const size = 200;
  canvas.style.width = size + "px";
  canvas.style.height = size + "px";
  canvas.width = size * dpr;
  canvas.height = size * dpr;
  ctx.scale(dpr, dpr);

  const cx = size / 2;
  const cy = size / 2;
  const r = 80;
  const total = correct + wrong;

  ctx.clearRect(0, 0, size, size);

  if (total === 0) {
    // No data state — grey circle
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, 2 * Math.PI);
    ctx.fillStyle = "#e8e8e8";
    ctx.fill();

    // Donut hole
    ctx.beginPath();
    ctx.arc(cx, cy, r * 0.55, 0, 2 * Math.PI);
    ctx.fillStyle = "#ffffff";
    ctx.fill();

    ctx.fillStyle = "#999";
    ctx.font = "13px system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("No data yet", cx, cy);
    return;
  }

  const correctAngle = (correct / total) * 2 * Math.PI;
  const startAngle = -Math.PI / 2;

  // Correct slice — green
  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.arc(cx, cy, r, startAngle, startAngle + correctAngle);
  ctx.closePath();
  ctx.fillStyle = "#06D6A0";
  ctx.fill();

  // Wrong slice — coral (only if wrong > 0)
  if (wrong > 0) {
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, r, startAngle + correctAngle, startAngle + 2 * Math.PI);
    ctx.closePath();
    ctx.fillStyle = "#EF476F";
    ctx.fill();
  }

  // Donut hole
  ctx.beginPath();
  ctx.arc(cx, cy, r * 0.55, 0, 2 * Math.PI);
  ctx.fillStyle = "#ffffff";
  ctx.fill();

  // Centre text — score percentage
  const pct = Math.round((correct / total) * 100);
  ctx.fillStyle = "#333";
  ctx.font = "bold 24px system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(pct + "%", cx, cy - 8);
  ctx.font = "12px system-ui, sans-serif";
  ctx.fillStyle = "#666";
  ctx.fillText("correct", cx, cy + 14);
}