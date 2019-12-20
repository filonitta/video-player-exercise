import {
	SET_VIDEO,
} from './../constants/action-types';

export function setVideo(payload) {
	return { type: SET_VIDEO, payload };
}