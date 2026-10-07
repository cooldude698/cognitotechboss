/* ============================================
   js/tasks.js — Task Pipeline
   Owner: Prith
   Renders tasks into #tasks-list,
   handles "Mark Done" + auto-award points,
   provides new task creation form.
   ============================================ */

(function () {
  'use strict';

  const tasksContainer = document.getElementById('tasks-list');
  if (!tasksContainer) return;

  let taskCounter = 100; // for generating unique IDs

  // ---- RENDER ----
  function renderTasks() {
    const state = window.AppState;
    if (!state || !state.tasks) return;

    // Build new task form + task list
    let html = buildNewTaskForm();
    html += '<div class="tasks-items">';

    // Sort: pending first, completed last
    const sorted = [...state.tasks].sort((a, b) => {
      if (a.status === 'completed' && b.status !== 'completed') return 1;
      if (a.status !== 'completed' && b.status === 'completed') return -1;
      return 0;
    });

    if (sorted.length === 0) {
      html += '<div style="text-align:center;padding:30px;font-family:var(--font-sans);color:var(--ink-300);">No tasks yet. Create one above! 📋</div>';
    }

    sorted.forEach(task => {
      const isDone = task.status === 'completed';
      const assigneeName = getAssigneeName(task.assignedTo);

      html += `
        <div class="task-card ${isDone ? 'completed' : ''}" data-task-id="${task.id}">
          <div class="task-info">
            <div class="task-title">${escapeHtml(task.title)}</div>
            <div class="task-meta">
              <span class="task-bounty">
                <i class="fa-solid fa-coins"></i> +${task.points}
              </span>
              <span class="task-assignee">
                <i class="fa-solid fa-user-tag"></i> ${assigneeName}
              </span>
              <span class="task-status-badge ${isDone ? 'completed' : 'pending'}">
                ${isDone ? '✅ DONE' : '⏳ PENDING'}
              </span>
            </div>
          </div>
          <div class="task-actions">
            <button class="btn-mark-done" 
                    data-task-id="${task.id}" 
                    ${isDone ? 'disabled' : ''}
                    onclick="TaskModule.completeTask('${task.id}')">
              <i class="fa-solid ${isDone ? 'fa-check-double' : 'fa-check'}"></i>
              ${isDone ? 'Completed' : 'Mark Done'}
            </button>
          </div>
        </div>
      `;
    });

    html += '</div>';
    tasksContainer.innerHTML = html;

    // Attach form listener
    const form = document.getElementById('new-task-form');
    if (form) {
      form.addEventListener('submit', handleCreateTask);
    }
  }

  // ---- NEW TASK FORM HTML ----
  function buildNewTaskForm() {
    const state = window.AppState;
    const contestants = (state && state.contestants) ? state.contestants.filter(c => c.status !== 'evicted') : [];

    let options = '<option value="all">🏠 All House</option>';
    contestants.forEach(c => {
      options += `<option value="${c.id}">${c.avatar} ${c.name}</option>`;
    });

    return `
      <form id="new-task-form" class="new-task-form">
        <div class="form-row">
          <input type="text" id="task-title-input" placeholder="Task title..." required />
          <input type="number" id="task-points-input" placeholder="Points" min="10" max="500" value="100" required style="max-width:100px;" />
        </div>
        <div class="form-row">
          <select id="task-assignee-input">
            ${options}
          </select>
          <button type="submit" class="btn-create-task">
            <i class="fa-solid fa-plus"></i> Create Task
          </button>
        </div>
      </form>
    `;
  }

  // ---- CREATE TASK ----
  function handleCreateTask(e) {
    e.preventDefault();

    const titleInput = document.getElementById('task-title-input');
    const pointsInput = document.getElementById('task-points-input');
    const assigneeInput = document.getElementById('task-assignee-input');

    const title = titleInput.value.trim();
    const points = parseInt(pointsInput.value, 10) || 100;
    const assignedTo = assigneeInput.value;

    if (!title) return;

    taskCounter++;
    const newTask = {
      id: 't_' + taskCounter,
      title: title,
      points: points,
      assignedTo: assignedTo,
      status: 'pending',
      createdAt: Date.now(),
      completedAt: null,
      completedBy: null
    };

    window.AppState.tasks.push(newTask);

    // Dispatch event
    if (typeof window.dispatchStateChange === 'function') {
      window.dispatchStateChange('TASK_CREATE', {
        title: title,
        points: points,
        assignedTo: assignedTo
      });
    }

    if (typeof window.playSfx === 'function') {
      window.playSfx('beep');
    }

    renderTasks();
  }

  // ---- COMPLETE TASK ----
  function completeTask(taskId) {
    const state = window.AppState;
    if (!state || !state.tasks) return;

    const task = state.tasks.find(t => t.id === taskId);
    if (!task || task.status === 'completed') return;

    task.status = 'completed';
    task.completedAt = Date.now();

    // Award points to assigned contestant(s)
    if (task.assignedTo === 'all') {
      // Award to ALL active contestants
      state.contestants.forEach(c => {
        if (c.status !== 'evicted') {
          c.points += task.points;
          if (c.history) {
            c.history.push({
              timestamp: Date.now(),
              delta: task.points,
              reason: `Task completed: ${task.title}`
            });
          }
          c.tasksCompleted = (c.tasksCompleted || 0) + 1;
        }
      });
      task.completedBy = 'all';
    } else {
      // Award to specific contestant
      const contestant = state.contestants.find(c => c.id === task.assignedTo);
      if (contestant) {
        contestant.points += task.points;
        if (contestant.history) {
          contestant.history.push({
            timestamp: Date.now(),
            delta: task.points,
            reason: `Task completed: ${task.title}`
          });
        }
        contestant.tasksCompleted = (contestant.tasksCompleted || 0) + 1;
        task.completedBy = contestant.id;
      }
    }

    // Dispatch
    if (typeof window.dispatchStateChange === 'function') {
      window.dispatchStateChange('TASK_COMPLETE', {
        taskId: task.id,
        completedBy: task.completedBy,
        pointReward: task.points,
        assignedTo: task.assignedTo
      });
    }

    if (typeof window.playSfx === 'function') {
      window.playSfx('beep');
    }

    renderTasks();
  }

  // ---- HELPERS ----
  function getAssigneeName(assignedTo) {
    if (assignedTo === 'all') return '🏠 All House';
    const state = window.AppState;
    if (!state || !state.contestants) return assignedTo;
    const c = state.contestants.find(x => x.id === assignedTo);
    return c ? `${c.avatar} ${c.name}` : assignedTo;
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // ---- REACTIVE LISTENER ----
  window.addEventListener('app:state-changed', renderTasks);

  // ---- INITIAL RENDER ----
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderTasks);
  } else {
    renderTasks();
  }

  // ---- EXPOSE ----
  window.TaskModule = {
    completeTask: completeTask,
    render: renderTasks
  };

})();
