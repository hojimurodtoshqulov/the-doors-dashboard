import React from "react";
import ImageUploader from "react-images-upload";

const UploadComponent = (props) => {
  const onDrop = (pictureFiles, pictureDataURLs) => {
    const newImagesUploaded = pictureDataURLs.slice(props.defaultImages.length);
    console.warn("pictureDataURLs =>", newImagesUploaded);
    props.handleChange(pictureFiles, pictureDataURLs);
  };

  const btnText = props.btnType === "edit" ? "Change photos" : "Add photos";

  return (
    <ImageUploader
      withIcon={false}
      withLabel={false}
      withPreview={true}
      buttonText={btnText}
      fileSizeError={"File size is too big!"}
      fileTypeError={"Upload png or jpg!"}
      onChange={onDrop}
      imgExtension={props.imgExtension}
      maxFileSize={props.maxFileSize}
      defaultImages={props.defaultImages}
    />
  );
};

export default UploadComponent;
