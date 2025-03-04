'use strict'

Object.defineProperty(exports, '__esModule', { value: true })

function _interopDefault(ex) {
  return ex && typeof ex === 'object' && 'default' in ex ? ex['default'] : ex
}

var invariant = _interopDefault(require('tiny-invariant'))
var hash = require('@ethersproject/hash')
var bignumber = require('@ethersproject/bignumber')
var contracts = require('@ethersproject/contracts')

var PERMIT2_ADDRESS = '0x091826D697Eba3a84847669290Fe37acf333D14D'
var MaxUint48 = /*#__PURE__*/ bignumber.BigNumber.from('0xffffffffffff')
var MaxUint160 = /*#__PURE__*/ bignumber.BigNumber.from('0xffffffffffffffffffffffffffffffffffffffff')
var MaxUint256 = /*#__PURE__*/ bignumber.BigNumber.from(
  '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
)
// alias max types for their usages
// allowance transfer types
var MaxAllowanceTransferAmount = MaxUint160
var MaxAllowanceExpiration = MaxUint48
var MaxOrderedNonce = MaxUint48
// signature transfer types
var MaxSignatureTransferAmount = MaxUint256
var MaxUnorderedNonce = MaxUint256
var MaxSigDeadline = MaxUint256
var InstantExpiration = /*#__PURE__*/ bignumber.BigNumber.from(0)

var PERMIT2_DOMAIN_NAME = 'Permit2'
function permit2Domain(permit2Address, chainId) {
  return {
    name: PERMIT2_DOMAIN_NAME,
    chainId: chainId,
    verifyingContract: permit2Address,
  }
}

var PERMIT_DETAILS = [
  {
    name: 'token',
    type: 'address',
  },
  {
    name: 'amount',
    type: 'uint160',
  },
  {
    name: 'expiration',
    type: 'uint48',
  },
  {
    name: 'nonce',
    type: 'uint48',
  },
]
var PERMIT_TYPES = {
  PermitSingle: [
    {
      name: 'details',
      type: 'PermitDetails',
    },
    {
      name: 'spender',
      type: 'address',
    },
    {
      name: 'sigDeadline',
      type: 'uint256',
    },
  ],
  PermitDetails: PERMIT_DETAILS,
}
var PERMIT_BATCH_TYPES = {
  PermitBatch: [
    {
      name: 'details',
      type: 'PermitDetails[]',
    },
    {
      name: 'spender',
      type: 'address',
    },
    {
      name: 'sigDeadline',
      type: 'uint256',
    },
  ],
  PermitDetails: PERMIT_DETAILS,
}
function isPermit(permit) {
  return !Array.isArray(permit.details)
}
var AllowanceTransfer = /*#__PURE__*/ (function () {
  /**
   * Cannot be constructed.
   */
  function AllowanceTransfer() {}
  // return the data to be sent in a eth_signTypedData RPC call
  // for signing the given permit data
  AllowanceTransfer.getPermitData = function getPermitData(permit, permit2Address, chainId) {
    !MaxSigDeadline.gte(permit.sigDeadline) ? invariant(false, 'SIG_DEADLINE_OUT_OF_RANGE') : void 0
    var domain = permit2Domain(permit2Address, chainId)
    if (isPermit(permit)) {
      validatePermitDetails(permit.details)
      return {
        domain: domain,
        types: PERMIT_TYPES,
        values: permit,
      }
    } else {
      permit.details.forEach(validatePermitDetails)
      return {
        domain: domain,
        types: PERMIT_BATCH_TYPES,
        values: permit,
      }
    }
  }
  AllowanceTransfer.hash = function hash$1(permit, permit2Address, chainId) {
    var _AllowanceTransfer$ge = AllowanceTransfer.getPermitData(permit, permit2Address, chainId),
      domain = _AllowanceTransfer$ge.domain,
      types = _AllowanceTransfer$ge.types,
      values = _AllowanceTransfer$ge.values
    return hash._TypedDataEncoder.hash(domain, types, values)
  }
  return AllowanceTransfer
})()
function validatePermitDetails(details) {
  !MaxOrderedNonce.gte(details.nonce) ? invariant(false, 'NONCE_OUT_OF_RANGE') : void 0
  !MaxAllowanceTransferAmount.gte(details.amount) ? invariant(false, 'AMOUNT_OUT_OF_RANGE') : void 0
  !MaxAllowanceExpiration.gte(details.expiration) ? invariant(false, 'EXPIRATION_OUT_OF_RANGE') : void 0
}

