const
  Profile = require('../security/profile'),
  SearchResultBase = require('./base');

class ProfileSearchResult extends SearchResultBase {

  constructor (kuzzle, request, options, response) {
    super(kuzzle, request, options, response);

    this._searchAction = 'searchProfiles';
    this._scrollAction = 'scrollProfiles';
    this.hits = response.hits.map(hit => new Profile(this._kuzzle, hit._id, hit._source.policies));
  }

  next () {
    return super.next()
      .then(result => {
        if (! result) {
          return result;
        }

        this.hits = this._response.hits.map(hit => new Profile(this._kuzzle, hit._id, hit._source.policies));
        return this;
      });
  }
}

module.exports = ProfileSearchResult;