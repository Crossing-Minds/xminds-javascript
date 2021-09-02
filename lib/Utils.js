'use strict';

class Utils {

    /**
     * Returns an array of string with formatted query params.
     * Given an array of filters.
     * 
     * @param {Array<Object>} filtersArray 
     * @returns {Array<String>} contains the formatted query params
     * 
     */
    static getFormattedFiltersArray(filtersArray) {
        let queryParamsArray = [];
        filtersArray.map(filter => {
            queryParamsArray.push(filter.property_name + ':' + filter.op + (filter.value ? (':' + filter.value) : ''));
        });
        return queryParamsArray;
    }

    /**
     * Divides an array into chunks given the chunk size
     * 
     * @param {Array} array the array to be chunked
     * @param {Number} chunkSize the size of the chunks
     * @returns {Array} - array that contain the objects with chunked data
     * 
     */
    static chunk(array, chunkSize) {
        Array.from({ length: Math.ceil(array.length / chunkSize) }, (v, k) =>
            array.slice(k * chunkSize, k * chunkSize + chunkSize)
        )
    }

    /**
     * Converts an object to querystring
     * 
     * @param {Object} queryParams 
     * @returns {String} the querystring
     */
    static convertToQueryString(queryParams) {
        if (Object.keys(queryParams).length !== 0) {
            return '?' + Object.keys(queryParams).map((key) => {
                return encodeURIComponent(key) + '=' + encodeURIComponent(queryParams[key])
            }).join('&');
        } else {
            return '';
        }
    }
}

export const getFormattedFiltersArray = Utils.getFormattedFiltersArray;
export const chunk = Utils.chunk;
export const convertToQueryString = Utils.convertToQueryString;