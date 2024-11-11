export const downloadBlob = (obj,name='download') => {
  console.log(obj)
  const url = URL.createObjectURL(obj.data);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${name}.pdf`;
  a.style.display = 'none';
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);

}