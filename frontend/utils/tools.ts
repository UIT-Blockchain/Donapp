import classNames from "classnames";

/**
 * Mapping hotkey into className package for better usage
 */
const cx = classNames;

/**
 * 
 capitalize
 */

const capitalize = (str: string) => str[0].toUpperCase() + str.slice(1);
const ntoy = (amount: number) =>
  (amount * 10).toString().concat("00000000000000000000000");
export { capitalize, cx, ntoy };
