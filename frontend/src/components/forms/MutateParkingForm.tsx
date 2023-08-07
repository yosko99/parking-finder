import React, { useEffect } from 'react';

import { useAtom, useSetAtom } from 'jotai';
import { Button, Form } from 'react-bootstrap';
import { useQueryClient } from 'react-query';
import { toast } from 'react-toastify';

import isAddParkingToggledAtom from '../../atoms/isAddParkingToggledAtom.atom';
import mainMapAtom from '../../atoms/mainMap.atom';
import newMarkerAddressAtom from '../../atoms/newMarkerAddressAtom.atom';
import parkingForEditAtom from '../../atoms/parkingForEdit.atom';
import parkingSpacesAtom from '../../atoms/parkingSpaces.atom';
import { getParkingRoute, getParkingsRoute } from '../../constants/apiRoute';
import { MutateParkingDto } from '../../dtos/MutateParkingDto';
import updateNewMarkerAddress from '../../functions/updateNewMarkerAddress';
import useFetchParkingInformation from '../../hooks/useFetchParkingInformation';
import useFormUpdate from '../../hooks/useFormUpdate';
import useMutationWithToken from '../../hooks/useMutationWithToken';
import IResponseError from '../../interfaces/IResponseError';
import RequestType from '../../types/RequestType';
import ParkingAddressInput from '../inputs/ParkingAddressInput';
import LoadingSpinner from '../utils/LoadingSpinner';

const MutateParkingForm = () => {
  const [newMarkerAddress, setNewMarkerAddress] = useAtom(newMarkerAddressAtom);
  const setIsAddMarkerToggled = useSetAtom(isAddParkingToggledAtom);
  const [parkingSpaces, setParkingSpaces] = useAtom(parkingSpacesAtom);
  const [mainMap] = useAtom(mainMapAtom);
  const [parkingForEdit, setParkingForEdit] = useAtom(parkingForEditAtom);
  const queryClient = useQueryClient();

  const { getParkingInfo } = useFetchParkingInformation();

  const url =
    parkingForEdit !== null
      ? getParkingRoute(parkingForEdit.id)
      : getParkingsRoute();

  const { formData, handleChange } = useFormUpdate<MutateParkingDto>({
    description: parkingForEdit?.description || '',
    title: parkingForEdit?.title || '',
    hourlyPrice: parkingForEdit?.hourlyPrice || 0
  });
  const requestType: RequestType = parkingForEdit !== null ? 'put' : 'post';
  const { mutate, isLoading } = useMutationWithToken(url, requestType);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (mainMap !== null) {
      mutate(
        {
          ...formData,
          lat: newMarkerAddress?.coords.lat,
          lng: newMarkerAddress?.coords.lng,
          mapZoomLevel: mainMap.getZoom(),
          address: newMarkerAddress?.address,
          parkingSize: parkingSpaces.length,
          parkingSpaces: parkingSpaces.map((space) => {
            return { paths: space.paths, angle: space.angle };
          })
        },
        {
          onSuccess: (data) => {
            setIsAddMarkerToggled(false);
            setNewMarkerAddress(null);
            setParkingSpaces([]);
            setParkingForEdit(null);

            if (mainMap !== null) {
              mainMap.setOptions({ draggable: true, zoomControl: true });
            }
            toast.success(data.message);
            queryClient.refetchQueries();
            getParkingInfo();
          },
          onError: (err) => {
            const error = err as IResponseError;
            const message = error.response.data.message;
            if (Array.isArray(message)) {
              toast.error(message[0]);
            } else {
              toast.error(message);
            }
          }
        }
      );
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
      onSubmit={handleSubmit}
      className="p-4 text-dark"
    >
      <Form.Group className="mb-3">
        <Form.Label>Title</Form.Label>
        <Form.Control
          required
          type="text"
          name="title"
          defaultValue={parkingForEdit !== null ? parkingForEdit.title : ''}
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
          defaultValue={
            parkingForEdit !== null ? parkingForEdit.description : ''
          }
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
          defaultValue={
            parkingForEdit !== null ? parkingForEdit.hourlyPrice : 0
          }
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
      {isLoading && <LoadingSpinner />}
    </Form>
  );
};

export default MutateParkingForm;
