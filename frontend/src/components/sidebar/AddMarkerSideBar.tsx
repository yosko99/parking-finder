import React from 'react';

import { useAtom } from 'jotai';
import { Button, Form } from 'react-bootstrap';
import { useQueryClient } from 'react-query';
// @ts-ignore
import Fade from 'react-reveal/Fade';

import isAddMarkerToggledAtom from '../../atoms/isAddMarkerToggled.atom';
import newMarkerAddressAtom from '../../atoms/newMarkerAddressAtom.atom';
import { getParkingsRoute } from '../../constants/apiRoute';
import useAuthenticatedFormSubmit from '../../hooks/useAuthenticatedFormSubmit';
import useFormUpdate from '../../hooks/useFormUpdate';
import LoadingSpinner from '../utils/LoadingSpinner';

const AddMarkerSideBar = () => {
  const queryClient = useQueryClient();

  const [newMarkerAddress, setNewMarkerAddress] = useAtom(newMarkerAddressAtom);
  const [isAddMarkerToggled, setIsAddMarkerToggled] = useAtom(
    isAddMarkerToggledAtom
  );

  const { formData, handleChange } = useFormUpdate();
  const { alert, handleSubmit, isLoading } = useAuthenticatedFormSubmit(
    getParkingsRoute(),
    false,
    () => {
      setIsAddMarkerToggled(false);
      setNewMarkerAddress(null);
      queryClient.refetchQueries();
    }
  );

  const handleCreateMarker = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    handleSubmit({
      ...formData,
      lat: newMarkerAddress?.coords.lat,
      lng: newMarkerAddress?.coords.lng,
      address: newMarkerAddress?.address
    });
  };

  return (
    <Fade bottom>
      <p className="text-center mt-3 mb-0 fs-3">Add new parking</p>
      <Form
        onChange={handleChange}
        onSubmit={handleCreateMarker}
        className="p-4"
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
        <Form.Group className="mb-3">
          <Form.Label>
            Address <span className="text-muted">(Select on map)</span>
          </Form.Label>
          <Form.Control
            required
            type="text"
            value={newMarkerAddress?.address || ''}
            name="address"
            placeholder="Rousse, Bulgaria"
          />
        </Form.Group>
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
            placeholder="10"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Parking size</Form.Label>
          <Form.Control
            required
            type="number"
            name="parkingSize"
            placeholder="50"
          />
        </Form.Group>
        <Button type="submit" variant="success w-100">
          Submit
        </Button>
        {alert}
        {isLoading && <LoadingSpinner />}
      </Form>
    </Fade>
  );
};

export default AddMarkerSideBar;
