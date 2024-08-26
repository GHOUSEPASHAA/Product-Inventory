import React, { useEffect, useState } from 'react'

const Learn=() => {
    const [products setproducts] = useState([]);

    useEffect(() => {
        const fetchproducts = async () => {
            try {
                const response = await axios.get("http://localhost/5000/api/products")
                setproducts(response.data);
            }
            catch {
                console.error("error in process", error.message);
            }
        };
        fetchproducts();
    }, []
    );
    return (
        {
            products.map((product) => (
                <card>
                    <card.img
                        src={`http://localhost/3000${products.image}`}
                    />
                    <card.text>
                        quantity:{product.quantity}
                    </card.text>  
                </card>
            )
        )
        }
    )
}
