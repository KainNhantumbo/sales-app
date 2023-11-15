import React from 'react';
import editorJsHtml from 'editorjs-html';
import { OutputData } from '@editorjs/editorjs';

const EditorJsToHtml = editorJsHtml();

export type TParsedContent = string | JSX.Element;
type Props = { data: OutputData };

export default function EditorJsRenderer({ data }: Props) {
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
