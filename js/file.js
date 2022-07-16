const FILE_TYPES = [
  'gif',
  'jpg',
  'jpeg',
  'png'
];
const avatarUploaderElement = document.querySelector('#avatar');
const avatarPreviewElement = document.querySelector('.ad-form-header__preview img');

const photoUploaderElement = document.querySelector('#images');
const photoPreviewContainerElement = document.querySelector('.ad-form__photo');

const createPhotoPreviewElement = () => {
  const photoPreviewElement = document.createElement('img');
  photoPreviewElement.alt = 'Фото объекта размещения';
  photoPreviewElement.width = '70';
  photoPreviewElement.height = '70';

  photoPreviewContainerElement.appendChild(photoPreviewElement);
};

const setDefaultAvatar = () => {
  avatarPreviewElement.src = 'img/muffin-grey.svg';
};

const removePhotos = () => {
  if (photoPreviewContainerElement.children.length > 0) {
    photoPreviewContainerElement.children[0].remove();
  }
};
const onPhotoUpload = () => {
  removePhotos();
  const fileName = photoUploaderElement.files[0].name.toLowerCase();
  const isImage = FILE_TYPES.some((item) => fileName.endsWith(item));

  if (isImage) {
    createPhotoPreviewElement();
    photoPreviewContainerElement.querySelector('.ad-form__photo img').src = URL.createObjectURL(photoUploaderElement.files[0]);
  }
};

const onAvatarUpload = () => {
  const fileName = avatarUploaderElement.files[0].name.toLowerCase();
  const isImage = FILE_TYPES.some((item) => fileName.endsWith(item));

  if (isImage) {
    avatarPreviewElement.src = URL.createObjectURL(avatarUploaderElement.files[0]);
  }
};

const setAvatarUploadListener = () => avatarUploaderElement.addEventListener('change',onAvatarUpload);
const setPhotoUploadListener = () => photoUploaderElement.addEventListener('change',onPhotoUpload);

export {
  setAvatarUploadListener,
  setPhotoUploadListener,
  setDefaultAvatar,
  removePhotos
};
