import {
} from '@redux/constants/action-types';

let initialState = {
	test: {}
};

function rootReducer(state = initialState, action) {
	switch (action.type) {
		case 'TEST': return Object.assign({}, state, { test: { ...action.payload }});
	}

	return state;
}

export default rootReducer;