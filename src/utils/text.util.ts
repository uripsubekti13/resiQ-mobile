class TextUtil {
  private wordUpperCaseFirst(word: string) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
  camelCaseToSentence(camelCase: string) {
    const sentence = camelCase.replace(/([a-z])([A-Z])/g, "$1 $2").toLowerCase();
    return this.upperCaseFirst(sentence)
  }
  upperCaseFirst(sentence: string) {
    const arrayOfSentence = sentence.split(" ");
    const upperCaseFirstArray = arrayOfSentence.map((word: string) => this.wordUpperCaseFirst(word));
    return upperCaseFirstArray.join(" ");
  }
}

export const textUtil = new TextUtil();
