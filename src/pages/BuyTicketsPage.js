import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import * as React from 'react';
import myAxios, { myPrivateAxios } from '../config/axios';
import TicketCard from '../components/cards/TicketCard';
import Layoutt from '../layouts/Layoutt';

function BuyTicketsPage() {
    const param = useParams();
    const [seats, setSeats] = useState([]);
    console.log(param);

    async function getSeatsByEvent() {
        try {
            await myAxios({ method: 'GET', url: `/eventSeat/${param.eventId}` }).then((res) => {
                console.log(res.data);
                for (let i = 0; i < res.data.length; i += 1) {
                    res.data[i] = { id: i + 1, ...res.data[i] };
                }
                setSeats(res.data);
            });
            console.log('success');
        } catch (err) {
            console.log('error');
            console.log(err.response);
        }
    }

    useEffect(() => {
        getSeatsByEvent();
    }, []);
    return (
        <Layoutt contentData={
            <TicketCard tCard={seats} />
        }
        />
    );
}

export default BuyTicketsPage;
