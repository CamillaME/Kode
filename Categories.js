$("#countdown").html($("#MaxQuantity").val());

var counter = 0;

$("input[name='MaxQuantityInput']").each(function () {
    counter += parseInt($(this).val());

    if ($(this).val() == 0) {
        $(this).prev($("button[name='-']")).prop('disabled', true);
    }
    else {
        $(this).prev($("button[name='-']")).prop('disabled', false);
    }
});

if (counter != 0) {
    if (parseInt($("#countdown").html()) - counter > 0) {
        $("#countdown").html(parseInt($("#countdown").html() - counter));
    }
    else {
        $("#countdown").html(0);
    }
}

if (parseInt($("#countdown").html()) == 0) {
    $("#Next_Category").prop('disabled', false);
}
else {
    $("#Next_Category").prop('disabled', true);
}

$("button[name='+']").click(function () {
    var sum = 0;

    $("input[name='MaxQuantityInput']").each(function () {
        sum += parseInt($(this).val());
    });

    if (parseInt($("#countdown").html()) != 0) {
        $("#countdown").html(parseInt($("#countdown").html()) - 1);
    }

    var value = parseInt($(this).prev($("input[name='MaxQuantityInput']")).val());

    $(this).prev($("input[name='MaxQuantityInput']")).val(value + 1);
    $(this).prev($("input[name='MaxQuantityInput']")).prev($("button[name='-']")).prop('disabled', false);

    if ((sum + 1) >= $("#MaxQuantity").val()) {
        $("#Next_Category").prop('disabled', false);
    }
    else {
        $("#Next_Category").prop('disabled', true);
    }
});

$("button[name='-']").click(function () {
    var sum = 0;

    $("input[name='MaxQuantityInput']").each(function () {
        sum += parseInt($(this).val());
    });

    if ((sum) <= $("#MaxQuantity").val()) {
        $("#countdown").html(parseInt($("#countdown").html()) + 1);
        $("#Next_Category").prop('disabled', true);
    }
    else {
        $("#Next_Category").prop('disabled', false);
    }

    var value = parseInt($(this).next($("input[name='MaxQuantityInput']")).val());

    if (value != 1) {
        $(this).next($("input[name='MaxQuantityInput']")).val(value - 1);
    }
    else {
        $(this).next($("input[name='MaxQuantityInput']")).val(value - 1);
        $(this).prop('disabled', true);

        if ($("button[name='-']").not(this).next($("input[name='MaxQuantityInput']")).val() = 0) {
            $("button[name='-']").not(this).prop('disabled', true);
        }
    }
});