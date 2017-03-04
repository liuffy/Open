import React from 'react';
import {Link} from 'react-router';
import {withRouter} from 'react-router';

const ResultIndexItem = ({individualResult}) =>{

	let openClass;
	if (individualResult.open_now === "open"){
		openClass = "pacifico-small-open";
	} else {
		openClass = "pacifico-small-closed";
	}

	console.log('individualResult:',individualResult)
		return(
			<div className="index-item group">

				<div className="left-side">
					<span className="name-label">{individualResult.name}</span><br/>
					<span className="miles-label">{individualResult.distance} miles</span><br/>
				</div>

					<div className="right-side">
					<span className= {openClass}>{individualResult.open_now}</span>
				</div>

			</div>
		)
		
}



export default withRouter(ResultIndexItem)