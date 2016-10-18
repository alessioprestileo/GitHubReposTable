'use strict';

(function () {
  var tableElemRef = void 0;
  var paginatorElemRef = void 0;
  var totPages = void 0;
  var setActivePageItem = function setActivePageItem(pageNum) {
    for (var i = 1; i <= totPages; i++) {
      paginatorElemRef.getElementsByTagName('li')[i].classList.remove('active');
      if (i === pageNum) {
        paginatorElemRef.getElementsByTagName('li')[i].classList.add('active');
      }
    }
  };
  var setCurrentPage = function setCurrentPage(pageNum) {
    tableElemRef.dataset.currentPage = pageNum - 1;
  };
  var onPageClicked = function onPageClicked(event) {
    var pageLabel = event.target.innerText[0];
    var pageNum = parseInt(pageLabel);
    setCurrentPage(pageNum);
    setActivePageItem(pageNum);
  };
  var onPageHoveredIn = function onPageHoveredIn(event) {
    event.target.style.textDecoration = 'underline';
  };
  var onPageHoveredOut = function onPageHoveredOut(event) {
    event.target.style.textDecoration = 'none';
  };

  window.app.tablePaginator = {};
  window.app.tablePaginator.getItemsByPage = function (tableInput) {
    var itemsByPage = [];
    var items = tableInput.items;
    var itemsPerPage = tableInput.itemsPerPage;
    var sliceStart = 0;
    var sliceEnd = void 0;
    do {
      sliceEnd = sliceStart + itemsPerPage <= items.length ? sliceStart + itemsPerPage : items.length;
      itemsByPage.push(items.slice(sliceStart, sliceEnd));
      sliceStart += itemsPerPage;
    } while (sliceStart < items.length);
    return itemsByPage;
  };
  window.app.tablePaginator.initialize = function (itemsByPage, tableElem, paginatorElem) {
    tableElemRef = tableElem;
    paginatorElemRef = paginatorElem;
    var uList = paginatorElem.getElementsByTagName('ul')[0];
    var linkToNext = uList.getElementsByTagName('li')[1];
    var length = itemsByPage.length;
    totPages = length;
    for (var i = 1; i <= length; i++) {
      var listItem = document.createElement("LI");
      listItem.setAttribute("class", "page-item");
      listItem.onclick = onPageClicked;
      var anchor = document.createElement("A");
      anchor.setAttribute("class", "page-link");
      anchor.onmouseenter = onPageHoveredIn;
      anchor.onmouseleave = onPageHoveredOut;
      var anchorText = document.createTextNode(i.toString());
      var span = document.createElement("SPAN");
      span.setAttribute("class", "sr-only");
      var spanText = document.createTextNode(i.toString());
      listItem.appendChild(anchor);
      anchor.appendChild(anchorText);
      anchor.appendChild(span);
      span.appendChild(spanText);
      uList.insertBefore(listItem, linkToNext);
      if (i === 1) {
        listItem.classList.add('active');
      }
    }
  };
})();

//# sourceMappingURL=paginator_logic-compiled.js.map