import ReactPropTypesSecret from 'prop-types/lib/ReactPropTypesSecret'
import React from 'react'

const compose = (...args) =>
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

export function composeWithFake(composition) {
  const [component, ...funcs] = composition({ eject: true })
  const FakeComponent = () => <i />
  const ComposedComponent = compose(...funcs)(FakeComponent)()

  function getPropTypeErrors ({ props }) {
    let propTypeErrors = ''
    for (var typeSpecName in component.propTypes) {
      const error = component.propTypes[typeSpecName](
        props,
        typeSpecName,
        component.name,
        'prop',
        null,
        ReactPropTypesSecret
      )
      if (error) {
        propTypeErrors = [...propTypeErrors, error]
      }
    }

    return propTypeErrors
  }

  return { ComposedComponent, FakeComponent, getPropTypeErrors }
}

export default compose
