/* istanbul ignore file -- @preserve */

import type {
  IncomingMessage,
  OutgoingMessage,
  ServerResponse,
} from 'node:http';
import type { Readable, Writable } from 'node:stream';
import type { NextFunction, Request, Response } from 'express';
import type { Mock } from 'vitest';

interface StreamWritable extends EventEventEmitter {
  _destroy?: Mock;
  // Local Types

  _final?: Mock;
  _write?: Mock;
  _writev?: Mock;
  addListener?: Mock;
  cork?: Mock;
  destroy?: Mock;
  destroyed?: Writable['destroyed'];
  emit?: Mock;
  end?: Mock;
  on?: Mock;
  once?: Mock;
  prependListener?: Mock;
  prependOnceListener?: Mock;
  removeListener?: Mock;
  setDefaultEncoding?: Mock;
  uncork?: Mock;
  writable?: Writable['writable'];
  writableCorked?: Writable['writableCorked'];
  writableEnded?: Writable['writableEnded'];
  writableFinished?: Writable['writableFinished'];
  writableHighWaterMark?: Writable['writableHighWaterMark'];
  writableLength?: Writable['writableLength'];
  writableObjectMode?: Writable['writableObjectMode'];
  write?: Mock;
}

interface HttpOutgoingMessage extends StreamWritable {
  addTrailers?: Mock;
  chunkedEncoding?: OutgoingMessage['chunkedEncoding'];
  connection?: Partial<OutgoingMessage['connection']>;
  finished?: OutgoingMessage['finished'];
  flushHeaders?: Mock;
  getHeader?: Mock;
  getHeaderNames?: Mock;
  getHeaders?: Mock;
  hasHeader?: Mock;
  headersSent?: OutgoingMessage['headersSent'];
  removeHeader?: Mock;
  req?: Partial<IncomingMessage>;
  sendDate?: OutgoingMessage['sendDate'];
  setHeader?: Mock;
  setTimeout?: Mock;
  shouldKeepAlive?: OutgoingMessage['shouldKeepAlive'];
  socket?: Partial<OutgoingMessage['socket']>;
  useChunkedEncodingByDefault?: OutgoingMessage['useChunkedEncodingByDefault'];
}

interface HttpServerResponse extends HttpOutgoingMessage {
  assignSocket?: Mock;
  detachSocket?: Mock;
  statusCode?: ServerResponse['statusCode'];
  statusMessage?: ServerResponse['statusMessage'];
  writeContinue?: Mock;
  writeHead?: Mock;
  writeProcessing?: Mock;
}

export interface MockResponse extends HttpServerResponse {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
  app?: Partial<Response['app']>;
  append?: Mock;
  attachment?: Mock;
  charset?: Response['charset'];
  clearCookie?: Mock;
  contentType?: Mock;
  cookie?: Mock;
  download?: Mock;
  format?: Mock;
  get?: Mock;
  header?: Mock;
  headersSent?: Response['headersSent'];
  json?: Mock;
  jsonp?: Mock;
  links?: Mock;
  locals?: Partial<Response['locals']>;
  location?: Mock;
  redirect?: Mock;
  render?: Mock;
  req?: Partial<Response['req']>;
  send?: Mock;
  sendfile?: Mock;
  sendFile?: Mock;
  sendStatus?: Mock;
  set?: Mock;
  status?: Mock;
  type?: Mock;

  // allow custom properties to be provided
  vary?: Mock;
}

export interface EventEventEmitter {
  addListener?: Mock;
  emit?: Mock;
  eventNames?: Mock;
  getMaxListeners?: Mock;
  listenerCount?: Mock;
  listeners?: Mock;
  off?: Mock;
  on?: Mock;
  once?: Mock;
  prependListener?: Mock;
  prependOnceListener?: Mock;
  rawListeners?: Mock;
  removeAllListeners?: Mock;
  removeListener?: Mock;
  setMaxListeners?: Mock;
}

