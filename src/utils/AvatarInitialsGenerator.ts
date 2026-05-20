import randomColorGenerator from './RandomColorGenerator';

const avatarInitialsGenerator = (name: string) => {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  let initials = '?';
  if (parts.length === 0) {
    initials = '?';
  } else if (parts.length === 1) {
    const word = parts[0];
    initials = (word.slice(0, 2) || '?').toUpperCase();
  } else {
    const first = parts[0][0] ?? '';
    const last = parts[parts.length - 1][0] ?? '';
    initials = `${first}${last}`.toUpperCase() || '?';
  }

  return {
    sx: {
      bgcolor: randomColorGenerator(),
    },
    children: initials,
  };
};

export default avatarInitialsGenerator;