function _regeneratorRuntime() {
  _regeneratorRuntime = function () {
    return exports
  }
  var exports = {},
    Op = Object.prototype,
    hasOwn = Op.hasOwnProperty,
    $Symbol = 'function' == typeof Symbol ? Symbol : {},
    iteratorSymbol = $Symbol.iterator || '@@iterator',
    asyncIteratorSymbol = $Symbol.asyncIterator || '@@asyncIterator',
    toStringTagSymbol = $Symbol.toStringTag || '@@toStringTag'
  function define(obj, key, value) {
    return (
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: !0,
        configurable: !0,
        writable: !0,
      }),
      obj[key]
    )
  }
  try {
    define({}, '')
  } catch (err) {
    define = function (obj, key, value) {
      return (obj[key] = value)
    }
  }
  function wrap(innerFn, outerFn, self, tryLocsList) {
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator,
      generator = Object.create(protoGenerator.prototype),
      context = new Context(tryLocsList || [])
    return (
      (generator._invoke = (function (innerFn, self, context) {
        var state = 'suspendedStart'
        return function (method, arg) {
          if ('executing' === state) throw new Error('Generator is already running')
          if ('completed' === state) {
            if ('throw' === method) throw arg
            return doneResult()
          }
          for (context.method = method, context.arg = arg; ; ) {
            var delegate = context.delegate
            if (delegate) {
              var delegateResult = maybeInvokeDelegate(delegate, context)
              if (delegateResult) {
                if (delegateResult === ContinueSentinel) continue
                return delegateResult
              }
            }
            if ('next' === context.method) context.sent = context._sent = context.arg
            else if ('throw' === context.method) {
              if ('suspendedStart' === state) throw ((state = 'completed'), context.arg)
              context.dispatchException(context.arg)
            } else 'return' === context.method && context.abrupt('return', context.arg)
            state = 'executing'
            var record = tryCatch(innerFn, self, context)
            if ('normal' === record.type) {
              if (((state = context.done ? 'completed' : 'suspendedYield'), record.arg === ContinueSentinel)) continue
              return {
                value: record.arg,
                done: context.done,
              }
            }
            'throw' === record.type && ((state = 'completed'), (context.method = 'throw'), (context.arg = record.arg))
          }
        }
      })(innerFn, self, context)),
      generator
    )
  }
  function tryCatch(fn, obj, arg) {
    try {
      return {
        type: 'normal',
        arg: fn.call(obj, arg),
      }
    } catch (err) {
      return {
        type: 'throw',
        arg: err,
      }
    }
  }
  exports.wrap = wrap
  var ContinueSentinel = {}
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  var IteratorPrototype = {}
  define(IteratorPrototype, iteratorSymbol, function () {
    return this
  })
  var getProto = Object.getPrototypeOf,
    NativeIteratorPrototype = getProto && getProto(getProto(values([])))
  NativeIteratorPrototype &&
    NativeIteratorPrototype !== Op &&
    hasOwn.call(NativeIteratorPrototype, iteratorSymbol) &&
    (IteratorPrototype = NativeIteratorPrototype)
  var Gp = (GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype))
  function defineIteratorMethods(prototype) {
    ;['next', 'throw', 'return'].forEach(function (method) {
      define(prototype, method, function (arg) {
        return this._invoke(method, arg)
      })
    })
  }
  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg)
      if ('throw' !== record.type) {
        var result = record.arg,
          value = result.value
        return value && 'object' == typeof value && hasOwn.call(value, '__await')
          ? PromiseImpl.resolve(value.__await).then(
              function (value) {
                invoke('next', value, resolve, reject)
              },
              function (err) {
                invoke('throw', err, resolve, reject)
              }
            )
          : PromiseImpl.resolve(value).then(
              function (unwrapped) {
                ;(result.value = unwrapped), resolve(result)
              },
              function (error) {
                return invoke('throw', error, resolve, reject)
              }
            )
      }
      reject(record.arg)
    }
    var previousPromise
    this._invoke = function (method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function (resolve, reject) {
          invoke(method, arg, resolve, reject)
        })
      }
      return (previousPromise = previousPromise
        ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg)
        : callInvokeWithMethodAndArg())
    }
  }
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method]
    if (undefined === method) {
      if (((context.delegate = null), 'throw' === context.method)) {
        if (
          delegate.iterator.return &&
          ((context.method = 'return'),
          (context.arg = undefined),
          maybeInvokeDelegate(delegate, context),
          'throw' === context.method)
        )
          return ContinueSentinel
        ;(context.method = 'throw'), (context.arg = new TypeError("The iterator does not provide a 'throw' method"))
      }
      return ContinueSentinel
    }
    var record = tryCatch(method, delegate.iterator, context.arg)
    if ('throw' === record.type)
      return (context.method = 'throw'), (context.arg = record.arg), (context.delegate = null), ContinueSentinel
    var info = record.arg
    return info
      ? info.done
        ? ((context[delegate.resultName] = info.value),
          (context.next = delegate.nextLoc),
          'return' !== context.method && ((context.method = 'next'), (context.arg = undefined)),
          (context.delegate = null),
          ContinueSentinel)
        : info
      : ((context.method = 'throw'),
        (context.arg = new TypeError('iterator result is not an object')),
        (context.delegate = null),
        ContinueSentinel)
  }
  function pushTryEntry(locs) {
    var entry = {
      tryLoc: locs[0],
    }
    1 in locs && (entry.catchLoc = locs[1]),
      2 in locs && ((entry.finallyLoc = locs[2]), (entry.afterLoc = locs[3])),
      this.tryEntries.push(entry)
  }
  function resetTryEntry(entry) {
    var record = entry.completion || {}
    ;(record.type = 'normal'), delete record.arg, (entry.completion = record)
  }
  function Context(tryLocsList) {
    ;(this.tryEntries = [
      {
        tryLoc: 'root',
      },
    ]),
      tryLocsList.forEach(pushTryEntry, this),
      this.reset(!0)
  }
  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol]
      if (iteratorMethod) return iteratorMethod.call(iterable)
      if ('function' == typeof iterable.next) return iterable
      if (!isNaN(iterable.length)) {
        var i = -1,
          next = function next() {
            for (; ++i < iterable.length; )
              if (hasOwn.call(iterable, i)) return (next.value = iterable[i]), (next.done = !1), next
            return (next.value = undefined), (next.done = !0), next
          }
        return (next.next = next)
      }
    }
    return {
      next: doneResult,
    }
  }
  function doneResult() {
    return {
      value: undefined,
      done: !0,
    }
  }
  return (
    (GeneratorFunction.prototype = GeneratorFunctionPrototype),
    define(Gp, 'constructor', GeneratorFunctionPrototype),
    define(GeneratorFunctionPrototype, 'constructor', GeneratorFunction),
    (GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, 'GeneratorFunction')),
    (exports.isGeneratorFunction = function (genFun) {
      var ctor = 'function' == typeof genFun && genFun.constructor
      return !!ctor && (ctor === GeneratorFunction || 'GeneratorFunction' === (ctor.displayName || ctor.name))
    }),
    (exports.mark = function (genFun) {
      return (
        Object.setPrototypeOf
          ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype)
          : ((genFun.__proto__ = GeneratorFunctionPrototype), define(genFun, toStringTagSymbol, 'GeneratorFunction')),
        (genFun.prototype = Object.create(Gp)),
        genFun
      )
    }),
    (exports.awrap = function (arg) {
      return {
        __await: arg,
      }
    }),
    defineIteratorMethods(AsyncIterator.prototype),
    define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
      return this
    }),
    (exports.AsyncIterator = AsyncIterator),
    (exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
      void 0 === PromiseImpl && (PromiseImpl = Promise)
      var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl)
      return exports.isGeneratorFunction(outerFn)
        ? iter
        : iter.next().then(function (result) {
            return result.done ? result.value : iter.next()
          })
    }),
    defineIteratorMethods(Gp),
    define(Gp, toStringTagSymbol, 'Generator'),
    define(Gp, iteratorSymbol, function () {
      return this
    }),
    define(Gp, 'toString', function () {
      return '[object Generator]'
    }),
    (exports.keys = function (object) {
      var keys = []
      for (var key in object) keys.push(key)
      return (
        keys.reverse(),
        function next() {
          for (; keys.length; ) {
            var key = keys.pop()
            if (key in object) return (next.value = key), (next.done = !1), next
          }
          return (next.done = !0), next
        }
      )
    }),
    (exports.values = values),
    (Context.prototype = {
      constructor: Context,
      reset: function (skipTempReset) {
        if (
          ((this.prev = 0),
          (this.next = 0),
          (this.sent = this._sent = undefined),
          (this.done = !1),
          (this.delegate = null),
          (this.method = 'next'),
          (this.arg = undefined),
          this.tryEntries.forEach(resetTryEntry),
          !skipTempReset)
        )
          for (var name in this)
            't' === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined)
      },
      stop: function () {
        this.done = !0
        var rootRecord = this.tryEntries[0].completion
        if ('throw' === rootRecord.type) throw rootRecord.arg
        return this.rval
      },
      dispatchException: function (exception) {
        if (this.done) throw exception
        var context = this
        function handle(loc, caught) {
          return (
            (record.type = 'throw'),
            (record.arg = exception),
            (context.next = loc),
            caught && ((context.method = 'next'), (context.arg = undefined)),
            !!caught
          )
        }
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i],
            record = entry.completion
          if ('root' === entry.tryLoc) return handle('end')
          if (entry.tryLoc <= this.prev) {
            var hasCatch = hasOwn.call(entry, 'catchLoc'),
              hasFinally = hasOwn.call(entry, 'finallyLoc')
            if (hasCatch && hasFinally) {
              if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0)
              if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc)
            } else if (hasCatch) {
              if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0)
            } else {
              if (!hasFinally) throw new Error('try statement without catch or finally')
              if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc)
            }
          }
        }
      },
      abrupt: function (type, arg) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i]
          if (entry.tryLoc <= this.prev && hasOwn.call(entry, 'finallyLoc') && this.prev < entry.finallyLoc) {
            var finallyEntry = entry
            break
          }
        }
        finallyEntry &&
          ('break' === type || 'continue' === type) &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc &&
          (finallyEntry = null)
        var record = finallyEntry ? finallyEntry.completion : {}
        return (
          (record.type = type),
          (record.arg = arg),
          finallyEntry
            ? ((this.method = 'next'), (this.next = finallyEntry.finallyLoc), ContinueSentinel)
            : this.complete(record)
        )
      },
      complete: function (record, afterLoc) {
        if ('throw' === record.type) throw record.arg
        return (
          'break' === record.type || 'continue' === record.type
            ? (this.next = record.arg)
            : 'return' === record.type
            ? ((this.rval = this.arg = record.arg), (this.method = 'return'), (this.next = 'end'))
            : 'normal' === record.type && afterLoc && (this.next = afterLoc),
          ContinueSentinel
        )
      },
      finish: function (finallyLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i]
          if (entry.finallyLoc === finallyLoc)
            return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel
        }
      },
      catch: function (tryLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i]
          if (entry.tryLoc === tryLoc) {
            var record = entry.completion
            if ('throw' === record.type) {
              var thrown = record.arg
              resetTryEntry(entry)
            }
            return thrown
          }
        }
        throw new Error('illegal catch attempt')
      },
      delegateYield: function (iterable, resultName, nextLoc) {
        return (
          (this.delegate = {
            iterator: values(iterable),
            resultName: resultName,
            nextLoc: nextLoc,
          }),
          'next' === this.method && (this.arg = undefined),
          ContinueSentinel
        )
      },
    }),
    exports
  )
}
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg)
    var value = info.value
  } catch (error) {
    reject(error)
    return
  }
  if (info.done) {
    resolve(value)
  } else {
    Promise.resolve(value).then(_next, _throw)
  }
}
function _asyncToGenerator(fn) {
  return function () {
    var self = this,
      args = arguments
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args)
      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, 'next', value)
      }
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, 'throw', err)
      }
      _next(undefined)
    })
  }
}
function _extends() {
  _extends = Object.assign
    ? Object.assign.bind()
    : function (target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i]
          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key]
            }
          }
        }
        return target
      }
  return _extends.apply(this, arguments)
}

