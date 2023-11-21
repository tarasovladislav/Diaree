import './MonthComponent.css'
import LeftArrow from '../../Assets/left-arrow.png'
import RightArrow from '../../Assets/right-arrow.png'
import DayComponent from '../DayComponent/DayComponent'
import SearchComponent from '../Searchbar/Searchbar'
import { useDiary } from '../../Utils/diary';


type Props = {
    currentYear: number,
    currentMonth: number,
    setCurrentMonth: React.Dispatch<React.SetStateAction<number>>,
    setCurrentYear: React.Dispatch<React.SetStateAction<number>>,
}


const MonthComponent = (props: Props) => {
    const months: string[] = ['January', 'Feburary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const { setSelectedDate, setIsAddNewEvent, diariesByDate } = useDiary()

    const getDaysInMonth = (year: number, month: number): number => {
        return new Date(year, month + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (year: number, month: number): number => {
        const dayOfWeek = new Date(year, month, 1).getDay();
        return (dayOfWeek + 6) % 7;
    };

    const daysInMonth: number = getDaysInMonth(props.currentYear, props.currentMonth);
    const firstDayOfMonth: number = getFirstDayOfMonth(props.currentYear, props.currentMonth);
    const daysInPreviousMonth: number = getDaysInMonth(props.currentYear, props.currentMonth - 1);
    const leadingDays: number[] = Array.from({ length: firstDayOfMonth }, (_, i) => daysInPreviousMonth - i).reverse();
    const currentMonthDays: number[] = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const totalDays: number = firstDayOfMonth + daysInMonth;
    const totalCells: number = totalDays > 35 ? 42 : 35;
    const trailingDaysCount: number = totalCells - (firstDayOfMonth + daysInMonth);
    const trailingDays: number[] = Array.from({ length: trailingDaysCount }, (_, i) => i + 1);
    const grid: number[] = [...leadingDays, ...currentMonthDays, ...trailingDays];


    // Helper function to create the date string in 'YYYY-MM-DD' format
    const formatDateKey = (year: number, month: number, day: number): string => {
        // Correctly adjust month number for JavaScript Date (0-11)
        month += 1;
        // Pad single digit month and day with leading zeros
        const paddedMonth = month.toString().padStart(2, '0');
        const paddedDay = day.toString().padStart(2, '0');
        // Return the date string
        return `${year}-${paddedMonth}-${paddedDay}`;
    };

    const today: Date = new Date();
    const currentDate: string = today.toISOString().split('T')[0];


    return (
        <div className='Month'>
            <div className="Right-Container">
                <div className="Month-Navbar">
                    <div className='Toggle'>
                        <img src={LeftArrow} onClick={() => {
                            let year = props.currentYear;
                            let month = props.currentMonth - 1;
                            if (month < 0) {
                                year -= 1;
                                month = 11;
                            }
                            props.setCurrentMonth(month)
                            props.setCurrentYear(year)
                        }}></img >

                        <button>Today</button>

                        <img src={RightArrow} onClick={
                            () => {
                                let year = props.currentYear;
                                let month = props.currentMonth + 1;
                                if (month > 11) {
                                    year += 1;
                                    month = 0;
                                }
                                props.setCurrentMonth(month)
                                props.setCurrentYear(year)
                            }}></img>
                    </div>


                    <h1>{months[props.currentMonth]}, {props.currentYear}</h1>
                    <div className='Searchbar'>
                        <SearchComponent />
                    </div>

                </div>
                <div className="weekDay">
                    <h4 className="dayOfTheWeek">Monday</h4>
                    <h4 className="dayOfTheWeek">Tuesday</h4>
                    <h4 className="dayOfTheWeek">Wednesday</h4>
                    <h4 className="dayOfTheWeek">Thursday</h4>
                    <h4 className="dayOfTheWeek">Friday</h4>
                    <h4 className="dayOfTheWeek">Saturday</h4>
                    <h4 className="dayOfTheWeek">Sunday</h4>
                </div>
                <div className="Month-View">

                    {grid.map((day, index) => {
                        let year = props.currentYear;
                        let month = props.currentMonth;
                        // Adjust for leading days
                        if (index < leadingDays.length) {
                            month -= 1;
                            if (month < 0) {
                                year -= 1;
                                month = 11;
                            }
                            day = daysInPreviousMonth - leadingDays.length + index + 1;
                        }
                        // Adjust for trailing days
                        else if (index >= leadingDays.length + daysInMonth) {
                            month += 1;
                            if (month > 11) {
                                year += 1;
                                month = 0;
                            }
                            day = index - (leadingDays.length + daysInMonth) + 1;
                        }
                        const dateKey = formatDateKey(year, month, day);
                        const dayEvents = diariesByDate[dateKey];
                        return (dayEvents ?
                            <div
                                onClick={() => {
                                    setSelectedDate(dateKey)
                                }}
                                key={index} className={`day ${index < leadingDays.length || index >= leadingDays.length + daysInMonth ? 'other-month' : ''} 
                                ${((day > new Date().getDate() && month >= new Date().getMonth() && year >= new Date().getFullYear()) || (day <= new Date().getDate() && month > new Date().getMonth() && year >= new Date().getFullYear()) || (year > new Date().getFullYear())) ? 'future-days' : ''}`}>
                                <span style={{ alignSelf: 'center' }}>
                                    {day}
                                </span>
                                <div className="dayEventList">
                                    {dayEvents.map((event, index) => <DayComponent key={index} event={event} dayEvents={dayEvents} />)}

                                </div>

                            </div>
                            :
                            <div
                                onClick={() => {
                                    if (dateKey <= currentDate) {
                                        setSelectedDate(dateKey)
                                        setIsAddNewEvent(true);
                                        console.log('dateKey', dateKey)
                                    }
                                }}
                                key={index}
                                className={`day ${index < leadingDays.length || index >= leadingDays.length + daysInMonth ? 'other-month' : ''} 
                                ${((day > new Date().getDate() && month >= new Date().getMonth() && year >= new Date().getFullYear()) || (day <= new Date().getDate() && month > new Date().getMonth() && year >= new Date().getFullYear()) || (year > new Date().getFullYear())) ? 'future-days' : ''}`}>
                                <span style={{ alignSelf: 'center' }}>
                                    {day}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>

        </div>

    )
}

export default MonthComponent