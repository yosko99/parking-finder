import ICoordinate from './ICoordinate';

interface IGeocodingResponse {
  status: string;
  formatted_address: string;
  results: {
    geometry: {
      location: ICoordinate;
    };
  }[];
}

export default IGeocodingResponse;
