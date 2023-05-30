// A helper function to allow passing
// additional error message with validator
const withErrorMessage =
  (func: (v: unknown) => boolean) =>
  (message = '') => {
    return (v: unknown) => func(v) || message
  }

const requiredValidator = (value: unknown) => Boolean(value)
const stringValidator = (value: unknown) => {
  if (!(typeof value === 'string' || value instanceof String)) {
    console.error(`string expected, ${typeof value} provided`)
    return false
  }
  return true
}

const emailValidator = (email: unknown) => {
  if (!stringValidator(email)) return false
  const expression = /\S+@\S+\.\S+/
  return expression.test(email as string)
}

/* complete regex
/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/
*/ //end

// minLength: 8, atLeast1SpecialCharacter, atLeast1Number
const passwordValidator = (value: unknown) => {
  if (typeof value !== 'string') return false
  const re = /^(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/
  return re.test(value)
}

export const isRequired = withErrorMessage(requiredValidator)
export const isValidPassword = withErrorMessage(passwordValidator)
export const isValidEmail = withErrorMessage(emailValidator)
