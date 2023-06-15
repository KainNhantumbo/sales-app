import React from 'react';
import { OutputData } from '@editorjs/editorjs';
import editorJsHtml from 'editorjs-html';
const EditorJsToHtml = editorJsHtml();

export type TParsedContent = string | JSX.Element;
type TProps = { data: OutputData };

export default function EditorJsRenderer({ data }: TProps): JSX.Element {
  const html = EditorJsToHtml.parse(data) as TParsedContent[];
  return (
    <>
      {html.map((item, index) => {
        if (typeof item === 'string') {
          return (
            <div
              dangerouslySetInnerHTML={{ __html: item }}
              key={String(index)}
            />
          );
        }
      })}
    </>
  );
}
