export function mapUser (user) {
    return {
        id: user.id,
        email: user.username,
        role: user.role
    };
}
