$(document).ready(function(){


  /* HEADER__________________________ */
  /* Scroll Header */
  $(window).scroll(function(){

    let pos=$(window).scrollTop();

    if(pos>70){
      $("header").addClass("active")
    } else{
      $("header").removeClass("active")
    };

  });

  /* Notice Banner */
  let noldidx=0;
  let nidx=0;

  function noticeBanner(){
    nidx++;
    if(nidx>3){
      nidx=0;
    }

    $(".view ul li").eq(noldidx).stop().fadeOut(500);
    $(".view ul li").eq(nidx).stop().fadeIn(500);
    noldidx = nidx;
  };
  setInterval(noticeBanner,4000);


  /* Sub Menu */
  $(".sub").hide(); //display:none 과 동일

  $(".mains").hover(function(){

    $(this).find(".sub").stop().slideDown();
    $(".bg_box").stop().slideDown();

  },function(){

    $(this).find(".sub").stop().slideUp();
    $(".bg_box").stop().slideUp();

  });

  /* SUB MENU */
  // Brand
  $("dl dt").click(function(){

    $(this).siblings("dt").removeClass("selected");
    $(this).toggleClass("selected");
    $(this).siblings("dd").hide("slow"); //열려있을 때 위로 올리게 하는거
    $(this).next().show("slow");

    let dataBackimg = $(this).attr("data-background");
    $(".image img").attr("src",dataBackimg),hide().fadeIn();

  });

  // Our History - Tab Menu
  $(".tab li").click(function(){
    let num = $(this).index();
    let move = 60*num; //세로폭 60px 증가

    $(".tab-header .tab-highlight").animate({top : move});
    $(this).siblings().removeClass("active");
    $(this).addClass("active");

    let result = $(this).attr("data-alt");
    $(".tab-contents div").removeClass("active");
    $("#"+result).addClass("active");
  });

  //Our History - since 1971
  let x=0;
  let s=-1;  //흘러가는 방향을 의미

  function motion(){
    x = x + s;
    if ( x < -1070 ) { x = 0 };  /* 전체폭의 반(즉 1개의 총너비) */
		if ( x > 0 ) { x = -1070 };

    $(".logo_banner_in").css({left:x});
  };

  bauto = setInterval(motion,30);


  //People
  let pbanner_w= $(".pban ul li").width()+35;  //배너간 오른쪽여백이 있는 겨우 여백만큼(20px) 더해줌
  
  $(".pban ul li:last").prependTo(".pban ul");
  //목록 마지막 이미지를 목록 안의 가장 앞으로 배치
  $(".pban ul").css({ left:-pbanner_w});
  //첫번째 이미지가 보여야 하므로 앞으로 온 맨뒤 이미지를 왼쪽으로 한칸 밀어두기


  //자동으로 슬라이드 함수생성
  function pbannerAuto(){
    $(".pban ul").stop().animate({left:"-="+pbanner_w+"px"},500,function(){			
			$(".pban ul li:first-child").appendTo(".pban ul"); 
			$(this).css({left:-pbanner_w}); 
		});
  };

  pbauto = setInterval(pbannerAuto,2500);

  //다음보기
  $(".pban_btn .pban_right").click(function(){
    clearInterval(pbauto);
    $(".pban ul").stop().animate({left:"-="+pbanner_w+"px"},500,function(){			
			$(".pban ul li:first-child").appendTo(".pban ul"); //첫번째 이미지가 맨뒤로 이동
			$(this).css({left:-pbanner_w}); //다음 움직임을 위해 초기화(최종목적지)
		});	
    pbauto = setInterval(pbannerAuto,2500);
  });

  //이전보기
  $(".pban_btn .pban_left").click(function(){
    clearInterval(pbauto);
    $(".pban ul").stop().animate({left:"+="+pbanner_w+"px"},500,function(){			
			$(".pban ul li:last-child").prependTo(".pban ul"); //마지막 이미지가 맨앞로 이동
			$(this).css({left:-pbanner_w}); //다음 움직임을 위해 초기화(최종목적지)
		});	
    pbauto = setInterval(pbannerAuto,2500);
  });

  //마우스를 올리면 슬라이드자동함수 멈추고, 마우스를 내리면 다시 자동함수 실행
  $(".pban").hover(function(){ 
    clearInterval(pbauto);
  }, function(){
    pbauto = setInterval(pbannerAuto,2500);
  });

});