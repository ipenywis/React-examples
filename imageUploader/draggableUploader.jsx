import React from "react";

import {AnchorButton, Intent, ProgressBar} from "@blueprintjs/core";

import _ from "lodash";

import {Icon} from "react-icons-kit";
import {remove} from 'react-icons-kit/fa/remove';

export default class DraggableUploader extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loadedFiles: []
    };
  }

  onFileLoad(e) {
    const file = e.currentTarget.files[0];

    let fileReader = new FileReader();
    fileReader.onload = () => {
      console.log("IMAGE LOADED: ", fileReader.result);
      const file = {
        data: fileReader.result,
        isUploading: false
      }
      //Add file
      this.addLoadedFile(file);
    }

    fileReader.onabort = () => {
      alert("Reading Aborted");
    }

    fileReader.onerror = () => {
      alert("Reading ERROR!");
    }

    fileReader.readAsDataURL(file);
  }

  addLoadedFile(file) {
    this.setState((prevState) => ({
      loadedFiles: [
        ...prevState.loadedFiles,
        file
      ]
    }));
  }

  removeLoadedFile(file) {
    //Remove file from the State
    this.setState((prevState) => {
      let loadedFiles = prevState.loadedFiles;
      let newLoadedFiles = _.filter(loadedFiles, (ldFile) => {
        return ldFile != file;
      });
      return {loadedFiles: newLoadedFiles};
    });
  }

  removeAllLoadedFile() {
    this.setState({loadedFiles: []});
  }

  updateLoadedFile(oldFile, newFile) {
    this.setState((prevState) => {

      const loadedFiles = [...prevState.loadedFiles];
      _.find(loadedFiles, (file, idx) => {
        if (file == oldFile) 
          loadedFiles[idx] = newFile;
        }
      );

      return {loadedFiles};
    });

    return newFile;
  }

  onUpload() {
    const {loadedFiles} = this.state;

    loadedFiles.map((file, idx) => {
      console.log("Updating...");
      //Update file (Change it's state to uploading)
      let newFile = this.updateLoadedFile(file, {
        ...file,
        isUploading: true
      });

      //Simulate a REAL WEB SERVER DOING IMAGE UPLOADING
      setTimeout(() => {
        //Get it back to it's original State
        this.updateLoadedFile(newFile, {
          ...newFile,
          isUploading: false
        });
      }, 3000);

    });
  }

  render() {
    const {loadedFiles} = this.state;

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
          <div className="files-preview-container ip-scrollbar">
            {loadedFiles.map((file, idx) => {
              return <div className="file" key={idx}>
                <img src={file.data}/>
                <div className="container">
                  <span className="progress-bar">
                    {file.isUploading && <ProgressBar/>}
                  </span>
                  <span className="remove-btn" onClick={() => this.removeLoadedFile(file)}>
                    <Icon icon={remove} size={19}/>
                  </span>
                </div>
              </div>
            })}
          </div>
          <div className="helper-text">Drag and Drop Images Here</div>
          <div className="file-browser-container">
            <AnchorButton
              text="Browse"
              intent={Intent.PRIMARY}
              minimal={true}
              onClick={() => this.fileInput.click()}/>
          </div>
        </div>
        <AnchorButton
          text="Upload"
          intent={Intent.SUCCESS}
          onClick={this
          .onUpload
          .bind(this)}/>
      </div>
    );

  }

}