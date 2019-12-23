import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import api from '@/services/api.class';
import Notification from './../shared/Notification';
import Video from './../shared/Video';
import { addNotification } from '@redux/actions/index';

const styles = {
	button: {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		zIndex: 9
	},
	spinner: {
		position: 'absolute',
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

	fetchData = () => {
		this.setState({ loading: true });

		if (this.state.loading) return;

		// let method = Math.random() > 0.5 ? api.getVideo() : api.getVideo2();

		api.getVideo().then(response => {
			this.setState({ videoFile: response.url });
		}).catch(() => {
			store.dispatch(addNotification({
				type: 'error',
				message: 'Some error occured'
			}));
		}).finally(() => {
			this.setState({ loading: false });
		});

	}

	render() {
		const {
			classes,
		} = this.props;

		const {
			loading,
			videoFile,
		} = this.state;

		return <div className="container">
			{!videoFile && <Button className={classes.button} variant="contained" size="large" color="secondary" onClick={this.fetchData} disabled={loading}>
				Upload the video
				{loading && <CircularProgress color="secondary" size={25} className={classes.spinner} />}
			</Button>}
			{videoFile && <Video src={videoFile} />}

			<Notification />
		</div>;
	}
}

export default withStyles(styles)(Home);