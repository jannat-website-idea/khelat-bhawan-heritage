export function getAssetUrl(path) {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path;
  }
  let clean = path.replace(/^\/+/, '');
  if (clean.includes('unnamed (1).webp')) {
    clean = clean.replace('unnamed (1).webp', 'unnamed_1.webp');
  }
  if (clean.includes('unnamed (2).webp')) {
    clean = clean.replace('unnamed (2).webp', 'unnamed_13.webp');
  }
  if (clean.includes('khelat bhaban video.mp4')) {
    clean = clean.replace('khelat bhaban video.mp4', 'khelat-bhawan-video.mp4');
  }
  const base = import.meta.env.BASE_URL || '/';
  const url = base.endsWith('/') ? `${base}${clean}` : `${base}/${clean}`;
  return encodeURI(url);
}
