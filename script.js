//create a request variable
var request = new XMLHttpRequest();
let xhr = new XMLHttpRequest();
//create a connectionconnection
request.open('GET','https://restcountries.eu/rest/v2/all',true);
//send a  connection
request.send();

//returns promise and prints temperature of country url.  
function makeRequest(method, url) {
    return new Promise(function (resolve, reject) {
        xhr.open(method, url);
        xhr.onload = function () {
            var Data = JSON.parse(this.response);
            console.log(Data.main.temp)
            if (this.status >= 200 && this.status < 300) {
                resolve(xhr.response);
            } else {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
            }
        };
        xhr.onerror = function () {
            reject({
                status: this.status,
                statusText: xhr.statusText
            });
        };
        xhr.send();
    });
}

//aync function which forms url using key and inputs from countrydata
async function doAjaxThings(lat,alt) {
  let key ='ce10f93629fbb290ce9fe8aa5ffc7f78';
   let api_url ='http://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}'
   api_url= api_url.replace('{lat}',lat);
   api_url= api_url.replace('{lon}',alt);
   api_url =api_url.replace('{API key}',key) 
    await makeRequest("GET", api_url);
}


try{
//register a event listner..once the data is ready.
request.onload = function() {
    var countryData = JSON.parse(this.response);
    //console.log(countryData);
    countryData.forEach(element => {
        //a&b are altitude and lattitude from countryData.
        let a =element.latlng[0];
        let b =element.latlng[1];                     
        if(a !== undefined && b !== undefined){
          doAjaxThings(a,b)          
        }
        
    })
}
}
catch(err){
    alert(err)
}
