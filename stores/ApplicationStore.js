import createStore from 'fluxible-app/utils/createStore';
import routes from '../config/routes';

export default createStore({
  storeName: 'ApplicationStore',

  handlers: {
    'CHANGE_ROUTE_SUCCESS': 'handleNavigate',
    'UPDATE_PAGE_TITLE': 'updatePageTitle'
  },
  
  initialize(dispatcher) {
    this.currentPageName = null;
    this.currentPage = null;
    this.currentRoute = null;
    this.pages = routes;
    this.pageTitle = '';
  },
  
  handleNavigate(route) {
    var pageName = route.config.page;
    var page = this.pages[pageName];

    if (pageName === this.getCurrentPageName()) return;

    this.currentPageName = pageName;
    this.currentPage = page;
    this.currentRoute = route;
    this.emit('change');
  },
  
  updatePageTitle(title) {
    this.pageTitle = title.pageTitle;
    this.emitChange();
  },
  
  getCurrentPageName() {
    return this.currentPageName;
  },
  
  getPageTitle() {
    return this.pageTitle;
  },
  
  getState() {
    return {
      currentPageName: this.currentPageName,
      currentPage: this.currentPage,
      pages: this.pages,
      route: this.currentRoute,
      pageTitle: this.pageTitle
    };
  },

  dehydrate() {
    return this.getState();
  },
  
  rehydrate(state) {
    this.currentPageName = state.currentPageName;
    this.currentPage = state.currentPage;
    this.pages = state.pages;
    this.currentRoute = state.route;
    this.pageTitle = state.pageTitle;
  }

});
