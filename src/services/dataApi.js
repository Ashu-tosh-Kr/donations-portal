import axios from 'axios';
import {v4 as uudi } from 'uuid';

/**
 * @returns Fetches the data from DB and Formatts donations data for tabs and tables
 */
export const GET_DONATION_TYPES = () => {
    return new Promise((resolve, reject)=> {
        const BASE_URL =  process.env.REACT_APP_BASE_URL;
        const url = `${BASE_URL}/user/services/getCommonData`;
        axios.get(url,{
            headers: {
                'Content-Type': 'application/json',
              },
              params: {
                  actionId: 'businesstypeprofile',
                  product: '895892fa-127e-4dbf-941e-3e4486a834af',
                  dataJson: {"aspectType": 'Donation Setup'}
              }
        })
        .then((res)=>{
            const resData = res.data || {};
            let data = resData.data || [];
            let donationsData = [];
            data.forEach((rec) => {
                let index = donationsData.findIndex((item) => item.typeName === rec.typeName);
                if(index === -1) {
                    donationsData.push({
                        typeName: rec.typeName,
                        types: [{
                            name: rec.refDataName || '',
                            amount: rec.amount || 0,
                            key: uudi()
                        }]
                    })
                } else {
                    donationsData[index].types.push({
                        name: rec.refDataName || '',
                        amount: rec.amount || 0,
                        key: uudi()
                    })
                }
            });
            resolve(donationsData || [])
        })
        .catch((err)=>{
            reject(err);
        })
    });
}
/**
 * Fetches user data based on email or phone
*/
export const GET_USER_DETAILS = (values) => {
    const data = {...values};
    return new Promise((resolve, reject) => {
        const BASE_URL = process.env.REACT_APP_BASE_URL;
        const url = `${BASE_URL}/user/services/fetchUserDetails`;
        axios.post(url, data)
            .then((res) => {
                resolve(res.data && res.data.length > 0 ? res.data[0] : {});
            })
            .catch((err) => {
                reject(err);
            })
    });
}
