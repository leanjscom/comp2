import ReactPropTypesSecret from 'prop-types/lib/ReactPropTypesSecret'

export const compose = (...args) =>
  component =>
    (options = {}) => {
      if (options.eject) return [component, ...args]

      return [...args].reverse().reduce(
        (value, func) => {
          if (typeof func === 'function') {
            return func(value)
          } else if (typeof func.call === 'function') {
            return func.call(...(func.args || []))(value)
          }

          return value
        },
        component
      )
    }

export const call = (func, ...args) => ({
  call: func,
  args
})

export const mockComposition = (composition) => {
  const props = {}
  const fakeComponent = createFakeComponent(props)
  const [component, ...funcs] = composition({ eject: true })
  const ComposedComponent = compose(...funcs)(fakeComponent)()

  function getPropTypeErrors () {
    const typeSpecs = component.propTypes
    let propTypeErrors = ''
    for (var typeSpecName in typeSpecs) {
      const error = typeSpecs[typeSpecName](
        props,
        typeSpecName,
        component.name,
        'prop',
        null,
        ReactPropTypesSecret
      )
      if (error) {
        propTypeErrors = `${propTypeErrors}
${error.message}
`
      }
    }

    return propTypeErrors
  }

  return {
    props,
    ComposedComponent,
    getPropTypeErrors
  }
}

export const createFakeComponent = exportProps =>
  (props) => {
    const keys = Object.keys(props)
    for (const value of keys) {
      exportProps[value] = props[value]
    }
    return <i />
  }
