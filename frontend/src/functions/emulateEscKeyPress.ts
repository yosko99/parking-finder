const emulateEscKeyPress = () => {
  const escKeyDownEvent = new KeyboardEvent('keydown', {
    key: 'Escape',
    keyCode: 27
  });
  document.dispatchEvent(escKeyDownEvent);
};

export default emulateEscKeyPress;
