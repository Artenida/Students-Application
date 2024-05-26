import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectEvent } from "../../redux/forum/eventSlice";
import { useEffect } from "react";
import Loading from "../../components/Loading";
import { getSingleEvent } from "../../api/eventThunk";

const EventDetails = () => {
  const dispatch = useAppDispatch();
  const { eventDetails, retrieveError, loading } = useAppSelector(selectEvent);
  const {id} = useParams();

  useEffect(() => {
    dispatch(getSingleEvent(id ?? "")).then(() => {
      console.log(eventDetails)
    })
  }, [dispatch, id]);
  
  if (loading) {
    return <Loading />;
  }

//   if (retrieveError) {
//     return (
//       <Error
//         message1={"404"}
//         message2={"Oooops"!}
//         message3={"Page Not Found"}
//         message4={"This page doesn't exist or was removed"}
//         message5={"We suggest you go back to home!"}
//       />
//     );
//   }

  return (
    <div>
        <div className="container mx-auto max-w-5xl flex flex-col px-5 py-5 pt-48 ml-32">
          <article className="flex-1">  
            <div>
              <div className="flex mt-4">
                {eventDetails && eventDetails[0]?.categories.map((category: any) => (
                  <h3 key={category?.id} className="mr-2">
                    #{category?.name}
                  </h3>
                ))}
              </div>
              <h1 className="text-xl font-medium font-roboto mt-4 text-custom-color3">
                {eventDetails && eventDetails[0]?.title}
              </h1>
              <div className="mt-4 text-custom-color3">
                <p>{eventDetails && eventDetails[0]?.description}</p>
              </div>
            </div>
          </article>
        </div>
    </div>
  );
};

export default EventDetails;
