/**
 * 格式化电话号码 13288876677 => 132****6677
 */
const formatPhoneNumber = value => {
  if (!value) {
    return "";
  }
  const pat = /(\d{3})\d*(\d{4})/;
  const str = value.replace(pat, "$1****$2");
  return str;
};

export { formatPhoneNumber };
