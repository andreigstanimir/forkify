import View from './View.js';
import icons from '../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = +btn.dataset.goTo;
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // Page 1, and there are other pages
    if ((this._data.page === 1) & (numPages > 1)) {
      return `<button class="btn--inline pagination__btn--next" data-go-to="${
        this._data.page + 1
      }">
        <span>Page ${this._data.page + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>`;
    }

    // Last page
    if (this._data.page === numPages && numPages > 1) {
      console.log('last page');
      return `<button class="btn--inline pagination__btn--prev" data-go-to="${
        this._data.page - 1
      }">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>Page ${this._data.page - 1}</span>
    </button>
      `;
    }

    // In between
    if (this._data.page < numPages) {
      return `<button class="btn--inline pagination__btn--prev" data-go-to="${
        this._data.page - 1
      }">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>Page ${this._data.page - 1}</span>
    </button>
    <button class="btn--inline pagination__btn--next" data-go-to="${
      this._data.page + 1
    }">
        <span>Page ${this._data.page + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>
      `;
    }

    // Page 1, and no other pages
    return '';
  }
}

export default new PaginationView();
