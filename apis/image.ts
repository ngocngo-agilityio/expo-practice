export const uploadToCloudinary = async (uri: string) => {
  const cloudName = process.env.EXPO_PUBLIC_CLOUD_NAME;
  const uploadPreset = process.env.EXPO_PUBLIC_UPLOAD_PRESET || '';

  const formData = new FormData();
  formData.append('file', {
    uri,
    type: 'image/jpeg',
    name: `image_${Date.now()}.jpg`,
  } as any);
  formData.append('upload_preset', uploadPreset);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    {
      method: 'POST',
      body: formData,
    },
  );

  const data = await res.json();

  return data.secure_url;
};
