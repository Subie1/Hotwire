const users = MainStorage.box("users");

module.exports = (token) => {
    const members = Array.from(users.values());
    for (const member of members) if (member.token === token) return member;
    return null;
}