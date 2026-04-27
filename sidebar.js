// sidebar.js — MUI-style collapsible sidebar groups
// Converts .sidebar-label divs into toggle-able group headers at runtime.
// No HTML changes needed on individual pages.

document.addEventListener('DOMContentLoaded', function () {
  var sidebar = document.querySelector('.sidebar');
  if (!sidebar) return;

  var labels = Array.from(sidebar.querySelectorAll('.sidebar-label'));
  labels.forEach(function (label) {
    var marginTop = label.style.marginTop || '';

    // Collect all siblings that belong to this group
    // (until next .sidebar-label, .sidebar-home, or end of sidebar)
    var items = [];
    var el = label.nextElementSibling;
    while (el && !el.classList.contains('sidebar-label') && !el.classList.contains('sidebar-home')) {
      items.push(el);
      el = el.nextElementSibling;
    }

    // Build group wrapper
    var group = document.createElement('div');
    group.className = 'sidebar-group';
    if (marginTop) group.style.marginTop = marginTop;

    // Build toggle button
    var btn = document.createElement('button');
    btn.className = 'sidebar-group-btn';
    btn.setAttribute('aria-expanded', 'true');
    btn.innerHTML =
      '<span>' + label.textContent.trim() + '</span>' +
      '<i class="ti ti-chevron-down sidebar-chevron"></i>';

    // Build items container — move (not clone) nodes to preserve listeners
    var container = document.createElement('div');
    container.className = 'sidebar-group-items';
    items.forEach(function (item) { container.appendChild(item); });

    group.appendChild(btn);
    group.appendChild(container);

    // Insert group before the label, then remove original label
    label.parentNode.insertBefore(group, label);
    label.remove();

    // Toggle collapse
    btn.addEventListener('click', function () {
      var collapsed = group.classList.toggle('collapsed');
      btn.setAttribute('aria-expanded', collapsed ? 'false' : 'true');
    });
  });
});