var TOKEN_PERMISSIONS = [
  {
    name: 'token',
    type: 'address',
  },
  {
    name: 'amount',
    type: 'uint256',
  },
]
var PERMIT_TRANSFER_FROM_TYPES = {
  PermitTransferFrom: [
    {
      name: 'permitted',
      type: 'TokenPermissions',
    },
    {
      name: 'spender',
      type: 'address',
    },
    {
      name: 'nonce',
      type: 'uint256',
    },
    {
      name: 'deadline',
      type: 'uint256',
    },
  ],
  TokenPermissions: TOKEN_PERMISSIONS,
}
var PERMIT_BATCH_TRANSFER_FROM_TYPES = {
  PermitBatchTransferFrom: [
    {
      name: 'permitted',
      type: 'TokenPermissions[]',
    },
    {
      name: 'spender',
      type: 'address',
    },
    {
      name: 'nonce',
      type: 'uint256',
    },
    {
      name: 'deadline',
      type: 'uint256',
    },
  ],
  TokenPermissions: TOKEN_PERMISSIONS,
}
function permitTransferFromWithWitnessType(witness) {
  return _extends(
    {
      PermitWitnessTransferFrom: [
        {
          name: 'permitted',
          type: 'TokenPermissions',
        },
        {
          name: 'spender',
          type: 'address',
        },
        {
          name: 'nonce',
          type: 'uint256',
        },
        {
          name: 'deadline',
          type: 'uint256',
        },
        {
          name: 'witness',
          type: witness.witnessTypeName,
        },
      ],
      TokenPermissions: TOKEN_PERMISSIONS,
    },
    witness.witnessType
  )
}
function permitBatchTransferFromWithWitnessType(witness) {
  return _extends(
    {
      PermitBatchWitnessTransferFrom: [
        {
          name: 'permitted',
          type: 'TokenPermissions[]',
        },
        {
          name: 'spender',
          type: 'address',
        },
        {
          name: 'nonce',
          type: 'uint256',
        },
        {
          name: 'deadline',
          type: 'uint256',
        },
        {
          name: 'witness',
          type: witness.witnessTypeName,
        },
      ],
      TokenPermissions: TOKEN_PERMISSIONS,
    },
    witness.witnessType
  )
}
function isPermitTransferFrom(permit) {
  return !Array.isArray(permit.permitted)
}
var SignatureTransfer = /*#__PURE__*/ (function () {
  /**
   * Cannot be constructed.
   */
  function SignatureTransfer() {}
  // return the data to be sent in a eth_signTypedData RPC call
  // for signing the given permit data
  SignatureTransfer.getPermitData = function getPermitData(permit, permit2Address, chainId, witness) {
    !MaxSigDeadline.gte(permit.deadline) ? invariant(false, 'SIG_DEADLINE_OUT_OF_RANGE') : void 0
    !MaxUnorderedNonce.gte(permit.nonce) ? invariant(false, 'NONCE_OUT_OF_RANGE') : void 0
    var domain = permit2Domain(permit2Address, chainId)
    if (isPermitTransferFrom(permit)) {
      validateTokenPermissions(permit.permitted)
      var types = witness ? permitTransferFromWithWitnessType(witness) : PERMIT_TRANSFER_FROM_TYPES
      var values = witness
        ? Object.assign(permit, {
            witness: witness.witness,
          })
        : permit
      return {
        domain: domain,
        types: types,
        values: values,
      }
    } else {
      permit.permitted.forEach(validateTokenPermissions)
      var _types = witness ? permitBatchTransferFromWithWitnessType(witness) : PERMIT_BATCH_TRANSFER_FROM_TYPES
      var _values = witness
        ? Object.assign(permit, {
            witness: witness.witness,
          })
        : permit
      return {
        domain: domain,
        types: _types,
        values: _values,
      }
    }
  }
  SignatureTransfer.hash = function hash$1(permit, permit2Address, chainId, witness) {
    var _SignatureTransfer$ge = SignatureTransfer.getPermitData(permit, permit2Address, chainId, witness),
      domain = _SignatureTransfer$ge.domain,
      types = _SignatureTransfer$ge.types,
      values = _SignatureTransfer$ge.values
    return hash._TypedDataEncoder.hash(domain, types, values)
  }
  return SignatureTransfer
})()
function validateTokenPermissions(permissions) {
  !MaxSignatureTransferAmount.gte(permissions.amount) ? invariant(false, 'AMOUNT_OUT_OF_RANGE') : void 0
}

