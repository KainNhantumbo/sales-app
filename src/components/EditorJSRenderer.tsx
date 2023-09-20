import React, { FC } from 'react';
import editorJsHtml from 'editorjs-html';
import { OutputData } from '@editorjs/editorjs';

const EditorJsToHtml = editorJsHtml();

export type TParsedContent = string | JSX.Element;
type TProps = { data: OutputData };

const EditorJsRenderer: FC<TProps> = ({ data }) => {
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
};

export default EditorJsRenderer;
