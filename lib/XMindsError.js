/**
 * XMindError is the Base Error from which all other more specific Xmind errors derive.
 * It is related to errors returned from CrossingMinds REST API.
 */
class XMindsError {
  constructor(obj) {
    this.errorDetail = obj.error_data;
    this.message =
      this.errorDetail
        ? obj.message.replace('{error}', this.errorDetail.error)
          .replace('{type}', this.errorDetail.type)
          .replace('{key}', this.errorDetail.key)
          .replace('{method}', this.errorDetail.method)
        : obj.message;
  }

  /**
   * Error factory which takes an objXMindsError and returns a specific instance of error
   * based on the error_name value.
   */
  static parseError(objXMindsError) {
    switch (objXMindsError.error_name) {
      case 'AuthError':
        throw new AuthError(objXMindsError);
      case 'DuplicatedError':
        throw new DuplicatedError(objXMindsError);
      case 'ForbiddenError':
        throw new ForbiddenError(objXMindsError);
      case 'JwtTokenExpired':
        throw new JwtTokenExpiredError(objXMindsError);
      case 'MethodNotAllowed':
        throw new MethodNotAllowedError(objXMindsError);
      case 'NotFoundError':
        throw new NotFoundError(objXMindsError);
      case 'RefreshTokenExpired':
        throw new RefreshTokenExpiredError(objXMindsError);
      case 'ServerUnavailable':
        throw new ServerUnavailableError(objXMindsError);
      case 'TooManyRequests':
        throw new TooManyRequestsError(objXMindsError);
      case 'WrongData':
        throw new WrongDataError(objXMindsError);
      case 'ServerError':
      default:
        throw new ServerError(objXMindsError);
    }
  }
}

/**
 * AuthError is throwed when cannot perform authentication.
 */
class AuthError extends XMindsError {
  constructor(obj = {}) {
    super(obj);
    this.statusCode = 401;
  }
}

/**
 * DuplicatedError is throwed when some resource is duplicated.
 */
class DuplicatedError extends XMindsError {
  constructor(obj = {}) {
    super(obj);
    this.statusCode = 400;
  }
}

/**
 * ForbiddenError is throwed when the authenticated user does not 
 * have enough permissions to access this resource.
 */
class ForbiddenError extends XMindsError {
  constructor(obj = {}) {
    super(obj);
    this.statusCode = 403;
  }
}

/**
 * JwtTokenExpiredError is throwed when the JWT token has expired.
 */
class JwtTokenExpiredError extends XMindsError {
  constructor(obj = {}) {
    super(obj);
    this.statusCode = 401;
  }
}

/**
 * MethodNotAllowedError is throwed when the HTTP method is not allowed.
 */
class MethodNotAllowedError extends XMindsError {
  constructor(obj = {}) {
    super(obj);
    this.statusCode = 405;
  }
}

/**
 * NotFoundError is throwed when some resource does not exist.
 */
class NotFoundError extends XMindsError {
  constructor(obj = {}) {
    super(obj);
    this.statusCode = 404;
  }
}

/**
 * RefreshTokenExpiredError is throwed when the refresh token has expired
 */
class RefreshTokenExpiredError extends XMindsError {
  constructor(obj = {}) {
    super(obj);
    this.statusCode = 401;
  }
}

/**
 * ServerError is throwed when the server encountered an internal error. 
 * You may be able to retry your request, but this usually indicates an 
 * error on the API side that require support.
 */
class ServerError extends XMindsError {
  constructor(obj = {}) {
    super(obj);
    this.statusCode = 500;
  }
}

/**
 * ServerUnavailableError is throwed when the server is currently unavailable, 
 * please try again later.
 */
class ServerUnavailableError extends XMindsError {
  constructor(obj = {}) {
    super(obj);
    this.statusCode = 503;
  }
}

/**
 * WrongDataError is throwed when there is an error in the submitted data.
 */
class WrongDataError extends XMindsError {
  constructor(obj = {}) {
    super(obj);
    this.statusCode = 400;
  }
}

/**
 * TooManyRequestsError is throwed when the amount of requests exceeds the limit of your subscription.
 */
class TooManyRequestsError extends XMindsError {
  constructor(obj = {}) {
    super(obj);
    this.statusCode = 429;
  }
}

export const parseError = XMindsError.parseError;
const _XMindsError = XMindsError;
export { _XMindsError as XMindsError };
const _AuthError = AuthError;
export { _AuthError as AuthError };
const _DuplicatedError = DuplicatedError;
export { _DuplicatedError as DuplicatedError };
const _ForbiddenError = ForbiddenError;
export { _ForbiddenError as ForbiddenError };
const _JwtTokenExpiredError = JwtTokenExpiredError;
export { _JwtTokenExpiredError as JwtTokenExpiredError };
const _MethodNotAllowedError = MethodNotAllowedError;
export { _MethodNotAllowedError as MethodNotAllowedError };
const _NotFoundError = NotFoundError;
export { _NotFoundError as NotFoundError };
const _RefreshTokenExpiredError = RefreshTokenExpiredError;
export { _RefreshTokenExpiredError as RefreshTokenExpiredError };
const _ServerError = ServerError;
export { _ServerError as ServerError };
const _ServerUnavailableError = ServerUnavailableError;
export { _ServerUnavailableError as ServerUnavailableError };
const _WrongDataError = WrongDataError;
export { _WrongDataError as WrongDataError };
const _TooManyRequestsError = TooManyRequestsError;
export { _TooManyRequestsError as TooManyRequestsError };