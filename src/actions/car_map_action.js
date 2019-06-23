/**
 * @providesModule carMapAction
 */
export const CAR_FETCH_LOCATION_SUCCESS = 'CAR_FETCH_LOCATION_SUCCESS'
export const CAR_FETCH_LOCATION_FAILURE = 'CAR_FETCH_LOCATION_FAILURE'
export const CAR_FETCH_LOCATION_LOADING = 'CAR_FETCH_LOCATION_LOADING'

const dummyData = [{
    id: 'car1',
    coordinates: {
      latitude: -36.87,
      longitude: 174.77
    },
  },
  {
    id: 'car2',
    coordinates: {
      latitude: 3.149771,
      longitude: 101.655449
    },  
  }]
function carFetchLoading(){
  return {
    type:CAR_FETCH_LOCATION_LOADING
  }
}
function carFetchSuccess(data){
  return {
    type:CAR_FETCH_LOCATION_SUCCESS,
    payload:data
  }
}
function carFetchFailure(){
  return {
    type:CAR_FETCH_LOCATION_FAILURE
  }
}  
export function carsFetchLocation(){
  return (dispatch)=>{
    dispatch(carFetchLoading())
    let url = "https://lhmtstorage1.table.core.windows.net/car()?$filter=PartitionKey%20eq%20'Latest'&sv=2017-04-17&ss=bfqt&srt=sco&sp=rwdlacup&se=2017-11-11T08:25:05Z&st=2017-10-16T00:25:05Z&spr=https&sig=JTH9%2BqfGfdKm2%2FHYJjgsYAl7NtSlOvje4Se%2B2WxnNts%3D";
    let param = { 
      headers: {'Accept': 'application/json;odata=nometadata'}
    }
    fetch(url,param)
      .then((response)=>{
        if(!response.ok){
          throw new Error(response.statusText)
        }
        return response;
      })
      .then((response)=>response.json())
      .then((carsData)=> {
        dispatch(carFetchSuccess(carsData))
      })
      .catch(()=>{
        dispatch(carFetchFailure())
      })
  }
}
