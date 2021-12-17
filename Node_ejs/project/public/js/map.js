
$(document).ready(function(){
    $('#myModal').show();
});
function close_pop(flag) {
    $('#myModal').hide();
}

// 이미지 업로드 기능
const browseBtn = document.querySelector('.browse-btn');
const realInput = document.querySelector('.hidden-input')

browseBtn.addEventListener('click', function(){
    realInput.click();
});

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('.image-upload-wrap').hide();
            $('.file-upload-image').attr('src', e.target.result);
            $('.file-upload-content').show();
            $('.image-title').html(input.files[0].name);
        };
        reader.readAsDataURL(input.files[0]);
    } else {
        removeUpload();
    }
}

function removeUpload() {
    $('.file-upload-input').replaceWith($('.file-upload-input').clone());
    $('.file-upload-content').hide();
    $('.image-upload-wrap').show();
}
$('.image-upload-wrap').bind('dragover', function () {
    $('.image-upload-wrap').addClass('image-dropping');
});
$('.image-upload-wrap').bind('dragleave', function () {
    $('.image-upload-wrap').removeClass('image-dropping');
});

// 예측 코드
const URL = "https://teachablemachine.withgoogle.com/models/MirojN-2M/";
let model, labelContainer, maxPredictions;
// Load the image model and setup the webcam
async function predict() {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";
    // load the model and metadata
    // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
    // or files from your local hard drive
    // Note: the pose library adds "tmImage" object to your window (window.tmImage)
    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();
    labelContainer = document.getElementById("label-container");

    for (let i = 0; i < maxPredictions; i++) { // and class labels
        labelContainer.appendChild(document.createElement("div"));

    }

    var image = document.getElementById("face-image");
    const prediction = await model.predict(image, false);
    var maxpre = [];
    for (let i = 0; i < maxPredictions; i++) {
        const classPrediction =
            prediction[i].className + ": " + prediction[i].probability.toFixed(2);
            console.log(prediction[i].className)
            maxpre.push(prediction[i].probability)
        // labelContainer.childNodes[i].innerHTML = classPrediction;
    }
    console.log(maxpre);
    const max = maxpre.indexOf(Math.max(...maxpre));
    console.log(max);
    labelContainer.innerHTML = prediction[max].className;

    axios.post("http://localhost:3000/map/food",{
        "food":prediction[max].className
    }).then((response)=>{
        var foodname = response.data
        console.log(foodname);
            $("#main_pic").attr("src", foodname[0].food_img);
            $('.food-content').text(foodname[0].food_content);
        var locations = []
        for (let i = 0; i < foodname.length; i++ ) {
            locations.push([foodname[i].rest_name, foodname[i].rest_latitude, foodname[i].rest_longitude]);
            var e = $('#copy').clone()
                if(i == 0) {
                    $('#restaurant-content-btn').attr('id', 'restaurant-content-btn'+i);
                    $('#detail-btn').attr('for', 'restaurant-content-btn'+i);
                    $('#rest-img').attr("src", foodname[i].rest_img);
                    $('#restaurant-restname').text(foodname[i].rest_name);
                    $('#restaurant-restaddr').text(foodname[i].rest_addr);
                    $('#restaurant-resttel').text(foodname[i].rest_tel);
                    $('#restaurant-restscore').text(foodname[i].rest_score);
                    $('#rest-content-img').attr("src", foodname[i].rest_img);
                    $('#restaurant-content-restname').text(foodname[i].rest_name);
                    $('#restaurant-content-addr').text(foodname[i].rest_addr);
                    $('#restaurant-content-tel>span').text(foodname[i].rest_tel);
                    $('#restaurant-content-time>span').text(foodname[i].rest_time);
                    $('#restaurant-content-score>span').text(foodname[i].rest_score);
                    $('.menu1-').html(foodname[i].rest_menu1);
                    $('.price1').html(foodname[i].rest_menu1_price);
                    $('.menu2-').html(foodname[i].rest_menu2);
                    $('.price2').html(foodname[i].rest_menu2_price);
                    $('.menu3-').html(foodname[i].rest_menu3);
                    $('.price3').html(foodname[i].rest_menu3_price);
                    $('.review-score>span').text(foodname[i].rest_score);
                    $('#tab01').attr('name', 'tabmenu'+i);
                    $('#tab01').attr('id','tab01'+i);
                    $('#tab-btn1').attr('for','tab01'+i);
                    $('#tab02').attr('name', 'tabmenu'+i);
                    $('#tab02').attr('id','tab02'+i);
                    $('#tab-btn2').attr('for','tab02'+i);
                    $('#tab03').attr('name', 'tabmenu'+i);
                    $('#tab03').attr('id','tab03'+i);
                    $('#tab-btn3').attr('for','tab03'+i);
                }else {
                    $('#restaurant-content-btn'+(i-1)).attr('id','restaurant-content-btn'+i);
                    $('#detail-btn').attr('for','restaurant-content-btn'+i);
                    $('#rest-img').attr("src", foodname[i].rest_img);
                    $('#restaurant-restname').text(foodname[i].rest_name);
                    $('#restaurant-restaddr').text(foodname[i].rest_addr);
                    $('#restaurant-resttel').text(foodname[i].rest_tel);
                    $('#restaurant-restscore').text(foodname[i].rest_score);
                    $('#rest-content-img').attr("src", foodname[i].rest_img);
                    $('#restaurant-content-restname').text(foodname[i].rest_name);
                    $('#restaurant-content-addr').text(foodname[i].rest_addr);
                    $('#restaurant-content-tel>span').text(foodname[i].rest_tel);
                    $('#restaurant-content-time>span').text(foodname[i].rest_time);
                    $('#restaurant-content-score>span').text(foodname[i].rest_score);
                    $('.menu1').text(foodname[i].rest_menu1);
                    $('.menu1>span').text(foodname[i].rest_menu1_price);
                    $('.menu2').text(foodname[i].rest_menu2);
                    $('.menu2>span').text(foodname[i].rest_menu2_price);
                    $('.menu3').text(foodname[i].rest_menu3);
                    $('.menu3>span').text(foodname[i].rest_menu3_price);
                    $('.review-score>span').text(foodname[i].rest_score);
                    $('#tab01').attr('name', 'tabmenu'+i);
                    $('#tab01'+(i-1)).attr('id','tab01'+i);
                    $('#tab-btn1').attr('for','tab01'+i);
                    $('#tab02').attr('name', 'tabmenu'+i);
                    $('#tab02'+(i-1)).attr('id','tab02'+i);
                    $('#tab-btn2').attr('for','tab02'+i);
                    $('#tab03').attr('name', 'tabmenu'+i);
                    $('#tab03'+(i-1)).attr('id','tab03'+i);
                    $('#tab-btn3').attr('for','tab03'+i);

                    $('.restaurant').append(e);
            }

        }


        putThingsOnMap(locations)

        // 보여주는 곳!

    });
    $('#myModal').hide();
}

