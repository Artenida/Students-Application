import Card from "../components/Events/Card"
import Searchbar from "../components/Searchbar"

const Events = () => {
    return (
        <div>
            <div className="flex bg-custom-color2 h-[300px]">
                {/* <Searchbar onChange={} /> */}
                Searchbar here
            </div>
            <div>
                <Card />
            </div>
        </div>
    )
}

export default Events