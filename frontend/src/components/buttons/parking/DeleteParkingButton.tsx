import React from 'react';

import { Button } from 'react-bootstrap';
import { useQueryClient } from 'react-query';
import { toast } from 'react-toastify';

import { getParkingRoute } from '../../../constants/apiRoute';
import emulateEscKeyPress from '../../../functions/emulateEscKeyPress';
import useMutationWithToken from '../../../hooks/useMutationWithToken';

interface Props {
  parkingId: string;
}

const DeleteParkingButton = ({ parkingId }: Props) => {
  const queryClient = useQueryClient();
  const { mutate, data } = useMutationWithToken(
    getParkingRoute(parkingId),
    'delete'
  );

  const handleClick = () => {
    if (window.confirm('Are you sure you want to delete this parking?')) {
      mutate(
        {},
        {
          onSuccess: () => {
            queryClient.refetchQueries();
            toast.success(data.message);
            emulateEscKeyPress();
          }
        }
      );
    }
  };

  return (
    <Button onClick={handleClick} className="w-100" variant="danger">
      Delete parking
    </Button>
  );
};

export default DeleteParkingButton;
