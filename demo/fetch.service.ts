import { Company } from '../types';

export const getData = async (callback: (response: Company[]) => void) => {
  try {
    const data = await fetch('http://localhost:3001/data', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
    const response: Company[] = await data.json();
    callback(response);
  } catch (e) {
    console.error(e);
  }
};
