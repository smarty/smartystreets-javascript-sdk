class C extends Error {
  constructor(t = "unexpected error") {
    super(t);
  }
}
class jt extends C {
  constructor(t) {
    super(t);
  }
}
class $t extends C {
  constructor() {
    super("A batch can contain a max of 100 lookups.");
  }
}
class Vt extends C {
  constructor() {
    super("A batch must contain at least 1 lookup.");
  }
}
class A extends C {
  constructor() {
    super(
      "The lookup provided is missing or undefined. Make sure you're passing a Lookup object."
    );
  }
}
class Jt extends C {
  constructor() {
    super(
      "Unauthorized: The credentials were provided incorrectly or did not match any existing active credentials."
    );
  }
}
class Ne extends C {
  constructor() {
    super(
      "Payment Required: There is no active subscription for the account associated with the credentials submitted with the request."
    );
  }
}
class ve extends C {
  constructor() {
    super(
      "Request Entity Too Large: The request body has exceeded the maximum size."
    );
  }
}
class ke extends C {
  constructor() {
    super(
      "Bad Request (Malformed Payload): A GET request lacked a street field or the request body of a POST request contained malformed JSON."
    );
  }
}
class B extends C {
  constructor(t) {
    super(t);
  }
}
class Le extends C {
  constructor() {
    super(
      "When using the public 'embedded key' authentication, we restrict the number of requests coming from a given source over too short of a time."
    );
  }
}
class Kt extends C {
  constructor() {
    super("Internal Server Error.");
  }
}
class Gt extends C {
  constructor() {
    super("Service Unavailable. Try again later.");
  }
}
class Wt extends C {
  constructor() {
    super(
      "The upstream data provider did not respond in a timely fashion and the request failed. A serious, yet rare occurrence indeed."
    );
  }
}
const qe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  BadCredentialsError: Jt,
  BadRequestError: ke,
  BatchEmptyError: Vt,
  BatchFullError: $t,
  DefaultError: jt,
  GatewayTimeoutError: Wt,
  InternalServerError: Kt,
  PaymentRequiredError: Ne,
  RequestEntityTooLargeError: ve,
  ServiceUnavailableError: Gt,
  SmartyError: C,
  TooManyRequestsError: Le,
  UndefinedLookupError: A,
  UnprocessableEntityError: B
}, Symbol.toStringTag, { value: "Module" }));
class G {
  constructor() {
    this.lookups = [];
  }
  add(t) {
    if (this.lookupsHasRoomForLookup()) this.lookups.push(t);
    else throw new $t();
  }
  lookupsHasRoomForLookup() {
    return this.lookups.length < 100;
  }
  length() {
    return this.lookups.length;
  }
  getByIndex(t) {
    return this.lookups[t];
  }
  getByInputId(t) {
    return this.lookups.filter((i) => i.inputId === t)[0];
  }
  /**
   * Clears the lookups stored in the batch so it can be used again.<br>
   *     This helps avoid the overhead of building a new Batch object for each group of lookups.
   */
  clear() {
    this.lookups = [];
  }
  isEmpty() {
    return this.length() === 0;
  }
}
function Zt(e, t) {
  return function() {
    return e.apply(t, arguments);
  };
}
const { toString: Ue } = Object.prototype, { getPrototypeOf: gt } = Object, st = /* @__PURE__ */ ((e) => (t) => {
  const i = Ue.call(t);
  return e[i] || (e[i] = i.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null)), k = (e) => (e = e.toLowerCase(), (t) => st(t) === e), rt = (e) => (t) => typeof t === e, { isArray: j } = Array, W = rt("undefined");
function Ie(e) {
  return e !== null && !W(e) && e.constructor !== null && !W(e.constructor) && P(e.constructor.isBuffer) && e.constructor.isBuffer(e);
}
const Xt = k("ArrayBuffer");
function Fe(e) {
  let t;
  return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? t = ArrayBuffer.isView(e) : t = e && e.buffer && Xt(e.buffer), t;
}
const Be = rt("string"), P = rt("function"), Yt = rt("number"), nt = (e) => e !== null && typeof e == "object", ze = (e) => e === !0 || e === !1, D = (e) => {
  if (st(e) !== "object")
    return !1;
  const t = gt(e);
  return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}, Me = k("Date"), He = k("File"), je = k("Blob"), $e = k("FileList"), Ve = (e) => nt(e) && P(e.pipe), Je = (e) => {
  let t;
  return e && (typeof FormData == "function" && e instanceof FormData || P(e.append) && ((t = st(e)) === "formdata" || // detect form-data instance
  t === "object" && P(e.toString) && e.toString() === "[object FormData]"));
}, Ke = k("URLSearchParams"), [Ge, We, Ze, Xe] = ["ReadableStream", "Request", "Response", "Headers"].map(k), Ye = (e) => e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function Z(e, t, { allOwnKeys: i = !1 } = {}) {
  if (e === null || typeof e > "u")
    return;
  let s, r;
  if (typeof e != "object" && (e = [e]), j(e))
    for (s = 0, r = e.length; s < r; s++)
      t.call(null, e[s], s, e);
  else {
    const n = i ? Object.getOwnPropertyNames(e) : Object.keys(e), a = n.length;
    let u;
    for (s = 0; s < a; s++)
      u = n[s], t.call(null, e[u], u, e);
  }
}
function Qt(e, t) {
  t = t.toLowerCase();
  const i = Object.keys(e);
  let s = i.length, r;
  for (; s-- > 0; )
    if (r = i[s], t === r.toLowerCase())
      return r;
  return null;
}
const z = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : global, Dt = (e) => !W(e) && e !== z;
function ht() {
  const { caseless: e } = Dt(this) && this || {}, t = {}, i = (s, r) => {
    const n = e && Qt(t, r) || r;
    D(t[n]) && D(s) ? t[n] = ht(t[n], s) : D(s) ? t[n] = ht({}, s) : j(s) ? t[n] = s.slice() : t[n] = s;
  };
  for (let s = 0, r = arguments.length; s < r; s++)
    arguments[s] && Z(arguments[s], i);
  return t;
}
const Qe = (e, t, i, { allOwnKeys: s } = {}) => (Z(t, (r, n) => {
  i && P(r) ? e[n] = Zt(r, i) : e[n] = r;
}, { allOwnKeys: s }), e), De = (e) => (e.charCodeAt(0) === 65279 && (e = e.slice(1)), e), ti = (e, t, i, s) => {
  e.prototype = Object.create(t.prototype, s), e.prototype.constructor = e, Object.defineProperty(e, "super", {
    value: t.prototype
  }), i && Object.assign(e.prototype, i);
}, ei = (e, t, i, s) => {
  let r, n, a;
  const u = {};
  if (t = t || {}, e == null) return t;
  do {
    for (r = Object.getOwnPropertyNames(e), n = r.length; n-- > 0; )
      a = r[n], (!s || s(a, e, t)) && !u[a] && (t[a] = e[a], u[a] = !0);
    e = i !== !1 && gt(e);
  } while (e && (!i || i(e, t)) && e !== Object.prototype);
  return t;
}, ii = (e, t, i) => {
  e = String(e), (i === void 0 || i > e.length) && (i = e.length), i -= t.length;
  const s = e.indexOf(t, i);
  return s !== -1 && s === i;
}, si = (e) => {
  if (!e) return null;
  if (j(e)) return e;
  let t = e.length;
  if (!Yt(t)) return null;
  const i = new Array(t);
  for (; t-- > 0; )
    i[t] = e[t];
  return i;
}, ri = /* @__PURE__ */ ((e) => (t) => e && t instanceof e)(typeof Uint8Array < "u" && gt(Uint8Array)), ni = (e, t) => {
  const s = (e && e[Symbol.iterator]).call(e);
  let r;
  for (; (r = s.next()) && !r.done; ) {
    const n = r.value;
    t.call(e, n[0], n[1]);
  }
}, ai = (e, t) => {
  let i;
  const s = [];
  for (; (i = e.exec(t)) !== null; )
    s.push(i);
  return s;
}, oi = k("HTMLFormElement"), ui = (e) => e.toLowerCase().replace(
  /[-_\s]([a-z\d])(\w*)/g,
  function(i, s, r) {
    return s.toUpperCase() + r;
  }
), At = (({ hasOwnProperty: e }) => (t, i) => e.call(t, i))(Object.prototype), ci = k("RegExp"), te = (e, t) => {
  const i = Object.getOwnPropertyDescriptors(e), s = {};
  Z(i, (r, n) => {
    let a;
    (a = t(r, n, e)) !== !1 && (s[n] = a || r);
  }), Object.defineProperties(e, s);
}, di = (e) => {
  te(e, (t, i) => {
    if (P(e) && ["arguments", "caller", "callee"].indexOf(i) !== -1)
      return !1;
    const s = e[i];
    if (P(s)) {
      if (t.enumerable = !1, "writable" in t) {
        t.writable = !1;
        return;
      }
      t.set || (t.set = () => {
        throw Error("Can not rewrite read-only method '" + i + "'");
      });
    }
  });
}, li = (e, t) => {
  const i = {}, s = (r) => {
    r.forEach((n) => {
      i[n] = !0;
    });
  };
  return j(e) ? s(e) : s(String(e).split(t)), i;
}, hi = () => {
}, mi = (e, t) => e != null && Number.isFinite(e = +e) ? e : t, ut = "abcdefghijklmnopqrstuvwxyz", Pt = "0123456789", ee = {
  DIGIT: Pt,
  ALPHA: ut,
  ALPHA_DIGIT: ut + ut.toUpperCase() + Pt
}, bi = (e = 16, t = ee.ALPHA_DIGIT) => {
  let i = "";
  const { length: s } = t;
  for (; e--; )
    i += t[Math.random() * s | 0];
  return i;
};
function fi(e) {
  return !!(e && P(e.append) && e[Symbol.toStringTag] === "FormData" && e[Symbol.iterator]);
}
const _i = (e) => {
  const t = new Array(10), i = (s, r) => {
    if (nt(s)) {
      if (t.indexOf(s) >= 0)
        return;
      if (!("toJSON" in s)) {
        t[r] = s;
        const n = j(s) ? [] : {};
        return Z(s, (a, u) => {
          const l = i(a, r + 1);
          !W(l) && (n[u] = l);
        }), t[r] = void 0, n;
      }
    }
    return s;
  };
  return i(e, 0);
}, yi = k("AsyncFunction"), pi = (e) => e && (nt(e) || P(e)) && P(e.then) && P(e.catch), ie = ((e, t) => e ? setImmediate : t ? ((i, s) => (z.addEventListener("message", ({ source: r, data: n }) => {
  r === z && n === i && s.length && s.shift()();
}, !1), (r) => {
  s.push(r), z.postMessage(i, "*");
}))(`axios@${Math.random()}`, []) : (i) => setTimeout(i))(
  typeof setImmediate == "function",
  P(z.postMessage)
), gi = typeof queueMicrotask < "u" ? queueMicrotask.bind(z) : typeof process < "u" && process.nextTick || ie, o = {
  isArray: j,
  isArrayBuffer: Xt,
  isBuffer: Ie,
  isFormData: Je,
  isArrayBufferView: Fe,
  isString: Be,
  isNumber: Yt,
  isBoolean: ze,
  isObject: nt,
  isPlainObject: D,
  isReadableStream: Ge,
  isRequest: We,
  isResponse: Ze,
  isHeaders: Xe,
  isUndefined: W,
  isDate: Me,
  isFile: He,
  isBlob: je,
  isRegExp: ci,
  isFunction: P,
  isStream: Ve,
  isURLSearchParams: Ke,
  isTypedArray: ri,
  isFileList: $e,
  forEach: Z,
  merge: ht,
  extend: Qe,
  trim: Ye,
  stripBOM: De,
  inherits: ti,
  toFlatObject: ei,
  kindOf: st,
  kindOfTest: k,
  endsWith: ii,
  toArray: si,
  forEachEntry: ni,
  matchAll: ai,
  isHTMLForm: oi,
  hasOwnProperty: At,
  hasOwnProp: At,
  // an alias to avoid ESLint no-prototype-builtins detection
  reduceDescriptors: te,
  freezeMethods: di,
  toObjectSet: li,
  toCamelCase: ui,
  noop: hi,
  toFiniteNumber: mi,
  findKey: Qt,
  global: z,
  isContextDefined: Dt,
  ALPHABET: ee,
  generateString: bi,
  isSpecCompliantForm: fi,
  toJSONObject: _i,
  isAsyncFn: yi,
  isThenable: pi,
  setImmediate: ie,
  asap: gi
};
function f(e, t, i, s, r) {
  Error.call(this), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack, this.message = e, this.name = "AxiosError", t && (this.code = t), i && (this.config = i), s && (this.request = s), r && (this.response = r, this.status = r.status ? r.status : null);
}
o.inherits(f, Error, {
  toJSON: function() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: o.toJSONObject(this.config),
      code: this.code,
      status: this.status
    };
  }
});
const se = f.prototype, re = {};
[
  "ERR_BAD_OPTION_VALUE",
  "ERR_BAD_OPTION",
  "ECONNABORTED",
  "ETIMEDOUT",
  "ERR_NETWORK",
  "ERR_FR_TOO_MANY_REDIRECTS",
  "ERR_DEPRECATED",
  "ERR_BAD_RESPONSE",
  "ERR_BAD_REQUEST",
  "ERR_CANCELED",
  "ERR_NOT_SUPPORT",
  "ERR_INVALID_URL"
  // eslint-disable-next-line func-names
].forEach((e) => {
  re[e] = { value: e };
});
Object.defineProperties(f, re);
Object.defineProperty(se, "isAxiosError", { value: !0 });
f.from = (e, t, i, s, r, n) => {
  const a = Object.create(se);
  return o.toFlatObject(e, a, function(l) {
    return l !== Error.prototype;
  }, (u) => u !== "isAxiosError"), f.call(a, e.message, t, i, s, r), a.cause = e, a.name = e.name, n && Object.assign(a, n), a;
};
const wi = null;
function mt(e) {
  return o.isPlainObject(e) || o.isArray(e);
}
function ne(e) {
  return o.endsWith(e, "[]") ? e.slice(0, -2) : e;
}
function Ot(e, t, i) {
  return e ? e.concat(t).map(function(r, n) {
    return r = ne(r), !i && n ? "[" + r + "]" : r;
  }).join(i ? "." : "") : t;
}
function Si(e) {
  return o.isArray(e) && !e.some(mt);
}
const xi = o.toFlatObject(o, {}, null, function(t) {
  return /^is[A-Z]/.test(t);
});
function at(e, t, i) {
  if (!o.isObject(e))
    throw new TypeError("target must be an object");
  t = t || new FormData(), i = o.toFlatObject(i, {
    metaTokens: !0,
    dots: !1,
    indexes: !1
  }, !1, function(_, b) {
    return !o.isUndefined(b[_]);
  });
  const s = i.metaTokens, r = i.visitor || d, n = i.dots, a = i.indexes, l = (i.Blob || typeof Blob < "u" && Blob) && o.isSpecCompliantForm(t);
  if (!o.isFunction(r))
    throw new TypeError("visitor must be a function");
  function c(m) {
    if (m === null) return "";
    if (o.isDate(m))
      return m.toISOString();
    if (!l && o.isBlob(m))
      throw new f("Blob is not supported. Use a Buffer instead.");
    return o.isArrayBuffer(m) || o.isTypedArray(m) ? l && typeof Blob == "function" ? new Blob([m]) : Buffer.from(m) : m;
  }
  function d(m, _, b) {
    let g = m;
    if (m && !b && typeof m == "object") {
      if (o.endsWith(_, "{}"))
        _ = s ? _ : _.slice(0, -2), m = JSON.stringify(m);
      else if (o.isArray(m) && Si(m) || (o.isFileList(m) || o.endsWith(_, "[]")) && (g = o.toArray(m)))
        return _ = ne(_), g.forEach(function(x, L) {
          !(o.isUndefined(x) || x === null) && t.append(
            // eslint-disable-next-line no-nested-ternary
            a === !0 ? Ot([_], L, n) : a === null ? _ : _ + "[]",
            c(x)
          );
        }), !1;
    }
    return mt(m) ? !0 : (t.append(Ot(b, _, n), c(m)), !1);
  }
  const h = [], y = Object.assign(xi, {
    defaultVisitor: d,
    convertValue: c,
    isVisitable: mt
  });
  function p(m, _) {
    if (!o.isUndefined(m)) {
      if (h.indexOf(m) !== -1)
        throw Error("Circular reference detected in " + _.join("."));
      h.push(m), o.forEach(m, function(g, S) {
        (!(o.isUndefined(g) || g === null) && r.call(
          t,
          g,
          o.isString(S) ? S.trim() : S,
          _,
          y
        )) === !0 && p(g, _ ? _.concat(S) : [S]);
      }), h.pop();
    }
  }
  if (!o.isObject(e))
    throw new TypeError("data must be an object");
  return p(e), t;
}
function Nt(e) {
  const t = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+",
    "%00": "\0"
  };
  return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g, function(s) {
    return t[s];
  });
}
function wt(e, t) {
  this._pairs = [], e && at(e, this, t);
}
const ae = wt.prototype;
ae.append = function(t, i) {
  this._pairs.push([t, i]);
};
ae.toString = function(t) {
  const i = t ? function(s) {
    return t.call(this, s, Nt);
  } : Nt;
  return this._pairs.map(function(r) {
    return i(r[0]) + "=" + i(r[1]);
  }, "").join("&");
};
function Ri(e) {
  return encodeURIComponent(e).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
}
function oe(e, t, i) {
  if (!t)
    return e;
  const s = i && i.encode || Ri, r = i && i.serialize;
  let n;
  if (r ? n = r(t, i) : n = o.isURLSearchParams(t) ? t.toString() : new wt(t, i).toString(s), n) {
    const a = e.indexOf("#");
    a !== -1 && (e = e.slice(0, a)), e += (e.indexOf("?") === -1 ? "?" : "&") + n;
  }
  return e;
}
class vt {
  constructor() {
    this.handlers = [];
  }
  /**
   * Add a new interceptor to the stack
   *
   * @param {Function} fulfilled The function to handle `then` for a `Promise`
   * @param {Function} rejected The function to handle `reject` for a `Promise`
   *
   * @return {Number} An ID used to remove interceptor later
   */
  use(t, i, s) {
    return this.handlers.push({
      fulfilled: t,
      rejected: i,
      synchronous: s ? s.synchronous : !1,
      runWhen: s ? s.runWhen : null
    }), this.handlers.length - 1;
  }
  /**
   * Remove an interceptor from the stack
   *
   * @param {Number} id The ID that was returned by `use`
   *
   * @returns {Boolean} `true` if the interceptor was removed, `false` otherwise
   */
  eject(t) {
    this.handlers[t] && (this.handlers[t] = null);
  }
  /**
   * Clear all interceptors from the stack
   *
   * @returns {void}
   */
  clear() {
    this.handlers && (this.handlers = []);
  }
  /**
   * Iterate over all the registered interceptors
   *
   * This method is particularly useful for skipping over any
   * interceptors that may have become `null` calling `eject`.
   *
   * @param {Function} fn The function to call for each interceptor
   *
   * @returns {void}
   */
  forEach(t) {
    o.forEach(this.handlers, function(s) {
      s !== null && t(s);
    });
  }
}
const ue = {
  silentJSONParsing: !0,
  forcedJSONParsing: !0,
  clarifyTimeoutError: !1
}, Ei = typeof URLSearchParams < "u" ? URLSearchParams : wt, Ti = typeof FormData < "u" ? FormData : null, Ci = typeof Blob < "u" ? Blob : null, Ai = {
  isBrowser: !0,
  classes: {
    URLSearchParams: Ei,
    FormData: Ti,
    Blob: Ci
  },
  protocols: ["http", "https", "file", "blob", "url", "data"]
}, St = typeof window < "u" && typeof document < "u", bt = typeof navigator == "object" && navigator || void 0, Pi = St && (!bt || ["ReactNative", "NativeScript", "NS"].indexOf(bt.product) < 0), Oi = typeof WorkerGlobalScope < "u" && // eslint-disable-next-line no-undef
self instanceof WorkerGlobalScope && typeof self.importScripts == "function", Ni = St && window.location.href || "http://localhost", vi = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  hasBrowserEnv: St,
  hasStandardBrowserEnv: Pi,
  hasStandardBrowserWebWorkerEnv: Oi,
  navigator: bt,
  origin: Ni
}, Symbol.toStringTag, { value: "Module" })), E = {
  ...vi,
  ...Ai
};
function ki(e, t) {
  return at(e, new E.classes.URLSearchParams(), Object.assign({
    visitor: function(i, s, r, n) {
      return E.isNode && o.isBuffer(i) ? (this.append(s, i.toString("base64")), !1) : n.defaultVisitor.apply(this, arguments);
    }
  }, t));
}
function Li(e) {
  return o.matchAll(/\w+|\[(\w*)]/g, e).map((t) => t[0] === "[]" ? "" : t[1] || t[0]);
}
function qi(e) {
  const t = {}, i = Object.keys(e);
  let s;
  const r = i.length;
  let n;
  for (s = 0; s < r; s++)
    n = i[s], t[n] = e[n];
  return t;
}
function ce(e) {
  function t(i, s, r, n) {
    let a = i[n++];
    if (a === "__proto__") return !0;
    const u = Number.isFinite(+a), l = n >= i.length;
    return a = !a && o.isArray(r) ? r.length : a, l ? (o.hasOwnProp(r, a) ? r[a] = [r[a], s] : r[a] = s, !u) : ((!r[a] || !o.isObject(r[a])) && (r[a] = []), t(i, s, r[a], n) && o.isArray(r[a]) && (r[a] = qi(r[a])), !u);
  }
  if (o.isFormData(e) && o.isFunction(e.entries)) {
    const i = {};
    return o.forEachEntry(e, (s, r) => {
      t(Li(s), r, i, 0);
    }), i;
  }
  return null;
}
function Ui(e, t, i) {
  if (o.isString(e))
    try {
      return (t || JSON.parse)(e), o.trim(e);
    } catch (s) {
      if (s.name !== "SyntaxError")
        throw s;
    }
  return (0, JSON.stringify)(e);
}
const X = {
  transitional: ue,
  adapter: ["xhr", "http", "fetch"],
  transformRequest: [function(t, i) {
    const s = i.getContentType() || "", r = s.indexOf("application/json") > -1, n = o.isObject(t);
    if (n && o.isHTMLForm(t) && (t = new FormData(t)), o.isFormData(t))
      return r ? JSON.stringify(ce(t)) : t;
    if (o.isArrayBuffer(t) || o.isBuffer(t) || o.isStream(t) || o.isFile(t) || o.isBlob(t) || o.isReadableStream(t))
      return t;
    if (o.isArrayBufferView(t))
      return t.buffer;
    if (o.isURLSearchParams(t))
      return i.setContentType("application/x-www-form-urlencoded;charset=utf-8", !1), t.toString();
    let u;
    if (n) {
      if (s.indexOf("application/x-www-form-urlencoded") > -1)
        return ki(t, this.formSerializer).toString();
      if ((u = o.isFileList(t)) || s.indexOf("multipart/form-data") > -1) {
        const l = this.env && this.env.FormData;
        return at(
          u ? { "files[]": t } : t,
          l && new l(),
          this.formSerializer
        );
      }
    }
    return n || r ? (i.setContentType("application/json", !1), Ui(t)) : t;
  }],
  transformResponse: [function(t) {
    const i = this.transitional || X.transitional, s = i && i.forcedJSONParsing, r = this.responseType === "json";
    if (o.isResponse(t) || o.isReadableStream(t))
      return t;
    if (t && o.isString(t) && (s && !this.responseType || r)) {
      const a = !(i && i.silentJSONParsing) && r;
      try {
        return JSON.parse(t);
      } catch (u) {
        if (a)
          throw u.name === "SyntaxError" ? f.from(u, f.ERR_BAD_RESPONSE, this, null, this.response) : u;
      }
    }
    return t;
  }],
  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: {
    FormData: E.classes.FormData,
    Blob: E.classes.Blob
  },
  validateStatus: function(t) {
    return t >= 200 && t < 300;
  },
  headers: {
    common: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": void 0
    }
  }
};
o.forEach(["delete", "get", "head", "post", "put", "patch"], (e) => {
  X.headers[e] = {};
});
const Ii = o.toObjectSet([
  "age",
  "authorization",
  "content-length",
  "content-type",
  "etag",
  "expires",
  "from",
  "host",
  "if-modified-since",
  "if-unmodified-since",
  "last-modified",
  "location",
  "max-forwards",
  "proxy-authorization",
  "referer",
  "retry-after",
  "user-agent"
]), Fi = (e) => {
  const t = {};
  let i, s, r;
  return e && e.split(`
`).forEach(function(a) {
    r = a.indexOf(":"), i = a.substring(0, r).trim().toLowerCase(), s = a.substring(r + 1).trim(), !(!i || t[i] && Ii[i]) && (i === "set-cookie" ? t[i] ? t[i].push(s) : t[i] = [s] : t[i] = t[i] ? t[i] + ", " + s : s);
  }), t;
}, kt = Symbol("internals");
function V(e) {
  return e && String(e).trim().toLowerCase();
}
function tt(e) {
  return e === !1 || e == null ? e : o.isArray(e) ? e.map(tt) : String(e);
}
function Bi(e) {
  const t = /* @__PURE__ */ Object.create(null), i = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let s;
  for (; s = i.exec(e); )
    t[s[1]] = s[2];
  return t;
}
const zi = (e) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());
function ct(e, t, i, s, r) {
  if (o.isFunction(s))
    return s.call(this, t, i);
  if (r && (t = i), !!o.isString(t)) {
    if (o.isString(s))
      return t.indexOf(s) !== -1;
    if (o.isRegExp(s))
      return s.test(t);
  }
}
function Mi(e) {
  return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (t, i, s) => i.toUpperCase() + s);
}
function Hi(e, t) {
  const i = o.toCamelCase(" " + t);
  ["get", "set", "has"].forEach((s) => {
    Object.defineProperty(e, s + i, {
      value: function(r, n, a) {
        return this[s].call(this, t, r, n, a);
      },
      configurable: !0
    });
  });
}
class T {
  constructor(t) {
    t && this.set(t);
  }
  set(t, i, s) {
    const r = this;
    function n(u, l, c) {
      const d = V(l);
      if (!d)
        throw new Error("header name must be a non-empty string");
      const h = o.findKey(r, d);
      (!h || r[h] === void 0 || c === !0 || c === void 0 && r[h] !== !1) && (r[h || l] = tt(u));
    }
    const a = (u, l) => o.forEach(u, (c, d) => n(c, d, l));
    if (o.isPlainObject(t) || t instanceof this.constructor)
      a(t, i);
    else if (o.isString(t) && (t = t.trim()) && !zi(t))
      a(Fi(t), i);
    else if (o.isHeaders(t))
      for (const [u, l] of t.entries())
        n(l, u, s);
    else
      t != null && n(i, t, s);
    return this;
  }
  get(t, i) {
    if (t = V(t), t) {
      const s = o.findKey(this, t);
      if (s) {
        const r = this[s];
        if (!i)
          return r;
        if (i === !0)
          return Bi(r);
        if (o.isFunction(i))
          return i.call(this, r, s);
        if (o.isRegExp(i))
          return i.exec(r);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(t, i) {
    if (t = V(t), t) {
      const s = o.findKey(this, t);
      return !!(s && this[s] !== void 0 && (!i || ct(this, this[s], s, i)));
    }
    return !1;
  }
  delete(t, i) {
    const s = this;
    let r = !1;
    function n(a) {
      if (a = V(a), a) {
        const u = o.findKey(s, a);
        u && (!i || ct(s, s[u], u, i)) && (delete s[u], r = !0);
      }
    }
    return o.isArray(t) ? t.forEach(n) : n(t), r;
  }
  clear(t) {
    const i = Object.keys(this);
    let s = i.length, r = !1;
    for (; s--; ) {
      const n = i[s];
      (!t || ct(this, this[n], n, t, !0)) && (delete this[n], r = !0);
    }
    return r;
  }
  normalize(t) {
    const i = this, s = {};
    return o.forEach(this, (r, n) => {
      const a = o.findKey(s, n);
      if (a) {
        i[a] = tt(r), delete i[n];
        return;
      }
      const u = t ? Mi(n) : String(n).trim();
      u !== n && delete i[n], i[u] = tt(r), s[u] = !0;
    }), this;
  }
  concat(...t) {
    return this.constructor.concat(this, ...t);
  }
  toJSON(t) {
    const i = /* @__PURE__ */ Object.create(null);
    return o.forEach(this, (s, r) => {
      s != null && s !== !1 && (i[r] = t && o.isArray(s) ? s.join(", ") : s);
    }), i;
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([t, i]) => t + ": " + i).join(`
`);
  }
  get [Symbol.toStringTag]() {
    return "AxiosHeaders";
  }
  static from(t) {
    return t instanceof this ? t : new this(t);
  }
  static concat(t, ...i) {
    const s = new this(t);
    return i.forEach((r) => s.set(r)), s;
  }
  static accessor(t) {
    const s = (this[kt] = this[kt] = {
      accessors: {}
    }).accessors, r = this.prototype;
    function n(a) {
      const u = V(a);
      s[u] || (Hi(r, a), s[u] = !0);
    }
    return o.isArray(t) ? t.forEach(n) : n(t), this;
  }
}
T.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]);
o.reduceDescriptors(T.prototype, ({ value: e }, t) => {
  let i = t[0].toUpperCase() + t.slice(1);
  return {
    get: () => e,
    set(s) {
      this[i] = s;
    }
  };
});
o.freezeMethods(T);
function dt(e, t) {
  const i = this || X, s = t || i, r = T.from(s.headers);
  let n = s.data;
  return o.forEach(e, function(u) {
    n = u.call(i, n, r.normalize(), t ? t.status : void 0);
  }), r.normalize(), n;
}
function de(e) {
  return !!(e && e.__CANCEL__);
}
function $(e, t, i) {
  f.call(this, e ?? "canceled", f.ERR_CANCELED, t, i), this.name = "CanceledError";
}
o.inherits($, f, {
  __CANCEL__: !0
});
function le(e, t, i) {
  const s = i.config.validateStatus;
  !i.status || !s || s(i.status) ? e(i) : t(new f(
    "Request failed with status code " + i.status,
    [f.ERR_BAD_REQUEST, f.ERR_BAD_RESPONSE][Math.floor(i.status / 100) - 4],
    i.config,
    i.request,
    i
  ));
}
function ji(e) {
  const t = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
  return t && t[1] || "";
}
function $i(e, t) {
  e = e || 10;
  const i = new Array(e), s = new Array(e);
  let r = 0, n = 0, a;
  return t = t !== void 0 ? t : 1e3, function(l) {
    const c = Date.now(), d = s[n];
    a || (a = c), i[r] = l, s[r] = c;
    let h = n, y = 0;
    for (; h !== r; )
      y += i[h++], h = h % e;
    if (r = (r + 1) % e, r === n && (n = (n + 1) % e), c - a < t)
      return;
    const p = d && c - d;
    return p ? Math.round(y * 1e3 / p) : void 0;
  };
}
function Vi(e, t) {
  let i = 0, s = 1e3 / t, r, n;
  const a = (c, d = Date.now()) => {
    i = d, r = null, n && (clearTimeout(n), n = null), e.apply(null, c);
  };
  return [(...c) => {
    const d = Date.now(), h = d - i;
    h >= s ? a(c, d) : (r = c, n || (n = setTimeout(() => {
      n = null, a(r);
    }, s - h)));
  }, () => r && a(r)];
}
const et = (e, t, i = 3) => {
  let s = 0;
  const r = $i(50, 250);
  return Vi((n) => {
    const a = n.loaded, u = n.lengthComputable ? n.total : void 0, l = a - s, c = r(l), d = a <= u;
    s = a;
    const h = {
      loaded: a,
      total: u,
      progress: u ? a / u : void 0,
      bytes: l,
      rate: c || void 0,
      estimated: c && u && d ? (u - a) / c : void 0,
      event: n,
      lengthComputable: u != null,
      [t ? "download" : "upload"]: !0
    };
    e(h);
  }, i);
}, Lt = (e, t) => {
  const i = e != null;
  return [(s) => t[0]({
    lengthComputable: i,
    total: e,
    loaded: s
  }), t[1]];
}, qt = (e) => (...t) => o.asap(() => e(...t)), Ji = E.hasStandardBrowserEnv ? (
  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
  function() {
    const t = E.navigator && /(msie|trident)/i.test(E.navigator.userAgent), i = document.createElement("a");
    let s;
    function r(n) {
      let a = n;
      return t && (i.setAttribute("href", a), a = i.href), i.setAttribute("href", a), {
        href: i.href,
        protocol: i.protocol ? i.protocol.replace(/:$/, "") : "",
        host: i.host,
        search: i.search ? i.search.replace(/^\?/, "") : "",
        hash: i.hash ? i.hash.replace(/^#/, "") : "",
        hostname: i.hostname,
        port: i.port,
        pathname: i.pathname.charAt(0) === "/" ? i.pathname : "/" + i.pathname
      };
    }
    return s = r(window.location.href), function(a) {
      const u = o.isString(a) ? r(a) : a;
      return u.protocol === s.protocol && u.host === s.host;
    };
  }()
) : (
  // Non standard browser envs (web workers, react-native) lack needed support.
  /* @__PURE__ */ function() {
    return function() {
      return !0;
    };
  }()
), Ki = E.hasStandardBrowserEnv ? (
  // Standard browser envs support document.cookie
  {
    write(e, t, i, s, r, n) {
      const a = [e + "=" + encodeURIComponent(t)];
      o.isNumber(i) && a.push("expires=" + new Date(i).toGMTString()), o.isString(s) && a.push("path=" + s), o.isString(r) && a.push("domain=" + r), n === !0 && a.push("secure"), document.cookie = a.join("; ");
    },
    read(e) {
      const t = document.cookie.match(new RegExp("(^|;\\s*)(" + e + ")=([^;]*)"));
      return t ? decodeURIComponent(t[3]) : null;
    },
    remove(e) {
      this.write(e, "", Date.now() - 864e5);
    }
  }
) : (
  // Non-standard browser env (web workers, react-native) lack needed support.
  {
    write() {
    },
    read() {
      return null;
    },
    remove() {
    }
  }
);
function Gi(e) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e);
}
function Wi(e, t) {
  return t ? e.replace(/\/?\/$/, "") + "/" + t.replace(/^\/+/, "") : e;
}
function he(e, t) {
  return e && !Gi(t) ? Wi(e, t) : t;
}
const Ut = (e) => e instanceof T ? { ...e } : e;
function H(e, t) {
  t = t || {};
  const i = {};
  function s(c, d, h) {
    return o.isPlainObject(c) && o.isPlainObject(d) ? o.merge.call({ caseless: h }, c, d) : o.isPlainObject(d) ? o.merge({}, d) : o.isArray(d) ? d.slice() : d;
  }
  function r(c, d, h) {
    if (o.isUndefined(d)) {
      if (!o.isUndefined(c))
        return s(void 0, c, h);
    } else return s(c, d, h);
  }
  function n(c, d) {
    if (!o.isUndefined(d))
      return s(void 0, d);
  }
  function a(c, d) {
    if (o.isUndefined(d)) {
      if (!o.isUndefined(c))
        return s(void 0, c);
    } else return s(void 0, d);
  }
  function u(c, d, h) {
    if (h in t)
      return s(c, d);
    if (h in e)
      return s(void 0, c);
  }
  const l = {
    url: n,
    method: n,
    data: n,
    baseURL: a,
    transformRequest: a,
    transformResponse: a,
    paramsSerializer: a,
    timeout: a,
    timeoutMessage: a,
    withCredentials: a,
    withXSRFToken: a,
    adapter: a,
    responseType: a,
    xsrfCookieName: a,
    xsrfHeaderName: a,
    onUploadProgress: a,
    onDownloadProgress: a,
    decompress: a,
    maxContentLength: a,
    maxBodyLength: a,
    beforeRedirect: a,
    transport: a,
    httpAgent: a,
    httpsAgent: a,
    cancelToken: a,
    socketPath: a,
    responseEncoding: a,
    validateStatus: u,
    headers: (c, d) => r(Ut(c), Ut(d), !0)
  };
  return o.forEach(Object.keys(Object.assign({}, e, t)), function(d) {
    const h = l[d] || r, y = h(e[d], t[d], d);
    o.isUndefined(y) && h !== u || (i[d] = y);
  }), i;
}
const me = (e) => {
  const t = H({}, e);
  let { data: i, withXSRFToken: s, xsrfHeaderName: r, xsrfCookieName: n, headers: a, auth: u } = t;
  t.headers = a = T.from(a), t.url = oe(he(t.baseURL, t.url), e.params, e.paramsSerializer), u && a.set(
    "Authorization",
    "Basic " + btoa((u.username || "") + ":" + (u.password ? unescape(encodeURIComponent(u.password)) : ""))
  );
  let l;
  if (o.isFormData(i)) {
    if (E.hasStandardBrowserEnv || E.hasStandardBrowserWebWorkerEnv)
      a.setContentType(void 0);
    else if ((l = a.getContentType()) !== !1) {
      const [c, ...d] = l ? l.split(";").map((h) => h.trim()).filter(Boolean) : [];
      a.setContentType([c || "multipart/form-data", ...d].join("; "));
    }
  }
  if (E.hasStandardBrowserEnv && (s && o.isFunction(s) && (s = s(t)), s || s !== !1 && Ji(t.url))) {
    const c = r && n && Ki.read(n);
    c && a.set(r, c);
  }
  return t;
}, Zi = typeof XMLHttpRequest < "u", Xi = Zi && function(e) {
  return new Promise(function(i, s) {
    const r = me(e);
    let n = r.data;
    const a = T.from(r.headers).normalize();
    let { responseType: u, onUploadProgress: l, onDownloadProgress: c } = r, d, h, y, p, m;
    function _() {
      p && p(), m && m(), r.cancelToken && r.cancelToken.unsubscribe(d), r.signal && r.signal.removeEventListener("abort", d);
    }
    let b = new XMLHttpRequest();
    b.open(r.method.toUpperCase(), r.url, !0), b.timeout = r.timeout;
    function g() {
      if (!b)
        return;
      const x = T.from(
        "getAllResponseHeaders" in b && b.getAllResponseHeaders()
      ), R = {
        data: !u || u === "text" || u === "json" ? b.responseText : b.response,
        status: b.status,
        statusText: b.statusText,
        headers: x,
        config: e,
        request: b
      };
      le(function(F) {
        i(F), _();
      }, function(F) {
        s(F), _();
      }, R), b = null;
    }
    "onloadend" in b ? b.onloadend = g : b.onreadystatechange = function() {
      !b || b.readyState !== 4 || b.status === 0 && !(b.responseURL && b.responseURL.indexOf("file:") === 0) || setTimeout(g);
    }, b.onabort = function() {
      b && (s(new f("Request aborted", f.ECONNABORTED, e, b)), b = null);
    }, b.onerror = function() {
      s(new f("Network Error", f.ERR_NETWORK, e, b)), b = null;
    }, b.ontimeout = function() {
      let L = r.timeout ? "timeout of " + r.timeout + "ms exceeded" : "timeout exceeded";
      const R = r.transitional || ue;
      r.timeoutErrorMessage && (L = r.timeoutErrorMessage), s(new f(
        L,
        R.clarifyTimeoutError ? f.ETIMEDOUT : f.ECONNABORTED,
        e,
        b
      )), b = null;
    }, n === void 0 && a.setContentType(null), "setRequestHeader" in b && o.forEach(a.toJSON(), function(L, R) {
      b.setRequestHeader(R, L);
    }), o.isUndefined(r.withCredentials) || (b.withCredentials = !!r.withCredentials), u && u !== "json" && (b.responseType = r.responseType), c && ([y, m] = et(c, !0), b.addEventListener("progress", y)), l && b.upload && ([h, p] = et(l), b.upload.addEventListener("progress", h), b.upload.addEventListener("loadend", p)), (r.cancelToken || r.signal) && (d = (x) => {
      b && (s(!x || x.type ? new $(null, e, b) : x), b.abort(), b = null);
    }, r.cancelToken && r.cancelToken.subscribe(d), r.signal && (r.signal.aborted ? d() : r.signal.addEventListener("abort", d)));
    const S = ji(r.url);
    if (S && E.protocols.indexOf(S) === -1) {
      s(new f("Unsupported protocol " + S + ":", f.ERR_BAD_REQUEST, e));
      return;
    }
    b.send(n || null);
  });
}, Yi = (e, t) => {
  const { length: i } = e = e ? e.filter(Boolean) : [];
  if (t || i) {
    let s = new AbortController(), r;
    const n = function(c) {
      if (!r) {
        r = !0, u();
        const d = c instanceof Error ? c : this.reason;
        s.abort(d instanceof f ? d : new $(d instanceof Error ? d.message : d));
      }
    };
    let a = t && setTimeout(() => {
      a = null, n(new f(`timeout ${t} of ms exceeded`, f.ETIMEDOUT));
    }, t);
    const u = () => {
      e && (a && clearTimeout(a), a = null, e.forEach((c) => {
        c.unsubscribe ? c.unsubscribe(n) : c.removeEventListener("abort", n);
      }), e = null);
    };
    e.forEach((c) => c.addEventListener("abort", n));
    const { signal: l } = s;
    return l.unsubscribe = () => o.asap(u), l;
  }
}, Qi = function* (e, t) {
  let i = e.byteLength;
  if (i < t) {
    yield e;
    return;
  }
  let s = 0, r;
  for (; s < i; )
    r = s + t, yield e.slice(s, r), s = r;
}, Di = async function* (e, t) {
  for await (const i of ts(e))
    yield* Qi(i, t);
}, ts = async function* (e) {
  if (e[Symbol.asyncIterator]) {
    yield* e;
    return;
  }
  const t = e.getReader();
  try {
    for (; ; ) {
      const { done: i, value: s } = await t.read();
      if (i)
        break;
      yield s;
    }
  } finally {
    await t.cancel();
  }
}, It = (e, t, i, s) => {
  const r = Di(e, t);
  let n = 0, a, u = (l) => {
    a || (a = !0, s && s(l));
  };
  return new ReadableStream({
    async pull(l) {
      try {
        const { done: c, value: d } = await r.next();
        if (c) {
          u(), l.close();
          return;
        }
        let h = d.byteLength;
        if (i) {
          let y = n += h;
          i(y);
        }
        l.enqueue(new Uint8Array(d));
      } catch (c) {
        throw u(c), c;
      }
    },
    cancel(l) {
      return u(l), r.return();
    }
  }, {
    highWaterMark: 2
  });
}, ot = typeof fetch == "function" && typeof Request == "function" && typeof Response == "function", be = ot && typeof ReadableStream == "function", es = ot && (typeof TextEncoder == "function" ? /* @__PURE__ */ ((e) => (t) => e.encode(t))(new TextEncoder()) : async (e) => new Uint8Array(await new Response(e).arrayBuffer())), fe = (e, ...t) => {
  try {
    return !!e(...t);
  } catch {
    return !1;
  }
}, is = be && fe(() => {
  let e = !1;
  const t = new Request(E.origin, {
    body: new ReadableStream(),
    method: "POST",
    get duplex() {
      return e = !0, "half";
    }
  }).headers.has("Content-Type");
  return e && !t;
}), Ft = 64 * 1024, ft = be && fe(() => o.isReadableStream(new Response("").body)), it = {
  stream: ft && ((e) => e.body)
};
ot && ((e) => {
  ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((t) => {
    !it[t] && (it[t] = o.isFunction(e[t]) ? (i) => i[t]() : (i, s) => {
      throw new f(`Response type '${t}' is not supported`, f.ERR_NOT_SUPPORT, s);
    });
  });
})(new Response());
const ss = async (e) => {
  if (e == null)
    return 0;
  if (o.isBlob(e))
    return e.size;
  if (o.isSpecCompliantForm(e))
    return (await new Request(E.origin, {
      method: "POST",
      body: e
    }).arrayBuffer()).byteLength;
  if (o.isArrayBufferView(e) || o.isArrayBuffer(e))
    return e.byteLength;
  if (o.isURLSearchParams(e) && (e = e + ""), o.isString(e))
    return (await es(e)).byteLength;
}, rs = async (e, t) => {
  const i = o.toFiniteNumber(e.getContentLength());
  return i ?? ss(t);
}, ns = ot && (async (e) => {
  let {
    url: t,
    method: i,
    data: s,
    signal: r,
    cancelToken: n,
    timeout: a,
    onDownloadProgress: u,
    onUploadProgress: l,
    responseType: c,
    headers: d,
    withCredentials: h = "same-origin",
    fetchOptions: y
  } = me(e);
  c = c ? (c + "").toLowerCase() : "text";
  let p = Yi([r, n && n.toAbortSignal()], a), m;
  const _ = p && p.unsubscribe && (() => {
    p.unsubscribe();
  });
  let b;
  try {
    if (l && is && i !== "get" && i !== "head" && (b = await rs(d, s)) !== 0) {
      let R = new Request(t, {
        method: "POST",
        body: s,
        duplex: "half"
      }), U;
      if (o.isFormData(s) && (U = R.headers.get("content-type")) && d.setContentType(U), R.body) {
        const [F, Y] = Lt(
          b,
          et(qt(l))
        );
        s = It(R.body, Ft, F, Y);
      }
    }
    o.isString(h) || (h = h ? "include" : "omit");
    const g = "credentials" in Request.prototype;
    m = new Request(t, {
      ...y,
      signal: p,
      method: i.toUpperCase(),
      headers: d.normalize().toJSON(),
      body: s,
      duplex: "half",
      credentials: g ? h : void 0
    });
    let S = await fetch(m);
    const x = ft && (c === "stream" || c === "response");
    if (ft && (u || x && _)) {
      const R = {};
      ["status", "statusText", "headers"].forEach((Ct) => {
        R[Ct] = S[Ct];
      });
      const U = o.toFiniteNumber(S.headers.get("content-length")), [F, Y] = u && Lt(
        U,
        et(qt(u), !0)
      ) || [];
      S = new Response(
        It(S.body, Ft, F, () => {
          Y && Y(), _ && _();
        }),
        R
      );
    }
    c = c || "text";
    let L = await it[o.findKey(it, c) || "text"](S, e);
    return !x && _ && _(), await new Promise((R, U) => {
      le(R, U, {
        data: L,
        headers: T.from(S.headers),
        status: S.status,
        statusText: S.statusText,
        config: e,
        request: m
      });
    });
  } catch (g) {
    throw _ && _(), g && g.name === "TypeError" && /fetch/i.test(g.message) ? Object.assign(
      new f("Network Error", f.ERR_NETWORK, e, m),
      {
        cause: g.cause || g
      }
    ) : f.from(g, g && g.code, e, m);
  }
}), _t = {
  http: wi,
  xhr: Xi,
  fetch: ns
};
o.forEach(_t, (e, t) => {
  if (e) {
    try {
      Object.defineProperty(e, "name", { value: t });
    } catch {
    }
    Object.defineProperty(e, "adapterName", { value: t });
  }
});
const Bt = (e) => `- ${e}`, as = (e) => o.isFunction(e) || e === null || e === !1, _e = {
  getAdapter: (e) => {
    e = o.isArray(e) ? e : [e];
    const { length: t } = e;
    let i, s;
    const r = {};
    for (let n = 0; n < t; n++) {
      i = e[n];
      let a;
      if (s = i, !as(i) && (s = _t[(a = String(i)).toLowerCase()], s === void 0))
        throw new f(`Unknown adapter '${a}'`);
      if (s)
        break;
      r[a || "#" + n] = s;
    }
    if (!s) {
      const n = Object.entries(r).map(
        ([u, l]) => `adapter ${u} ` + (l === !1 ? "is not supported by the environment" : "is not available in the build")
      );
      let a = t ? n.length > 1 ? `since :
` + n.map(Bt).join(`
`) : " " + Bt(n[0]) : "as no adapter specified";
      throw new f(
        "There is no suitable adapter to dispatch the request " + a,
        "ERR_NOT_SUPPORT"
      );
    }
    return s;
  },
  adapters: _t
};
function lt(e) {
  if (e.cancelToken && e.cancelToken.throwIfRequested(), e.signal && e.signal.aborted)
    throw new $(null, e);
}
function zt(e) {
  return lt(e), e.headers = T.from(e.headers), e.data = dt.call(
    e,
    e.transformRequest
  ), ["post", "put", "patch"].indexOf(e.method) !== -1 && e.headers.setContentType("application/x-www-form-urlencoded", !1), _e.getAdapter(e.adapter || X.adapter)(e).then(function(s) {
    return lt(e), s.data = dt.call(
      e,
      e.transformResponse,
      s
    ), s.headers = T.from(s.headers), s;
  }, function(s) {
    return de(s) || (lt(e), s && s.response && (s.response.data = dt.call(
      e,
      e.transformResponse,
      s.response
    ), s.response.headers = T.from(s.response.headers))), Promise.reject(s);
  });
}
const ye = "1.7.7", xt = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((e, t) => {
  xt[e] = function(s) {
    return typeof s === e || "a" + (t < 1 ? "n " : " ") + e;
  };
});
const Mt = {};
xt.transitional = function(t, i, s) {
  function r(n, a) {
    return "[Axios v" + ye + "] Transitional option '" + n + "'" + a + (s ? ". " + s : "");
  }
  return (n, a, u) => {
    if (t === !1)
      throw new f(
        r(a, " has been removed" + (i ? " in " + i : "")),
        f.ERR_DEPRECATED
      );
    return i && !Mt[a] && (Mt[a] = !0, console.warn(
      r(
        a,
        " has been deprecated since v" + i + " and will be removed in the near future"
      )
    )), t ? t(n, a, u) : !0;
  };
};
function os(e, t, i) {
  if (typeof e != "object")
    throw new f("options must be an object", f.ERR_BAD_OPTION_VALUE);
  const s = Object.keys(e);
  let r = s.length;
  for (; r-- > 0; ) {
    const n = s[r], a = t[n];
    if (a) {
      const u = e[n], l = u === void 0 || a(u, n, e);
      if (l !== !0)
        throw new f("option " + n + " must be " + l, f.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (i !== !0)
      throw new f("Unknown option " + n, f.ERR_BAD_OPTION);
  }
}
const yt = {
  assertOptions: os,
  validators: xt
}, I = yt.validators;
class M {
  constructor(t) {
    this.defaults = t, this.interceptors = {
      request: new vt(),
      response: new vt()
    };
  }
  /**
   * Dispatch a request
   *
   * @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
   * @param {?Object} config
   *
   * @returns {Promise} The Promise to be fulfilled
   */
  async request(t, i) {
    try {
      return await this._request(t, i);
    } catch (s) {
      if (s instanceof Error) {
        let r;
        Error.captureStackTrace ? Error.captureStackTrace(r = {}) : r = new Error();
        const n = r.stack ? r.stack.replace(/^.+\n/, "") : "";
        try {
          s.stack ? n && !String(s.stack).endsWith(n.replace(/^.+\n.+\n/, "")) && (s.stack += `
` + n) : s.stack = n;
        } catch {
        }
      }
      throw s;
    }
  }
  _request(t, i) {
    typeof t == "string" ? (i = i || {}, i.url = t) : i = t || {}, i = H(this.defaults, i);
    const { transitional: s, paramsSerializer: r, headers: n } = i;
    s !== void 0 && yt.assertOptions(s, {
      silentJSONParsing: I.transitional(I.boolean),
      forcedJSONParsing: I.transitional(I.boolean),
      clarifyTimeoutError: I.transitional(I.boolean)
    }, !1), r != null && (o.isFunction(r) ? i.paramsSerializer = {
      serialize: r
    } : yt.assertOptions(r, {
      encode: I.function,
      serialize: I.function
    }, !0)), i.method = (i.method || this.defaults.method || "get").toLowerCase();
    let a = n && o.merge(
      n.common,
      n[i.method]
    );
    n && o.forEach(
      ["delete", "get", "head", "post", "put", "patch", "common"],
      (m) => {
        delete n[m];
      }
    ), i.headers = T.concat(a, n);
    const u = [];
    let l = !0;
    this.interceptors.request.forEach(function(_) {
      typeof _.runWhen == "function" && _.runWhen(i) === !1 || (l = l && _.synchronous, u.unshift(_.fulfilled, _.rejected));
    });
    const c = [];
    this.interceptors.response.forEach(function(_) {
      c.push(_.fulfilled, _.rejected);
    });
    let d, h = 0, y;
    if (!l) {
      const m = [zt.bind(this), void 0];
      for (m.unshift.apply(m, u), m.push.apply(m, c), y = m.length, d = Promise.resolve(i); h < y; )
        d = d.then(m[h++], m[h++]);
      return d;
    }
    y = u.length;
    let p = i;
    for (h = 0; h < y; ) {
      const m = u[h++], _ = u[h++];
      try {
        p = m(p);
      } catch (b) {
        _.call(this, b);
        break;
      }
    }
    try {
      d = zt.call(this, p);
    } catch (m) {
      return Promise.reject(m);
    }
    for (h = 0, y = c.length; h < y; )
      d = d.then(c[h++], c[h++]);
    return d;
  }
  getUri(t) {
    t = H(this.defaults, t);
    const i = he(t.baseURL, t.url);
    return oe(i, t.params, t.paramsSerializer);
  }
}
o.forEach(["delete", "get", "head", "options"], function(t) {
  M.prototype[t] = function(i, s) {
    return this.request(H(s || {}, {
      method: t,
      url: i,
      data: (s || {}).data
    }));
  };
});
o.forEach(["post", "put", "patch"], function(t) {
  function i(s) {
    return function(n, a, u) {
      return this.request(H(u || {}, {
        method: t,
        headers: s ? {
          "Content-Type": "multipart/form-data"
        } : {},
        url: n,
        data: a
      }));
    };
  }
  M.prototype[t] = i(), M.prototype[t + "Form"] = i(!0);
});
class Rt {
  constructor(t) {
    if (typeof t != "function")
      throw new TypeError("executor must be a function.");
    let i;
    this.promise = new Promise(function(n) {
      i = n;
    });
    const s = this;
    this.promise.then((r) => {
      if (!s._listeners) return;
      let n = s._listeners.length;
      for (; n-- > 0; )
        s._listeners[n](r);
      s._listeners = null;
    }), this.promise.then = (r) => {
      let n;
      const a = new Promise((u) => {
        s.subscribe(u), n = u;
      }).then(r);
      return a.cancel = function() {
        s.unsubscribe(n);
      }, a;
    }, t(function(n, a, u) {
      s.reason || (s.reason = new $(n, a, u), i(s.reason));
    });
  }
  /**
   * Throws a `CanceledError` if cancellation has been requested.
   */
  throwIfRequested() {
    if (this.reason)
      throw this.reason;
  }
  /**
   * Subscribe to the cancel signal
   */
  subscribe(t) {
    if (this.reason) {
      t(this.reason);
      return;
    }
    this._listeners ? this._listeners.push(t) : this._listeners = [t];
  }
  /**
   * Unsubscribe from the cancel signal
   */
  unsubscribe(t) {
    if (!this._listeners)
      return;
    const i = this._listeners.indexOf(t);
    i !== -1 && this._listeners.splice(i, 1);
  }
  toAbortSignal() {
    const t = new AbortController(), i = (s) => {
      t.abort(s);
    };
    return this.subscribe(i), t.signal.unsubscribe = () => this.unsubscribe(i), t.signal;
  }
  /**
   * Returns an object that contains a new `CancelToken` and a function that, when called,
   * cancels the `CancelToken`.
   */
  static source() {
    let t;
    return {
      token: new Rt(function(r) {
        t = r;
      }),
      cancel: t
    };
  }
}
function us(e) {
  return function(i) {
    return e.apply(null, i);
  };
}
function cs(e) {
  return o.isObject(e) && e.isAxiosError === !0;
}
const pt = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511
};
Object.entries(pt).forEach(([e, t]) => {
  pt[t] = e;
});
function pe(e) {
  const t = new M(e), i = Zt(M.prototype.request, t);
  return o.extend(i, M.prototype, t, { allOwnKeys: !0 }), o.extend(i, t, null, { allOwnKeys: !0 }), i.create = function(r) {
    return pe(H(e, r));
  }, i;
}
const w = pe(X);
w.Axios = M;
w.CanceledError = $;
w.CancelToken = Rt;
w.isCancel = de;
w.VERSION = ye;
w.toFormData = at;
w.AxiosError = f;
w.Cancel = w.CanceledError;
w.all = function(t) {
  return Promise.all(t);
};
w.spread = us;
w.isAxiosError = cs;
w.mergeConfig = H;
w.AxiosHeaders = T;
w.formToJSON = (e) => ce(o.isHTMLForm(e) ? new FormData(e) : e);
w.getAdapter = _e.getAdapter;
w.HttpStatusCode = pt;
w.default = w;
class ds {
  constructor(t = 1e4, i, s = !1) {
    this.axiosInstance = w.create(), this.timeout = t, this.proxyConfig = i, s && this.enableDebug();
  }
  buildRequestConfig({ payload: t, parameters: i, headers: s, baseUrl: r }) {
    let n = {
      method: "GET",
      timeout: this.timeout,
      params: i,
      headers: s,
      baseURL: r,
      validateStatus: function(a) {
        return a < 500;
      }
    };
    return t && (n.method = "POST", n.data = t), this.proxyConfig && (n.proxy = this.proxyConfig), n;
  }
  send(t) {
    return new Promise((i, s) => {
      let r = this.buildRequestConfig(t);
      this.axiosInstance(r).then((n) => {
        let a = buildSmartyResponse(n);
        a.statusCode >= 400 && s(a), i(a);
      }).catch((n) => s(buildSmartyResponse(void 0, n)));
    });
  }
  enableDebug() {
    this.axiosInstance.interceptors.request.use((t) => (console.log(`Request:\r
`, t), console.log(`\r
*******************************************\r
`), t)), this.axiosInstance.interceptors.response.use((t) => (console.log(`Response:\r
`), console.log("Status:", t.status, t.statusText), console.log("Headers:", t.headers), console.log("Data:", t.data), t));
  }
}
class ls {
  constructor(t) {
    this.sender = t;
  }
  send(t) {
    return new Promise((i, s) => {
      this.sender.send(t).then(i).catch((r) => {
        switch (r.statusCode) {
          case 500:
            r.error = new Kt();
            break;
          case 503:
            r.error = new Gt();
            break;
          case 504:
            r.error = new Wt();
            break;
          default:
            r.error = new jt(
              r && r.payload && r.payload.errors[0] && r.payload.errors[0].message
            );
        }
        s(r);
      });
    });
  }
}
class Et {
  constructor(t, i) {
    this.authId = t, this.hostName = i;
  }
  sign(t) {
    t.parameters.key = this.authId, this.hostName && (t.headers.Referer = "https://" + this.hostName);
  }
}
class hs {
  constructor(t, i) {
    this.signer = i, this.sender = t;
  }
  send(t) {
    if (t.payload && this.signer instanceof Et) {
      const s = "Shared credentials cannot be used in batches with a length greater than 1 or when using the US Extract API.";
      throw new B(s);
    }
    return new Promise((s, r) => {
      this.signer.sign(t), this.sender.send(t).then(s).catch(r);
    });
  }
}
const ms = "smartystreets-javascript-sdk", bs = "0.0.0", fs = "Quick and easy Smarty address validation.", _s = "Smarty SDK Team <support@smarty.com> (https://www.smarty.com)", ys = "Apache-2.0", ps = {
  type: "git",
  url: "github:smartystreets/smartystreets-javascript-sdk"
}, gs = [
  "smarty",
  "smartystreets",
  "address",
  "validation",
  "verification",
  "verify",
  "validate",
  "street-address",
  "geocoding",
  "addresses",
  "zipcode",
  "autocomplete",
  "autosuggest",
  "suggestions",
  "international",
  "http",
  "sdk"
], ws = "pnpm@9.12.0", Ss = "dist/index.umd.js", xs = "dist/index.es.js", Rs = "module", Es = [
  "dist"
], Ts = {
  build: "vite build",
  test: "mocha 'tests/**/*.js'",
  format: "prettier --write ."
}, Cs = {
  chai: "^4.3.6",
  mocha: "^10.2.0",
  prettier: "^3.3.3",
  vite: "^5.4.9",
  "vite-plugin-dts": "^4.2.4"
}, As = {
  axios: "^1.7.7",
  "axios-retry": "4.5.0"
}, Ps = {
  name: ms,
  version: bs,
  description: fs,
  author: _s,
  license: ys,
  repository: ps,
  keywords: gs,
  packageManager: ws,
  main: Ss,
  module: xs,
  type: Rs,
  export: {
    ".": {
      import: "./dist/index.es.js",
      require: "./dist/index.umd.js"
    }
  },
  files: Es,
  scripts: Ts,
  devDependencies: Cs,
  dependencies: As
};
class Ht {
  constructor(t) {
    this.sender = t;
  }
  send(t) {
    return t.parameters.agent = "smarty (sdk:javascript@" + Ps.version + ")", new Promise((i, s) => {
      this.sender.send(t).then(i).catch(s);
    });
  }
}
class Os {
  constructor(t = 5, i, s) {
    this.maxRetries = t, this.statusToRetry = [408, 429, 500, 502, 503, 504], this.statusTooManyRequests = 429, this.maxBackoffDuration = 10, this.inner = i, this.sleeper = s;
  }
  async send(t) {
    let i = await this.inner.send(t);
    for (let s = 0; s < this.maxRetries && this.statusToRetry.includes(parseInt(i.statusCode)); s++) {
      if (parseInt(i.statusCode) === this.statusTooManyRequests) {
        let r = 10;
        if (i.headers) {
          const n = i.headers["Retry-After"];
          Number.isInteger(n) && (r = n);
        }
        await this.rateLimitBackOff(r);
      } else
        await this.backoff(s);
      i = await this.inner.send(t);
    }
    return i;
  }
  async backoff(t) {
    const i = Math.min(t, this.maxBackoffDuration);
    console.log(
      `There was an error processing the request. Retrying in ${i} seconds...`
    ), await this.sleeper.sleep(i);
  }
  async rateLimitBackOff(t) {
    console.log(
      `Rate limit reached. Retrying in ${t} seconds...`
    ), await this.sleeper.sleep(t);
  }
}
class Ns {
  constructor() {
  }
  sleep(t) {
    return new Promise((i) => setTimeout(i, t * 1e3));
  }
}
class vs {
  constructor(t, i) {
    this.sender = t, this.customHeaders = i;
  }
  send(t) {
    for (let i in this.customHeaders)
      t.headers[i] = this.customHeaders[i];
    return new Promise((i, s) => {
      this.sender.send(t).then(i).catch(s);
    });
  }
}
class ks {
  constructor(t, i) {
    this.urlOverride = i, this.sender = t;
  }
  send(t) {
    return new Promise((i, s) => {
      t.baseUrl = `${this.urlOverride}${t.baseUrlParam ? `/${t.baseUrlParam}` : ""}`, this.sender.send(t).then(i).catch(s);
    });
  }
}
class Ls {
  constructor(t, i) {
    this.sender = t, this.licenses = i;
  }
  send(t) {
    return this.licenses.length !== 0 && (t.parameters.license = this.licenses.join(",")), new Promise((i, s) => {
      this.sender.send(t).then(i).catch(s);
    });
  }
}
class ge {
  constructor(t, i) {
    this.authId = t, this.authToken = i;
  }
  sign(t) {
    t.parameters["auth-id"] = this.authId, t.parameters["auth-token"] = this.authToken;
  }
}
let we = class {
  constructor(t, i, s, r, n, a, u, l, c, d, h, y, p) {
    this.street = t, this.street2 = i, this.secondary = s, this.city = r, this.state = n, this.zipCode = a, this.lastLine = u, this.addressee = l, this.urbanization = c, this.match = d, this.maxCandidates = h, this.inputId = y, this.format = p, this.result = [];
  }
};
class qs {
  constructor(t) {
    this.lookup = t, this.data = {};
  }
  add(t, i) {
    this.lookupFieldIsPopulated(i) && (this.data[t] = this.formatData(this.lookup[i]));
  }
  formatData(t) {
    return Array.isArray(t) ? t.join(";") : t;
  }
  lookupFieldIsPopulated(t) {
    return this.lookup[t] !== "" && this.lookup[t] !== void 0;
  }
}
function N(e, t) {
  let i = new qs(e);
  for (let s in t)
    i.add(s, t[s]);
  return i.data;
}
let v = class {
  constructor(t, i = { "Content-Type": "application/json; charset=utf-8" }) {
    this.baseUrl = "", this.baseUrlParam = "", this.payload = t, this.headers = i, this.parameters = {};
  }
};
function Se(e, t, i, s) {
  if (e.isEmpty()) throw new Vt();
  let r = new v();
  return e.length() === 1 ? r.parameters = n(e)[0] : r.payload = n(e), new Promise((u, l) => {
    t.send(r).then((c) => {
      c.error && l(c.error), u(a(e, c));
    }).catch(l);
  });
  function n(u) {
    return u.lookups.map((l) => N(l, s));
  }
  function a(u, l) {
    return l.payload.map((c) => {
      let d = new i(c);
      u.getByIndex(d.inputIndex).result.push(d);
    }), u;
  }
}
let Tt = class {
  constructor(t) {
    if (this.inputIndex = t.input_index, this.candidateIndex = t.candidate_index, this.addressee = t.addressee, this.deliveryLine1 = t.delivery_line_1, this.deliveryLine2 = t.delivery_line_2, this.lastLine = t.last_line, this.deliveryPointBarcode = t.delivery_point_barcode, this.smartyKey = t.smarty_key, this.components = {}, t.components !== void 0 && (this.components.urbanization = t.components.urbanization, this.components.primaryNumber = t.components.primary_number, this.components.streetName = t.components.street_name, this.components.streetPredirection = t.components.street_predirection, this.components.streetPostdirection = t.components.street_postdirection, this.components.streetSuffix = t.components.street_suffix, this.components.secondaryNumber = t.components.secondary_number, this.components.secondaryDesignator = t.components.secondary_designator, this.components.extraSecondaryNumber = t.components.extra_secondary_number, this.components.extraSecondaryDesignator = t.components.extra_secondary_designator, this.components.pmbDesignator = t.components.pmb_designator, this.components.pmbNumber = t.components.pmb_number, this.components.cityName = t.components.city_name, this.components.defaultCityName = t.components.default_city_name, this.components.state = t.components.state_abbreviation, this.components.zipCode = t.components.zipcode, this.components.plus4Code = t.components.plus4_code, this.components.deliveryPoint = t.components.delivery_point, this.components.deliveryPointCheckDigit = t.components.delivery_point_check_digit), this.metadata = {}, t.metadata !== void 0) {
      switch (this.metadata.recordType = t.metadata.record_type, this.metadata.zipType = t.metadata.zip_type, this.metadata.countyFips = t.metadata.county_fips, this.metadata.countyName = t.metadata.county_name, this.metadata.carrierRoute = t.metadata.carrier_route, this.metadata.congressionalDistrict = t.metadata.congressional_district, this.metadata.buildingDefaultIndicator = t.metadata.building_default_indicator, this.metadata.rdi = t.metadata.rdi, this.metadata.elotSequence = t.metadata.elot_sequence, this.metadata.elotSort = t.metadata.elot_sort, this.metadata.latitude = t.metadata.latitude, this.metadata.longitude = t.metadata.longitude, t.metadata.coordinate_license) {
        case 1:
          this.metadata.coordinateLicense = "SmartyStreets Proprietary";
          break;
        default:
          this.metadata.coordinateLicense = "SmartyStreets";
      }
      this.metadata.precision = t.metadata.precision, this.metadata.timeZone = t.metadata.time_zone, this.metadata.utcOffset = t.metadata.utc_offset, this.metadata.obeysDst = t.metadata.dst, this.metadata.isEwsMatch = t.metadata.ews_match;
    }
    this.analysis = {}, t.analysis !== void 0 && (this.analysis.dpvMatchCode = t.analysis.dpv_match_code, this.analysis.dpvFootnotes = t.analysis.dpv_footnotes, this.analysis.cmra = t.analysis.dpv_cmra, this.analysis.vacant = t.analysis.dpv_vacant, this.analysis.noStat = t.analysis.dpv_no_stat, this.analysis.active = t.analysis.active, this.analysis.isEwsMatch = t.analysis.ews_match, this.analysis.footnotes = t.analysis.footnotes, this.analysis.lacsLinkCode = t.analysis.lacslink_code, this.analysis.lacsLinkIndicator = t.analysis.lacslink_indicator, this.analysis.isSuiteLinkMatch = t.analysis.suitelink_match, this.analysis.enhancedMatch = t.analysis.enhanced_match);
  }
};
const O = {
  usStreet: {
    street: "street",
    street2: "street2",
    secondary: "secondary",
    city: "city",
    state: "state",
    zipcode: "zipCode",
    lastline: "lastLine",
    addressee: "addressee",
    urbanization: "urbanization",
    match: "match",
    format: "format",
    candidates: "maxCandidates"
  },
  usAutocompletePro: {
    search: "search",
    selected: "selected",
    max_results: "maxResults",
    include_only_cities: "includeOnlyCities",
    include_only_states: "includeOnlyStates",
    include_only_zip_codes: "includeOnlyZIPCodes",
    exclude_states: "excludeStates",
    prefer_cities: "preferCities",
    prefer_states: "preferStates",
    prefer_zip_codes: "preferZIPCodes",
    prefer_ratio: "preferRatio",
    prefer_geolocation: "preferGeolocation",
    source: "source"
  },
  usZipcode: {
    city: "city",
    state: "state",
    zipcode: "zipCode"
  },
  internationalStreet: {
    country: "country",
    freeform: "freeform",
    address1: "address1",
    address2: "address2",
    address3: "address3",
    address4: "address4",
    organization: "organization",
    locality: "locality",
    administrative_area: "administrativeArea",
    postal_code: "postalCode",
    geocode: "geocode",
    language: "language"
  },
  internationalAddressAutocomplete: {
    search: "search",
    country: "country",
    max_results: "maxResults",
    include_only_administrative_area: "includeOnlyAdministrativeArea",
    include_only_locality: "includeOnlyLocality",
    include_only_postal_code: "includeOnlyPostalCode"
  },
  usReverseGeo: {
    latitude: "latitude",
    longitude: "longitude",
    source: "source"
  },
  usExtract: {
    html: "html",
    aggressive: "aggressive",
    addr_line_breaks: "addressesHaveLineBreaks",
    addr_per_line: "addressesPerLine"
  },
  usEnrichment: {
    include: "include",
    exclude: "exclude",
    dataset: "dataset",
    data_subset: "dataSubset"
  }
};
let Us = class {
  constructor(t) {
    this.sender = t;
  }
  /**
   * Sends up to 100 lookups for validation.
   * @param data may be a Lookup object, or a Batch which must contain between 1 and 100 Lookup objects
   * @throws SmartyException
   */
  send(t) {
    const i = t instanceof G, s = t instanceof we;
    if (!s && !i) throw new A();
    let r;
    return s ? (t.maxCandidates == null && t.match === "enhanced" && (t.maxCandidates = 5), r = new G(), r.add(t)) : r = t, Se(r, this.sender, Tt, O.usStreet);
  }
}, xe = class {
  constructor(t, i, s, r) {
    this.city = t, this.state = i, this.zipCode = s, this.inputId = r, this.result = [];
  }
}, Re = class {
  constructor(t) {
    this.inputIndex = t.input_index, this.status = t.status, this.reason = t.reason, this.valid = this.status === void 0 && this.reason === void 0, this.cities = t.city_states ? t.city_states.map((i) => ({
      city: i.city,
      stateAbbreviation: i.state_abbreviation,
      state: i.state,
      mailableCity: i.mailable_city
    })) : [], this.zipcodes = t.zipcodes ? t.zipcodes.map((i) => ({
      zipcode: i.zipcode,
      zipcodeType: i.zipcode_type,
      defaultCity: i.default_city,
      countyFips: i.county_fips,
      countyName: i.county_name,
      latitude: i.latitude,
      longitude: i.longitude,
      precision: i.precision,
      stateAbbreviation: i.state_abbreviation,
      state: i.state,
      alternateCounties: i.alternate_counties ? i.alternate_counties.map((s) => ({
        countyFips: s.county_fips,
        countyName: s.county_name,
        stateAbbreviation: s.state_abbreviation,
        state: s.state
      })) : []
    })) : [];
  }
}, Is = class {
  constructor(t) {
    this.sender = t;
  }
  /**
   * Sends up to 100 lookups for validation.
   * @param data May be a Lookup object, or a Batch which must contain between 1 and 100 Lookup objects
   * @throws SmartyException
   */
  send(t) {
    const i = t instanceof G, s = t instanceof xe;
    if (!s && !i) throw new A();
    let r;
    return s ? (r = new G(), r.add(t)) : r = t, Se(r, this.sender, Re, O.usZipcode);
  }
}, Ee = class {
  constructor(t) {
    this.streetLine = t.street_line, this.secondary = t.secondary, this.city = t.city, this.state = t.state, this.zipcode = t.zipcode, this.entries = t.entries, t.source && (this.source = t.source);
  }
}, Fs = class {
  constructor(t) {
    this.sender = t;
  }
  send(t) {
    if (typeof t > "u") throw new A();
    let i = new v();
    return i.parameters = N(
      t,
      O.usAutocompletePro
    ), new Promise((r, n) => {
      this.sender.send(i).then((a) => {
        a.error && n(a.error), t.result = s(a.payload), r(t);
      }).catch(n);
    });
    function s(r) {
      return r.suggestions === null ? [] : r.suggestions.map(
        (n) => new Ee(n)
      );
    }
  }
};
class Bs {
  constructor(t) {
    this.text = t.text, this.verified = t.verified, this.line = t.line, this.start = t.start, this.end = t.end, this.candidates = t.api_output.map(
      (i) => new Tt(i)
    );
  }
}
let Te = class {
  constructor({ meta: t, addresses: i }) {
    this.meta = {
      lines: t.lines,
      unicode: t.unicode,
      addressCount: t.address_count,
      verifiedCount: t.verified_count,
      bytes: t.bytes,
      characterCount: t.character_count
    }, this.addresses = i.map((s) => new Bs(s));
  }
}, zs = class {
  constructor(t) {
    this.sender = t;
  }
  send(t) {
    if (typeof t > "u") throw new A();
    let i = new v(t.text, {
      "Content-Type": "text/plain; charset=utf-8"
    });
    return i.parameters = N(t, O.usExtract), new Promise((s, r) => {
      this.sender.send(i).then((n) => {
        n.error && r(n.error), t.result = new Te(n.payload), s(t);
      }).catch(r);
    });
  }
};
class Ce {
  constructor(t) {
    this.organization = t.organization, this.address1 = t.address1, this.address2 = t.address2, this.address3 = t.address3, this.address4 = t.address4, this.address5 = t.address5, this.address6 = t.address6, this.address7 = t.address7, this.address8 = t.address8, this.address9 = t.address9, this.address10 = t.address10, this.address11 = t.address11, this.address12 = t.address12, this.components = {}, t.components !== void 0 && (this.components.countryIso3 = t.components.country_iso_3, this.components.superAdministrativeArea = t.components.super_administrative_area, this.components.administrativeArea = t.components.administrative_area, this.components.administrativeAreaShort = t.components.administrative_area_short, this.components.administrativeAreaLong = t.components.administrative_area_long, this.components.subAdministrativeArea = t.components.sub_administrative_area, this.components.dependentLocality = t.components.dependent_locality, this.components.dependentLocalityName = t.components.dependent_locality_name, this.components.doubleDependentLocality = t.components.double_dependent_locality, this.components.locality = t.components.locality, this.components.postalCode = t.components.postal_code, this.components.postalCodeShort = t.components.postal_code_short, this.components.postalCodeExtra = t.components.postal_code_extra, this.components.premise = t.components.premise, this.components.premiseExtra = t.components.premise_extra, this.components.premisePrefixNumber = t.components.premise_prefix_number, this.components.premiseNumber = t.components.premise_number, this.components.premiseType = t.components.premise_type, this.components.thoroughfare = t.components.thoroughfare, this.components.thoroughfarePredirection = t.components.thoroughfare_predirection, this.components.thoroughfarePostdirection = t.components.thoroughfare_postdirection, this.components.thoroughfareName = t.components.thoroughfare_name, this.components.thoroughfareTrailingType = t.components.thoroughfare_trailing_type, this.components.thoroughfareType = t.components.thoroughfare_type, this.components.dependentThoroughfare = t.components.dependent_thoroughfare, this.components.dependentThoroughfarePredirection = t.components.dependent_thoroughfare_predirection, this.components.dependentThoroughfarePostdirection = t.components.dependent_thoroughfare_postdirection, this.components.dependentThoroughfareName = t.components.dependent_thoroughfare_name, this.components.dependentThoroughfareTrailingType = t.components.dependent_thoroughfare_trailing_type, this.components.dependentThoroughfareType = t.components.dependent_thoroughfare_type, this.components.building = t.components.building, this.components.buildingLeadingType = t.components.building_leading_type, this.components.buildingName = t.components.building_name, this.components.buildingTrailingType = t.components.building_trailing_type, this.components.subBuildingType = t.components.sub_building_type, this.components.subBuildingNumber = t.components.sub_building_number, this.components.subBuildingName = t.components.sub_building_name, this.components.subBuilding = t.components.sub_building, this.components.levelType = t.components.level_type, this.components.levelNumber = t.components.level_number, this.components.postBox = t.components.post_box, this.components.postBoxType = t.components.post_box_type, this.components.postBoxNumber = t.components.post_box_number), this.analysis = {}, t.analysis !== void 0 && (this.analysis.verificationStatus = t.analysis.verification_status, this.analysis.addressPrecision = t.analysis.address_precision, this.analysis.maxAddressPrecision = t.analysis.max_address_precision, this.analysis.changes = {}, t.analysis.changes !== void 0 && (this.analysis.changes.organization = t.analysis.changes.organization, this.analysis.changes.address1 = t.analysis.changes.address1, this.analysis.changes.address2 = t.analysis.changes.address2, this.analysis.changes.address3 = t.analysis.changes.address3, this.analysis.changes.address4 = t.analysis.changes.address4, this.analysis.changes.address5 = t.analysis.changes.address5, this.analysis.changes.address6 = t.analysis.changes.address6, this.analysis.changes.address7 = t.analysis.changes.address7, this.analysis.changes.address8 = t.analysis.changes.address8, this.analysis.changes.address9 = t.analysis.changes.address9, this.analysis.changes.address10 = t.analysis.changes.address10, this.analysis.changes.address11 = t.analysis.changes.address11, this.analysis.changes.address12 = t.analysis.changes.address12, this.analysis.changes.components = {}, t.analysis.changes.components !== void 0 && (this.analysis.changes.components.countryIso3 = t.analysis.changes.components.country_iso_3, this.analysis.changes.components.superAdministrativeArea = t.analysis.changes.components.super_administrative_area, this.analysis.changes.components.administrativeArea = t.analysis.changes.components.administrative_area, this.analysis.changes.components.administrativeAreaShort = t.analysis.changes.components.administrative_area_short, this.analysis.changes.components.administrativeAreaLong = t.analysis.changes.components.administrative_area_long, this.analysis.changes.components.subAdministrativeArea = t.analysis.changes.components.sub_administrative_area, this.analysis.changes.components.dependentLocality = t.analysis.changes.components.dependent_locality, this.analysis.changes.components.dependentLocalityName = t.analysis.changes.components.dependent_locality_name, this.analysis.changes.components.doubleDependentLocality = t.analysis.changes.components.double_dependent_locality, this.analysis.changes.components.locality = t.analysis.changes.components.locality, this.analysis.changes.components.postalCode = t.analysis.changes.components.postal_code, this.analysis.changes.components.postalCodeShort = t.analysis.changes.components.postal_code_short, this.analysis.changes.components.postalCodeExtra = t.analysis.changes.components.postal_code_extra, this.analysis.changes.components.premise = t.analysis.changes.components.premise, this.analysis.changes.components.premiseExtra = t.analysis.changes.components.premise_extra, this.analysis.changes.components.premisePrefixNumber = t.analysis.changes.components.premise_prefix_number, this.analysis.changes.components.premiseNumber = t.analysis.changes.components.premise_number, this.analysis.changes.components.premiseType = t.analysis.changes.components.premise_type, this.analysis.changes.components.thoroughfare = t.analysis.changes.components.thoroughfare, this.analysis.changes.components.thoroughfarePredirection = t.analysis.changes.components.thoroughfare_predirection, this.analysis.changes.components.thoroughfarePostdirection = t.analysis.changes.components.thoroughfare_postdirection, this.analysis.changes.components.thoroughfareName = t.analysis.changes.components.thoroughfare_name, this.analysis.changes.components.thoroughfareTrailingType = t.analysis.changes.components.thoroughfare_trailing_type, this.analysis.changes.components.thoroughfareType = t.analysis.changes.components.thoroughfare_type, this.analysis.changes.components.dependentThoroughfare = t.analysis.changes.components.dependent_thoroughfare, this.analysis.changes.components.dependentThoroughfarePredirection = t.analysis.changes.components.dependent_thoroughfare_predirection, this.analysis.changes.components.dependentThoroughfarePostdirection = t.analysis.changes.components.dependent_thoroughfare_postdirection, this.analysis.changes.components.dependentThoroughfareName = t.analysis.changes.components.dependent_thoroughfare_name, this.analysis.changes.components.dependentThoroughfareTrailingType = t.analysis.changes.components.dependent_thoroughfare_trailing_type, this.analysis.changes.components.dependentThoroughfareType = t.analysis.changes.components.dependent_thoroughfare_type, this.analysis.changes.components.building = t.analysis.changes.components.building, this.analysis.changes.components.buildingLeadingType = t.analysis.changes.components.building_leading_type, this.analysis.changes.components.buildingName = t.analysis.changes.components.building_name, this.analysis.changes.components.buildingTrailingType = t.analysis.changes.components.building_trailing_type, this.analysis.changes.components.subBuildingType = t.analysis.changes.components.sub_building_type, this.analysis.changes.components.subBuildingNumber = t.analysis.changes.components.sub_building_number, this.analysis.changes.components.subBuildingName = t.analysis.changes.components.sub_building_name, this.analysis.changes.components.subBuilding = t.analysis.changes.components.sub_building, this.analysis.changes.components.levelType = t.analysis.changes.components.level_type, this.analysis.changes.components.levelNumber = t.analysis.changes.components.level_number, this.analysis.changes.components.postBox = t.analysis.changes.components.post_box, this.analysis.changes.components.postBoxType = t.analysis.changes.components.post_box_type, this.analysis.changes.components.postBoxNumber = t.analysis.changes.components.post_box_number))), this.metadata = {}, t.metadata !== void 0 && (this.metadata.latitude = t.metadata.latitude, this.metadata.longitude = t.metadata.longitude, this.metadata.geocodePrecision = t.metadata.geocode_precision, this.metadata.maxGeocodePrecision = t.metadata.max_geocode_precision, this.metadata.addressFormat = t.metadata.address_format);
  }
}
let Ms = class {
  constructor(t) {
    this.sender = t;
  }
  send(t) {
    if (typeof t > "u") throw new A();
    let i = new v();
    return i.parameters = N(
      t,
      O.internationalStreet
    ), new Promise((r, n) => {
      this.sender.send(i).then((a) => {
        a.error && n(a.error), r(s(a, t));
      }).catch(n);
    });
    function s(r, n) {
      return r.payload.map((a) => {
        n.result.push(new Ce(a));
      }), n;
    }
  }
};
class Hs {
  constructor(t) {
    if (this.distance = t.distance, this.address = {}, t.address && (this.address.street = t.address.street, this.address.city = t.address.city, this.address.state_abbreviation = t.address.state_abbreviation, this.address.zipcode = t.address.zipcode, this.address.source = t.address.source), this.coordinate = {}, t.coordinate)
      switch (this.coordinate.latitude = t.coordinate.latitude, this.coordinate.longitude = t.coordinate.longitude, this.coordinate.accuracy = t.coordinate.accuracy, t.coordinate.license) {
        case 1:
          this.coordinate.license = "SmartyStreets Proprietary";
          break;
        default:
          this.coordinate.license = "SmartyStreets";
      }
  }
}
let Ae = class {
  constructor(t) {
    this.results = [], t && t.results.map((i) => {
      this.results.push(new Hs(i));
    });
  }
}, js = class {
  constructor(t) {
    this.sender = t;
  }
  send(t) {
    if (typeof t > "u") throw new A();
    let i = new v();
    return i.parameters = N(t, O.usReverseGeo), new Promise((r, n) => {
      this.sender.send(i).then((a) => {
        a.error && n(a.error), r(s(a, t));
      }).catch(n);
    });
    function s(r, n) {
      return n.response = new Ae(r.payload), n;
    }
  }
};
class Pe {
  constructor(t) {
    this.street = t.street, this.locality = t.locality, this.administrativeArea = t.administrative_area, this.postalCode = t.postal_code, this.countryIso3 = t.country_iso3, this.entries = t.entries, this.addressText = t.address_text, this.addressId = t.address_id;
  }
}
let $s = class {
  constructor(t) {
    this.sender = t;
  }
  send(t) {
    if (typeof t > "u") throw new A();
    let i = new v();
    return i.parameters = N(
      t,
      O.internationalAddressAutocomplete
    ), t.addressId && (i.baseUrlParam = t.addressId), new Promise((r, n) => {
      this.sender.send(i).then((a) => {
        a.error && n(a.error), t.result = s(a.payload), r(t);
      }).catch(n);
    });
    function s(r) {
      return r && r.candidates === null ? [] : r.candidates.map((n) => new Pe(n));
    }
  }
};
class Vs {
  constructor(t) {
    this.sender = t;
  }
  sendPrincipal(t) {
    if (typeof t > "u") throw new A();
    let i = new v();
    return i.parameters = N(t, O.usEnrichment), i.baseUrlParam = t.smartyKey + "/property/principal", new Promise((s, r) => {
      this.sender.send(i).then((n) => {
        n.error && r(n.error), t.response = n.payload, s(t);
      }).catch(r);
    });
  }
  sendFinancial(t) {
    if (typeof t > "u") throw new A();
    let i = new v();
    return i.parameters = N(t, O.usEnrichment), i.baseUrlParam = t.smartyKey + "/property/financial", new Promise((s, r) => {
      this.sender.send(i).then((n) => {
        n.error && r(n.error), t.response = n.payload, s(t);
      }).catch(r);
    });
  }
  sendGeo(t) {
    if (typeof t > "u") throw new A();
    let i = new v();
    return i.parameters = N(t, O.usEnrichment), i.baseUrlParam = t.smartyKey + "/geo-reference", new Promise((s, r) => {
      this.sender.send(i).then((n) => {
        n.error && r(n.error), t.response = n.payload, s(t);
      }).catch(r);
    });
  }
  sendSecondary(t) {
    if (typeof t > "u") throw new A();
    let i = new v();
    return i.parameters = N(t, O.usEnrichment), i.baseUrlParam = t.smartyKey + "/secondary", new Promise((s, r) => {
      this.sender.send(i).then((n) => {
        n.error && r(n.error), t.response = n.payload, s(t);
      }).catch(r);
    });
  }
  sendSecondaryCount(t) {
    if (typeof t > "u") throw new A();
    let i = new v();
    return i.parameters = N(t, O.usEnrichment), i.baseUrlParam = t.smartyKey + "/secondary/count", new Promise((s, r) => {
      this.sender.send(i).then((n) => {
        n.error && r(n.error), t.response = n.payload, s(t);
      }).catch(r);
    });
  }
}
const Js = "https://international-street.api.smarty.com/verify", Ks = "https://us-autocomplete-pro.api.smarty.com/lookup", Gs = "https://us-extract.api.smarty.com/", Ws = "https://us-street.api.smarty.com/street-address", Zs = "https://us-zipcode.api.smarty.com/lookup", Xs = "https://us-reverse-geo.api.smarty.com/lookup", Ys = "https://international-autocomplete.api.smarty.com/v2/lookup", Qs = "https://us-enrichment.api.smarty.com/lookup";
class Oe {
  constructor(t) {
    if (i()) throw new Jt();
    this.signer = t, this.httpSender = void 0, this.maxRetries = 5, this.maxTimeout = 1e4, this.baseUrl = void 0, this.proxy = void 0, this.customHeaders = {}, this.debug = void 0, this.licenses = [];
    function i() {
      return !t instanceof ge || !t instanceof Et;
    }
  }
  /**
   * @param retries The maximum number of times to retry sending the request to the API. (Default is 5)
   * @return Returns <b>this</b> to accommodate method chaining.
   */
  withMaxRetries(t) {
    return this.maxRetries = t, this;
  }
  /**
   * @param timeout The maximum time (in milliseconds) to wait for a connection, and also to wait for <br>
   *                   the response to be read. (Default is 10000)
   * @return Returns <b>this</b> to accommodate method chaining.
   */
  withMaxTimeout(t) {
    return this.maxTimeout = t, this;
  }
  /**
   * @param sender Default is a series of nested senders. See <b>buildSender()</b>.
   * @return Returns <b>this</b> to accommodate method chaining.
   */
  withSender(t) {
    return this.httpSender = t, this;
  }
  /**
   * This may be useful when using a local installation of the Smarty APIs.
   * @param url Defaults to the URL for the API corresponding to the <b>Client</b> object being built.
   * @return Returns <b>this</b> to accommodate method chaining.
   */
  withBaseUrl(t) {
    return this.baseUrl = t, this;
  }
  /**
   * Use this to specify a proxy through which to send all lookups.
   * @param host The host of the proxy server (do not include the port).
   * @param port The port on the proxy server to which you wish to connect.
   * @param protocol The protocol on the proxy server to which you wish to connect. If the proxy server uses HTTPS, then you must set the protocol to 'https'.
   * @param username The username to login to the proxy.
   * @param password The password to login to the proxy.
   * @return Returns <b>this</b> to accommodate method chaining.
   */
  withProxy(t, i, s, r, n) {
    return this.proxy = {
      host: t,
      port: i,
      protocol: s
    }, r && n && (this.proxy.auth = {
      username: r,
      password: n
    }), this;
  }
  /**
   * Use this to add any additional headers you need.
   * @param customHeaders A String to Object <b>Map</b> of header name/value pairs.
   * @return Returns <b>this</b> to accommodate method chaining.
   */
  withCustomHeaders(t) {
    return this.customHeaders = t, this;
  }
  /**
   * Enables debug mode, which will print information about the HTTP request and response to console.log
   * @return Returns <b>this</b> to accommodate method chaining.
   */
  withDebug() {
    return this.debug = !0, this;
  }
  /**
   * Allows the caller to specify the subscription license (aka "track") they wish to use.
   * @param licenses A String Array of licenses.
   * @returns Returns <b>this</b> to accommodate method chaining.
   */
  withLicenses(t) {
    return this.licenses = t, this;
  }
  buildSender() {
    if (this.httpSender) return this.httpSender;
    const t = new ds(this.maxTimeout, this.proxy, this.debug), i = new ls(t), s = new hs(i, this.signer);
    let r = new Ht(s);
    if (this.maxRetries > 0) {
      const l = new Os(
        this.maxRetries,
        s,
        new Ns()
      );
      r = new Ht(l);
    }
    const n = new vs(
      r,
      this.customHeaders
    ), a = new ks(n, this.baseUrl);
    return new Ls(a, this.licenses);
  }
  buildClient(t, i) {
    return this.baseUrl || (this.baseUrl = t), new i(this.buildSender());
  }
  buildUsStreetApiClient() {
    return this.buildClient(Ws, Us);
  }
  buildUsZipcodeClient() {
    return this.buildClient(Zs, Is);
  }
  buildUsAutocompleteProClient() {
    return this.buildClient(
      Ks,
      Fs
    );
  }
  buildUsExtractClient() {
    return this.buildClient(Gs, zs);
  }
  buildInternationalStreetClient() {
    return this.buildClient(
      Js,
      Ms
    );
  }
  buildUsReverseGeoClient() {
    return this.buildClient(Xs, js);
  }
  buildInternationalAddressAutocompleteClient() {
    return this.buildClient(
      Ys,
      $s
    );
  }
  buildUsEnrichmentClient() {
    return this.buildClient(Qs, Vs);
  }
}
function q(e) {
  return new Oe(e);
}
function Ds(e) {
  return q(e).buildUsStreetApiClient();
}
function tr(e) {
  return q(e).buildUsAutocompleteProClient();
}
function er(e) {
  return q(e).buildUsExtractClient();
}
function ir(e) {
  return q(e).buildUsZipcodeClient();
}
function sr(e) {
  return q(e).buildInternationalStreetClient();
}
function rr(e) {
  return q(e).buildUsReverseGeoClient();
}
function nr(e) {
  return q(
    e
  ).buildInternationalAddressAutocompleteClient();
}
function ar(e) {
  return q(e).buildUsEnrichmentClient();
}
const or = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  buildInternationalAddressAutocompleteApiClient: nr,
  buildInternationalStreetApiClient: sr,
  buildUsAutocompleteProApiClient: tr,
  buildUsEnrichmentApiClient: ar,
  buildUsExtractApiClient: er,
  buildUsReverseGeoApiClient: rr,
  buildUsStreetApiClient: Ds,
  buildUsZipcodeApiClient: ir,
  instantiateClientBuilder: q
}, Symbol.toStringTag, { value: "Module" }));
let ur = class {
  /**
   * @param search The beginning of an address. This is required to be set.
   */
  constructor(t) {
    this.result = [], this.search = t, this.selected = void 0, this.maxResults = void 0, this.includeOnlyCities = [], this.includeOnlyStates = [], this.includeOnlyZIPCodes = [], this.excludeStates = [], this.preferCities = [], this.preferStates = [], this.preferZIPCodes = [], this.preferRatio = void 0, this.preferGeolocation = void 0, this.source = void 0;
  }
}, cr = class {
  /**
   * @param text The text that is to have addresses extracted out of it for verification (required)
   */
  constructor(t) {
    this.result = {
      meta: {},
      addresses: []
    }, this.text = t, this.html = void 0, this.aggressive = void 0, this.addressesHaveLineBreaks = void 0, this.addressesPerLine = void 0;
  }
};
const J = {
  countryRequired: "Country field is required.",
  freeformOrAddress1Required: "Either freeform or address1 is required.",
  insufficientInformation: "Insufficient information: One or more required fields were not set on the lookup.",
  badGeocode: "Invalid input: geocode can only be set to 'true' (default is 'false'.",
  invalidLanguage: "Invalid input: language can only be set to 'latin' or 'native'. When not set, the the output language will match the language of the input values."
};
let dr = class {
  constructor(t, i) {
    this.result = [], this.country = t, this.freeform = i, this.address1 = void 0, this.address2 = void 0, this.address3 = void 0, this.address4 = void 0, this.organization = void 0, this.locality = void 0, this.administrativeArea = void 0, this.postalCode = void 0, this.geocode = void 0, this.language = void 0, this.inputId = void 0, this.ensureEnoughInfo = this.ensureEnoughInfo.bind(this), this.ensureValidData = this.ensureValidData.bind(this);
  }
  ensureEnoughInfo() {
    if (K(this.country))
      throw new B(J.countryRequired);
    if (Q(this.freeform)) return !0;
    if (K(this.address1))
      throw new B(J.freeformOrAddress1Required);
    if (Q(this.postalCode)) return !0;
    if (K(this.locality) || K(this.administrativeArea))
      throw new B(J.insufficientInformation);
    return !0;
  }
  ensureValidData() {
    let t = () => {
      let s = (r) => this.language.toLowerCase() === r;
      return Q(this.language) && !(s("latin") || s("native"));
    };
    if (Q(this.geocode) && this.geocode.toLowerCase() !== "true")
      throw new B(J.badGeocode);
    if (t())
      throw new B(J.invalidLanguage);
    return !0;
  }
};
function K(e) {
  if (!e) return !0;
  const t = /\s/g;
  return e.replace(t, "").length < 1;
}
function Q(e) {
  return !K(e);
}
let lr = class {
  constructor(t, i, s = "") {
    this.latitude = t.toFixed(8), this.longitude = i.toFixed(8), this.source = s, this.response = new Ae();
  }
}, hr = class {
  constructor({
    search: t,
    addressId: i,
    country: s,
    maxResults: r = 5,
    includeOnlyLocality: n,
    includeOnlyPostalCode: a
  } = {}) {
    this.result = [], this.search = t, this.addressId = i, this.country = s, this.maxResults = r, this.includeOnlyLocality = n, this.includeOnlyPostalCode = a;
  }
};
class mr {
  constructor(t, i, s, r, n) {
    this.smartyKey = t, this.include = i, this.exclude = s, this.dataset = r, this.dataSubset = n, this.response = {};
  }
}
let br = class {
  constructor(t) {
    this.smartyKey = t.smarty_key, this.dataSetName = t.data_set_name, this.dataSubsetName = t.data_subset_name, this.attributes = {}, t.attributes && (this.attributes.firstFloorSqft = t.attributes["1st_floor_sqft"], this.attributes.secondFlootSqft = t.attributes["2nd_floor_sqft"], this.attributes.acres = t.attributes.acres, this.attributes.addressInfoPrivacy = t.attributes.address_info_privacy, this.attributes.airConditioner = t.attributes.air_conditioner, this.attributes.arborPergola = t.attributes.arbor_pergola, this.attributes.assessedImprovementPercent = t.attributes.assessed_improvement_percent, this.attributes.assessedImprovementValue = t.attributes.assessed_improvement_value, this.attributes.assessedLandValue = t.attributes.assessed_land_value, this.attributes.assessedValue = t.attributes.assessed_value, this.attributes.assessorLastUpdate = t.attributes.assessor_last_update, this.attributes.assessorTaxrollUpdate = t.attributes.assessor_taxroll_update, this.attributes.atticArea = t.attributes.attic_area, this.attributes.atticFlag = t.attributes.attic_flag, this.attributes.balcony = t.attributes.balcony, this.attributes.balconyArea = t.attributes.balcony_area, this.attributes.basementSqft = t.attributes.basement_sqft, this.attributes.basementSqftFinished = t.attributes.basement_sqft_finished, this.attributes.basementsqftUnfinished = t.attributes.basement_sqft_unfinished, this.attributes.bathHouse = t.attributes.bath_house, this.attributes.bathHouseSqft = t.attributes.bath_house_sqft, this.attributes.bathroomsPartial = t.attributes.bathrooms_partial, this.attributes.bathroomsTotal = t.attributes.bathrooms_total, this.attributes.bedrooms = t.attributes.bedrooms, this.attributes.block1 = t.attributes.block_1, this.attributes.block2 = t.attributes.block_2, this.attributes.boatAccess = t.attributes.boat_access, this.attributes.boatHouse = t.attributes.boat_house, this.attributes.boatHouseSqft = t.attributes.boat_house_sqft, this.attributes.boatLift = t.attributes.boat_lift, this.attributes.bonusRoom = t.attributes.bonus_room, this.attributes.breakfastNook = t.attributes.breakfast_nook, this.attributes.breezeway = t.attributes.breezeway, this.attributes.buildingDefinitionCode = t.attributes.building_definition, this.attributes.buildingSqft = t.attributes.building_sqft, this.attributes.cabin = t.attributes.cabin, this.attributes.cabinSqft = t.attributes.cabin_sqft, this.attributes.canopy = t.attributes.canopy, this.attributes.canopySqft = t.attributes.canopy_sqft, this.attributes.carport = t.attributes.carport, this.attributes.carportSqft = t.attributes.carport_sqft, this.attributes.cbsaCode = t.attributes.cbsa_code, this.attributes.cbsaName = t.attributes.cbsa_name, this.attributes.cellar = t.attributes.cellar, this.attributes.censusBlock = t.attributes.census_block, this.attributes.censusTract = t.attributes.census_tract, this.attributes.censusBlockGroup = t.attributes.census_block_group, this.attributes.censusFipsPlaceCode = t.attributes.census_fips_place_code, this.attributes.censusTract = t.attributes.census_tract, this.attributes.centralVacuum = t.attributes.central_vacuum, this.attributes.codeTitleCompany = t.attributes.code_title_company, this.attributes.combinedStatisticalArea = t.attributes.combined_statistical_area, this.attributes.communityRec = t.attributes.community_rec, this.attributes.companyFlag = t.attributes.company_flag, this.attributes.congressionalDistrict = t.attributes.congressional_district, this.attributes.constructionType = t.attributes.construction_type, this.attributes.contactCity = t.attributes.contact_city, this.attributes.contactCrrt = t.attributes.contact_crrt, this.attributes.contactFullAddress = t.attributes.contact_full_address, this.attributes.contactHouseNumber = t.attributes.contact_house_number, this.attributes.contactMailInfoFormat = t.attributes.contact_main_info_format, this.attributes.contactMailInfoPrivacy = t.attributes.contact_mail_info_privacy, this.attributes.contactMailingCounty = t.attributes.contact_mailing_county, this.attributes.contactMailingFips = t.attributes.contact_mailing_fips, this.attributes.contactPostDirection = t.attributes.contact_post_direction, this.attributes.contactPreDirection = t.attributes.contact_pre_direction, this.attributes.contactState = t.attributes.contact_state, this.attributes.contactStreetName = t.attributes.contact_street_name, this.attributes.contactSuffix = t.attributes.contact_suffix, this.attributes.contactUnitDesignator = t.attributes.contact_unit_designator, this.attributes.contactValue = t.attributes.contact_value, this.attributes.contactZip = t.attributes.contact_zip, this.attributes.contactZip4 = t.attributes.contact_zip4, this.attributes.courtyard = t.attributes.courtyard, this.attributes.courtyardArea = t.attributes.courtyard_area, this.attributes.deck = t.attributes.deck, this.attributes.deckArea = t.attributes.deck_area, this.attributes.deedDocumentPage = t.attributes.deed_document_page, this.attributes.deedDocumentBook = t.attributes.deed_document_book, this.attributes.deedDocumentNumber = t.attributes.deed_document_number, this.attributes.deedOwnerFirstName = t.attributes.deed_owner_first_name, this.attributes.deedOwnerFirstName2 = t.attributes.deed_owner_first_name2, this.attributes.deedOwnerFirstName3 = t.attributes.deed_owner_first_name3, this.attributes.deedOwnerFirstName4 = t.attributes.deed_owner_first_name4, this.attributes.deedOwnerFullName = t.attributes.deed_owner_full_name, this.attributes.deedOwnerFullName2 = t.attributes.deed_owner_full_name2, this.attributes.deedOwnerFullName3 = t.attributes.deed_owner_full_name3, this.attributes.deedOwnerFullName4 = t.attributes.deed_owner_full_name4, this.attributes.deedOwnerLastName = t.attributes.deed_owner_last_name, this.attributes.deedOwnerLastName2 = t.attributes.deed_owner_last_name2, this.attributes.deedOwnerLastName3 = t.attributes.deed_owner_last_name3, this.attributes.deedOwnerLastName4 = t.attributes.deed_owner_last_name4, this.attributes.deedOwnerMiddleName = t.attributes.deed_owner_middle_name, this.attributes.deedOwnerMiddleName2 = t.attributes.deed_owner_middle_name2, this.attributes.deedOwnerMiddleName3 = t.attributes.deed_owner_middle_name3, this.attributes.deedOwnerMiddleName4 = t.attributes.deed_owner_middle_name4, this.attributes.deedOwnerSuffix = t.attributes.deed_owner_suffix, this.attributes.deedOwnerSuffix2 = t.attributes.deed_owner_suffix2, this.attributes.deedOwnerSuffix3 = t.attributes.deed_owner_suffix3, this.attributes.deedOwnerSuffix4 = t.attributes.deed_owner_suffix4, this.attributes.deedSaleDate = t.attributes.deed_sale_date, this.attributes.deedSalePrice = t.attributes.deed_sale_price, this.attributes.deedTransactionId = t.attributes.deed_transaction_id, this.attributes.depthLinearFootage = t.attributes.depth_linear_footage, this.attributes.disabledTaxExemption = t.attributes.disabled_tax_exemption, this.attributes.drivewaySqft = t.attributes.driveway_sqft, this.attributes.drivewayType = t.attributes.driveway_type, this.attributes.effectiveYearBuilt = t.attributes.effective_year_built, this.attributes.elevationFeet = t.attributes.elevation_feet, this.attributes.elevator = t.attributes.elevator, this.attributes.equestrianArena = t.attributes.equestrian_arena, this.attributes.escalator = t.attributes.escalator, this.attributes.exerciseRoom = t.attributes.exercise_room, this.attributes.exteriorWalls = t.attributes.exterior_walls, this.attributes.familyRoom = t.attributes.family_room, this.attributes.fence = t.attributes.fence, this.attributes.fenceArea = t.attributes.fence_area, this.attributes.fipsCode = t.attributes.fips_code, this.attributes.fireResistanceCode = t.attributes.fire_resistance_code, this.attributes.fireSprinklersFlag = t.attributes.fire_sprinkler_flag, this.attributes.fireplace = t.attributes.fireplace, this.attributes.fireplaceNumber = t.attributes.fireplace_number, this.attributes.firstName = t.attributes.first_name, this.attributes.firstName2 = t.attributes.first_name2, this.attributes.firstName3 = t.attributes.first_name3, this.attributes.firstName4 = t.attributes.first_name4, this.attributes.flooring = t.attributes.flooring, this.attributes.foundation = t.attributes.foundation, this.attributes.gameRoom = t.attributes.game_room, this.attributes.garage = t.attributes.garage, this.attributes.garageSqft = t.attributes.garage_sqft, this.attributes.gazebo = t.attributes.gazebo, this.attributes.gazeboSqft = t.attributes.gazebo_sqft, this.attributes.golfCourse = t.attributes.golf_course, this.attributes.grainery = t.attributes.grainery, this.attributes.grainerySqft = t.attributes.grainery_sqft, this.attributes.greatRoom = t.attributes.great_room, this.attributes.greenhouse = t.attributes.greenhouse, this.attributes.greenhouseSqft = t.attributes.greenhouse_sqft, this.attributes.grossSqft = t.attributes.gross_sqft, this.attributes.guesthouse = t.attributes.guesthouse, this.attributes.guesthouseSqft = t.attributes.guesthouse_sqft, this.attributes.handicapAccessibility = t.attributes.handicap_accessibility, this.attributes.heat = t.attributes.heat, this.attributes.heatFuelType = t.attributes.heat_fuel_type, this.attributes.hobbyRoom = t.attributes.hobby_room, this.attributes.homeownerTaxExemption = t.attributes.homeowner_tax_exemption, this.attributes.instrumentDate = t.attributes.instrument_date, this.attributes.intercomSystem = t.attributes.intercom_system, this.attributes.interestRateType2 = t.attributes.interest_rate_type_2, this.attributes.interiorStructure = t.attributes.interior_structure, this.attributes.kennel = t.attributes.kennel, this.attributes.kennelSqft = t.attributes.kennel_sqft, this.attributes.landUseCode = t.attributes.land_use_code, this.attributes.landUseGroup = t.attributes.land_use_group, this.attributes.landUseStandard = t.attributes.land_use_standard, this.attributes.lastName = t.attributes.last_name, this.attributes.lastName2 = t.attributes.last_name_2, this.attributes.lastName3 = t.attributes.last_name_3, this.attributes.lastName4 = t.attributes.last_name_4, this.attributes.latitude = t.attributes.latitude, this.attributes.laundry = t.attributes.laundry, this.attributes.leanTo = t.attributes.lean_to, this.attributes.leanToSqft = t.attributes.lean_to_sqft, this.attributes.legalDescription = t.attributes.legal_description, this.attributes.legalUnit = t.attributes.legal_unit, this.attributes.lenderAddress = t.attributes.lender_address, this.attributes.lenderAddress2 = t.attributes.lender_address_2, this.attributes.lenderCity = t.attributes.lender_city, this.attributes.lenderCity2 = t.attributes.lender_city_2, this.attributes.lenderCode = t.attributes.lender_code, this.attributes.lenderCode2 = t.attributes.lender_code_2, this.attributes.lenderFirstName = t.attributes.lender_first_name, this.attributes.lenderFirstName2 = t.attributes.lender_first_name_2, this.attributes.lenderLastName = t.attributes.lender_last_name, this.attributes.lenderLastName2 = t.attributes.lender_last_name_2, this.attributes.lenderName = t.attributes.lender_name, this.attributes.lenderName2 = t.attributes.lender_name_2, this.attributes.lenderSellerCarryBack = t.attributes.lender_seller_carry_back, this.attributes.lenderSellerCarryBack2 = t.attributes.lender_seller_carry_back_2, this.attributes.lenderState = t.attributes.lender_state, this.attributes.lenderState2 = t.attributes.lender_state_2, this.attributes.lenderZip = t.attributes.lender_zip, this.attributes.lenderZip2 = t.attributes.lender_zip_2, this.attributes.lenderZipExtended = t.attributes.lender_zip_extended, this.attributes.lenderZipExtended2 = t.attributes.lender_zip_extended_2, this.attributes.loadingPlatform = t.attributes.loading_platform, this.attributes.loadingPlatformSqft = t.attributes.loading_platform_sqft, this.attributes.longitude = t.attributes.longitude, this.attributes.lot1 = t.attributes.lot_1, this.attributes.lot2 = t.attributes.lot_2, this.attributes.lot3 = t.attributes.lot_3, this.attributes.lotSqft = t.attributes.lot_sqft, this.attributes.marketImprovementPercent = t.attributes.market_improvement_percent, this.attributes.marketImprovementValue = t.attributes.market_improvement_value, this.attributes.marketLandValue = t.attributes.market_land_value, this.attributes.marketValueYear = t.attributes.market_value_year, this.attributes.matchType = t.attributes.match_type, this.attributes.mediaRoom = t.attributes.media_room, this.attributes.metroDivision = t.attributes.metro_division, this.attributes.middleName = t.attributes.middle_name, this.attributes.middleName2 = t.attributes.middle_name_2, this.attributes.middleName3 = t.attributes.middle_name_3, this.attributes.middleName4 = t.attributes.middle_name_4, this.attributes.milkhouse = t.attributes.milkhouse, this.attributes.milkhouseSqft = t.attributes.milkhouse_sqft, this.attributes.minorCivilDivisionCode = t.attributes.minor_civil_division_code, this.attributes.minorCivilDivisionName = t.attributes.minor_civil_division_name, this.attributes.mobileHomeHookup = t.attributes.mobile_home_hookup, this.attributes.mortgageAmount = t.attributes.mortgage_amount, this.attributes.mortgageAmount2 = t.attributes.mortgage_amount_2, this.attributes.mortgageDueDate = t.attributes.mortgage_due_date, this.attributes.mortgageDueDate2 = t.attributes.mortgage_due_date_2, this.attributes.mortgageInterestRate = t.attributes.mortgage_interest_rate, this.attributes.mortgageInterestRateType = t.attributes.mortgage_interest_rate_type, this.attributes.mortgageLenderCode = t.attributes.mortgage_lender_code, this.attributes.mortgageRate2 = t.attributes.mortgage_rate_2, this.attributes.mortgageRecordingDate = t.attributes.mortgage_recording_date, this.attributes.mortgageRecordingDate2 = t.attributes.mortgage_recording_date_2, this.attributes.mortgageTerm = t.attributes.mortgage_term, this.attributes.mortgageTerm2 = t.attributes.mortgage_term_2, this.attributes.mortgageTermType = t.attributes.mortgage_term_type, this.attributes.mortgageTermType2 = t.attributes.mortgage_term_type_2, this.attributes.mortgageType = t.attributes.mortgage_type, this.attributes.mortgageType2 = t.attributes.mortgage_type_2, this.attributes.msaCode = t.attributes.msa_code, this.attributes.msaName = t.attributes.msa_name, this.attributes.mudRoom = t.attributes.mud_room, this.attributes.multiParcelFlag = t.attributes.multi_parcel_flag, this.attributes.nameTitleCompany = t.attributes.name_title_company, this.attributes.neighborhoodCode = t.attributes.neighborhood_code, this.attributes.numberOfBuildings = t.attributes.number_of_buildings, this.attributes.office = t.attributes.office, this.attributes.officeSqft = t.attributes.office_sqft, this.attributes.otherTaxExemption = t.attributes.other_tax_exemption, this.attributes.outdoorKitchenFireplace = t.attributes.outdoor_kitchen_fireplace, this.attributes.overheadDoor = t.attributes.overhead_door, this.attributes.ownerFullName = t.attributes.owner_full_name, this.attributes.ownerFullName2 = t.attributes.owner_full_name_2, this.attributes.ownerFullName3 = t.attributes.owner_full_name_3, this.attributes.ownerFullName4 = t.attributes.owner_full_name_4, this.attributes.ownerOccupancyStatus = t.attributes.owner_occupancy_status, this.attributes.ownershipTransferDate = t.attributes.ownership_transfer_date, this.attributes.ownershipTransferDocNumber = t.attributes.ownership_transfer_doc_number, this.attributes.ownershipTransferTransactionId = t.attributes.ownership_transfer_transaction_id, this.attributes.ownershipType = t.attributes.ownership_type, this.attributes.ownershipType2 = t.attributes.ownership_type_2, this.attributes.ownershipVestingRelationCode = t.attributes.ownership_vesting_relation_code, this.attributes.parcelAccountNumber = t.attributes.parcel_account_number, this.attributes.parcelMapBook = t.attributes.parcel_map_book, this.attributes.parcelMapPage = t.attributes.parcel_map_page, this.attributes.parcelNumberAlternate = t.attributes.parcel_number_alternate, this.attributes.parcelNumberFormatted = t.attributes.parcel_number_formatted, this.attributes.parcelNumberPrevious = t.attributes.parcel_number_previous, this.attributes.parcelNumberYearAdded = t.attributes.parcel_number_year_added, this.attributes.parcelNumberYearChange = t.attributes.parcel_number_year_change, this.attributes.parcelRawNumber = t.attributes.parcel_raw_number, this.attributes.parcelShellRecord = t.attributes.parcel_shell_record, this.attributes.parkingSpaces = t.attributes.parking_spaces, this.attributes.patioArea = t.attributes.patio_area, this.attributes.phaseName = t.attributes.phase_name, this.attributes.plumbingFixturesCount = t.attributes.plumbing_fixtures_count, this.attributes.poleStruct = t.attributes.pole_struct, this.attributes.poleStructSqft = t.attributes.pole_struct_sqft, this.attributes.pond = t.attributes.pond, this.attributes.pool = t.attributes.pool, this.attributes.poolArea = t.attributes.pool_area, this.attributes.poolhouse = t.attributes.poolhouse, this.attributes.poolhouseSqft = t.attributes.poolhouse_sqft, this.attributes.porch = t.attributes.porch, this.attributes.porchArea = t.attributes.porch_area, this.attributes.poultryHouse = t.attributes.poultry_house, this.attributes.poultryHouseSqft = t.attributes.poultry_house_sqft, this.attributes.previousAssessedValue = t.attributes.previous_assessed_value, this.attributes.priorSaleAmount = t.attributes.prior_sale_amount, this.attributes.priorSaleDate = t.attributes.prior_sale_date, this.attributes.propertyAddressCarrierRouteCode = t.attributes.property_address_carrier_route_code, this.attributes.propertyAddressCity = t.attributes.property_address_city, this.attributes.propertyAddressFull = t.attributes.property_address_full, this.attributes.propertyAddressHouseNumber = t.attributes.property_address_house_number, this.attributes.propertyAddressPostDirection = t.attributes.property_address_post_direction, this.attributes.propertyAddressPreDirection = t.attributes.property_address_pre_direction, this.attributes.propertyAddressState = t.attributes.property_address_state, this.attributes.propertyAddressStreetName = t.attributes.property_address_street_name, this.attributes.propertyAddressStreetSuffix = t.attributes.property_address_street_suffix, this.attributes.propertyAddressUnitDesignator = t.attributes.property_address_unit_designator, this.attributes.propertyAddressUnitValue = t.attributes.property_address_unit_value, this.attributes.propertyAddressZip4 = t.attributes.property_address_zip_4, this.attributes.propertyAddressZipcode = t.attributes.property_address_zipcode, this.attributes.publicationDate = t.attributes.publication_date, this.attributes.quarter = t.attributes.quarter, this.attributes.quarterQuarter = t.attributes.quarter_quarter, this.attributes.quonset = t.attributes.quonset, this.attributes.quonsetSqft = t.attributes.quonset_sqft, this.attributes.range = t.attributes.range, this.attributes.recordingDate = t.attributes.recording_date, this.attributes.roofCover = t.attributes.roof_cover, this.attributes.roofFrame = t.attributes.roof_frame, this.attributes.rooms = t.attributes.rooms, this.attributes.rvParking = t.attributes.rv_parking, this.attributes.safeRoom = t.attributes.safe_room, this.attributes.saleAmount = t.attributes.sale_amount, this.attributes.saleDate = t.attributes.sale_date, this.attributes.sauna = t.attributes.sauna, this.attributes.section = t.attributes.section, this.attributes.securityAlarm = t.attributes.security_alarm, this.attributes.seniorTaxExemption = t.attributes.senior_tax_exemption, this.attributes.sewerType = t.attributes.sewer_type, this.attributes.shed = t.attributes.shed, this.attributes.shedSqft = t.attributes.shed_sqft, this.attributes.silo = t.attributes.silo, this.attributes.siloSqft = t.attributes.silo_sqft, this.attributes.sittingRoom = t.attributes.sitting_room, this.attributes.situsCounty = t.attributes.situs_county, this.attributes.situsState = t.attributes.situs_state, this.attributes.soundSystem = t.attributes.sound_system, this.attributes.sportsCourt = t.attributes.sports_court, this.attributes.sprinklers = t.attributes.sprinklers, this.attributes.stable = t.attributes.stable, this.attributes.stableSqft = t.attributes.stable_sqft, this.attributes.storageBuilding = t.attributes.storage_building, this.attributes.storageBuildingSqft = t.attributes.storage_buildling_sqft, this.attributes.storiesNumber = t.attributes.stories_number, this.attributes.stormShelter = t.attributes.storm_shelter, this.attributes.stormShutter = t.attributes.storm_shutter, this.attributes.structureStyle = t.attributes.structure_style, this.attributes.study = t.attributes.study, this.attributes.subdivision = t.attributes.subdivision, this.attributes.suffix = t.attributes.suffix, this.attributes.suffix2 = t.attributes.suffix_2, this.attributes.suffix3 = t.attributes.suffix_3, this.attributes.suffix4 = t.attributes.suffix_4, this.attributes.sunroom = t.attributes.sunroom, this.attributes.taxAssessYear = t.attributes.tax_assess_year, this.attributes.taxBilledAmount = t.attributes.tax_billed_amount, this.attributes.taxDelinquentYear = t.attributes.tax_delinquent_year, this.attributes.taxFiscalYear = t.attributes.tax_fiscal_year, this.attributes.taxJurisdiction = t.attributes.tax_jurisdiction, this.attributes.taxRateArea = t.attributes.tax_rate_area, this.attributes.tennisCourt = t.attributes.tennis_court, this.attributes.topographyCode = t.attributes.topography_code, this.attributes.totalMarketValue = t.attributes.total_market_value, this.attributes.township = t.attributes.township, this.attributes.tractNumber = t.attributes.tract_number, this.attributes.transferAmount = t.attributes.transfer_amount, this.attributes.trustDescription = t.attributes.trust_description, this.attributes.unitCount = t.attributes.unit_count, this.attributes.upperFloorsSqft = t.attributes.upper_floors_sqft, this.attributes.utility = t.attributes.utility, this.attributes.utilityBuilding = t.attributes.utility_building, this.attributes.utilityBuildingSqft = t.attributes.utility_building_sqft, this.attributes.utilitySqft = t.attributes.utility_sqft, this.attributes.veteranTaxExemption = t.attributes.veteran_tax_exemption, this.attributes.viewDescription = t.attributes.view_description, this.attributes.waterFeature = t.attributes.water_feature, this.attributes.waterServiceType = t.attributes.water_service_type, this.attributes.wetBar = t.attributes.wet_bar, this.attributes.widowTaxExemption = t.attributes.widow_tax_exemption, this.attributes.widthLinearFootage = t.attributes.width_linear_footage, this.attributes.wineCellar = t.attributes.wine_cellar, this.attributes.yearBuilt = t.attributes.year_built, this.attributes.zoning = t.attributes.zoning);
  }
};
const fr = {
  Batch: G,
  ClientBuilder: Oe,
  buildClient: or,
  SharedCredentials: Et,
  StaticCredentials: ge,
  Errors: qe
}, _r = {
  Lookup: we,
  Candidate: Tt
}, yr = {
  Lookup: xe,
  Result: Re
}, pr = {
  Lookup: ur,
  Suggestion: Ee
}, gr = {
  Lookup: cr,
  Result: Te
}, wr = {
  Lookup: dr,
  Candidate: Ce
}, Sr = {
  Lookup: lr
}, xr = {
  Lookup: hr,
  Suggestion: Pe
}, Rr = {
  Lookup: mr,
  Response: br
}, Jr = {
  core: fr,
  usStreet: _r,
  usZipcode: yr,
  usAutocompletePro: pr,
  usExtract: gr,
  internationalStreet: wr,
  usReverseGeo: Sr,
  internationalAddressAutocomplete: xr,
  usEnrichment: Rr
};
export {
  fr as core,
  Jr as default,
  xr as internationalAddressAutocomplete,
  wr as internationalStreet,
  pr as usAutocompletePro,
  Rr as usEnrichment,
  gr as usExtract,
  Sr as usReverseGeo,
  _r as usStreet,
  yr as usZipcode
};
//# sourceMappingURL=index.es.js.map
