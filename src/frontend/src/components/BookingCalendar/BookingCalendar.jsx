import React, {useState} from 'react';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import {DateRange} from "react-date-range";

const BookingCalendar = () => {
    const [selectedRange, setSelectedRange] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection',
        },
    ]);

    const handleSelect = (ranges) => {
        // Handle the selected date range
        setSelectedRange([ranges.selection]);
    };

    return (
        <DateRange
            ranges={selectedRange}
            onChange={handleSelect}
            minDate={new Date()}
            moveRangeOnFirstSelection={false}
            showDateDisplay={false}
        />
    );
};

export default BookingCalendar;
