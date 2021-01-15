

$(".content").hide();
$('body').append('<div style="" id="loadingDiv"><div class="loader">Loading...</div></div>');
$(window).on('load', function(){
    setTimeout(removeLoader, 2000); //wait for page load PLUS two seconds.
});
function removeLoader(){
    $(".content").fadeIn(500);
    $( "#loadingDiv" ).fadeOut(500, function() {
        // fadeOut complete. Remove the loading div
        $( "#loadingDiv" ).remove(); //makes page more lightweight 
    });  
}

$(function (){
    AOS.init();

    toastr.options = {
        "closeButton": true,
        "debug": false,
        "newestOnTop": false,
        "progressBar": true,
        "positionClass": "toast-bottom-full-width",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "7000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    };

    window.onscroll = function(){      

        if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) 
        {
            $("#navbar").css("transform", "rotateZ(0deg)");
          
            document.getElementById("navbar").style.backgroundColor = "white";            
            document.getElementById("navbar").style.borderBottom = "1px solid lightgray";    
            document.getElementById("navbar").style.opacity = "0.8";      
            for(let i=0; i<document.getElementById("navbar").children.length; i++){
                document.getElementById("navbar").children[i].style.color="rgb(0, 121, 128)";
                document.getElementById("navbar").children[i].style.fontSize ="2.25vh";
            }        
        }
        else
        {
            $("#navbar").css("transform", "rotateZ(3deg)");

            document.getElementById("navbar").style.borderBottom = "none";     
            document.getElementById("navbar").style.opacity = "1";      
            document.getElementById("navbar").style.backgroundColor = "transparent";    
            for(let i=0; i<document.getElementById("navbar").children.length; i++){
                document.getElementById("navbar").children[i].style.color="white";
                document.getElementById("navbar").children[i].style.fontSize ="2.25vh";

            }
        }
}
    var navbuttons = $(".nav-button");
    for(let i=0; i<navbuttons.length; i++){
       navbuttons[i].addEventListener("mouseover", function(){
            $(".navtext")[i].style.opacity = "1";         
       })
       navbuttons[i].addEventListener("mouseout", function(){
            $(".navtext")[i].style.opacity = "0";                      
   })
    }

    var menuButton = document.getElementById("menuicon");
    menuButton.addEventListener("click", function(){
        var navbar = document.getElementById("navbar");
        if(navbar.style.display == "flex"){
            navbar.style.display = "none";
        }
        else{
            navbar.style.display = "flex";
        }
    });

    $("#exit").on("click", () => {
        $("#console-main").css("visibility", "hidden");
        $(".progress").css("visibility", "hidden");
    });

    $("#network-exit").on("click", () => {
        $("#console-main").css("visibility", "hidden");
        $(".progress").css("visibility", "hidden");
    });

    $("#network-submit").on("click", () => {
        NetworkAddressing();
    });

    $("#form").validate({
        rules: {
            ip: {
                required: true
            },
            subnet: {
                required: true
            }
        },
        messages: {
            ip: {
                required: ""
            },
            subnet: {
                required: ""
            }
        },
        submitHandler: () => { NetworkAddressing(); }
    });

    $('.input100').each(function(){
        $(this).on('blur', function(){
            if($(this).val().trim() != "") {
                $(this).addClass('has-val');
            }
            else {
                $(this).removeClass('has-val');
            }
        })    
    })

    /*==================================================================
    [ Validate ]*/
    var input = $('.validate-input .input100');

    $("#network-submit").on('submit', function(e){
        e.preventDefault();
    });

    $('.validate-form').on('submit',function(e){
        e.preventDefault();
        var check = true;

        for(var i=0; i<input.length; i++) {
            if(validate(input[i]) == false){
                showValidate(input[i]);
                check=false;
            }
        }

        if(check){

            const from_name = $("#contact-name").val();
            const from_mail = $("#contact-email").val();
            const content = $("#contact-message").val();

            var nameDiv = `<h3 style='color: darkcyan;'>Contact name: <b>${from_name}</b> </h3>`;
            var mailDiv = `<h3 style='color: darkcyan;'>Contact mail: <b>${from_mail}</b> </h3>`;
            var contentDiv = `<br> <h4 style='text-align: left;'>Message text: ${content} </h4>`;

            var mail_message = nameDiv + mailDiv + contentDiv; 
            SendMail(mail_message);
        }

        return check;
    });

    function SendMail(mail_message){
        Email.send({
            SecureToken: '6cdcb423-b057-4c82-bf3d-7933841d66a0',
            To : 'ajdin.hukara@edu.fit.ba',
            From : "ajdin.hukara@gmail.com",
            Subject : 'New contact request',
            Body : mail_message
            }).then(
                message => {
                    if(message === "OK")
                        toastr["info"]("You should receive a response ASAP.", "Email sucessfuly sent!");
                    else 
                        toastr["error"](message, "Warning");
            });
    }


    $('.validate-form .input100').each(function(){
        $(this).focus(function(){
           hideValidate(this);
        });
    });

    function validate (input) {
        if($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
            if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                return false;
            }
        }
        else {
            if($(input).val().trim() == ''){
                return false;
            }
        }
    }

    function showValidate(input) {
        var thisAlert = $(input).parent();
        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();
        $(thisAlert).removeClass('alert-validate');
    }
    

    /*==================================================================
    [ Show / hide Form ]*/
    
    $('.contact100-btn-hide').on('click', function(){
        $('.wrap-contact100').fadeOut(400);
    })

    $('.contact100-btn-show').on('click', function(){
        $('.wrap-contact100').fadeIn(400);
    })
}
);