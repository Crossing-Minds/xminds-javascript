import { ApiClient } from "./ApiClient.js"

const api = null;

export function initialize(refreshToken, host) {
    this.api = new ApiClient(refreshToken, host);
}

/**
   * Get one user given its ID.
   * 
   * @param {ID} userId 
   * @returns {Promise.<Object>} Object that represents the user, if resolved. XMindError if rejected
   * 
   */
export function getUser(userId) {
    return this.api.getUser(userId)
}

/**
   * Get multiple users given their IDs.
   * 
   * @param {Array<ID>} usersId an array of users id
   * @returns {Promise.<Object>} Object that represents the list of users, if resolved. XMindError if rejected
   * 
   */
export function listUsers(usersId) {
    return this.api.listUsers(usersId);
}

/**
   * Get one item given its ID.
   * 
   * @param {ID} itemId 
   * @returns {Promise.<Object>} Object that represents the item, if resolved. XMindError if rejected
   * 
   */
export function getItem(itemId) {
    return this.api.getItem(itemId)
}

/**
   * Get multiple items given their IDs.
   * 
   * @param {Array<ID>} itemsId an array of items id
   * @returns {Promise.<Object>} Object that represents the list of items, if resolved. XMindError if rejected
   * 
   */
export function listItems(itemsId) {
    return this.api.listItems(itemsId);
}

/**
   * Get similar items.
   * 
   * @param {ID} itemId 
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
    return this.api.getRecommendationsSessionToItems(amt, cursor, filters, ratings, userProperties, excludeRatedItems);
}

/**
   * Get items recommendations given a user ID.
   * 
   * @param {ID} userId 
   * @param {Number} amt 
   * @param {String} cursor 
   * @param {Array<Object>} filters 
   * @param {Boolean} excludeRatedItems 
   * @returns {Promise.<Object>} Object that represents the list of items id, if resolved. XMindError if rejected
   * 
   */
export function getRecommendationsUserToItems(userId, amt = null, cursor = null, filters = null, excludeRatedItems = false) {
    return this.api.getRecommendationsUserToItems(userId, amt, cursor, filters, excludeRatedItems);
}

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
export function createInteraction(userId, itemId, interactionType, timestamp = null) {
    return this.api.createInteraction(userId, itemId, interactionType, timestamp);
}