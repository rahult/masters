import app from 'ampersand-app'
import Router from 'ampersand-router'
import React from 'react'
import HomePage from './pages/home'
import ReposPage from './pages/repos'
import LayoutPage from './layout'
import qs from 'qs'
import xhr from 'xhr'

export default Router.extend({
  renderPage (page, opts = {layout: true}) {
    if(opts.layout) {
      page = (
        <LayoutPage me={app.me}>
          {page}
        </LayoutPage>
      )
    }

    return React.render(page, document.body)
  },

  routes: {
    '': 'home',
    'repos': 'repos',
    'login': 'login',
    'logout': 'logout',
    'auth/callback?:query': 'authCallback'
  },

  home () {
    this.renderPage(<HomePage/>, {layout: false})
  },

  repos () {
    this.renderPage(<ReposPage/>)
  },

  login () {
    /*eslint-disable camelcase*/
    window.location = 'https://github.com/login/oauth/authorize?' + qs.stringify({
      client_id: '37268d0a940e5d7a6e03',
      redirect_uri: window.location.origin + '/auth/callback',
      scope: 'user,repo'
    })
    /*eslint-enable camelcase*/
  },

  logout () {
    window.localStorage.clear()
    window.location = '/'
  },

  authCallback (query) {
    query = qs.parse(query)
    console.log('callback', query)

    xhr({
      url: 'https://easy-labelr-localhost.herokuapp.com/authenticate/' + query.code,
      json: true
    }, (_err, _req, body) => {
      console.log(body)
      app.me.token = body.token
      this.redirectTo('/repos')
    })
  }

})
