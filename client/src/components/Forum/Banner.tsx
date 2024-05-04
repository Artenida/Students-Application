import think from "../../assets/think2-removebg-preview.png"

const Banner = () => {
    return (
        <div className="flex justify-between items-center bg-custom-color4 px-12 rounded-md">
            <div className="flex items-center gap-4">
                <img src={think} alt="Thinking man" width="25px" height="25px"/>
                <h2 className="text-white font-semibold">Got something on your mind?</h2>
            </div>
            <button className="bg-custom-color5 text-white py-2 px-4 my-2 rounded-md">Ask the community</button>
        </div>
    )
}

export default Banner