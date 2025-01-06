import { Carousel } from "flowbite-react"

import PropTypes from 'prop-types';

function Carousell({ furniture , page}) {
    let h ;
    let w;
    if(page === 'products'){
        h = 'h-[350px]';
        w = 'w-[600px]';
    }
    if(page === 'product'){
        h = 'h-[490px]';
        w = 'w-[700px]';
    }
    if(page === 'cart'){
        h = 'h-[400px]';
        w = 'w-[400px]';
    }
    return (
        <div className={`${h} ${w}`}> {/* Added container with fixed dimensions */}
            <Carousel slideInterval={2000}>
                {furniture.image?.map((img, index) => (
                    <img
                        key={index}
                        src={img.url}
                        alt={`${furniture.name} - view ${index + 1}`}
                        className="h-full w-full object-cover"
                    />
                ))}
            </Carousel>
        </div>
    )

}

Carousell.propTypes = {
    furniture: PropTypes.object.isRequired,
    page: PropTypes.string.isRequired,
};
export default Carousell