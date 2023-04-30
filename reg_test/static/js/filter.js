


function update_chart(series_x, series_y){

  options = {
    series: [
    {
      name: "F28",
      data: series_y[0]
    },

    {
      name: "F42",
      data: series_y[1]
    },

    {
      name: "RA3",
      data: series_y[2]
    }
  ],
  // x-axis should be identical
  xaxis: {
    categories: series_x[0],
    title: {
      text: 'WW'
    }
  },

}

chart.updateOptions(options,false,false,false)
}




// function to get data from filters
function filter_Data(data_array, site_value, entity_value, type_value) {

  // Initlize arrays
  var filtered_data_F28 = [];
  var filtered_data_F32 = [];
  var filtered_data_RA3 = [];

    // if null set deafult value
  if (site_value == null){
      site_value = 'All_Sites';
    }

  // if null set deafult value
  if (entity_value == null){
      entity_value = 'ASML';
    }
  
  // if null set deafult value
  if (type_value == null){
      type_value = 'Wet';
    }


  // loop thru data and appened to array - we allow to display multiple sidtes at once therefore each site has there own array
  for (var i=0; i < data_array.length;++i){

      if ((data_array[i][0] == entity_value) && (data_array[i][1] == type_value) && (data_array[i][3] == "F28") && site_value == 'F28'){

            filtered_data_F28.push(data_array[i])  
      }

      if ((data_array[i][0] == entity_value) && (data_array[i][1] == type_value) && (data_array[i][3] == "F32") && (site_value == 'F42')){

            filtered_data_F32.push(data_array[i])  
      }

      if ((data_array[i][0] == entity_value) && (data_array[i][1] == type_value) && (data_array[i][3] == "RA3") && (site_value == 'RA3')){

            filtered_data_RA3.push(data_array[i])  
      }

      if ((data_array[i][0] == entity_value) && (data_array[i][1] == type_value) && (site_value == "All_Sites" )){
        
      
        if (data_array[i][3] == 'F28'){
          filtered_data_F28.push(data_array[i])  
        }

        if (data_array[i][3] == 'F32') {
          filtered_data_F32.push(data_array[i])  
        }

        if (data_array[i][3] == 'RA3') {
          filtered_data_RA3.push(data_array[i])  
        }
      }


      }  
      
      return [filtered_data_F28 , filtered_data_F32, filtered_data_RA3]
  }


function Get_filter_values()
 {

  var f28_data_x = [];
  var f28_data_y = [];
  var f32_data_x = [];
  var f32_data_y = [];
  var ra3_data_x = [];
  var ra3_data_y = [];


  var filtered_data_array;

  // get filter values 
  const site = document.querySelector("#site-filter");
  const entity = document.querySelector("#entity-filter");
  const type = document.querySelector("#type-filter");

  // sore filter values in local storage 
  sessionStorage.setItem("site_filter", site.value)
  sessionStorage.setItem("entity_filter", entity.value)
  sessionStorage.setItem("type_filter", type.value)

  // filter full data set  - based on locale storage values, if first time deafult values will be set 
  filtered_data_array = filter_Data(table_data, site.value, entity.value, type.value)

  // create arrays to be sent to chart --- will transposing table be faster ??? 
  // sites that have no data will be slipped due to length 0 
  for (var i=0; i < filtered_data_array[0].length;++i){
    f28_data_x.push(filtered_data_array[0][i][2]) 
    f28_data_y.push(filtered_data_array[0][i][4])   
  }

  for (var i=0; i < filtered_data_array[1].length;++i){
    f32_data_x.push(filtered_data_array[1][i][2]) 
    f32_data_y.push(filtered_data_array[1][i][4])  
  }

  for (var i=0; i < filtered_data_array[1].length;++i){
    ra3_data_x.push(filtered_data_array[1][i][2]) 
    ra3_data_y.push(filtered_data_array[1][i][4])  
  }



  series_x = [f28_data_x, f32_data_x, ra3_data_x] 
  series_y = [f28_data_y, f32_data_y, ra3_data_y]

  update_chart(series_x, series_y,)

}





function render_charts(table_data_x, table_data_y ) {


  var options = {
    series: [
    {
      name: "F28",
      data: table_data_y[0]
    },

    {
      name: "F42",
      data: table_data_y[1]
    }
  ],
    chart: {
    height: 350,
    type: 'line',
    dropShadow: {
      enabled: true,
      color: '#000',
      top: 18,
      left: 7,
      blur: 10,
      opacity: 0.2
    },
    toolbar: {
      show: false
    }
  },
  colors: ['#77B6EA', '#545454'],
  dataLabels: {
    enabled: true,
  },
  stroke: {
    curve: 'smooth'
  },
  title: {
    text: 'LFU Overview',
    align: 'center'
  },
  grid: {
    borderColor: '#e7e7e7',
    row: {
      colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
      opacity: 0.5
    },
  },
  markers: {
    size: 1
  },
  xaxis: {
    categories: table_data_x[0],
    title: {
      text: 'WW'
    }
  },
  yaxis: {
    title: {
      text: 'Weighted LFU'
    },
    //min: 0.6,
    //max: 0.9
  },
  legend: {
    position: 'top',
    horizontalAlign: 'right',
    floating: true,
    offsetY: -25,
    offsetX: -5
  }
  };

  chart= new ApexCharts(document.querySelector("#chart"), options);
  chart.render();
}


document.getElementById("entity-filter").addEventListener("change", update_filter_dropdown);

function update_filter_dropdown(){

  var select = document.getElementById('entity-filter');
  var all_type_filters = document.getElementById('type-filter');
  var entity_selected = select.value
  //var entity_value = select.options[select.selectedIndex].value;

  const ASML_ENTITY_SELECT = ['Wet', 'Dry']
  const NIKON_ENTITY_SELECT = ['SNE', 'STB', 'SNU']


  for (var i = 0; i < all_type_filters.length; i++){

    // first make all elements visabile , and remove selected
    all_type_filters[i].style.display = "inline";
    all_type_filters[i].selected = false;

    // Now hide wanted elemnts
    if (entity_selected == 'ASML' &&  NIKON_ENTITY_SELECT.includes(all_type_filters[i].value) ){
        all_type_filters[i].style.display = "none";
    }

    if (entity_selected == 'Nikon' &&  ASML_ENTITY_SELECT.includes(all_type_filters[i].value) ){
        all_type_filters[i].style.display = "none";
    }

    if (entity_selected == 'Nikon' && all_type_filters[i].value == 'SNE'){
      all_type_filters[i].selected = true;
    }

    if (entity_selected == 'ASML' && all_type_filters[i].value == 'Wet'){
       all_type_filters[i].selected = true;
    }
    
  }

}