import { XMindRequest } from './ApiRequest.js'
import { JwtTokenExpiredError } from './XMindsError.js'
import { getFormattedFiltersArray, convertToQueryString } from './Utils.js'

class ApiClient {

  /**
   * Basic constructor
   * 
   * @param {Map<String, String>} opts Optional parameters The authentication options.
   * 
   *  {
        host: String,
        userAgent: String,
        refreshToken: String
      }
   */
  constructor(opts = null) {
    const { host, userAgent, refreshToken } = opts || {};
    this.#request = new XMindRequest(host, userAgent);
    this.#setRefreshToken(refreshToken || '');
  }

  /**
   * Private object that executes http requests
   */
  #request = null;

  /**
   * Private refresh token attribute
   */
  #refreshToken = '';

  /**
   * Private setter to refresh token
   */
  #setRefreshToken(refreshToken) {
    this.#refreshToken = refreshToken;
  }

  /**
   * Private getter of refresh token
   */
  #getRefreshToken() {
    return this.#refreshToken;
  }

  /**
   * Private setter to jwtToken
   */
  #setJwtToken(jwtToken) {
    this.#request.setJwtToken(jwtToken);
  }

  /**
   * Getter of jwtToken
   */
  getJwtToken() {
    return this.#request.getJwtToken();
  }

  /**
   * Wrapper function to ensure that login refresh token is
   * executed if a JwtTokenExpiredError is received.
   * (it will be replaced in the future with a Decorator implementation)
   * 
   * @param {Function} method
   */
  #autoRefreshToken(method) {
    return function () {
      let args = [].splice.call(arguments, 0);
      if (this.getJwtToken() == '') {
        return this.loginRefreshToken()
          .then(() => {
            return method.apply(this, args);
          })
          .catch(error => {
            throw error;
          });
      } else {
        return method.apply(this, args).catch(err => {
          if (err instanceof JwtTokenExpiredError) {
            return this.loginRefreshToken()
              .then(() => {
                return method.apply(this, args);
              })
              .catch(error => {
                throw error;
              })
          } else
            throw err;
        });
      }
    }
  }

  /**
   * Executes the request call given the method, endpoint and bodyParams
   * 
   * @param {String} method the method to execute
   * @param {String} endpoint
   * @param {Object} bodyParams
   * @return {Promise}
   * 
   */
  #makeRequest(method, endpoint, bodyParams, timeout) {
    switch (method) {
      case 'GET':
        return this.#request.get(endpoint, timeout);
      case 'PUT':
        return this.#request.put(endpoint, bodyParams, timeout);
      case 'POST':
        return this.#request.post(endpoint, bodyParams, timeout);
      case 'DELETE':
        return this.#request.delete(endpoint, bodyParams, timeout);
    }
  }

  /**
   * Wrapped function of makeRequest using autoRefreshToken wrapper
   */
  makeRequestWithAutoRefreshToken = this.#autoRefreshToken(this.#makeRequest);


  // LOGIN ENDPOINTS

  /**
   * Login on a database with your account, using a refresh token.
   * 
   * @param {String} refreshToken 
   * @returns {Promise<Object>} Object represents the jwtToken, refreshToken and database information if resolved. XMindError if rejected
   */
  async loginRefreshToken(refreshToken = '') {
    let bodyParams = { 'refresh_token': refreshToken !== '' ? refreshToken : this.#getRefreshToken() };
    let path = '/login/refresh-token/';
    const authData = await this.#makeRequest('POST', path, bodyParams);
    this.#setJwtToken(authData.token);
    this.#setRefreshToken(authData.refresh_token);
    return authData;
  }


  // USER-DATA-PROPERTIES ENDPOINTS

  /**
   * Get one user given its ID.
   * 
   * @param {String} userId 
   * @returns {Promise.<Object>} Object that represents the user, if resolved. XMindError if rejected
   * 
   */
  getUser(userId) {
    let path = `/users/${userId}/`;
    return this.makeRequestWithAutoRefreshToken('GET', path);
  }

  /**
   * Get multiple users given their IDs.
   * 
   * @param {Array<String>} usersId an array of users id
   * @returns {Promise.<Object>} Object that represents the list of users, if resolved. XMindError if rejected
   * 
   */
  listUsers(usersId) {
    let bodyParams = { "users_id": usersId }
    let path = '/users-bulk/list/';
    return this.makeRequestWithAutoRefreshToken('POST', path, bodyParams);
  }


  // ITEM-DATA-PROPERTIES ENDPOINTS

  /**
   * Get one item given its ID.
   * 
   * @param {String} itemId 
   * @returns {Promise.<Object>} Object that represents the item, if resolved. XMindError if rejected
   * 
   */
  getItem(itemId) {
    let path = `/items/${itemId}/`;
    return this.makeRequestWithAutoRefreshToken('GET', path);
  }

  /**
   * Get multiple items given their IDs.
   * 
   * @param {Array<String>} itemsId an array of items id
   * @returns {Promise.<Object>} Object that represents the list of items, if resolved. XMindError if rejected
   * 
   */
  listItems(itemsId) {
    let bodyParams = { "items_id": itemsId }
    let path = '/items-bulk/list/';
    return this.makeRequestWithAutoRefreshToken('POST', path, bodyParams);
  }


  // USER-RATING ENDPOINTS

  /**
   * Create or update a rating for a user and an item.
   * If the rating exists for the tuple (userId, itemId) then it is updated,
   * otherwise it is created.
   * 
   * @param {String} userId 
   * @param {String} itemId 
   * @param {Number} rating
   * @param {Number} timestamp 
   * @returns {Promise<Object>} Empty content if resolved. XMindError if rejected
   * 
   */
  createOrUpdateRating(userId, itemId, rating, timestamp = null) {
    let bodyParams = {
      "rating": rating
    }
    if (timestamp)
      bodyParams['timestamp'] = timestamp;
    let path = `/users/${userId}/ratings/${itemId}/`;
    return this.makeRequestWithAutoRefreshToken('PUT', path, bodyParams);
  }

  /**
   * Delete a single rating for a given user.
   * 
   * @param {String} userId 
   * @param {String} itemId 
   * @returns {Promise<Object>} Empty content if resolved. XMindError if rejected
   * 
   */
  deleteRating(userId, itemId) {
    let path = `/users/${userId}/ratings/${itemId}/`;
    return this.makeRequestWithAutoRefreshToken('DELETE', path);
  }

  /**
   * List the ratings of one user. 
   * The response is paginated, you can control the response amount 
   * and offset using the query parameters amt and page.
   * 
   * @param {String} userId 
   * @param {Number} page Page to be listed. Default value is 1
   * @param {Number} amt Amount of ratings to return. Default value is 64
   * @returns {Promise.<Object>} Object that represents the list of ratings, if resolved. XMindError if rejected
   * 
   */
  listUserRatings(userId, page = 1, amt = 64) {
    let queryParams = { "page": page, "amt": amt };
    let path = `/users/${userId}/ratings/?` + convertToQueryString(queryParams);
    return this.makeRequestWithAutoRefreshToken('GET', path);
  }

  /**
   * Create or update bulks of ratings for a single user and many items.
   * 
   * @param {String} userId 
   * @param {Array<Object>} ratings array of ratings
   * @returns {Promise<Object>} Empty content if resolved. XMindError if rejected
   * 
   */
  createOrUpdateUserRatingsBulk(userId, ratings) {
    let bodyParams = { "ratings": ratings }
    let path = `/users/${userId}/ratings/`;
    return this.makeRequestWithAutoRefreshToken('PUT', path, bodyParams, 10);
  }

  /**
   * Delete all ratings of a given user.
   * 
   * @param {String} userId 
   * @returns {Promise<Object>} Empty content if resolved. XMindError if rejected
   * 
   */
  deleteUserRatings(userId) {
    let path = `/users/${userId}/ratings/`;
    return this.makeRequestWithAutoRefreshToken('DELETE', path);
  }


  // RECOMMENDATIONS ENDPOINTS

  /**
   * Get similar items.
   * 
   * @param {String} itemId 
   * @param {Map<String, String>} opts Optional parameters
   * @returns {Promise.<Object>} Object that represents the list of items id, if resolved. XMindsError if rejected
   * 
   */
  getRecommendationsItemToItems(itemId, opts = {}) {
    const queryParams = {
      ...opts,
      ...(opts.filters && { filters: getFormattedFiltersArray(opts.filters) })
    }
    let path = `/recommendation/items/${itemId}/items/` + convertToQueryString(queryParams);
    return this.makeRequestWithAutoRefreshToken('GET', path);
  }

  /**
   * Get items recommendations given the ratings of an anonymous session.
   * 
   * @param {Map<String, String>} opts Optional parameters
   * @returns {Promise.<Object>} Object that represents the list of items id, if resolved. XMindsError if rejected
   * 
   */
  getRecommendationsSessionToItems(opts = {}) {
    let path = '/recommendation/sessions/items/';
    return this.makeRequestWithAutoRefreshToken('POST', path, opts);
  }

  /**
   * Get items recommendations given a user ID.
   * 
   * @param {String} userId 
   * @param {Map<String, String>} opts Optional parameters
   * @returns {Promise.<Object>} Object that represents the list of items id, if resolved. XMindsError if rejected
   * 
   */
  getRecommendationsUserToItems(userId, opts = {}) {
    const queryParams = {
      ...opts,
      ...(opts.filters && { filters: getFormattedFiltersArray(opts.filters) })
    }
    let path = `/recommendation/users/${userId}/items/` + convertToQueryString(queryParams);
    return this.makeRequestWithAutoRefreshToken('GET', path);
  }

  /**
   * Get precomputed similar items.
   * 
   * @param {String} itemId item ID
   * @param {Map<String, String>} opts Optional parameters
   * @returns {Promise.<Object>} Object that represents the list of items id, if resolved. XMindsError if rejected
   * 
   */
  getPrecomputedRecommendationsItemToItems(itemId, opts = {}) {
    const queryParams = {
      ...opts
    }
    let path = `/recommendation/precomputed/items/${itemId}/items/` + convertToQueryString(queryParams);
    return this.makeRequestWithAutoRefreshToken('GET', path);
  }

  /**
   * Get item recommendations given a user profile, from a precomputed file.
   * 
   * @param {String} userId user ID
   * @param {Map<String, String>} opts Optional parameters
   * @returns {Promise.<Object>} Object that represents the list of items id, if resolved. XMindsError if rejected
   * 
   */
  getPrecomputedRecommendationsUserToItems(userId, opts = {}) {
    const queryParams = {
      ...opts
    }
    let path = `/recommendation/precomputed/users/${userId}/items/` + convertToQueryString(queryParams);
    return this.makeRequestWithAutoRefreshToken('GET', path);
  }


  // USER INTERACTIONS ENDPOINTS

  /**
   * This endpoint allows you to create a new interaction for a user and an item.
   * An inferred rating will be created or updated for the tuple (user_id, item_id).
   * The taste profile of the user will then be updated in real-time by the online 
   * machine learning algorithm.
   * 
   * @param {ID} userId 
   * @param {ID} itemId 
   * @param {String} interactionType 
   * @param {Float} timestamp 
   * @returns {Promise.<Object>}
   * 
   */
  createInteraction(userId, itemId, interactionType, timestamp = null) {
    let bodyParams = {};
    bodyParams['interaction_type'] = interactionType;
    if (timestamp)
      bodyParams['timestamp'] = timestamp;
    let path = `/users/${userId}/interactions/${itemId}/`;
    return this.makeRequestWithAutoRefreshToken('POST', path, bodyParams);
  }

  /**
   * Create or update large bulks of interactions for a user and many items.
   * Inferred ratings will be created or updated for all tuples (user_id, item_id)
   * 
   * @param {ID} userId 
   * @param {Array<Object} interactions
   * @returns {Promise.<Object>}
   * 
   */
  createOrUpdateUserInteractionsBulk(userId, interactions) {
    let path = `/users/${userId}/interactions-bulk/`;
    return this.makeRequestWithAutoRefreshToken('POST', path, { 'interactions': interactions });
  }

}

/**
* The default API client implementation.
* @type {module:ApiClient}
*/
const _ApiClient = ApiClient;
export { _ApiClient as ApiClient };