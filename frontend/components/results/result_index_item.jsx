import React from 'react';
import {Link} from 'react-router';
import {withRouter} from 'react-router';

const ResultIndexItem = ({individualResult}) =>{
	// console.log(JSON.stringify(individualResult)) // No missing data whatsoever
	let openClass;
	if (individualResult.openOrNot === "Closed"){
		openClass = "pacifico-small-closed";
	} else {
		openClass = "pacifico-small-open";
	}

	console.log('individualResult:',individualResult)
		return(
			<div className="index-item group">

				<div className="left-side">
					<span className="name-label">{individualResult.name}</span><br/>
					<p className="miles-label">{individualResult.distance} miles</p><br/> 
				</div>

					<div className="right-side">
					<span className= {openClass}>{individualResult.openOrNot}</span> 
				</div>

			</div>
		)
		
}



export default withRouter(ResultIndexItem)