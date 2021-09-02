import { XMindRequest } from './ApiRequest.js'
import { JwtTokenExpiredError } from './XMindsError.js';
import { getFormattedFiltersArray, convertToQueryString } from './Utils.js';

class ApiClient { 

  /**
   * Basic constructor
   * 
   * @param {String} basePath 
   */
  constructor(basePath) {
    this.#request = basePath ? new XMindRequest(basePath) : new XMindRequest();
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
  #getRefreshToken(refreshToken) {
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


  // RECOMMENDATIONS ENDPOINTS

  /**
   * Get similar items.
   * 
   * @param {String} itemId 
   * @param {Number} amt 
   * @param {String} cursor 
   * @param {Array<Object>} filters 
   * @returns {Promise.<Object>} Object that represents the list of items id, if resolved. XMindError if rejected
   * 
   */
  getRecommendationsItemToItems(itemId,  amt = null, cursor = null, filters = null) {
    let queryParams = {};
    if (amt)
      queryParams['amt'] = amt;
    if (cursor)
      queryParams['cursor'] = cursor;
    if (filters && filters.length > 0)
      queryParams['filters'] = getFormattedFiltersArray(filters);
    let path = `/recommendation/items/${itemId}/items/` + convertToQueryString(queryParams);
    return this.makeRequestWithAutoRefreshToken('GET', path);
  }

  /**
   * Get items recommendations given the ratings of an anonymous session.
   * 
   * @param {Number} amt 
   * @param {String} cursor 
   * @param {Array<Object>} filters 
   * @param {Array<Object>} ratings 
   * @param {Object} userProperties 
   * @param {Boolean} excludeRatedItems 
   * @returns {Promise.<Object>} Object that represents the list of items id, if resolved. XMindError if rejected
   * 
   */
  getRecommendationsSessionToItems(amt = null, cursor = null, filters = null, ratings = null, userProperties = null, excludeRatedItems = false) {
    let bodyParams = {};
    if (ratings)
      bodyParams['ratings'] = ratings;
    if (userProperties)
      bodyParams['user_properties'] = userProperties;
    if (amt)
      bodyParams['amt'] = amt;
    if (cursor)
      bodyParams['cursor'] = cursor;
    if (filters)
      bodyParams['filters'] = filters;
    if (excludeRatedItems)
      bodyParams['exclude_rated_items'] = excludeRatedItems;
    let path = '/recommendation/sessions/items/';
    return this.makeRequestWithAutoRefreshToken('POST', path, bodyParams);
  }

  /**
   * Get items recommendations given a user ID.
   * 
   * @param {String} userId 
   * @param {Number} amt 
   * @param {String} cursor 
   * @param {Array<Object>} filters 
   * @param {Boolean} excludeRatedItems 
   * @returns {Promise.<Object>} Object that represents the list of items id, if resolved. XMindError if rejected
   * 
   */
  getRecommendationsUserToItems(userId, amt = null, cursor = null, filters = null, excludeRatedItems = false) {
    let queryParams = {};
    if (amt)
      queryParams['amt'] = amt;
    if (cursor)
      queryParams['cursor'] = cursor;
    if (filters && filters.length > 0)
      queryParams['filters'] = getFormattedFiltersArray(filters);
    if (excludeRatedItems)
      queryParams['exclude_rated_items'] = excludeRatedItems;
    let path = `/recommendation/users/${userId}/items/` + convertToQueryString(queryParams);
    return this.makeRequestWithAutoRefreshToken('GET', path);
  }

}

/**
* The default API client implementation.
* @type {module:ApiClient}
*/
const _ApiClient = ApiClient;
export { _ApiClient as ApiClient };