$(":radio[name='tabmenu']").attr('checked', true);

// body tag가 불러와진 후 로딩하는 함수
window.onload = initMap()

    function initMap() {

    // 광주 경도 위도 -> 지도가 뜨는 위치
    const gwangju = { lat: 35.1595454 ,lng: 126.8526012};
    var map = new google.maps.Map(document.querySelector('.map'), {
        zoom: 14,
        center: gwangju
    });
}


const putThingsOnMap = (Selectedlocations)=>{
    const gwangju = { lat: 35.1595454 ,lng: 126.8526012};
    var map = new google.maps.Map(document.querySelector('.map'), {
        zoom: 13,
        center: gwangju
    });

    // 아이콘 이미지 변경
    const icon =  {
        url : '../img/Fin.png',
        size : new google.maps.Size(50,50),
        origin : new google.maps.Point(0,0),
        anchor : new google.maps.Point(25,50),
        scaledSize : new google.maps.Size(50,50),
    };

    var infowindow = new google.maps.InfoWindow();

    var marker, i;

    for (i = 0; i < Selectedlocations.length; i++) {
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(Selectedlocations[i][1], Selectedlocations[i][2]),
            icon : icon,
            map: map
        });

        google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {
                infowindow.setContent(Selectedlocations[i][0]);
                infowindow.open(map, marker);
            }
        })(marker, i));
    }
}