export const downloadBlob = (obj, name = 'download') => {
  const url = URL.createObjectURL(obj.data);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${name}.pdf`;
  a.style.display = 'none';
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
};

export const getStars = (rating = 0) => {
  return Math.floor(rating / 0.5) * 0.5;
};
