import React, { Component } from 'react';
import axios from 'axios';
import { Input, Button } from 'reactstrap';

class MediaUploadPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      message: "",
      mediaList: [],  // Holds the list of uploaded media with likes and dislikes
    };

    this.handleFileChange = this.handleFileChange.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
    
  }

  handleFileChange(event) {
    this.setState({ selectedFile: event.target.files[0], message: "" });
  }

  async handleUpload() {
    if (!this.state.selectedFile) {
      alert('Please choose a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('media', this.state.selectedFile);

    try {
      const response = await axios.post('http://localhost:4000/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Upload successful!');
    } catch (error) {
      alert('Upload failed.');
    }
  }

  

 

  render() {
    return (
      <div className='upload-container'>
        <div className='row row-content'>
          <h2 className="upload-title">Upload Media</h2>
          <div className='upload-form'>
            <Input className="file-input" type="file" onChange={this.handleFileChange} />
            <Button onClick={this.handleUpload} type="submit" className="upload-btn">Upload</Button>
          </div>
          {this.state.message && <p className="upload-message">{this.state.message}</p>}
        </div>

        
      </div>
    );
  }
}

export default MediaUploadPage;