import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

const ImageUpload = ({ uploadedFile, setUploadedFile, text }) => {

  const onDrop = useCallback(acceptedFiles => {
    const file = acceptedFiles[0];
    setUploadedFile(file);
  }, [setUploadedFile]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} style={dropzoneStyles}>
      {uploadedFile === null ? (
        <>
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Platziere die Datei hier ...</p>
          ) : (
            <p>{text}</p>
          )}
        </>
      ) : (
        <div>
          <img
            src={URL.createObjectURL(uploadedFile)}
            alt={uploadedFile.name}
            style={{ maxWidth: '328px', maxHeight: '116px', objectFit: 'cover', width: '100%', height: '100%' }}
          />
        </div>
      )}
    </div>
  );
};

const dropzoneStyles = {
  border: '1px dashed royalblue',
  borderRadius: '8px',
  padding: '12px',
  margin: '20px 0px',
  width: '332px',
  height: '100px',
  textAlign: 'center',
  cursor: 'pointer',
  color: 'royalblue',
};

export default ImageUpload;
