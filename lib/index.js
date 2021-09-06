const {ApiClient} = require("./ApiClient")

const api = null;

export function createInstance(refreshToken, host) {
    this.api = new ApiClient(refreshToken, host);
}

/**
   * Get one user given its ID.
   * 
   * @param {String} userId 
   * @returns {Promise.<Object>} Object that represents the user, if resolved. XMindError if rejected
   * 
   */
export function getUser(userId) {
    return this.api.getUser(userId)
}

/**
   * Get multiple users given their IDs.
   * 
   * @param {Array<String>} usersId an array of users id
   * @returns {Promise.<Object>} Object that represents the list of users, if resolved. XMindError if rejected
   * 
   */
export function listUsers(usersId) {
    return this.api.listUsers(usersId);
}

/**
   * Get one item given its ID.
   * 
   * @param {String} itemId 
   * @returns {Promise.<Object>} Object that represents the item, if resolved. XMindError if rejected
   * 
   */
export function getItem(itemId) {
    return this.api.getItem(itemId)
}

/**
   * Get multiple items given their IDs.
   * 
   * @param {Array<String>} itemsId an array of items id
   * @returns {Promise.<Object>} Object that represents the list of items, if resolved. XMindError if rejected
   * 
   */
export function listItems(itemsId) {
    return this.api.listItems(itemsId);
}

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
export function getRecommendationsItemToItems(itemId, amt = null, cursor = null, filters = null) {
    return this.api.getRecommendationsItemToItems(itemId, amt, cursor, filters);
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
export function getRecommendationsSessionToItems(amt = null, cursor = null, filters = null, ratings = null, userProperties = null, excludeRatedItems = false) {
    return this.api.getRecommendationsSessionToItems(amt = null, cursor = null, filters = null, ratings = null, userProperties = null, excludeRatedItems = false);
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
export function getRecommendationsUserToItems(userId, amt = null, cursor = null, filters = null, excludeRatedItems = false) {
    return this.api.getRecommendationsUserToItems(userId, amt = null, cursor = null, filters = null, excludeRatedItems = false);
}

export function loginRefreshToken(refreshToken = '') {
    return this.api.loginRefreshToken(refreshToken = '');
}