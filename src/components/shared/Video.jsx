import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled';
import GetAppIcon from '@material-ui/icons/GetApp';

const styles = theme => ({
	root: {
		position: 'relative'
	},
	video: {
		maxWidth: '100%',
		height: 'auto',
		verticalAlign: 'middle',
		'&:focus': {
			outline: 'none'
		}
	},
	controls: {
		width: '100%',
		position: 'absolute',
		bottom: 0,
		padding: '10px',
		background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%,rgba(0,0,0,0.2) 100%)',
	},
	progressBar: {
		marginTop: '5px',
		display: 'block',
		height: '3px',
		background: theme.palette.grey[600],
		position: 'relative'
	},
	progressLine: {
		display: 'block',
		height: '3px',
		background: theme.palette.secondary.main,
		transition: 'width 0.3s',
		width: 0,
		position: 'absolute',
		left: 0,
		top: 0,
		zIndex: 1
	},
	bufferedLine: {
		display: 'block',
		height: '3px',
		background: theme.palette.grey[400],
		transition: 'width 0.3s',
		width: 0,
		position: 'absolute',
		left: '0',
		top: '0'
	},
	heading: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	flexContainer: {
		display: 'flex',
		alignItems: 'center',
	},
	timer: {
		marginLeft: '5px',
		fontSize: '12px',
		color: '#fff'
	}
});

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

	videoElement = null;

	state = {
		isLoaded: false,
		progress: 0,
		buffered: 0,
	}

	_format = format => time => {
		let m = parseInt(parseInt(time / 60));
		let s = parseInt(time -  60 * m);

		return format.replace('mm', m).replace('ss', s < 10 ? '0' + s : s);
	}

	loadedData = () => {
		this.setState({
			isLoaded: true,
			totalTime: this._format('mm:ss')(this.videoElement.duration),
			currentTime: this._format('mm:ss')(this.videoElement.currentTime)
		});
	}

	timeupdate = () => {
		this.setState({
			progress: this.videoElement.currentTime * 100 / this.videoElement.duration,
			currentTime: this._format('mm:ss')(this.videoElement.currentTime)
		});
	}

	playpause = () => {
		this.videoElement.paused ? this.videoElement.play() : this.videoElement.pause();
	}

	progress = () => {
		if (!this.videoElement.buffered.length) return;

		let loadedPercentage = 100 * this.videoElement.buffered.end(0) / this.videoElement.duration;
		this.setState({ buffered: loadedPercentage});
	}

	download = () => {
		let link = document.createElement('a');
		link.href = this.videoElement.src;
		link.setAttribute('target', 'blank');
		link.setAttribute('download', this.videoElement.src);
		link.click();
	}

	render() {
		let {
			classes,
			controls
		} = this.props;

		let {
			isLoaded,
			totalTime,
			currentTime
		} = this.state;

		return <div className={classes.root}>
			<video
				hidden={!isLoaded}
				{...this.props}
				controls={false}
				className={classes.video}
				poster="/assets/images/no-video.jpg"
				ref={el => this.videoElement = el}
				onLoadedData={this.loadedData}
				onProgress={this.progress}
				onTimeUpdate={this.timeupdate}
			></video>

			{isLoaded && controls &&
			<div className={classes.controls}>
				<div className={classes.heading}>
					<div className={classes.flexContainer}>
						<IconButton aria-label="play" onClick={this.playpause} color="secondary">
							{this.videoElement.paused ? <PlayCircleFilledIcon /> : <PauseCircleFilledIcon />}
						</IconButton>

						<div className={classes.timer}>
							{currentTime} / {totalTime}
						</div>
					</div>
					<div>
						<IconButton aria-label="play" onClick={this.download}>
							<GetAppIcon />
						</IconButton>
					</div>
				</div>

				<div className={classes.progressBar}>
					<div className={classes.progressLine} style={{ width: `${this.state.progress}%` }}></div>
					<div className={classes.bufferedLine} style={{ width: `${this.state.buffered}%` }}></div>
				</div>
			</div>
			}
		</div>
	}
}

export default withStyles(styles)(Video);