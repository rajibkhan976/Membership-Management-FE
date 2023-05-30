export function resolveCondition(type, oparatorName, configValue, fieldValue) {
  var operators = {
    NUMBER: {
      equal: function (a, b) {
        return a == b
      },
      notEqual: function (a, b) {
        return a != b
      },
      lessThan: function (a, b) {
        return a < b
      },
      lessThanEqual: function (a, b) {
        return a <= b
      },
      greaterThan: function (a, b) {
        return a > b
      },
      greaterThanEqual: function (a, b) {
        return a >= b
      },
      between: function (a, b) {
        var parts = b.split('||')
        return a > parseInt(parts[0]) && a <= parseInt(parts[1])
      },
      notBetween: function (a, b) {
        var parts = b.split('||')
        return a < parseInt(parts[0]) || a >= parseInt(parts[1])
      },
    },
    STRING: {
      equal: function (a, b) {
        return a == b
      },
      notEqual: function (a, b) {
        if (a === undefined && !!b) return false
        return a != b
      },
      begins: function (a, b) {
        return b.indexOf(a) > -1
      },
      ends: function (a, b) {
        return b.indexOf(a) > -1
      },
      contains: function (a, b) {
        if (!az.chk.ifEmpty(a)) {
          var hasPipedConfigVal = b.indexOf('|') > -1
          if (hasPipedConfigVal) {
            var configParts = b.split('|')
            var hasPippedValue = a.indexOf('|') > -1
            if (hasPippedValue) {
              var valueparts = a.split('|')
              var matchcount = 0
              for (var i = 0; i < configParts.length; i++) {
                matchcount += indexOf
                az.indexOf(valueparts, function (e) {
                  return e == configParts[i]
                }) > -1
                  ? 1
                  : 0
              }
              return matchcount > 0
            } else
              return (
                az.indexOf(configParts, function (e) {
                  return e == a
                }) > -1
              )
          } else {
            var hasPippedValue = a.indexOf('|') > -1
            if (hasPippedValue) {
              var valueparts = a.split('|')
              var matchcount = 0
              matchcount +=
                az.indexOf(valueparts, function (e) {
                  return e == b
                }) > -1
                  ? 1
                  : 0
              return matchcount > 0
            } else return (a || '').indexOf(b) > -1
          } //return b.indexOf(a) > -1;
        } else return false
      },
    },
    DATE: {
      equal: function (a, b) {
        return a == b
      },
      notEqual: function (a, b) {
        return a != b
      },
      lessThan: function (a, b) {
        return a < b
      },
      lessThanEqual: function (a, b) {
        return a <= b
      },
      greaterThan: function (a, b) {
        return a > b
      },
      greaterThanEqual: function (a, b) {
        return a >= b
      },
      between: function (a, b) {
        var parts = b.split('||')
        return a > new Date(parts[0]) && a <= new Date(parts[1])
      },
      notBetween: function (a, b) {
        var parts = b.split('||')
        return a < new Date(parts[0]) || a >= new Date(parts[1])
      },
    },
    BOOLEAN: {
      equal: function (a, b) {
        return a == b
      },
    },
  }
  var fn = operators[type.toUpperCase()][oparatorName]
  if (type == 'date') {
    configValue = new Date(configValue).setHours(0, 0, 0, 0)
    if (fieldValue) fieldValue = fieldValue.setHours(0, 0, 0, 0)
    else fieldValue = 0
  }
  if (type == 'boolean') {
    configValue = JSON.parse(configValue)
    fieldValue = !!parseInt(fieldValue)
  }
  return fn(fieldValue, configValue)
}
