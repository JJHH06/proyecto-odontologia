import React from 'react'
import './Agenda.scss'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list';
import { INITIAL_EVENTS, createEventId } from './event-utils'

export default class Agenda extends React.Component {
    
    state = {
        weekendsVisible: true,
        currentEvents: []
    }
  
    render() {
    return (
      <div>
        <div className='container size-mini-calendar'>
        <FullCalendar
                plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin ]}
                headerToolbar={{
                    left: 'prev,next',
                    center: 'title',
                    right: 'dayGridMonth'
                }}
                initialView="dayGridMonth"

            />
        </div>
        <div className='container size-calendar'>
          <div className='row'>
            <div className='col-lg-6'>
            <div>
            <div className='titulo-unidad'>
              <h1>
                Calendario Unidad 1
              </h1>
            </div>
          
            <FullCalendar
                plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin ]}
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'timeGridWeek,timeGridDay,listWeek'
                }}
                initialView="timeGridDay"
                editable={true}
                selectable={true}
                selectHelper={true}
                selectMirror={true}
                dayMaxEvents={true}
                eventLimit={true}
                weekends={this.state.weekendsVisible}
                initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
                select={this.handleDateSelect}
                eventContent={renderEventContent} // custom render function
                eventClick={this.handleEventClick}
                eventsSet={this.handleEvents} 

            />
          </div>
            </div>
            <div className='col-lg-6'>
            <div>
            <div className='titulo-unidad'>
              <h1>
                Calendario Unidad 2
              </h1>
            </div>
          <FullCalendar
                plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin ]}
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'timeGridWeek,timeGridDay,listWeek'
                }}
                initialView="timeGridDay"
                editable={true}
                selectable={true}
                selectHelper={true}
                selectMirror={true}
                dayMaxEvents={true}
                eventLimit={true}
                weekends={this.state.weekendsVisible}
                initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
                select={this.handleDateSelect}
                eventContent={renderEventContent} // custom render function
                eventClick={this.handleEventClick}
                eventsSet={this.handleEvents} 

            />
          </div>
            </div>

          </div>
          
          
        </div>
      </div>
        
    )
  }

  handleWeekendsToggle = () => {
    this.setState({
      weekendsVisible: !this.state.weekendsVisible
    })
  }

  handleDateSelect = (selectInfo) => {
    let title = prompt('Please enter a new title for your event')
    let calendarApi = selectInfo.view.calendar

    calendarApi.unselect() // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      })
    }
  }

  handleEventClick = (clickInfo) => {
    if (window.confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove()
    }
  }

  handleEvents = (events) => {
    this.setState({
      currentEvents: events
    })
  }

}

function renderEventContent(eventInfo) {
    return (
      <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </>
    )
}