interface StreamReadable extends EventEventEmitter {
  _destroy?: Mock;
  _read?: Mock;
  addListener?: Mock;
  destroy?: Mock;
  destroyed?: Readable['destroyed'];
  emit?: Mock;
  isPaused?: Mock;
  on?: Mock;
  once?: Mock;
  pause?: Mock;
  prependListener?: Mock;
  prependOnceListener?: Mock;
  push?: Mock;
  read?: Mock;
  readable?: Readable['readable'];
  readableHighWaterMark?: Readable['readableHighWaterMark'];
  readableLength?: Readable['readableLength'];
  readableObjectMode?: Readable['readableObjectMode'];
  removeListener?: Mock;
  resume?: Mock;
  setEncoding?: Mock;
  unpipe?: Mock;
  unshift?: Mock;
  wrap?: Mock;
}

interface HttpIncomingMessage extends StreamReadable {
  aborted?: IncomingMessage['aborted'];
  complete?: IncomingMessage['complete'];
  connection?: Partial<IncomingMessage['connection']>;
  destroy?: Mock;
  headers?: Partial<IncomingMessage['headers']>;
  httpVersion?: IncomingMessage['httpVersion'];
  httpVersionMajor?: IncomingMessage['httpVersionMajor'];
  httpVersionMinor?: IncomingMessage['httpVersionMinor'];
  rawHeaders?: IncomingMessage['rawHeaders'];
  rawTrailers?: IncomingMessage['rawTrailers'];
  setTimeout?: Mock;
  socket?: Partial<IncomingMessage['socket']>;
  statusCode?: IncomingMessage['statusCode'];
  statusMessage?: IncomingMessage['statusMessage'];
  trailers?: IncomingMessage['trailers'];
}

export interface MockRequest extends HttpIncomingMessage {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
  accepted?: Request['accepted'];
  accepts?: Mock;
  acceptsCharsets?: Mock;
  acceptsEncodings?: Mock;
  acceptsLanguages?: Mock;
  app?: Partial<Request['app']>;
  baseUrl?: Request['baseUrl'];
  body?: Request['body'];
  cookies?: Request['cookies'];
  fresh?: Request['fresh'];
  get?: Mock;
  header?: Mock;
  host?: Request['host'];
  hostname?: Request['hostname'];
  ip?: Request['ip'];
  ips?: Request['ips'];
  is?: Mock;
  method?: Request['method'];
  next?: Mock;
  originalUrl?: Request['originalUrl'];
  param?: Mock;
  params?: Request['params'];
  path?: Request['path'];
  protocol?: Request['protocol'];
  query?: Request['query'];
  range?: Mock;
  res?: Partial<Request['res']>;
  route?: Request['route'];
  secure?: Request['secure'];
  signedCookies?: Request['signedCookies'];
  stale?: Request['stale'];
  subdomains?: Request['subdomains'];
  url?: Request['url'];

  // allow custom properties to be provided
  xhr?: Request['xhr'];
}

