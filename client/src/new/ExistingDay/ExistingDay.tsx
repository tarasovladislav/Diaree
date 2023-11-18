import React from 'react'
import { useDiary } from '../../Utils/diary'
import './ExistingDay.css';

type Props = {}

const ExistingDay = (props: Props) => {

    const { isShowDayEvents, setIsShowDayEvents, selectedDate, diariesByDate } = useDiary()


    return (
        isShowDayEvents && (
            <div className="DiaryEntry">
                <div className="Modal-Overlay">
                    <button className="Close" onClick={() => setIsShowDayEvents(false)}>Close</button>
                    <div className="Title">
                        <h1>{selectedDate}</h1>
                        <h2>Create a new diary entry</h2>
                    </div>
                </div>
            </div>)
    )
}

export default ExistingDay