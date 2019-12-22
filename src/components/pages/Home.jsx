import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import api from '@/services/api.class';
import Video from './../shared/Video';

const styles = {
	button: {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)'
	},
	spinner: {
		position: 'absolute',
		right: '5px',
		marginLeft: '5px',
		width: '15px',
	}
};

class Home extends React.Component {
	static propTypes = {
		classes: PropTypes.object
	};

	state = {
		videoFile: null,
		loading: false
	}

	componentDidMount() {
	}

	fetchData = () => {
		this.setState({ loading: true });
		api.getVideo().then(response => {
			this.setState({
				videoFile: response.url,
				loading: false
			});
		});

	}

	render() {
		const {
			classes,
		} = this.props;

		const {
			loading
		} = this.state;

		return <div className="container">
			{!this.state.videoFile && <Button className={classes.button} variant="contained" size="large" color="secondary" onClick={this.fetchData}>
				Upload the video
				{loading && <CircularProgress color="inherit" size="20" className={classes.spinner} />}
			</Button>}
			{this.state.videoFile && <Video src={this.state.videoFile} />}
		</div>;
	}
}

export default withStyles(styles)(Home);