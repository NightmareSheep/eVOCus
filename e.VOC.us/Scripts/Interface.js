$(".header").click(function () {
    if ($("#map").height() != 0) {
        console.log("in deze if");
        $("#map").animate({ height: '0px' }, 1000);
        $(".minimap").animate({height:'20px'}, 1000);
        $("#arrow").addClass("transform");
    }
    else {
        console.log("in deze else");
        $(".minimap").animate({ height: '220px' }, 1000);
        $("#map").animate({ height: '200px' }, 1000);
        $("#arrow").removeClass("transform");
    }
}
);