
/*
    note：第三页控制
    anthor：zx
*/

function initFile() {
    $("#prjvideo").fileinput({
        language: "zh",//配置语言
        showUpload : false, //显示整体上传的按钮
        showRemove : false, //显示整体删除的按钮
        uploadAsync: true, //默认异步上传
        dropZoneEnabled: false,
        showPreview: false,
        maxFileSize : 2097152,//文件大小限制
        maxFileCount: 100,//允许最大上传数，可以多个，
        enctype: 'multipart/form-data',
        allowedFileExtensions : ["mov", "mp4", "mpeg"],/*上传文件格式限制*/
        msgFilesTooMany: "选择上传的文件数量({n}) 超过允许的最大数值{m}！",
        // uploadUrl: commonlink + 'hei_up',
    });

    $("#prjcover").fileinput({
        language: "zh",//配置语言
        showUpload : false, //显示整体上传的按钮
        showRemove : false, //显示整体删除的按钮
        uploadAsync: true, //默认异步上传
        uploadLabel: "上传", //设置整体上传按钮的汉字
        dropZoneEnabled: false,
        showPreview: false,
        maxFileSize : 2097152,//文件大小限制
        maxFileCount: 100,//允许最大上传数，可以多个，
        enctype: 'multipart/form-data',
        allowedFileExtensions : ["png", "jpg"],/*上传文件格式限制*/
        msgFilesTooMany: "选择上传的文件数量({n}) 超过允许的最大数值{m}！",
    });
}

function initLiteswitchp3() {
    liteswitch = new liteswitch({//下面要用到，就要声明为全局变量
        loop: false,
        startIndex: 0,//起始滑块的索引（从零开始）
        draggable: false,//使用拖动和触摸滑动
    });
}

function steppre() {
    liteswitch.prev();
    step.step("previous");
}

function inittype() {
    $('input[name="v_type"]').change(function(e) {
        var v_type = $("input[name='v_type']:checked").val();
        if(v_type === "摄影作品") {
            $("#forvideoprj").css("display", "none");
            $("#forvideopostprj").html("上传作品: ");

            $("#prjdirector").val("无");
            $("#prjwriter").val("无");
            $("#prjphotograph").val("无");
            $("#prjredeal").val("无");
            $("#prjactor").val("无");

            $("#prjdirector").attr("disabled","disabled");
            $("#prjwriter").attr("disabled","disabled");
            $("#prjphotograph").attr("disabled","disabled");
            $("#prjredeal").attr("disabled","disabled");
            $("#prjactor").attr("disabled","disabled");

        }else {
            
            $("#forvideoprj").css("display", "flex");
            $("#forvideopostprj").html("上传封面: ");

            $("#prjdirector").val("");
            $("#prjwriter").val("");
            $("#prjphotograph").val("");
            $("#prjredeal").val("");
            $("#prjactor").val("")

            $("#prjdirector").removeAttr("disabled");
            $("#prjwriter").removeAttr("disabled");
            $("#prjphotograph").removeAttr("disabled");
            $("#prjredeal").removeAttr("disabled");
            $("#prjactor").removeAttr("disabled");
        }
    })
}

function stepnext_1to2() {

    var title = $("#prjname").val().length;
    var ffile = $("#prjvideo")[0].files.length;
    var v_type = $("input[name='v_type']:checked").val();
    var fimg = $("#prjcover")[0].files.length;

    if (title === 0) {
        swal({title: "作品名称不可为空",icon: "error",});
        return;
    }
    if ((ffile === 0) && (v_type === "微视频作品")) {
        swal({title: "请上传作品文件",icon: "error",});
        return;
    }
    if (fimg === 0) {
        swal({title: "请上传作品封面",icon: "error",});
        return;
    }

    liteswitch.next()
    step.step("next");
}

function stepnext_2to3() {

    var company_a = $("#prjbelong").val().length;
    var contact_person = $("#prjcontact").val().length;
    var phone = $("#prjphone").val().length;
    var identify_id = $("#prjidentify").val().length;

    if (company_a === 0) {
        swal({title: "请填写报送单位",icon: "error",});
        return;
    }
    if (contact_person === 0) {
        swal({title: "请填写联系人",icon: "error",});
        return;
    }
    if (phone === 0) {
        swal({title: "请填写联系方式",icon: "error",});
        return;
    }
    if (identify_id === 0) {
        swal({title: "请填写身份证号",icon: "error",});
        return;
    }

    liteswitch.next()
    step.step("next");

    var v_type = $("input[name='v_type']:checked").val();
    if(v_type === "摄影作品") {
        swal({
            title: "您无需填写本页内容",
            icon: "warning",
            closeOnClickOutside: false,
        }).then(done=>{
            liteswitch.next()
            step.step("next");
        });
    }
}

