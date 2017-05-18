import React from 'react';
import { Link } from 'react-router';
import { withRouter } from 'react-router';


class ResultIndexItem extends React.Component{
 constructor(props){
  super(props);
}

handleClick(e) {
  e.preventDefault();
	let {individualResult} = this.props;
	 this.props.router.push(`/${individualResult.camelCased}`)
}

  render(){
		let {individualResult} = this.props;

		let openClass;
		if (individualResult.openOrNot === "Closed"){
			openClass = "pacifico-small-closed";
		} else if (individualResult.openOrNot === "Open"){
			openClass = "pacifico-small-open";
		} else {
			openClass = "pacifico-small-not-available";
		}


		return(
			<div className="index-item group">

					<Link to={`/${individualResult.camelCased}`}>
				<div className="left-side">
				<div className="image-container">
					<img className="image-url" src={individualResult.image} />
				</div>
					<span className="name-label">{individualResult.name}</span><br/>
					<p className="miles-label">{individualResult.address1}</p><br/> 
					<p className="miles-label purp">{individualResult.distance} miles</p><br/> 
				</div>


					<div className="right-side">
					<span className= {openClass}>{individualResult.openOrNot}</span> 
				</div>

				</Link>
			</div>
		)
	}
}



export default withRouter(ResultIndexItem)