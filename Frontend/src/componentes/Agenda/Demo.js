import * as React from "react";
import Paper from "@material-ui/core/Paper";
import LinearProgress from "@material-ui/core/LinearProgress";
import { withStyles } from "@material-ui/core/styles";
import { ViewState } from "@devexpress/dx-react-scheduler";
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
  text: "el pepe",
  startDate:  usaTime(flipLocalDate(appointment.fecha)+'T'+appointment.hora_inicio),
  endDate:  usaTime(flipLocalDate(appointment.fecha)+'T'+appointment.hora_final),
  title: appointment.nombre_paciente,
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
      console.log(nextDate)
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
        console.log('LOSDATOS',response.data)
        return setData(response.data.result);
        
      }
      );

    
  };
  
  React.useEffect(() => {
    console.log('LOSDATOS', data)
    console.log(currentDate)
    getData(setData, setLoading);
  }, [setData, currentViewName, currentDate]);


  React.useEffect(() => {

    //
  }, [])

  React.useEffect(() => {
    console.log('LAFECHAAAAAAAAAAAAAAAaaa', currentDate)
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
        <DayView startDayHour={7.5} endDayHour={17.5} />
        <Appointments />
        <Toolbar
          {...(loading ? { rootComponent: ToolbarWithLoading } : null)}
        />
        <DateNavigator />
        <TodayButton />
        <ViewSwitcher />
        <AppointmentTooltip showOpenButton showCloseButton />
        <AppointmentForm readOnly />
      </Scheduler>
    </Paper>
  );
};
