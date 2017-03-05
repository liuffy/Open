import React from 'react';
import {Link} from 'react-router';
import {withRouter} from 'react-router';


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
		} else {
		openClass = "pacifico-small-open";
		}


		return(
			<div className="index-item group">

					<Link to={`/${individualResult.camelCased}`}>
					<span className="name-label">{individualResult.name}<br/>
				<div className="left-side">
					<p className="miles-label">{individualResult.distance} miles</p><br/> 
				</div>

					<div className="right-side">
					<span className= {openClass}>{individualResult.openOrNot}</span> 
				</div>

				</span></Link>
			</div>
		)
	}
}



export default withRouter(ResultIndexItem)