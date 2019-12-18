import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Video from './../shared/Video';

const styles = {
};

class Home extends React.Component {
	static propTypes = {
		classes: PropTypes.object
	};

	render() {

		return <div className="container">
			<h1>A simple Video component example</h1>

			<Video src="http://distribution.bbb3d.renderfarming.net/video/mp4/bbb_sunflower_1080p_30fps_normal.mp4" />
		</div>;
	}
}

export default withStyles(styles)(Home);