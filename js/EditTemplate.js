function editTemplate(id) {

      console.log("Inside Edit Temp ID: " + id);
      templateId = id;

      $.ajax({ 
          type: 'POST',
          url: "http://localhost:3000/test/getTemplate",
          data: { 'tempId':id },
          success: function(data) {
            var temp_data = data.temp;
            //console.log("Template Data: " + JSON.stringify(data.temp, undefined, 2));
            //console.log(JSON.stringify(temp_data, undefined, 2));
            //console.log(Object.keys(data.temp));
            console.log(JSON.stringify(temp_data, undefined, 2));
            templateName = temp_data.name;
            displayPagesOfTemplate(temp_data.component);
          }
      });
  }

/*  function displayPages(pages) {
      //console.log("Old: "+JSON.stringify(pages, undefined, 2));

      template = pages;

      $('#add_new_template').css('visibility', 'hidden');
      $('#add_page').css('visibility', 'visible');

      $('#add_page').on('click', function() {
          $('#page_modal').modal('toggle');
      });

      $('#save_changes').css('visibility', 'visible');
      $('#searchInput').css('visibility', 'hidden');

      var templatePages = ''
      var pageCount = 1;

      allPages = pages;

//      console.log(typeof allPages);

      updatablePages = JSON.parse(JSON.stringify(allPages));

      pages.forEach(function(page) {

          //console.log(page[0].componentId);
          //console.log(page[0].componentDetails.header);

          pageComponents = '';
          pageDetails = '';

          if(page[0].componentId == 'C1' || page[0].componentId == 'C2' || page[0].componentId == 'C7' || page[0].componentId == 'C8') {
            pageComponents = page[0].componentId;
            pageDetails = page[0].componentDetails.header;

          } else {
            page.forEach(function(component) {

                pageComponents += component.componentId + ', ';
                pageDetails += component.componentDetails.header + ', ';

            });
          }

          templatePages += '<li class="list-group-item"><div class="no_margin"><div class="no_margin"><div><b>Page No. : '+pageCount+'</b></div><div>Components : '+pageComponents+'</div><div>Component Details : '+pageDetails+'</div></div><div class="row no_margin"><div class="col-md-4"></div><div class="col-md-8"><div style="float:right;"><div class="row no_margin" style="cursor: pointer"><div class="list_button" style="margin-left:5px;" onclick="displayComponents('+ (pageCount-1) +');">Edit</div><div class="list_button" style="margin-left:5px;" onclick="removePage('+ (pageCount-1) +');">Remove</div><div class="list_button" style="margin-left:5px;" onclick="addPageAbove('+ (pageCount-1) +');">Add Above</div></div></div></div></div></div></li>';

          pageCount++;

      });
      //console.log(pages);

      $('#templateList').hide();
      $('#componentList').hide();      

      $('#pagesList').append(templatePages);
      $('#pagesList').show();

      dest = "templates";
      $('#back_button').css('visibility', 'visible');
  }
*/

  function addPageAbove(pageIndex) {

    pageInsertIndex = pageIndex;
    $('#page_modal').modal('toggle');
    $('#selectComponentList').show();
  }


  
 /* function displayComponents(pageIndex) {

      components = allPages[pageIndex];

//      $('#save_changes').css('visibility', 'hidden');

    

      console.log(components);

      currPage = allPages[pageIndex];

      updatablePage = JSON.parse(JSON.stringify(currPage));

      var pageComponents = '';
      var count = 1;

      console.log("Original: " + currPage);

      components.forEach(function(component) {

          if(component.componentDetails.hasOwnProperty('data') && component.componentDetails.data.length > 0) {
          
          if (component.componentId == "C6") {

            pageComponents += '<li class="list-group-item" ><div class="no_margin"><div class="no_margin"><div class="m-2"><b>Component No. : '+count+'</b></div><div class="m-2">Component ID : '+component.componentId+'</div><div class="m-2">Header : <input id="component_header_'+count+'" type="text" value="'+component.componentDetails.header+'" /></div><div class="m-2">Sub-Header : <input id="component_subheader_'+count+'" type="text" value="'+component.componentDetails.subHeader+'" /></div><div class="m-2">Key : <input id="component_key" type="text" value="'+component.key+'" /></div><div style="float:right;"><div class="list_button" style="margin-left:5px;" onclick="removeComponent('+(pageIndex)+', '+(count-1)+');">Remove</div></div></div><br><table id="data_table">';

          } else if (component.componentId == "C10") {

            pageComponents += '<li class="list-group-item" ><div class="no_margin"><div class="no_margin"><div class="m-2"><b>Component No. : '+count+'</b></div><div class="m-2">Component ID : '+component.componentId+'</div><div class="m-2">Header : <input id="component_header_'+count+'" type="text" value="'+component.componentDetails.header+'" /></div><div class="m-2">Sub-Header : <input id="component_subheader_'+count+'" type="text" value="'+component.componentDetails.subHeader+'" /></div><div class="m-2">Key : <input id="component_key" type="text" value="'+component.key+'" /></div><div class="m-2">Limit : <input id="component_limit" type="text" value="'+component.componentDetails.limit+'" /></div><div style="float:right;"><div class="list_button" style="margin-left:5px;" onclick="removeComponent('+(pageIndex)+', '+(count-1)+');">Remove</div></div></div><br><table id="data_table">';
          } else {
           
            pageComponents += '<li class="list-group-item" ><div class="no_margin"><div class="no_margin"><div class="m-2"><b>Component No. : '+count+'</b></div><div class="m-2">Component ID : '+component.componentId+'</div><div class="m-2">Header : <input id="component_header_'+count+'" type="text" value="'+component.componentDetails.header+'" /></div><div class="m-2">Sub-Header : <input id="component_subheader_'+count+'" type="text" value="'+component.componentDetails.subHeader+'" /></div><div style="float:right;"><div class="list_button" style="margin-left:5px;" onclick="removeComponent('+(pageIndex)+', '+(count-1)+');">Remove</div></div></div><br><table id="data_table">';
          }
            var dataItems = '<tr> <td> Title </td> <td> Id </td> <td> Sub Title </td> <td> Icon </td> </tr>';
            var itemCount = 0;

            component.componentDetails.data.forEach(function(item) {


                dataItems += '<tr> <td><input id="component_data_title_'+(count-1)+'_'+itemCount+'" type="text" value="'+item.displayTitle+'" /></td> <td><input id="component_data_'+(count-1)+'_'+itemCount+'" type="text" value="'+item.displayId+'" /></td> <td><input id="component_data_subtitle_'+(count-1)+'_'+itemCount+'" type="text" value="'+item.displaySubTitle+'" /></td> <td><a id="component_data_icon_'+(count-1)+'_'+itemCount+'" href="'+ (item.displayIcon ? item.displayIcon : "#" ) + '"> '+ (item.displayIcon ? "Click to show Icon" : "No Image to display" ) +' </a></td><td><input onchange="changeIcon('+(count-1)+','+itemCount+')" id="component_change_data_icon_'+(count-1)+'_'+itemCount+'" type="file" /></td> </tr>';

                console.log(item.displayIcon ? item.displayIcon : '#');

                itemCount++;
            });

            pageComponents += dataItems + '</table><div class="row no_margin"><div><div><div class="row no_margin" style="cursor: pointer"><div style="float:left"><div class="list_button" style="margin-left:5px; display:inline-block;" onclick="editComponent('+(count-1)+');">Save</div><div class="list_button" style="margin-left:5px; display:inline-block;" onclick="addDataInComponent('+(count-1)+');">Add Data</div></div></div></div></div></div></div></li>';


          } else {


              if (component.componentId == "C10") {

              pageComponents += '<li class="list-group-item" ><div class="no_margin"><div class="no_margin"><div class="m-2"><b>Component No. : '+count+'</b></div><div class="m-2">Component ID : '+component.componentId+'</div><div class="m-2">Header : <input id="component_header_'+count+'" type="text" value="'+component.componentDetails.header+'" /></div><div class="m-2">Sub-Header : <input id="component_subheader_'+count+'" type="text" value="'+component.componentDetails.subHeader+'" /></div><div class="m-2">Key : <input id="component_key" type="text" value="'+component.key+'" /></div><div class="m-2">Limit : <input id="component_limit" type="text" value="'+component.componentDetails.limit+'" /></div><div style="float:right;"><div class="list_button" style="margin-left:5px;" onclick="removeComponent('+(pageIndex)+', '+(count-1)+');">Remove</div></div></div><br><table id="data_table">';

              } else {



              pageComponents += '<li class="list-group-item"><div class="no_margin"><div class="no_margin"><div class="m-2"><b>Component No. : '+count+'</b></div><div class="m-2">Component ID : '+component.componentId+'</div><div class="m-2">Header : <input id="component_header_'+count+'" type="text" value="'+component.componentDetails.header+'" /></div><div class="m-2">Sub-Header : <input id="component_subheader_'+count+'" type="text" value="'+component.componentDetails.subHeader+'" /></div><div class="m-2">Key : <input id="component_key" type="text" value="'+component.key+'" /></div><div class="m-2">DataUrl : <input id="component_dataurl" type="text" value="'+component.componentDetails.dataUrl+'" /></div><div class="m-2">SearchUrl : <input id="component_searchurl" type="text" value="'+component.componentDetails.searchUrl+'" /></div><div class="row no_margin"><div><div><div class="row no_margin" style="cursor: pointer"><div style="float:left"><div class="list_button" style="margin-left:5px;" onclick="editComponent('+(count-1)+');">Save</div></div></div></div></div></div></div></li>';
            }
          }

          count++;
      });

      $('#pagesList').hide();

      //$('#componentPicker').css('visibility', 'visible');
      $('#componentList').append(pageComponents);
      $('#componentList').show();
      $('#data_table').DataTable();

      dest = "pages";
      $('#back_button').css('visibility', 'visible');

  }*/

    function removePage(pageIndex) {

    allPages.splice(pageIndex, 1);
    console.log(JSON.stringify(allPages, undefined, 2));
    log += 'Page No. ' + (pageIndex+1) + ' removed from Template ' + templateId + ' ,  ';
    $('#pagesList').empty();
    displayPagesOfTemplate(allPages);
  }


    function removeComponent(pageIndex, componentIndex) {

    if(currPage.length == 1) {

        allPages.splice(pageIndex, 1);
        log += 'Page No. ' + (pageIndex+1) + ' removed from Template ' + templateId + ' ,  ';
        console.log(JSON.stringify(allPages, undefined, 2));
    
    } else {
    
      currPage.splice(componentIndex, 1);
      log += 'Component No. ' + (componentIndex+1) + ' removed from Page No. ' + (pageIndex+1) + ' of Template ' + templateId + ' ,  ';
      console.log(JSON.stringify(currPage, undefined, 2));
        
    }

    $('#componentList').empty();
    displayPagesOfTemplate(allPages);

  }



 /* function editComponent(componentIndex) {

      //console.log(JSON.stringify(currPage[componentIndex], undefined, 2));

      var component = currPage[componentIndex];

      var updatedComponent = {};

        updatedComponent['componentId'] = component.componentId;
        if(component.componentId == "C6") updatedComponent['key'] = $('#component_key').val();
        else updatedComponent['key'] = component.key;

        updatedComponent['componentDetails'] = {};

      updatedComponent.componentDetails.header = ($('#component_header_' + (componentIndex+1)).val() ? $('#component_header_' + (componentIndex+1)).val() : "");
      updatedComponent.componentDetails.subHeader = ($('#component_subheader_' + (componentIndex+1)).val() ? $('#component_subheader_' + (componentIndex+1)).val() : "");


      if(component.componentId == "C10") { 
        updatedComponent.componentDetails.limit = $('#component_limit').val();
        updatedComponent.componentDetails.type = component.componentDetails.type;        
      }

      if(typeof $('#component_dataurl').val() !== 'undefined') {
        
        updatedComponent.componentDetails.dataUrl = $('#component_dataurl_' + (componentIndex+1)).val();
        updatedComponent.componentDetails.searchUrl = $('#component_searchurl_' + (componentIndex+1)).val();
        
        updatedComponent.componentDetails.data = [];


      } else { 

        updatedComponent.componentDetails.dataUrl = ""; 
        updatedComponent.componentDetails.searchUrl = ""; 
        updatedComponent.componentDetails.data = [];

        var itemCount = 0;

        component.componentDetails.data.forEach(function(item) {

            if ($("#component_data_"+componentIndex+"_"+itemCount+"").val() != "" ||
                $("#component_data_title_"+componentIndex+"_"+itemCount+"").val() != "") {
                

                var dataItem = {};
                dataItem.displaySubTitle = $("#component_data_subtitle_"+componentIndex+"_"+itemCount+"").val();
                //dataItem.displayIcon = item.displayIcon;

                dataItem.displayIcon = updatablePage[componentIndex].componentDetails.data[itemCount].displayIcon;

                console.log("Icons: " + updatablePage[componentIndex].componentDetails.data[itemCount].displayIcon);

                dataItem.displayId = $("#component_data_"+componentIndex+"_"+itemCount+"").val();
                dataItem.displayTitle = $("#component_data_title_"+componentIndex+"_"+itemCount+"").val();

                updatedComponent.componentDetails.data.push(dataItem);

            } /* else {
                
                dataItem.displayId = "";
                dataItem.displayTitle = "";
            } */

  //          console.log($("#component_data_"+itemCount+"").val());
            
  /*
            itemCount++;
        });

        while(itemCount < updatablePage[componentIndex].componentDetails.data.length) {

            if ($("#component_data_"+componentIndex+"_"+itemCount+"").val() != "" ||
                $("#component_data_title_"+componentIndex+"_"+itemCount+"").val() != "") {
                

                var dataItem = {};
                dataItem.displaySubTitle = $("#component_data_subtitle_"+componentIndex+"_"+itemCount+"").val();
                //dataItem.displayIcon = item.displayIcon;

                dataItem.displayIcon = updatablePage[componentIndex].componentDetails.data[itemCount].displayIcon;

                dataItem.displayId = $("#component_data_"+componentIndex+"_"+itemCount+"").val();
                dataItem.displayTitle = $("#component_data_title_"+componentIndex+"_"+itemCount+"").val();

                updatedComponent.componentDetails.data.push(dataItem);
            }
            itemCount++;
        }

      }
/*
      console.log($('#component_header').val());
      console.log($('#component_subheader').val());
      console.log($('#component_dataurl').val());

      console.log(allPages.indexOf(currPage));
*/
//      console.log("Old: " + JSON.stringify(component, undefined, 2));
//      console.log("New: " + JSON.stringify(updatedComponent, undefined, 2));

