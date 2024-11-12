import React, { Component } from 'react';
import axios from 'axios';

class MediaRetrievalPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mediaList: []
        };
        this.fetchMedia = this.fetchMedia.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount() {
        this.fetchMedia();
    }

    async fetchMedia() {
        try {
            const response = await axios.get('http://localhost:4000/api/media', {
                headers: { 'Content-Type': 'application/json' }
            });
            this.setState({ mediaList: response.data });
            console.log('Retrieved media successfully');
        } catch (error) {
            console.log('Error fetching media:', error);
        }
    }

    async handleDelete(id) {
        try {
            await axios.delete(`http://localhost:4000/api/media/${id}`);
            this.fetchMedia(); // Refresh the media list
        } catch (error) {
            console.error('Error deleting media:', error);
        }
    }

    render() {
        return (
            <div>
                <h2>Media List</h2>
                <ul>
                    {this.state.mediaList.map((media) => (
                        <li key={media._id}>
                            {media.filename}
                            <button onClick={() => this.handleDelete(media._id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default MediaRetrievalPage;