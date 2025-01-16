import type { LooseAutocomplete } from './object';


/**
 * **HttpMethod** - A type that represents a collection of common HTTP request methods.
 *
 * This type is designed to allow any HTTP method, with predefined options that reflect standard HTTP methods such as `GET`, `POST`, `PUT`, `DELETE`, etc.
 * It also supports flexibility for custom methods or extensions via a loose autocomplete approach, making it adaptable to non-standard methods.
 *
 * @template T - A set of strings that includes common HTTP methods such as `GET`, `POST`, and others.
 *
 * ### Example Usage:
 *
 * ```typescript
 * const method: HttpMethod = 'GET';     // Valid (predefined method)
 * const customMethod: HttpMethod = 'PATCH'; // Valid (predefined method)
 * const unknownMethod: HttpMethod = 'CUSTOM_METHOD'; // Valid (custom method)
 * ```
 *
 * ### Behavior:
 * - Provides autocomplete suggestions for predefined HTTP methods.
 * - Allows custom or non-standard HTTP methods if necessary.
 * - Enforces method names as strings, restricting other types.
 */
export type HttpMethod = LooseAutocomplete<
  | 'ACL'
  | 'BIND'
  | 'CHECKOUT'
  | 'CONNECT'
  | 'COPY'
  | 'DELETE'
  | 'GET'
  | 'HEAD'
  | 'LINK'
  | 'LOCK'
  | 'M-SEARCH'
  | 'MERGE'
  | 'MKACTIVITY'
  | 'MKCALENDAR'
  | 'MKCOL'
  | 'MOVE'
  | 'NOTIFY'
  | 'OPTIONS'
  | 'PATCH'
  | 'POST'
  | 'PROPFIND'
  | 'PROPPATCH'
  | 'PURGE'
  | 'PUT'
  | 'REBIND'
  | 'REPORT'
  | 'SEARCH'
  | 'SOURCE'
  | 'SUBSCRIBE'
  | 'TRACE'
  | 'UNBIND'
  | 'UNLINK'
  | 'UNLOCK'
  | 'UNSUBSCRIBE'
  | 'ALL'
>;


/**
 * **CommonHttpHeaders** - A collection of widely used HTTP headers that can be found in request or response headers.
 *
 * This interface includes common HTTP headers such as `accept`, `content-type`, `authorization`, and `cookie`, which are often required for general HTTP communication.
 * The interface provides optional properties for each header, enabling flexible usage without strict enforcement of each header's presence.
 *
 * ### Example Usage:
 *
 * ```typescript
 * const headers: CommonHttpHeaders = {
 *   accept: 'application/json',
 *   'content-type': 'application/json',
 *   authorization: 'Bearer token',
 *   cookie: 'session_id=abc123'
 * };
 * ```
 *
 * ### Behavior:
 * - Allows each header to be optional, as headers may not always be present in every request or response.
 * - Supports multiple values for certain headers (e.g., `accept`, `authorization`, `cookie`).
 * - Facilitates extensibility for different HTTP use cases, such as caching or proxying.
 */
export interface CommonHttpHeaders {
  accept?: string | string[] | undefined;
  'accept-language'?: string | string[] | undefined;
  'accept-patch'?: string | string[] | undefined;
  'accept-ranges'?: string | undefined;
  'access-control-allow-credentials'?: string | undefined;
  'access-control-allow-headers'?: string | string[] | undefined;
  'access-control-allow-methods'?: string | string[] | undefined;
  'access-control-allow-origin'?: string | undefined;
  'access-control-expose-headers'?: string | string[] | undefined;
  'access-control-max-age'?: string | undefined;
  'access-control-request-headers'?: string | string[] | undefined;
  'access-control-request-method'?: string | undefined;
  age?: string | undefined;
  allow?: string | undefined;
  'alt-svc'?: string | undefined;
  authorization?: string | string[] | undefined;
  'cache-control'?: string | undefined;
  connection?: string | undefined;
  'content-disposition'?: string | undefined;
  'content-encoding'?: string | undefined;
  'content-language'?: string | undefined;
  'content-length'?: string | undefined;
  'content-location'?: string | undefined;
  'content-range'?: string | undefined;
  'content-type'?: string | undefined;
  cookie?: string | string[] | undefined;
  date?: string | undefined;
  etag?: string | undefined;
  expect?: string | undefined;
  expires?: string | undefined;
  forwarded?: string | undefined;
  from?: string | undefined;
  host?: string | undefined;
  'if-match'?: string | undefined;
  'if-modified-since'?: string | undefined;
  'if-none-match'?: string | undefined;
  'if-unmodified-since'?: string | undefined;
  'last-modified'?: string | undefined;
  location?: string | undefined;
  origin?: string | undefined;
  pragma?: string | undefined;
  'proxy-authenticate'?: string | undefined;
  'proxy-authorization'?: string | undefined;
  'public-key-pins'?: string | undefined;
  range?: string | undefined;
  referer?: string | undefined;
  'retry-after'?: string | undefined;
  'sec-websocket-accept'?: string | undefined;
  'sec-websocket-extensions'?: string | undefined;
  'sec-websocket-key'?: string | undefined;
  'sec-websocket-protocol'?: string | undefined;
  'sec-websocket-version'?: string | undefined;
  'set-cookie'?: string | string[] | undefined;
  'strict-transport-security'?: string | undefined;
  tk?: string | undefined;
  trailer?: string | undefined;
  'transfer-encoding'?: string | undefined;
  upgrade?: string | undefined;
  'user-agent'?: string | undefined;
  vary?: string | undefined;
  via?: string | undefined;
  warning?: string | undefined;
  'www-authenticate'?: string | undefined;
}


/**
 * **HttpHeaders** - A flexible type for representing HTTP headers, extending the set of commonly used headers in `CommonHttpHeaders`.
 *
 * This interface builds upon the `CommonHttpHeaders` interface and allows for additional custom headers. The key-value pairs are dynamic, with the key being a string (representing the header name) and the value being a string or an array of strings (representing the header values).
 * This flexibility makes it suitable for working with both standard HTTP headers and custom headers.
 *
 * ### Example Usage:
 *
 * ```typescript
 * const headers: HttpHeaders = {
 *   'content-type': 'application/json',
 *   'accept': 'application/json',
 *   'x-custom-header': 'value'
 * };
 * ```
 *
 * ### Behavior:
 * - Supports dynamic header names, making it easy to add custom headers without predefining them.
 * - Allows for multiple values for certain headers, such as `accept` or `cookie`, which can hold multiple values.
 * - Builds on `CommonHttpHeaders` to include standard headers, while providing extensibility for non-standard headers.
 */
export interface HttpHeaders extends CommonHttpHeaders {
  [key: string]: string | string[] | undefined;
}
