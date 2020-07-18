(function(){
    //获得想要计算到顶部高度的元素的dom对象
    let obs = document.getElementsByClassName('md');
    //累加元素自身的高度，从而计算元素到页面顶部的高度
    let elH = [];
    for(let i=0;i<obs.length;i++){
        if(i>0){
        elH[i]=obs[i-1].scrollHeight+elH[i-1];
        }else{
            elH[i] = 0;
        }
    }
    //记录页面滚动到底部时，此时高亮标签的号码,和滚动条高度
    let minNumber,maxScrollH = getDocumentScrollHeight()-getDocumentClientHeight();
    for(let k=0;k<elH.length;k++){
        if(elH[k]>maxScrollH){
            minNumber = k-1;
            break;
        }
    }
    console.log(minNumber,maxScrollH);
    //记录点击的标签号
    let highlightNumber;
    //监听滚动的高度
    window.addEventListener('scroll',function(){
        let scrollH = getDocumentScrollTop();
        let j=0;
        for(j;j<elH.length;j++){
            if(elH[j]>scrollH){
                highlight(j-1);
                break;
            }
        }
        if(isEnd()){
            console.log('end');
            highlight(elH.length-1);
            if(highlightNumber>minNumber){
                console.log("111");
                highlight(highlightNumber);
            }
        }
    });
    //获得页面的实际高度,包括被滚动卷起来的部分
    function getDocumentScrollHeight(){
        if(document.body.scrollHeight){//兼容IE
            return document.body.scrollHeight;
        }else{
            return document.documentElement.scrollHeight;
        }
    }
    //获得页面可视的高度
    function getDocumentClientHeight(){
        if(document.body.clientHeight){//兼容IE
            return document.body.clientHeight;
        }else{
            return document.documentElement.clientHeight;
        }
    }
    //获得页面滚动条的高度
    function getDocumentScrollTop(){
        if(document.body.scrollTop){//兼容IE
            return document.body.scrollTop;
        }else{
            return document.documentElement.scrollTop;
        }
    }
    //是否滚动到了底部
    function isEnd(){
        if(getDocumentScrollHeight() == getDocumentClientHeight()+getDocumentScrollTop()){
            return true;
        }
        return false;
    }
    //高亮标签
    function highlight(index){
        let obs = Array.prototype.slice.call(document.getElementsByClassName('tab'),0);
        obs.forEach(element => {
            element.classList.remove('on');
        });
        obs[index].classList.add('on');
    }
    //当点击标签时，页面滚动到相应的部分
    document.getElementById('nav-ul').addEventListener('click',function(e){
        let ob = e.target;
        let obs = Array.prototype.slice.call(document.getElementsByClassName('tab'),0);
        let id;
        //遍历找到点击的是第几个标签
        obs.forEach((el,index)=>{
            if(el==ob){
                id = index;
            }
        });
        highlightNumber = id;
        console.log(highlightNumber,minNumber);
        //当点击的标签大于滚动到底部的最小序号
        if(highlightNumber>minNumber){
            console.log("ss");
            if(getDocumentScrollTop() == maxScrollH){
                highlight(obs.length-1);
            }else{
                window.scrollTo(0,maxScrollH);
            }
        }else{
            window.scrollTo(0,elH[id]);
        }
    })
    //当页面滚动到底部时，点击标签，页面不滚动。
})();