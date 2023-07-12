import React from 'react';

import { useAtom } from 'jotai';
import { Button, Form } from 'react-bootstrap';
// @ts-ignore
import Fade from 'react-reveal/Fade';

import newMarkerAddressAtom from '../../atoms/newMarkerAddressAtom.atom';
import useFormUpdate from '../../hooks/useFormUpdate';

const AddMarkerSideBar = () => {
  const { formData, handleChange } = useFormUpdate();
  const [mapAddress] = useAtom(newMarkerAddressAtom);

  return (
    <Fade bottom>
      <p className="text-center mt-3 mb-0 fs-3">Add new parking</p>
      <Form onChange={handleChange} className="p-4">
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
            value={mapAddress?.address || ''}
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
        <Button variant="success w-100">Submit</Button>
      </Form>
    </Fade>
  );
};

export default AddMarkerSideBar;
