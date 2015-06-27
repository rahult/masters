import Model from 'ampersand-model'
import githubMixin from '../helpers/github-mixin'
import RepoCollection from './repo-collection'

export default Model.extend(githubMixin, {
  url: 'https://api.github.com/user',

  initialize () {
    this.token = window.localStorage.token
    this.on('change:token', this.onTokenChange)
  },

  /*eslint-disable camelcase*/
  props: {
    id: 'number',
    login: 'string',
    avatar_url: 'string'
  },
  /*eslint-ensable camelcase*/

  collections: {
    repos: RepoCollection
  },

  session: {
    token: 'string'
  },

  onTokenChange () {
    window.localStorage.token = this.token
    this.fetchInitialData()
  },

  fetchInitialData () {
    if (this.token) {
      this.fetch()
      this.repos.fetch()
    }
  }
})
