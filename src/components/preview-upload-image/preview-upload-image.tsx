import React, { FC } from 'react';
import { useDropzone, DropEvent } from 'react-dropzone';
import useStyles from './useStyles';

interface IProps {
  onDrop?<T extends File>(
    acceptedFiles: T[],
    rejectedFiles: T[],
    event: DropEvent
  ): void;
  accept?: string | string[];
}

interface Image {
  id: string;
  src: string;
}

interface Images {
  images: Image[];
}

export const Dropzone: FC<IProps> = ({ onDrop, accept }) => {
  const classes = useStyles();
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept
  });
  return (
    <div {...getRootProps()} className={classes.root}>
      <input className="dropzone-input" {...getInputProps()} />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {isDragActive ? (
          <div className={classes.uploadField}>
            Release to drop the files here
          </div>
        ) : (
          <div className={classes.uploadField}>
            Drag 'n' drop some files here, or click to select files
          </div>
        )}
      </div>
    </div>
  );
};

export const Image: FC<Image> = ({ id, src }) => {
  const classes = useStyles();
  return (
    <div className="file-item">
      <img alt={`img - ${id}`} src={src} className={classes.fileImg} />
    </div>
  );
};

// ImageList Component
export const ImageList: FC<Images> = ({ images }) => {
  // render each image by calling Image component
  const renderImage = (image: { id: any; src: string }, index: any) => {
    return <Image id={image.id} src={image.src} key={`${image.id}-image`} />;
  };

  // Return the list of files
  return <section className="file-list">{images.map(renderImage)}</section>;
};
