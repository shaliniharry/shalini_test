const  apiurl="https://hn.algolia.com/api/v1/search_by_date?tags=story&page="
export const getDatafromapi=(count)=>{
   
    return fetch(apiurl+count,{
        method:"GET"})
        .then((respose)=>respose.json())
        .then((responsejson)=>{
                return responsejson
        }).catch((error)=>
        console.log(error)
        )
}