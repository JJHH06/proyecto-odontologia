import * as React from "react";
import Paper from "@material-ui/core/Paper";
import LinearProgress from "@material-ui/core/LinearProgress";
import { withStyles } from "@material-ui/core/styles";
import { ViewState, EditingState, IntegratedEditing } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  WeekView,
  DayView,
  Appointments,
  Toolbar,
  DateNavigator,
  ViewSwitcher,
  AppointmentForm,
  AppointmentTooltip,
  TodayButton,
} from "@devexpress/dx-react-scheduler-material-ui";
import axios from "axios";

const PUBLIC_KEY = "AIzaSyBnNAISIUKe6xdhq1_rjor2rxoI3UlMY7k";
const CALENDAR_ID = "f7jnetm22dsjc3npc2lu3buvu4@group.calendar.google.com";

const flipLocalDate = (date) => date.split("/").reverse().join("-");

//axios  request to get an appointment by id
const getAppointmentById = async (id, token) => {
  return await axios.post(
    `http://198.211.103.50:5000/api/cita/getCitaByID`,
    { id_cita: id },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer  `+token,
      },
    }
  ).then((response) => {
    return response.data.result[0];
  });
  }
  const updateAppointment = async (token, updated) => {
    
    
    let config = {
      method: 'post',
      url: 'http://198.211.103.50:5000/api/cita/updateCita',
      headers: { 
        'Authorization': 'Bearer  '+token, 
        'Content-Type': 'application/json'
      },
      data : JSON.stringify(updated)
    };
    
    return await axios(config)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });

  }

  const addAppointment = async (token, newAppointment) => {
    
    
    let config = {
      method: 'post',
      url: 'http://198.211.103.50:5000/api/cita/addCita',
      headers: { 
        'Authorization': 'Bearer  '+token, 
        'Content-Type': 'application/json'
      },
      data : JSON.stringify(newAppointment)
    };
    
    console.log(newAppointment);
    return await axios(config)
    .then(function (response) {
      return response.data;
    }).
    catch(function (error) {
      console.log('ERROR POST',error);
    }
    );
  }

  const deleteAppointment = async (token, id) => {
    var data = JSON.stringify({
      "id_cita": id
    });
    
    var config = {
      method: 'delete',
      url: 'http://198.211.103.50:5000/api/cita/deleteCita',
      headers: { 
        'Authorization': 'Bearer  '+token, 
        'Content-Type': 'application/json'
      },
      data : data
    };
    
    return await axios(config)
    .then(function (response) {
      return response.data;
    }).catch(function (error) {
      console.log(error);
    }
    );
  }



const styles = {
  toolbarRoot: {
    position: "relative",
  },
  progress: {
    position: "absolute",
    width: "100%",
    bottom: 0,
    left: 0,
  },
};

const ToolbarWithLoading = withStyles(styles, { name: "Toolbar" })(
  ({ children, classes, ...restProps }) => (
    <div className={classes.toolbarRoot}>
      <Toolbar.Root {...restProps}>{children}</Toolbar.Root>
      <LinearProgress className={classes.progress} />
    </div>
  )
);

const usaTime = (date) =>
  new Date(date);
//new Date('1995-12-17T03:24:00')
const mapAppointmentData = (appointment) => ({
  id: appointment.id_cita,
  startDate:  usaTime(flipLocalDate(appointment.fecha)+'T'+appointment.hora_inicio),
  endDate:  usaTime(flipLocalDate(appointment.fecha)+'T'+appointment.hora_final),
  title: appointment.titulo_cita,
});

const initialState = {
  data: [],
  loading: false,
  currentDate: new Date().toISOString().split('T')[0],
  currentViewName: "Day",
  location: "Dr simi",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "setLoading":
      return { ...state, loading: action.payload };
    case "setData":
      return { ...state, data: action.payload.map(mapAppointmentData) };
    case "setCurrentViewName":
      return { ...state, currentViewName: action.payload };
    case "setCurrentDate":
      return { ...state, currentDate: action.payload };
    default:
      return state;
  }
};

export default ({token, unidad}) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const { data, loading, currentViewName, currentDate } = state;

  const setCurrentViewName = React.useCallback(
    (nextViewName) =>
      dispatch({
        type: "setCurrentViewName",
        payload: nextViewName,
      }),
    [dispatch]
  );
  const setData = React.useCallback(
    (nextData) =>
      dispatch({
        type: "setData",
        payload: nextData,
      }),
    [dispatch]
  );
  const setCurrentDate = React.useCallback(
    (nextDate) =>{
      dispatch({
        type: "setCurrentDate",
        payload: nextDate,
      })},
    [dispatch]
  );
  const setLoading = React.useCallback(
    (nextLoading) =>
      dispatch({
        type: "setLoading",
        payload: nextLoading,
      }),
    [dispatch]
  );
  const getData = async (setData, setLoading) => {
    // return axios request data
    setLoading(true);
    return await axios

      .post(
        "http://198.211.103.50:5000/api/cita/searchCitaByDate",{
          fecha: currentDate,
          no_unidad: unidad
        },
        {
          headers: {
            'Authorization': 'Bearer  '+token,
            'Content-Type': 'application/json'
          },
        })
      .then((response) => {
        setLoading(false);
        return setData(response.data.result);
        
      }
      );

    
  };
  
  React.useEffect(() => {
    getData(setData, setLoading);
  }, [setData, currentViewName, currentDate]);


  React.useEffect(() => {

    //
  }, [])

  //creat async function thatcalls getAppointmentById
  

  const viewEdit = async (modData) => {
    if(modData.deleted){
      setLoading(true);
      console.log('Hostia chaval, que me han eliminado', modData.deleted)
      await deleteAppointment(token, modData.deleted);
      getData(setData, setLoading);
    }
    else if(modData.changed){
      setLoading(true);
      let actualData = await getAppointmentById(Object.keys(modData.changed)[0], token);
      actualData.fecha = flipLocalDate(actualData.fecha.split('T')[0]);//para que la fecha tenga el formato del sql
      
      const editedData = modData.changed[Object.keys(modData.changed)[0]]
      if(editedData.title){
        actualData.titulo_cita = editedData.title;
      }

      if(editedData.startDate){
        actualData.fecha = editedData.startDate.getFullYear()+'-'+parseInt(parseInt(editedData.startDate.getMonth())+1)+'-'+editedData.startDate.getDate();
        actualData.hora_inicio = editedData.startDate.toTimeString().split(' ')[0];
        
      }
      if(editedData.endDate){
        actualData.fecha = editedData.endDate.getFullYear()+'-'+parseInt(parseInt(editedData.endDate.getMonth())+1)+'-'+editedData.endDate.getDate();
        actualData.hora_final = editedData.endDate.toTimeString().split(' ')[0];
      }
      
      //llamada a la api para actualizar
      await updateAppointment(token,actualData)
      getData(setData, setLoading);




    }
    //const {paciente, fecha, hora_inicio, hora_final, estado_cita, no_unidad, titulo_cita } = req.body;
    

    if(modData.added){
      setLoading(true);
      let newData = {titulo_cita: modData.added.title, 
        no_unidad: unidad, 
        fecha:modData.added.endDate.getFullYear()+'-'+parseInt(parseInt(modData.added.endDate.getMonth())+1)+'-'+modData.added.endDate.getDate(),
        hora_inicio: modData.added.startDate.toTimeString().split(' ')[0],
        hora_final: modData.added.endDate.toTimeString().split(' ')[0],
        estado_cita: "Activo",
        paciente: null,
      }

      await addAppointment(token, newData)
      getData(setData, setLoading);
    }

    
  }

  React.useEffect(() => {
    console.log('fecha actual', currentDate)
  }, [currentDate])
  return (
    <Paper>
      <Scheduler data={data} height={660}>
        <ViewState
          currentDate={currentDate}
          currentViewName={currentViewName}
          onCurrentViewNameChange={setCurrentViewName}
          onCurrentDateChange={setCurrentDate}
        />
        <EditingState
            onCommitChanges={viewEdit}
          />
          <IntegratedEditing />
        <DayView startDayHour={7.5} endDayHour={17.5} />
        <Appointments />
        <Toolbar
          {...(loading ? { rootComponent: ToolbarWithLoading } : null)}
        />
        <DateNavigator />
        <TodayButton />
        <ViewSwitcher />
        <AppointmentTooltip showOpenButton showCloseButton showDeleteButton />
        <AppointmentForm
        />
      </Scheduler>
    </Paper>
  );
};
