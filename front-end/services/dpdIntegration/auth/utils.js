export function mapAuthUser(user) {
    return Object.assign({}, user, {
        email: user.username,
    });
}
