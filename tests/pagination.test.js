const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

function patchHtml(html) {
  html = html
    .replace(/<link[^>]*bootstrap[^>]*>/, '')
    .replace(/<link[^>]*font-awesome[^>]*>/, '');

  const pattern = /renderResources\(currentPage\);\s*renderCustomPagination\(\);/g;
  let last;
  let match;
  while ((match = pattern.exec(html))) {
    last = match;
  }
  if (last) {
    const injection = [
      'window.renderResources = renderResources;',
      'window.renderCustomPagination = renderCustomPagination;',
      'window.resources = resources;',
      'window.perPage = perPage;',
      last[0],
    ].join('\n');
    html = html.slice(0, last.index) + injection + html.slice(last.index + last[0].length);
  }
  return html;
}

async function loadDom() {
  let html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
  html = patchHtml(html);

  const dom = new JSDOM(html, {
    url: 'http://localhost',
    runScripts: 'dangerously',
    resources: 'usable',
    pretendToBeVisual: true,
  });
  dom.window.matchMedia = dom.window.matchMedia || function () {
    return { matches: false, media: '', addListener() {}, removeListener() {} };
  };

  await new Promise(resolve => {
    if (dom.window.document.readyState === 'complete' || dom.window.document.readyState === 'interactive') {
      resolve();
    } else {
      dom.window.addEventListener('DOMContentLoaded', () => resolve());
    }
  });
  return dom;
}

test('pagination renders correct number of items and navigation works', async () => {
  const dom = await loadDom();
  const { document, renderResources, perPage, resources } = dom.window;

  renderResources(1);
  expect(document.querySelectorAll('.resource-link').length).toBe(perPage);

  document.querySelector('#custom-pagination button:last-child').click();
  const remaining = resources.length - perPage;
  const infoText = document.querySelector('#custom-pagination .page-info-custom').textContent;
  expect(infoText).toMatch(/Page\s+2/);
  expect(document.querySelectorAll('.resource-link').length).toBe(remaining);

  document.querySelector('#custom-pagination button:first-child').click();
  const infoBack = document.querySelector('#custom-pagination .page-info-custom').textContent;
  expect(infoBack).toMatch(/Page\s+1/);
  expect(document.querySelectorAll('.resource-link').length).toBe(perPage);
});
