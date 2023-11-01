import { useLoaderData } from "react-router-dom";


const CheckOut = () => {
    const service = useLoaderData();
    return (
        <div>
            <h1>Book Service : {service.title}</h1>

        </div>
    );
};

export default CheckOut;