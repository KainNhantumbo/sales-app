import React from 'react';
import { OutputData } from '@editorjs/editorjs';
import editorJsHtml from "editorjs-html";
const EditorJsToHtml = editorJsHtml();

export type TParsedContent = string | JSX.Element;
type TProps = { data: OutputData; className: string };

export default function EditorJsRenderer({
  data,
  className,
}: TProps): JSX.Element {
  const html = EditorJsToHtml.parse(data) as TParsedContent[];
  return (
    <div className={className}>
      {html.map((item, index) => {
        if (typeof item === 'string') {
          return (
            <div dangerouslySetInnerHTML={{ __html: item }} key={String(index)}/>
          );
        }
        return item;
      })}
    </div>
  );
}
