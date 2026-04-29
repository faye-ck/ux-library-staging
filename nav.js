// nav.js — unified collapsible sidebar navigation (MUI-style deep tree)
// Injects the full nav tree into every .sidebar element, marks the active
// page, and auto-expands ancestor groups.

(function () {
  // ── NAV TREE ─────────────────────────────────────────────────────────────
  // Each node: { label, href?, icon?, children? }
  // icon only appears on items where specified; sub-items at depth >= 1 get
  // no icon unless they have an explicit icon property.
  var NAV = [
    { label: 'Home', href: '/index.html' },
    {
      label: 'Global', children: [
        { label: 'Overview',  href: '/global/_index.html' },
        {
          label: 'Foundations', children: [
            { label: 'Color System',           href: '/global/foundations/color-system.html' },
            { label: 'Typography',             href: '/global/foundations/typography.html' },
            { label: 'Spacing',                href: '/global/foundations/spacing.html' },
            { label: 'Motion',                 href: '/global/foundations/motion.html' },
            { label: 'Iconography',            href: '/global/foundations/iconography.html' },
            { label: 'Accessibility',          href: '/global/foundations/accessibility.html' },
            { label: 'Error Patterns',         href: '/global/foundations/error-patterns.html' },
            { label: 'Empty States',           href: '/global/foundations/empty-states.html' },
            { label: 'Loading States',         href: '/global/foundations/loading-states.html' },
            { label: 'Notification Patterns',  href: '/global/foundations/notification-patterns.html' },
          ]
        },
        {
          label: 'Components', children: [
            {
              label: 'Inputs', children: [
                { label: 'Autocomplete',   href: '/global/components/autocomplete.html' },
                { label: 'Button',         href: '/global/components/button.html' },
                { label: 'Button Group',   href: '/global/components/button-group.html' },
                { label: 'Checkbox',       href: '/global/components/checkbox.html' },
                { label: 'FAB',            href: '/global/components/fab.html' },
                { label: 'Number Field',   href: '/global/components/number-field.html' },
                { label: 'Radio Group',    href: '/global/components/radio-group.html' },
                { label: 'Select',         href: '/global/components/select.html' },
                { label: 'Slider',         href: '/global/components/slider.html' },
                { label: 'Switch',         href: '/global/components/switch.html' },
                { label: 'Text Field',     href: '/global/components/text-field.html' },
                { label: 'Toggle Button',  href: '/global/components/toggle-button.html' },
              ]
            },
            {
              label: 'Data Display', children: [
                { label: 'Avatar',   href: '/global/components/avatar.html' },
                { label: 'Badge',    href: '/global/components/badge.html' },
                { label: 'Chip',     href: '/global/components/chip.html' },
                { label: 'Divider',  href: '/global/components/divider.html' },
                { label: 'List',     href: '/global/components/list.html' },
                { label: 'Table',    href: '/global/components/table.html' },
                { label: 'Tooltip',  href: '/global/components/tooltip.html' },
              ]
            },
            {
              label: 'Feedback', children: [
                { label: 'Alert',     href: '/global/components/alert.html' },
                { label: 'Backdrop',  href: '/global/components/backdrop.html' },
                { label: 'Dialog',    href: '/global/components/dialog.html' },
                { label: 'Progress',  href: '/global/components/progress.html' },
                { label: 'Snackbar',  href: '/global/components/snackbar.html' },
              ]
            },
            {
              label: 'Surfaces', children: [
                { label: 'Accordion',  href: '/global/components/accordion.html' },
                { label: 'App Bar',    href: '/global/components/app-bar.html' },
                { label: 'Card',       href: '/global/components/card.html' },
              ]
            },
            {
              label: 'Navigation', children: [
                { label: 'Breadcrumbs',  href: '/global/components/breadcrumbs.html' },
                { label: 'Drawer',       href: '/global/components/drawer.html' },
                { label: 'Link',         href: '/global/components/link.html' },
                { label: 'Menu',         href: '/global/components/menu.html' },
                { label: 'Menubar',      href: '/global/components/menubar.html' },
                { label: 'Pagination',   href: '/global/components/pagination.html' },
                { label: 'Tabs',         href: '/global/components/tabs.html' },
              ]
            },
            {
              label: 'Utilities', children: [
                { label: 'Popover',              href: '/global/components/popover.html' },
                { label: 'Textarea Autoresize',  href: '/global/components/textarea-autoresize.html' },
                { label: 'Date Picker',          href: '/global/components/date-picker.html' },
                { label: 'Date Calendar',        href: '/global/components/date-calendar.html' },
                { label: 'Time Picker',          href: '/global/components/time-picker.html' },
              ]
            },
          ]
        },
        {
          label: 'Config', children: [
            { label: 'Layout',      href: '/global/_layout.html' },
            { label: 'Guidelines',  href: '/global/_guidelines.html' },
            { label: 'Glossary',    href: '/global/_glossary.html' },
          ]
        },
        {
          label: 'Data', children: [
            { label: 'Entity Type', href: '/global/data/entity-type.html' },
          ]
        },
        { label: 'Changelog', href: '/global/changelog.html' },
      ]
    },
    {
      label: 'Biz', children: [
        { label: 'Overview',    href: '/biz/_index.html' },
        {
          label: 'Config', children: [
            { label: 'Theme',       href: '/biz/_theme.html' },
            { label: 'Components',  href: '/biz/_components.html' },
            { label: 'Layout',      href: '/biz/_layout.html' },
            { label: 'Guidelines',  href: '/biz/_guidelines.html' },
            { label: 'Glossary',    href: '/biz/_glossary.html' },
          ]
        },
        {
          label: 'Office Map', children: [
            { label: 'Feature',       href: '/biz/office-map/feature.html' },
            { label: 'Mobile Web',    href: '/biz/office-map/mobile-web.html' },
            { label: 'Mobile App',    href: '/biz/office-map/mobile-app.html' },
            { label: 'Admin Portal',  href: '/biz/office-map/admin-portal.html' },
            { label: 'Room Signage',  href: '/biz/office-map/room-signage.html' },
          ]
        },
        {
          label: 'Reception', children: [
            { label: 'Feature',              href: '/biz/reception/feature.html' },
            { label: 'Mobile Web',           href: '/biz/reception/mobile-web.html' },
            { label: 'Receptionist Portal',  href: '/biz/reception/receptionist-portal.html' },
            { label: 'Admin Portal',         href: '/biz/reception/admin-portal.html' },
            { label: 'Email',                href: '/biz/reception/email.html' },
          ]
        },
        {
          label: 'Scheduler', children: [
            { label: 'Feature',       href: '/biz/scheduler/feature.html' },
            { label: 'Mobile Web',    href: '/biz/scheduler/mobile-web.html' },
            { label: 'Mobile App',    href: '/biz/scheduler/mobile-app.html' },
            { label: 'Admin Portal',  href: '/biz/scheduler/admin-portal.html' },
          ]
        },
        {
          label: 'Inventory', children: [
            { label: 'Feature',       href: '/biz/inventory/feature.html' },
            { label: 'Mobile Web',    href: '/biz/inventory/mobile-web.html' },
            { label: 'Admin Portal',  href: '/biz/inventory/admin-portal.html' },
          ]
        },
        {
          label: 'Locker', children: [
            { label: 'Feature',       href: '/biz/locker/feature.html' },
            { label: 'Mobile Web',    href: '/biz/locker/mobile-web.html' },
            { label: 'Admin Portal',  href: '/biz/locker/admin-portal.html' },
          ]
        },
        {
          label: 'Post', children: [
            { label: 'Feature',       href: '/biz/post/feature.html' },
            { label: 'Mobile Web',    href: '/biz/post/mobile-web.html' },
            { label: 'Admin Portal',  href: '/biz/post/admin-portal.html' },
          ]
        },
        {
          label: 'Analytics', children: [
            { label: 'Admin Portal',  href: '/biz/analytics/admin-portal.html' },
          ]
        },
        { label: 'Changelog',   href: '/biz/changelog.html' },
      ]
    },
    {
      label: 'Workflows', children: [
        { label: 'Overview',    href: '/workflows/_index.html' },
        {
          label: 'Config', children: [
            { label: 'Theme',       href: '/workflows/_theme.html' },
            { label: 'Components',  href: '/workflows/_components.html' },
            { label: 'Layout',      href: '/workflows/_layout.html' },
            { label: 'Guidelines',  href: '/workflows/_guidelines.html' },
            { label: 'Glossary',    href: '/workflows/_glossary.html' },
          ]
        },
        { label: 'Changelog', href: '/workflows/changelog.html' },
      ]
    },
    {
      label: 'CKID', children: [
        { label: 'Overview',    href: '/ckid/_index.html' },
        {
          label: 'Config', children: [
            { label: 'Theme',       href: '/ckid/_theme.html' },
            { label: 'Components',  href: '/ckid/_components.html' },
            { label: 'Layout',      href: '/ckid/_layout.html' },
            { label: 'Guidelines',  href: '/ckid/_guidelines.html' },
            { label: 'Glossary',    href: '/ckid/_glossary.html' },
          ]
        },
        {
          label: 'Org Chart', children: [
            { label: 'Feature',     href: '/ckid/org-chart/feature.html' },
            { label: 'Mobile Web',  href: '/ckid/org-chart/mobile-web.html' },
          ]
        },
        {
          label: 'Team Management', children: [
            { label: 'Feature',     href: '/ckid/team-management/feature.html' },
            { label: 'Mobile Web',  href: '/ckid/team-management/mobile-web.html' },
          ]
        },
        {
          label: 'User Management', children: [
            { label: 'Feature',     href: '/ckid/user-management/feature.html' },
            { label: 'Mobile Web',  href: '/ckid/user-management/mobile-web.html' },
          ]
        },
        { label: 'Changelog', href: '/ckid/changelog.html' },
      ]
    },
    {
      label: 'Intra', children: [
        { label: 'Overview',    href: '/intra/_index.html' },
        {
          label: 'Config', children: [
            { label: 'Theme',       href: '/intra/_theme.html' },
            { label: 'Components',  href: '/intra/_components.html' },
            { label: 'Layout',      href: '/intra/_layout.html' },
            { label: 'Guidelines',  href: '/intra/_guidelines.html' },
            { label: 'Glossary',    href: '/intra/_glossary.html' },
          ]
        },
        {
          label: 'Dashboard', children: [
            { label: 'Feature',     href: '/intra/dashboard/feature.html' },
            { label: 'Mobile Web',  href: '/intra/dashboard/mobile-web.html' },
          ]
        },
        {
          label: 'Page Management', children: [
            { label: 'Feature',     href: '/intra/page-management/feature.html' },
            { label: 'Mobile Web',  href: '/intra/page-management/mobile-web.html' },
          ]
        },
        {
          label: 'Theming', children: [
            { label: 'Feature',  href: '/intra/theming/feature.html' },
          ]
        },
        { label: 'Changelog', href: '/intra/changelog.html' },
      ]
    },
    {
      label: 'Files', children: [
        { label: 'Overview',    href: '/files/_index.html' },
        {
          label: 'Config', children: [
            { label: 'Theme',       href: '/files/_theme.html' },
            { label: 'Components',  href: '/files/_components.html' },
            { label: 'Layout',      href: '/files/_layout.html' },
            { label: 'Guidelines',  href: '/files/_guidelines.html' },
            { label: 'Glossary',    href: '/files/_glossary.html' },
          ]
        },
        {
          label: 'File Management', children: [
            { label: 'Feature',     href: '/files/file-management/feature.html' },
            { label: 'Mobile Web',  href: '/files/file-management/mobile-web.html' },
          ]
        },
        { label: 'Changelog', href: '/files/changelog.html' },
      ]
    },
    {
      label: 'Updates', children: [
        { label: 'Overview',    href: '/updates/_index.html' },
        {
          label: 'Config', children: [
            { label: 'Theme',       href: '/updates/_theme.html' },
            { label: 'Components',  href: '/updates/_components.html' },
            { label: 'Layout',      href: '/updates/_layout.html' },
            { label: 'Guidelines',  href: '/updates/_guidelines.html' },
            { label: 'Glossary',    href: '/updates/_glossary.html' },
          ]
        },
        {
          label: 'Task Management', children: [
            { label: 'Feature',     href: '/updates/task-management/feature.html' },
            { label: 'Mobile Web',  href: '/updates/task-management/mobile-web.html' },
          ]
        },
        { label: 'Changelog', href: '/updates/changelog.html' },
      ]
    },
    {
      label: 'Goals', children: [
        { label: 'Overview',    href: '/goals/_index.html' },
        {
          label: 'Config', children: [
            { label: 'Theme',       href: '/goals/_theme.html' },
            { label: 'Components',  href: '/goals/_components.html' },
            { label: 'Layout',      href: '/goals/_layout.html' },
            { label: 'Guidelines',  href: '/goals/_guidelines.html' },
            { label: 'Glossary',    href: '/goals/_glossary.html' },
          ]
        },
        {
          label: 'KPI Management', children: [
            { label: 'Feature',     href: '/goals/kpi-management/feature.html' },
            { label: 'Mobile Web',  href: '/goals/kpi-management/mobile-web.html' },
          ]
        },
        {
          label: 'Goals & OKRs', children: [
            { label: 'Feature',     href: '/goals/goals-okrs/feature.html' },
            { label: 'Mobile Web',  href: '/goals/goals-okrs/mobile-web.html' },
          ]
        },
        { label: 'Changelog', href: '/goals/changelog.html' },
      ]
    },
    { label: 'Figma Tips', href: '/figma-tips/index.html' },
  ];

  // ── HELPERS ───────────────────────────────────────────────────────────────

  // Normalise a pathname for comparison
  // Strips .html extension and trailing slash so both
  // /foo/bar.html and /foo/bar (served by npx serve) match the same entry.
  function normPath(p) {
    return p.replace(/\.html$/, '').replace(/\/$/, '').toLowerCase();
  }

  var currentPath = normPath(window.location.pathname);

  // ── SESSION STATE ─────────────────────────────────────────────────────────
  // Persist which groups are open across page navigations using sessionStorage.
  // Key: flat label path joined by '|', e.g. "Biz|Office Map"
  var SS_KEY = 'ux_nav_open';

  function loadOpenSet() {
    try {
      var raw = sessionStorage.getItem(SS_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) { return []; }
  }

  function saveOpenSet(arr) {
    try { sessionStorage.setItem(SS_KEY, JSON.stringify(arr)); } catch (e) {}
  }

  // ── BUILD ─────────────────────────────────────────────────────────────────
  // Build DOM nodes for the tree.
  // Returns { fragment, hasActive, activeLabelPath[] }
  // labelPath = array of ancestor group labels leading to the active leaf.
  function buildNodes(nodes, depth, parentLabelPath) {
    var fragment = document.createDocumentFragment();
    var anyActive = false;
    var activeLabels = [];

    nodes.forEach(function (node) {
      if (node.divider) {
        var div = document.createElement('div');
        div.className = 'sidebar-divider';
        fragment.appendChild(div);
        return;
      }

      var paddingLeft = 16 + depth * 22;
      var myLabelPath = parentLabelPath.concat(node.label);
      var myKey = myLabelPath.join('|');

      if (node.children) {
        var group = document.createElement('div');
        // depth-0 → nav-group--product (bold, bigger, normal case)
        // depth>0 → nav-group--section (ALL-CAPS label)
        var depthClass = depth === 0 ? ' nav-group--product' : ' nav-group--section';
        group.className = 'nav-group collapsed' + depthClass;
        group.dataset.navKey = myKey;
        // CSS var inherited by nav-group-items::before for the vertical tree line
        group.style.setProperty('--border-x', (paddingLeft + 8) + 'px');

        var btn = document.createElement('button');
        btn.className = 'nav-group-btn';
        btn.style.paddingLeft = paddingLeft + 'px';
        btn.setAttribute('aria-expanded', 'false');

        // Chevron FIRST (left-aligned), then optional icon, then label, then optional badge
        var inner = '<i class="ti ti-chevron-right nav-chevron"></i>';
        if (depth === 0 && node.icon) {
          inner += '<i class="ti ' + node.icon + ' nav-icon"></i>';
        }
        inner += '<span>' + node.label + '</span>';
        if (depth === 0 && node.badge) {
          inner += '<span class="nav-badge">' + node.badge + '</span>';
        }
        btn.innerHTML = inner;

        var itemsEl = document.createElement('div');
        itemsEl.className = 'nav-group-items';

        var built = buildNodes(node.children, depth + 1, myLabelPath);
        itemsEl.appendChild(built.fragment);

        if (built.hasActive) {
          anyActive = true;
          activeLabels = built.activeLabelPath;
        }

        group.appendChild(btn);
        group.appendChild(itemsEl);
        fragment.appendChild(group);

        btn.addEventListener('click', function () {
          var isCollapsed = group.classList.toggle('collapsed');
          btn.setAttribute('aria-expanded', isCollapsed ? 'false' : 'true');
          // Persist state
          var openSet = loadOpenSet();
          if (isCollapsed) {
            openSet = openSet.filter(function (k) { return k !== myKey; });
          } else {
            if (openSet.indexOf(myKey) === -1) openSet.push(myKey);
          }
          saveOpenSet(openSet);
        });

      } else if (node.href) {
        var a = document.createElement('a');
        a.href = node.href;
        a.style.paddingLeft = paddingLeft + 'px';
        // Depth-0 flat links: consistent vertical spacing
        if (depth === 0) {
          a.style.paddingTop = '6px';
          a.style.paddingBottom = '6px';
        }

        var linkInner = '';
        if (node.icon) {
          linkInner += '<i class="ti ' + node.icon + ' nav-icon"></i>';
        }
        linkInner += node.label;
        a.innerHTML = linkInner;

        var nodeNorm = normPath(node.href);
        var isActive = nodeNorm === currentPath ||
          (nodeNorm === '/index' && (currentPath === '' || currentPath === '/'));
        if (isActive) {
          a.classList.add('active');
          anyActive = true;
          activeLabels = myLabelPath;
        }

        fragment.appendChild(a);
      }
    });

    return { fragment: fragment, hasActive: anyActive, activeLabelPath: activeLabels };
  }

  // ── INJECT ────────────────────────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', function () {
    var sidebars = document.querySelectorAll('.sidebar');
    sidebars.forEach(function (sidebar) {
      sidebar.innerHTML = '';
      var built = buildNodes(NAV, 0, []);
      sidebar.appendChild(built.fragment);

      // Determine which groups to open:
      // 1. Previously-open groups (from sessionStorage)
      // 2. Ancestor groups of the active page (always ensure these are open)
      var openSet = loadOpenSet();

      // Add active ancestors to the open set (they must always be open)
      if (built.activeLabelPath.length > 0) {
        // Build all ancestor keys: for path ["Biz","Office Map","User Portal"]
        // add "Biz" and "Biz|Office Map"
        for (var i = 1; i < built.activeLabelPath.length; i++) {
          var ancestorKey = built.activeLabelPath.slice(0, i).join('|');
          if (openSet.indexOf(ancestorKey) === -1) openSet.push(ancestorKey);
        }
        saveOpenSet(openSet);
      }

      // Apply open state to all groups
      var groups = sidebar.querySelectorAll('.nav-group');
      groups.forEach(function (group) {
        var key = group.dataset.navKey;
        if (openSet.indexOf(key) !== -1) {
          group.classList.remove('collapsed');
          var btn = group.querySelector('.nav-group-btn');
          if (btn) btn.setAttribute('aria-expanded', 'true');
        }
      });

      // Restore sidebar scroll position from previous page navigation
      var SS_SCROLL = 'ux_nav_scroll';
      try {
        var savedScroll = sessionStorage.getItem(SS_SCROLL);
        if (savedScroll !== null) {
          sidebar.scrollTop = parseInt(savedScroll, 10);
          sessionStorage.removeItem(SS_SCROLL);
        }
      } catch (e) {}
    });
  });

  // ── FOOTER INJECTION ─────────────────────────────────────────────────────
  // Injects the site footer into every <main> element.
  // Uses absolute paths so it works regardless of page depth.
  document.addEventListener('DOMContentLoaded', function () {
    var mains = document.querySelectorAll('main');
    mains.forEach(function (main) {
      var footer = document.createElement('footer');
      footer.className = 'site-footer';
      footer.innerHTML =
        '<a href="/changelog.html"><i class="ti ti-clock-history"></i> Site Changelog</a>' +
        '<span class="site-footer-sep">·</span>' +
        '<a href="/sitemap.html">Sitemap</a>' +
        '<span class="site-footer-sep">·</span>' +
        '<a href="/figma-tips/index.html">Figma Tips</a>' +
        '<span class="site-footer-version">v2.0.0 · 2026-04-27</span>';
      main.appendChild(footer);
    });
  });

  // ── SAVE SCROLL POSITION BEFORE NAVIGATION ────────────────────────────────
  // Persist the sidebar's scrollTop so the next page can restore it.
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[href]');
    if (!a) return;
    var href = a.getAttribute('href');
    // Only save for same-origin navigations (ignore anchors, external links)
    if (!href || /^(https?:|mailto:|tel:|#)/.test(href)) return;
    try {
      var sidebar = document.querySelector('.sidebar');
      if (sidebar) sessionStorage.setItem('ux_nav_scroll', sidebar.scrollTop);
    } catch (e) {}
  });
})();
