import {
  tagRexEx,
  otherTagRexEx,
  blankTagRexEx,
  splitParamsRegEx,
  characterSpeechRexEx,
  textTags,
} from "../constants";

export const storyTextToObject = (text: string) => {
  let storyData: StoryData = { lines: [], tagCount: {}, otherLines: [] };
  let lines = text.split("\n");
  let addTag = (tag: string) => {
    if (!(tag in storyData.tagCount)) {
      storyData.tagCount[tag] = 0;
    }
    storyData.tagCount[tag] += 1;
  };
  for (const line of lines) {
    if (line.match(tagRexEx)) {
      let tagRegExResult = tagRexEx.exec(line);
      if (tagRegExResult?.groups) {
        let { tag, params, other } = tagRegExResult.groups;
        tag = tag.toUpperCase();

        let paramsResult: {
          [key: string]: any;
        } = {};
        let result;
        while ((result = splitParamsRegEx.exec(params)) !== null) {
          if (result.groups) {
            const { name, value } = result.groups;
            paramsResult[name] = value.replace(/"/g, "");
          }
        }

        if (other) {
          paramsResult["other"] = other;
        }

        storyData.lines.push({
          tag,
          params: paramsResult,
        });
        addTag(tag);
      }
    } else {
      if (line.match(characterSpeechRexEx)) {
        let charRexExResult = characterSpeechRexEx.exec(line);
        if (charRexExResult?.groups) {
          let { name, params, text } = charRexExResult.groups;

          let paramsResult: {
            [name: string]: any;
          } = {};

          let result;
          if (params) {
            while (
              (result = splitParamsRegEx.exec(
                charRexExResult?.groups?.params
              )) !== null
            ) {
              let name = result.groups?.name;
              let value = result.groups?.value || "";
              if (name) {
                paramsResult[name] = value.replace(/"/g, "");
              }
            }
          }

          storyData.lines.push({
            tag: "DIALOG",
            params: { ...paramsResult, name, text },
          });
          addTag("DIALOG");
        }
      } else {
        if (line.match(otherTagRexEx)) {
          let otherTagRexExResult = otherTagRexEx.exec(line);
          if (otherTagRexExResult?.groups) {
            let { tag, value } = otherTagRexExResult.groups;
            tag = tag.toUpperCase();

            storyData.lines.push({
              tag,
              params: {
                [tag]: value,
              },
            });
            addTag(tag);
          }
        } else {
          if (line.match(blankTagRexEx)) {
            let blankTagRegExResult = blankTagRexEx.exec(line);
            if (blankTagRegExResult?.groups) {
              let { tag } = blankTagRegExResult.groups;
              tag = tag.toUpperCase();

              storyData.lines.push({
                tag,
                params: {},
              });
              addTag(tag);
            }
          } else {
            if (line.length > 0 && line.indexOf(`//`) !== 0) {
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

const spreadsheetOptionRegEx = /\[OPTION (?<value>.*)\]/g;

export const spreadsheetToJson = (
  lines: Array<Array<string>>
): {
  result?: StoryData;
  error?: string;
} => {
  let error = "";
  let result: StoryData = {
    lines: [],
    tagCount: {},
    otherLines: [],
  };

  try {
    const layoutLine = lines.find((line) => line[0] === "[LAYOUT]");

    if (layoutLine) {
      const nameColumn = layoutLine.indexOf("[NAME]");
      const textColumn = layoutLine.indexOf("[TEXT]");

      if (nameColumn && textColumn) {
        for (let index = 0; index < lines.length; index++) {
          const line = lines[index];
          let tag = line[0] || "";
          tag = tag.replace(/[\[\]]/g, "");
          const name = line[nameColumn];
          const text = line[textColumn];

          if (textTags.includes(tag)) {
            result.lines.push({
              tag,
              params: {
                name,
                text,
              },
            });

            tag in result.tagCount
              ? (result.tagCount[tag] = result.tagCount[tag] + 1)
              : (result.tagCount[tag] = 1);
          } else if (tag === "DECISION") {
            let options = [];
            let values = [];

            for (
              let nextIndex = index + 1;
              nextIndex < lines.length;
              nextIndex++
            ) {
              const nextLine = lines[nextIndex];

              if (nextLine[0] === "[END_DECISION]") {
                result.lines.push({
                  tag: "DECISION",
                  params: {
                    options: options.join(";"),
                    values: values.join(";"),
                  },
                });

                "DECISION" in result.tagCount
                  ? (result.tagCount["DECISION"] =
                      result.tagCount["DECISION"] + 1)
                  : (result.tagCount["DECISION"] = 1);

                index = nextIndex;
                break;
              }

              if (nextLine[0].match(spreadsheetOptionRegEx)) {
                const regExResult = spreadsheetOptionRegEx.exec(nextLine[0]);
                if (regExResult) {
                  const value = regExResult.groups?.value;
                  values.push(value);
                  options.push(nextLine[textColumn]);
                }
              }
            }
          }
        }

        return {
          result,
        };
      } else {
        return {
          error: "[NAME] or [TEXT] not found",
        };
      }
    } else {
      return {
        error: "[LAYOUT] not found",
      };
    }
  } catch (e: any) {
    return {
      error: e.message,
    };
  }
};

export const replaceStoryText = ({
  original,
  target,
}: {
  original: StoryLine[];
  target: StoryLine[];
}) => {
  let result: StoryLine[] = [];

  let targetStoryLineByTag: {
    [storyTag: string]: StoryLine[];
  } = {};
  let targetStoryLineByTagIndex: {
    [storyTag: string]: number;
  } = {};

  for (const line of target) {
    if (!(line.tag in targetStoryLineByTag)) {
      targetStoryLineByTag[line.tag] = [];
      targetStoryLineByTagIndex[line.tag] = 0;
    }
    targetStoryLineByTag[line.tag].push(line);
  }

  for (const line of original) {
    if (line.tag in targetStoryLineByTag) {
      if (
        targetStoryLineByTagIndex[line.tag] <
          targetStoryLineByTag[line.tag].length &&
        Object.keys(line.params).length > 0
      ) {
        const targetLine =
          targetStoryLineByTag[line.tag][targetStoryLineByTagIndex[line.tag]];

        const newLine = line;
        if (line.params.name && targetLine.params.name) {
          newLine.params.name = targetLine.params.name;
        }
        if (line.params.text && targetLine.params.text) {
          newLine.params.text = targetLine.params.text;
        }
        //DECISION
        if (line.params.options && targetLine.params.options) {
          newLine.params.options = targetLine.params.options;
        }

        result.push(newLine);
        targetStoryLineByTagIndex[line.tag] += 1;
      } else {
        result.push(line);
      }
    } else {
      result.push(line);
    }
  }

  return result;
};

export const getCharNameAndNumFromSpriteName = (SpriteName: string) => {
  let num = "1";
  let group = "1";
  let name = "";
  if (SpriteName.split("#").length > 1) {
    [name, num] = SpriteName.split("#");
    [num, group] = num.split("$");
  } else {
    if (SpriteName.split("$").length > 1) {
      [name, group] = SpriteName.split("$");
    } else {
      name = SpriteName.split("#")[0];
    }
  }
  return {
    name,
    num,
    group: group ? group : "1",
  };
};

export const storyDataToRenderBlocks = async (storyLines: StoryLine[]) => {
  let renderBlocks = [];
  let renderBlock: StoryLine[] = [];
  let lastLine;
  let lastDecision;
  let charImage = "";

  for (let i = 0; i < storyLines.length; i++) {
    let line = storyLines[i];
    switch (line.tag) {
      case "DESCRIPTION": {
        if (!lastLine) {
          lastLine = {
            tag: "DESCRIPTION",
            params: {
              text: [line.params.text],
            },
          };
        } else {
          if (lastLine.tag === "DESCRIPTION") {
            lastLine.params.text.push(line.params.text);
          } else {
            renderBlock.push(lastLine);
            lastLine = {
              tag: "DESCRIPTION",
              params: {
                text: [line.params.text],
              },
            };
          }
        }
        break;
      }
      case "SUBTITLE": {
        if (line.params.text) {
          if (!lastLine) {
            lastLine = {
              tag: "SUBTITLE",
              params: {
                text: [line.params.text],
              },
            };
          } else {
            if (lastLine.tag === "SUBTITLE") {
              lastLine.params.text.push(line.params.text);
            } else {
              renderBlock.push(lastLine);
              lastLine = {
                tag: "SUBTITLE",
                params: {
                  text: [line.params.text],
                },
              };
            }
          }
        }
        break;
      }
      case "DIALOG": {
        //Check if blank dialog tag
        if (!line.params.text) {
          break;
        }

        let params = {
          ...line.params,
          text: [line.params.text],
          image: charImage,
        };
        if (!lastLine) {
          lastLine = {
            tag: "DIALOG",
            params,
          };
        } else {
          if (
            lastLine.tag === "DIALOG" &&
            lastLine.params?.name?.localeCompare(line.params.name, undefined, {
              sensitivity: "base",
            }) === 0
          ) {
            lastLine.params.text.push(line.params.text);
          } else {
            renderBlock.push(lastLine);
            lastLine = {
              tag: "DIALOG",
              params,
            };
          }
        }
        break;
      }
      case "MULTILINE": {
        let thisLine = {
          tag: "DIALOG",
          params: {
            ...line.params,
            text: [line.params.other],
            image: charImage,
          },
        };

        if (lastLine) {
          renderBlock.push(lastLine);
        }
        lastLine = thisLine;
        break;
      }
      case "DECISION": {
        if (lastLine) {
          renderBlock.push(lastLine);
        }
        let options: string[] = line.params.options.split(";");
        let values = line.params.values.split(";");
        let isNewDecision = false;
        if (lastDecision) {
          for (let value of values) {
            if (lastDecision.options.includes(value)) {
              isNewDecision = true;
              break;
            }
          }
        }
        if (isNewDecision) {
          renderBlocks.push(renderBlock);
          renderBlock = [];
          lastLine = null;
        }
        if (!lastDecision || isNewDecision) {
          lastDecision = {
            options: values,
          };
        }

        lastLine = {
          ...line,
          params: {
            options: options.map((option, index) => ({
              text: option,
              value: values[index],
            })),
          },
        };
        break;
      }
      case "PREDICATE": {
        if (lastLine) {
          renderBlock.push(lastLine);
        }
        let references = line.params.references.split(";");
        lastLine = {
          ...line,
          params: {
            references,
          },
        };
        break;
      }
      case "IMAGE": {
        if (lastLine) {
          renderBlock.push(lastLine);
        }
        lastLine = line;
        break;
      }
      case "BACKGROUND": {
        if (lastLine) {
          renderBlock.push(lastLine);
        }
        lastLine = line;
        break;
      }
      case "CHARACTER": {
        if (line.params.focus) {
          switch (parseInt(line.params.focus)) {
            case 1: {
              charImage = line.params.name;
              break;
            }
            case 2: {
              charImage = line.params.name2;
              break;
            }
            default: {
              charImage = "";
              break;
            }
          }
        } else {
          charImage = line.params.name;
        }
        break;
      }
      default: {
        break;
      }
    }
    //preload images
    // if (["IMAGE", "BACKGROUND", "CHARACTER"].includes(line.tag)) {
    //   if (["IMAGE", "BACKGROUND"].includes(line.tag)) {
    //     if (line.params.image) {
    //       if (!(line.params.image in imagesUrl[line.tag])) {
    //         let image = new Image();
    //         let url = "";
    //         if (line.tag === "IMAGE") {
    //           url = `${assetUrl}/images/avg/imgs/${line.params.image}.webp`;
    //         }
    //         if (line.tag === "BACKGROUND") {
    //           url = `${assetUrl}/images/avg/bg/${line.params.image}.webp`;
    //         }
    //         image.src = url;
    //         imagesUrl[line.tag][line.params.image] = url;
    //       }
    //     }
    //   } else if (line.tag === "CHARACTER") {
    //     if (characterSpriteTable) {
    //       if (!(charImage in imagesUrl["CHARACTER"]) && charImage) {
    //         let url = "";
    //         let file;
    //         let { name, num, group } =
    //           getCharNameAndNumFromSpriteName(charImage);
    //         name = name.toLocaleLowerCase();
    //         num = num.trim();
    //         group = group.trim();
    //         let charSpriteHub = characterSpriteTable[name];
    //         if (charSpriteHub[group]["sprites"][num]["isWholeBody"] === 0) {
    //           let baseNum = Object.keys(charSpriteHub[group]["sprites"])[
    //             Object.keys(charSpriteHub[group]["sprites"]).length - 1
    //           ];
    //           if (baseNum !== num) {
    //             let baseFile =
    //               charSpriteHub[group]["sprites"][baseNum]["sprite"];
    //             let baseSrc = `${assetUrl}/images/avg/characters/${name}/${baseFile}`;

    //             let faceFile = charSpriteHub[group]["sprites"][num]["sprite"];
    //             let faceSrc = `${assetUrl}/images/avg/characters/${name}/${faceFile}`;

    //             url = await mergeImages(
    //               [
    //                 {
    //                   src: baseSrc,
    //                   x: 0,
    //                   y: 0,
    //                 },
    //                 {
    //                   src: faceSrc,
    //                   x: charSpriteHub[group]["facePos"]["x"],
    //                   y: charSpriteHub[group]["facePos"]["y"],
    //                 },
    //               ],
    //               {
    //                 crossOrigin: "anonymous",
    //                 format: "image/webp",
    //               }
    //             );
    //           }
    //         } else {
    //           file = charSpriteHub[group]["sprites"][num]["sprite"];
    //           url = `${assetUrl}/images/avg/characters/${name}/${file}`;
    //         }
    //         imagesUrl["CHARACTER"][charImage] = url;
    //       }
    //     }
    //   }
    // }
  }
  if (lastLine && renderBlock[renderBlock.length - 1] !== lastLine) {
    renderBlock.push(lastLine);
  }

  if (renderBlocks[renderBlocks.length - 1] !== renderBlock)
    renderBlocks.push(renderBlock);

  return renderBlocks;
};
