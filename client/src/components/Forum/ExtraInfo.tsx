import share from "../../assets/share.jpg"

const ExtraInfo = () => {
    return (
        <div className="w-[350px] bg-custom-color4 p-4 text-white rounded-md">
            <h1 className="text-3xl">Wanna be part of us</h1>
            <p className="text-[18px]">Suggest a topic you could help the community with</p>
            <button className="bg-custom-color5 text-white py-2 px-4 my-2 rounded-md">Start sharing</button>
            <p>-------------------------------------------------</p>
            <h2 className="text-2xl">Why you should join?</h2>
            <p className="text-[18px]">This forum is created to give the students the opportunity to share thoughts.
                to share opinions and experiences with each other, to make the life of each of one
                easier, and to help everyone who is having a question in their mind. 
            </p>
            <img src={share} alt="" className="mt-2"/>
        </div>
    )
}

export default ExtraInfo;