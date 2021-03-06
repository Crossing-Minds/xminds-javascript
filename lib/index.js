import { ApiClient } from "./ApiClient.js"

const api = null;

export function initialize(opts = null) {
    api = new ApiClient(opts);
}

/**
   * Get one user given its ID.
   * 
   * @param {ID} userId 
   * @returns {Promise.<Object>} Object that represents the user, if resolved. XMindError if rejected
   * 
   */
export function getUser(userId) {
    return api.getUser(userId)
}

/**
   * Get multiple users given their IDs.
   * 
   * @param {Array<ID>} usersId an array of users id
   * @returns {Promise.<Object>} Object that represents the list of users, if resolved. XMindError if rejected
   * 
   */
export function listUsers(usersId) {
    return api.listUsers(usersId);
}

/**
   * Get one item given its ID.
   * 
   * @param {ID} itemId 
   * @returns {Promise.<Object>} Object that represents the item, if resolved. XMindError if rejected
   * 
   */
export function getItem(itemId) {
    return api.getItem(itemId)
}

/**
   * Get multiple items given their IDs.
   * 
   * @param {Array<ID>} itemsId an array of items id
   * @returns {Promise.<Object>} Object that represents the list of items, if resolved. XMindError if rejected
   * 
   */
export function listItems(itemsId) {
    return api.listItems(itemsId);
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
    return api.createOrUpdateRating(userId, itemId, rating, timestamp);
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
    return api.deleteRating(userId, itemId);
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
    return api.listUserRatings(userId, page, amt);
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
    return api.createOrUpdateUserRatingsBulk(userId, ratings);
}

/**
   * Delete all ratings of a given user.
   * 
   * @param {String} userId 
   * @returns {Promise<Object>} Empty content if resolved. XMindError if rejected
   * 
   */
export function deleteUserRatings(userId) {
    return api.deleteUserRatings(userId);
}

/**
   * Get similar items.
   * 
   * @param {String} itemId 
   * @param {Map<String, String>} opts Optional parameters
   * @returns {Promise.<Object>} Object that represents the list of items id, if resolved. XMindsError if rejected
   * 
   */
export function getRecommendationsItemToItems(itemId, opts = null) {
    return api.getRecommendationsItemToItems(itemId, opts);
}

/**
   * Get items recommendations given the ratings of an anonymous session.
   * 
   * @param {Map<String, String>} opts Optional parameters
   * @returns {Promise.<Object>} Object that represents the list of items id, if resolved. XMindsError if rejected
   * 
   */
export function getRecommendationsSessionToItems(opts = null) {
    return api.getRecommendationsSessionToItems(opts);
}

/**
   * Get items recommendations given a user ID.
   * 
   * @param {String} userId 
   * @param {Map<String, String>} opts Optional parameters
   * @returns {Promise.<Object>} Object that represents the list of items id, if resolved. XMindsError if rejected
   * 
   */
export function getRecommendationsUserToItems(userId, opts = null) {
    return api.getRecommendationsUserToItems(userId, opts);
}

/**
   * Get precomputed similar items.
   * 
   * @param {String} itemId 
   * @param {Map<String, String>} opts Optional parameters
   * @returns {Promise.<Object>} Object that represents the list of items id, if resolved. XMindsError if rejected
   * 
   */
export function getPrecomputedRecommendationsItemToItems(itemId, table = null, scenario = null, skipDefaultScenario = null) {
    return api.getPrecomputedRecommendationsItemToItems(itemId, table, scenario, skipDefaultScenario);
}

/**
 * Get item recommendations given a user profile, from a precomputed file.
 * 
 * @param {String} userId 
 * @param {Map<String, String>} opts Optional parameters
 * @returns {Promise.<Object>} Object that represents the list of items id, if resolved. XMindsError if rejected
 * 
 */
export function getPrecomputedRecommendationsUserToItems(userId, table = null, scenario = null, skipDefaultScenario = null) {
    return api.getPrecomputedRecommendationsUserToItems(userId, table, scenario, skipDefaultScenario);
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
    return api.createInteraction(userId, itemId, interactionType, timestamp);
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
export function createOrUpdateUserInteractionsBulk(userId, interactions) {
    return api.createOrUpdateUserInteractionsBulk(userId, interactions);
}
