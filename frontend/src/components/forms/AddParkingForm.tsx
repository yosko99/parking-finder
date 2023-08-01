import React, { useEffect } from 'react';

import { useAtom, useSetAtom } from 'jotai';
import { Button, Form } from 'react-bootstrap';

import isAddParkingToggledAtom from '../../atoms/isAddParkingToggledAtom.atom';
import mainMapAtom from '../../atoms/mainMap.atom';
import newMarkerAddressAtom from '../../atoms/newMarkerAddressAtom.atom';
import parkingSpacesAtom from '../../atoms/parkingSpaces.atom';
import { getParkingsRoute } from '../../constants/apiRoute';
import updateNewMarkerAddress from '../../functions/updateNewMarkerAddress';
import useAuthenticatedFormSubmit from '../../hooks/useAuthenticatedFormSubmit';
import useFormUpdate from '../../hooks/useFormUpdate';
import ParkingAddressInput from '../inputs/ParkingAddressInput';
import LoadingSpinner from '../utils/LoadingSpinner';

const AddParkingForm = () => {
  const [newMarkerAddress, setNewMarkerAddress] = useAtom(newMarkerAddressAtom);
  const setIsAddMarkerToggled = useSetAtom(isAddParkingToggledAtom);
  const [parkingSpaces, setParkingSpaces] = useAtom(parkingSpacesAtom);
  const [mainMap] = useAtom(mainMapAtom);

  const { formData, handleChange } = useFormUpdate();
  const { alert, handleSubmit, isLoading } = useAuthenticatedFormSubmit(
    getParkingsRoute(),
    false,
    true,
    () => {
      setIsAddMarkerToggled(false);
      setNewMarkerAddress(null);
      setParkingSpaces([]);

      if (mainMap !== null) {
        mainMap.setOptions({ draggable: true, zoomControl: true });
      }
    }
  );

  const handleCreateMarker = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (mainMap !== null) {
      handleSubmit({
        ...formData,
        lat: mainMap.getCenter()?.lat(),
        lng: mainMap.getCenter()?.lng(),
        mapZoomLevel: mainMap.getZoom(),
        address: newMarkerAddress?.address,
        parkingSize: parkingSpaces.length,
        parkingSpaces: parkingSpaces.map((space) => {
          return { paths: space.paths };
        })
      });
    }
  };

  useEffect(() => {
    if (mainMap !== null) {
      updateNewMarkerAddress(
        mainMap.getCenter()!.lat(),
        mainMap.getCenter()!.lng(),
        setNewMarkerAddress
      );
    }
  }, []);

  return (
    <Form
      onChange={handleChange}
      onSubmit={handleCreateMarker}
      className="p-4 text-dark"
    >
      <Form.Group className="mb-3">
        <Form.Label>Title</Form.Label>
        <Form.Control
          required
          type="text"
          name="title"
          placeholder="My parking"
        />
      </Form.Group>
      <ParkingAddressInput address={newMarkerAddress?.address || ''} />
      <Form.Group className="mb-3">
        <Form.Label>Description about the parking</Form.Label>
        <Form.Control
          required
          as="textarea"
          name="description"
          placeholder="Lorem ipsum"
          rows={3}
          minLength={10}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Hourly price</Form.Label>
        <Form.Control
          required
          type="number"
          name="hourlyPrice"
          min={0}
          placeholder="10"
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Parking size</Form.Label>
        <Form.Control
          value={parkingSpaces.length}
          readOnly
          required
          type="number"
          name="parkingSize"
          min={1}
        />
      </Form.Group>
      <Button type="submit" variant="success w-100">
        Submit
      </Button>
      {alert}
      {isLoading && <LoadingSpinner />}
    </Form>
  );
};

export default AddParkingForm;
