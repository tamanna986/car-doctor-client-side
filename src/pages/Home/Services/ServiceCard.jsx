
import { BsArrowRight } from "react-icons/bs";
import { Link } from "react-router-dom";


const ServiceCard = ({ service }) => {
    const { _id, title, img, price } = service;
    return (
        <div className="card  bg-base-100 shadow-xl">
            <figure className="px-10 pt-10">
                <img src={img} alt="Shoes" className="rounded-xl" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{title}</h2>
                <div className="flex justify-between items-center">
                <p className="text-xl text-orange-500">Price: ${price}</p>
                 <BsArrowRight></BsArrowRight>
                </div>
                <Link to = {`/book/${_id}`}>
                <button className="btn btn-outline btn-warning w-full">Book Now</button>
                </Link>
              
            </div>
        </div>
    );
};

export default ServiceCard;