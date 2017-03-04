import React from 'react';
import {Link} from 'react-router';
import {withRouter} from 'react-router';

const ResultIndexItem = ({individualResult}) =>{
	console.log('Stringified individual result', JSON.stringify(individualResult)) // Missing data issue
	console.log('individualResult:',individualResult) // Data complete if not stringified
	let openClass;
	if (individualResult.openOrNot === "Closed"){
		openClass = "pacifico-small-closed";
	} else {
		openClass = "pacifico-small-open";
	}

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