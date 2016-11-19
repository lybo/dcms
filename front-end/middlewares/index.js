import { redirect } from 'redux-router-director'
let urlAttempt = '';
export const auth = (ctx, next) => {
    if (!ctx.state.auth_user.id) {
        redirect('/login');
    }

    next();
};
