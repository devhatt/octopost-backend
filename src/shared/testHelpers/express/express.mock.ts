/* istanbul ignore file -- @preserve */

import type { IncomingMessage } from 'http';
import type { Readable } from 'stream';
import type { NextFunction, Request } from 'express';
import type { Mock } from 'vitest';

// Types
import type { ServerResponse, OutgoingMessage } from 'http';
import type { Writable } from 'stream';
import type { Response } from 'express';

// Local Types

interface StreamWritable extends EventEventEmitter {
  writable?: Writable['writable'];
  writableEnded?: Writable['writableEnded'];
  writableFinished?: Writable['writableFinished'];
  writableHighWaterMark?: Writable['writableHighWaterMark'];
  writableLength?: Writable['writableLength'];
  writableObjectMode?: Writable['writableObjectMode'];
  writableCorked?: Writable['writableCorked'];
  destroyed?: Writable['destroyed'];
  _write?: Mock;
  _writev?: Mock;
  _destroy?: Mock;
  _final?: Mock;
  write?: Mock;
  setDefaultEncoding?: Mock;
  end?: Mock;
  cork?: Mock;
  uncork?: Mock;
  destroy?: Mock;
  addListener?: Mock;
  emit?: Mock;
  on?: Mock;
  once?: Mock;
  prependListener?: Mock;
  prependOnceListener?: Mock;
  removeListener?: Mock;
}

interface HttpOutgoingMessage extends StreamWritable {
  req?: Partial<IncomingMessage>;
  chunkedEncoding?: OutgoingMessage['chunkedEncoding'];
  shouldKeepAlive?: OutgoingMessage['shouldKeepAlive'];
  useChunkedEncodingByDefault?: OutgoingMessage['useChunkedEncodingByDefault'];
  sendDate?: OutgoingMessage['sendDate'];
  finished?: OutgoingMessage['finished'];
  headersSent?: OutgoingMessage['headersSent'];
  connection?: Partial<OutgoingMessage['connection']>;
  socket?: Partial<OutgoingMessage['socket']>;
  setTimeout?: Mock;
  setHeader?: Mock;
  getHeader?: Mock;
  getHeaders?: Mock;
  getHeaderNames?: Mock;
  hasHeader?: Mock;
  removeHeader?: Mock;
  addTrailers?: Mock;
  flushHeaders?: Mock;
}

interface HttpServerResponse extends HttpOutgoingMessage {
  statusCode?: ServerResponse['statusCode'];
  statusMessage?: ServerResponse['statusMessage'];
  assignSocket?: Mock;
  detachSocket?: Mock;
  writeContinue?: Mock;
  writeHead?: Mock;
  writeProcessing?: Mock;
}

export interface MockResponse extends HttpServerResponse {
  status?: Mock;
  sendStatus?: Mock;
  links?: Mock;
  send?: Mock;
  json?: Mock;
  jsonp?: Mock;
  sendFile?: Mock;
  sendfile?: Mock;
  download?: Mock;
  contentType?: Mock;
  type?: Mock;
  format?: Mock;
  attachment?: Mock;
  set?: Mock;
  header?: Mock;
  headersSent?: Response['headersSent'];
  get?: Mock;
  clearCookie?: Mock;
  cookie?: Mock;
  location?: Mock;
  redirect?: Mock;
  render?: Mock;
  locals?: Partial<Response['locals']>;
  charset?: Response['charset'];
  vary?: Mock;
  app?: Partial<Response['app']>;
  append?: Mock;
  req?: Partial<Response['req']>;

