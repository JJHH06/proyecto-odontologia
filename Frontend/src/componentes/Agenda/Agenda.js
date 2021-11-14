import React from 'react'
import './Agenda.scss'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list';
import { INITIAL_EVENTS, createEventId } from './event-utils'
import Demo from './Demo'

export default ({token}) => {
    
    const [events, setEvents] = React.useState(INITIAL_EVENTS)
  ///////////////////////////
    
    return (<>
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
          <Demo token={token} unidad={"1"}/>
            
          </div>
            </div>
            <div className='col-lg-6'>
            <div>
            <div className='titulo-unidad'>
              <h1>
                Calendario Unidad 2
              </h1>
            </div>
            <Demo token={token} unidad={"2"}/>
          </div>
            </div>

          </div>
          
          
        </div>
      </div>
        
    </>)
}