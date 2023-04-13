import React, { useState, useContext } from 'react'
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateRangePicker, } from 'react-date-range';
import GlobalContext from '../../context/GlobalContext';

export default function DatesPicker() {
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const [nbNights, setNbNights] = useState(0)
  const { setDates } = useContext(GlobalContext)
  const selectionRange = { startDate: startDate, endDate: endDate, key: 'selection', nbNights: nbNights, }

  const handleSelect = (ranges) => {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
    let nb = Math.round((ranges.selection.endDate - ranges.selection.startDate) / (900 * 60 * 60 * 24));
    setNbNights(nb)
    const formattedStartDate = ranges.selection.startDate.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    });
    const formattedEndDate = ranges.selection.endDate.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    });
    setDates({ startDate: formattedStartDate, endDate: formattedEndDate, nbNights: nb });
  }

  return (
    <div className='flex flex-col mx-auto col-span-3' >
      <span className='ml-4'>{nbNights > 0 && nbNights + ' nuits'} </span>
      <DateRangePicker ranges={[selectionRange]} direction='vertical' minDate={new Date()} rangeColors={["#DF5B61"]} onChange={handleSelect} />
    </div>
  )
}
