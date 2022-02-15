import {
  tagRexEx,
  splitParamsRegEx,
  characterSpeechRexEx,
  otherTagRexEx,
  blankTagRexEx,
} from "../constants/regex";

export const storyTextToObject = (text) => {
  let storyData = { lines: [], tagCount: {}, otherLines: [] };
  let lines = text.split("\n");
  let addTag = (tag) => {
    if (!(tag in storyData.tagCount)) {
      storyData.tagCount[tag] = 0;
    }
    storyData.tagCount[tag] += 1;
  };
  for (const line of lines) {
    if (line.match(tagRexEx)) {
      let { tag, params } = tagRexEx.exec(line).groups;
      tag = tag.toUpperCase();

      let paramsResult = {};
      let result;
      while ((result = splitParamsRegEx.exec(params)) !== null) {
        let { name, value } = result.groups;
        paramsResult[name] = value.replace(/"/g, "");
      }

      storyData.lines.push({
        tag,
        params: paramsResult,
      });
      addTag(tag);
    } else {
      if (line.match(characterSpeechRexEx)) {
        let { name, params, text } = characterSpeechRexEx.exec(line).groups;

        let paramsResult = {};
        let result;
        while ((result = splitParamsRegEx.exec(params)) !== null) {
          let { name, value } = result.groups;
          paramsResult[name] = value.replace(/"/g, "");
        }

        storyData.lines.push({
          tag: "CHARACTER_SPEECH",
          params: { ...paramsResult, name, text },
        });
        addTag("CHARACTER_SPEECH");
      } else {
        if (line.match(otherTagRexEx)) {
          let { tag, value } = otherTagRexEx.exec(line).groups;
          tag = tag.toUpperCase();

          storyData.lines.push({
            tag,
            params: {
              [tag]: value,
            },
          });
          addTag(tag);
        } else {
          if (line.match(blankTagRexEx)) {
            let { tag } = blankTagRexEx.exec(line).groups;
            tag = tag.toUpperCase();

            storyData.lines.push({
              tag,
              params: {},
            });
            addTag(tag);
          } else {
            if (line.length > 0 && line.indexOf(`//` !== 0)) {
              let tag = "DESCRIPTION";
              storyData.lines.push({
                tag,
                params: {
                  text: line,
                },
              });
              addTag(tag);
            } else {
              storyData.otherLines.push(line);
            }
          }
        }
      }
    }
  }
  return storyData;
};
