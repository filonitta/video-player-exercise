import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import api from '@/services/api.class';
import Video from './../shared/Video';

const styles = {
};

class Home extends React.Component {
	static propTypes = {
		classes: PropTypes.object
	};

	state = {
		videoFile: null
	}

	componentDidMount() {
	}

	fetchData = () => {
		api.getVideo().then(response => {
			this.setState({ videoFile: response.url });
		});

	}

	render() {
		return <div className="container">
			<h1>A simple Video component example</h1>

			<Button variant="contained" color="primary" onClick={this.fetchData}>Get the video</Button>
			{this.state.videoFile && <Video src={this.state.videoFile} />}
		</div>;
	}
}

export default withStyles(styles)(Home);