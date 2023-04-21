import {useEffect, useState} from 'react';
import yelp from '../api/yelp';

export default () => {
  const [response, setResponse] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [onload, setOnload] = useState(true);

  const searchWorkingSpace = async (searchTerm) => {
    setOnload(true)
    try {
      const response = await yelp.get('/search', {
        params: {
          limit: 50,
          term: searchTerm,
          location: 'san jose',
        },
      });
      console.log('Success !!')
      setResponse(response.data.businesses);
      setErrorMessage('');
      setOnload(false)
    } catch (err) {
      console.log(err)
      setResponse([])
      setErrorMessage('Error Something');
      setOnload(false)
    }
  };

  useEffect(() => {
    searchWorkingSpace('Pasta')
  }, []);

  return [searchWorkingSpace, response, errorMessage, onload];
};