  // allow custom properties to be provided
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export interface EventEventEmitter {
  addListener?: Mock;
  on?: Mock;
  once?: Mock;
  removeListener?: Mock;
  off?: Mock;
  removeAllListeners?: Mock;
  setMaxListeners?: Mock;
  getMaxListeners?: Mock;
  listeners?: Mock;
  rawListeners?: Mock;
  emit?: Mock;
  listenerCount?: Mock;
  prependListener?: Mock;
  prependOnceListener?: Mock;
  eventNames?: Mock;
}

interface StreamReadable extends EventEventEmitter {
  readable?: Readable['readable'];
  readableHighWaterMark?: Readable['readableHighWaterMark'];
  readableLength?: Readable['readableLength'];
  readableObjectMode?: Readable['readableObjectMode'];
  destroyed?: Readable['destroyed'];
  _read?: Mock;
  read?: Mock;
  setEncoding?: Mock;
  pause?: Mock;
  resume?: Mock;
  isPaused?: Mock;
  unpipe?: Mock;
  unshift?: Mock;
  wrap?: Mock;
  push?: Mock;
  _destroy?: Mock;
  addListener?: Mock;
  emit?: Mock;
  on?: Mock;
  once?: Mock;
  prependListener?: Mock;
  prependOnceListener?: Mock;
  removeListener?: Mock;
  destroy?: Mock;
}

interface HttpIncomingMessage extends StreamReadable {
  aborted?: IncomingMessage['aborted'];
  httpVersion?: IncomingMessage['httpVersion'];
  httpVersionMajor?: IncomingMessage['httpVersionMajor'];
  httpVersionMinor?: IncomingMessage['httpVersionMinor'];
  complete?: IncomingMessage['complete'];
  connection?: Partial<IncomingMessage['connection']>;
  socket?: Partial<IncomingMessage['socket']>;
  headers?: Partial<IncomingMessage['headers']>;
  rawHeaders?: IncomingMessage['rawHeaders'];
  trailers?: IncomingMessage['trailers'];
  rawTrailers?: IncomingMessage['rawTrailers'];
  setTimeout?: Mock;
  statusCode?: IncomingMessage['statusCode'];
  statusMessage?: IncomingMessage['statusMessage'];
  destroy?: Mock;
}

export interface MockRequest extends HttpIncomingMessage {
  params?: Request['params'];
  query?: Request['query'];
  body?: Request['body'];
  cookies?: Request['cookies'];
  method?: Request['method'];
  protocol?: Request['protocol'];
  secure?: Request['secure'];
  ip?: Request['ip'];
  ips?: Request['ips'];
  subdomains?: Request['subdomains'];
  path?: Request['path'];
  hostname?: Request['hostname'];
  host?: Request['host'];
  fresh?: Request['fresh'];
  stale?: Request['stale'];
  xhr?: Request['xhr'];
  route?: Request['route'];
  signedCookies?: Request['signedCookies'];
  originalUrl?: Request['originalUrl'];
  url?: Request['url'];
  baseUrl?: Request['baseUrl'];
  accepted?: Request['accepted'];
  get?: Mock;
  header?: Mock;
  accepts?: Mock;
  acceptsCharsets?: Mock;
  acceptsEncodings?: Mock;
  acceptsLanguages?: Mock;
  range?: Mock;
  param?: Mock;
  is?: Mock;
  app?: Partial<Request['app']>;
  res?: Partial<Request['res']>;
  next?: Mock;

