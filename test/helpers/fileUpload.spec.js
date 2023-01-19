import { fileUpload } from '../../src/helpers/fileUpload';
import { v2 as cloudinary } from 'cloudinary';

const {
  VITE_APP_CLOUDINARI_CLOUD_NAME,
  VITE_APP_CLOUDINARI_API_KEY,
  VITE_APP_CLOUDINARI_API_SECRET,
} = import.meta.env;

cloudinary.config({
  cloud_name: VITE_APP_CLOUDINARI_CLOUD_NAME,
  api_key: VITE_APP_CLOUDINARI_API_KEY,
  api_secret: VITE_APP_CLOUDINARI_API_SECRET,
  secure: true,
});

describe('FileUpload', () => {
  test('should upload file ', async () => {
    const imageUrl =
      'https://blog.logrocket.com/wp-content/uploads/2022/11/Implementing-secure-sign-on-Nest-js-Google.png';
    const res = await fetch(imageUrl);
    const blob = await res.blob();
    const file = new File([blob], 'image.jpg');
    const url = await fileUpload(file);
    expect(typeof url).toBe('string');

    const imageId = url.split('/').pop().replace('.png', '');

    await cloudinary.api.delete_resources([`journal/${imageId}`], {
      resource_type: 'image',
    });
  });

  test('should upload file return NULL ', async () => {
    const url = await fileUpload();
    expect(url).toBe(null);
  });
});