export const getMockRequest = <T extends Request>(
  values: MockRequest = {}
): T => {
  const {
    _destroy = vi.fn().mockName('_destroy mock default'),
    _read = vi.fn().mockName('_read mock default'),
    aborted = false,
    accepted = [],
    accepts = vi.fn().mockName('accepts mock default'),
    acceptsCharsets = vi.fn().mockName('acceptsCharsets mock default'),
    acceptsEncodings = vi.fn().mockName('acceptsEncodings mock default'),
    acceptsLanguages = vi.fn().mockName('acceptsLanguages mock default'),
    addListener = vi.fn().mockName('addListener mock default'),
    app = {},
    baseUrl = '',
    body = {},
    complete = false,
    connection = {},
    cookies = {},
    destroy = vi.fn().mockName('destroy mock default'),
    destroyed = false,
    emit = vi.fn().mockName('emit mock default'),
    eventNames = vi.fn().mockName('eventNames mock default'),
    fresh = false,
    get = vi.fn().mockName('get mock default'),
    getMaxListeners = vi.fn().mockName('getMaxListeners mock default'),
    header = vi.fn().mockName('header mock default'),
    headers = {},
    host = '',
    hostname = '',
    httpVersion = '',
    httpVersionMajor = 0,
    httpVersionMinor = 0,
    ip = '',
    ips = [],
    is = vi.fn().mockName('is mock default'),
    isPaused = vi.fn().mockName('isPaused mock default'),
    listenerCount = vi.fn().mockName('listenerCount mock default'),
    listeners = vi.fn().mockName('listeners mock default'),
    method = '',
    next = vi.fn().mockName('next mock default'),
    off = vi.fn().mockName('off mock default'),
    on = vi.fn().mockName('on mock default'),
    once = vi.fn().mockName('once mock default'),
    originalUrl = '',
    param = vi.fn().mockName('param mock default'),
    /* express.Request */
    params = {},
    path = '',
    pause = vi.fn().mockName('pause mock default'),
    prependListener = vi.fn().mockName('prependListener mock default'),
    prependOnceListener = vi.fn().mockName('prependOnceListener mock default'),
    protocol = '',
    push = vi.fn().mockName('push mock default'),
    query = {},
    range = vi.fn().mockName('range mock default'),
    rawHeaders = [],
    rawListeners = vi.fn().mockName('rawListeners mock default'),
    rawTrailers = [],
    read = vi.fn().mockName('read mock default'),
    readable = false,
    readableHighWaterMark = 0,
    readableLength = 0,
    readableObjectMode = false,
    removeAllListeners = vi.fn().mockName('removeAllListeners mock default'),
    removeListener = vi.fn().mockName('removeListener mock default'),
    res = vi.fn().mockName('res mock default'),
    resume = vi.fn().mockName('resume mock default'),
    route = {},
    secure = false,
    setEncoding = vi.fn().mockName('setEncoding mock default'),
    setMaxListeners = vi.fn().mockName('setMaxListeners mock default'),
    setTimeout = vi.fn().mockName('setTimeout mock default'),
    signedCookies = {},
    socket = {},
    stale = false,
    statusCode = 0,
    statusMessage = '',
    subdomains = [],
    trailers = {},
    unpipe = vi.fn().mockName('unpipe mock default'),
    unshift = vi.fn().mockName('unshift mock default'),
    url = '',
    wrap = vi.fn().mockName('wrap mock default'),
    xhr = false,
    ...extraProvidedValues
  } = values;

  const request = {
    _destroy,
    _read,
    /* http.IncomingMessage */
    aborted,
    accepted,
    accepts,
    acceptsCharsets,
    acceptsEncodings,
    acceptsLanguages,
    addListener,
    app,
    baseUrl,
    body,
    complete,
    connection,
    cookies,
    destroy,
    destroyed,
    emit,
    // prependOnceListener - is handled/overridden as part of stream.Readable
    eventNames,
    fresh,
    get,
    getMaxListeners,
    header,
    headers,
    host,
    hostname,
    httpVersion,
    httpVersionMajor,
    httpVersionMinor,
    ip,
    ips,
    is,
    isPaused,
    // emit - is handled/overridden as part of stream.Readable
    listenerCount,

    listeners,
    method,
    next,
    // removeListener - is handled/overridden as part of stream.Readable
    off,
    on,
    once,
    originalUrl,
    param,
    /* express.Request */
    params,
    path,
    pause,
    prependListener,
    prependOnceListener,
    protocol,
    push,

    query,
    range,
    rawHeaders,
    rawListeners,
    rawTrailers,
    read,
    /* stream.Readable */
    readable,
    readableHighWaterMark,
    readableLength,
    readableObjectMode,
    removeAllListeners,
    removeListener,
    res,
    resume,
    route,
    secure,
    setEncoding,
    setMaxListeners,
    setTimeout,
    signedCookies,
    socket,
    stale,
    statusCode,
    // destroy - is handled/overridden as part of http.IncomingMessage

    /* event.EventEmitter */
    // addListener - is handled/overridden as part of stream.Readable
    // on - is handled/overridden as part of stream.Readable
    // once - is handled/overridden as part of stream.Readable
    statusMessage,
    subdomains,
    trailers,
    unpipe,
    unshift,
    url,
    wrap,
    // prependListener - is handled/overridden as part of stream.Readable
    xhr,

    // custom values
    ...extraProvidedValues,
  };

  return request as unknown as T;
};

