import React from 'react';

import { Button } from 'react-bootstrap';
import { useQueryClient } from 'react-query';

import { getParkingRoute } from '../../../constants/apiRoute';
import emulateEscKeyPress from '../../../functions/emulateEscKeyPress';
import useFetchParkingInformation from '../../../hooks/useFetchParkingInformation';
import useMutationWithToken from '../../../hooks/useMutationWithToken';
import useResetVariables from '../../../hooks/useResetVariables';

interface Props {
  parkingId: string;
}

const DeleteParkingButton = ({ parkingId }: Props) => {
  const { mutate } = useMutationWithToken(getParkingRoute(parkingId), 'delete');
  const { resetVariables } = useResetVariables();
  const queryClient = useQueryClient();

  const { getParkingInfo } = useFetchParkingInformation();

  const handleClick = () => {
    if (window.confirm('Are you sure you want to delete this parking?')) {
      mutate(
        {},
        {
          onSuccess: () => {
            queryClient.refetchQueries();
            emulateEscKeyPress();
            resetVariables();
            getParkingInfo();
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