var Permit2Abi = [
  {
    inputs: [],
    name: 'AllowanceExpired',
    type: 'error',
  },
  {
    inputs: [],
    name: 'ExcessiveInvalidation',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InsufficientAllowance',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidAmount',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidContractSignature',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidNonce',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidSignature',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidSigner',
    type: 'error',
  },
  {
    inputs: [],
    name: 'LengthMismatch',
    type: 'error',
  },
  {
    inputs: [],
    name: 'NotSpender',
    type: 'error',
  },
  {
    inputs: [],
    name: 'SignatureExpired',
    type: 'error',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'token',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'spender',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint160',
        name: 'amount',
        type: 'uint160',
      },
      {
        indexed: false,
        internalType: 'uint48',
        name: 'expiration',
        type: 'uint48',
      },
    ],
    name: 'Approval',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'token',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'spender',
        type: 'address',
      },
    ],
    name: 'Lockdown',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'token',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'spender',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint48',
        name: 'newNonce',
        type: 'uint48',
      },
      {
        indexed: false,
        internalType: 'uint48',
        name: 'oldNonce',
        type: 'uint48',
      },
    ],
    name: 'NonceInvalidation',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'word',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'mask',
        type: 'uint256',
      },
    ],
    name: 'UnorderedNonceInvalidation',
    type: 'event',
  },
  {
    inputs: [],
    name: 'DOMAIN_SEPARATOR',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'allowance',
    outputs: [
      {
        internalType: 'uint160',
        name: 'amount',
        type: 'uint160',
      },
      {
        internalType: 'uint48',
        name: 'expiration',
        type: 'uint48',
      },
      {
        internalType: 'uint48',
        name: 'nonce',
        type: 'uint48',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'token',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'spender',
        type: 'address',
      },
      {
        internalType: 'uint160',
        name: 'amount',
        type: 'uint160',
      },
      {
        internalType: 'uint48',
        name: 'expiration',
        type: 'uint48',
      },
    ],
    name: 'approve',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'token',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'spender',
        type: 'address',
      },
      {
        internalType: 'uint48',
        name: 'newNonce',
        type: 'uint48',
      },
    ],
    name: 'invalidateNonces',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'wordPos',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'mask',
        type: 'uint256',
      },
    ],
    name: 'invalidateUnorderedNonces',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'token',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'spender',
            type: 'address',
          },
        ],
        internalType: 'struct IAllowanceTransfer.TokenSpenderPair[]',
        name: 'approvals',
        type: 'tuple[]',
      },
    ],
    name: 'lockdown',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'nonceBitmap',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        components: [
          {
            components: [
              {
                internalType: 'address',
                name: 'token',
                type: 'address',
              },
              {
                internalType: 'uint160',
                name: 'amount',
                type: 'uint160',
              },
              {
                internalType: 'uint48',
                name: 'expiration',
                type: 'uint48',
              },
              {
                internalType: 'uint48',
                name: 'nonce',
                type: 'uint48',
              },
            ],
            internalType: 'struct IAllowanceTransfer.PermitDetails[]',
            name: 'details',
            type: 'tuple[]',
          },
          {
            internalType: 'address',
            name: 'spender',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'sigDeadline',
            type: 'uint256',
          },
        ],
        internalType: 'struct IAllowanceTransfer.PermitBatch',
        name: 'permitBatch',
        type: 'tuple',
      },
      {
        internalType: 'bytes',
        name: 'signature',
        type: 'bytes',
      },
    ],
    name: 'permit',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        components: [
          {
            components: [
              {
                internalType: 'address',
                name: 'token',
                type: 'address',
              },
              {
                internalType: 'uint160',
                name: 'amount',
                type: 'uint160',
              },
              {
                internalType: 'uint48',
                name: 'expiration',
                type: 'uint48',
              },
              {
                internalType: 'uint48',
                name: 'nonce',
                type: 'uint48',
              },
            ],
            internalType: 'struct IAllowanceTransfer.PermitDetails',
            name: 'details',
            type: 'tuple',
          },
          {
            internalType: 'address',
            name: 'spender',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'sigDeadline',
            type: 'uint256',
          },
        ],
        internalType: 'struct IAllowanceTransfer.PermitSingle',
        name: 'permitSingle',
        type: 'tuple',
      },
      {
        internalType: 'bytes',
        name: 'signature',
        type: 'bytes',
      },
    ],
    name: 'permit',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            components: [
              {
                internalType: 'address',
                name: 'token',
                type: 'address',
              },
              {
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
              },
            ],
            internalType: 'struct ISignatureTransfer.TokenPermissions[]',
            name: 'permitted',
            type: 'tuple[]',
          },
          {
            internalType: 'uint256',
            name: 'nonce',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'deadline',
            type: 'uint256',
          },
        ],
        internalType: 'struct ISignatureTransfer.PermitBatchTransferFrom',
        name: 'permit',
        type: 'tuple',
      },
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        components: [
          {
            internalType: 'address',
            name: 'to',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'requestedAmount',
            type: 'uint256',
          },
        ],
        internalType: 'struct ISignatureTransfer.SignatureTransferDetails[]',
        name: 'transferDetails',
        type: 'tuple[]',
      },
      {
        internalType: 'bytes',
        name: 'signature',
        type: 'bytes',
      },
    ],
    name: 'permitTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            components: [
              {
                internalType: 'address',
                name: 'token',
                type: 'address',
              },
              {
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
              },
            ],
            internalType: 'struct ISignatureTransfer.TokenPermissions',
            name: 'permitted',
            type: 'tuple',
          },
          {
            internalType: 'uint256',
            name: 'nonce',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'deadline',
            type: 'uint256',
          },
        ],
        internalType: 'struct ISignatureTransfer.PermitTransferFrom',
        name: 'permit',
        type: 'tuple',
      },
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'requestedAmount',
        type: 'uint256',
      },
      {
        internalType: 'bytes',
        name: 'signature',
        type: 'bytes',
      },
    ],
    name: 'permitTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            components: [
              {
                internalType: 'address',
                name: 'token',
                type: 'address',
              },
              {
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
              },
            ],
            internalType: 'struct ISignatureTransfer.TokenPermissions',
            name: 'permitted',
            type: 'tuple',
          },
          {
            internalType: 'uint256',
            name: 'nonce',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'deadline',
            type: 'uint256',
          },
        ],
        internalType: 'struct ISignatureTransfer.PermitTransferFrom',
        name: 'permit',
        type: 'tuple',
      },
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'requestedAmount',
        type: 'uint256',
      },
      {
        internalType: 'bytes32',
        name: 'witness',
        type: 'bytes32',
      },
      {
        internalType: 'string',
        name: 'witnessTypeName',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'witnessType',
        type: 'string',
      },
      {
        internalType: 'bytes',
        name: 'signature',
        type: 'bytes',
      },
    ],
    name: 'permitWitnessTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            components: [
              {
                internalType: 'address',
                name: 'token',
                type: 'address',
              },
              {
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
              },
            ],
            internalType: 'struct ISignatureTransfer.TokenPermissions[]',
            name: 'permitted',
            type: 'tuple[]',
          },
          {
            internalType: 'uint256',
            name: 'nonce',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'deadline',
            type: 'uint256',
          },
        ],
        internalType: 'struct ISignatureTransfer.PermitBatchTransferFrom',
        name: 'permit',
        type: 'tuple',
      },
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        components: [
          {
            internalType: 'address',
            name: 'to',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'requestedAmount',
            type: 'uint256',
          },
        ],
        internalType: 'struct ISignatureTransfer.SignatureTransferDetails[]',
        name: 'transferDetails',
        type: 'tuple[]',
      },
      {
        internalType: 'bytes32',
        name: 'witness',
        type: 'bytes32',
      },
      {
        internalType: 'string',
        name: 'witnessTypeName',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'witnessType',
        type: 'string',
      },
      {
        internalType: 'bytes',
        name: 'signature',
        type: 'bytes',
      },
    ],
    name: 'permitWitnessTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'token',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'uint160',
        name: 'amount',
        type: 'uint160',
      },
    ],
    name: 'transferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        components: [
          {
            internalType: 'address',
            name: 'token',
            type: 'address',
          },
          {
            internalType: 'uint160',
            name: 'amount',
            type: 'uint160',
          },
          {
            internalType: 'address',
            name: 'to',
            type: 'address',
          },
        ],
        internalType: 'struct IAllowanceTransfer.AllowanceTransferDetails[]',
        name: 'transferDetails',
        type: 'tuple[]',
      },
    ],
    name: 'transferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
]

