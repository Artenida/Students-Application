import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { retrieveAllEvents } from "../../api/eventThunk";
import { selectEvent } from "../../redux/forum/eventSlice";

export interface EventType {
    id: string;
    title: string;
    description: string;
    date: Date;
    location: string;
    details: string;
    user_id: string;
    image: string;
  }

const EventCard: React.FC<EventType> = ({
    id,
    title,
    description,
    date,
    location,
    details,
    user_id,
    image
  }) => {
    return (
        <div>
            <h1>{title}</h1>
            <h2>{description}</h2>
            {/* <h2>{date}</h2> */}
            <h2>{location}</h2>
            <h2>{details}</h2>
            <h2>{user_id}</h2>
            <h2>{image}</h2>
        </div>
    )
}

export default EventCard;