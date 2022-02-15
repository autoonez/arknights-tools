export const tagRexEx = /\[(?<tag>.+?)\((?<params>.*)\)\]/;
export const otherTagRexEx = /\[(?<tag>.*)=(?<value>.*)\]/g;
export const blankTagRexEx = /\[(?<tag>.*)\]/;
export const splitParamsRegEx =
  /(?<name>\w*?)\s*=\s*(?<value>".*?"|[^",)\]\s]*)/g;
export const characterSpeechRexEx =
  /\[[Nn][Aa][Mm][Ee]="(?<name>.*)"(?<params>.*)\]\s*(?<text>.*)/g;
