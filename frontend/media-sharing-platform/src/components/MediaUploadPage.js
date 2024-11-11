import React, { Component } from 'react';
import axios from 'axios';
import { 
  Nav, Navbar, NavbarBrand, NavbarToggler, Collapse, 
  NavItem, Modal, ModalHeader, ModalBody, Button, 
  FormGroup, Label, Input, Form 
} from 'reactstrap';

class MediaUploadPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      message: "",
    };

    this.handleFileChange = this.handleFileChange.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
    this.handleLike = this.handleLike.bind(this);
    this.handleDislike = this.handleDislike.bind(this);
  }

  handleFileChange(event) {
    this.setState({ selectedFile: event.target.files[0] });
  }

  async handleUpload() {

    if (!this.state.selectedFile) {
      this.state.message = 'Please select a file first.';
      return;
    }

    const formData = new FormData();
    formData.append('file', this.state.selectedFile);

    try {
      const response = await axios.post('http://localhost:4000/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('File uploaded successfully');
    } catch (error) {
      console.error('File upload error:', error);
    }
  }

  handleLike(index) {
    const updatedMedia = [...this.state.mediaList];
    updatedMedia[index].likes += 1;
    this.setState({ mediaList: updatedMedia });
  }

  handleDislike(index) {
    const updatedMedia = [...this.state.mediaList];
    updatedMedia[index].dislikes += 1;
    this.setState({ mediaList: updatedMedia });
  }

  render() {
    return (
      <div className='upload-container'>
        <div className='row row-content'>
          <h2 className="upload-title">Upload Media</h2>
          <div className='upload-form'>
            <Input className="file-input" type="file" onChange={this.handleFileChange} />
            <Button onClick={this.handleUpload} type="submit" value="submit" className="upload-btn">Upload</Button>
          </div>
          {this.message && <p className="upload-message">{this.message}</p>}
        </div>
    </div>
    );
  }
}

export default MediaUploadPage;