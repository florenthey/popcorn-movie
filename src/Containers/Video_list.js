import React from "react";
import VideoListItem from "../Components/Video_list_item"; 


const VideoList = (props) => {
    const {movieList} = props;

    return(
        <div>
            <ul>
                {
                    movieList.map(movie => {
                        return <VideoListItem movie={movie} key={movie.id} callback={receiveCallback}/>
                    })
                }
            </ul>
        </div>
    );

    function receiveCallback(movie){
        props.callback(movie)
    }
}

export default VideoList;
