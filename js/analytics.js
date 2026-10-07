/* ============================================================================
   js/analytics.js — House Performance & Predictive Analytics Engine
   Owner: Prit (Prith) — Requirement #11 & Advanced Performance Intelligence
   ============================================================================ */

(function () {
  'use strict';

  let analyticsBarChart = null;
  let analyticsTeamChart = null;

  // ---- COMPUTE WIN PROBABILITY & METRICS ----
  function calculateContestantAnalytics() {
    const state = window.AppState;
    if (!state || !state.contestants) return [];

    const active = state.contestants.filter(c => c.status !== 'evicted');
    if (active.length === 0) return [];

    const maxPoints = Math.max(...active.map(c => c.points || 0), 1);
    const maxTasks = Math.max(...active.map(c => c.tasksCompleted || 0), 1);

    // Heuristic Score = Points(45%) + Tasks(25%) + Immunity(15%) + SlayStreak(10%) - Nominated(15%)
    const scored = active.map(c => {
      const pointScore = ((c.points || 0) / maxPoints) * 45;
      const taskScore = ((c.tasksCompleted || 0) / maxTasks) * 25;
      const immunityScore = c.status === 'immune' || c.isCaptain ? 15 : 0;
      const streakScore = Math.min((c.slayStreak || 0) * 3, 10);
      const dangerPenalty = c.status === 'nominated' ? 15 : 0;

      let rawProb = Math.max(5, pointScore + taskScore + immunityScore + streakScore - dangerPenalty);
      return {
        ...c,
        rawProb: rawProb
      };
    });

    // Normalize probabilities so they sum to 100%
    const totalRaw = scored.reduce((sum, c) => sum + c.rawProb, 0);
    const results = scored.map(c => {
      const probPct = Math.round((c.rawProb / totalRaw) * 100);
      let tier = 'B-Tier ⚡';
      let tierClass = 'tier-b';
      if (probPct >= 20 || c.isCaptain) {
        tier = 'S-Tier 👑';
        tierClass = 'tier-s';
      } else if (probPct >= 12) {
        tier = 'A-Tier 🔥';
        tierClass = 'tier-a';
      } else if (c.status === 'nominated') {
        tier = 'Danger Zone ⚠️';
        tierClass = 'tier-danger';
      }

      return {
        ...c,
        winProbability: probPct,
        tier: tier,
        tierClass: tierClass
      };
    });

    // Sort descending by win probability
    return results.sort((a, b) => b.winProbability - a.winProbability);
  }

  // ---- COMPUTE TEAM PERFORMANCE ----
  function calculateTeamAnalytics() {
    const state = window.AppState;
    if (!state || !state.contestants) return {};

    const teams = {
      Alpha: { name: 'Alpha', icon: '🦁', color: '#D4F77C', points: 0, members: 0, active: 0, nominated: 0, tasks: 0 },
      Beta: { name: 'Beta', icon: '⚡', color: '#FEE159', points: 0, members: 0, active: 0, nominated: 0, tasks: 0 },
      Omega: { name: 'Omega', icon: '✨', color: '#FF5C98', points: 0, members: 0, active: 0, nominated: 0, tasks: 0 }
    };

    (state.contestants || []).forEach(c => {
      const t = teams[c.team] || teams.Alpha;
      t.members++;
      t.points += c.points || 0;
      t.tasks += c.tasksCompleted || 0;
      if (c.status !== 'evicted') {
        t.active++;
      }
      if (c.status === 'nominated') {
        t.nominated++;
      }
    });

    Object.values(teams).forEach(t => {
      t.avgPoints = t.active > 0 ? Math.round(t.points / t.active) : 0;
    });

    return teams;
  }

  // ---- RENDER KPI TILES ----
  function renderKPICards() {
    const contestants = calculateContestantAnalytics();
    const teams = calculateTeamAnalytics();
    const state = window.AppState;
    if (!state) return;

    const topContestant = contestants[0] || { name: '—', points: 0, avatar: '👑' };
    const winLeader = contestants[0] || { name: '—', winProbability: 0, avatar: '🏆' };

    // Find best team
    const teamList = Object.values(teams).sort((a, b) => b.points - a.points);
    const bestTeam = teamList[0] || { name: 'Alpha', icon: '🦁', points: 0 };

    const totalTasks = (state.tasks || []).length;
    const completedTasks = (state.tasks || []).filter(t => t.status === 'completed').length;
    const taskRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    const nomineesCount = (state.nominees || []).length;
    const dramaLevel = state.dramaLevel || 0;

    const kpiContainer = document.getElementById('analytics-kpi-container');
    if (!kpiContainer) return;

    kpiContainer.innerHTML = `
      <div class="analytics-kpi-card highlight-lime">
        <div class="kpi-icon">🌟</div>
        <div class="kpi-label">House MVP Leader</div>
        <div class="kpi-value">${escapeHtml(topContestant.name)}</div>
        <div class="kpi-sub">${topContestant.avatar} ${topContestant.points} Total Points</div>
      </div>

      <div class="analytics-kpi-card highlight-yellow">
        <div class="kpi-icon">🎯</div>
        <div class="kpi-label">Win Probability Lead</div>
        <div class="kpi-value">${winLeader.winProbability}% Odds</div>
        <div class="kpi-sub">${winLeader.avatar} ${escapeHtml(winLeader.name)} (Heuristic Model)</div>
      </div>

      <div class="analytics-kpi-card highlight-lavender">
        <div class="kpi-icon">${bestTeam.icon}</div>
        <div class="kpi-label">Dominant Faction</div>
        <div class="kpi-value">Team ${bestTeam.name}</div>
        <div class="kpi-sub">${bestTeam.points} aggregate pts (${bestTeam.avgPoints} avg/member)</div>
      </div>

      <div class="analytics-kpi-card">
        <div class="kpi-icon">📋</div>
        <div class="kpi-label">Bounty Execution</div>
        <div class="kpi-value">${taskRate}%</div>
        <div class="kpi-sub">${completedTasks} of ${totalTasks} tasks completed</div>
      </div>

      <div class="analytics-kpi-card highlight-danger">
        <div class="kpi-icon">⚠️</div>
        <div class="kpi-label">Danger Exposure</div>
        <div class="kpi-value">${nomineesCount} at Risk</div>
        <div class="kpi-sub">Nominated for eviction</div>
      </div>

      <div class="analytics-kpi-card highlight-pink">
        <div class="kpi-icon">🔥</div>
        <div class="kpi-label">Drama Volatility</div>
        <div class="kpi-value">${dramaLevel}% Index</div>
        <div class="kpi-sub">${dramaLevel > 65 ? 'High Volatility' : 'Stable Dynamics'}</div>
      </div>
    `;
  }

  // ---- RENDER CHARTS ----
  function renderAnalyticsCharts() {
    if (typeof Chart === 'undefined') return;

    const state = window.AppState;
    if (!state || !state.contestants) return;

    const active = state.contestants.filter(c => c.status !== 'evicted');
    const sorted = [...active].sort((a, b) => b.points - a.points);
    const teams = calculateTeamAnalytics();

    // 1. BAR CHART: Contestant Points & Tasks
    const barCanvas = document.getElementById('analytics-bar-canvas');
    if (barCanvas) {
      const labels = sorted.map(c => `${c.avatar} ${c.name}`);
      const pointsData = sorted.map(c => c.points);
      const tasksData = sorted.map(c => (c.tasksCompleted || 0) * 50); // scaled for visual comparison

      if (analyticsBarChart) {
        analyticsBarChart.data.labels = labels;
        analyticsBarChart.data.datasets[0].data = pointsData;
        analyticsBarChart.data.datasets[1].data = tasksData;
        analyticsBarChart.update('none');
      } else {
        const ctx = barCanvas.getContext('2d');
        analyticsBarChart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: labels,
            datasets: [
              {
                label: 'Points',
                data: pointsData,
                backgroundColor: '#D4F77C',
                borderColor: '#121214',
                borderWidth: 2,
                borderRadius: 6,
                borderSkipped: false
              },
              {
                label: 'Task Bounty Equiv (+50/ea)',
                data: tasksData,
                backgroundColor: '#FEE159',
                borderColor: '#121214',
                borderWidth: 2,
                borderRadius: 6,
                borderSkipped: false
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                labels: {
                  font: { family: "'JetBrains Mono', monospace", size: 11, weight: 'bold' },
                  color: '#121214'
                }
              },
              tooltip: {
                backgroundColor: '#121214',
                titleFont: { family: "'JetBrains Mono', monospace" },
                padding: 10,
                cornerRadius: 8
              }
            },
            scales: {
              x: {
                ticks: { font: { family: "'JetBrains Mono', monospace", size: 10, weight: 'bold' }, color: '#121214' },
                grid: { display: false },
                border: { color: '#121214', width: 2 }
              },
              y: {
                ticks: { font: { family: "'JetBrains Mono', monospace", size: 10 }, color: '#57575e' },
                grid: { color: 'rgba(0,0,0,0.06)' },
                border: { color: '#121214', width: 2 },
                beginAtZero: true
              }
            }
          }
        });
      }
    }

    // 2. DOUGHNUT CHART: Team Point Distribution
    const doughnutCanvas = document.getElementById('analytics-doughnut-canvas');
    if (doughnutCanvas) {
      const teamLabels = ['Team Alpha 🦁', 'Team Beta ⚡', 'Team Omega ✨'];
      const teamData = [teams.Alpha.points, teams.Beta.points, teams.Omega.points];
      const teamColors = ['#D4F77C', '#FEE159', '#FF5C98'];

      if (analyticsTeamChart) {
        analyticsTeamChart.data.datasets[0].data = teamData;
        analyticsTeamChart.update('none');
      } else {
        const ctx2 = doughnutCanvas.getContext('2d');
        analyticsTeamChart = new Chart(ctx2, {
          type: 'doughnut',
          data: {
            labels: teamLabels,
            datasets: [{
              data: teamData,
              backgroundColor: teamColors,
              borderColor: '#121214',
              borderWidth: 2,
              hoverOffset: 6
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'bottom',
                labels: {
                  font: { family: "'JetBrains Mono', monospace", size: 10, weight: 'bold' },
                  color: '#121214',
                  boxWidth: 14
                }
              }
            },
            cutout: '62%'
          }
        });
      }
    }
  }

  // ---- RENDER POWER RANKINGS & WIN PROBABILITY TABLE ----
  function renderRankingsTable() {
    const tableBody = document.getElementById('analytics-rankings-tbody');
    if (!tableBody) return;

    const contestants = calculateContestantAnalytics();

    tableBody.innerHTML = contestants.map((c, index) => {
      const rankBadge = index === 0 ? '🥇 #1' : index === 1 ? '🥈 #2' : index === 2 ? '🥉 #3' : `#${index + 1}`;
      const statusPill = c.isCaptain
        ? '<span class="pill-badge" style="background:var(--accent-yellow);font-weight:900;">👑 CAPTAIN</span>'
        : c.status === 'immune'
          ? '<span class="pill-badge" style="background:var(--accent-lime);font-weight:800;">🛡️ IMMUNE</span>'
          : c.status === 'nominated'
            ? '<span class="pill-badge" style="background:var(--accent-danger);color:var(--accent-danger-ink);font-weight:800;">⚠️ DANGER</span>'
            : '<span class="pill-badge" style="background:var(--bg-paper);">ACTIVE</span>';

      return `
        <tr class="analytics-row">
          <td class="analytics-col-rank">
            <span class="rank-pill ${index < 3 ? 'rank-top' : ''}">${rankBadge}</span>
          </td>
          <td class="analytics-col-contestant">
            <div style="display:flex;align-items:center;gap:8px;">
              <span style="font-size:1.3rem;">${c.avatar || '👤'}</span>
              <div>
                <strong style="color:var(--ink-900);font-size:0.85rem;">${escapeHtml(c.name)}</strong>
                <span class="pill-badge" style="background:var(--accent-lavender);font-size:0.6rem;margin-left:4px;">Team ${c.team}</span>
              </div>
            </div>
          </td>
          <td class="analytics-col-points">
            <span style="font-family:var(--font-mono);font-weight:800;font-size:0.9rem;">${c.points} PTS</span>
          </td>
          <td class="analytics-col-tasks">
            <span style="font-family:var(--font-mono);">${c.tasksCompleted || 0} done</span>
          </td>
          <td class="analytics-col-status">
            ${statusPill}
          </td>
          <td class="analytics-col-prob">
            <div style="display:flex;align-items:center;gap:8px;">
              <div class="probability-track">
                <div class="probability-fill" style="width: ${c.winProbability}%;"></div>
              </div>
              <span style="font-family:var(--font-mono);font-weight:800;font-size:0.8rem;min-width:38px;">${c.winProbability}%</span>
            </div>
          </td>
          <td class="analytics-col-tier">
            <span class="tier-badge ${c.tierClass}">${c.tier}</span>
          </td>
        </tr>
      `;
    }).join('');
  }

  // ---- RENDER TEAM COMPARISON CARDS ----
  function renderTeamCards() {
    const container = document.getElementById('analytics-team-cards-container');
    if (!container) return;

    const teams = calculateTeamAnalytics();
    const sorted = Object.values(teams).sort((a, b) => b.points - a.points);

    container.innerHTML = sorted.map((t, i) => `
      <div class="team-comparison-card" style="border-top: 6px solid ${t.color};">
        <div class="team-card-header">
          <div style="display:flex;align-items:center;gap:8px;">
            <span style="font-size:1.6rem;">${t.icon}</span>
            <div>
              <h4 style="font-family:var(--font-serif);font-size:1.15rem;font-weight:900;margin:0;">Team ${t.name}</h4>
              <span style="font-family:var(--font-mono);font-size:0.65rem;color:var(--ink-500);">${t.members} Members (${t.active} Active)</span>
            </div>
          </div>
          <span class="pill-badge" style="background:${t.color};font-weight:800;font-size:0.7rem;">RANK #${i + 1}</span>
        </div>

        <div class="team-card-stats-grid">
          <div class="team-mini-stat">
            <span class="val">${t.points}</span>
            <span class="lbl">TOTAL SCORE</span>
          </div>
          <div class="team-mini-stat">
            <span class="val">${t.avgPoints}</span>
            <span class="lbl">AVG / MEMBER</span>
          </div>
          <div class="team-mini-stat">
            <span class="val">${t.tasks}</span>
            <span class="lbl">TASKS WON</span>
          </div>
          <div class="team-mini-stat">
            <span class="val" style="color:${t.nominated > 0 ? 'var(--accent-danger-ink)' : 'inherit'};">${t.nominated}</span>
            <span class="lbl">AT RISK</span>
          </div>
        </div>
      </div>
    `).join('');
  }

  // ---- EXPORT ANALYTICS CSV ----
  function exportAnalyticsCSV() {
    const contestants = calculateContestantAnalytics();
    if (contestants.length === 0) {
      alert('No contestant data available to export.');
      return;
    }

    let csv = 'Rank,Name,Team,Points,TasksCompleted,Status,WinProbability,Tier\r\n';
    contestants.forEach((c, i) => {
      csv += `"${i + 1}","${c.name}","${c.team}","${c.points}","${c.tasksCompleted || 0}","${c.status}","${c.winProbability}%","${c.tier}"\r\n`;
    });

    const uri = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
    const link = document.createElement('a');
    link.setAttribute('href', uri);
    link.setAttribute('download', `house_performance_analytics_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();

    if (window.playSfx) window.playSfx('beep');
  }

  // ---- HELPERS ----
  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text || '';
    return div.innerHTML;
  }

  // ---- MASTER RENDER ----
  function renderAll() {
    renderKPICards();
    renderAnalyticsCharts();
    renderRankingsTable();
    renderTeamCards();
  }

  // ---- EVENT BINDINGS ----
  function initListeners() {
    const exportBtn = document.getElementById('export-analytics-csv-btn');
    if (exportBtn) {
      exportBtn.addEventListener('click', exportAnalyticsCSV);
    }

    const refreshBtn = document.getElementById('refresh-analytics-btn');
    if (refreshBtn) {
      refreshBtn.addEventListener('click', () => {
        renderAll();
        if (window.playSfx) window.playSfx('beep');
      });
    }
  }

  // Reactive State Listener
  window.addEventListener('app:state-changed', renderAll);

  // Init on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initListeners();
      renderAll();
    });
  } else {
    initListeners();
    renderAll();
  }

  // Expose module
  window.AnalyticsModule = {
    render: renderAll,
    exportCSV: exportAnalyticsCSV,
    calculateContestantAnalytics: calculateContestantAnalytics,
    calculateTeamAnalytics: calculateTeamAnalytics
  };

})();
