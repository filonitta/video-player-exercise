// import _ from 'lodash';

import {
	SET_VIDEO,
} from '@redux/constants/action-types';

let initialState = {
	video: {
	},
	isLoaded: false,
	progress: 0,
	buffered: 0,
	isPlaying: false,
	totalTime: '',
	currentTime: '',
};

function rootReducer(state = initialState, action) {
	switch (action.type) {
		case SET_VIDEO: {
			// let { video } = state;
			// Object.assign(video, { ...action.payload });
			// console.log('state', state);
			// return _.merge(state, {video: { ...action.payload }});
			// return Object.assign({}, state, {video: { ...action.payload }});
			return Object.assign({}, state, { ...action.payload });
		}
	}

	return state;
}

export default rootReducer;