  // allow custom properties to be provided
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export const getMockRequest = <T extends Request>(
  values: MockRequest = {}
): T => {
  const {
    /* express.Request */
    params = {},
    query = {},
    body = {},
    cookies = {},
    method = '',
    protocol = '',
    secure = false,
    ip = '',
    ips = [],
    subdomains = [],
    path = '',
    hostname = '',
    host = '',
    fresh = false,
    stale = false,
    xhr = false,
    route = {},
    signedCookies = {},
    originalUrl = '',
    url = '',
    baseUrl = '',
    accepted = [],
    get = vi.fn().mockName('get mock default'),
    header = vi.fn().mockName('header mock default'),
    accepts = vi.fn().mockName('accepts mock default'),
    acceptsCharsets = vi.fn().mockName('acceptsCharsets mock default'),
    acceptsEncodings = vi.fn().mockName('acceptsEncodings mock default'),
    acceptsLanguages = vi.fn().mockName('acceptsLanguages mock default'),
    range = vi.fn().mockName('range mock default'),
    param = vi.fn().mockName('param mock default'),
    is = vi.fn().mockName('is mock default'),
    app = {},
    res = vi.fn().mockName('res mock default'),
    next = vi.fn().mockName('next mock default'),
    aborted = false,
    httpVersion = '',
    httpVersionMajor = 0,
    httpVersionMinor = 0,
    complete = false,
    connection = {},
    socket = {},
    headers = {},
    rawHeaders = [],
    trailers = {},
    rawTrailers = [],
    setTimeout = vi.fn().mockName('setTimeout mock default'),
    statusCode = 0,
    statusMessage = '',
    destroy = vi.fn().mockName('destroy mock default'),
    readable = false,
    readableHighWaterMark = 0,
    readableLength = 0,
    readableObjectMode = false,
    destroyed = false,
    _read = vi.fn().mockName('_read mock default'),
    read = vi.fn().mockName('read mock default'),
    setEncoding = vi.fn().mockName('setEncoding mock default'),
    pause = vi.fn().mockName('pause mock default'),
    resume = vi.fn().mockName('resume mock default'),
    isPaused = vi.fn().mockName('isPaused mock default'),
    unpipe = vi.fn().mockName('unpipe mock default'),
    unshift = vi.fn().mockName('unshift mock default'),
    wrap = vi.fn().mockName('wrap mock default'),
    push = vi.fn().mockName('push mock default'),
    _destroy = vi.fn().mockName('_destroy mock default'),
    addListener = vi.fn().mockName('addListener mock default'),
    emit = vi.fn().mockName('emit mock default'),
    on = vi.fn().mockName('on mock default'),
    once = vi.fn().mockName('once mock default'),
    prependListener = vi.fn().mockName('prependListener mock default'),
    prependOnceListener = vi.fn().mockName('prependOnceListener mock default'),
    removeListener = vi.fn().mockName('removeListener mock default'),
    off = vi.fn().mockName('off mock default'),
    removeAllListeners = vi.fn().mockName('removeAllListeners mock default'),
    setMaxListeners = vi.fn().mockName('setMaxListeners mock default'),
    getMaxListeners = vi.fn().mockName('getMaxListeners mock default'),
    listeners = vi.fn().mockName('listeners mock default'),
    rawListeners = vi.fn().mockName('rawListeners mock default'),
    listenerCount = vi.fn().mockName('listenerCount mock default'),
    eventNames = vi.fn().mockName('eventNames mock default'),
    ...extraProvidedValues
  } = values;

  const request = {
    /* express.Request */
    params,
    query,
    body,
    cookies,
    method,
    protocol,
    secure,
    ip,
    ips,
    subdomains,
    path,
    hostname,
    host,
    fresh,
    stale,
    xhr,
    route,
    signedCookies,
    originalUrl,
    url,
    baseUrl,
    accepted,
    get,
    header,
    accepts,
    acceptsCharsets,
    acceptsEncodings,
    acceptsLanguages,
    range,
    param,
    is,
    app,
    res,
    next,

    /* http.IncomingMessage */
    aborted,
    httpVersion,
    httpVersionMajor,
    httpVersionMinor,
    complete,
    connection,
    socket,
    headers,
    rawHeaders,
    trailers,
    rawTrailers,
    setTimeout,
    statusCode,
    statusMessage,
    destroy,

    /* stream.Readable */
    readable,
    readableHighWaterMark,
    readableLength,
    readableObjectMode,
    destroyed,
    _read,
    read,
    setEncoding,
    pause,
    resume,
    isPaused,
    unpipe,
    unshift,
    wrap,
    push,
    _destroy,
    addListener,
    emit,
    on,
    once,
    prependListener,
    prependOnceListener,
    removeListener,
    // destroy - is handled/overridden as part of http.IncomingMessage

    /* event.EventEmitter */
    // addListener - is handled/overridden as part of stream.Readable
    // on - is handled/overridden as part of stream.Readable
    // once - is handled/overridden as part of stream.Readable
    // removeListener - is handled/overridden as part of stream.Readable
    off,
    removeAllListeners,
    setMaxListeners,
    getMaxListeners,
    listeners,
    rawListeners,
    // emit - is handled/overridden as part of stream.Readable
    listenerCount,
    // prependListener - is handled/overridden as part of stream.Readable
    // prependOnceListener - is handled/overridden as part of stream.Readable
    eventNames,

    // custom values
    ...extraProvidedValues,
  };

  return request as unknown as T;
};

export const getMockResponse = <T extends Response>(
  values: MockResponse = {}
): {
  res: T;
  next: NextFunction;
  mockClear: () => void;
  clearMockRes: () => void;
} => {
  const next = vi.fn();
  const {
    /* express.Response */
    status = vi.fn().mockName('status mock default'),
    sendStatus = vi.fn().mockName('sendStatus mock default'),
    links = vi.fn().mockName('links mock default'),
    send = vi.fn().mockName('send mock default'),
    json = vi.fn().mockName('json mock default'),
    jsonp = vi.fn().mockName('jsonp mock default'),
    sendFile = vi.fn().mockName('sendFile mock default'),
    sendfile = vi.fn().mockName('sendfile mock default'),
    download = vi.fn().mockName('download mock default'),
    contentType = vi.fn().mockName('contentType mock default'),
    type = vi.fn().mockName('type mock default'),
    format = vi.fn().mockName('format mock default'),
    attachment = vi.fn().mockName('attachment mock default'),
    set = vi.fn().mockName('set mock default'),
    header = vi.fn().mockName('header mock default'),
    headersSent = false,
    get = vi.fn().mockName('get mock default'),
    clearCookie = vi.fn().mockName('clearCookie mock default'),
    cookie = vi.fn().mockName('cookie mock default'),
    location = vi.fn().mockName('location mock default'),
    redirect = vi.fn().mockName('redirect mock default'),
    render = vi.fn().mockName('render mock default'),
    locals = {},
    charset = '',
    vary = vi.fn().mockName('vary mock default'),
    app = {},
    append = vi.fn().mockName('append mock default'),
    req = {},

    /* http.ServerResponse */
    statusCode = 0,
    statusMessage = '',
    assignSocket = vi.fn().mockName('assignSocket mock default'),
    detachSocket = vi.fn().mockName('detachSocket mock default'),
    writeContinue = vi.fn().mockName('writeContinue mock default'),
    writeHead = vi.fn().mockName('writeHead mock default'),
    writeProcessing = vi.fn().mockName('writeProcessing mock default'),

    /* http.OutgoingMessage */
    // req - is handled/overridden as part of express.Response
    chunkedEncoding = false,
    shouldKeepAlive = false,
    useChunkedEncodingByDefault = false,
    sendDate = false,
    finished = false,
    // headersSent - is handled/overridden as part of express.Response
    connection = {},
    socket = {},
    setTimeout = vi.fn().mockName('setTimeout mock default'),
    setHeader = vi.fn().mockName('setHeader mock default'),
    getHeader = vi.fn().mockName('getHeader mock default'),
    getHeaders = vi.fn().mockName('getHeaders mock default'),
    getHeaderNames = vi.fn().mockName('getHeaderNames mock default'),
    hasHeader = vi.fn().mockName('hasHeader mock default'),
    removeHeader = vi.fn().mockName('removeHeader mock default'),
    addTrailers = vi.fn().mockName('addTrailers mock default'),
    flushHeaders = vi.fn().mockName('flushHeaders mock default'),

    /* stream.Writable */
    writable = false,
    writableEnded = false,
    writableFinished = false,
    writableHighWaterMark = 0,
    writableLength = 0,
    writableObjectMode = false,
    writableCorked = 0,
    destroyed = false,
    _write = vi.fn().mockName('_write mock default'),
    _writev = vi.fn().mockName('_writev mock default'),
    _destroy = vi.fn().mockName('_destroy mock default'),
    _final = vi.fn().mockName('_final mock default'),
    write = vi.fn().mockName('write mock default'),
    setDefaultEncoding = vi.fn().mockName('setDefaultEncoding mock default'),
    end = vi.fn().mockName('end mock default'),
    cork = vi.fn().mockName('cork mock default'),
    uncork = vi.fn().mockName('uncork mock default'),
    destroy = vi.fn().mockName('destroy mock default'),
    addListener = vi.fn().mockName('addListener mock default'),
    emit = vi.fn().mockName('emit mock default'),
    on = vi.fn().mockName('on mock default'),
    once = vi.fn().mockName('once mock default'),
    prependListener = vi.fn().mockName('prependListener mock default'),
    prependOnceListener = vi.fn().mockName('prependOnceListener mock default'),
    removeListener = vi.fn().mockName('removeListener mock default'),

    /* event.EventEmitter */
    // addListener - is handled/overridden as part of stream.Writable
    // on - is handled/overridden as part of stream.Writable
    // once - is handled/overridden as part of stream.Writable
    // removeListener - is handled/overridden as part of stream.Writable
    off = vi.fn().mockName('off mock default'),
    removeAllListeners = vi.fn().mockName('removeAllListeners mock default'),
    setMaxListeners = vi.fn().mockName('setMaxListeners mock default'),
    getMaxListeners = vi.fn().mockName('getMaxListeners mock default'),
    listeners = vi.fn().mockName('listeners mock default'),
    rawListeners = vi.fn().mockName('rawListeners mock default'),
    // emit - is handled/overridden as part of stream.Writable
    listenerCount = vi.fn().mockName('listenerCount mock default'),
    // prependListener - is handled/overridden as part of stream.Writable
    // prependOnceListener - is handled/overridden as part of stream.Writable
    eventNames = vi.fn().mockName('eventNames mock default'),

    // custom values
    ...extraProvidedValues
  } = values;

  const response = {
    /* express.Response */
    status,
    sendStatus,
    links,
    send,
    json,
    jsonp,
    sendFile,
    sendfile,
    download,
    contentType,
    type,
    format,
    attachment,
    set,
    header,
    get,
    clearCookie,
    cookie,
    location,
    redirect,
    render,
    vary,
    append,
    headersSent,
    locals,
    charset,
    app,
    req,

    /* http.ServerResponse */
    statusCode,
    statusMessage,
    assignSocket,
    detachSocket,
    writeContinue,
    writeHead,
    writeProcessing,

    /* http.OutgoingMessage */
    chunkedEncoding,
    shouldKeepAlive,
    useChunkedEncodingByDefault,
    sendDate,
    finished,
    connection,
    socket,
    setTimeout,
    setHeader,
    getHeader,
    getHeaders,
    getHeaderNames,
    hasHeader,
    removeHeader,
    addTrailers,
    flushHeaders,

    /* stream.Writable */
    writable,
    writableEnded,
    writableFinished,
    writableHighWaterMark,
    writableLength,
    writableObjectMode,
    writableCorked,
    destroyed,
    _write,
    _writev,
    _destroy,
    _final,
    write,
    setDefaultEncoding,
    end,
    cork,
    uncork,
    destroy,
    addListener,
    emit,
    on,
    once,
    prependListener,
    prependOnceListener,
    removeListener,

    /* event.EventEmitter */
    // addListener - is handled/overridden as part of stream.Writable
    // on - is handled/overridden as part of stream.Writable
    // once - is handled/overridden as part of stream.Writable
    // removeListener - is handled/overridden as part of stream.Writable
    off,
    removeAllListeners,
    setMaxListeners,
    getMaxListeners,
    listeners,
    rawListeners,
    // emit - is handled/overridden as part of stream.Writable
    listenerCount,
    // prependListener - is handled/overridden as part of stream.Writable
    // prependOnceListener - is handled/overridden as part of stream.Writable
    eventNames,

    // custom values
    ...extraProvidedValues,
  };

  /* express.Response - chainable functions */
  response.status.mockReturnValue(response);
  response.sendStatus.mockReturnValue(response);
  response.links.mockReturnValue(response);
  response.send.mockReturnValue(response);
  response.json.mockReturnValue(response);
  response.jsonp.mockReturnValue(response);
  response.contentType.mockReturnValue(response);
  response.type.mockReturnValue(response);
  response.format.mockReturnValue(response);
  response.attachment.mockReturnValue(response);
  response.set.mockReturnValue(response);
  response.header.mockReturnValue(response);
  response.clearCookie.mockReturnValue(response);
  response.cookie.mockReturnValue(response);
  response.location.mockReturnValue(response);
  response.vary.mockReturnValue(response);
  response.append.mockReturnValue(response);

  /* http.ServerResponse - chainable functions */
  response.writeHead.mockReturnValue(response);

  /* http.OutgoingMessage - chainable functions */
  response.setTimeout.mockReturnValue(response);

  /* stream.Writable - chainable functions */
  response.setDefaultEncoding.mockReturnValue(response);
  response.addListener.mockReturnValue(response);
  response.on.mockReturnValue(response);
  response.once.mockReturnValue(response);
  response.prependListener.mockReturnValue(response);
  response.prependOnceListener.mockReturnValue(response);
  response.removeListener.mockReturnValue(response);

  /* event.EventEmitter - chainable functions */
  // addListener - is handled/overridden as part of stream.Writable
  // on - is handled/overridden as part of stream.Writable
  // once - is handled/overridden as part of stream.Writable
  // removeListener - is handled/overridden as part of stream.Writable
  response.off.mockReturnValue(response);
  response.removeAllListeners.mockReturnValue(response);
  response.setMaxListeners.mockReturnValue(response);
  // prependListener - is handled/overridden as part of stream.Writable
  // prependOnceListener - is handled/overridden as part of stream.Writable

  const clearAllMocks = (): void => {
    next.mockClear();
    /* express.Response */
    response.status.mockClear();
    response.sendStatus.mockClear();
    response.links.mockClear();
    response.send.mockClear();
    response.json.mockClear();
    response.jsonp.mockClear();
    response.sendFile.mockClear();
    response.sendfile.mockClear();
    response.download.mockClear();
    response.contentType.mockClear();
    response.type.mockClear();
    response.format.mockClear();
    response.attachment.mockClear();
    response.set.mockClear();
    response.header.mockClear();
    response.get.mockClear();
    response.clearCookie.mockClear();
    response.cookie.mockClear();
    response.location.mockClear();
    response.redirect.mockClear();
    response.render.mockClear();
    response.vary.mockClear();
    response.append.mockClear();

    /* http.ServerResponse */
    response.assignSocket.mockClear();
    response.detachSocket.mockClear();
    response.writeContinue.mockClear();
    response.writeHead.mockClear();
    response.writeProcessing.mockClear();

    /* http.OutgoingMessage */
    response.setTimeout.mockClear();
    response.setHeader.mockClear();
    response.getHeader.mockClear();
    response.getHeaders.mockClear();
    response.getHeaderNames.mockClear();
    response.hasHeader.mockClear();
    response.removeHeader.mockClear();
    response.addTrailers.mockClear();
    response.flushHeaders.mockClear();

    /* stream.Writable */
    response._write.mockClear();
    response._writev.mockClear();
    response._destroy.mockClear();
    response._final.mockClear();
    response.write.mockClear();
    response.setDefaultEncoding.mockClear();
    response.end.mockClear();
    response.cork.mockClear();
    response.uncork.mockClear();
    response.destroy.mockClear();
    response.addListener.mockClear();
    response.emit.mockClear();
    response.on.mockClear();
    response.once.mockClear();
    response.prependListener.mockClear();
    response.prependOnceListener.mockClear();
    response.removeListener.mockClear();

    /* event.EventEmitter */
    // addListener - is handled/overridden as part of stream.Writable
    // on - is handled/overridden as part of stream.Writable
    // once - is handled/overridden as part of stream.Writable
    // removeListener - is handled/overridden as part of stream.Writable
    response.off.mockClear();
    response.removeAllListeners.mockClear();
    response.setMaxListeners.mockClear();
    response.getMaxListeners.mockClear();
    response.listeners.mockClear();
    response.rawListeners.mockClear();
    // emit - is handled/overridden as part of stream.Writable
    response.listenerCount.mockClear();
    // prependListener - is handled/overridden as part of stream.Writable
    // prependOnceListener - is handled/overridden as part of stream.Writable
    response.eventNames.mockClear();
  };

  return {
    res: response as unknown as T,
    next: next as NextFunction,
    mockClear: clearAllMocks,
    clearMockRes: clearAllMocks,
  };
};