export const getMockResponse = <T extends Response>(
  values: MockResponse = {}
): {
  clearMockRes: () => void;
  mockClear: () => void;
  next: NextFunction;
  res: T;
} => {
  const next = vi.fn();
  const {
    _destroy = vi.fn().mockName('_destroy mock default'),
    _final = vi.fn().mockName('_final mock default'),
    _write = vi.fn().mockName('_write mock default'),
    _writev = vi.fn().mockName('_writev mock default'),
    addListener = vi.fn().mockName('addListener mock default'),
    addTrailers = vi.fn().mockName('addTrailers mock default'),
    app = {},
    append = vi.fn().mockName('append mock default'),
    assignSocket = vi.fn().mockName('assignSocket mock default'),
    attachment = vi.fn().mockName('attachment mock default'),
    charset = '',
    // req - is handled/overridden as part of express.Response
    chunkedEncoding = false,
    clearCookie = vi.fn().mockName('clearCookie mock default'),
    // headersSent - is handled/overridden as part of express.Response
    connection = {},
    contentType = vi.fn().mockName('contentType mock default'),
    cookie = vi.fn().mockName('cookie mock default'),
    cork = vi.fn().mockName('cork mock default'),
    destroy = vi.fn().mockName('destroy mock default'),
    destroyed = false,
    detachSocket = vi.fn().mockName('detachSocket mock default'),
    download = vi.fn().mockName('download mock default'),
    emit = vi.fn().mockName('emit mock default'),
    end = vi.fn().mockName('end mock default'),
    // prependOnceListener - is handled/overridden as part of stream.Writable
    eventNames = vi.fn().mockName('eventNames mock default'),
    finished = false,
    flushHeaders = vi.fn().mockName('flushHeaders mock default'),
    format = vi.fn().mockName('format mock default'),
    get = vi.fn().mockName('get mock default'),

    getHeader = vi.fn().mockName('getHeader mock default'),
    getHeaderNames = vi.fn().mockName('getHeaderNames mock default'),
    getHeaders = vi.fn().mockName('getHeaders mock default'),
    getMaxListeners = vi.fn().mockName('getMaxListeners mock default'),
    hasHeader = vi.fn().mockName('hasHeader mock default'),
    header = vi.fn().mockName('header mock default'),
    headersSent = false,

    /* http.OutgoingMessage */
    json = vi.fn().mockName('json mock default'),
    jsonp = vi.fn().mockName('jsonp mock default'),
    links = vi.fn().mockName('links mock default'),
    // emit - is handled/overridden as part of stream.Writable
    listenerCount = vi.fn().mockName('listenerCount mock default'),
    listeners = vi.fn().mockName('listeners mock default'),
    locals = {},
    location = vi.fn().mockName('location mock default'),
    // removeListener - is handled/overridden as part of stream.Writable
    off = vi.fn().mockName('off mock default'),
    on = vi.fn().mockName('on mock default'),
    once = vi.fn().mockName('once mock default'),
    prependListener = vi.fn().mockName('prependListener mock default'),
    prependOnceListener = vi.fn().mockName('prependOnceListener mock default'),
    rawListeners = vi.fn().mockName('rawListeners mock default'),
    redirect = vi.fn().mockName('redirect mock default'),
    removeAllListeners = vi.fn().mockName('removeAllListeners mock default'),
    removeHeader = vi.fn().mockName('removeHeader mock default'),

    removeListener = vi.fn().mockName('removeListener mock default'),
    render = vi.fn().mockName('render mock default'),
    req = {},
    send = vi.fn().mockName('send mock default'),
    sendDate = false,
    sendfile = vi.fn().mockName('sendfile mock default'),
    sendFile = vi.fn().mockName('sendFile mock default'),
    sendStatus = vi.fn().mockName('sendStatus mock default'),
    set = vi.fn().mockName('set mock default'),
    setDefaultEncoding = vi.fn().mockName('setDefaultEncoding mock default'),
    setHeader = vi.fn().mockName('setHeader mock default'),
    setMaxListeners = vi.fn().mockName('setMaxListeners mock default'),
    setTimeout = vi.fn().mockName('setTimeout mock default'),
    shouldKeepAlive = false,
    socket = {},
    /* express.Response */
    status = vi.fn().mockName('status mock default'),
    /* http.ServerResponse */
    statusCode = 0,
    statusMessage = '',
    type = vi.fn().mockName('type mock default'),
    uncork = vi.fn().mockName('uncork mock default'),
    useChunkedEncodingByDefault = false,
    vary = vi.fn().mockName('vary mock default'),
    /* stream.Writable */
    writable = false,
    writableCorked = 0,
    writableEnded = false,

    /* event.EventEmitter */
    // addListener - is handled/overridden as part of stream.Writable
    // on - is handled/overridden as part of stream.Writable
    // once - is handled/overridden as part of stream.Writable
    writableFinished = false,
    writableHighWaterMark = 0,
    writableLength = 0,
    writableObjectMode = false,
    write = vi.fn().mockName('write mock default'),
    writeContinue = vi.fn().mockName('writeContinue mock default'),
    writeHead = vi.fn().mockName('writeHead mock default'),
    // prependListener - is handled/overridden as part of stream.Writable
    writeProcessing = vi.fn().mockName('writeProcessing mock default'),

    // custom values
    ...extraProvidedValues
  } = values;

  const response = {
    _destroy,
    _final,
    _write,
    _writev,
    addListener,
    addTrailers,
    app,
    append,
    assignSocket,
    attachment,
    charset,
    /* http.OutgoingMessage */
    chunkedEncoding,
    clearCookie,
    connection,
    contentType,
    cookie,
    cork,
    destroy,
    destroyed,
    detachSocket,
    download,
    emit,
    end,
    // prependOnceListener - is handled/overridden as part of stream.Writable
    eventNames,
    finished,
    flushHeaders,
    format,
    get,

    getHeader,
    getHeaderNames,
    getHeaders,
    getMaxListeners,
    hasHeader,
    header,
    headersSent,

    json,
    jsonp,
    links,
    // emit - is handled/overridden as part of stream.Writable
    listenerCount,
    listeners,
    locals,
    location,
    // removeListener - is handled/overridden as part of stream.Writable
    off,
    on,
    once,
    prependListener,
    prependOnceListener,
    rawListeners,
    redirect,
    removeAllListeners,
    removeHeader,

    removeListener,
    render,
    req,
    send,
    sendDate,
    sendfile,
    sendFile,
    sendStatus,
    set,
    setDefaultEncoding,
    setHeader,
    setMaxListeners,
    setTimeout,
    shouldKeepAlive,
    socket,
    /* express.Response */
    status,
    /* http.ServerResponse */
    statusCode,
    statusMessage,
    type,
    uncork,
    useChunkedEncodingByDefault,
    vary,
    /* stream.Writable */
    writable,
    writableCorked,
    writableEnded,

    /* event.EventEmitter */
    // addListener - is handled/overridden as part of stream.Writable
    // on - is handled/overridden as part of stream.Writable
    // once - is handled/overridden as part of stream.Writable
    writableFinished,
    writableHighWaterMark,
    writableLength,
    writableObjectMode,
    write,
    writeContinue,
    writeHead,
    // prependListener - is handled/overridden as part of stream.Writable
    writeProcessing,

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
    clearMockRes: clearAllMocks,
    mockClear: clearAllMocks,
    next: next as NextFunction,
    res: response as unknown as T,
  };
};
