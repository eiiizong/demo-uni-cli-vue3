/**
 * 格式化用户姓名 张三 => *三
 */
const formatUserName = value => {
  if (!value) {
    return "";
  }
  let len = value.length;
  let str = "*".repeat(len - 1) + value.substr(len - 1, len);
  return str;
};

export { formatUserName };
