import React from "react";
import VideoListItem from "../Components/Video_list_item"; 


//Child of App
//One item movie's list and container of all composents
//Parameter callback receives the child component Video_list_item props
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