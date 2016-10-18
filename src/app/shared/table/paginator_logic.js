(
  function() {
    let tableElemRef;
    let paginatorElemRef;
    let totPages;
    let setActivePageItem = function(pageNum) {
      for (let i = 1; i <= totPages; i++) {
        paginatorElemRef.getElementsByTagName('li')[i]
          .classList.remove('active');
        if (i === pageNum) {
          paginatorElemRef.getElementsByTagName('li')[i]
            .classList.add('active');
        }
      }
    };
    let setCurrentPage = function(pageNum) {
      tableElemRef.dataset.currentPage = pageNum - 1;
    };
    let onPageClicked = function (event) {
      let pageLabel = event.target.innerText[0];
      let pageNum = parseInt(pageLabel);
      setCurrentPage(pageNum);
      setActivePageItem(pageNum);
    };
    let onPageHoveredIn = function(event) {
      event.target.style.textDecoration = 'underline';
    };
    let onPageHoveredOut = function(event) {
      event.target.style.textDecoration = 'none';
    };

    window.app.tablePaginator = {};
    window.app.tablePaginator.getItemsByPage = function(tableInput) {
      let itemsByPage = [];
      let items = tableInput.items;
      let itemsPerPage = tableInput.itemsPerPage;
      let sliceStart = 0;
      let sliceEnd;
      do
      {
        sliceEnd = (sliceStart + itemsPerPage <= items.length) ?
        sliceStart + itemsPerPage : items.length;
        itemsByPage.push(items.slice(sliceStart, sliceEnd));
        sliceStart += itemsPerPage;
      }
      while (sliceStart < items.length);
      return itemsByPage;
    };
    window.app.tablePaginator.initialize = function(
      itemsByPage,
      tableElem,
      paginatorElem
    ) {
      tableElemRef = tableElem;
      paginatorElemRef = paginatorElem;
      let uList = paginatorElem.getElementsByTagName('ul')[0];
      let linkToNext = uList.getElementsByTagName('li')[1];
      let length = itemsByPage.length;
      totPages = length;
      for (let i = 1; i <= length; i++) {
        let listItem = document.createElement("LI");
        listItem.setAttribute("class", "page-item");
        listItem.onclick = onPageClicked;
        let anchor = document.createElement("A");
        anchor.setAttribute("class", "page-link");
        anchor.onmouseenter = onPageHoveredIn;
        anchor.onmouseleave = onPageHoveredOut;
        let anchorText = document.createTextNode((i).toString());
        let span = document.createElement("SPAN");
        span.setAttribute("class", "sr-only");
        let spanText = document.createTextNode((i).toString());
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
  }()
);
