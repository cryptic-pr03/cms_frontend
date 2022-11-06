/* eslint-disable react/jsx-key */
import { useEffect, useState } from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import EventNoteIcon from '@mui/icons-material/EventNote';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Typography from '@mui/material/Typography';

export default function ScheduleCard({ scheduleList }) {
    const [iterator, setIterator] = useState(0);
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    const [ydate, setYDate] = useState([`${yyyy}-${mm}-${String(today.getDate() - 1).padStart(2, '0')}`]);
    const [yydate, setYYDate] = useState([`${yyyy}-${mm}-${String(today.getDate() - 2).padStart(2, '0')}`]);
    const [yyydate, setYYYDate] = useState([`${yyyy}-${mm}-${String(today.getDate() - 3).padStart(2, '0')}`]);
    const [datet, setDateT] = useState([`${yyyy}-${mm}-${String(today.getDate() + 1).padStart(2, '0')}`]);
    const [datett, setDateTT] = useState([`${yyyy}-${mm}-${String(today.getDate() + 2).padStart(2, '0')}`]);
    const [datettt, setDateTTT] = useState([`${yyyy}-${mm}-${String(today.getDate() + 3).padStart(2, '0')}`]);
    const [date, setDate] = useState([`${yyyy}-${mm}-${dd}`]);
    useEffect(() => {
        document.title = 'Event Schedule | CMS';
    });
    const style = {
        button: {
            backgroundColor: '#2e201f',
            border: 'none',
            color: 'white',
            padding: '5px 5px',
            textAlign: 'center',
            textDecoration: 'none',
            display: 'inline-block',
            fontSize: '16px',
            margin: '4px 2px',
            cursor: 'pointer',
            fontFamily: 'Caladea, fantasy',
        },
        datepicker: {
            display: 'flex',
            justifyContent: 'space-between',
            fontFamily: 'Caladea, fantasy',
        },
        datePicked: {
            padding: '10px',
            textAlign: 'center',
            fontSize: 'large',
            fontFamily: 'Caladea, fantasy',
            fontWeight: 'bold',
        },
        arrow: {
            border: 'solid black',
            borderWidth: '0 3px 3px 0',
            padding: '3px',
        },
    };
    function changeDate() {
        setDate([`${yyyy}-${mm}-${String(today.getDate() + iterator).padStart(2, '0')}`]);
        setYYYDate([`${yyyy}-${mm}-${String(today.getDate() + iterator - 3).padStart(2, '0')}`]);
        setYYDate([`${yyyy}-${mm}-${String(today.getDate() + iterator - 2).padStart(2, '0')}`]);
        setYDate([`${yyyy}-${mm}-${String(today.getDate() + iterator - 1).padStart(2, '0')}`]);
        setDateT([`${yyyy}-${mm}-${String(today.getDate() + iterator + 1).padStart(2, '0')}`]);
        setDateTT([`${yyyy}-${mm}-${String(today.getDate() + iterator + 2).padStart(2, '0')}`]);
        setDateTTT([`${yyyy}-${mm}-${String(today.getDate() + iterator + 3).padStart(2, '0')}`]);
    }
    const leftArrowClick = (x) => {
        setIterator(iterator - x);
        changeDate();
    };
    const rightArrowClick = (x) => {
        setIterator(iterator + x);
        changeDate();
    };
    function Back(x) {
        leftArrowClick(x);
    }
    function Forward(x) {
        rightArrowClick(x);
    }
    return (
        <div>
            <div style={style.datepicker}>
                <button type="button" onClick={() => { leftArrowClick(1); }} style={style.arrow}>
                    <KeyboardArrowLeftIcon />
                </button>
                <button type="button" onClick={() => { setDate(yyydate); Back(3); }} style={style.button}>
                    {yyydate}
                </button>
                <button type="button" onClick={() => { setDate(yydate); Back(2); }} style={style.button}>
                    {yydate}
                </button>
                <button type="button" onClick={() => { setDate(ydate); Back(1); }} style={style.button}>
                    {ydate}
                </button>
                <button
                    style={{
                        backgroundColor: 'white',
                        border: 'none',
                        color: 'black',
                        padding: '5px 5px',
                        textAlign: 'center',
                        textDecoration: 'none',
                        display: 'inline-block',
                        fontSize: '16px',
                        margin: '4px 2px',
                        cursor: 'pointer',
                        fontFamily: 'Caladea, fantasy',
                        borderStyle: 'solid',
                    }}
                    type="button"
                >
                    {date}
                </button>
                <button type="button" onClick={() => { setDate(datet); Forward(1); }} style={style.button}>
                    {datet}
                </button>
                <button type="button" onClick={() => { setDate(datett); Forward(2); }} style={style.button}>
                    {datett}
                </button>
                <button type="button" onClick={() => { setDate(datettt); Forward(3); }} style={style.button}>
                    {datettt}
                </button>
                <button type="button" onClick={() => { rightArrowClick(1); }} style={style.arrow}>
                    <KeyboardArrowRightIcon />
                </button>
            </div>
            <div className="datePicked" style={style.datePicked}>
        Events scheduled on
                {' '}
                {date}
            </div>
            <Timeline position="alternate">
                {scheduleList.filter((x) => String(x.eventDate) === String(date)).map((eventDetail) => (
                    <TimelineItem>
                        <TimelineOppositeContent
                            sx={{
                                m: 'auto 0',
                                paddingTop: '10px',
                            }}
                            align="right"
                            variant="body2"
                            color="text.primary"
                            fontSize="medium"
                            fontFamily="Caladea, fantasy"
                        >
              Starts at:
                            {' '}
                            {eventDetail.startTime}
                            <br />
              Ends at:
                            {' '}
                            {eventDetail.endTime}
                        </TimelineOppositeContent>
                        <TimelineSeparator>
                            <TimelineConnector />
                            <TimelineDot>
                                <EventNoteIcon />
                            </TimelineDot>
                            <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent sx={{ py: '20px', px: 2 }}>
                            <Typography
                                variant="h6"
                                component="span"
                                sx={{
                                    fontSize: 'large',
                                    fontFamily: 'Caladea,'
                  + 'fantasy',
                                    fontWeight: 'bold',
                                }}
                            >
                                {eventDetail.name}
                            </Typography>
                            <Typography sx={{ fontFamily: 'Caladea, fantasy', fontWeight: 'bold' }}>
                                {eventDetail.description}
                            </Typography>
                        </TimelineContent>
                    </TimelineItem>
                ))}
            </Timeline>
        </div>
    );
}
