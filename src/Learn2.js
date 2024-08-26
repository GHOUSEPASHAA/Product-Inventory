import React, { useState } from 'react'

const Learn2 = () => {
    const [productname, setproduct] = useState();
    const [productquantity, setproductquantity] = usestate();
    const handleaddchange = async () => {
        try {
            const formdata = new FormData();
            formdata.append(`productname`, productname);
            formdata.append(`productquantity`, productquantity);
}

        const response = await axios.post(`http://localhost/3000/api/product`, formdata, {
            headers: {
                `contenttype`:`multipart`
            }
        });
const handleimagechange = (e) => {
    const selectedimage = e.target.files[0];
    selectedimage(selectedimage)
};
return (
    productname
    < input 
    type = "text"
    value ={productname}
        onchange ={(e)=>setproductname(e.target.value)}
    />
)

        
    }
}
export default Learn2;