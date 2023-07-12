import ICoordinate from './ICoordinate';

interface IGeocodingResponse {
  status: string;
  formatted_address: string;
  results: {
    geometry: {
      location: ICoordinate;
    };
    formatted_address: string;
  }[];
}

export default IGeocodingResponse;
