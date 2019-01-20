import React, { Component } from "react";


export default class SearchBar extends Component {

    state = {
        searchText:"",
        placeHolder:"🔎 Chercher un film, une série, un animé...",
        intervalBeforeRequest: 1000,
        lockRequest:false,
    }

    handleChange = e => {
        this.setState({
            searchText:e.target.value
        });

        if(!this.state.lockRequest){
            this.setState({
                lockRequest:true
            })
            setTimeout( () => {
                this.search()},
                this.state.intervalBeforeRequest)
        }
    }

    handleOnClick = e => {
        this.search()
    }

    search = () => {
        this.props.callback(this.state.searchText);
        this.setState({
            lockRequest:false
        })
    }

    render() {

        return(

            <div className='row'>
                <div className='col-md-12 input-group'>
                    <input type='text' className='form-control input-lg' onChange={this.handleChange} placeholder={this.state.placeHolder}/>
                    <span className='input-group-btn'>
                        <button className="'btn btn-secondary" onClick={this.handleOnClick}>Go!</button>
                    </span>
                </div>
                <p>{this.state.searchText}</p>
            </div>
        )
    }
}