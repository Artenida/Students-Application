import Banner from "../../components/Events/Banner"
import Card from "../../components/Events/Card"
import Searchbar from "../../components/Searchbar"

const Events = () => {
    return (
        <div className=" flex flex-col pl-[70px]">
            <div className="flex h-[300px]">
                <Banner />
                {/* <Searchbar onChange={} /> */}
            </div>
            <div className="pt-4">
                <Card />
            </div>
        </div>
    )
}

export default Events