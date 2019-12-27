import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import Close from '@material-ui/icons/Close';

const styles = {
	root: {
		position: 'relative'
	},
	list: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-around',
		position: 'absolute',
		transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1) 0ms',
		zIndex: '-1',
		opacity: 0,
		top: '50%',
		transform: 'translateY(-50%)',
		'&.left': {
			flexDirection: 'row',
			right: 0,
		},
		'&.right': {
			flexDirection: 'row',
			left: 0,
		},
		'&.top': {
			flexDirection: 'column',
			top: 0,
			// right: 0,
			transform: 'translateY(-100%)'
		},
		'&.bottom': {
			flexDirection: 'column',
			bottom: 0,
			// right: 0,
			top: 'initial',
			transform: 'translateY(100%)'
		},
		'&.left > *': {
			marginLeft: '-10px',
			transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1) 0ms',
		},
		'&.right > *': {
			marginRight: '-10px',
			transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1) 0ms',
		},
		'&.top > *': {
			marginBottom: '-10px',
			transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1) 0ms',
		},
		'&.bottom > *': {
			marginTop: '-10px',
			transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1) 0ms',
		}
	},
	listIn: {
		opacity: 1,
		zIndex: '0',
		'&.left': {
			right: '50px',
		},
		'&.left > *': {
			marginLeft: '10px'
		},
		'&.right': {
			left: '50px',
		},
		'&.right > *': {
			marginRight: '10px'
		},
		'&.top > *': {
			marginBottom: '10px'
		},
		'&.bottom > *': {
			marginTop: '10px'
		}
	}
};

class FabList extends React.PureComponent {
	static defaultProps = {
		size: 'medium',
		orientation: 'left',
		hidden: false,
		children: null,
		icon: null,
		color: null
	};

	static propTypes = {
		size: PropTypes.string,
		orientation: PropTypes.string,
		children: PropTypes.node,
		classes: PropTypes.object,
		icon: PropTypes.node,
		className: PropTypes.string,
		hidden: PropTypes.bool,
		color: PropTypes.string
	};

	constructor(props) {
		super(props);

		this.defaultIcon = this.props.icon;

		this.state = {
			showList: false,
			icon: this.defaultIcon
		}
	}

	onClick = () => {
		const showList = !this.state.showList;
		const icon = showList ? <Close /> : this.defaultIcon;

		this.setState({ showList, icon });
	}

	render() {
		const {
			classes,
			hidden,
			size,
			orientation,
			className,
			children
		} = this.props;

		return <div className={classnames(classes.root, className)} hidden={hidden}>
			<Fab size={size} color={this.props.color || (this.state.showList ? 'secondary' : 'primary')} onClick={this.onClick}>
				{this.state.icon}
			</Fab>

			<div className={classnames(classes.list, orientation, (this.state.showList ? classes.listIn : ''))}>
				{children}
			</div>
		</div>
	}
}

export default withStyles(styles)(FabList);