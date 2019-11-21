$(document).ready(function(){
	$("#addRec").click(function(){
	const fullName = document.getElementById('fullName').value
    const major = document.getElementById('major').value
	const startYear= document.getElementById('startYear').value;
	if (startYear <= 2000) {
    window.alert('Incorrect year: ' + startYear)
    return
	}
    const date = new Date()
    const time = date.getHours() + ':' + date.getMinutes()

    const newEntry = time + ' - ' + fullName + ', ' + major + ', ' + startYear 

    const enteredRecords = document.getElementById('enteredRecords')
    let newChild = document.createElement('li')
    newChild.appendChild(document.createTextNode(newEntry))

    enteredRecords.appendChild(newChild)

    document.getElementById('inputs').reset()
	
	/* AJAX call to post the data users path */
	$.ajax({
				method: 'POST',
				url: '/users/',
				type: 'POST',
				data: {
					fullName:$('#fullName').val(),
					major:$('#major').val(),
					startYear: $('#startYear').val(),
					
				    }
				
		    })
		});
	});

			
$(document).ready(function(){
	$("#loadData").click(function(){
	$("#displayData").empty();
		$.getJSON("/users", function(result){
		  $.each(result, function(i, field){
		   for(var k=0;k<field.length;k++){
				$("#displayData").append(field[k].fullName + " , " + field[k].major + " ,  " + field[k].startYear + "<button value='" +field[k].id+ "' id ='deleteData'>Delete</button>" +"<br>" );
				console.log(field[k].id);
				
			   }
		  
		  });
		});
	  });
	});
	
	
$(document).on("click","#deleteData",function(){
	const id= $(this).val();	
	console.log(id);
	
	/* AJAX call to delete the data */
	
	$.ajax({
				method: 'DELETE',
				url: '/user/'+id,
				type: '',
				
		  })
	loadAgain();
	});
			
/* Function to load the details again after deleting */
			
function loadAgain()
		{
	        document.getElementById("displayData").innerHTML=" ";
			$.getJSON("/users", function(result){
		    $.each(result, function(i, field){
		    for(var k=0;k<field.length;k++){
				$("#displayData").append(field[k].fullName + " , " + field[k].major + " ,  " + field[k].startYear + "<button value='" +field[k].id+ "' id ='deleteData'>Delete</button>" +"<br>" );
				console.log(field[k].id);
			   }
		  
		  });
		});
		}
			   
			
			
	