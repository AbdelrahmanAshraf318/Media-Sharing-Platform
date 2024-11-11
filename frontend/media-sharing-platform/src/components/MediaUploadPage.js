import React, { Component } from 'react';
import axios from 'axios';

class MediaUploadPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      mediaList: [],
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
    const formData = new FormData();
    formData.append('file', this.state.selectedFile);

    try {
      const response = await axios.post('http://localhost:4000/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      this.setState({ mediaList: [...this.state.mediaList, response.data] });
    } catch (error) {
      console.error("File upload error:", error);
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
      <div>
        <h2>Upload Media</h2>
        <input type="file" onChange={this.handleFileChange} />
        <button onClick={this.handleUpload}>Upload</button>

        <h2>Media List</h2>
        <ul>
          {this.state.mediaList.map((media, index) => (
            <li key={index}>
              {media.type === 'image' ? (
                <img src={media.url} alt="uploaded media" width="200" />
              ) : (
                <video controls width="200">
                  <source src={media.url} type="video/mp4" />
                </video>
              )}
              <div>
                <button onClick={() => this.handleLike(index)}>Like {media.likes}</button>
                <button onClick={() => this.handleDislike(index)}>Dislike {media.dislikes}</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default MediaUploadPage;