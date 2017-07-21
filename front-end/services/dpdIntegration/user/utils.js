export function mapAuthUser(user) {
    return Object.assign({}, user, {
        email: user.username,
    });
}

export function mapUser (user) {
    return {
        id: user.id,
        email: user.username,
        role: user.role
    };
}
