import React from 'react';
import moment from 'moment'
import './SingleResult.css'

export default function SingleResult (props) {
    return (
        <div className={'singleResultRootDiv'}>
            <div>
                <span>Result Data</span>
                <div className={'dataDiv'}>
                    <span>Name: {props.data.trackName}</span>                    
                    <span>Artist: {props.data.artistName}</span>
                    <span>Album/Collection: {props.data.collectionName}</span>
                    <span>Release Date: {moment(props.data.releaseDate).format('MMMM Do, YYYY')}</span>
                    <span>Kind: {props.data.kind}</span>
                    <span>Price: {props.data.trackPrice}$</span>
                    {props.data.contentAdvisoryRating && <span>Content Advisory Rating: {props.data.contentAdvisoryRating}</span>}
                </div>
                <div>
                    <img alt={"Items Artwork"} src={props.data.artworkUrl100}/>
                </div>
                
                {props.data.previewUrl && <div>

                {props.data.kind === ('feature-movie' || 'music-video' || 'tv- episode') ?
                <video style={{maxWidth: '350px'}} controls autoPlay="" name="media">
                <source src={props.data.previewUrl} type="audio/x-m4a"/>
                </video> 
                :
                <audio controls autoPlay="" name="media">
                    <source src={props.data.previewUrl} type="audio/x-m4a"/>
                </audio>}

                </div>}

            </div>
        </div>
    )
}
