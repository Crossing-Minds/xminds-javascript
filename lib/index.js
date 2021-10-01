import { ApiClient } from "./ApiClient.js"

const api = null;

export function initialize(refreshToken, userAgent = null, host = null) {
    this.api = new ApiClient(refreshToken, userAgent, host);
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
export function createOrUpdateRating(userId, itemId, rating, timestamp) {
    return this.api.createOrUpdateRating(userId, itemId, rating, timestamp);
}

/**
   * Delete a single rating for a given user.
   * 
   * @param {String} userId 
   * @param {String} itemId 
   * @returns {Promise<Object>} Empty content if resolved. XMindError if rejected
   * 
   */
export function deleteRating(userId, itemId) {
    return this.api.deleteRating(userId, itemId);
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
export function listUserRatings(userId, page, amt) {
    return this.api.listUserRatings(userId, page, amt);
}

/**
   * Create or update bulks of ratings for a single user and many items.
   * 
   * @param {String} userId 
   * @param {Array<Object>} ratings array of ratings
   * @returns {Promise<Object>} Empty content if resolved. XMindError if rejected
   * 
   */
export function createOrUpdateUserRatingsBulk(userId, ratings) {
    return this.api.createOrUpdateUserRatingsBulk(userId, ratings);
}

/**
   * Delete all ratings of a given user.
   * 
   * @param {String} userId 
   * @returns {Promise<Object>} Empty content if resolved. XMindError if rejected
   * 
   */
export function deleteUserRatings(userId) {
    return this.api.deleteUserRatings(userId);
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