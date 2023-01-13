export const fileUpload = async (file) => {
  if (!file) throw new Error('No file selected.');

  const cloudUrl = `${import.meta.env.VITE_APP_CLOUDINARI_URL}/upload`;

  const formData = new FormData();

  formData.append(
    'upload_preset',
    import.meta.env.VITE_APP_CLOUDINARI_UPLOAD_PRESET
  );
  formData.append('file', file);

  try {
    const res = await fetch(cloudUrl, {
      method: 'POST',
      body: formData,
    });

    if (!res.ok) throw new Error('File has not updload.');

    const cloudRes = await res.json();
    return cloudRes.secure_url;
  } catch (error) {
    throw new Error(error.message);
  }
};
