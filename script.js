const url = "https://restcountries.com/v3.1/all"


//to display the fetched data in console to html page

const res = fetch(url);
res.then((data)=>data.json())
    .then((ele)=>{
        const Div = document.querySelector(".container")
        
            
        for (let i=0; i< ele.length;i++)
        {
            
            const rowDiv= document.createElement("div")
            rowDiv.setAttribute("class", "row");
            Div.append(rowDiv);

            const colDiv = document.createElement("div")
            colDiv.setAttribute("class", "col-lg-4 col-sm-12 g-4");
            rowDiv.append(colDiv);

            const cardDiv = document.createElement("div")
            cardDiv.setAttribute("class","card");
            colDiv.append(cardDiv);

            cardDiv.innerHTML = `
               <div class="card-header">${ele[i].name.common}</div>
                 <img src="${ele[i].flags.png}" class="card-img-top" alt="flag">
                  <div class="card-body">
                   <h5 class="card-title">Capital:${ele[i].capital}</h5>
                   <h5 class="card-title">Region:${ele[i].region}</h5>
                   <h5 class="card-title">Country Code:${ele[i].cca2}</h5>
                   <h5 class="card-title">Lattitude/longitude:${ele[i].capitalInfo.latlng}</h5>
    
                   <button type="button" class="btn btn-primary" onClick="getData('${ele[i].name.common}')">Click for Weather</button>
                   </div>`;
           
          

        }
        document.body.append(Div) 
        
    })
    
//Fetch request to get  weather  data using country name
function getData(countryName)
    {
        var API= "c02261a4253df3ce46b5c3e7b4d4bc82";
        var weatherUrl= `https://api.openweathermap.org/data/2.5/weather?q=${countryName}&appid=${API}`
    

    fetch(weatherUrl)
    .then((response)=>response.json())
    .then((weatherData)=>{
        var weatherCountryName= weatherData.name;
        if(weatherCountryName === countryName)
        {
        const weatherInfoDiv = document.createElement("weatherInfo");
        weatherInfoDiv.setAttribute("class","Wdiv")
        weatherInfoDiv.innerHTML =alert(`
        Weather in ${weatherData.name}:
        Minimum Temperature: ${weatherData.main.temp_min} deg&c
        Maximum Temperature: ${weatherData.main.temp_max} deg&c
      `);
        } 
        else
        {
            alert("Country names donot match")
        }
    })
    .catch((error)=>{
        console.log("Error fetching data:",error);
        alert`Error fetching weather data.`;
});
    }
   