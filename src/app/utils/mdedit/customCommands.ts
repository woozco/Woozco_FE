// customCommands.ts
import {
    title1,
    title2,
    title3,
    title4,
    title5,
    bold,
    italic,
    codeBlock,
    strikethrough,
    hr,
    group,
    divider,
    link,
    quote,
    code,
    unorderedListCommand,
    orderedListCommand,
    checkedListCommand,
    codeEdit,
    codeLive,
    codePreview,
    fullscreen,
  } from "@uiw/react-md-editor";
  import onImagePasted from "@/app/components/mdedit/onImagePasted";
  
  export const customCommands = [
    group(
        [
            title1,
            title2,
            title3,
            title4,
            title5,
        ],
        {
            name: "title",
            groupName: "title",
            buttonProps: { "aria-label": "Insert title" },
        }
    ),
    bold,
    italic,
    codeBlock,
    strikethrough,
    hr,
    group,
    divider,    
    link,
    quote,
    code,
    fullscreen,
  ];
  
  export const onCustomImagePasted = async (dataTransfer: DataTransfer, setMarkdown: React.Dispatch<React.SetStateAction<string | undefined>>) => {
    
    await onImagePasted(dataTransfer, setMarkdown);
  };
  