import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

const ImageUpload = () => {
  const [uploadedFile, setUploadedFile] = useState(null);

  const onDrop = useCallback(acceptedFiles => {
    setUploadedFile(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} style={dropzoneStyles}>
      {uploadedFile === null ? (
        <>
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the file here ...</p>
          ) : (
            <p>Drag 'n' drop an image here, or click to select a file</p>
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
  width: '304px',
  height: '92px',
  textAlign: 'center',
  cursor: 'pointer',
};

export default ImageUpload;
