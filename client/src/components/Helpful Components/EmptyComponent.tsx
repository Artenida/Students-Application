import empty from "../../assets/empty1.jpg"

const EmptyComponent = () => {
    return (
        <div className="flex justify-center flex-col mb-20 mt-8">
            <img src={empty} alt="" className="h-[500px]"/>
            <h1 className="text-custom-color3 font-bold text-3xl text-center px-4">No events found for this topic</h1>
            <h2 className="text-custom-color3 font-semibold text-2xl text-center px-4">Try to search another one</h2>
        </div>
    )
}

export default EmptyComponent