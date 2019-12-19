import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = {
	root: {},
	video: {
		maxWidth: '100%',
		height: 'auto',
		'&:focus': {
			outline: 'none'
		}
	}
}

class Video extends React.Component {
	static propTypes = {
		controls: PropTypes.bool,
		autoPlay: PropTypes.bool,
		src: PropTypes.string,
		classes: PropTypes.any,
	};

	static defaultProps = {
		src: null,
		controls: true,
		autoPlay: false,
	};

	state = {
		isLoaded: false
	}

	loadedData = () => {
		this.setState({ isLoaded: true });
	}

	render() {
		let {
			classes
		} = this.props;

		let {
			isLoaded
		} = this.state;

		return <div className={classes.root}>
			<video
				hidden={!isLoaded}
				className={classes.video}
				{...this.props}
				onLoadedData={this.loadedData}
				poster="/assets/images/no-video.jpg"
			></video>
		</div>
	}
}

export default withStyles(styles)(Video);