var AllowanceProvider = /*#__PURE__*/ (function () {
  function AllowanceProvider(provider, permit2Address) {
    this.provider = provider
    this.permit2Address = permit2Address
    this.permit2 = new contracts.Contract(this.permit2Address, Permit2Abi, this.provider)
  }
  var _proto = AllowanceProvider.prototype
  _proto.getAllowanceData = /*#__PURE__*/ (function () {
    var _getAllowanceData = /*#__PURE__*/ _asyncToGenerator(
      /*#__PURE__*/ _regeneratorRuntime().mark(function _callee(token, owner, spender) {
        return _regeneratorRuntime().wrap(
          function _callee$(_context) {
            while (1) {
              switch ((_context.prev = _context.next)) {
                case 0:
                  _context.next = 2
                  return this.permit2.allowance(owner, token, spender)
                case 2:
                  return _context.abrupt('return', _context.sent)
                case 3:
                case 'end':
                  return _context.stop()
              }
            }
          },
          _callee,
          this
        )
      })
    )
    function getAllowanceData(_x, _x2, _x3) {
      return _getAllowanceData.apply(this, arguments)
    }
    return getAllowanceData
  })()
  _proto.getAllowance = /*#__PURE__*/ (function () {
    var _getAllowance = /*#__PURE__*/ _asyncToGenerator(
      /*#__PURE__*/ _regeneratorRuntime().mark(function _callee2(token, owner, spender) {
        return _regeneratorRuntime().wrap(
          function _callee2$(_context2) {
            while (1) {
              switch ((_context2.prev = _context2.next)) {
                case 0:
                  _context2.next = 2
                  return this.getAllowanceData(token, owner, spender)
                case 2:
                  return _context2.abrupt('return', _context2.sent.amount)
                case 3:
                case 'end':
                  return _context2.stop()
              }
            }
          },
          _callee2,
          this
        )
      })
    )
    function getAllowance(_x4, _x5, _x6) {
      return _getAllowance.apply(this, arguments)
    }
    return getAllowance
  })()
  _proto.getNonce = /*#__PURE__*/ (function () {
    var _getNonce = /*#__PURE__*/ _asyncToGenerator(
      /*#__PURE__*/ _regeneratorRuntime().mark(function _callee3(token, owner, spender) {
        return _regeneratorRuntime().wrap(
          function _callee3$(_context3) {
            while (1) {
              switch ((_context3.prev = _context3.next)) {
                case 0:
                  _context3.next = 2
                  return this.getAllowanceData(token, owner, spender)
                case 2:
                  return _context3.abrupt('return', _context3.sent.nonce)
                case 3:
                case 'end':
                  return _context3.stop()
              }
            }
          },
          _callee3,
          this
        )
      })
    )
    function getNonce(_x7, _x8, _x9) {
      return _getNonce.apply(this, arguments)
    }
    return getNonce
  })()
  _proto.getExpiration = /*#__PURE__*/ (function () {
    var _getExpiration = /*#__PURE__*/ _asyncToGenerator(
      /*#__PURE__*/ _regeneratorRuntime().mark(function _callee4(token, owner, spender) {
        return _regeneratorRuntime().wrap(
          function _callee4$(_context4) {
            while (1) {
              switch ((_context4.prev = _context4.next)) {
                case 0:
                  _context4.next = 2
                  return this.getAllowanceData(token, owner, spender)
                case 2:
                  return _context4.abrupt('return', _context4.sent.expiration)
                case 3:
                case 'end':
                  return _context4.stop()
              }
            }
          },
          _callee4,
          this
        )
      })
    )
    function getExpiration(_x10, _x11, _x12) {
      return _getExpiration.apply(this, arguments)
    }
    return getExpiration
  })()
  return AllowanceProvider
})()

exports.AllowanceProvider = AllowanceProvider
exports.AllowanceTransfer = AllowanceTransfer
exports.InstantExpiration = InstantExpiration
exports.MaxAllowanceExpiration = MaxAllowanceExpiration
exports.MaxAllowanceTransferAmount = MaxAllowanceTransferAmount
exports.MaxOrderedNonce = MaxOrderedNonce
exports.MaxSigDeadline = MaxSigDeadline
exports.MaxSignatureTransferAmount = MaxSignatureTransferAmount
exports.MaxUint160 = MaxUint160
exports.MaxUint256 = MaxUint256
exports.MaxUint48 = MaxUint48
exports.MaxUnorderedNonce = MaxUnorderedNonce
exports.PERMIT2_ADDRESS = PERMIT2_ADDRESS
exports.SignatureTransfer = SignatureTransfer
//# sourceMappingURL=permit2-sdk.cjs.development.js.map
