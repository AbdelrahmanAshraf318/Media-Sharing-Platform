import React, { Component } from 'react';
import axios from 'axios';
import { Input, Button } from 'reactstrap';

class MediaRetrievalPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mediaList: []
        };
        this.fetchMedia = this.fetchMedia.bind(this);
        //this.handleLike = this.handleLike.bind(this);
        //this.handleDislike = this.handleDislike.bind(this);
        //this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount() {
        this.fetchMedia();
        this.handleLike();
        //this.handleDisLike();
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

    handleLike = async (id) => {
        console.log("Attempting to like media with ID:", id);
        try {
            const response = await axios.put(`http://localhost:4000/api/like/${id}`);
            console.log("Like response:", response.data); // Log server response
            this.setState(prevState => ({
                mediaList: prevState.mediaList.map(media =>
                    media._id === id ? { ...media, likes: response.data.likes } : media
                ),
            }));
        } catch (error) {
            console.log('Error liking media:', error);
        }
    };

    handleDislike = async (id) => {
        try {
            const response = await axios.put(`http://localhost:4000/api/like/${id}`);
            this.setState(prevState => ({
                mediaList: prevState.mediaList.map(media =>
                    media._id === id ? { ...media, dislikes: media.dislikes + 1 } : media
                ),
            }));
        } catch (error) {
            console.log('Error disliking media:', error);
        }
    };

    /*async handleDelete(id) {
        try {
            console.log(id);
            await axios.delete(`http://localhost:4000/api/media/${id}`);
            this.fetchMedia(); // Refresh the media list
        } catch (error) {
            console.error('Error deleting media:', error);
        }
    }*/

    render() {
        return (
            <div>
                {this.state.mediaList.map(media => (
                    <div key={media._id} style={{ marginBottom: '20px' }}>
                        {media.type === 'image' ? (
                            <img src={`http://localhost:4000${media.url}`} alt="Media" style={{ width: '100%', maxWidth: '500px' }} />
                        ) : (
                            <video src={`http://localhost:4000${media.url}`} controls style={{ width: '100%', maxWidth: '500px' }} />
                        )}
                        <div>
                            <button onClick={() => this.handleLike(media._id)}>Like {media.likes}</button>
                            <button onClick={() => this.handleDislike(media._id)}>Dislike {media.dislikes}</button>
                        </div>
                    </div>
                ))}
            </div>
        );
    }
}

export default MediaRetrievalPage;