import clone from "rfdc";

/**
 * Function utilizing the 'rfdc' (Really Fast Deep Clone) package to
 * create a deep clone of JSON types.
 *
 * Primarily used for deep cloning Objects or Arrays with deeply nested properties.
 *
 * The deep clone that is returned will be of the same type as it's input and
 * share no references to the original.
 *
 * https://www.npmjs.com/package/rfdc
 * @params **Types**: `Object`, `Array`, `Number`, `String`, `null`, `Date`, `undefined`,
 *
 * **Copied**: `Buffer`, `TypedArray`, `Map`, `Set`
 *
 * **Referenced**: `Function`, `AsyncFunction`, `Generator Function`, `GeneratorFunction`
 *
 * **Normal Object**: `arguments`
 * @returns Deep Clone, type, copy, reference, Object
 */
const deepClone = clone();

export default deepClone;
