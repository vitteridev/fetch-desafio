function removeContent() {
  const itemsEl = document.querySelectorAll(".results-item");

  itemsEl.forEach((i) => {
    i.remove();
  });
}

function showContent(api) {
  removeContent();

  const sectionEl = document.querySelector(".results");
  const templateEl = document.querySelector("#template");
  const fragment = document.createDocumentFragment();
  document.querySelector(".result-count").textContent = api.paging.total;

  for (const r of api.results) {
    templateEl.content.querySelector(".results-item-title").textContent =
      r.title;
    templateEl.content.querySelector(".results-item-condition").textContent =
      r.condition;
    templateEl.content.querySelector(".results-item-sell-number").textContent =
      r.sold_quantity;
    templateEl.content.querySelector(".results-item-price").textContent =
      "$" + r.price;
    templateEl.content.querySelector(".results-item-img").src = r.thumbnail;

    let cloneEl = document.importNode(templateEl.content, true);
    fragment.appendChild(cloneEl);
  }
  sectionEl.appendChild(fragment);
}

function main() {
  const formEl = document.querySelector(".search-form");
  formEl.addEventListener("submit", function (e) {
    e.preventDefault();
    const wordSearch = e.target.find.value;
    fetch(`https://api.mercadolibre.com/sites/MLA/search?q=${wordSearch}`)
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        showContent(json);
      });
  });
}
main();
