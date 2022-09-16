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

export { capitalize, cx };
