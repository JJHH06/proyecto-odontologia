import React from 'react'
import './Agenda.scss'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'

export default class DemoApp extends React.Component {
    
    state = {
        weekendsVisible: true,
        currentEvents: []
    }
  
    render() {
    return (
        <div className='container size-calendar'>
            <FullCalendar
                plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin ]}
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay'
                }}
                initialView="dayGridMonth"
                initialView='dayGridMonth'
                editable={true}
                selectable={true}
                selectMirror={true}
                dayMaxEvents={true}
                weekends={this.state.weekendsVisible}
            />
        </div>
    )
  }
}