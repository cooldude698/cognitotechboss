/* ============================================
   js/stats.js — Live Telemetry & Chart.js
   Owner: Prith
   Computes live metrics into #house-stats-panel,
   renders Chart.js bar chart into #charts-canvas.
   ============================================ */

(function () {
  'use strict';

  const statsPanel = document.getElementById('house-stats-panel');
  const chartCanvas = document.getElementById('charts-canvas');
  let pointsChart = null;

  // ---- COMPUTE METRICS ----
  function computeMetrics() {
    const state = window.AppState;
    if (!state) return {};

    const contestants = state.contestants || [];
    const tasks = state.tasks || [];
    const active = contestants.filter(c => c.status !== 'evicted');

    // MVP (Top Scorer)
    let mvp = { name: '—', points: 0, avatar: '🏆' };
    if (active.length > 0) {
      const top = active.reduce((best, c) => c.points > best.points ? c : best, active[0]);
      mvp = { name: top.name, points: top.points, avatar: top.avatar };
    }

    // Lowest scorer
    let lowest = { name: '—', points: 0, avatar: '💀' };
    if (active.length > 0) {
      const low = active.reduce((worst, c) => c.points < worst.points ? c : worst, active[0]);
      lowest = { name: low.name, points: low.points, avatar: low.avatar };
    }

    // Tasks progress
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(t => t.status === 'completed').length;

    // Nominees at risk
    const nominees = (state.nominees || []).length;

    // Drama level
    const dramaLevel = state.dramaLevel || 0;

    // Captain
    const captain = contestants.find(c => c.isCaptain);
    const captainName = captain ? captain.name : '—';
    const captainAvatar = captain ? captain.avatar : '👑';

    return {
      mvp,
      lowest,
      totalTasks,
      completedTasks,
      nominees,
      dramaLevel,
      captainName,
      captainAvatar
    };
  }

  // ---- RENDER STATS ----
  function renderStats() {
    if (!statsPanel) return;

    const m = computeMetrics();

    statsPanel.innerHTML = `
      <div class="stat-card mvp">
        <div class="stat-icon">🌟</div>
        <div class="stat-label">Top Scorer (MVP)</div>
        <div class="stat-value">${escapeHtml(m.mvp.name)}</div>
        <div class="stat-sub">${m.mvp.avatar} ${m.mvp.points} pts</div>
      </div>

      <div class="stat-card">
        <div class="stat-icon">👑</div>
        <div class="stat-label">House Captain</div>
        <div class="stat-value">${escapeHtml(m.captainName)}</div>
        <div class="stat-sub">${m.captainAvatar}</div>
      </div>

      <div class="stat-card">
        <div class="stat-icon">✅</div>
        <div class="stat-label">Tasks Progress</div>
        <div class="stat-value">${m.completedTasks} / ${m.totalTasks}</div>
        <div class="stat-sub">${m.totalTasks > 0 ? Math.round((m.completedTasks / m.totalTasks) * 100) : 0}% complete</div>
      </div>

      <div class="stat-card danger">
        <div class="stat-icon">⚠️</div>
        <div class="stat-label">Nominees at Risk</div>
        <div class="stat-value">${m.nominees}</div>
        <div class="stat-sub">in Danger Zone</div>
      </div>

      <div class="stat-card">
        <div class="stat-icon">💀</div>
        <div class="stat-label">Lowest Scorer</div>
        <div class="stat-value">${escapeHtml(m.lowest.name)}</div>
        <div class="stat-sub">${m.lowest.avatar} ${m.lowest.points} pts</div>
      </div>

      <div class="stat-card drama">
        <div class="stat-icon">🎭</div>
        <div class="stat-label">Drama Level</div>
        <div class="stat-value">${m.dramaLevel}%</div>
        <div class="stat-sub">${getDramaVibe(m.dramaLevel)}</div>
      </div>
    `;
  }

  function getDramaVibe(level) {
    if (level >= 80) return '🔥 ABSOLUTE CHAOS';
    if (level >= 60) return '😤 HIGH TENSION';
    if (level >= 40) return '😬 Getting Spicy';
    if (level >= 20) return '😌 Mild Drama';
    return '😴 Peaceful';
  }

  // ---- CHART.JS ----
  function renderChart() {
    if (!chartCanvas) return;
    if (typeof Chart === 'undefined') return; // Chart.js not loaded yet

    const state = window.AppState;
    if (!state || !state.contestants) return;

    const active = state.contestants.filter(c => c.status !== 'evicted');
    const sorted = [...active].sort((a, b) => b.points - a.points);

    const labels = sorted.map(c => `${c.avatar} ${c.name}`);
    const data = sorted.map(c => c.points);

    // Neo-Brutalist color palette
    const colors = [
      '#D4F77C', // lime
      '#FEE159', // yellow
      '#FF5C98', // pink
      '#EDE9FE', // lavender
      '#FEE2E2', // danger bg
      '#A7F3D0', // mint
      '#FBBF24', // amber
      '#93C5FD', // sky
    ];

    const bgColors = sorted.map((_, i) => colors[i % colors.length]);

    if (pointsChart) {
      // Update existing chart
      pointsChart.data.labels = labels;
      pointsChart.data.datasets[0].data = data;
      pointsChart.data.datasets[0].backgroundColor = bgColors;
      pointsChart.update('none'); // skip animation for perf
    } else {
      // Create new chart
      const ctx = chartCanvas.getContext('2d');
      pointsChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Points',
            data: data,
            backgroundColor: bgColors,
            borderColor: '#121214',
            borderWidth: 2,
            borderRadius: 8,
            borderSkipped: false,
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              backgroundColor: '#121214',
              titleFont: { family: "'JetBrains Mono', monospace", weight: 'bold' },
              bodyFont: { family: "'DM Sans', sans-serif" },
              padding: 12,
              cornerRadius: 8,
              borderColor: '#D4F77C',
              borderWidth: 2,
            }
          },
          scales: {
            x: {
              grid: { display: false },
              ticks: {
                font: {
                  family: "'JetBrains Mono', monospace",
                  size: 11,
                  weight: 'bold'
                },
                color: '#121214'
              },
              border: {
                color: '#121214',
                width: 2
              }
            },
            y: {
              grid: {
                color: 'rgba(0,0,0,0.06)',
                lineWidth: 1
              },
              ticks: {
                font: {
                  family: "'JetBrains Mono', monospace",
                  size: 11
                },
                color: '#57575e'
              },
              border: {
                color: '#121214',
                width: 2
              },
              beginAtZero: true
            }
          },
          animation: {
            duration: 600,
            easing: 'easeOutQuart'
          }
        }
      });
    }
  }

  // ---- HELPERS ----
  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // ---- FULL RENDER ----
  function renderAll() {
    renderStats();
    renderChart();
  }

  // ---- REACTIVE LISTENER ----
  window.addEventListener('app:state-changed', renderAll);

  // ---- INIT ----
  function init() {
    renderAll();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // ---- EXPOSE ----
  window.StatsModule = {
    render: renderAll
  };

})();
