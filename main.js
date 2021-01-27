async function activeTabs() {
  const tabs = await browser.tabs.query({ currentWindow: true });
  return tabs.sort((a, b) => a.index - b.index);
}

function focusTab(tabId) {
  browser.tabs.update(tabId, { active: true });
}

async function switchTo(number) {
  const tabs = await activeTabs();
  if (tabs.length < number) {
    focusTab(tabs[tabs.length - 1].id);
  } else {
    focusTab(tabs[number - 1].id);
  }
}

const handlers = new Map([
  ["go-tab-1", () => switchTo(1)],
  ["go-tab-2", () => switchTo(2)],
  ["go-tab-3", () => switchTo(3)],
  ["go-tab-4", () => switchTo(4)],
  ["go-tab-5", () => switchTo(5)],
  ["go-tab-6", () => switchTo(6)],
  ["go-tab-7", () => switchTo(7)],
  ["go-tab-8", () => switchTo(8)],
  ["go-tab-last", () => switchTo(Infinity)],
]);

(() => {
  browser.commands.onCommand.addListener((command) => {
    const handler = handlers.get(command);
    if (handler) {
      handler();
    }
  });
})();
