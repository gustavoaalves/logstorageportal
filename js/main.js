const endpoint = "http://localhost:8080/logstore-0.0.1-SNAPSHOT"

$( document ).ready(function() {
  $.get( endpoint+"/log", function( data ) {
    data.forEach((log) => {
        var content;
        if (log.content.length > 150) {
          content = log.content.slice(0,150) + '...'
        } else {
          content = log.content;
        }
        var table = document.getElementById("logTable");
        var row = table.insertRow();
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        cell1.textContent = content;
        cell2.innerHTML = log.occurrences
        })
  });
});

$('#newLogModal').on('shown.bs.modal', function (e) {
   $("#content").focus();
})

$("#content").keyup(function(event) {
    if (event.keyCode === 13) {
        $("#newLogForm").submit(e);
    }
});

$("#occurrences").keyup(function(event) {
    if (event.keyCode === 13) {
        $("#newLogForm").submit(e);
    }
});

$( "#newLogForm" ).submit(function(e) {
  e.preventDefault();
  var obj = {}
  obj.content = $("#content").val();;
  obj.occurrences = $("#occurrences").val();
    $.ajax({
      type: 'POST',
      url: endpoint+"/log",
      data: JSON.stringify(obj),
      complete: function (data) { $('#newLogModal').modal("hide"); location.reload(); },
      contentType: "application/json",
      dataType: 'json'
    });
});