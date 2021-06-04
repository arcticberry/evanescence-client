import { combineReducers } from 'redux';

import register from './register/register.slice';
import core from './core/core.slice';
import profile from './profile/profile.slice';
import service from './application/service.slice';
import application from './application/application.slice';

export default combineReducers({
	core,
	register,
	profile,
	service,
	application,
});