function stepnext_3to4() {

    var director = $("#prjdirector").val().length;
    var screenwriter = $("#prjwriter").val().length;
    var photography = $("#prjphotograph").val().length;
    var clip = $("#prjredeal").val().length;

    if (director === 0) {
        swal({title: "请填写导演",icon: "error",});
        return;
    }
    if (screenwriter === 0) {
        swal({title: "请填写编剧",icon: "error",});
        return;
    }
    if (photography === 0) {
        swal({title: "请填写摄像",icon: "error",});
        return;
    }
    if (clip === 0) {
        swal({title: "请填写剪辑",icon: "error",});
        return;
    }

    liteswitch.next()
    step.step("next");
}

function initLitestep() {
    step.step({
        initStep: 1,
        stepNames: ["作品名称", "申报单位", "主创人员资料", "内容简介"]
    });
}

function postToshort(writepart, postpart, modal) {
    var inside = $('#' + writepart).val();
    if(inside === ""){
        swal({
            title: "内容不可为空",
            icon: "error",
        });
    }else {
        $('#' + postpart).val(inside);
        swal({
            title: "保存成功",
            icon: "success",
        }).then(done=>{
            $('#' + modal).modal("hide")
        });
    }
}

function submitinfo() {

    var starring = $("#prjactor").val().length;
    var content_500 = $("#shortprjmain").val();
    var content = $("#shortprjverify").val();
    var read = $("#read").is(":checked");

    if (starring === 0) {
        swal({title: "请填写演员",icon: "error",});
        return;
    }
    if (content_500 === '您还没有提交作品梗概') {
        swal({title: "请填写作品梗概",icon: "error",});
        return;
    }
    if (content === '您还没有提交作品简介') {
        swal({title: "请填写作品简介",icon: "error",});
        return;
    }
    if (read === false) {
        swal({title: "请阅读活动规则后勾选",icon: "error",});
        return;
    }

    // swal({
    //     title: "提交成功x",
    //     icon: "success",
    //     text: '请等待作品审核，您可以在佛山+中查看审核进度 \r\n 123123 ',
    //     content: {
    //         element: "img",
    //         attributes: {
    //             src: "././img/basic/2.png",
    //         },
    //     },
    // }).then(done=>{
    //     //提交成功后，隐藏返回按钮，提交按钮，修改模态框按钮，禁用输入框和复选框
    //     $("#finalpre").css("display","none");
    //     $("#finalsubmit").css("display","none");
    //     $(".showmodal").css("display","none");
    //     $('#prjactor').prop("disabled", true);
    //     $('#read').prop("disabled", true);

    //     //提交成功后显示禁用按钮
    //     $(".finalsubmitted").css("display","block");
    // });
    // return

    var formall = new FormData(document.getElementById("maininformation"));
    $.ajax({
        type:"post",
        async: false,
        processData: false,
        contentType: false,
        url: commonlink + 'hei_up',
        // url: 'http://172.16.20.17:8000/hei_up',
        data: formall,
        //****************
        // data: {"exam_id":exam_id, "title": title, 'ffile':ffile, 'v_type': v_type, 'fimg': fimg, 'company_a': company_a, 'contact_person': contact_person, 'phone': phone, 'director': director, 'screenwriter': screenwriter, 'photography': photography, 'clip': clip, 'starring': starring, 'content_500': content_500, 'content': content,},
        //****************

        // dataType:"json",
        success:function(receiver){
            console.log(receiver);
            var success_id = receiver.data.id;
            // console.log(success_id);
            var strid = success_id.toString();
            // console.log(strid);
            var strid_md5 = strid.MD5().toLocaleUpperCase();
            // console.log(strid_md5);
            swal({
                title: "提交成功",
                icon: "success",
                text: '请牢记您的作品识别码，本码仅展示一次 \r\n \r\n' + strid_md5 + '\r\n \r\n 扫码下载佛山+，查看作品审核进度',
                closeOnClickOutside: false,
                content: {
                    element: "img",
                    attributes: {
                        src: "http://img.foshanplus.com/2020/pic/chan/basic/download.png",
                    },
                    element: "img",
                },
            }).then(done=>{
                //提交成功后，隐藏返回按钮，提交按钮，修改模态框按钮，禁用输入框和复选框
                $("#finalpre").css("display","none");
                $("#finalsubmit").css("display","none");
                $(".showmodal").css("display","none");
                $('#prjactor').prop("disabled", true);
                $('#read').prop("disabled", true);
        
                //提交成功后显示禁用按钮
                $(".finalsubmitted").css("display","block");
            });
        },
        error: function(receiver){
            console.log(receiver);
            swal({
                title: "提交失败，请稍后重试",
                icon: "error",
            });
            return;
        }
    });
}

