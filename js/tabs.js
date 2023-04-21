const generateTabs = function ({
  tabsWrapper: tabsWrapperItem,
  tabsWrapperSelector,
  tabItemSelector,
  progressSelector,
  onChange,
}) {
  const tabsWrapper =
    tabsWrapperItem ?? document.querySelector(tabsWrapperSelector);
  const tabs = tabsWrapper
    ? tabsWrapper.querySelectorAll(tabItemSelector)
    : document.querySelectorAll(tabItemSelector);
  const eventsDispatchers = tabsWrapper
    ? tabsWrapper.querySelectorAll('[data-event ^="tab-"]')
    : document.querySelectorAll('[data-event ^="tab-"]');

  const tabsLength = tabs?.length ?? 0;

  let activeTab = 0;

  const setActciveTab = (index) => {
    tabs.forEach((item, i) => {
      if (index === i) {
        item.classList.add("active");
        if (onChange) onChange(index, item);
      } else item.classList.remove("active");
    });
    activeTab = index;
    setProgress();
  };
  const setProgress = () => {
    if (!progressSelector) return;
    const porgressItem = document.querySelector(progressSelector);
    let progress = (100 / tabsLength) * activeTab;
    porgressItem.style = `width: ${progress}%`;
  };
  const nextTab = () => {
    if (activeTab + 1 <= tabsLength) setActciveTab(activeTab + 1);
  };
  const prevTab = () => {
    if (activeTab - 1 >= 0) setActciveTab(activeTab - 1);
  };
  const toggleParent = (target) => {
    tabs.forEach((item, i) => {
      if (item === target && !target.classList.contains("active")) {
        item.classList.add("active");
        if (onChange) onChange(i, item);
        activeTab = i;
      } else if (item === target && target.classList.contains("active")) {
        item.classList.remove("active");
      } else item.classList.remove("active");
    });

    setProgress();
  };

  eventsDispatchers.forEach((item) => {
    const action = item.getAttribute("data-event");
    item.onclick = (event) => {
      switch (action) {
        case "tab-toggle-parent":
          toggleParent(event.target.parentElement);
          break;
        case "tab-next":
          nextTab();
          break;
        case "tab-back":
          prevTab();
          break;

        default:
          break;
      }
    };
  });

  setActciveTab(activeTab);
  return this;
};

generateTabs({
  tabsWrapperSelector: ".tabs__inner",
  tabItemSelector: ".tabs__inner-item",
});

document.querySelectorAll(".subTabs").forEach((subTab) => {
  generateTabs({
    tabsWrapper: subTab,
    tabItemSelector: ".subTabs__item",
  });
});
