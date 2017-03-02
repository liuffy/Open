import React from 'react';
// For a Chrome Extension, you should be using a hash or memory history. 
// You'll run into problems otherwise.

class searchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  update(property){
  	return e => this.setState({[property]: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
  }


  render(){
    let {tracktlists} = this.props;
  	let {title, artists, index_image_url, user_id, playlistUrl} = this.state;


  	return(
      <div>
          

      <div
      className="tracktlist-form cf">

        <form
          onSubmit = {this.handleSubmit}>
        <br />


      
        <label><h3
          className="create">Paste image URL for the mix's cover art (PNG, JPG, etc.)</h3>
        <input 
          className="standard-input-field2"
          type='text'
          value={index_image_url}
          placeholder="ex: pretty_picture.png"
          onChange={this.update('index_image_url')} />
        </label>
        <br />

        <button
        className="create-button">check</button>
             
        </form>
      </div>
      </div>
    )
  }

}

export default withRouter(SearchForm);