import { DEFAULT_MIME_TYPES } from '@/data/constants';
import Compressor from 'compressorjs';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { IoDownloadOutline } from 'react-icons/io5';
import styled from 'styled-components';

export type DropzoneProps = {
  handler: (file: string) => void;
  width: number;
  height: number;
};

export const DropzoneArea = ({ handler, width, height }: DropzoneProps) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    maxFiles: 1,
    onDrop: useCallback(
      <T extends File>(acceptedFiles: T[]) => {
        const file = acceptedFiles[0];
        if (!file || !DEFAULT_MIME_TYPES.includes(file.type))
          return alert('Erro: extensão da imagem carregada não suportado.');

        new Compressor(file, {
          width,
          height,
          maxHeight: height,
          maxWidth: width,
          strict: true,
          resize: 'cover',
          quality: 0.9,
          success: (compressedImage: File | Blob) => {
            const reader = new FileReader();
            reader.readAsDataURL(compressedImage);
            reader.onloadend = function (e: ProgressEvent<FileReader>) {
              const encodedImage: string = e.target?.result as string;
              handler(encodedImage);
            };
          }
        });
      },
      [handler, width, height]
    )
  });

  return (
    <Container {...getRootProps()}>
      <div>
        <IoDownloadOutline />
        <h3>
          {isDragActive ? 'Solte a imagem aqui' : 'Clique ou arraste a imagem para aqui'}
        </h3>
        <span>[.JPEG, .JPG, .PNG]</span>
        <span>
          Dimensions: {width}px x {height}px
        </span>

        <input {...getInputProps()} />
      </div>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  place-content: center center;
  place-items: center center;
  border-radius: 12px;
  border: 1px solid rgba(${({ theme }) => theme.font}, 0.1);
  background: rgb(${({ theme }) => theme.background});
  padding: 12px;

  div {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-items: center;
    align-items: center;
    gap: 12px;
    user-select: none;

    svg {
      width: 50px;
      height: auto;
    }

    h3 {
      width: 100%;
      max-width: 260px;
      margin: 0 auto;
      text-align: center;
      color: rgb(${({ theme }) => theme.primary_shade});
    }

    span {
      text-align: center;
      font-weight: 500;
      font-size: 0.9rem;
    }
  }
`;
