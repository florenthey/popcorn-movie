import React, { Component } from 'react';
import SearchBar from '../Components/Search_bar';
import VideoList from '../Containers/Video_list';
import VideoDetail from '../Components/Video_detail';
import Video from '../Components/Video';
import Navbar from '../Components/Navbar';
import axios from 'axios';

const API_END_POINT = "https://api.themoviedb.org/3/";
const POPULAR_MOVIES_URL = "discover/movie?language=fr&sort_by=popularity.desc&include_adult=false&append_to_response=images";
const SEARCH_URL = 'search/movie?language=fr&include_adult=false';

const ANIME_MOVIE = "210024-anime/movies";
const ANIME_TV = "210024-anime/tv";

const API_KEY = "api_key=68a590082c8c328023741c97c9c09038";

//currentMovie = best movie in Theaters for TMDb users
//movieList = first, second, third, fourth, fifth... best movies in Theaters for TMDb users
//initMovie get this and apply a video for current movie
export default class App extends Component{

    state = {
        movieList:{},
        currentMovie:{},
    }

    componentDidMount(){
        this.initMovies();
    }
    
    initMovies = () => {
        axios.get(`${API_END_POINT}${POPULAR_MOVIES_URL}&${API_KEY}`)
            .then( (response) => {
                this.setState({currentMovie:response.data.results[0],
                               movieList:response.data.results.slice(0,6)}, 
                               () => {this.applyVideoToCurrentMovie()}) //callback function, wait update before launching applyVideo...
                //console.log(this.state.currentMovie)
                //console.log(this.state.movieList)
            })
    }

    applyVideoToCurrentMovie(){
        axios.get(`${API_END_POINT}movie/${this.state.currentMovie.id}?${API_KEY}&append_to_response=videos&include_adult=false`)
            .then( (response) => {
                const youtubeKey = response.data.videos.results[0].key; // video key
                let newCurrentMovieState = this.state.currentMovie; //newCurrentMovie is currentMovie +  a new parameter videoID = youtubeKey
                newCurrentMovieState.videoID = youtubeKey;
                this.setState({
                    currentMovie:newCurrentMovieState
                })
                console.log(newCurrentMovieState)
                console.log(response)
            })
    }
    
    onClickListItem = (movie) => {
        this.setState({currentMovie:movie}, () => {
            this.applyVideoToCurrentMovie();
        })
    }

    setRecommendation = () => {
        axios.get(`${API_END_POINT}movie/${this.state.currentMovie.id}/recommendations?${API_KEY}&language=fr`)
            .then( (response) => {
                this.setState({
                    movieList:response.data.results.slice(0,5)
                });
            })
    }

    onClickSearch = (searchText) => {
        if(searchText){
            axios.get(`${API_END_POINT}${SEARCH_URL}&${API_KEY}&query=${searchText}`)
                .then( (response) => {
                    if(response.data.results[0]){ //check if there is a result
                        if(response.data.results[0].id != this.state.currentMovie.id){ //If result === currentMovie, he does nothing
                            this.setState({
                                currentMovie:response.data.results[0]},
                                () => {
                                    this.applyVideoToCurrentMovie();
                                    this.setRecommendation();
                                })
                        }
                    }
            })
        }
    }

    render(){

        const movieListRender = () => {
            if(this.state.movieList.length >=5){
                return <VideoList movieList={this.state.movieList} callback={this.onClickListItem}/>
            }
        }

        return(

            <div>
            <div className='fixed-top'>
                <Navbar/>
                <SearchBar callback={this.onClickSearch}/>
                </div>
                <div className='container'>
                <div className='row'>
                    <div className='col-md-8'>
                        <Video videoID={this.state.currentMovie.videoID}/>
                        <VideoDetail title={this.state.currentMovie.title} 
                             description={this.state.currentMovie.overview}/>
                    </div>
                    <div className='col-md-4'>
                        {movieListRender()}
                    </div>
                </div>
                </div>
            </div>
        )
    } 
}