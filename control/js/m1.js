
document.ready(function(){
    isInfsplus()
});

function closenotice() {
    var close = document.getElementsByClassName("notice")[0];
    close.style.display = "none";
}

function getParam(paramName) {
    paramValue = "", isFound = !1;
    if (this.location.search.indexOf("?") == 0 && this.location.search.indexOf("=") > 1) {
        arrSource = unescape(this.location.search).substring(1, this.location.search.length).split("&"), i = 0;
        while (i < arrSource.length && !isFound) arrSource[i].indexOf("=") > 0 && arrSource[i].split("=")[0].toLowerCase() == paramName.toLowerCase() && (paramValue = arrSource[i].split("=")[1], isFound = !0), i++
    }
    return paramValue == "" && (paramValue = null), paramValue
}

function isInfsplus() {
    var tag = getParam("fs_device");
    var forNofsplus = document.getElementById("forNofsplus");
    var forfsplus = document.getElementById("forfsplus");
    if (tag === null){
        forNofsplus.style.display = "block";
        forfsplus.style.display = "none";
    } else {
        forNofsplus.style.display = "none";
        forfsplus.style.display = "block";
    }
}

function allsumbit() {
    var formall = new FormData(document.getElementById("maininformation"));

    var title = document.getElementById("prjname").value.length;
    var company_a = document.getElementById("prjbelong").value.length;
    var contact_person = document.getElementById("prjcontact").value.length;
    var phone = document.getElementById("prjphone").value.length;
    var identify_id = document.getElementById("prjidentify").value.length;
    var content_500 = document.getElementById("shortprjmain").value.length;
    var content = document.getElementById("shortprjverify").value.length;
    var fimg = document.getElementById("prjcover").value.length;

    if (title === 0) {
        alert("作品名称不可为空");
        return;
    }
    if (company_a === 0) {
        alert("请填写报送单位");
        return;
    }
    if (contact_person === 0) {
        alert("请填写联系人");
        return;
    }
    if (phone === 0) {
        alert("请填写联系方式");
        return;
    }
    if (identify_id === 0) {
        alert("请填写身份证号");
        return;
    }
    if (content_500 === 0) {
        alert("请填写作品概要");
        return;
    }
    if (content === 0) {
        alert("请填写作品简介");
        return;
    }
    if (fimg === 0) {
        alert("请上传作品");
        return;
    }
    ajax_postinfo(formall)
}

function ajax_postinfo(data) {
    $.ajax({
        type:"post",
        async: false,
        processData: false,
        contentType: false,
        url: 'https://server.foshanplus.com/hei_up',
        // url: 'http://172.16.20.17:8000/hei_up',
        data: data,
        success:function(receiver){
            // console.log(receiver);
            var success_id = receiver.data.id;
            // console.log(success_id);
            var strid = success_id.toString();
            // console.log(strid);
            var strid_md5 = strid.MD5().toLocaleUpperCase();
            $("#successcode").html(strid_md5);
            $("#code").css("display","block")
        },
        error: function(receiver){
            console.log(receiver);
            alert("提交失败，请稍后重试");
            return;
        }
    });
}