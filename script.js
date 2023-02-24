var bgmode= 0;
var ismobile = 0

$.getJSON("projects.json", function(grid) {

    if ($(window).width() <720){
        ismobile = 1
        var greenheight = window.innerHeight - 60
        // console.log(greenheight)
        $(".bgspace").height(greenheight)
        $(".bggrid2").height(window.innerHeight)
 
        // $()
    }

    // var gridheight = $(window).innerHeight() - $(".topnav").height() - $(".tags").height()
    var gridheight = $(window).innerHeight() - $(".topnav").height() - $(".tags").height()
    

    $(".columns").height(gridheight)
    // $(".rightcolumns").height(gridheight)
    $(".leftcolumns").height(gridheight)


    let column1 = '';
    let column2 = '';
    let column3 = '';
    let leftcolumn = '';
    var tagsarray = [];
    var turnedontagsarray=[];
    let imagetags = '';
    var link='';
    var haslink = 0;
   
    function fillgrid(){
    $.each(grid, function(i, project) {
        if(project.link.length == 0){
            link=''
            haslink = 0;
        }

        else{
            link = project.link[0]
            haslink = 1;
        }
         

        imagetags=""
        for (i=0; i<project.tags.length; i++){
            imagetags += `<div class="tag ${project.tags[i]}">${project.tags[i]}</div>`
            if(tagsarray.includes(project.tags[i])){

            }
            else{
                tagsarray.push(project.tags[i]) 
            }
        }

        leftcolumn += 
        `<div class="columnitem" id="label${project.item}">
        <div class="columnitemtext">${project.name}</div>
        <div class="columnitemtext">${project.year}</div>
        </div><div class="caption" id="caption${project.item}"=>${project.caption}<div class="link">${link}</div><div class="captiontags">${imagetags}</div></div>`
        
        if (`${project.column}`== "1"){
            column1 +=  
            `<div class="columnimage" id="image${project.item}">
            <div class="hidearrow arrows" ><div class="leftclick"><div class="leftarrow"><</div></div><div class="rightclick"><div class="rightarrow">></div></div></div>
            <img src= ${project.image}>
            <iframe class ="iframeclass" ></iframe>
            <video class ="viddisplay" autoplay loop width='100%' height="auto"> <source type="video/mp4"></video>
            <div class ="slidecount hidecount"><div class="currentslide">1</div>/<div class="totalslide">2</div></div>
            </div>`
        }

        else if(`${project.column}`== "2"){
            column2 +=  
           `<div class="columnimage" id="image${project.item}">
           <div class="hidearrow arrows" ><div class="leftclick"><div class="leftarrow"><</div></div><div class="rightclick"><div class="rightarrow">></div></div></div>
            <img src= ${project.image}>
            <iframe class ="iframeclass"></iframe>
            <video class ="viddisplay" autoplay  loop width='100%' height="auto"> <source type="video/mp4"></video>
            <div class ="slidecount hidecount"><div class="currentslide">1</div>/<div class="totalslide">2</div></div>
            </div>`
        }

        else if(`${project.column}`== "3"){
            column3 +=  
            `<div class="columnimage" id="image${project.item}">
            <div class="hidearrow arrows" ><div class="leftclick"><div class="leftarrow"><</div></div><div class="rightclick"><div class="rightarrow">></div></div></div>
            <img src= ${project.image}>
            <iframe class ="iframeclass"></iframe>
            <video class ="viddisplay" autoplay  loop width='100%' height="auto"> <source type="video/mp4"></video>
            <div class ="slidecount hidecount"><div class="currentslide">1</div>/<div class="totalslide">2</div></div>
            </div>`
        }
        
    })}

    fillgrid();

    

    for(i=0; i<tagsarray.length; i++){
        $(".tags").append(`<div class="tag ${tagsarray[i]}">${tagsarray[i]}</div>`);
    }

   
    $("#column1").append(column1);
    $("#column2").append(column2);
    $("#column3").append(column3);
    $(".leftcolumn").append(leftcolumn);

  


    // event listeners
    $(".columnimage").hover(function(){
        if(slideshow ==0){
            var hovered = $(this).attr('id')
            $(`#label${hovered.slice(-2)}`).toggleClass("columnitem")
            $(`#label${hovered.slice(-2)}`).toggleClass("columnitemhighlight")
        }

        else{

        }
          
    })

    // variable to determine if site is in slideshow mode, 0 is no, 1 is yes
    var slideshow = 0

    var slideno = 0
    var parentid;
    var clicked;
    var clickedno;

    // change this to 1 if arrow cursor should be static (on iframe mode): 
    var arrowcursor = 0 

    $(".leftclick").mousemove(function(event){
        // console.log(event.pageY)
        if(arrowcursor == 0){
            $(".leftarrow").show();
            $(".rightarrow").hide();
            $(".leftarrow").css({"top":`${event.pageY - 67}` + "px", "left":`${event.pageX - 40}` + "px", })
        }
        
    })

    $(".leftclick").mouseover(function(event){
        if(arrowcursor == 0){
            $(".leftarrow").css({"position": "fixed", "top":`${event.pageY - 67}` + "px", "left":`${event.pageX - 40}` + "px"})
            $(".leftarrow").show();
            $(".rightarrow").hide();
            console.log("mouseover")
        }
    })

    $(".leftclick").mouseout(function(event){
        if(arrowcursor == 0){
            $(".leftarrow").hide();
        }
    })

    $(".rightclick").mousemove(function(event){
        if (arrowcursor == 0){
            $(".rightarrow").show();
            $(".leftarrow").hide();
            $(".rightarrow").css({"position": "fixed", "top":`${event.pageY - 67}` + "px", "left":`${event.pageX - 40}` + "px"})
        }
        // console.log(event.pageY)
    
    })

    $(".rightclick").mouseover(function(event){
        if (arrowcursor == 0){
        $(".rightarrow").css({"position": "fixed", "top":`${event.pageY - 67}` + "px", "left":`${event.pageX - 40}` + "px"})
        $(".rightarrow").show();
        $(".leftarrow").hide();
        console.log("mouseover")
        }
    })

    $(".rightclick").mouseout(function(event){
        if (arrowcursor == 0){
        $(".rightarrow").hide();

        }
    })



    $(".columnimage").on("click", function(){
        $(".columnimage img").css({"height":"auto", "object-fit":"contain"})
        if ($(window).width() <720){
            $(".columns").css({"flex-direction": "column-reverse"});
            $(".rightgrid").css({"flex":"auto", "height":"min-content"})
            // $(".leftcolumn").css({"flex":"auto", "height":"min-content"})
           
        }
        slideshow = 1
        clicked = $(this).attr('id')
        clickedno = clicked.slice(-2)
        parentid = $(this).parent().attr('id')
        if (ismobile == 1){
                       
        }
        else{
            $(".arrows").removeClass("hidearrow");
        }
        $(".slidecount").removeClass("hidecount");
        
        $( ".columnimage" ).each(function(i) {

            console.log("clickedagain")
            if ($(this).attr('id')== clicked){

                if(`${grid[clickedno-1].images[slideno].charAt(0)}` == "h"){
                    if (ismobile == 1){
                        slideno = slideno + 1
                        
                    }

                    else{
                        arrowcursor = 1
                        $(".arrows").css({"pointer-events":"none"});
                        $(".rightarrow").css({"position":"absolute", "top": "calc(50% - 50px)", "left": "calc(100% - 100px)", "pointer-events":"all"});
                        $(".leftarrow").css({"position":"absolute", "top": "calc(50% - 50px)", "left": "0px", "pointer-events":"all"});
                        $(".rightarrow").show();
                        $(".leftarrow").show();
                        $(".leftclick").css({"cursor":"pointer", "pointer-events":"none"});
                        $(".rightclick").css({"cursor":"pointer", "pointer-events":"none"});
                        $(this).children('img').hide()
                        $(this).children('.viddisplay')[0].pause() 
                        $(this).children('.viddisplay').hide()
                        $(this).children('.iframeclass').show()
                        $('.iframeclass').attr('src', `${grid[clickedno-1].images[slideno]}`) 
                    }      
                     
                }

                else if (`${grid[clickedno-1].images[slideno].slice(-4)}`==".mp4"){
                    
                    if (ismobile == 1){
                     
                    }

                    else{
                        arrowcursor = 0
                        $(".rightarrow").css({"position":"fixed", "pointer-events":"none"});
                        $(".leftarrow").css({"position":"fixed", "pointer-events":"none"});
                        $(".arrows").css({"pointer-events":"all"});
                        $(".leftclick").css({"cursor":"none", "pointer-events":"all"});
                        $(".rightclick").css({"cursor":"none", "pointer-events":"all"});
                    }
                   // arrow fix
                    

                    $(this).children('img').hide()
                    $('.iframeclass').attr('src', ``) 
                    $(this).children('.iframeclass').hide()
                    $('.viddisplay').children().attr('src', `${grid[clickedno-1].images[slideno]}`)
                    $(this).children('.viddisplay').show()
                    $(this).children('.viddisplay')[0].load()
                    $(this).children('.viddisplay')[0].play()  
                }
                else{

                    if (ismobile == 1){
                       
                    }

                    else{
                        arrowcursor = 0
                        $(".rightarrow").css({"position":"fixed", "pointer-events":"none"});
                        $(".leftarrow").css({"position":"fixed", "pointer-events":"none"});
                        $(".arrows").css({"pointer-events":"all"});
                        $(".leftclick").css({"cursor":"none", "pointer-events":"all"});
                        $(".rightclick").css({"cursor":"none", "pointer-events":"all"});    
                    }
                    // arrow fix
                    $('.iframeclass').attr('src', ``) 
                    $(this).children('.iframeclass').hide()
                    $(this).children('.viddisplay')[0].pause()     
                    $(this).children('.viddisplay').hide()
                    $(':nth-child(2)', this).attr('src',`${grid[clickedno-1].images[slideno]}`)
                    $(this).children('img').show()
                }
                
            }
            else{
                $(this).hide()
            }
          });

        $( ".rightcolumns" ).each(function(i) {
            if($(this).attr('id')== parentid){
            
            }
            else{
                $(this).css("flex","0%")
                $(this).hide()
            } 
        });

        // gap property is causing 10px
        $("#"+`${parentid}`).css("flex","75%")

        $(".leftcolumn").children().each(function(i) {
            $(this).removeClass("columnitemhighlight")
            $(this).removeClass("columnitem")
            $(this).addClass("descriptionitem")
            if ($(this).attr('id').slice(-2) == clickedno){
                $("#caption" + `${clickedno}`).show()
            }

            else{
                $(this).hide()
            }

          });
        if (slideno == grid[clickedno-1].images.length - 1){
            slideno = 0
            $(".currentslide").html(grid[clickedno-1].images.length)
            $(".totalslide").html(grid[clickedno-1].images.length)
        }
        else{
            slideno = slideno + 1
            $(".currentslide").html(slideno)
            $(".totalslide").html(grid[clickedno-1].images.length)
        }
        

    })

    $(".columnitem").click(function(){
        $(".columnimage img").css({"height":"auto", "object-fit":"contain"})
  
       
        $(".slidecount").removeClass("hidecount");
        if ($(window).width() <720){
            $(".columns").css({"flex-direction": "column-reverse"});
           
        }
        slideshow = 1
        // I think clicked is the key
        clicked = $(this).attr('id')
        clickedno = clicked.slice(-2)
        if (ismobile == 1){
                       
        }
        else{
            $(".arrows").removeClass("hidearrow");
        }
         
        $( ".columnimage" ).each(function(i) {
            if ($(this).attr('id').slice(-2) == clickedno){
                parentid = $(this).parent().attr('id')
                if(`${grid[clickedno-1].images[slideno].charAt(0)}` == "h"){

                    if (ismobile == 1){
                        slideno = slideno + 1
                        
                    }
                    else{
                        arrowcursor = 1
                        $(".arrows").css({"pointer-events":"none"});
                        $(".rightarrow").css({"position":"absolute", "top": "calc(50% - 50px)", "left": "calc(100% - 100px)", "pointer-events":"all"});
                        $(".leftarrow").css({"position":"absolute", "top": "calc(50% - 50px)", "left": "0px", "pointer-events":"all"});
                        $(".rightarrow").show();
                        $(".leftarrow").show();
                        $(".leftclick").css({"cursor":"pointer", "pointer-events":"none"});
                        $(".rightclick").css({"cursor":"pointer", "pointer-events":"none"});
                        $(this).children('img').hide()
                        $(this).children('.viddisplay').hide()
                        $(this).children('.iframeclass').show()
                        $('.iframeclass').attr('src', `${grid[clickedno-1].images[slideno]}`) 
                    }
                    
                }

                else if (`${grid[clickedno-1].images[slideno].slice(-4)}`==".mp4"){
                    arrowcursor = 0
                   // arrow fix
                    $(".rightarrow").css({"position":"fixed", "pointer-events":"none"});
                    $(".leftarrow").css({"position":"fixed", "pointer-events":"none"});
                    // $(".rightarrow").hide();
                    // $(".leftarrow").hide();
                    $(".arrows").css({"pointer-events":"all"});
                    $(".leftclick").css({"cursor":"none", "pointer-events":"all"});
                    $(".rightclick").css({"cursor":"none", "pointer-events":"all"});

                    $(this).children('img').hide()
                    $('.iframeclass').attr('src', ``) 
                    $(this).children('.iframeclass').hide()
                    $('.viddisplay').children().attr('src', `${grid[clickedno-1].images[slideno]}`)
                    $(this).children('.viddisplay').show()
                    $(this).children('.viddisplay')[0].load()
                }
                else{
                    arrowcursor = 0
                    // arrow fix
                    $(".rightarrow").css({"position":"fixed", "pointer-events":"none"});
                    $(".leftarrow").css({"position":"fixed", "pointer-events":"none"});
                    // $(".rightarrow").hide();
                    // $(".leftarrow").hide();
                    $(".arrows").css({"pointer-events":"all"});
                    $(".leftclick").css({"cursor":"none", "pointer-events":"all"});
                    $(".rightclick").css({"cursor":"none", "pointer-events":"all"});

                    $(this).children('img').show()
                    $('.iframeclass').attr('src', ``) 
                    $(this).children('.iframeclass').hide()
                    $(this).children('.viddisplay').hide()
                    $(':nth-child(2)', this).attr('src',`${grid[clickedno-1].images[slideno]}`)
                }
        
            }
            else{
                $(this).hide()
            }
          });

        $( ".rightcolumns" ).each(function(i) {
            if($(this).attr('id')== parentid){
            
            }
            else{
                $(this).css("flex","0%")
                $(this).hide()
            } 
        });

        // gap property is causing 10px
        $("#"+`${parentid}`).css("flex","75%")

        $(".leftcolumn").children().each(function(i) {
            $(this).removeClass("columnitemhighlight")
            $(this).removeClass("columnitem")
            $(this).addClass("descriptionitem")
            if ($(this).attr('id').slice(-2) == clickedno){
                $("#caption" + `${clickedno}`).show()
            }

            else{
                $(this).hide()
            }

          });
        if (slideno == grid[clickedno-1].images.length - 1){
            slideno = 0
        }
        else{
            slideno = slideno + 1
        }

    })

    var resetmode = 0;

    function exitslideshow(){
        $(".columnimage img").css({"height":"100%", "object-fit":"cover"})
        if ($(window).width() <720){
            $(".columns").css({"flex-direction": "row"});
            $(".rightgrid").css({"flex":"50%", "height":"auto"})
            $(".leftcolumn").css({"flex":"50%"})
            
        }
        console.log("cicked")
        $(".arrows").addClass("hidearrow");
        $(".slidecount").addClass("hidecount");
        slideshow = 0
        slideno = 0
        var selection = "#"+`${clicked}`
        $("#image"+`${clickedno}`).children('img').show()
        $("#image"+`${clickedno}`).children('.viddisplay')[0].pause()  
        $("#image"+`${clickedno}`).children('.viddisplay').hide()
        $("#image"+`${clickedno}`).children('.iframeclass').hide()
        $("#image"+`${clickedno}`).children('.iframeclass').attr('src',"")
        $("#image"+`${clickedno}`).children('img').attr('src',`${grid[clickedno-1].image}`)
        $( ".rightcolumns" ).each(function(i) {
            if($(this).attr('id')== parentid){
               
                $(this).css("flex","33.33%")
            }

            else{
                $(this).css("flex","33.33%")
                $(this).show()
            }
        
        });    

        $( ".columnimage" ).each(function(i) {
            if ($(this).attr('id')== clicked){
               
            }
            else{
                $(this).show()
            }
          });

          $(".leftcolumn").children().each(function(i) {
            $(this).show()
            $(this).addClass("columnitem")
            $(this).removeClass("descriptionitem")
          });

          $(".caption").each(function(i) {
            $(this).hide()
          });
    }

    $("#projectreset").click(function(){
        console.log(resetmode)
        if (resetmode == 0){
           
            // $(".bgspace").show();
            // $(".bggrid").show();
            // $(window).scrollTop(scrolltoheight)
            // $(".bggrid3").css('transform', `translateY(${scrolltoheight}px)`)
            
            if ($(window).width() <720){
                scrolltoheight - window.pageYOffset
                console.log(window.pageYOffset)
            }
            $("html, body").animate({ scrollTop: scrolltoheight}, 1300, "swing");
            setTimeout(() => {
            $(".bgspace").hide();
            $(".bggrid").hide();
      
            resetmode = 1
        }, "2000")

        }

        else if (resetmode == 1){
            exitslideshow();
            resetmode = 1
           
        }

        else if (resetmode == 2){
            // completely reset
            if (slideshow == 1){
                exitslideshow();
            }
            columncounter = 1;
            console.log(projectarray)
            detachedprojectlist = $(".leftcolumn").children().detach()
            detachedprojectarray = $(".rightcolumns").children().detach()
            // detachedprojectarray = $(".rightcolumns").children().detach()
            for(x=0;x< projectarray.length; x++){
                $(".leftcolumn").append(projectlist[x])
                $(".leftcolumn").append(captionlist[x])
                var columnid = "#column" + `${columncounter}`
                $(columnid).append(projectarray[x])
                 if(columncounter == 3){
                        columncounter = 1
                    }
                    else{
                        columncounter = columncounter + 1
                    }
            }
            turnedontagsarray =[]
            tagson= 0;
            detachedprojectarray = [];
            detachedprojectlist = [];
            $(".tagselect").addClass("tag")
            $(".tagselect").removeClass("tagselect")
            resetmode = 1

        }

    
    })

    


    $(".buttonhalf").click(function(){
        bgmode = 2
      
        $("body").css("cursor", "pointer")
    })

    $(".bgbuttonblack").click(function(){
        bgmode = 0
        $("body").css(
            "cursor","pointer")
        
    
    })
    turnedontagsarray =[]
    var index;
    var projectarray = [];
    var projectlist = [];
    var captionlist = [];
    var detachedprojectarray = [];
    var detachedprojectlist = [];
    var columncounter = 1;
    var projectno; 
    var tagson= 0; 
    var thisclass;

    function tagfilter(thisvariable){
  
        thisclass = thisvariable
        resetmode = 2 
        if(slideshow == 1){
            exitslideshow();
            slideshow = 0
        }
        // make reset button remember that tags have been turned on 
            var turnedonprojects = []
            var turnedonprojectlist = []
            var turnedoncaptionlist = [];
            tagson = tagson + 1 
    
            if (turnedontagsarray.includes(thisvariable)){
                index = turnedontagsarray.indexOf(thisvariable);
                turnedontagsarray.splice(index,1)
    
            }
            else{
                turnedontagsarray.push(thisvariable)
            }
            $(`.${thisclass}`).toggleClass("tag")
            $(`.${thisclass}`).toggleClass("tagselect")
            $.each(grid, function(i, project) {
                projectno = $(this)[0].item;
                if(tagson < 2){
                    projectarray[i]= $("#image" + `${projectno}`).detach();
                    projectlist[i]= $("#label" + `${projectno}`).detach();
                    captionlist[i]= $("#caption" + `${projectno}`).detach();
                }
                else{
                    detachedprojectarray = $(".rightcolumns").children().detach()
                    detachedprojectlist = $(".leftcolumn").children().detach()
                }
                for(x=0; x< $(this)[0].tags.length ; x++){ 
                    if((turnedontagsarray.includes($(this)[0].tags[x])) == true){
                        if(turnedonprojects.includes(projectarray[i]) == true){
                        }
                        else{
                            turnedonprojects.push(projectarray[i])
                            turnedonprojectlist.push(projectlist[i])
                            turnedoncaptionlist.push(captionlist[i])
                        }
                        continue;          
                    }
                }
            })
    
            var columncounter = 1;
    
            for(x=0;x< turnedonprojects.length; x++){
                var columnid = "#column" + `${columncounter}`
                $(".leftcolumn").append(turnedonprojectlist[x])
                $(".leftcolumn").append(turnedoncaptionlist[x])
                $(columnid).append(turnedonprojects[x])
                 if(columncounter == 3){
                        columncounter = 1
                    }
    
                    else{
                        columncounter = columncounter + 1
                    }
    
            }
            

    }
    
    $(".tag").click(function(){ 
        thisvariable = $(this).html()
        tagfilter(thisvariable) 
    })

    $(".buttonhalf").click(function(){
        bgmode = 2
    
        $("body").css("cursor", "pointer")
    })

    // scroll
    var fired = 0; 
    var aboutclicked = 0; 
    var scrolltoheight = window.innerHeight 

    $( window ).resize(function() {
        scrolltoheight = window.innerHeight 
        $(".bggrid2").height(window.innerHeight)
      });

    window.onbeforeunload = function () {
        window.scrollTo(0, 0);
        fired=0;
      }
    $(document).scroll(function(){
        if($(window).scrollTop()> (.7 * scrolltoheight)){
            if((fired == 0) && (aboutclicked ==0)){
                console.log("fired")
                $("html, body").animate({ scrollTop: scrolltoheight},700, "swing");
                setTimeout(() => {
                    $(".bggrid").hide();
                    $(".bgspace").hide();
                    resetmode = 1;
                }, "700")
            }
            else{
            }
            
            fired = 1;
        }   
        
    })

    $("#about").click(function(){

        if (resetmode == 0){

        }

        else{
            aboutclicked = 1;
            resetmode = 0;
            $(".bgspace").show();
            $(".bggrid").show();
            $(window).scrollTop(scrolltoheight)
            $("html, body").animate({ scrollTop: 0},1000, "swing");
            setTimeout(() => {
                aboutclicked = 0
                fired=0;
            }, "1100")
        } 
        
    })

    

  
});

$( document ).ready(function() {
    
});


var count = 0; 

var mousediv;
let x = 1;
let y = 1;
let easing = 0.2;
function setup() {
var myCanvas = createCanvas(windowWidth, windowHeight);
myCanvas.parent("p5bg");

background(0);
// mousediv = createDiv();
// mousediv.style('position', 'fixed');



  
  
}

function draw() {
// console.log(mouseX, mouseY)
  let targetX = mouseX;
  let dx = targetX - x;
  x += dx * easing;

  let targetY = mouseY;
  let dy = targetY - y;
  y += dy * easing;

    


  if (bgmode == 2){
    fill(255)
    strokeWeight(0)
    
      
      ellipse(x, y, 20, 20)
      
      // triangle(mouseX-80, mouseY+80, mouseX, mouseY-80, mouseX+80, mouseY+80);
     
    
    
    
    count = count + 1 
  }

  else if(bgmode ==0){
    
    // clear();
    // fill(255)
    // stroke(255)
    // strokeWeight(0)
    // ellipse(x, y, 20, 20)


   
    
  }
  
  
}