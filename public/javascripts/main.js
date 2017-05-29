
function checkNum() {
    var inp = document.getElementById('cval').value;
    if (isNaN(inp)){
        return false;
    }
    return true;
}


$(function () {

    var $disc = $('#disc');
    var $cval = $('#cval');

    $.ajax({
        type: 'GET',
        url: '/show',
        success: function (data) {
            $disc.append(JSON.parse(data).count);
        },
        error: function () {
            alert('error loading count');
        }
    });

    // click add button
    $('#add').on('click', function () {

        if (checkNum()==false){
            alert("Must input a numebr!");
            $cval.val("");
            return;
        }

        var cnum = {
            num: $cval.val()
        }
        console.log(cnum);
        $.ajax({
            type: 'POST',
            url: '/add',
            data: cnum,
            success: function (msg) {
                $cval.val("");
                // alert(msg);
                $disc.html(JSON.parse(msg).count);
            }

        });

    });


    // click sub button
    $('#sub').on('click', function () {

        if (checkNum()==false){
            alert("Must input a numebr!");
            $cval.val("");
            return;
        }

        var cnum = {
            num: $cval.val()
        }
        console.log(cnum);
        $.ajax({
            type: 'POST',
            url: '/sub',
            data: cnum,
            success: function (msg) {
                $cval.val("");
                // alert(msg);
                $disc.html(JSON.parse(msg).count);
            }

        });

    });

    // click clear button
    $('#clear').on('click', function () {

        $.ajax({
            type: 'POST',
            url: '/clear',
            success: function (msg) {
                $cval.val("");
                // alert(msg);
                $disc.html(JSON.parse(msg).count);
            }

        });

    });

    // click show button
    $('#show').on('click', function () {

        $.ajax({
            type: 'POST',
            url: '/show',
            success: function (msg) {
                $cval.val("");
                alert(msg);
                $disc.html(JSON.parse(msg).count);
            }

        });

    });

});




