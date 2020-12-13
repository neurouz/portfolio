function isNumeric(num){
  return !isNaN(num)
}
  
function NetworkAddressing_Show(){
  var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
  if(width < 900){
    toastr["info"]("You can still try it on desktop browser.", "This demo is not available on mobile devices or tablets")
    return;
  }
  $("#console-main").css("visibility", "visible");
}

function NetworkAddressing(){
    var textbox = document.getElementById("network-addressing-demo");
    textbox.style.color = "darkcyan";
    textbox.innerHTML = "> Compiling code ...";

    var ip_address = $("#ip-address").val();
    var subnet_mask = $("#subnet-mask").val();

    var input_data = ip_address.concat("\n").concat(subnet_mask);

    var settings = {
      "url": "https://cors-anywhere.herokuapp.com/https://wandbox.org/compile",
      "method": "POST",
      "timeout": 0,
      "headers": {
        "Content-Type": "application/json",
        "Accept": "text/event-stream",
        "Cache-Control": "no-cache",
        "X-Requested-With": "XMLHttpRequest"
      },
      "data": JSON.stringify({"compiler":"gcc-head"
      ,"code": source_code,
      "codes":[],
      "stdin": input_data,
      "options":"boost-1.73.0-gcc-head,c++17,cpp-no-pedantic",
      "compiler-option-raw":"",
      "runtime-option-raw":""}
      )};

    $(".progress").css("visibility", "visible");
    $.ajax(settings).done(function (response) {
        var parts = response.split("\n");
        var result = parts.filter(line => !isNumeric(line[0]))
        .filter(line => line.indexOf("data: Control") != 0)
        .filter(line => line.indexOf("f") != 0)
        .filter(line => line != "");

        result = result.map(line => line.replace("data: StdOut:", ""))
          .map(line => line.replace("d6", ""))
          .map(line => line.replace("data: ", ""))
          .map(line => line.replace("d9", ""));

        result = result.filter(line => line != "").join("\n");
        result = result.replace(/\n/g, "<br />");

        textbox.style.color = "lightgray";
        textbox.innerHTML = result;

        $(".progress").css("visibility", "hidden");
    })
    .fail(function(jqXHR, text, error){
        var message = jqXHR.responseText || "Network connection error.";
        textbox.style.color = "#dc3545";
        textbox.innerHTML = "> ERROR: ".concat(message);

        $(".progress").css("visibility", "hidden");
    });
}