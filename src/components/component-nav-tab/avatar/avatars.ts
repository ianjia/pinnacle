export const AVATAR_KEYS = ['default', 'dog', 'giraffe', 'lion', 'squirrel'] as const;
export const avatarSrc   = (key: string) => `/assets/images/avatar/${key}.png`;