/*      console.log("OldData: "+JSON.stringify(allPages, undefined, 2));

      var pageLoc = allPages.indexOf(currPage);
      currPage[componentIndex] = updatedComponent;
      allPages[pageLoc] = currPage;

      console.log("Loc: " + pageLoc);

      console.log("NewData: "+JSON.stringify(allPages, undefined, 2));

      $('#pagesList').empty();
      $('#componentList').empty();

      $('#save_changes').css('visibility', 'visible');
      $('#refresh').css('visibility', 'hidden');
      $('#add_template').css('visibility', 'hidden');

      log += 'Data Updated of Component No. ' + (componentIndex+1) + ' of Page No. ' + (pageLoc+1) + ' of Template ' + templateId + ' ,  ';

      displayPages(allPages);

      //displayPagesToEdit(allPages);
  }*/



 /*  function displayEditedComponents(pageIndex) {

      components = updatablePages[pageIndex];

//      console.log(components);
      $('#save_changes').css('visibility', 'hidden');

      var pageComponents = '';
      var count = 1;

      components.forEach(function(component) {

          if(component.componentDetails.data.length > 0) {


            if (component.componentId == "C6") {

            pageComponents += '<li class="list-group-item" ><div class="no_margin"><div class="no_margin"><div class="m-2"><b>Component No. : '+count+'</b></div><div class="m-2">Component ID : '+component.componentId+'</div><div class="m-2">Header : <input id="component_header_'+count+'" type="text" value="'+component.componentDetails.header+'" /></div><div class="m-2">Sub-Header : <input id="component_subheader_'+count+'" type="text" value="'+component.componentDetails.subHeader+'" /></div><div class="m-2">Key : <input id="component_key" type="text" value="'+component.key+'" /></div><div style="float:right;"><div class="list_button" style="margin-left:5px;" onclick="removeComponent('+(pageIndex)+', '+(count-1)+');">Remove</div></div></div><br><table id="data_table">';

          }  else if (component.componentId == "C10") {

            pageComponents += '<li class="list-group-item" ><div class="no_margin"><div class="no_margin"><div class="m-2"><b>Component No. : '+count+'</b></div><div class="m-2">Component ID : '+component.componentId+'</div><div class="m-2">Header : <input id="component_header_'+count+'" type="text" value="'+component.componentDetails.header+'" /></div><div class="m-2">Sub-Header : <input id="component_subheader_'+count+'" type="text" value="'+component.componentDetails.subHeader+'" /></div><div class="m-2">Key : <input id="component_key" type="text" value="'+component.key+'" /></div><div class="m-2">Limit : <input id="component_limit" type="text" value="'+component.componentDetails.limit+'" /></div><div style="float:right;"><div class="list_button" style="margin-left:5px;" onclick="removeComponent('+(pageIndex)+', '+(count-1)+');">Remove</div></div></div><br><table id="data_table">';


          } else {
           
          
            pageComponents += '<li class="list-group-item" ><div class="no_margin"><div class="no_margin"><div><b>Component No. : '+count+'</b></div><div>Component ID : '+component.componentId+'</div><div>Header : <input id="component_header_'+count+'" type="text" value="'+component.componentDetails.header+'" /></div><div>Sub-Header : <input id="component_subheader_'+count+'" type="text" value="'+component.componentDetails.subHeader+'" /></div><div style="float:right;"><div class="list_button" style="margin-left:5px;" onclick="removeComponent('+(pageIndex)+', '+(count-1)+');">Remove</div></div></div><br><table id="data_table">';
          }
            var dataItems = '<tr> <td> Title </td> <td> Id </td> <td> Sub Title </td> <td> Icon </td> </tr>';
            var itemCount = 0;

            component.componentDetails.data.forEach(function(item) {




                dataItems += '<tr> <td><input id="component_data_title_'+(count-1)+'_'+itemCount+'" type="text" value="'+item.displayTitle+'" /></td> <td><input id="component_data_'+(count-1)+'_'+itemCount+'" type="text" value="'+item.displayId+'" /></td> <td><input id="component_data_subtitle_'+(count-1)+'_'+itemCount+'" type="text" value="'+item.displaySubTitle+'" /></td> <td><a id="component_data_icon_'+(count-1)+'_'+itemCount+'" href="'+ (item.displayIcon ? item.displayIcon : "#" ) + '"> '+ (item.displayIcon ? "Click to show Icon" : "No Image to display" ) +' </a></td><td><input onchange="changeIcon('+(count-1)+','+itemCount+')" id="component_change_data_icon_'+(count-1)+'_'+itemCount+'" type="file" /></td> </tr>';

                console.log(item.displayIcon ? item.displayIcon : '#');

                itemCount++;
            });

             //'+ (item.displayIcon ? "Click to show Icon" : "No Image to display" ) +'

            pageComponents += dataItems + '</table><div class="row no_margin"><div><div><div class="row no_margin" style="cursor: pointer"><div style="float:left"><div class="list_button" style="margin-left:5px; display:inline-block;" onclick="editComponent('+(count-1)+');">Save</div><div class="list_button" style="margin-left:5px; display:inline-block;" onclick="addDataInComponent('+(count-1)+');">Add Data</div></div></div></div></div></div></div></li>';




          } else {

            if (component.componentId == "C10") {

              pageComponents += '<li class="list-group-item" ><div class="no_margin"><div class="no_margin"><div class="m-2"><b>Component No. : '+count+'</b></div><div class="m-2">Component ID : '+component.componentId+'</div><div class="m-2">Header : <input id="component_header_'+count+'" type="text" value="'+component.componentDetails.header+'" /></div><div class="m-2">Sub-Header : <input id="component_subheader_'+count+'" type="text" value="'+component.componentDetails.subHeader+'" /></div><div class="m-2">Key : <input id="component_key" type="text" value="'+component.key+'" /></div><div class="m-2">Limit : <input id="component_limit" type="text" value="'+component.componentDetails.limit+'" /></div><div style="float:right;"><div class="list_button" style="margin-left:5px;" onclick="editComponent('+(count-1)+');">Save</div><div class="list_button" style="margin-left:5px;" onclick="removeComponent('+(pageIndex)+', '+(count-1)+');">Remove</div></div></div><br><table id="data_table">';

              } else {

                  pageComponents += '<li class="list-group-item"><div class="no_margin"><div class="no_margin"><div><b>Component No. : '+count+'</b></div><div>Component ID : '+component.componentId+'</div><div>Header : <input id="component_header_'+count+'" type="text" value="'+component.componentDetails.header+'" /></div><div>Sub-Header : <input id="component_subheader_'+count+'" type="text" value="'+component.componentDetails.subHeader+'" /></div><div class="m-2">Key : <input id="component_key" type="text" value="'+component.key+'" /></div><div>DataUrl : <input id="component_dataurl_'+count+'" type="text" value="'+component.componentDetails.dataUrl+'" /></div><div>SearchUrl : <input id="component_searchurl_'+count+'" type="text" value="'+component.componentDetails.searchUrl+'" /></div><div class="row no_margin"><div><div><div class="row no_margin" style="cursor: pointer"><div style="float:left"><div class="list_button" style="margin-left:5px;" onclick="editComponent('+(count-1)+');">Save</div></div></div></div></div></div></div></li>';
            }
          }

          count++;
      });

      $('#pagesList').hide();

      //$('#componentPicker').css('visibility', 'visible');
      $('#componentList').append(pageComponents);
      $('#componentList').show();
      $('#data_table').DataTable();

      dest = "pages";
      $('#back_button').css('visibility', 'visible');

  }*/

