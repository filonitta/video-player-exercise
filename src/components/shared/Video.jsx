import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled';
import GetAppIcon from '@material-ui/icons/GetApp';

import { setVideo } from '@redux/actions/index';

const styles = theme => ({
	root: {
		position: 'relative',
		boxShadow: '0px 10px 30px 0px rgba(0,0,0,0.3)',
		overflow: 'hidden',
		'&.playing > $controls': {
			bottom: '-100px'
		},
		'&:hover > $controls': {
			bottom: 0
		}
	},
	video: {
		maxWidth: '100%',
		height: 'auto',
		verticalAlign: 'middle',
		overflow: 'hidden',
		'&:focus': {
			outline: 'none'
		}
	},
	controls: {
		width: '100%',
		position: 'absolute',
		bottom: 0,
		padding: '30px 10px 10px',
		background: 'linear-gradient(to bottom, rgba(255,255,255,0) 0%,rgba(255,255,255,0.7) 100%)',
		transition: 'bottom 0.5s ease-out 0.5s'
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
		background: theme.palette.grey[500],
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
		// color: theme.palette.grey[700],
	}
});

class ConnectedVideo extends React.Component {
	static propTypes = {
		controls: PropTypes.bool,
		autoPlay: PropTypes.bool,
		src: PropTypes.string.isRequired,
		classes: PropTypes.any,

		isLoaded: PropTypes.bool,
		progress: PropTypes.number,
		buffered: PropTypes.number,
		isPlaying: PropTypes.bool,
		totalTime: PropTypes.string,
		currentTime: PropTypes.string,
		setData: PropTypes.func.isRequired,
	};

	static defaultProps = {
		src: null,
		controls: true,
		autoPlay: false,

		isLoaded: false,
		progress: 0,
		buffered: 0,
		isPlaying: false,
		totalTime: '',
		currentTime: '',
	};

	videoElement = null;

	_format = format => time => {
		let m = parseInt(parseInt(time / 60));
		let s = parseInt(time -  60 * m);

		return format.replace('mm', m).replace('ss', s < 10 ? '0' + s : s);
	}

	loadedData = () => {
		/*this.setState({
			isLoaded: true,
			totalTime: this._format('mm:ss')(this.videoElement.duration),
			currentTime: this._format('mm:ss')(this.videoElement.currentTime)
		});*/

		let { setData } = this.props;

		setData({
			isLoaded: true,
			totalTime: this._format('mm:ss')(this.videoElement.duration),
			currentTime: this._format('mm:ss')(this.videoElement.currentTime)
		});
	}

	timeupdate = () => {
		let { setData } = this.props;

		setData({
			progress: this.videoElement.currentTime * 100 / this.videoElement.duration,
			currentTime: this._format('mm:ss')(this.videoElement.currentTime)
		});
	}

	playpause = () => {
		this.videoElement.paused ? this.videoElement.play() : this.videoElement.pause();

		/*this.setState({
			isPlaying: !this.videoElement.paused
		});*/

		let { setData } = this.props;

		setData({
			isPlaying: !this.videoElement.paused
		});
	}

	progress = () => {
		if (!this.videoElement.buffered.length) return;

		let loadedPercentage = 100 * this.videoElement.buffered.end(0) / this.videoElement.duration;

		// this.setState({ buffered: loadedPercentage });

		store.dispatch( setVideo({
			buffered: loadedPercentage
		}) );
	}

	download = () => {
		let link = document.createElement('a');
		link.href = this.videoElement.src;
		link.setAttribute('target', 'blank');
		link.setAttribute('download', this.videoElement.src);
		link.click();
	}

	changeCurrentTime = event => {
		let shift = event.clientX - this.videoElement.parentNode.offsetLeft - this.progressBar.offsetLeft;
		let width = this.progressBar.offsetWidth;
		this.videoElement.currentTime = shift * this.videoElement.duration / width;
	}

	render() {
		let {
			classes,
			controls,
			src
		} = this.props;

		let {
			isLoaded,
			totalTime,
			currentTime,
			progress,
			buffered,
			isPlaying
		} = this.props;

		// console.log('this.props', this.props);
		console.log('store', store.getState());

		return <div className={classnames(classes.root, isPlaying ? 'playing' : '')}>
			<video
				hidden={!isLoaded}
				src={src}
				controls={false}
				className={classes.video}
				poster="/assets/images/no-video.jpg"
				ref={el => this.videoElement = el}
				onLoadedData={this.loadedData}
				onProgress={this.progress}
				onTimeUpdate={this.timeupdate}
				onKeyUp={() => this.videoElement ? this.videoElement.onkeyup : () => {}}
			></video>

			{isLoaded && controls &&
			<div className={classnames(classes.controls)}>
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

				<div className={classes.progressBar} ref={el => this.progressBar = el} onClick={this.changeCurrentTime}>
					<div className={classes.progressLine} style={{ width: `${progress}%` }}></div>
					<div className={classes.bufferedLine} style={{ width: `${buffered}%` }}></div>
				</div>
			</div>
			}
		</div>
	}
}

const mapStateToProps = state => {
	let { video } = state;

	return {
		isLoaded: video.isLoaded,
		progress: video.progress,
		buffered: video.buffered,
		isPlaying: video.isPlaying,
		totalTime: video.totalTime,
		currentTime: video.currentTime,
	};
};

let mapDispatchToProps = dispatch => ({
	setData(data) {
		dispatch(setVideo(data));
	}
});

const Video = connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ConnectedVideo));

export default Video;