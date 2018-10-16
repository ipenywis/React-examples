import React from "react";

import {AnchorButton, Intent} from "@blueprintjs/core";

export default class DraggableUploader extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  onFileLoad(e) {
    const file = e.currentTarget.files[0];

    let fileReader = new FileReader();
    fileReader.onload = () => {
      console.log("IMAGE LOADED: ", fileReader.result);
    }

    fileReader.onabort = () => {
      alert("Reading Aborted");
    }

    fileReader.onerror = () => {
      alert("Reading ERROR!");
    }

    fileReader.readAsDataURL(file);
  }

  render() {

    return (
      <div
        className="inner-container"
        style={{
        display: "flex",
        flexDirection: "column"
      }}>
        <div className="sub-header">Drag an Image</div>
        <div className="draggable-container">
          <input
            type="file"
            id="file-browser-input"
            name="file-browser-input"
            ref={input => this.fileInput = input}
            onDragOver={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
            onDrop={this
            .onFileLoad
            .bind(this)}
            onChange={this
            .onFileLoad
            .bind(this)}/>
          <div className="files-preview-container"></div>
          <div className="helper-text">Drag and Drop Images Here</div>
          <div className="file-browser-container">
            <AnchorButton
              text="Browse"
              intent={Intent.PRIMARY}
              minimal={true}
              onClick={() => this.fileInput.click()}/>
          </div>
        </div>
        <AnchorButton text="Upload" intent={Intent.SUCCESS}/>
      </div>
    );

  }

}