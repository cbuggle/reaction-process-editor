export default class StringDecorator {
  static toLabelSpelling = (str) => {
    if (str) {
      str = str.toLowerCase().split(/[ _]/);
      for (var i = 0; i < str.length; i++) {
        str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
      }
      return str.join(" ");
    }
  };

  static brackets = (str) => {
    return "(" + str + ")";
  };
}
