const handleMapLock = (
  // eslint-disable-next-line no-undef
  mainMap: google.maps.Map,
  isAddParkingToggled: boolean
) => {
  mainMap?.setOptions({
    draggable: isAddParkingToggled,
    zoomControl: isAddParkingToggled
  });
};

export default handleMapLock;
