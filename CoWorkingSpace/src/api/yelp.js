import axios from 'axios';

export default axios.create({
    baseURL: 'https://api.yelp.com/v3/businesses',
    headers: {
        Authorization: 'Bearer XRQeOlaxHVuBveLUVVx64VJba0DfRL8y8UkajaYTOail18we36Iu6wWFm5T_pUqcS5Exl-JWLyhjQM8EfQAOzHvQyLsJe72q9_I3DnJGWQ55p6K6iQHqRLYNM8FpXnYx',
    }
});