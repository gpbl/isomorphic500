export default {

  home: {
    path: '/',
    method: 'get',
    page: 'home',
    label: 'Home',
    action(context, payload, done) {
      context.dispatch('UPDATE_PAGE_TITLE', {
        pageTitle: 'Home | flux-examples | routing'
      });
      done();
    }
  },

  about: {
    path: '/about',
    method: 'get',
    page: 'about',
    label: 'About',
    action(context, payload, done) {
      context.dispatch('UPDATE_PAGE_TITLE', {
        pageTitle: 'About | flux-examples | routing'
      });
      done();
    }
  },

  dynamicpage: {
    path: '/page/:id',
    method: 'get',
    page: 'page',
    action(context, payload, done) {
      context.dispatch('LOAD_PAGE', {
        id: payload.params.id
      });
      context.dispatch('UPDATE_PAGE_TITLE', {
        pageTitle: payload.params.id + ' [Dynamic Page] | flux-examples | routing'
      });
      done();
    }
  }
};