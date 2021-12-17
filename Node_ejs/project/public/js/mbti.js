$('#submitBtn').hide();

function setDisplay1(){
    if($('input:radio[name=first]').is(':checked')){
        console.log('체크되었습니다.')
        $('#submitBtn').show();
    }else{
        $('#submitBtn').hide();
    }
}

function setDisplay2(){
    if($('input:radio[name=second]').is(':checked')){
        console.log('체크되었습니다.')
        $('#submitBtn').show();
    }else{
        $('#submitBtn').hide();
    }
}

function setDisplay3(){
    if($('input:radio[name=third]').is(':checked')){
        console.log('체크되었습니다.')
        $('#submitBtn').show();
    }else{
        $('#submitBtn').hide();
    }
}