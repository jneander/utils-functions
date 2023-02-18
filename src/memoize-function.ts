function inputsMatch(memoInputs: unknown[], givenInputs: unknown[]): boolean {
  return (
    memoInputs != null &&
    memoInputs.length === givenInputs.length &&
    givenInputs.every((givenInput, index) => givenInput === memoInputs[index])
  )
}

export function memoizeFunction<P extends unknown[], R>(fn: (...args: P) => R) {
  let inputs: P
  let memoResult: R

  function memoizedFunction(...args: P): R {
    if (inputsMatch(inputs, args)) {
      return memoResult
    }

    inputs = args
    memoResult = fn(...args)
    return memoResult
  }

  const [initial, ...letters] = fn.name || 'Function'
  Object.defineProperty(memoizedFunction, 'name', {
    value: `memoized${initial.toUpperCase()}${letters.join('')}`,
  })

  return memoizedFunction
}
