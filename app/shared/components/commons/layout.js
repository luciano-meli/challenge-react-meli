const React = require('react');
const SvgSearch = require('./svg-search');
require('./layout.scss');

class Layout extends React.Component {
  constructor() {
    super();

    this.state = { searchTerm: '' };
  }

  handleSearchTermChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  render() {
    return (
      <div className="layout">
        <div className="layout-header">
          <div className="layout-nav">
            <a href="/">
              <div className="layout-nav-logo" />
            </a>
            <form className="layout-nav-search" action="/items" method="get">
              <input
                onChange={this.handleSearchTermChange.bind(this)}
                className="layout-nav-search-input"
                placeholder="Buscar productos, marcas y más..."
                maxLength="120"
              />
              <input
                type="hidden"
                value={this.state.searchTerm}
                name="search"
              />
              <button type="submit" className="layout-nav-search-btn">
                <div className="layout-nav-search-btn-icon">
                  <SvgSearch />
                </div>
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = Layout;
