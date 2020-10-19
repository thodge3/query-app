import axios from 'axios';
// import moment from 'moment';
// import _ from 'lodash';

const url = 'http://192.168.1.106:5000';

export const getUsers = async (queryParam) => {

    if (!queryParam) {
        try {
            console.log("executing get query.")
            const response = await axios.get(`${url}/faker`)
            if (response.status === 200) {
                return response.data;
            } else {
                console.log(response.status);
            }
        } catch (error) {
            console.log(error);
        }
    } else {
        try {
            const response = await axios.post(`${url}/faker`,
            queryParam
            )
            if (response.status === 200) {
                return response.data;
            } else {
                console.log(response.status);
            }
        } catch (error) {
            console.log(error);
        }
    }

}