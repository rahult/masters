import Router from 'ampersand-router'
import React from 'react'
import HomePage from './pages/home'
import ReposPage from './pages/repos'
import LayoutPage from './layout'
import LinkHandler from './components/link-handler'

export default Router.extend({
  renderPage (page, opts = {layout: true}) {
    if(opts.layout) {
      page = (
        <LinkHandler>
          <LayoutPage>
            {page}
          </LayoutPage>
        </LinkHandler>
      )
    }

    return React.render(page, document.body)
  },

  routes: {
    '': 'home',
    'repos': 'repos'
  },

  home () {
    this.renderPage(<HomePage/>, {layout: false})
  },

  repos () {
    this.renderPage(<ReposPage/>)
  }
})
