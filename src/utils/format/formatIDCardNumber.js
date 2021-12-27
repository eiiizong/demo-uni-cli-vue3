/**
 * 格式化身份证号码 510902199507237788 => 5****************8
 */
const formatIDCardNumber = value => {
  if (!value) {
    return "";
  }
  let len = value.length;
  let str =
    value.substr(0, 1) + "*".repeat(len - 2) + value.substr(len - 1, len);
  return str;
};

export { formatIDCardNumber };
